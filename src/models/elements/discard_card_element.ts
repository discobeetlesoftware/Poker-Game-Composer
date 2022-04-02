import { GameElement } from "../game_element";
import { NumberRange } from "../number_range";

export class DiscardCardElement extends GameElement {
    card_count_range: NumberRange;
    then_draw: boolean;
    canvas_title: string;

    public static hydrate(data: any): DiscardCardElement {
        return new DiscardCardElement(new NumberRange(data['card_count_range']), data['then_draw']);
    }

    constructor(card_count_range: NumberRange = new NumberRange([]), then_draw: boolean = false) {
        super('discard_card');
        this.card_count_range = card_count_range;
        this.then_draw = then_draw;
        let verb = then_draw ? 'Draw' : 'Discard';
        if (this.card_count_range.magnitude == 0) {
            this.canvas_title = `${verb} exactly ${this.card_count_range.min} card ${this.card_count_range.max > 1 ? "s" : ""}`;
        } else {
            this.canvas_title = `${verb} ${this.card_count_range.min} - ${this.card_count_range.max} cards`;
        }
    }

    get player_card_count(): number { return this.then_draw ? this.card_count_range.max : 0 }

    to_serializable=(): any => {
        return {
            type: this.type,
            card_count_range: this.card_count_range.to_serializable(),
            then_draw: this.then_draw,
        };
    }
}
