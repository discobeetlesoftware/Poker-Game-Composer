function combineEstimate(list) {
  return list.reduce(function(t, v) {
    return {
      width: t.width + v.width, 
      height: Math.max(t.height, v.height)
    }
  });
}

function combineEstimates(list) {
  return combineEstimate(list.map(function(innerList) {
    return combineEstimate(innerList);
  }));
}

class Rect {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }
}

class Region {
  constructor(canvas) {
    this.canvas = canvas;
    this.frame = new Rect();
  }

  get x() { return this.frame.x; }
  set x(value) { this.frame.x = value; }

  get y() { return this.frame.y; }
  set y(value) { this.frame.y = value; }

  get width() { return this.frame.width; }
  set width(value) { this.frame.width = value; }

  get height() { return this.frame.height; }
  set height(value) { this.frame.height = value; }

  get maxX() { return this.x + this.width; }
}

class CanvasEstimator {
  constructor(canvas) {
    this.canvas = canvas;
  }

  drawText(x, y, text, opt) {
    opt.text = text;
    var size = this.canvas.measureText(opt);
    return size;
  }

  drawCard(x, y, type, isFaceDown) {
    var config = window.config.element.card;
    return {
      x: x,
      y: y,
      width: config.size.width,
      height: config.size.height
    };
  }
}

class GameRegion extends Region {
  constructor(canvas) {
    super(canvas);
    this.sections = [];
    this.sectionSizes = [];
    this.sectionTitleHeight = this.estimateText('abcdefghijlkmnoppqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ', {
      fillStyle: window.config.section.title.color,
      fontSize: window.config.section.title.size,
      fontFamily: window.config.section.title.family
    }).height;
    this.sectionHeight = 0;
  }

  section(name) {
    var isNotFirstSection = this.sections.length > 0;
    var section = new SectionRegion(this, name);
    var titleConfig = section.config.title;
    section.x = this.maxX + (isNotFirstSection ? section.config.horizontalSpacing : 0);
    section.y = this.y + this.sectionTitleHeight + titleConfig.margins.top + titleConfig.margins.bottom;
    return section;
  }

  yLocation(sectionIndex, elementIndex) {
    var size = self.sectionSizes[sectionIndex][elementIndex];
    this.section[sectionIndex].y + ((this.sectionHeight - size.height) / 2);
  }

  render(operations) {
    var game = this;
    game.canvas.detectPixelRatio(function(ratio) {
      operations();
      var estimator = new CanvasEstimator(game.canvas);
      var sectionHeight = 0;
      game.sections.forEach(function(section) {
        section.x = game.maxX;
        var sectionWidth = 0;
        var height = 0;
        var titleSize = section.drawTitle();
        sectionWidth = titleSize.width;
        section.renders.forEach(function(renderer) {
          var estimate = renderer(estimator) ?? { width: 0, height: 0 };
          sectionWidth = Math.max(sectionWidth, estimate.width);
          height += estimate.height;
        });
        section.width = sectionWidth;
        game.width += sectionWidth;
      });
      game.sectionHeight = sectionHeight;

      game.sections.forEach(function(section) {
        section.renders.forEach(function(renderer) {
          renderer(section);
        });
      });
    });
  }

  estimateText(text, opt) {
    var options = Object.assign({
      fillStyle: '#000',
      x: 0, 
      y: 0,
      fromCenter: false,
      width: 500,
      height: 500,
      fontSize: 10,
      fontFamily: 'Verdana, sans-serif',
      text: text
    }, opt);
    var size = this.canvas.measureText(options);
    return size;
  }

  drawText(x, y, text, opt) {
    var options = Object.assign({
      fillStyle: '#000',
      x: x, 
      y: y,
      fromCenter: false,
      width: 100,
      height: 50,
      fontSize: 10,
      fontFamily: 'Verdana, sans-serif',
      text: text
    }, opt);
    var size = this.canvas.measureText(options);
    options.width = size.width;
    options.height = size.height;
    this.canvas.drawText(options);
    return size;
  }

  estimateCard(type, isFaceDown) {
    var config = window.config.element.card;
    alert(config.size.height);
    return { width: config.size.width, height: config.size.height };
  }

  drawCard(x, y, type, isFaceDown) {
    var config = window.config.element.card;
    var options = {
      x: x, 
      y: y,
      strokeStyle: config.border.color,
      strokeWidth: config.border.width,
      width: config.size.width,
      height: config.size.height,
      fromCenter: false,
      cornerRadius: config.corner
    };
    var faceConfig = isFaceDown ? config.faceDown : config.faceUp;
    options.fillStyle = faceConfig.backgroundColor;
    this.canvas.drawRect(options);
    this.drawText(x + (options.width / 2), y + (options.height / 2), type, { 
      fillStyle: faceConfig.fontColor, 
      fontSize: faceConfig.fontSize, 
      fromCenter: true, 
      fontFamily: faceConfig.fontFamily 
    });
    if (!isFaceDown) {
      var pipConfig = {
        fromCenter: true,
        fontSize: faceConfig.pip.size,
        fillStyle: faceConfig.pip.color
      };
      var drawPip = function(pipX, pipY) {
        this.drawText(pipX, pipY, '⋆', pipConfig);
      }
      drawPip.call(this, x + options.strokeWidth + faceConfig.pip.offset.x, y + options.strokeWidth + faceConfig.pip.offset.y);
      drawPip.call(this, x + options.width - options.strokeWidth - faceConfig.pip.offset.x, y + options.height - options.strokeWidth - faceConfig.pip.offset.y);
    }
    return { width: options.width, height: options.height };
  }
}

class SectionRegion extends Region {
  constructor(game, name) {
    super(game.canvas);
    this.config = window.config.section;
    this.game = game;
    game.sections.push(this);
    this.name = name ?? ('section_' + game.sections.length);
    this.renders = [];
  }

  render(operations) {
    this.renders.push(operations ?? (function(context){ return { width: 0, height: 0 }; }));
  }

  //
  // private
  //
  drawTitle() {
    var titleConfig = this.config.title;
    return this.game.drawText(this.x + titleConfig.margins.left, this.game.y + titleConfig.margins.top, this.name, {
      fillStyle: titleConfig.color,
      fontSize: titleConfig.size,
      fontFamily: titleConfig.family
    });
  }

  drawCard(type, isFaceDown) {
    var size = this.game.estimateCard(type, isFaceDown);
    alert(this.game.sectionHeight);
    var yLocation = this.y + ((this.game.sectionHeight - size.height) / 2);
    size = this.game.drawCard(this.x, yLocation, type, isFaceDown);
    this.width += size.width;
    return size;
  }
}
/*function Region() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
};
Region.prototype.appendDown = function(frame) {
  this.width = Math.max(this.width, frame.width);
  this.height += frame.height;
};
Region.prototype.maxX = function() { return this.x + this.width; }
Region.prototype.maxY = function() { return this.y + this.height; }

function GameRegion(canvas) {
  this.canvas = canvas;
  this.frame = new Region();
  this.sectionRegions = [];
}
GameRegion.prototype.originX = function() { return this.frame.x; };
GameRegion.prototype.originY = function() { return this.frame.y; };
GameRegion.prototype.width = function() { return this.frame.width; };
GameRegion.prototype.height = function() { return this.frame.height; };

function SectionRegion(game) {
  this.frame = new Region();
  this.game = game;
  this.canvas = game.canvas;
  game.sectionRegions.push(this);
  this.elementRegions = [];
}

SectionRegion.prototype.originX = function() {
  var index = this.game.sectionRegions.indexOf(this);
  if (index == 0) {
    return this.game.originX() + this.frame.x;
  } else {
    var lastSection = this.game.sectionRegions[index - 1];
    return lastSection.frame.maxX();
  }
};
SectionRegion.prototype.originY = function() { return this.game.originY() + this.frame.y; };
SectionRegion.prototype.width = function() { return this.game.width() + this.frame.width; };
SectionRegion.prototype.height = function() { return this.game.height() + this.frame.height; };

SectionRegion.prototype.renderDown = function(callback) {
  var element = callback(this.originX(), this.originY() + this.height());
  this.frame.appendDown(element);
};

function ElementRegion(section) {
  this.frame = new Region();
  this.section = section;
  this.canvas = section.canvas;
  section.elementRegions.push(this);
};
ElementRegion.prototype.originX = function() { return this.section.originX() + this.frame.x; };
ElementRegion.prototype.y = function() { return this.section.originY() + this.frame.y; };
ElementRegion.prototype.width = function() { return this.section.width() + this.frame.width; };
ElementRegion.prototype.height = function() { return this.section.height() + this.frame.height; };

ElementRegion.prototype.estimateTitle = function(text, config) {
  var options = Object.assign({
    fromCenter: false,
    fontSize: 10,
    fontFamily: 'Verdana, sans-serif',
    text: text
  }, config);
  return this.canvas.measureText(options);
};

ElementRegion.prototype.drawTitle = function(text, config) {
  var element = this;
  this.section.renderDown(function(x, y) {
    var config = config ?? window.config.section.title
    var options = Object.assign({
      x: x,
      y: y,
      layer: true,
      name: 'title_' + text,
      fromCenter: false,
      width: 100,
      height: 100,
      fillStyle: 'black',
      fontSize: 12,
      fontFamily: 'Verdana',
      text: text
    }, config ?? window.config.section.title);
    var textSize = element.estimateTitle(text, options);
    element.canvas.drawText(options);
    element.frame.width = textSize.width;
    element.frame.height = textSize.height;
    return element.frame;
  });
};
*/