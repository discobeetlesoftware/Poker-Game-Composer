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
  var size = { width: 30, height: 22 };
  var options = {
      fillStyle: '#916ebf',
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
  var textOptions = { 
    fromCenter: true,
    maxWidth: elementSize.width
  };
  var textSize = drawText(x + (elementSize.width / 2), y + (elementSize.height / 2), text, textOptions);
  var options = {
    x: x + (elementSize.width / 2), 
    y: y + (elementSize.height / 2),
    strokeStyle: '#000',
    fillStyle: '#d9ffe3',
    strokeWidth: 1,
    width: Math.min(textSize.width + 6, elementSize.width),
    height: textSize.height + 6,
    fromCenter: true,
    cornerRadius: 4
  };
  $('canvas').drawRect(options);
  drawText(x + (elementSize.width / 2), y + (elementSize.height / 2), text, textOptions);
  return textSize;
}

function drawCard(x, y, type, isFaceDown) {
  var options = {
    x: x, 
    y: y,
    strokeStyle: '#212121',
    strokeWidth: 1,
    width: 30,
    height: 45,
    fromCenter: false,
    cornerRadius: 5
  };
  if (isFaceDown) {
    options.fillStyle = '#d2d9e2';
  } else {
    options.fillStyle = '#feffe4';
  }
  $('canvas').drawRect(options);
  drawText(x + (options.width / 2), y + (options.height / 2), type, { fontSize: 25, fromCenter: true, fontFamily: 'Courier' });
  if (!isFaceDown) {
    drawText(x + options.strokeWidth + 5, y + options.strokeWidth + 5, '⋆', { fontSize: 22, fromCenter: true });
    drawText(x + options.width - options.strokeWidth - 5, y + options.height - options.strokeWidth - 5, '⋆', { fontSize: 22, fromCenter: true });
  }
  return { width: 30, height: 45 };
}

