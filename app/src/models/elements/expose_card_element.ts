import { GameElement } from "../game_element";
import { NumberRange } from "../number_range";

export class ExposeCardElement extends GameElement {
    card_count_range: NumberRange;

    constructor(card_count_range: NumberRange = new NumberRange([])) {
        super('expose_card');
        this.card_count_range = NumberRange.From(card_count_range);
    }

    get canvas_title() {
        return ExposeCardElement.GenerateCanvasTitle(this.card_count_range);
    }

    private static GenerateCanvasTitle(range: NumberRange): string {
        if (range == undefined) {
            return "Error";
        }

        if (range.magnitude == 0) {
            return "Expose " + range.min + " card" + (range.max > 1 ? "s" : "");
        } else {
            return "Expose " + range.min + "-" + range.max + " cards";            
        }
    }

    public static load(data: any): ExposeCardElement {
        return new ExposeCardElement(new NumberRange(data['card_count_range']));
    }

    to_serializable=(): any => {
        return {
            type: this.type,
            card_count_range: this.card_count_range.to_serializable()
        };
    }
}
