import { isNullOrUndefined } from "../architecture/global";
import { Line, Point } from "./geometry";

export enum BoardEvaluationType {
    None = 'none', // no community cards
    AnyX = 'anyX', // When the rows are equal size
    AnyY = 'anyY', // When the columns are equal size
    Chain = 'chain', // When the rows 
    Pool = 'pool'
}

export class BoardEvaluation {
    type: BoardEvaluationType;
    name?: string;
    geometry: Line[] | Point[];

    constructor(type: BoardEvaluationType = BoardEvaluationType.None, geometry: Line[] | Point[] = []) {
        this.type = type;
        this.geometry = geometry;
    }

    public static hydrate(data: any): BoardEvaluation {
        if (isNullOrUndefined(data)) {
            return null;
        }
        var evaluation = new BoardEvaluation(data['type'], (data['geometry'] ?? []).map((geometry: any) => {
            if (geometry['type'] === 'chain') {
                return Line.hydrate(geometry);
            } else {
                return Point.hydrate(geometry);
            }
        }));
        evaluation.name = isNullOrUndefined(data['name']) ? null : data['name'];
        return evaluation;
    }

    to_serializable = (): any => {
        var output = {
            type: this.type
        };
        if (!isNullOrUndefined(this.geometry) && this.geometry.length > 0) {
            output['geometry'] = this.geometry.map(geometry => geometry.to_serializable());
        }
        if (!isNullOrUndefined(this.name) && this.name.length > 0) {
            output['name'] = this.name;
        }
        return output;
    }
}
