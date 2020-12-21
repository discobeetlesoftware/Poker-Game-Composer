export class NumberRange {
    min: number;
    max: number;
    magnitude: number;
    constructor(values: number[]) {
        this.min = values[0];
        this.max = values[values.length - 1];
        this.magnitude = this.max - this.min;
    }

    static From(input: any): NumberRange {
        if (typeof input == 'number') {
            return new NumberRange([input, input]);
        } else if (typeof input == 'object') {
            return input;
        }
    }

    to_serializable=(): any => {
        return [this.min, this.max];
    }
}
