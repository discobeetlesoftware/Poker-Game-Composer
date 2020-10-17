function measureText(text, extraOptions = {}) {
  var options = Object.assign({
    fillStyle: '#000',
    x: 0, 
    y: 0,
    fromCenter: false,
    width: 50,
    height: 50,
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

function drawBet(x, y) {
  var config = window.config.element.betting_round;
  var size = config.size;
  var options = {
      fillStyle: config.backgroundColor,
      fromCenter: false,
      x: x,  
      y: y,
      width: size.width,
      height: size.height,
  };
  $('canvas').drawEllipse(options);
  return size;
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
  var arbitraryVerticalOffsetThatSeemsToWorkForUnknownReasons = 12;
  var textSize = measureText(text, textOptions);
  var offset = { x: (elementSize.width / 2), y: (textSize.height / 2) + arbitraryVerticalOffsetThatSeemsToWorkForUnknownReasons };

  var options = {
    fromCenter: true,
    x: x + offset.x, 
    y: y + offset.y,
    fillStyle: config.backgroundColor,
    strokeStyle: config.border.color,
    strokeWidth: config.border.width,
    width: Math.min(textSize.width + 6, elementSize.width),
    height: textSize.height + 6,
    cornerRadius: config.border.corner
  };
  $('canvas').drawRect(options);
  drawText(x + offset.x, y + offset.y, text, textOptions);
  return textSize;
}

function drawCardPile(x, y, type, isFaceDown, count, text) {
  var options = {
    xOffset: 6,
    yOffset: 3,
    strokeWidth: 1
  };

  var textOrigin = { x: x, y: y };
  x += (count - 1) * options.xOffset;
  var cardSize;
  for (var j = 0; j < count; j++) {
    var offset = {
      x: ((count - 1 - j) * options.xOffset),
      y: ((count - 1 - j) * options.yOffset)
    };
    var s = drawCard(x - offset.x, y - offset.y, type, isFaceDown);
    if (j == 0) {
      textOrigin.y += s.height;
      cardSize = s;
      cardSize.width += offset.x;
      cardSize.height += offset.y;
    }
  }

  var textSize = measureText(text);
  var textVerticalOffset = 5;
  var textConfig = window.config.element.detail;
  drawText(textOrigin.x + ((cardSize.width - textSize.width) / 2), textOrigin.y + textVerticalOffset, text, {
    fontSize: textConfig.size,
    fillStyle: textConfig.color,
    fontFamily: textConfig.family
  });
  cardSize.height += textVerticalOffset + cardSize.height;
  return cardSize;
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
  drawText(x + (options.width / 2), y + (options.height / 2), type, { fontSize: faceConfig.fontSize, fromCenter: true, fontFamily: faceConfig.fontFamily });
  if (!isFaceDown) {
    drawText(x + options.strokeWidth + faceConfig.pip.offset, y + options.strokeWidth + faceConfig.pip.offset, '⋆', { fontSize: faceConfig.pip.size, fromCenter: true });
    drawText(x + options.width - options.strokeWidth - faceConfig.pip.offset, y + options.height - options.strokeWidth - faceConfig.pip.offset, '⋆', { fontSize: faceConfig.pip.size, fromCenter: true });
  }
  return { width: options.width, height: options.height };
}

