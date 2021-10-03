"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var nunjucks = require("nunjucks");
var path = require("path");
var database_1 = require("./models/database");
var game_section_1 = require("./models/game_section");
var game_element_1 = require("./models/game_element");
var game_element_type_1 = require("./models/game_element_type");
var factory_1 = require("./models/factory");
var app = express();
var rootPath = path.join(__dirname, '..', '..');
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
        console.log(game.description);
        res.render('game', { game: game });
    }).catch(function (reason) {
        next(reason);
    });
});
//
app.get("/component/edit/section/:section_index", function (req, res, next) {
    var section_index = req.params.section_index;
    res.render('partials/edit/section', { layout: false, section_index: section_index, key: "section_" + section_index, section: new game_section_1.GameSection() });
});
app.get("/component/edit/section/:section_index/element/:element_index", function (req, res, next) {
    var section_index = req.params.section_index;
    var element_index = req.params.element_index;
    res.render('partials/edit/element', {
        layout: false,
        key: "element_" + section_index + "_" + element_index,
        element: new game_element_1.GameElement(),
        section_index: section_index,
        element_index: element_index
    });
});
app.get("/component/edit/section/:section_index/element/:element_index/type/:element_type", function (req, res, next) {
    var time = Math.floor(Date.now() / 1000);
    var type = game_element_type_1.GameElementType[req.params.element_type];
    res.render('partials/edit/elements/' + req.params.element_type, {
        layout: false,
        key: "element_" + time,
        element: factory_1.Factory.create_element(type)
    });
});
app.get("/component/edit/game/evaluation/:evaluation_index", function (req, res, next) {
    var keys = req.params.evaluation_index.split('_');
    console.log(keys);
    var id = keys.shift();
    var key = "[" + id + "]";
    keys.forEach(function (element) {
        key += "[split][" + element + "]";
        id += "_" + element;
    });
    res.render('partials/edit/evaluation', {
        evaluationKey: id,
        evaluationContext: key
    });
});
app.get("/edit/:game", function (req, res, next) {
    var gameName = req.params.game;
    database.loadGame(gameName).then(function (game) {
        res.render("edit", { game: game, action: "/edit/" + game.sanitized_name });
    });
});
app.post("/edit/:game", function (req, res, next) {
    console.dir(JSON.stringify(req.body, null, 4));
    var game = factory_1.Factory.hydrate_game(req.body);
    if (game == null) {
        return next('Could not save game');
    }
    database.saveGame(game).then(function () {
        res.redirect("/game/" + game.sanitized_name);
    }).catch(function (reason) {
        next(reason);
    });
});
app.get("/newgame", function (req, res, next) {
});
app.listen(3385 || process.env.PORT, function () {
    console.log("Server started listening");
});
