require 'json'
require_relative 'section'

class Game
	def self.from_params(params)
		game = Game.new
		game.name = params['name']
		game.abbreviation = params['abbreviation']
		game.alternative_names = params['alternative_names']
    game.structures = (params['structures'] || {}).select { |k, v| v == 'on' }.keys
		game.sections = Section.from_params(params)
		game
	end

	def self.path(name)
		File.expand_path(File.join(__dir__, '..', '..', 'games', name + '.json'))
	end

	def self.load(game)
		json = JSON.parse(File.read(path(game)))
    Game.new(json)
	end

	attr_accessor :name
	attr_accessor :abbreviation
	attr_accessor :alternative_names
  attr_accessor :structures
	attr_accessor :sections

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

	private 
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
			:sections => self.sections.map { |section| section.to_hash }
		}
	end
end