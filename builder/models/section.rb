require 'json'
require_relative 'element'
require_relative 'template'

class Section
  include TemplateMixin
	def self.from_params(params)
		sections = params['section'] || []
    sections.map do |data|
      section = Section.new
      section.name = data['name']
      section.elements = Element.from_params(data['elements'])
      section
    end
	end

	attr_accessor :name
	attr_accessor :elements
  attr_accessor :template

  def initialize(json = {})
   self.name = json['name']
   self.elements = (json['elements'] || []).map { |element_json| Element.create(element_json) }
   self.template = load_template('section', 'js')
  end

	def to_hash
		{
			:name => self.name,
			:elements => self.elements.map { |element| element.to_hash }
		}
	end

  def to_s
    "Section:#{self.name} {\n" + self.elements.map { |e| "\t#{e}" }.join("\n") + "\n}"
  end

  def weirdness_description(index)
    if index == 0 && elements[0].type.include?('deal_player') && elements.length > 1 && elements[1].type == 'split_hand'
      hands = elements[1].explain
      hand = hands[0] if hands.count == 1
      hand = "#{hands[0]} and a #{hands[1]}." if hands.count == 2
      lines = [
        "After individual cards are dealt, player separates cards into a",
        hand,
        "Once the hands are set, changing them will foul the player’s hand."
      ]
      return lines.join(" ")
    end
    return ""
  end

  def sterile_name
    name.gsub('-', '')
  end

  def build_function_name
    "build_#{sterile_name}"
  end

  def build_function_call(section_index)
    "#{build_function_name}(#{section_index})"
  end

  def draw(section_index)
    self.template.render(binding)
  end

  def render_elements_canvas(section_index)
    results = elements.map.with_index do |element, element_index|
      [
        "",
        "//////////// [#{section_index}.#{element_index}] #{element} ////////////",
        "yLocation = totalSectionTitleHeight;",
        element.render_canvas(section_index,element_index),
        "sectionRect.height = Math.max(yLocation, sectionRect.height);"
      ]
   end
   results.flatten.join("\n")
  end

  def canvas_title
    return "\"#{name}\""
  end

  def draw_canvas(sectionIndex)
    %{
      //////////// [#{sectionIndex}] Section:#{name} ////////////
      var section#{sectionIndex} = game.section(#{canvas_title});
      #{elements.map.with_index { |element, elementIndex| 
        "section#{sectionIndex}.render(function(context) {" +
          (element.draw_canvas(sectionIndex, elementIndex) || "") +
          "});" 
      }.join("\n")}
    }
  end

  def canvas_estimates
    %{[#{elements.map(&:canvas_size).join(',')}]}
  end

  def canvas_size
    %{combineEstimate()}
  end

  def render_canvas_title
%{drawText(xLocation, yLocation, #{canvas_title}, {
  fillStyle: window.config.section.title.color,
  fontSize: window.config.section.title.size,
  fontFamily: window.config.section.title.family
});}
  end

  def render_canvas(i)
    %{//////////// [#{i}] Section:#{name} ////////////

element_widths[#{i}] = 0;
yLocation = window.config.section.margins.top + window.config.section.title.margins.top;
text_sizes[#{i}] = drawText(xLocation + window.config.section.title.margins.left, yLocation, #{canvas_title}, {
fillStyle: window.config.section.title.color,
fontSize: window.config.section.title.size,
fontFamily: window.config.section.title.family
});
var sectionRect = makeRect(xLocation, yLocation, 0, 0);
#{render_elements_canvas(i)}
xLocation += Math.max(text_sizes[#{i}].width, element_widths[#{i}]) + window.config.section.margins.right;
sectionRect.width = xLocation - sectionRect.x;
sectionRect.height = yLocation - sectionRect.y;
colors = [
  '#d2ffd6',
  '#fbffd2',
  '#fbffd2',
  '#fbffd2'
]
card.drawRect({
      strokeStyle: 'black',
      strokeWidth: 1,
      fromCenter: false,
      x: sectionRect.x,  
      y: sectionRect.y,
      width: sectionRect.width,
      height: sectionRect.height
  });
}
  end
end