import { GameElement } from "./game_element";

export class GameSection {
    name: string;
    elements: GameElement[];

    build_function_name=(index: number): string => {
        let regex = /\-|\s/gi;
        return 'build_section_' + index + '_' + this.name.replace(regex, '');
    }

    to_serializable=(): any => {
        return {
            name: this.name,
            elements: this.elements.map((element: GameElement): any => {
                if (element != undefined) {
                    return element.to_serializable();
                } else {
                    return {};
                }
            })
        };
    }
}
