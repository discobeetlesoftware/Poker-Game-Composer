class DealPlayerElement
  attr_accessor :card_count
  attr_accessor :is_face_up

  def self.from_params(params)
    DealPlayerElement.new({
      'type' => params['type'],
      'card_count' => params['value'].to_i
    })
  end

  def initialize(json = {})
    self.card_count = json['card_count']
    self.is_face_up = json['type'] == 'deal_player_up'
  end
  
  def type
    self.is_face_up ? 'deal_player_up' : 'deal_player_down'
  end

  def to_hash
    { :type => type, :card_count => self.card_count }
  end

  def to_s
    "DealPlayer #{self.card_count} #{self.is_face_up ? 'faceUp' : 'faceDown' }"
  end
end