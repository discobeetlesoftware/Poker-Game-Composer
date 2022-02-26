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
exports.DrawCardElement = void 0;
var game_element_1 = require("../game_element");
var number_range_1 = require("../number_range");
var DrawCardElement = /** @class */ (function (_super) {
    __extends(DrawCardElement, _super);
    function DrawCardElement(card_count_range) {
        if (card_count_range === void 0) { card_count_range = new number_range_1.NumberRange([]); }
        var _this = _super.call(this, 'draw_card') || this;
        _this.to_serializable = function () {
            return {
                type: _this.type,
                card_count_range: _this.card_count_range.to_serializable()
            };
        };
        _this.card_count_range = card_count_range;
        return _this;
    }
    Object.defineProperty(DrawCardElement.prototype, "player_card_count", {
        get: function () { return this.card_count_range.max; },
        enumerable: false,
        configurable: true
    });
    DrawCardElement.load = function (data) {
        return new DrawCardElement(data['range']);
    };
    return DrawCardElement;
}(game_element_1.GameElement));
exports.DrawCardElement = DrawCardElement;
