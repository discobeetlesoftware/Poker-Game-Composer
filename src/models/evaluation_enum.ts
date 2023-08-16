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
    Cascade = 'cascade',
    Remainder = 'remainder'
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
