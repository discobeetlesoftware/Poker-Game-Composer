class BettingRoundElement
  def self.from_params(params)
    BettingRoundElement.new
  end

  def initialize(json = {})
  end

  def type
    'betting_round'
  end

  def to_hash
    { :type => type }
  end

  def to_s
    "BettingRound"
  end
end