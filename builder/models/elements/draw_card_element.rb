require_relative '../template'

class DrawCardElement
  include TemplateMixin
  attr_accessor :card_count

  def self.from_params(params)
    DrawCardElement.new({
      'card_count' => params['value'].to_i
    })
  end

  def initialize(json = {})
    self.card_count = json['card_count']
  end

  def type
    'draw_card'
  end

  def to_hash
    { :type => type, :card_count => self.card_count }
  end

  def draw_canvas(section_index, element_index)
  end

  def to_s
    "DrawCard #{self.card_count}"
  end

  def draw(section_index, element_index)
    load_template('elements/draw_card', 'js').render(binding)
  end
end