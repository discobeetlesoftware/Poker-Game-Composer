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
import { Evaluation, Hand } from "./models/evalulation";
import { RenderableGame } from "./models/render/renderable_game";
import { RenderableEvaluation } from "./models/render/renderable_evaluation";

const app = express();
const editRouter = express.Router();
const rootPath = path.join(__dirname, '..');
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
  autoescape: false,
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
    res.render('game', { game: new RenderableGame(game) });
  }).catch(function(reason: any) {
    res.status(404);
    res.send('404: ' + reason);
  });
});

editRouter.get('/section/:section_index', function(req: Request, res: Response, next) {
  let section_index = req.params.section_index;
  res.render('partials/edit/section', { layout: false, section_index: section_index, key: `section_${section_index}`, section: new GameSection() });
});

editRouter.get('/section/:section_index/element/:element_index', function(req: Request, res: Response, next) {
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

editRouter.get('/section/:section_index/element/:element_index/type/:element_type', function(req: Request, res: Response, next) {
  let section_index = req.params.section_index;
  let element_index = req.params.element_index;
  let time = Math.floor(Date.now() / 1000);
  let type = GameElementType[req.params.element_type];
  res.render('partials/edit/elements/' + req.params.element_type, {
    layout: false,
    key: `element_${time}`,
    element: Factory.create_element(type),
    section_index: section_index,
    element_index: element_index
  });
});

editRouter.get('/game/:game/evaluation/:evaluation_index', function(req: Request, res: Response, next) {
  var gameName = req.params.game;    
  var keys = req.params.evaluation_index.split('_');
  var id = keys.shift();
  var key = `[${id}]`;
  keys.forEach((element: string) => {
    key += `[split][${element}]`;
    id += `_${element}`;
  });

  var gameFoundHandler = (game: Game) => {
    var keys = req.params.evaluation_index.split('_');
    keys.shift();
    var evaluation = game.evaluation;
    
    keys.forEach((index_str: string) => {
      const index = parseInt(index_str);
      evaluation = evaluation.splits[index];
    });

    if (!evaluation) {
      evaluation = new Evaluation();
    }

    res.render('partials/edit/evaluation', {
      game: game,
      evaluation: new RenderableEvaluation(evaluation),
      evaluationKey: id,
      evaluationContext: key
    });
  };

  var gameMissingHandler = () => {
    res.render('partials/edit/evaluation', {
      evaluation: new Evaluation(),
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

editRouter.get('/evaluation/:evaluation_key/invalidation_hand/:hand', function(req: Request, res: Response, next) {
  let context = req.params.evaluation_key;
  var splits = context.split('_');
  var key = `[${splits.shift()}]`;
  splits.forEach((element: string) => {
      key += `[split][${element}]`;
  });
  let hand = req.params.hand;
  let element_id = `evaluation_qualifier_invalidation_hand_${hand}`;
  res.render('partials/edit/hand_element', {
    element_id: element_id,
    hand_value: hand,
    element_key: `evaluation${key}[invalidation_hands][]`,
    text: nameForHand(hand),
    delete_call: `removeInvalidationHand('${context}', '${hand}', '${element_id}');`
  });
});

app.get('/edit/:game', function(req: Request, res: Response, next) {
  var gameName = req.params.game;
  database.loadGame(gameName).then(function(game: Game) {
    res.render('edit', { game: new RenderableGame(game) });
  });
});

app.get('/create', function(req: Request, res: Response, next) {
  res.render('edit', { game: new RenderableGame(new Game()) });
});

app.post('/update', function(req: Request, res: Response, next) {
  //console.dir(JSON.stringify(req.body, null, 4));
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

app.use('/component/edit', editRouter);

function boot(port: number) {
  app.listen(process.env.PORT || port, () => {
    console.log(`Server started listening: maybe http://localhost:${port}`);
  });
}
boot(3385);
