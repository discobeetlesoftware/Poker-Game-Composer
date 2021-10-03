require 'erb'

module TemplateMixin
  def load_template(name, ext = 'template')
    path = File.join(__dir__, '..', 'views', 'canvas', "#{name}.#{ext}")
    Template.new(File.open(path, 'r').read)
  end
  
  class Template
    def initialize(contents)
      @contents = contents
    end

    def render(context)
      ERB.new(@contents).result(context)
    end
  end
end
