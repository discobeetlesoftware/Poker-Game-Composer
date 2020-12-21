require_relative 'game'

class Analysis
  attr_accessor :game, :attributes
  def initialize(game)
    self.game = game
    self.attributes = {}
  end

  def method_missing(m, *args, &block)
    if m.start_with?("determine")
      return super.method_missing(m, args, block)
    end
    value = self.attributes[m]
    return value unless value.nil?
    value = send("determine_#{m}")
    if value.nil?
      puts "Analysis failure: nil response for determine_#{m}"
    else
      puts "Storing #{m} = #{value}"
      self.attributes[m] = value
    end
    value
  end

  def determine_name
    self.game.name || 'Unknown'
  end

  def determine_player_cards
    self.game.each_element(0) do |section, element|
      return case element.to_hash
      in {type: 'deal_player_up', card_count: count}
        count
      in {type: 'deal_player_down', card_count: count}
        count
      in _
        0
      end
    end
  end

  def determine_board_cards
    self.game.each_element(0) do |section, element|
      return case element.to_hash
      in {type: 'deal_board', card_count: count}
        count
      in _
        0
      end
    end
  end

  def determine_has_draws
    list = self.game.each_element(false) { |section, element, indexPath|
      return case element.to_hash
      in {type: 'draw_card'}
        true
      in {type: 'discard_card', then_draw: thenDraw}
        return thenDraw
      in _
        false
      end
    }
    return list
  end

  def determine_max_players
    player_pool = self.player_cards
    public_pool = self.board_cards

    cards = 52
    player_pool = [1, player_pool].max
    return ((cards - public_pool) / player_pool).floor
    @max_players_explanation = "max_players = ((#{cards} - #{public_pool}) / #{player_pool}).floor = #{((cards - public_pool) / player_pool)}.floor"
    puts @max_players_explanation
  end

  def determine_split_size
    1
  end

  def determine_section_count
    self.game.sections.length
  end

  def to_json
    JSON.pretty_generate(to_hash)
  end

  def to_hash
    {
      :name => self.name,
      :player_cards => self.player_cards,
      :board_cards => self.board_cards,
      :section_count => self.section_count,
      :max_players => self.max_players,
      :split_size => self.split_size,
      :has_draws => self.has_draws
    }
  end

 # attr_accessor :has_blinds
 # attr_accessor :has_draws, :holdem_shared_board, :omaha_shared_board, :player_board
 # attr_accessor :has_shared_board


  def to_s
    to_json
  end
end

class Analyzer

  def initialize

  end

  def analyze(game_or_name)
    game = ensure_game(game_or_name)

    analysis = Analysis.new(game)
    return analysis
  end

  def is_split_pot
    return self.split_size > 1
  end

  private

  def ensure_game(game_or_name)
    if game_or_name.is_a? Game
      return game_or_name
    else
      return Game.load(game_or_name)
    end
  end
end

if __FILE__ == $0
  x = Analyzer.new
  puts x.analyze("texas_holdem")
  puts x.analyze("dramaha")
end