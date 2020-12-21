require_relative '../template'

class DiscardHandElement
  include TemplateMixin
  attr_accessor :hand_count

  def self.from_params(params)
    DiscardHandElement.new(params['value'].to_i)
  end

  def initialize(json = {})
    self.hand_count = json['hand_count']
  end
  
  def type
    'discard_hand'
  end

  def to_hash
    { :type => type, :hand_count => self.hand_count }
  end

  def draw_canvas(section_index, element_index)
  end

  def to_s
    "DiscardHand #{self.hand_count}"
  end

  def draw(section_index, element_index)
    load_template('elements/discard_hand', 'js').render(binding)
  end
end