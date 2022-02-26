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
exports.DiscardCardElement = void 0;
var game_element_1 = require("../game_element");
var number_range_1 = require("../number_range");
var DiscardCardElement = /** @class */ (function (_super) {
    __extends(DiscardCardElement, _super);
    function DiscardCardElement(card_count_range, then_draw) {
        if (card_count_range === void 0) { card_count_range = new number_range_1.NumberRange([]); }
        if (then_draw === void 0) { then_draw = false; }
        var _this = _super.call(this, 'discard_card') || this;
        _this.to_serializable = function () {
            return {
                type: _this.type,
                card_count_range: _this.card_count_range.to_serializable(),
                then_draw: _this.then_draw,
            };
        };
        _this.card_count_range = card_count_range;
        _this.then_draw = then_draw;
        var verb = then_draw ? 'Draw' : 'Discard';
        if (_this.card_count_range.magnitude == 0) {
            _this.canvas_title = "".concat(verb, " exactly ").concat(_this.card_count_range.min, " card ").concat(_this.card_count_range.max > 1 ? "s" : "");
        }
        else {
            _this.canvas_title = "".concat(verb, " ").concat(_this.card_count_range.min, " - ").concat(_this.card_count_range.max, " cards");
        }
        return _this;
    }
    Object.defineProperty(DiscardCardElement.prototype, "player_card_count", {
        get: function () { return this.then_draw ? this.card_count_range.max : 0; },
        enumerable: false,
        configurable: true
    });
    DiscardCardElement.load = function (data) {
        return new DiscardCardElement(new number_range_1.NumberRange(data['card_count_range']), data['then_draw']);
    };
    return DiscardCardElement;
}(game_element_1.GameElement));
exports.DiscardCardElement = DiscardCardElement;
