import { GameElement } from "../game_element";

export class BettingRoundElement extends GameElement {
    public static hydrate(data: any): BettingRoundElement {
        return new BettingRoundElement();
    }

    constructor() {
        super('betting_round');
    }
}
