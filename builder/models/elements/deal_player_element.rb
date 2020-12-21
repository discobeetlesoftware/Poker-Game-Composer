require_relative '../template'

class DealPlayerElement
  include TemplateMixin
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

  def canvas_type
    self.is_face_up ? 'false' : 'true'
  end

  def to_hash
    { :type => type, :card_count => self.card_count }
  end

  def draw_canvas(section_index, element_index)
    load_template('elements/deal_player', 'js').render(binding)
  end

  def to_s
    "DealPlayer #{self.card_count} #{self.is_face_up ? 'faceUp' : 'faceDown' }"
  end

  def canvas_title
    "\"#{self.card_count} card#{self.card_count > 1 ? "s" : ""}\""
  end

  def canvas_size
    %{estimate_cardPile(0, 0, #{self.card_count}, #{canvas_title})}
  end

  def draw(section_index, element_index)
    load_template('elements/deal_player', 'js').render(binding)
  end

  def render_canvas(i,j)
    %{
      xLocation += window.config.element.card.border.width
      var pileSize = drawCardPile(elementLocations.topLeft().x, elementLocations.topLeft().y, 'I', #{canvas_type}, #{self.card_count}, #{canvas_title});
      yLocation += pileSize.height;
      xLocation += pileSize.width;
    }
  end
end