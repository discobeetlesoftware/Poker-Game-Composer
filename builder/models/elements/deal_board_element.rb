class DealBoardElement
  attr_accessor :card_count

  def self.from_params(params)
    DealBoardElement.new({
      'card_count' => params['value'].to_i
    })
  end

  def initialize(json = {})
    self.card_count = json['card_count']
  end

  def type
    'deal_board'
  end

  def to_hash
    { :type => type, :card_count => self.card_count }
  end

  def to_s
    "DealBoard #{self.card_count}"
  end
end