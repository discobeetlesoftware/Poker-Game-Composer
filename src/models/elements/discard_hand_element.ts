import { GameElement } from "../game_element";
import { NumberRange } from "../number_range";

export class DiscardHandElement extends GameElement {
    hand_count_range: NumberRange;
    canvas_title: string;

    constructor(hand_count_range: NumberRange = new NumberRange([])) {
        super('discard_hand');
        this.hand_count_range = hand_count_range;
        if (this.hand_count_range.magnitude == 0) {
            this.canvas_title = "Discard\\n" + this.hand_count_range.min + " hand";
        } else {
            this.canvas_title = "Discard\\n" + this.hand_count_range.min + "-" + this.hand_count_range.max + " hands";            
        }
    }

    public static load(data: any): DiscardHandElement {
        return new DiscardHandElement(new NumberRange(data['hand_count_range']));
    }

    to_serializable=(): any => {
        return {
            type: this.type,
            hand_count_range: this.hand_count_range.to_serializable()
        };
    }
}
