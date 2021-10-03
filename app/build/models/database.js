"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var path = require("path");
var fs = require("fs");
var game_1 = require("./game");
var game_section_1 = require("./game_section");
var betting_round_element_1 = require("./elements/betting_round_element");
var deal_board_element_1 = require("./elements/deal_board_element");
var deal_player_element_1 = require("./elements/deal_player_element");
var discard_card_element_1 = require("./elements/discard_card_element");
var discard_hand_element_1 = require("./elements/discard_hand_element");
var draw_card_element_1 = require("./elements/draw_card_element");
var expose_card_element_1 = require("./elements/expose_card_element");
var split_hand_element_1 = require("./elements/split_hand_element");
var game_structure_1 = require("./game_structure");
var evalulation_1 = require("./evalulation");
var qualifier_1 = require("./qualifier");
var Database = /** @class */ (function () {
    function Database(rootDir, routePath) {
        var _this = this;
        this.schemaPath = function (gameName) {
            return path.join(__dirname, "..", "..", "..", "games", gameName + ".json");
        };
        this.gamePath = function (game) {
            return path.join(__dirname, "..", "..", "..", "games", game.sanitized_name + ".json");
        };
        this.loadSchema = function (gameName) {
            var db = _this;
            function resolveSchema(resolve, reject) {
                fs.readFile(db.schemaPath(gameName), 'utf8', function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        var obj = JSON.parse(data);
                        resolve(obj);
                    }
                });
            }
            return new Promise(resolveSchema);
        };
        this.hydrateElement = function (data) {
            switch (data['type']) {
                case 'betting_round': return betting_round_element_1.BettingRoundElement.load(data);
                case 'deal_player': return deal_player_element_1.DealPlayerElement.load(data);
                case 'deal_board': return deal_board_element_1.DealBoardElement.load(data);
                case 'split_hand': return split_hand_element_1.SplitHandElement.load(data);
                case 'discard_hand': return discard_hand_element_1.DiscardHandElement.load(data);
                case 'discard_card': return discard_card_element_1.DiscardCardElement.load(data);
                case 'draw_card': return draw_card_element_1.DrawCardElement.load(data);
                case 'expose_card': return expose_card_element_1.ExposeCardElement.load(data);
            }
        };
        this.hydrateSection = function (data) {
            var section = new game_section_1.GameSection();
            section.name = data['name'];
            var db = _this;
            section.elements = data['elements'].map(function (elementData) {
                return db.hydrateElement(elementData);
            });
            return section;
        };
        this.hydrateStructure = function (data) {
            var structure = new game_structure_1.GameStructure();
            if (data == undefined) {
                return structure;
            }
            structure.ante = data.ante;
            structure.fixed_limit = data.fixed_limit;
            structure.pot_limit = data.pot_limit;
            structure.no_limit = data.no_limit;
            return structure;
        };
        this.hydrateQualifier = function (data) {
            var qualifier = new qualifier_1.Qualifier();
            console.log(data);
            return qualifier;
        };
        /*
        type: EvaluationType;
        invalidation_hands: Hand[];
        bug_completion_hands: Hand[];
        */
        this.hydrateEvaluation = function (data) {
            var evaluation = new evalulation_1.Evaluation();
            if (data == undefined) {
                return evaluation;
            }
            evaluation.type = data.type;
            evaluation.ace_position = data.ace_position;
            evaluation.exclusivity = data.exclusivity;
            evaluation.qualifier = _this.hydrateQualifier(data.qualifier);
            evaluation.splits = data.splits.map(function (splitData) {
                return _this.hydrateEvaluation(splitData);
            });
            return evaluation;
        };
        this.hydrateGame = function (data, file) {
            var game = new game_1.Game();
            game.file = file;
            game.structure = _this.hydrateStructure(data.structure);
            game.evaluation = _this.hydrateEvaluation(data.evaluation);
            console.log(game.evaluation);
            game.name = data['name'];
            game.abbreviation = data['abbreviation'];
            game.forced_bet = data['forced_bet'];
            game.alternative_names = data['alternative_names'];
            game.sections = data['sections'].map(_this.hydrateSection);
            return game;
        };
        this.loadGame = function (gameName) {
            var db = _this;
            return _this.loadSchema(gameName).then(function (result) {
                return db.hydrateGame(result, db.schemaPath(gameName));
            });
        };
        this.saveGame = function (game) {
            var data = game.to_json();
            var writeGameData = function (resolve, reject) {
                fs.writeFile(_this.gamePath(game), data, function (err) {
                    var handler = err == null ? resolve : reject;
                    handler(err);
                });
            };
            return new Promise(writeGameData);
        };
        this.loadGames = function () {
            var db = _this;
            if (db.loadingGames) {
                return db.loadingGames;
            }
            else if (db.games && db.games.length > 0) {
                var resolveGames = function (resolve, reject) {
                    var resolver = db.games ? resolve : reject;
                    resolver(db.games);
                };
                return new Promise(resolveGames);
            }
            else {
                var resolveGames = function (resolve, reject) {
                    fs.readdir(db.gamesDir, function (err, files) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(files);
                        }
                    });
                };
                db.loadingGames = new Promise(resolveGames);
                db.loadingGames.finally(function () {
                    db.loadingGames = null;
                });
                return db.loadingGames;
            }
        };
        this.gamesDir = path.join(rootDir, routePath);
        this.loadGames().then(function (result) {
            _this.games = result;
        });
    }
    return Database;
}());
exports.Database = Database;
