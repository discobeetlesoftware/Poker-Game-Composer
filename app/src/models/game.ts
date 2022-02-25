import path = require("path");
import fs = require("fs");
import { GameSection } from "./game_section";
import { GameStructure } from "./game_structure";
import { ForcedBet } from "./forced_bet";
import { Evaluation } from "./evalulation";
import { StringFactory } from "./string_factory";
import { GameElement } from "./game_element";

export class Game {
    file: string = '';
    name: string = '';;
    structure: GameStructure = new GameStructure();
    forced_bet: ForcedBet;
    evaluation: Evaluation = new Evaluation();
    abbreviation?: string = '';
    custom_player_max: number;
    alternative_names?: string = '';
    clarification?: string = '';
    sections: GameSection[];

    get sanitized_name(): string {
        let space_characters = /\s/gi;
        let disallowed_characters = /`|'/gi;
        return this.name.replace(disallowed_characters, '').replace(space_characters, '_').toLowerCase();
    }

    get final_hand_description(): string {
        return `Final Hand: ${this.evaluation.description}`;
    }

    get is_split_pot(): boolean {
        return this.evaluation.splits.length >= 2;
    }

    get deck_size(): number { return 52; }

    max_players=(use_burn_cards: boolean = true): number => {
        var player_card_count = 0;
        var board_card_count = 0;
        var burn_cards_count = 0;
        this.sections.forEach((section: GameSection) => {
            section.elements.forEach((element: GameElement) => {
                player_card_count += element.player_card_count;
                let board_cards = element.board_card_count;
                board_card_count += board_cards;
                if (use_burn_cards && board_cards > 0) {
                    burn_cards_count += 1;
                }
            });
        });
        //console.log(`Math.floor((${this.deck_size} - ${board_card_count}) / ${player_card_count})`);
        return Math.floor(((this.deck_size - board_card_count) - burn_cards_count) / player_card_count);
    }

    get description(): string {
        var elements = [];

        elements.push(this.final_hand_description);

        return elements.join('\n');
    }

    get details(): string {
        var elements = [];

        if (this.clarification) {
            elements.push(this.clarification);
        }

        elements.push(StringFactory.forced_bet(this.forced_bet));

        if (this.is_split_pot) {
            elements.push('Split Pot');
        }

        const player_count = this.max_players();
        if (player_count < 10) {
            elements.push(player_count + ' Players Max');
        } else {
            console.log('Max players ' + player_count);
        }

        return elements.join(' • ');
    }

    to_json=(): string => {
        return JSON.stringify(this.to_serializable(), null, 2);
    }

    to_serializable=(): any => {
        return {
            name: this.name,
            structure: this.structure.to_serializable(),
            forced_bet: this.forced_bet,
            evaluation: this.evaluation.to_serializable(),
            abbreviation: this.abbreviation,
            alternative_names: this.alternative_names,
            clarification: this.clarification,
            custom_player_max: this.custom_player_max,
            sections: this.sections.map((section: GameSection): any => {
                return section.to_serializable();
            })
        };
    }
}
