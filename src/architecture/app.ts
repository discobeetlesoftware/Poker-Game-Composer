import express = require("express");
import * as nunjucks from "nunjucks";
import { OptionValues } from 'commander';
import { Controller } from "./controller";

export abstract class App {
    options: OptionValues;

    is_debug: boolean = true;
    express: any;
    controllers: Controller<App>[];

    abstract makeControllers(): Controller<App>[];

    constructor(options: OptionValues, viewsDirectory: string) {
        this.options = options;
        this.express = express();
        this.express.set('views', viewsDirectory);
        nunjucks.configure(viewsDirectory, {
            autoescape: false,
            express: this.express
        });
        this.express.set('view engine', 'njk');
        this.express.use(express.static('src/public'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        let app = this;
        this.express.use(function(req: { path: string; }, res: any, next: () => any) {
            app.log("Received: " + req.path);
            return next();
        });
    }

    log=(msg: string) => {
        if (this.is_debug) {
            console.log(msg);
        }
    }

    boot=() => {
        this.controllers = this.makeControllers();
        this.controllers.forEach(controller => {
           controller.registerRoutes(this.express);
        });

        const port = this.options.port;
        this.express.listen(port, () => {
            console.log(`Server started listening: maybe http://localhost:${port}`);
        });
    }
}
