require_relative '../template'

class DiscardCardElement
  include TemplateMixin
  attr_accessor :card_count_range
  attr_accessor :then_draw

  def self.from_params(params)
    value = params['value'].to_i
    range = nil
    if params['valueConfig'] == 'exactly'
      range = Range.new(value, value)
    else
      range = Range.new(0, value)
    end
    DiscardCardElement.new({
      'range' => [range.min, range.max],
      'then_draw' => params['thenDraw'] == 'on'
    })
  end

  def initialize(json = {})
    range = json['range'] || [0,0]
    self.card_count_range = Range.new(range.first, range.last)
    self.then_draw = json['then_draw']
  end

  def type
    'discard_card'
  end

  def is_exact_range
    self.card_count_range.min == self.card_count_range.max
  end

  def config
    is_exact_range ? 'exactly' : 'up to' 
  end

  def to_hash
    { :type => type, :then_draw => self.then_draw, :range => [self.card_count_range.min, self.card_count_range.max] }
  end

  def to_s
    "DiscardCard #{self.card_count_range} #{self.then_draw ? 'thenDraw' : 'NoDraw' }"
  end
  
  def draw(section_index, element_index)
    load_template('elements/discard_card', 'js').render(binding)
  end

  def canvas_title
    "\"Draw\\n#{self.card_count_range.min}-#{self.card_count_range.max} cards\""
  end

  def canvas_size
    %{estimate_containedText(0, 0, #{canvas_title}, { width: 60, height: 60 })}
  end

  def render_canvas(i,j)
    %{var elementSize = { width: 60, height: 60 };
drawContainedText(window.elementLocations.center().x, window.elementLocations.center().y, #{canvas_title}, elementSize);
xLocation += elementSize.width;
    }
  end
end