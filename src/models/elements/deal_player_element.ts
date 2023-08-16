import { GameElement } from "../game_element";

export class DealPlayerElement extends GameElement {
    card_count: number;
    is_face_up: boolean;

    public static hydrate(data: any): DealPlayerElement {
        return new DealPlayerElement(data['card_count'], data['is_face_up']);
    }

    constructor(card_count: number = 0, is_face_up: boolean = false) {
        super('deal_player');
        this.card_count = card_count;
        this.is_face_up = is_face_up;
    }

    get player_card_count(): number { return this.card_count; }

    to_serializable=(): any => {
        return {
            type: this.type,
            card_count: this.card_count,
            is_face_up: this.is_face_up
        };
    }
}
