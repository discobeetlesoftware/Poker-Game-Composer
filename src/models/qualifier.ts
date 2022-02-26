import { Hand } from "./evalulation";
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

    to_serializable=(): any => {
        return {
            type: this.type,
            rank: this.rank,
            hand: this.hand,
            specific_hand: this.specific_hand
        };
    }
}