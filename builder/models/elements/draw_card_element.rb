class DrawCardElement
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

  def to_s
    "DrawCard #{self.card_count}"
  end
end