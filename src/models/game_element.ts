import fs = require("fs");

export class GameElement {
    is_proto: boolean;
    type: string;
    partial_name: string;
    edit_option_partial_name: string;

    constructor(type: string = '') {
        this.type = type;
        this.is_proto = type == '' ? true : false;
        this.partial_name = `partials/canvas/elements/${type}.njk`;
        this.edit_option_partial_name = `partials/edit/elements/${type}.njk`;
    }

    get player_card_count(): number { return 0; }
    get board_card_count(): number { return 0; }

    to_serializable=(): any => {
        return {
            type: this.type
        };
    }
}
