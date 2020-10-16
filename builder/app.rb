require 'sinatra'
require_relative 'models/game'

configure do
	set :views, File.join(__dir__, "views")
	set :games_dir, File.expand_path(File.join(__dir__, "..", "games"))
end

def indent(count, lines)
	tabs = "  " * count
	lines.split("\n").map { |line| "#{tabs}#{line}"}.join("\n")
end

def output_content(value)
	if value.nil? or value == ''
		'<em>None</em>'
	elsif value.kind_of?(Array)
		value.join(', ')
	else
		value
	end
end

post '/test' do
  puts params
end

get '/' do
	@games = Dir.glob(File.join(settings.games_dir, "*.json")).sort.map do |path|
		File.basename(path, ".json")
	end
	haml :list
end

get '/show/:name' do |n|
  @name = n
	@game = Game.load(n)
	@file = Game.path(n)
	useTemplate = (params['useTemplate'] ||= "true") == "true"
	haml :showCanvas, :layout => useTemplate
end

get '/create/section/:id' do |id|
	haml :section, :layout => false, :locals => { :id => id, :key => "section_#{id}", :section => Section.new }
end

get '/create/section/:section_id/element/:element_id' do |section_id, element_id|
	haml :element, :layout => false, :locals => { 
    :section_id => section_id, 
    :element_id => element_id, 
    :key => "element_#{section_id}_#{element_id}",
    :element => Element.new
  }
end

get '/create/section/:section_id/element/:element_id/type/:type' do |section_id, element_id, type|
  time = Time.now.to_i
	haml "elementUpdate/#{params['type']}".to_sym, :layout => false, :locals => { 
    :element => Element.create(params), 
    :section_id => "section_#{section_id}",
    :key => "element_#{time}"
  }
end

get '/create' do
	haml :update, :locals => { :game => Game.new, :action => "/create", :method => "post" }
end

post '/create' do
	puts params
	game = Game.from_params(params)
  puts game
	game.save(settings.games_dir)
	redirect to('/')

end

get '/edit/:game' do |n|
  haml :update, :locals => { :game => Game.load(n), :action => "/edit/#{n}", :method => 'post' }
end

post '/edit/:game' do |n|
  game = Game.from_params(params)
  game.save(settings.games_dir)
  redirect to("/show/#{n}")
end

delete '/delete/:game' do
end