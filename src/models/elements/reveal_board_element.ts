import { GameElement } from "../game_element";
import { Point } from "../geometry";

export class RevealBoardElement extends GameElement {
    nodes: Point[];

    public static hydrate(data: any): RevealBoardElement {
        return new RevealBoardElement(data['nodes'].map((node: any) => Point.hydrate(node)));
    }

    constructor(nodes: Point[] = []) {
        super('reveal_board');
        this.nodes = nodes;
    }

    to_serializable=(): any => {
        return {
            type: this.type,
            nodes: this.nodes.map(node => node.to_serializable())
        };
    }
}
