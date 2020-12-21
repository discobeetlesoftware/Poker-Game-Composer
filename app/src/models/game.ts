import { GameSection } from "./game_section";
import path = require("path");
import fs = require("fs");
import { GameStructure } from "./game_structure";

export class Game {
    file: string;
    name: string;
    structure: GameStructure;
    details: string;
    abbreviation?: string;
    alternative_names?: string[];
    sections: GameSection[];

    get sanitized_name() {
        let spaceCharacters = /\s/gi;
        let disallowedCharacters = /`|'/gi;
        return this.name.replace(disallowedCharacters, '').replace(spaceCharacters, '_').toLowerCase();
    }

    to_json=(): string => {
        return JSON.stringify(this.to_serializable(), null, 2);
    }

    to_serializable=(): any => {
        return {
            name: this.name,
            details: this.details,
            structure: this.structure.to_serializable(),
            abbreviation: this.abbreviation,
            alternative_names: this.alternative_names,
            sections: this.sections.map((section: GameSection): any => {
                return section.to_serializable();
            })
        };
    }
}
