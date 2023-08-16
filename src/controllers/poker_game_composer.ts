import { App } from "../architecture/app";
import { Controller } from "../architecture/controller";
import { Database } from "../models/database";
import { Command, Option } from 'commander';
import path = require("path");
import { GameController } from "./game_controller";
import { ComponentController } from "./component_controller";
import { GenericController } from "./generic_controller";

export class PokerGameComposer extends App {
    database: Database;

    constructor() {
        const program = new Command();
        program
        .name('Poker Game Composer')
        .description('Web app for managing a database of poker game variant definitions')
        .version('1.0.0');
        program.option('--readonly', 'Disable creating or editing variants');
        program.option('--buildCache', 'Builds the game cache and exits');
        program.addOption(new Option('-p, --port <number>', 'port number').env('PORT').default(3385));
        program.parse();
        const options = program.opts();
        const rootPath = path.join(__dirname, '..', '..');
        super(options, path.join(rootPath, 'src', 'views'));
        this.database = new Database(rootPath, 'games');
    }
    
    makeControllers(): Controller<PokerGameComposer>[] {
        return [
            new GameController(this),
            new ComponentController(this),
            new GenericController(this)
        ];
    }

}