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

function estimate_text(text, extraOptions = {}) {
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
  }, extraOptions);
  var size = $('canvas').measureText(options);
  return size;
}

function drawText(x, y, text, extraOptions = {}) {
  var options = Object.assign({
    fillStyle: '#000',
    x: x, 
    y: y,
    fromCenter: false,
    width: 50,
    height: 50,
    fontSize: 10,
    fontFamily: 'Verdana, sans-serif',
    text: text
  }, extraOptions);
  var size = $('canvas').measureText(options);
  options.width = size.width;
  options.height = size.height;
  $('canvas').drawText(options);
  return size;
}

function makeRect(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}

function estimate_bet(x, y) {
  var config = window.config.element.betting_round;
  return makeRect(x, y, config.size.width, config.size.height);
}

function drawBet(x, y) {
  var config = window.config.element.betting_round;
  var size = config.size;
  var options = {
      fillStyle: config.backgroundColor,
      fromCenter: true,
      x: x,  
      y: y,
      width: size.width,
      height: size.height,
  };
  $('canvas').drawEllipse(options);
  return size;
}

function estimate_containedText(x, y, text, elementSize) {
  var config = window.config.element.text;
  var textOptions = { 
    fromCenter: true,
    maxWidth: elementSize.width,
    fontSize: config.fontSize,
    fontFamily: config.fontFamily
  };
  var textSize = estimate_text(text, textOptions);
  return makeRect(x, y, 
    textSize.width + (config.margins.left + config.margins.right + (2 * config.border.width)),
     textSize.height + (config.margins.top + config.margins.bottom + (2 * config.border.width)));
}

function drawContainedText(x, y, text, elementSize) {
  var config = window.config.element.text;
  var textOptions = { 
    fromCenter: true,
    maxWidth: elementSize.width,
    fontSize: config.fontSize,
    fontFamily: config.fontFamily,
    fillStyle: config.color
  };
  var textSize = estimate_text(text, textOptions);
  //var offset = { x: (elementSize.width / 2), y: (textSize.height / 2) + arbitraryVerticalOffsetThatSeemsToWorkForUnknownReasons };
  var options = {
    fromCenter: true,
    x: x + (elementSize.width / 2), 
    y: y + config.border.width,
    fillStyle: config.backgroundColor,
    strokeStyle: config.border.color,
    strokeWidth: config.border.width,
    width: Math.min(textSize.width + 6, elementSize.width),
    height: textSize.height + 6,
    cornerRadius: config.border.corner
  };
  $('canvas').drawRect(options);
  drawText(x + (elementSize.width / 2), y + config.border.width, text, textOptions);
  return textSize;
}

function estimate_cardPile(x, y, count, text) {
  var cardEstimate = estimate_card(x, y);
  var pileConfig = window.config.element.card.pile.offset;
  var offset = {
    x: (count - 1) * pileConfig.x,
    y: (count - 1) * pileConfig.y
  }
  return makeRect(x - offset.x, y - offset.y, cardEstimate.width + offset.x, cardEstimate.height + offset.y);
}

function originForCenterInRegion(widths) {
  var largest = Math.max(...widths);
  return widths.map(function(width) {
    return ((largest - width) / 2);
  });
}

function drawCardPile(x, y, type, isFaceDown, count, text) {
  if (count == 0) { return; }
  var textConfig = {
    fontSize: window.config.element.detail.size,
    fillStyle: window.config.element.detail.color,
    fontFamily: window.config.element.detail.family
  };
  var pileConfig = window.config.element.card.pile.offset;
  var textOrigin = { x: x, y: y };

  var textSize = estimate_text(text, textConfig);
  var pileSize = estimate_cardPile(x, y, count, type);
  var adjustedOffsets = originForCenterInRegion([textSize.width, pileSize.width]);
  x += (count - 1) * pileConfig.x;
  var cardSize;
  for (var j = 0; j < count; j++) {
    var offset = {
      x: ((count - 1 - j) * pileConfig.x),
      y: ((count - 1 - j) * pileConfig.y)
    };
    var s = drawCard(x - offset.x + adjustedOffsets[1], y - offset.y, type, isFaceDown);
    if (j == 0) {
      textOrigin.y += s.height;
      cardSize = s;
      cardSize.width += offset.x;
      cardSize.height += offset.y;
    }
  }

  var textVerticalOffset = window.config.element.detail.margins.top;
  drawText(textOrigin.x + adjustedOffsets[0], textOrigin.y + textVerticalOffset, text, textConfig);
  cardSize.height += textVerticalOffset + cardSize.height;
  return {
    height: cardSize.height,
    width: Math.max(textSize.width, pileSize.width)
  }
  // return cardSize;
}

function estimate_card(x, y) {
  var config = window.config.element.card;
  return makeRect(x, y, config.size.width, config.size.height);
}

function drawCard(x, y, type, isFaceDown) {
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

  $('canvas').drawRect(options);
  drawText(x + (options.width / 2), y + (options.height / 2), type, { 
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
      drawText(pipX, pipY, '⋆', pipConfig);
    }
    drawPip(x + options.strokeWidth + faceConfig.pip.offset.x, y + options.strokeWidth + faceConfig.pip.offset.y);
    drawPip(x + options.width - options.strokeWidth - faceConfig.pip.offset.x, y + options.height - options.strokeWidth - faceConfig.pip.offset.y);
  }
  return { width: options.width, height: options.height };
}

