function gameTitle(text, opt) {
    var title = new Label({
        text: text,
        size: opt.size,
        font: opt.family,
        color: opt.color,
        bold: true
    });
    return title;
}

function card(isFaceUp, type, x, y) {
    var config = window.config.element.card;
    var configFace = isFaceUp ? config.faceUp : config.faceDown;
    var rect = new Rectangle({
        width: config.size.width,
        height: config.size.height,
        borderColor: configFace.border.color,
        borderWidth: configFace.border.width,
        corner: configFace.border.corner,
        color: configFace.backgroundColor
    });
    var text = new Label({
        text: type,
        size: configFace.font.size,
        font: configFace.font.family,
        color: configFace.font.color,
    }).center(rect);
    if (isFaceUp) {
        var newPip = function() {
            var pip = new Label({
                text: configFace.pip.character,
                size: configFace.pip.size,
                font: configFace.pip.family,
                color: configFace.pip.color
            });
            return pip.center(rect);
        }
        newPip().pos(configFace.pip.offset.x, configFace.pip.offset.y, RIGHT, BOTTOM, rect);
        newPip().pos(configFace.pip.offset.x, configFace.pip.offset.y, LEFT, TOP, rect);
    }
    return rect;
}

function bet() {
    var config = window.config.element.betting_round;
    var size = config.size;

    function newBetCircle() {
        return new Circle({
            color: config.backgroundColor,
            radius: config.radius,
            borderColor: config.border.color,
            borderWidth: config.border.width
        });
    }

    var offset = config.offset;
    var bets = [newBetCircle(), newBetCircle(), newBetCircle()];
    var container = new Container();
    var lastBet;
    for (var j = 0; j < bets.length; j++) {
        lastBet = bets[j];
        lastBet.addTo(container).pos(0, j * -offset)
    }

    var text = new Label({
        text: 'Bet',
        size: config.font.size,
        font: config.font.family,
        color: config.font.color,
    }).sca(1, .86);
    text.center(lastBet);
    return container;
}

function textElement(type) {
    var containerConfig = window.config.element.card.size;
    var container = new Container({
        width: containerConfig.width,
        height: containerConfig.height
    });

    var config = window.config.element.text;
    var rect = new Rectangle({
        borderColor: config.border.color,
        borderWidth: config.border.width,
        corner: config.corner,
        color: config.backgroundColor
    });

    var text = new Label({
        text: type,
        size: config.font.size,
        font: config.font.family,
        color: config.font.color,
        labelWidth: config.labelWidth,
        align: CENTER,
        paddingHorizontal: 40,
        paddingVertical: config.padding.vertical
    });
    text.center(rect);

    rect.pos(0, 0, config.align, config.valign, container);
    return container;
}

function cardPile(isFaceUp, count, text, caption) {
    if (count <= 0) { return; }
    var pileConfig = window.config.element.card.pile.offset;
    var container = new Container();
    var pileCard;
    for (var j = 0; j < count; j++) {
        pileCard = card(isFaceUp, text);
        var xLoc = ((j) * pileConfig.x);
        var yLoc = ((j) * pileConfig.y);
        pileCard.addTo(container).pos(xLoc, yLoc);
    }
    var caption = gameTitle(caption, window.config.element.card.font).pos(0, 3, CENTER, BOTTOM, pileCard);

    return container;
}