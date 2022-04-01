import path = require("path");
import fs = require("fs");
import { Database } from "./database";
import { Game } from "./game";

export class CacheEntry {
    file: string = '';
    name: string = '';
    link: string = '';

    static hydrate(data: any): CacheEntry {
        return new CacheEntry(data['file'], data['name'], data['link']);
    }

    static make(game: Game): CacheEntry {
        return new CacheEntry(game.file, game.name, `/game/${game.sanitized_name}`);
    }

    constructor(file: string, name: string, link: string) {
        this.file = file;
        this.name = name;
        this.link = link;
    }

    to_serializable=(): any => {
        return {
            file: this.file,
            name: this.name,
            link: this.link
        }
    }
}

export class GameCache {
    database: Database;
    entries: CacheEntry[];

    constructor(database: Database) {
        this.database = database;
        this.entries = [];
    }

    cachePath=(): string => {
        return path.join(__dirname, "..", "..", "cache.json");
    }

    load=() => {
        let self = this;
        let data = fs.readFileSync(self.cachePath(), { encoding: 'utf8'});
        let list = JSON.parse(data);
        let entries = list.map((data: any) => {
            return CacheEntry.hydrate(data);
        });
        this.entries = entries;
    }
    
    to_serializable=(): any => {
        return this.entries.map(entry => {
            return entry.to_serializable();
        });
    }

    to_json=(): string => {
        return JSON.stringify(this.to_serializable(), null, 2);
    }

    write=(): Promise<void> => {
        let self = this;
        let writeCacheData = (resolve: any, reject: any) => {
            fs.writeFile(this.cachePath(), self.to_json(), (err) => {
                if (err == null) {
                    resolve(null);
                } else {
                    reject(err);
                }
            });
        };
        return new Promise(writeCacheData);
    }

    build=async (): Promise<void> => {
        let self = this;
        const fileNames = await self.database.loadGames();
        let promises = Promise.all(fileNames.map(fileName => { return self.database.loadGame(fileName); }));
        const games = await promises;
        self.entries = games.map(game => { return CacheEntry.make(game); });
    }
}