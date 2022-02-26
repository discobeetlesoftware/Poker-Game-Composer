"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var nunjucks = require("nunjucks");
var path = require("path");
var database_1 = require("./models/database");
var game_1 = require("./models/game");
var game_section_1 = require("./models/game_section");
var game_element_1 = require("./models/game_element");
var game_element_type_1 = require("./models/game_element_type");
var factory_1 = require("./models/factory");
var evalulation_1 = require("./models/evalulation");
var renderable_game_1 = require("./models/render/renderable_game");
var renderable_evaluation_1 = require("./models/render/renderable_evaluation");
var app = express();
var rootPath = path.join(__dirname, '..');
var database = new database_1.Database(rootPath, 'games');
app.use(express.static('src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    console.log("Received: " + req.path);
    return next();
});
var viewsDirectory = path.join(__dirname, '..', 'src', 'views');
app.set('views', viewsDirectory);
app.set('view engine', 'njk');
nunjucks.configure(viewsDirectory, {
    autoescape: false,
    express: app
});
// register routes
// Index
app.get('/', function (req, res) {
    database.loadGames().then(function (games) {
        function stripJSON(input) {
            return input.replace('.json', '');
        }
        res.render('index', { links: games.map(stripJSON) });
    });
});
// API:schema
app.get('/schema/:game.json', function (req, res, next) {
    var gameName = req.params.game;
    database.loadSchema(gameName).then(function (result) {
        res.json(result);
    }).catch(function (reason) {
        next(reason);
    });
});
// Display game
app.get('/game/:game', function (req, res, next) {
    var gameName = req.params.game;
    database.loadGame(gameName).then(function (game) {
        res.render('game', { game: new renderable_game_1.RenderableGame(game) });
    }).catch(function (reason) {
        res.status(404);
        res.send('404: ' + reason);
    });
});
//
app.get("/component/edit/section/:section_index", function (req, res, next) {
    var section_index = req.params.section_index;
    res.render('partials/edit/section', { layout: false, section_index: section_index, key: "section_".concat(section_index), section: new game_section_1.GameSection() });
});
app.get("/component/edit/section/:section_index/element/:element_index", function (req, res, next) {
    var section_index = req.params.section_index;
    var element_index = req.params.element_index;
    res.render('partials/edit/element', {
        layout: false,
        key: "element_".concat(section_index, "_").concat(element_index),
        element: new game_element_1.GameElement(),
        section_index: section_index,
        element_index: element_index
    });
});
app.get("/component/edit/section/:section_index/element/:element_index/type/:element_type", function (req, res, next) {
    var section_index = req.params.section_index;
    var element_index = req.params.element_index;
    var time = Math.floor(Date.now() / 1000);
    var type = game_element_type_1.GameElementType[req.params.element_type];
    res.render('partials/edit/elements/' + req.params.element_type, {
        layout: false,
        key: "element_".concat(time),
        element: factory_1.Factory.create_element(type),
        section_index: section_index,
        element_index: element_index
    });
});
app.get("/component/edit/game/:game/evaluation/:evaluation_index", function (req, res, next) {
    var gameName = req.params.game;
    var keys = req.params.evaluation_index.split('_');
    var id = keys.shift();
    var key = "[".concat(id, "]");
    keys.forEach(function (element) {
        key += "[split][".concat(element, "]");
        id += "_".concat(element);
    });
    var gameFoundHandler = function (game) {
        var keys = req.params.evaluation_index.split('_');
        keys.shift();
        var evaluation = game.evaluation;
        keys.forEach(function (index_str) {
            var index = parseInt(index_str);
            evaluation = evaluation.splits[index];
        });
        if (!evaluation) {
            evaluation = new evalulation_1.Evaluation();
        }
        res.render('partials/edit/evaluation', {
            game: game,
            evaluation: new renderable_evaluation_1.RenderableEvaluation(evaluation),
            evaluationKey: id,
            evaluationContext: key
        });
    };
    var gameMissingHandler = function () {
        res.render('partials/edit/evaluation', {
            evaluation: new evalulation_1.Evaluation(),
            evaluationKey: id,
            evaluationContext: key
        });
    };
    database.loadGame(gameName).then(gameFoundHandler, gameMissingHandler);
});
function nameForHand(value) {
    return {
        high: 'High',
        pair: 'Pair',
        two_pair: 'Two pair',
        three_of_a_kind: 'Three of a kind',
        straight: 'Straight',
        flush: 'Flush',
        full_house: 'Full house',
        four_of_a_kind: 'Four of a kind',
        straight_flush: 'Straight flush',
        royal_flush: 'Royal flush',
        five_of_a_kind: 'Five of a kind'
    }[value];
}
app.get('/component/edit/evaluation/:evaluation_key/invalidation_hand/:hand', function (req, res, next) {
    var context = req.params.evaluation_key;
    var splits = context.split('_');
    var key = "[".concat(splits.shift(), "]");
    splits.forEach(function (element) {
        key += "[split][".concat(element, "]");
    });
    var hand = req.params.hand;
    var element_id = "evaluation_qualifier_invalidation_hand_".concat(hand);
    res.render('partials/edit/hand_element', {
        element_id: element_id,
        hand_value: hand,
        element_key: "evaluation".concat(key, "[invalidation_hands][]"),
        text: nameForHand(hand),
        delete_call: "removeInvalidationHand('".concat(context, "', '").concat(hand, "', '").concat(element_id, "');")
    });
});
app.get("/edit/:game", function (req, res, next) {
    var gameName = req.params.game;
    database.loadGame(gameName).then(function (game) {
        res.render("edit", { game: new renderable_game_1.RenderableGame(game) });
    });
});
app.get('/create', function (req, res, next) {
    res.render("edit", { game: new renderable_game_1.RenderableGame(new game_1.Game()) });
});
app.post('/update', function (req, res, next) {
    console.dir(JSON.stringify(req.body, null, 4));
    var game = factory_1.Factory.hydrate_game(req.body);
    if (game == null) {
        return next('Could not save game');
    }
    database.saveGame(game).then(function () {
        res.redirect("/game/".concat(game.sanitized_name));
    }).catch(function (reason) {
        next(reason);
    });
});
app.listen(3385 || process.env.PORT, function () {
    console.log("Server started listening: http://localhost:3385");
});
