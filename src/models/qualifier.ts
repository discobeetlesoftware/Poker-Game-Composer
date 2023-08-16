import { Hand } from "./evaluation_enum";
import { Rank } from "./rank";

export enum QualifierType {
    None = 'none',
    Both = 'both',
    LowerRank = 'lower_rank',
    HigherRank = 'higher_rank',
    LowerHand = 'lower_hand',
    HigherHand = 'higher_hand'
}

export class Qualifier {
    type: QualifierType = QualifierType.None;
    rank: Rank[];
    hand: Hand;
    specific_hand: string;

    static hydrate=(data: any): Qualifier => {
        let qualifier = new Qualifier();
        qualifier.type = QualifierType.None;
        if (data == undefined || data.length == 0) {
            return qualifier;
        }
        qualifier.type = data.type;
        qualifier.rank = data.rank;
        qualifier.hand = data.hand;
        qualifier.specific_hand = data.specific_hand;
        return qualifier;
    }

    to_serializable=(): any => {
        return {
            type: this.type,
            rank: this.rank,
            hand: this.hand,
            specific_hand: this.specific_hand
        };
    }
}