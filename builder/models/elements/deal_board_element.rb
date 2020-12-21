require_relative '../template'

class DealBoardElement
  include TemplateMixin
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

  def draw(section_index, element_index)
    load_template('elements/deal_board', 'js').render(binding)
  end

  def draw_canvas(section_index, element_index)
    %{return context.drawCard('C', false);}
  end

  def canvas_size
    %{estimate_card(0, 0)}
  end

  def render_canvas(i,j)
    cardWidth = %{window.config.element.card.size.width}
    groupMargin = %{window.config.element.card.groupMargin}
    cardBorder = %{window.config.element.card.border.width}
    output = []
    self.card_count.times do |x|
      output << "drawCard(window.elementLocations.topLeft().x + (#{x} * (#{cardBorder} + #{cardWidth} + #{groupMargin})), window.elementLocations.topLeft().y, 'C', false).width;"
    end
    output << %{
      (function(boardCount) {
        var totalWidth = (boardCount * #{cardWidth}) + ((boardCount - 1) * #{groupMargin});
        element_widths[#{i}] += totalWidth;
        xLocation += totalWidth;
      })(#{self.card_count});
    }
    output.join("\n")
  end
end