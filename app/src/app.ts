import * as express from "express";
import { Request, Response } from "express";
import * as nunjucks from "nunjucks";
import path = require("path");
import fs = require("fs");
import { Database } from "./models/database";
import { Game } from "./models/game";
import { GameSection } from "./models/game_section";
import { GameElement } from "./models/game_element";
import { GameElementType } from "./models/game_element_type";
import { Factory } from "./models/factory";

const app = express();
const rootPath = path.join(__dirname, '..', '..');
const database = new Database(rootPath, 'games');

app.use(express.static('src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  console.log("Received: " + req.path);
  return next();
});
const viewsDirectory = path.join(__dirname, '..', 'src', 'views');
app.set('views', viewsDirectory);
app.set('view engine', 'njk');
nunjucks.configure(viewsDirectory, {
  autoescape: true,
  express: app
});

// register routes

// Index
app.get('/', function(req: Request, res: Response) {
  database.loadGames().then(function(games: string[]) {
    function stripJSON(input: string): string {
      return input.replace('.json', '');
    } 
    res.render('index', {links: games.map(stripJSON)});
  });
});

// API:schema
app.get('/schema/:game.json', function(req: Request, res: Response, next) {
  var gameName = req.params.game;
  database.loadSchema(gameName).then(function(result: object) {
    res.json(result);
  }).catch(function(reason: any) {
    next(reason);
  });
});

// Display game
app.get('/game/:game', function(req: Request, res: Response, next) {
  var gameName = req.params.game;
  database.loadGame(gameName).then(function(game: Game) {
    res.render('game', { game: game });
  }).catch(function(reason: any) {
    next(reason);
  });
});

//
app.get("/component/edit/section/:section_index", function(req: Request, res: Response, next) {
  let section_index = req.params.section_index;
  res.render('partials/edit/section', { layout: false, section_index: section_index, key: `section_${section_index}`, section: new GameSection() });
});

app.get("/component/edit/section/:section_index/element/:element_index", function(req: Request, res: Response, next) {
  let section_index = req.params.section_index;
  let element_index = req.params.element_index;
  res.render('partials/edit/element', { 
    layout: false,
    key: `element_${section_index}_${element_index}`,
    element: new GameElement(),
    section_index: section_index,
    element_index: element_index
  });
});

app.get("/component/edit/section/:section_index/element/:element_index/type/:element_type", function(req: Request, res: Response, next) {
  let time = Math.floor(Date.now() / 1000);
  let type = GameElementType[req.params.element_type];
  res.render('partials/edit/elements/' + req.params.element_type, {
    layout: false,
    key: `element_${time}`,
    element: Factory.create_element(type)
  });
});

app.get("/edit/:game", function(req: Request, res: Response, next) {
  var gameName = req.params.game;
  database.loadGame(gameName).then(function(game: Game) {
    res.render("edit", { game: game, action: `/edit/${game.sanitized_name}` });
  });
});

app.post("/edit/:game", function(req: Request, res: Response, next) {
  let game = Factory.hydrate_game(req.body);
  if (game == null) {
    return next('Could not save game');
  }
  database.saveGame(game).then(() => {
    res.redirect(`/game/${game.sanitized_name}`);
  }).catch((reason: any) => {
    next(reason);
  });
});

app.get("/newgame", function(req: Request, res: Response, next) {

});

app.listen(3385 || process.env.PORT, () => {
  console.log("Server started listening");
});