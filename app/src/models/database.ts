import path = require("path");
import fs = require("fs");

import { Game } from "./game";
import { GameElement } from "./game_element";
import { GameSection } from "./game_section";
import { BettingRoundElement } from "./elements/betting_round_element";
import { DealBoardElement } from "./elements/deal_board_element";
import { DealPlayerElement } from "./elements/deal_player_element";
import { DiscardCardElement } from "./elements/discard_card_element";
import { DiscardHandElement } from "./elements/discard_hand_element";
import { DrawCardElement } from "./elements/draw_card_element";
import { ExposeCardElement } from "./elements/expose_card_element";
import { SplitHandElement } from "./elements/split_hand_element";
import { GameStructure } from "./game_structure";
import { Evaluation } from "./evalulation";
import { Qualifier } from "./qualifier";

export class Database {
    gamesDir: string;
    games: string[];
    loadingGames: Promise<string[]>;

    constructor(rootDir: string, routePath: string) {
        this.gamesDir = path.join(rootDir, routePath);
        this.loadGames().then(result => {
            this.games = result;
        });
    }

    schemaPath=(gameName: string): string => {
        return path.join(__dirname, "..", "..", "..", "games", `${gameName}.json`);
    }
    
    gamePath=(game: Game): string => {
        return path.join(__dirname, "..", "..", "..", "games", `${game.sanitized_name}.json`);
    }

    loadSchema=(gameName: string): Promise<object> => {
        var db = this;
        function resolveSchema(resolve, reject) {
            fs.readFile(db.schemaPath(gameName), 'utf8' , (err, data) => {
                if (err) {
                    reject(err);
                } else {
                  var obj = JSON.parse(data);
                  resolve(obj);
                }
            });
        }
        return new Promise(resolveSchema);
    }

    hydrateElement=(data: any): GameElement => {
        switch (data['type']) {
            case 'betting_round': return BettingRoundElement.load(data);
            case 'deal_player': return DealPlayerElement.load(data);
            case 'deal_board': return DealBoardElement.load(data);
            case 'split_hand': return SplitHandElement.load(data);
            case 'discard_hand': return DiscardHandElement.load(data);
            case 'discard_card': return DiscardCardElement.load(data);
            case 'draw_card': return DrawCardElement.load(data);
            case 'expose_card': return ExposeCardElement.load(data);
        }
    }

    hydrateSection=(data: any): GameSection => {
        var section = new GameSection();
        section.name = data['name'];
        var db = this;
        section.elements = data['elements'].map(function(elementData: any) {
            return db.hydrateElement(elementData);
        });
        return section;
    }

    hydrateStructure=(data: any): GameStructure => {
        let structure = new GameStructure();
        if (data == undefined) {
            return structure;
        }
        structure.ante = data.ante;
        structure.fixed_limit = data.fixed_limit;
        structure.pot_limit = data.pot_limit;
        structure.no_limit = data.no_limit;
        return structure;
    }

    hydrateQualifier=(data: any): Qualifier => {
        if (data.length == 0) {
            return null;
        }
        let qualifier = new Qualifier();
        return qualifier;
    }

    /*
    type: EvaluationType;
    invalidation_hands: Hand[];
    bug_completion_hands: Hand[];
    */
    hydrateEvaluation=(data: any): Evaluation => {
        let evaluation = new Evaluation();
        evaluation.splits = [];
        if (data == undefined) {
            return evaluation;
        }
        evaluation.type = data.type;
        evaluation.ace_position = data.ace_position;
        evaluation.exclusivity = data.exclusivity;
        evaluation.formal_name = data.formal_name;
        evaluation.player_hand_size = data.player_hand_size;
        evaluation.qualifier = this.hydrateQualifier(data.qualifier);
        evaluation.splits = data.splits.map((splitData: any) => {
            return this.hydrateEvaluation(splitData);
        });
        return evaluation;
    }

    hydrateGame=(data: any, file: string): Game => {
        var game = new Game();
        game.file = file;
        game.structure = this.hydrateStructure(data.structure);
        game.evaluation = this.hydrateEvaluation(data.evaluation);
        game.name = data['name'];
        game.abbreviation = data['abbreviation'];
        game.forced_bet = data['forced_bet'];
        game.alternative_names = data['alternative_names'];
        game.sections = data['sections'].map(this.hydrateSection);
        return game;
    }

    loadGame=(gameName: string): Promise<Game> => {
        var db = this;
        return this.loadSchema(gameName).then(function(result: object) {
            return db.hydrateGame(result, db.schemaPath(gameName));
        });
    }

    saveGame=(game: Game): Promise<boolean> => {
        let data = game.to_json();
        let writeGameData = (resolve: any, reject: any) => {
            fs.writeFile(this.gamePath(game), data, (err) => {
                let handler = err == null ? resolve : reject;
                handler(err);
            });
        };
        return new Promise(writeGameData);
    }

    loadGames=(): Promise<string[]> => {
        var db = this;
        if (db.loadingGames) {
            return db.loadingGames;
        } else if (db.games && db.games.length > 0) {
            var resolveGames = function(resolve, reject) { 
                var resolver = db.games ? resolve : reject;
                resolver(db.games);
            };
            return new Promise(resolveGames);
        } else {
            var resolveGames = function(resolve, reject) {
                fs.readdir(db.gamesDir, (err, files) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(files);
                    }
                });
            };
            db.loadingGames = new Promise(resolveGames);
            db.loadingGames.finally(function() {
                db.loadingGames = null;
            });
            return db.loadingGames;
        }
    }
}
