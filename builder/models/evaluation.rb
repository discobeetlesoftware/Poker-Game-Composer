require 'json'

class Evaluation
  attr_accessor :type
  attr_accessor :hand

  def self.from_params(params)
    evaluation = Evaluation.new
    evaluation
  end

  def allHands
    [
      'Pair', 
      'Two Pair',
      'Three of a kind', 
      'Straight', 
      'Flush', 
      'Full house', 
      'Four of a kind',
      'Straight flush', 
      'Royal flush', 
      'Five of a kind'
    ]
  end

  def hand_key(hand)
    hand.downcase.gsub(" ", "_")
  end

  def to_json
    JSON.pretty_generate(to_hash)
  end

  def to_hash
    {
      :type => self.type,
      :hand => self.hand
    }
  end
end