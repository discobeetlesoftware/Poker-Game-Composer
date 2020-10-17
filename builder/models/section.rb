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

  def render_elements_canvas(j)
    results = elements.map.with_index do |e,i|
      [
        "",
        "//////////// [#{j}.#{i}] #{e} ////////////",
        "yLocation = text_sizes[#{j}].height + 10;",
        e.render_canvas(j,i)
      ]
   end
   results.flatten.join("\n")
  end

  def render_canvas(i)
    %{//////////// [#{i}] Section:#{name} ////////////

element_widths[#{i}] = 0;
text_sizes[#{i}] = drawText(xLocation, yLocation, "#{name}", {
fillStyle: window.config.section.title.color,
fontSize: window.config.section.title.size,
fontFamily: window.config.section.title.family
});
#{render_elements_canvas(i)}
xLocation += Math.max(text_sizes[#{i}].width, element_widths[#{i}]) + section_margin;
yLocation = 0;
    }
  end
end