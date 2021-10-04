import { AcePosition } from "./ace_position";
import { Qualifier } from "./qualifier";

export enum EvaluationType {
    High = 'high',
    Low = 'low',
    PointLow = 'point_low', // A=1, 2=2, 3=3, … 9=9, T-K=10
    PointHigh = 'point_high',
    Badugi = 'badugi',
    Split = 'split'
}

export namespace EvaluationType {
    export function All(): EvaluationType[] {
        return Object.keys(EvaluationType) as EvaluationType[];
    }
}

export enum EvaluationExclusivity {
    Any = 'any',
    All = 'all',
    ExactlyOne = 'one',
    ExactlyTwo = 'two',
    ExactlyThree = 'three',
    ExactlyFour = 'four',
    ExactlyFive = 'five',
    ExactlySix = 'six',
    ExactlySeven = 'seven'
}

export enum Hand {
    High = 'high',
    Pair = 'pair',
    TwoPair = 'two_pair',
    ThreeOfAKind = 'three_of_a_kind',
    Straight = 'straight',
    Flush = 'flush',
    FullHouse = 'full_house',
    FourOfAKind = 'four_of_a_kind',
    StraightFlush = 'straight_flush',
    RoyalFlush = 'royal_flush',
    FiveOfAKind = 'five_of_a_kind'
}

export class Evaluation {
    type: EvaluationType;
    formal_name?: string;
    splits: Evaluation[];
    qualifier: Qualifier;
    exclusivity: EvaluationExclusivity;
    ace_position: AcePosition = AcePosition.Both;
    player_hand_size?: number; 
    invalidation_hands: Hand[];
    bug_completion_hands: Hand[];

    get hand_description(): string {
        var individual_count = 0;
        var community_count = 0;
        switch (this.exclusivity) {
            case EvaluationExclusivity.ExactlyOne:
                individual_count = 1; break;
            case EvaluationExclusivity.ExactlyTwo:
                individual_count = 2; break;
            case EvaluationExclusivity.ExactlyThree:
                individual_count = 3; break;
            case EvaluationExclusivity.ExactlyFour:
                individual_count = 4; break;
        }

        if (individual_count > 0) {
            community_count = 5 - individual_count;
        }
        return `Best 5-card hand using ${individual_count} individual and ${community_count} community`
    }

    get description(): string {
        return this.hand_description;
    }

    to_serializable=(): any => {
        return {
            type: this.type,
            formal_name: this.formal_name,
            player_hand_size: this.player_hand_size,
            splits: this.splits.map((element: Evaluation) => {
                return element.to_serializable()
            }),
            qualifier: this.qualifier.to_serializable(),
            exclusivity: this.exclusivity,
            ace_position: this.ace_position,
            invalidation_hands: this.invalidation_hands,
            bug_completion_hands: this.bug_completion_hands
        };
    }
}
