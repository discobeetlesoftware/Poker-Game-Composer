//////////// [Section <%= section_index %>] <%= name %> ////////////"
var <%= build_function_name %> = function(section_index) {
  var section = new Container().addTo(sections);
  var gutter = new Container().addTo(section);

  var build_elements = function() {
    var elements = [
      <% elements.map.with_index do |element, element_index| %>
      function() { //////////// [<%= section_index %>.<%= element_index %>] <%= element %> ////////////,
        return <%= element.draw(section_index, element_index) %>;
      },
    <% end %>
    ];
    var lastElementMaxX = 0;

    elements.forEach(function(generator, index) {
      var element = generator();
      lastElementMaxX += element.width + config.element.horizontalSpacing;
    });

    gutter.pos(0, section.height, LEFT, TOP);
  };

  build_elements();
  return section;
};

nextSection = <%= build_function_call(section_index) %>;
if (lastSection == undefined) {
  lastSectionBounds = { x: 0, y: 0, width: 0, height: 0};
  sectionXLocation = 0;
} else {
  lastSectionBounds = lastSection.getBounds(); 
  sectionXLocation += lastSectionBounds.width + config.section.horizontalSpacing;
}

gameTitle("<%= name %>", config.section.title).addTo(sectionTitles).pos(sectionXLocation, window.config.section.title.margins.top);
sectionsSize.width = sectionXLocation - config.section.horizontalSpacing;
sectionsSize.height = Math.max(sectionsSize.height, lastSectionBounds.height);
nextSection.pos(sectionXLocation, 0, LEFT, CENTER);
lastSection = nextSection;