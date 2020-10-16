class ExposeCardElement
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
    'expose_card'
  end

  def to_hash
    { :type => type, :card_count => self.card_count }
  end

  def to_s
    "ExposeCard #{self.card_count}"
  end

  def render_canvas(i,j)
    %{var elementSize = { width: 60, height: 60 };
drawContainedText(xLocation + element_widths[#{i}], yLocation, "Expose #{self.card_count} card#{self.card_count == 1 ? "" : "s"}", elementSize);
xLocation += elementSize.width + 6;
    }
  end
end