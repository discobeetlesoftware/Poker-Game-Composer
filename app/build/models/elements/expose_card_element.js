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
exports.ExposeCardElement = void 0;
var game_element_1 = require("../game_element");
var number_range_1 = require("../number_range");
var ExposeCardElement = /** @class */ (function (_super) {
    __extends(ExposeCardElement, _super);
    function ExposeCardElement(card_count_range) {
        if (card_count_range === void 0) { card_count_range = new number_range_1.NumberRange([]); }
        var _this = _super.call(this, 'expose_card') || this;
        _this.to_serializable = function () {
            return {
                type: _this.type,
                card_count_range: _this.card_count_range.to_serializable()
            };
        };
        _this.card_count_range = number_range_1.NumberRange.From(card_count_range);
        return _this;
    }
    Object.defineProperty(ExposeCardElement.prototype, "canvas_title", {
        get: function () {
            return ExposeCardElement.GenerateCanvasTitle(this.card_count_range);
        },
        enumerable: false,
        configurable: true
    });
    ExposeCardElement.GenerateCanvasTitle = function (range) {
        if (range == undefined) {
            return "Error";
        }
        if (range.magnitude == 0) {
            return "Expose " + range.min + " card" + (range.max > 1 ? "s" : "");
        }
        else {
            return "Expose " + range.min + "-" + range.max + " cards";
        }
    };
    ExposeCardElement.load = function (data) {
        return new ExposeCardElement(data['card_count_range']);
    };
    return ExposeCardElement;
}(game_element_1.GameElement));
exports.ExposeCardElement = ExposeCardElement;
