import { GameElement } from "../game_element";
import { NumberRange } from "../number_range";

export class DrawCardElement extends GameElement {
    card_count_range: NumberRange;

    public static hydrate(data: any): DrawCardElement {
        return new DrawCardElement(data['range']);
    }

    constructor(card_count_range: NumberRange = new NumberRange([])) {
        super('draw_card');
        this.card_count_range = card_count_range;
    }

    get player_card_count(): number { return this.card_count_range.max; }

    to_serializable=(): any => {
        return {
            type: this.type,
            card_count_range: this.card_count_range.to_serializable()
        };
    }
}
