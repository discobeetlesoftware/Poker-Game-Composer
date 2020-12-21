require_relative "../models/analyzer"
require "test/unit"
 
class TestAnalyzer < Test::Unit::TestCase
 
  def test_holdem
    x = Analyzer.new
    result = x.analyze("texas_holdem")
    assert_equal("Texas Hold'em", result.name)
    assert_equal(2, result.player_cards)
    assert_equal(4, result.section_count)
    assert_equal(1, result.split_size)
    assert_equal(false, result.has_draws)
  end

   def test_dramaha
    x = Analyzer.new
    result = x.analyze("dramaha")
    assert_equal("Dramaha", result.name)
    assert_equal(5, result.player_cards)
    assert_equal(4, result.section_count)
   # assert_equal(2, result.split_size)
    assert_equal(true, result.has_draws)
  end
end