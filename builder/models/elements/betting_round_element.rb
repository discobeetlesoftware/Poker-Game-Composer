require_relative '../template'

class BettingRoundElement
  include TemplateMixin
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

  def draw(section_index, element_index)
    load_template('elements/betting_round', 'js').render(binding)
  end

  def draw_canvas(section_index, element_index)
  end

  def canvas_size
    %{estimate_bet(0, 0)}
  end

  def render_canvas(i,j)
    %{var config = window.config.element.betting_round;
var location = { x: xLocation + config.margins.left, y: window.elementLocations.bottom().y };
var betSize = drawBet(location.x + (config.size.width / 2), location.y);
drawText(location.x + (betSize.width / 2), location.y, 'Bet', {
  fromCenter: true,
  fillStyle: config.fontColor,
  fontSize: config.fontSize,
  fontFamily: config.fontFamily
});
(function(size) {
  window.element_widths[#{i}] += size.width;
  xLocation += size.width;
})(config.size);
    }
  end
end