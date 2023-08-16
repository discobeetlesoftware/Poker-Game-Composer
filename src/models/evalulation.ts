import { isNullOrUndefined } from "../architecture/global";
import { AcePosition } from "./ace_position";
import { BoardEvaluation } from "./board_evaluation";
import { EvaluationExclusivity, EvaluationSuitType, EvaluationType, Hand } from "./evaluation_enum";
import { Qualifier, QualifierType } from "./qualifier";

export class Evaluation {
    index: number;
    type: EvaluationType;
    formal_name?: string;
    splits?: Evaluation[];
    qualifier?: Qualifier;
    exclusivity: EvaluationExclusivity;
    ace_position: AcePosition = AcePosition.Both;
    board?: BoardEvaluation;
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
        evaluation.board = BoardEvaluation.hydrate(data.board);
        evaluation.qualifier = Qualifier.hydrate(data.qualifier);
        evaluation.qualifier_type = evaluation.qualifier.type;
        evaluation.suit = data.suit;
        if (data.splits) {
            evaluation.splits = data.splits.map((splitData: any) => {
                return Evaluation.hydrate(splitData);
            });
        }
        return evaluation;
    }

    to_serializable=(): any => {
        var result = {
            type: this.type,
            formal_name: this.formal_name,
            player_hand_size: this.player_hand_size,
            exclusivity: this.exclusivity,
            ace_position: this.ace_position,
            invalidation_hands: this.invalidation_hands,
            bug_completion_hands: this.bug_completion_hands
        };
        result['board'] = this.board.to_serializable();
        if ((this.splits ?? []).length > 0) {
            result['splits'] = this.splits.map((split: Evaluation) => {
                return split.to_serializable()
            });
        }
        if (EvaluationType.IsSuitType(this.type)) {
            result['suit'] = this.suit;
        }
        if (!EvaluationType.IsSplitType(this.type)) {
            result['qualifier'] = this.qualifier.to_serializable();
        }
        return result
    }
}
