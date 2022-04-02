import { AcePosition } from "./ace_position";
import { Qualifier, QualifierType } from "./qualifier";

export enum EvaluationType {
    Distribute = 'distribute',
    High = 'high',
    Low = 'low',
    SuitHigh = 'suit_high',
    SuitLow = 'suit_low',
    PointLow = 'point_low', // A=1, 2=2, 3=3, … 9=9, T-K=10
    PointHigh = 'point_high',
    Badugi = 'badugi',
    Split = 'split',
    Exclusive = 'exclusive',
    Cascade = 'cascade'
}

export namespace EvaluationType {
    export function IsSuitType(type: EvaluationType): boolean {
        return type == EvaluationType.SuitHigh || type == EvaluationType.SuitLow;
    }

    export function IsSplitType(type: EvaluationType): boolean {
        return type == EvaluationType.Split || type == EvaluationType.Cascade || type == EvaluationType.Exclusive;
    }

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

export enum EvaluationSuitType {
    Spade = 'spade',
    Heart = 'heart',
    Diamond = 'diamond',
    Club = 'club',
    LastCommunity = 'last_community'
}

export class Evaluation {
    index: number;
    type: EvaluationType;
    formal_name?: string;
    splits?: Evaluation[];
    qualifier?: Qualifier;
    exclusivity: EvaluationExclusivity;
    ace_position: AcePosition = AcePosition.Both;
    player_hand_size?: number;
    invalidation_hands: Hand[];
    bug_completion_hands: Hand[];
    qualifier_type: QualifierType;
    suit?: EvaluationSuitType;

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

    static hydrate=(data: any): Evaluation => {
        let evaluation = new Evaluation();
        evaluation.splits = [];
        if (data == undefined) {
            return evaluation;
        }
        evaluation.type = data.type;
        evaluation.ace_position = data.ace_position;
        evaluation.exclusivity = data.exclusivity;
        evaluation.formal_name = data.formal_name;
        evaluation.invalidation_hands = data.invalidation_hands;
        evaluation.player_hand_size = data.player_hand_size;
        evaluation.qualifier = Qualifier.hydrate(data.qualifier);
        evaluation.qualifier_type = evaluation.qualifier.type;
        evaluation.suit = data.suit;
        evaluation.splits = data.splits.map((splitData: any) => {
            return Evaluation.hydrate(splitData);
        });
        return evaluation;
    }

    to_serializable=(): any => {
        var result = {
            type: this.type,
            formal_name: this.formal_name,
            player_hand_size: this.player_hand_size,
            splits: this.splits.map((element: Evaluation) => {
                return element.to_serializable()
            }),
            exclusivity: this.exclusivity,
            ace_position: this.ace_position,
            invalidation_hands: this.invalidation_hands,
            bug_completion_hands: this.bug_completion_hands
        };
        if (EvaluationType.IsSuitType(this.type)) {
            result['suit'] = this.suit;
        }
        if (!EvaluationType.IsSplitType(this.type)) {
            result['qualifier'] = this.qualifier.to_serializable();
        }
        return result
    }
}
