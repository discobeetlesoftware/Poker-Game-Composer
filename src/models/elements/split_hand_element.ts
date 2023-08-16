import { GameElement } from "../game_element";

export class SplitHandElement extends GameElement {
    split_sizes: number[];
    canvas_title: string;

    public static hydrate(data: any): SplitHandElement {
        return new SplitHandElement(data['split_sizes']);
    }

    constructor(split_sizes: number[] = []) {
        super('split_hand');
        this.split_sizes = split_sizes;
        if (this.is_equal_split()) {
            this.canvas_title = "Split";
        } else {
            let hands = this.split_sizes.map(function(size) { return `${size}-`; });
            let handString = hands.join(' & ');
            this.canvas_title = `Separate into ${handString}card hands, cap cards`;
        }
    }
    
    is_equal_split=(): boolean => {
        if (this.split_sizes.length == 0) {
            return false;
        }
        var size = this.split_sizes[0];
        for (var j = 0; j < this.split_sizes.length; j++) {
            if (this.split_sizes[j] != size) {
                return false;
            }
        }
        return true;
    }

    to_serializable=(): any => {
        return {
            type: this.type,
            split_sizes: this.split_sizes
        };
    }
}
