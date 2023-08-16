import { isNullOrUndefined } from "../../architecture/global";
import { GameElement } from "../game_element";

export class BoardNode {
    card_count: number;
    is_face_up: boolean;

    public static hydrate(data: any): BoardNode {
        return new BoardNode(data['card_count'], data['is_face_up']);
    }

    constructor(card_count: number, is_face_up: boolean = false) {
        this.card_count = card_count;
        this.is_face_up = is_face_up;
    }

    to_serializable=(): any => {
        return {
            card_count: this.card_count,
            is_face_up: this.is_face_up
        };
    }
}

export class BoardSegment {
    name?: string;
    nodes: BoardNode[];

    public static hydrate(data: any): BoardSegment {
        return new BoardSegment(data['name'], data['nodes'].map((node: any) => BoardNode.hydrate(node)));
    }

    constructor(nodes: BoardNode[] = [], name?: string) {
        this.name = name;
        this.nodes = nodes;
    }

    to_serializable=(): any => {
        var output = {
            nodes: this.nodes.map(node => node.to_serializable())
        };
        if (!isNullOrUndefined(this.name) && this.name.length > 0) {
            output['name'] = this.name;
        }
        return output;
    }
}

export class DealBoardElement extends GameElement {
    board: BoardSegment;

    card_count: number;//deprecate
    is_face_up: boolean;//deprecate
 
    public static hydrate(data: any): DealBoardElement {
        var nodes: BoardNode[] = [];
        let card_count: number = data['card_count'];
        if (card_count != null && card_count != undefined) {
            for (var i = 0; i < card_count; i++) {
                nodes.push(new BoardNode(1, false));
            }
            return new DealBoardElement(new BoardSegment(nodes));
        }
        let board = data['board'];
        if (board != null && board != undefined) {
            return new DealBoardElement(BoardSegment.hydrate(board));
        }
        return null;
    }

    constructor(board: BoardSegment = new BoardSegment()) {
        super('deal_board');
        this.board = board;
    }

    get board_card_count(): number { return this.card_count; }

    to_serializable=(): any => {
        return {
            type: this.type,
            board: this.board.to_serializable()
        };
    }
}
