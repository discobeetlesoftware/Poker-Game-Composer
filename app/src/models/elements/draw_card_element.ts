import { GameElement } from "../game_element";
import { NumberRange } from "../number_range";

export class DrawCardElement extends GameElement {
    card_count_range: NumberRange;

    constructor(card_count_range: NumberRange = new NumberRange([])) {
        super('draw_card');
        this.card_count_range = card_count_range;
    }

    public static load(data: any): DrawCardElement {
        return new DrawCardElement(data['range']);
    }

    to_serializable=(): any => {
        return {
            type: this.type,
            card_count_range: this.card_count_range.to_serializable()
        };
    }
}
