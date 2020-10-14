Dir[File.join(__dir__, "elements", "*.rb")].each {|file| require_relative file }

class Element
  def self.from_params(params = {})
    (params || []).map do |data|
      case data['type']
      when 'betting_round'
        BettingRoundElement.from_params(data)
      when 'deal_player_down'
        DealPlayerElement.from_params(data)
      when 'deal_player_up'
        DealPlayerElement.from_params(data)
      when 'deal_board'
        DealBoardElement.from_params(data)
      when 'split_hand'
        SplitHandElement.from_params(data)
      when 'discard_hand'
        DiscardHandElement.from_params(data)
      when 'discard_card'
        DiscardCardElement.from_params(data)
      when 'draw_card'
        DrawCardElement.from_params(data)
      when 'expose_card'
        ExposeCardElement.from_params(data)
      end
    end
  end

  def self.create(json = {})
    case json['type']
      when 'betting_round'
        BettingRoundElement.new(json)
      when 'deal_player_down'
        DealPlayerElement.new(json)
      when 'deal_player_up'
        DealPlayerElement.new(json)
      when 'deal_board'
        DealBoardElement.new(json)
      when 'split_hand'
        SplitHandElement.new(json)
      when 'discard_hand'
        DiscardHandElement.new(json)
      when 'discard_card'
        DiscardCardElement.new(json)
      when 'draw_card'
        DrawCardElement.new(json)
      when 'expose_card'
        ExposeCardElement.new(json)
      end
  end

  attr_accessor :type

  def initialize(json = {})
   self.type = json['type']
  end
end