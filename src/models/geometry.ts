import { ISerilizable } from "../architecture/global";

export class Point implements ISerilizable {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static hydrate(data: any): Point {
        return new Point(data['x'], data['y']);
    }

    to_serializable = (): any => {
        return {
            x: this.x,
            y: this.y
        };
    }
}

export class Line implements ISerilizable {
    x: number;

    public static hydrate(data: any): Line {
        return new Line(data['x']);
    }

    constructor(x: number) {
        this.x = x;
    }

    point=(y: number): Point => {
        return new Point(this.x, y);
    }

    to_serializable = (): any => {
        return {
            x: this.x
        };
    }
}
