import { GameElement } from "../game_element";
import { NumberRange } from "../number_range";

export class DiscardHandElement extends GameElement {
    hand_count_range: NumberRange;

    constructor(hand_count_range: NumberRange = new NumberRange([])) {
        super('discard_hand');
        this.hand_count_range = hand_count_range;
    }

    public static load(data: any): DiscardHandElement {
        return new DiscardHandElement(data['range']);
    }

    to_serializable=(): any => {
        return {
            type: this.type,
            hand_count_range: this.hand_count_range.to_serializable()
        };
    }
}
