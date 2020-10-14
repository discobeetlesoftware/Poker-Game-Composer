class Element
  def self.from_params(params)
    (params || []).map do |data|
      element = Element.new
      element.type = data.delete('type')
      element.value = data.delete('value')
      element.options = data.transform_values do |v|
        if v == "on"
          true
        else
          v
        end
      end
      element
    end
  end

  attr_accessor :type
  attr_accessor :value
  attr_accessor :options

  def initialize(json = {})
   self.type = json['type']
   self.value = json['value']
   self.options = (json['options'] || {})
  end

  def to_hash
    {
      :type => self.type,
      :value => self.value,
      :options => self.options
    }
  end

  def to_s
    return self.type if self.value.nil?
    result = "#{self.type} => #{self.value}"
    result += options.map { |k,v| "#{k}=>#{v}"}.join(", ") unless options.empty?
    result
  end
end