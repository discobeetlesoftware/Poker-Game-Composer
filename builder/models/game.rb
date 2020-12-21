require 'json'
require_relative 'section'
require_relative 'evaluation'
require_relative 'template'


class Game
  include TemplateMixin
	def self.from_params(params)
		game = Game.new
		game.name = params['name']
		game.abbreviation = params['abbreviation']
		game.alternative_names = params['alternative_names']
    game.evaluation = Evaluation.from_params(params['evaluation'])
    game.structures = (params['structures'] || {}).select { |k, v| v == 'on' }.keys
		game.sections = Section.from_params(params)
		game
	end

	def self.path(name)
		File.expand_path(File.join(__dir__, '..', '..', 'games', name + '.json'))
	end

	def self.load(name)
		json = JSON.parse(File.read(path(name)))
    Game.new(json)
	end

	attr_accessor :name
	attr_accessor :abbreviation
	attr_accessor :alternative_names
  attr_accessor :structures
  attr_accessor :ranking_system
	attr_accessor :sections
  attr_accessor :evaluation

  def initialize(json = {})
    self.name = json['name']
    self.abbreviation = json['abbreviation']
    self.alternative_names = json['alternative_names']
    self.structures = json['structures'] || []
    self.sections = (json['sections'] || []).map { |section_json| Section.new(section_json) }
  end

	def save(dir)
		path = File.join(dir, file_name)
		File.open(path, 'w') do |f|
			f.write(to_json)
		end
	end

  def to_s
    "Game:#{self.name}\n" + self.sections.map.with_index { |s,i| " [#{i}] #{s}" }.join("\n")
  end

  def details
    ["Blinds", "Split Pot"]
  end

  def description
    return sections.map.with_index { |s, i| s.weirdness_description(i) }.join(" ")
    "You win the game when the conditions are such that you have won the game"
    #requires_clarification
    #split_type
  end

  def each_element(context)
    appender = nil
    if context.is_a? Array
      appender = lambda { |v| context << v }
    elsif context.is_a? Numeric
      appender = lambda { |v| context += v.to_i }
    elsif context == true
      appender = lambda { |v| context = context && v }
    elsif context == false
      appender = lambda { |v| context = context || v }    
    else
      appender = lambda { |v| context = v }
    end

    self.sections.each.with_index do |section, sectionIndex|
      section.elements.each.with_index do |element, elementIndex|
        result = yield(section, element, [sectionIndex, elementIndex])
        puts "GameLoop: #{[sectionIndex, elementIndex].join(".")} = #{result}"
        puts "from Element: #{element}"
        appender.call(result)
      end
    end
    return context
  end

	def file_name
		result = self.name.downcase
		[' ', '-'].each do |token|
			result.gsub!(token, '_')
		end
		['`', '\'', '"'].each do |token|
			result.gsub!(token, '')
		end
		"#{result}.json"
	end

	def to_json
    JSON.pretty_generate(to_hash)
	end

	def to_hash
		{
			:name => self.name,
			:abbreviation => self.abbreviation,
			:alternative_names => self.alternative_names,
      :structures => self.structures,
			:sections => self.sections.map { |section| section.to_hash },
      :evaluation => self.evaluation.to_hash
		}
	end

  def canvas_estimates
    %{[#{self.sections.map(&:canvas_estimates).join(',')}]}
  end

  def canvas_size
    %{combineEstimate([#{self.sections.map(&:canvas_size).join(',')}])}
  end

  def draw
    load_template('game', 'js').render(binding)
  end

  def draw_regions
    sections.map.with_index { |section, sectionIndex| section.draw(sectionIndex) }.join("\n")
  end

  def draw_canvas
    %{
        var game = new GameRegion($('canvas'));
        game.render(function() {
          #{sections.map.with_index { |section, sectionIndex| section.draw_canvas(sectionIndex) }.join("\n") }
        });
    }
  end

  def render_canvas
    lines = []

    # Setup section
    lines << %|
      var sizes = #{canvas_estimates};
      var estimates = sizes.map(function(innerList) {
        return combineEstimate(innerList);
      });
      var estimate = combineEstimate(estimates);
      var sectionTitleHeight = estimate_text('abcdefghijlkmnoppqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ', {
        fillStyle: window.config.section.title.color,
        fontSize: window.config.section.title.size,
        fontFamily: window.config.section.title.family
      }).height;
      var totalSectionTitleHeight = sectionTitleHeight + window.config.section.margins.top + window.config.section.title.margins.top + window.config.section.title.margins.bottom + window.config.section.margins.bottom;

      var text_sizes = {};
      var element_widths = {};
      var xLocation = 1.0;
      var yLocation = 1.0;
      var card = $('canvas');
      card.detectPixelRatio(function(ratio) {

        function elementLocation(isCentered = false) {
          var verticalOffsetWhichAccountsForTheTallestElement = estimate.height - window.config.element.card.size.height;
          if (isCentered) {
            verticalOffsetWhichAccountsForTheTallestElement += (window.config.element.card.size.height / 2);
          }
          return {
            x: xLocation, y: totalSectionTitleHeight + verticalOffsetWhichAccountsForTheTallestElement
          }
        }
        elementLocations = {
          topLeft: function() { return elementLocation(false); },
          center: function() { return elementLocation(true); },
          bottom: function() { var result = elementLocation(false); result.y += window.config.element.card.size.height; return result; }
        }
    |

    # Section
    lines += sections.map.with_index do |section, i|
      section.render_canvas(i)
    end
    lines << "});"
    lines.join("\n")
  end
end