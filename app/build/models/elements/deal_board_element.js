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
exports.DealBoardElement = void 0;
var game_element_1 = require("../game_element");
var DealBoardElement = /** @class */ (function (_super) {
    __extends(DealBoardElement, _super);
    function DealBoardElement(card_count) {
        if (card_count === void 0) { card_count = 0; }
        var _this = _super.call(this, 'deal_board') || this;
        _this.to_serializable = function () {
            return {
                type: _this.type,
                card_count: _this.card_count
            };
        };
        _this.card_count = card_count;
        return _this;
    }
    DealBoardElement.load = function (data) {
        return new DealBoardElement(data['card_count']);
    };
    return DealBoardElement;
}(game_element_1.GameElement));
exports.DealBoardElement = DealBoardElement;
