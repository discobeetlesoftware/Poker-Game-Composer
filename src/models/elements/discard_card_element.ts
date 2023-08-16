import { GameElement } from "../game_element";
import { NumberRange } from "../number_range";
import { Point } from "../geometry";

export enum DiscardHeuristicType {
    None, MatchingBoardRank, MatchingBoardSuit
}

export class DiscardHeuristic {
    type: DiscardHeuristicType;
    board_coords: Point[];

    static hydrate(data: any): DiscardHeuristic {
        return new DiscardHeuristic(data['type'], data['board_coords'].map((coord: any) => Point.hydrate(coord)));
    }

    constructor(type: DiscardHeuristicType, board_coords: Point[] = []) {
        this.type = type;
        this.board_coords = board_coords;
    }

    to_serializable = () => {
        return {
            type: this.type,
            board_coords: this.board_coords.map(coord => coord.to_serializable())
        };
    }
}

export class DiscardCardElement extends GameElement {
    card_count_range: NumberRange;
    then_draw: boolean;
    canvas_title: string;
    heuristic?: DiscardHeuristic;

    public static hydrate(data: any): DiscardCardElement {
        return new DiscardCardElement(new NumberRange(data['card_count_range']), data['then_draw']);
    }

    constructor(card_count_range: NumberRange = new NumberRange([]), then_draw: boolean = false, heuristic?: DiscardHeuristic) {
        super('discard_card');
        this.card_count_range = card_count_range;
        this.then_draw = then_draw;
        this.heuristic = heuristic;
        let verb = then_draw ? 'Draw' : 'Discard';
        if (this.card_count_range.magnitude == 0) {
            this.canvas_title = `${verb} exactly ${this.card_count_range.min} card ${this.card_count_range.max > 1 ? "s" : ""}`;
        } else {
            this.canvas_title = `${verb} ${this.card_count_range.min} - ${this.card_count_range.max} cards`;
        }
    }

    get player_card_count(): number { return this.then_draw ? this.card_count_range.max : 0 }

    to_serializable=(): any => {
        var output = {
            type: this.type,
            card_count_range: this.card_count_range.to_serializable(),
            then_draw: this.then_draw,
        };
        if (this.heuristic) {
            output['heuristic'] = this.heuristic.to_serializable();
        }
        return output;
    }
}
