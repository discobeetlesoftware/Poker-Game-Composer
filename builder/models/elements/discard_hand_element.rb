class DiscardHandElement
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

  def to_s
    "DiscardHand #{self.hand_count}"
  end

  def render_canvas(i,j)
  end
end