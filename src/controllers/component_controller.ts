import express = require("express");
import { Request, Response } from "express";
import { Controller } from "../architecture/controller";
import { PokerGameComposer } from "./poker_game_composer";
import { Game } from "../models/game";
import { Factory } from "../models/factory";
import { GameSection } from "../models/game_section";
import { GameElement } from "../models/game_element";
import { GameElementType } from "../models/game_element_type";
import { Evaluation } from "../models/evalulation";
import { RenderableEvaluation } from "../models/render/renderable_evaluation";

export class ComponentController extends Controller<PokerGameComposer> {
    nameForHand=(value: string): string =>  {
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
    
    registerRoutes=(router: express.Router) => {
        const editRouter = express.Router();

        editRouter.get('/section/:section_index', this.section);
        editRouter.get('/section/:section_index/element/:element_index', this.element);
        editRouter.get('/section/:section_index/element/:element_index/type/:element_type', this.elementType);
        editRouter.get('/game/:game/evaluation/:evaluation_index', this.evaluation);
        editRouter.get('/evaluation/:evaluation_key/invalidation_hand/:hand', this.hand);

        router.use('/component/edit', editRouter);
    }

    section=(req: Request, res: Response) => {
        let section_index = req.params.section_index;
        res.render('partials/edit/section', { 
            layout: false,
            section_index: section_index, 
            key: `section_${section_index}`, 
            section: new GameSection() 
        });
    }

    element=(req: Request, res: Response) => {
        let section_index = req.params.section_index;
        let element_index = req.params.element_index;
        res.render('partials/edit/element', { 
        layout: false,
        key: `element_${section_index}_${element_index}`,
        element: new GameElement(),
        section_index: section_index,
        element_index: element_index
        });
    }

    elementType=(req: Request, res: Response) => {
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
    }

    evaluation=(req: Request, res: Response) => {
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
      
        this.app.database.loadGame(gameName).then(gameFoundHandler, gameMissingHandler);
    }

    hand=(req: Request, res: Response) => {
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
        text: this.nameForHand(hand),
        delete_call: `removeInvalidationHand('${context}', '${hand}', '${element_id}');`
        });
    }
}