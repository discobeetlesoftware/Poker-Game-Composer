"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscardHandElement = void 0;
var game_element_1 = require("../game_element");
var number_range_1 = require("../number_range");
var DiscardHandElement = /** @class */ (function (_super) {
    __extends(DiscardHandElement, _super);
    function DiscardHandElement(hand_count_range) {
        if (hand_count_range === void 0) { hand_count_range = new number_range_1.NumberRange([]); }
        var _this = _super.call(this, 'discard_hand') || this;
        _this.to_serializable = function () {
            return {
                type: _this.type,
                hand_count_range: _this.hand_count_range.to_serializable()
            };
        };
        _this.hand_count_range = hand_count_range;
        if (_this.hand_count_range.magnitude == 0) {
            _this.canvas_title = "Discard\\n" + _this.hand_count_range.min + " hand";
        }
        else {
            _this.canvas_title = "Discard\\n" + _this.hand_count_range.min + "-" + _this.hand_count_range.max + " hands";
        }
        return _this;
    }
    DiscardHandElement.load = function (data) {
        return new DiscardHandElement(new number_range_1.NumberRange(data['hand_count_range']));
    };
    return DiscardHandElement;
}(game_element_1.GameElement));
exports.DiscardHandElement = DiscardHandElement;
