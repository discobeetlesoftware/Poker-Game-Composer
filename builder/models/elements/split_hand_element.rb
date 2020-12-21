require_relative '../template'

class SplitHandElement
  include TemplateMixin
  attr_accessor :split_sizes

  def self.from_params(params)
    values = params['handSize'] || []
    SplitHandElement.new({
      'split_sizes' => values.map(&:to_i)
    })
  end

  def initialize(json = {})
    self.split_sizes = json['split_sizes'] || []
  end

  def type
    'split_hand'
  end

  def to_hash
    { :type => 'split_hand', :split_sizes => self.split_sizes }
  end

  def draw(section_index, element_index)
    load_template('elements/split_hand', 'js').render(binding)
  end

  def explain(lookup = nil)
    descriptions = {
      2 => "Hold 'em",
      4 => "Omaha"
    }
    numbers = {
      2 => "two",
      3 => "three",
      4 => "four",
      5 => "five",
      6 => "six",
      7 => "seven",
      8 => "eight",
      9 => "nine",
      10 => "ten"
    }
    if is_equal_split
      lookup.nil? ? descriptions[split_sizes.first] : lookup.first
      return [
        "#{numbers[split_sizes.length]} #{split_sizes.first}-card #{lookup.nil? ? descriptions[split_sizes.first] : lookup.first} hands and cap each hand."
      ]
    end
    split_sizes.sort.map.with_index do |size, i|
      if lookup.nil?
        "#{size}-card #{descriptions[size]} hand"
      else
        "#{size}-card #{lookup[i]} hand"
      end
    end
  end

  def to_s
    "SplitHand #{self.split_sizes}"
  end

  def is_equal_split
    self.split_sizes.all? do |split|
      self.split_sizes.first == split
    end
  end

  def canvas_title
    if is_equal_split
    else
      hands = self.split_sizes.map { |h| "#{h}-" }
      "\"Separate into #{hands.last(2). join(" & ")}card hands, cap cards\""
    end
  end

  def canvas_size
    %{estimate_containedText(0, 0, #{canvas_title}, { width: 120, height: 80 })}
  end

  def render_canvas(i,j)
    results = ["var elementSize = { width: 120, height: 80 };"]
    if is_equal_split
    else
      hands = self.split_sizes.map { |h| "#{h}-" }
      
      first = hands[0..(hands.count - 2)]
      results << %{drawContainedText(window.elementLocations.center().x, window.elementLocations.center().y, "Separate into #{hands.last(2). join(" & ")}card hands, cap cards", elementSize);}
    end
    results << "xLocation += elementSize.width;"
    results.join("\n")
  end
end