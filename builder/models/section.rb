require 'json'
require_relative 'element'

class Section
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

  def initialize(json = {})
   self.name = json['name']
   self.elements = (json['elements'] || []).map { |element_json| Element.create(element_json) }
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
end