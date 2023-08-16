import { PokerGameComposer } from "./controllers/poker_game_composer";
import { GameCache } from "./models/game_cache";

const app = new PokerGameComposer();

if (app.options.buildCache) {
    let build = async () => { 
        let cache = new GameCache(app.database);
        await cache.build();
        await cache.write();
        console.log('Game cache rebuilt');
    };
    build();
} else {
    app.boot();
}