require_relative '../template'

class ExposeCardElement
  include TemplateMixin
  attr_accessor :card_count

  def self.from_params(params)
    ExposeCardElement.new({
      'card_count' => params['value'].to_i
    })
  end

  def initialize(json = {})
    self.card_count = json['card_count']
  end

  def type
    'expose_card'
  end

  def to_hash
    { :type => type, :card_count => self.card_count }
  end

  def draw(section_index, element_index)
    load_template('elements/expose_card', 'js').render(binding)
  end

  def draw_canvas(section_index, element_index)
  end

  def to_s
    "ExposeCard #{self.card_count}"
  end

  def canvas_title
    "\"Expose #{self.card_count} card#{self.card_count == 1 ? "" : "s"}\""
  end

  def canvas_size
    %{estimate_containedText(0, 0, #{canvas_title}, { width: 60, height: 60 })}
  end

  def render_canvas(i,j)
    %{var elementSize = { width: 60, height: 60 };
drawContainedText(xLocation + element_widths[#{i}], yLocation, #{canvas_title}, elementSize);
xLocation += elementSize.width + 6;
    }
  end
end