import escape = require('escape-html');
import { AcePosition } from "../ace_position";
import { Evaluation, EvaluationExclusivity, EvaluationType, Hand } from "../evalulation";
import { Qualifier } from "../qualifier";

type RenderHelper = (input: string) => string;

export class RenderableEvaluation {
    evaluation: Evaluation;
    js: RenderableEvaluation;
    html: RenderableEvaluation;

    private fx: RenderHelper;

    constructor(evaluation: Evaluation, fx: RenderHelper = null) {
        this.evaluation = evaluation;
        this.fx = fx;

        if (fx == null) {
            this.fx = (input: string): string => { return input; }
            this.js = new RenderableEvaluation(evaluation, (input: string): string => { 
                if (!input) {
                    return '';
                }
                return input.replace(/[\\$'"]/g, "\\$&"); 
            });
            this.html = new RenderableEvaluation(evaluation, (input: string): string => {
                if (!input) {
                    return '';
                }
                return escape(input); 
            });
        }
    }

    get type(): EvaluationType { return this.evaluation.type; }
    get formal_name(): string { return this.fx(this.evaluation.formal_name); }
    get splits(): RenderableEvaluation[] { return this.evaluation.splits.map((evaluation: Evaluation): RenderableEvaluation => { return new RenderableEvaluation(evaluation); }); }
    get qualifier(): Qualifier { return this.evaluation.qualifier; }
    get exclusivity(): EvaluationExclusivity { return this.evaluation.exclusivity; }
    get ace_position(): AcePosition { return this.evaluation.ace_position; }
    get player_hand_size(): number { return this.evaluation.player_hand_size; }
    get invalidation_hands(): Hand[] { return this.evaluation.invalidation_hands; }
    get bug_completion_hand(): Hand[] { return this.evaluation.bug_completion_hands; }
    get hand_description(): string { return this.fx(this.evaluation.hand_description); }
    get description(): string { return this.fx(this.evaluation.description); }
}
