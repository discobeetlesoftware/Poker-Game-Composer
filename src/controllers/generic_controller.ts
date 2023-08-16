import express = require("express");
import { Request, Response } from "express";
import { Controller } from "../architecture/controller";
import { PokerGameComposer } from "./poker_game_composer";

export class GenericController extends Controller<PokerGameComposer> {
    registerRoutes=(router: express.Router) => {
        const genericRouter = express.Router();
        genericRouter.get('/partials/edit/point_list/:id', this.point_list);
        genericRouter.get('/partials/edit/point/:id', this.point);
        genericRouter.get('/test', this.test);

        router.use('/generic', genericRouter);
    }

    test=(req: Request, res: Response, next) => {
        console.log(req.query);
        return next();
    }

    point_list=(req: Request, res: Response): void => {
        let name = req.query.name;
        res.render('partials/edit/generic/point_list', {
            list_id: req.params.id,
            add_name: name
        });
    }

    point=(req: Request, res: Response): void => {
        let elements = req.query.elements;
        let params = req.query.params;
        var point_name = '';
        for (var i = 0; i < elements.length; i++) {
            point_name += `[${elements[i]}][${params[i]}]`;
        }

        var values = [req.query.value, req.params.id].flat();
        for (var i = 0; i < values.length; i++) {
            point_name += `[${values[i]}]`;
        }


        let point_id = req.query.list_id + '_' + req.params.id;
        res.render('partials/edit/generic/point', {
            point_id: point_id,
            selected_y: req.query.y || 0,
            selected_x: req.query.x || 0,
            point_name: point_name
        });
    }
}
