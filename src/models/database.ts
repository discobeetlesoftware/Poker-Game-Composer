import path = require("path");
import fs = require("fs");
import { Game } from "./game";

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

    appendGame=(game: Game) => {
        var name = game.sanitized_name;
        if (!this.games.includes(name)) {
            this.games.push(name);
            this.games.sort();
        }
    }

    schemaPath=(gameName: string): string => {
        let fileName = gameName.indexOf('json') == -1 ? `${gameName}.json` : gameName;
        return path.join(__dirname, "..", "..", "games", fileName);
    }
    
    gamePath=(game: Game): string => {
        return path.join(__dirname, "..", "..", "games", `${game.sanitized_name}.json`);
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

    loadGame=(gameName: string): Promise<Game> => {
        var db = this;
        return this.loadSchema(gameName).then(function(result: object) {
            return Game.hydrate(result, db.schemaPath(gameName));
        });
    }

    saveGame=(game: Game): Promise<boolean> => {
        let data = game.to_json();
        let writeGameData = (resolve: any, reject: any) => {
            fs.writeFile(this.gamePath(game), data, (err) => {
                if (err == null) {
                    this.appendGame(game);
                    resolve(null);
                } else {
                    reject(err);
                }
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
                        resolve(files.filter(fileName => fileName.includes(".json")));
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
