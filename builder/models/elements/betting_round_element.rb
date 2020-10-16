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

  def render_canvas(i,j)
    %{var offset = 6;
var location = { x: xLocation + element_widths[#{i}] + offset, y: 70 };
var betSize = drawBet(location.x, location.y);
drawText(location.x + (betSize.width / 2), location.y + (betSize.height / 2), 'Bet', {
  fromCenter: true,
  fillStyle: 'white'
});
element_widths[#{i}] += 30 + 6;
    }
  end
end