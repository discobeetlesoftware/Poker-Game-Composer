class SplitHandElement
  attr_accessor :split_sizes

  def self.from_params(params)
    values = params['handSize'] || []
    SplitHandElement.new({
      'split_sizes' => values.map(&:to_i)
    })
  end

  def initialize(json = {})
    self.split_sizes = json['split_sizes'] || []
  end

  def type
    'split_hand'
  end

  def to_hash
    { :type => 'split_hand', :split_sizes => self.split_sizes }
  end

  def to_s
    "SplitHand #{self.split_sizes}"
  end
end