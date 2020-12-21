import { GameElement } from "../game_element";

export class DealBoardElement extends GameElement {
    card_count: number;
 
    constructor(card_count: number = 0) {
        super('deal_board');
        this.card_count = card_count;
    }

    public static load(data: any): DealBoardElement {
        return new DealBoardElement(data['card_count']);
    }

    to_serializable=(): any => {
        return {
            type: this.type,
            card_count: this.card_count
        };
    }
}
