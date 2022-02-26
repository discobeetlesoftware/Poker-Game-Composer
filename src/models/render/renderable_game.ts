import escape = require('escape-html');
import { ForcedBet } from '../forced_bet';
import { Game } from '../game';
import { GameSection } from '../game_section';
import { GameStructure } from '../game_structure';
import { RenderableEvaluation } from './renderable_evaluation';

type RenderHelper = (input: string) => string;

export class RenderableGame {
    js: RenderableGame;
    html: RenderableGame;

    private game: Game;
    private fx: RenderHelper;

    constructor(game: Game, fx: RenderHelper = null) {
        this.game = game;
        this.fx = fx;

        if (fx == null) {
            this.fx = (input: string): string => { return input; }
            this.js = new RenderableGame(game, (input: string): string => { 
                if (!input) {
                    return '';
                }
                return input.replace(/[\\$'"]/g, "\\$&"); 
            });
            this.html = new RenderableGame(game, (input: string): string => {
                if (!input) {
                    return '';
                }
                return escape(input); 
            });
        }
    }

    get file(): string { return this.game.file; }
    get name(): string { return this.fx(this.game.name); }
    get structure(): GameStructure { return this.game.structure; }
    get forced_bet(): ForcedBet { return this.game.forced_bet; }
    get evaluation(): RenderableEvaluation { return new RenderableEvaluation(this.game.evaluation); }
    get abbreviation(): string { return this.fx(this.game.abbreviation); }
    get custom_player_max(): number { return this.game.custom_player_max; }
    get alternative_names(): string { return this.fx(this.game.alternative_names); }
    get clarification(): string { return this.fx(this.clarification); }
    get sections(): GameSection[] { return this.game.sections; }
    get sanitized_name(): string { return this.fx(this.game.sanitized_name); }
    get final_hand_description(): string { return this.fx(this.game.final_hand_description); }
    get is_split_pot(): boolean { return this.game.is_split_pot; }
    get description(): string { return this.fx(this.game.description); }
    get details(): string { return this.fx(this.game.details); }
    max_players=(use_burn_cards: boolean = true): number => { return this.game.max_players(use_burn_cards); }
}
