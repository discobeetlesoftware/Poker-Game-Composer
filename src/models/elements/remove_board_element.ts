import { GameElement } from "../game_element";
import { Point } from "../geometry";

export enum RemoveBoardType {
    ConservativeLowerRank
}

export class RemoveBoardElement extends GameElement {
    removal_type: RemoveBoardType
    nodes: Point[];

    constructor(nodes: Point[] = []) {
        super('remove_board');
        this.nodes = nodes;
    }

    to_serializable = () => {
        return {
            type: this.type,
            removal_type: this.removal_type,
            nodes: this.nodes.map(node => node.to_serializable())
        };
    };
}