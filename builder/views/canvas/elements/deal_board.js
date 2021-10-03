function() {
  var container = new Container();
  var c;
  var xpos = 0;
  <% card_count.times do |c| %>
  c = card(false, 'C').addTo(container).pos(xpos, 0);
  xpos += c.width + window.config.element.card.groupMargin;
  <% end %>
  container.pos(lastElementMaxX, 0, LEFT, TOP, section);

  return container;
}()