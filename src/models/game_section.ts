import { GameElement } from "./game_element";
import { BettingRoundElement } from "./elements/betting_round_element";
import { DealBoardElement } from "./elements/deal_board_element";
import { DealPlayerElement } from "./elements/deal_player_element";
import { DiscardCardElement } from "./elements/discard_card_element";
import { DiscardHandElement } from "./elements/discard_hand_element";
import { DrawCardElement } from "./elements/draw_card_element";
import { ExposeCardElement } from "./elements/expose_card_element";
import { SplitHandElement } from "./elements/split_hand_element";

export class GameSection {
    name: string;
    elements: GameElement[];

    static hydrate=(data: any): GameSection => {
        var section = new GameSection();
        section.name = data['name'];
        section.elements = data['elements'].map((elementData: any): GameElement => {
            switch (elementData['type']) {
                case 'betting_round': return BettingRoundElement.hydrate(elementData);
                case 'deal_player': return DealPlayerElement.hydrate(elementData);
                case 'deal_board': return DealBoardElement.hydrate(elementData);
                case 'split_hand': return SplitHandElement.hydrate(elementData);
                case 'discard_hand': return DiscardHandElement.hydrate(elementData);
                case 'discard_card': return DiscardCardElement.hydrate(elementData);
                case 'draw_card': return DrawCardElement.hydrate(elementData);
                case 'expose_card': return ExposeCardElement.hydrate(elementData);
            }
        });
        return section;
    }

    build_function_name=(index: number): string => {
        let regex = /\-|\s/gi;
        return 'build_section_' + index + '_' + this.name.replace(regex, '');
    }

    to_serializable=(): any => {
        return {
            name: this.name,
            elements: this.elements.map((element: GameElement): any => {
                if (element != undefined) {
                    return element.to_serializable();
                } else {
                    return {};
                }
            })
        };
    }
}
