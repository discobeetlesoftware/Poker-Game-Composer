import { GameElement } from "../game_element";

export class BettingRoundElement extends GameElement {
    constructor() {
        super('betting_round');
    }

    public static load(data: any): BettingRoundElement {
        return new BettingRoundElement();
    }
}
