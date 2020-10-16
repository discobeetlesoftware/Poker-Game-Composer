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

  def render_canvas(i,j)
    results = []
    xOffset = 6
    yOffset = 3
    strokeWidth = 1;
    results << "xLocation += #{strokeWidth};"
    self.card_count.times do |x|
      results << %{element_widths['#{type}'] = drawCard(xLocation + #{x * xOffset}, yLocation + #{x * yOffset}, 'I', #{self.is_face_up ? 'false' : 'true'});}
    end
    results << "yLocation += element_widths['#{type}'].height + #{yOffset * (self.card_count - 1)} + 2;"
    results << %{drawText(xLocation, yLocation, "#{self.card_count} card#{self.card_count > 1 ? "s" : ""}");}
    results << "element_widths[#{i}] += element_widths['#{type}'].width + #{xOffset * (self.card_count - 1)};"
    results.join("\n")
  end
end