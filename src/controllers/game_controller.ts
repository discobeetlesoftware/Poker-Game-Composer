import express = require("express");
import { Request, Response } from "express";
import { Controller } from "../architecture/controller";
import { PokerGameComposer } from "./poker_game_composer";
import { Game } from "../models/game";
import { RenderableGame } from "../models/render/renderable_game";
import { Factory } from "../models/factory";

export class GameController extends Controller<PokerGameComposer> {
    registerRoutes=(router: express.Router) => {
        router.get('/', this.list);
        router.get('/game/:game', this.show);
        router.get('/schema/:game.json', this.schema);

        if (!this.app.options.readonly) {
            router.get('/edit/:game', this.edit);
            router.get('/create', this.create);
            router.post('/update', this.update);
        }
    }

    list=(req: Request, res: Response) => {
        this.app.database.loadGames().then(function(games: string[]) {
            function stripJSON(input: string): string {
                return input.replace('.json', '');
            }
            res.render('index', {links: games.map(stripJSON)});
        });
    }

    show=(req: Request, res: Response) => {
        var gameName = req.params.game;
        this.app.database.loadGame(gameName).then(function(game: Game) {
            res.render('game', { game: new RenderableGame(game) });
        }).catch(function(reason: any) {
            res.status(404);
            res.send('404: ' + reason);
        });
    }

    create=(req: Request, res: Response) => {
        res.render('edit', { game: new RenderableGame(new Game()) });
    }

    edit=(req: Request, res: Response) => {
        var gameName = req.params.game;
        this.app.database.loadGame(gameName).then(function(game: Game) {
            res.render('edit', { game: new RenderableGame(game) });
        });
    }

    update=(req: Request, res: Response, next) => {
        let game = Factory.hydrate_game(req.body);
        if (game == null) {
            return next('Could not save game');
        }
        this.app.database.saveGame(game).then(() => {
            res.redirect(`/game/${game.sanitized_name}`);
        }).catch((reason: any) => {
            next(reason);
        });
    }

    schema=(req: Request, res: Response, next) => {
        var gameName = req.params.game;
        this.app.database.loadSchema(gameName).then(function(result: object) {
            res.json(result);
        }).catch(function(reason: any) {
            next(reason);
        });
    }
}
