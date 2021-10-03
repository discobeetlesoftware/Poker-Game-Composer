function () {
  var element = textElement(section, 0, 0, <%= canvas_title %>);
  var yLoc = ((window.config.element.card.size.height - element.height) / 2.0);
  element.pos(lastElementMaxX, yLoc, LEFT, BOTTOM, section);
  return element;
}()
