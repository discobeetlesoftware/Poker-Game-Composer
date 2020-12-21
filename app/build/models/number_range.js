"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberRange = void 0;
var NumberRange = /** @class */ (function () {
    function NumberRange(values) {
        var _this = this;
        this.to_serializable = function () {
            return [_this.min, _this.max];
        };
        this.min = values[0];
        this.max = values[values.length - 1];
        this.magnitude = this.max - this.min;
    }
    NumberRange.From = function (input) {
        if (typeof input == 'number') {
            return new NumberRange([input, input]);
        }
        else if (typeof input == 'object') {
            return input;
        }
    };
    return NumberRange;
}());
exports.NumberRange = NumberRange;
