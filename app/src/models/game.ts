import path = require("path");
import fs = require("fs");
import { GameSection } from "./game_section";
import { GameStructure } from "./game_structure";
import { ForcedBet } from "./forced_bet";
import { Evaluation } from "./evalulation";
import { StringFactory } from "./string_factory";
import { AcePosition } from "./ace_position";

export class Game {
    file: string;
    name: string;
    structure: GameStructure;
    forced_bet: ForcedBet;
    evaluation: Evaluation;
    abbreviation?: string;
    alternative_names?: string[];
    clarification?: string;
    sections: GameSection[];

    get sanitized_name(): string {
        let space_characters = /\s/gi;
        let disallowed_characters = /`|'/gi;
        return this.name.replace(disallowed_characters, '').replace(space_characters, '_').toLowerCase();
    }

    get final_hand_description(): string {
        return `Final Hand: ${this.evaluation.description}`;
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
            details: this.details,
            abbreviation: this.abbreviation,
            alternative_names: this.alternative_names,
            clarification: this.clarification,
            sections: this.sections.map((section: GameSection): any => {
                return section.to_serializable();
            })
        };
    }
}
