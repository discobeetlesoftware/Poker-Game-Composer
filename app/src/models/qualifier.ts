import { Hand } from "./evalulation";
import { Rank } from "./rank";

export enum QualifierType {
    None = 'none',
    LowerRank = 'lower_rank',
    HigherRank = 'higher_rank',
    LowerHand = 'lower_hand',
    HigherHand = 'higher_hand'
}

export class Qualifier {
    type: QualifierType;
    rank: Rank[];
    hand: Hand;


    to_serializable=(): any => {
        return {
            type: this.type,
            rank: this.rank,
            hand: this.hand
        };
    }
}