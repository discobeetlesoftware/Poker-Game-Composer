require 'git'

class Database
  attr_accessor :g

  def initialize
    self.g = Git.open(File.expand_path(File.join(__dir__, '..', '..')), :log => Logger.new(STDOUT))
  end
end
