import { join } from "path/posix";
import { BettingRoundElement } from "./elements/betting_round_element";
import { DealBoardElement } from "./elements/deal_board_element";
import { DealPlayerElement } from "./elements/deal_player_element";
import { DiscardCardElement } from "./elements/discard_card_element";
import { DiscardHandElement } from "./elements/discard_hand_element";
import { DrawCardElement } from "./elements/draw_card_element";
import { ExposeCardElement } from "./elements/expose_card_element";
import { SplitHandElement } from "./elements/split_hand_element";
import { Game } from "./game";
import { GameElement } from "./game_element";
import { GameElementType } from "./game_element_type";
import { GameSection } from "./game_section";
import { GameStructure } from "./game_structure";
import { NumberRange } from "./number_range";

export class Factory {
    public static create_element(type: GameElementType): GameElement {
        switch (type) {
            case GameElementType.BettingRound:  return new BettingRoundElement();
            case GameElementType.DealBoard:     return new DealBoardElement();
            case GameElementType.DealPlayer:    return new DealPlayerElement();
            case GameElementType.DiscardCard:   return new DiscardCardElement();
            case GameElementType.DiscardHand:   return new DiscardHandElement();
            case GameElementType.DrawCard:      return new DrawCardElement();
            case GameElementType.ExposeCard:    return new ExposeCardElement();
            case GameElementType.SplitHand:     return new SplitHandElement();
        }
    }

    public static hydrate_game=(params: any): Game => {
        let game = new Game();
        game.name = params.name;
        game.abbreviation = params.abbreviation;
        game.structure = Factory.hydrate_structure(params.structures);
        game.alternative_names = params.alternative_names;
        game.sections = params.section.map((data: any): GameSection => {
            return Factory.hydrate_section(data);
        });
        return game;
    }

    public static hydrate_structure=(params: any): GameStructure => {
        let structure = new GameStructure();
        if (params != undefined) {
            structure.ante = params.ante == 'on';
            structure.fixed_limit = params.fixed_limit == 'on';
            structure.pot_limit = params.pot_limit == 'on';
            structure.no_limit = params.no_limit == 'on';
        }
        return structure;
    }

    public static hydrate_section=(params: any): GameSection => {
        let section = new GameSection();
        section.name = params.name;
        section.elements = params.elements.map((data: any): GameElement => {
            return Factory.hydrate_element(data);
        });
        return section;
    }

    public static hydrate_element=(params: any): GameElement => {
        switch (params.type) {
            case GameElementType.BettingRound:  
                return new BettingRoundElement();
            case GameElementType.DealBoard:     
                return new DealBoardElement(parseInt(params.card_count));
            case GameElementType.DealPlayer:   
                return new DealPlayerElement(parseInt(params.card_count), params.is_face_up == 'on');
            case GameElementType.DiscardCard:
                let min = params.scope == 'exactly' ? parseInt(params.card_count) : 0;
                let range = new NumberRange([min, parseInt(params.card_count)]);
                return new DiscardCardElement(range, params.then_draw);
            case GameElementType.DiscardHand:
                return new DiscardHandElement(new NumberRange([parseInt(params.hand_count), parseInt(params.hand_count)]));
            case GameElementType.DrawCard:
                return new DrawCardElement(new NumberRange([parseInt(params.card_count), parseInt(params.card_count)]));
            case GameElementType.ExposeCard:
                return new ExposeCardElement(new NumberRange([parseInt(params.card_count), parseInt(params.card_count)]));
            case GameElementType.SplitHand:
                return new SplitHandElement(params.hand_size.map(parseInt));
        }
    }
}