

// scaling, width, height, color, outerColor, assets, path, progress, rollover, touch, 
//scrollTop, align, valign, canvasID, rollPerSecond, delay, canvasCheck, gpu, gpuObj, 
//nextFrame, nextStage, allowDefault, loadFailObj, sensors, retina, mouseMoveOutside, captureMouse, shim, maxConnections
var frame = new Frame({
  scaling: "full",
  width: 1024,
  height: 768,
  color: light,
  outerColor: dark
});
frame.on("ready", function() {
  var stage = frame.stage;
  var stageW = frame.width;
  var stageH = frame.height;

  var navigationContainer = new Container(1024, 768);
  navigationContainer.type = "Region";
  new Label({text: "navigation"}).center(navigationContainer);

  var title = gameTitle("<%= name %>", config.game.title).addTo();

  var detailsLabel = new Label({
    text: "<%= details.join(" • ") %>",
    size: window.config.game.detail.size,
    font: window.config.game.detail.family,
    color: window.config.game.detail.color,
    labelWidth: stageW * 0.75
  }).addTo();

  var sectionTitles = new Container(stageW, stageH).addTo();

  var sections = new Container(stageW, stageH).addTo();

  var descriptionLabel = new Label({
    text: "<%= description %>",
    size: window.config.game.description.size,
    font: window.config.game.description.family,
    color: window.config.game.description.color,
    labelWidth: stageW * 0.75
  }).addTo();

  var gameContainer = new Container(1024, 768).addTo();
  gameContainer.type = "Region";
  var layout = new Layout(
    stage,
    [
     // {object:navigationContainer, marginTop:10, minHeight: 50, valign:"top"},
      {object:title, valign: CENTER, align: CENTER, marginTop: 5, maxWidth: 75},
      {object:detailsLabel, valign: CENTER, align: CENTER, maxWidth: 90},
      {object:sectionTitles, valign: CENTER, align: CENTER, maxWidth: 90},
      {object:sections, valign: CENTER, align: CENTER, maxWidth: 90},
      {object:descriptionLabel, valign: CENTER, align: CENTER, maxWidth: 90},
    ],
    5, null, true, new Shape()
  );

  const manager = new LayoutManager();
  manager.add(layout);
  frame.on("resize", () => {   
    manager.resize();
    stage.update();
  });

  var sectionsSize = {width: 0, height:0};
  var lastSection; var nextSection; var lastSectionBounds; var sectionXLocation = 0;
  var titleBounds = title.getBounds();

  <%= draw_regions %>

  sectionTitles.setBounds(sectionsSize.width, 100);
  sections.setBounds(sectionsSize.width, sectionsSize.height);

  stage.update();



  stage.update(); // update the stage to see any changes
});
