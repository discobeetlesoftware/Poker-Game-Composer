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
exports.DealPlayerElement = void 0;
var game_element_1 = require("../game_element");
var DealPlayerElement = /** @class */ (function (_super) {
    __extends(DealPlayerElement, _super);
    function DealPlayerElement(card_count, is_face_up) {
        if (card_count === void 0) { card_count = 0; }
        if (is_face_up === void 0) { is_face_up = false; }
        var _this = _super.call(this, 'deal_player') || this;
        _this.to_serializable = function () {
            return {
                type: _this.type,
                card_count: _this.card_count,
                is_face_up: _this.is_face_up
            };
        };
        _this.card_count = card_count;
        _this.is_face_up = is_face_up;
        return _this;
    }
    DealPlayerElement.load = function (data) {
        return new DealPlayerElement(data['card_count'], data['is_face_up']);
    };
    Object.defineProperty(DealPlayerElement.prototype, "player_card_count", {
        get: function () { return this.card_count; },
        enumerable: false,
        configurable: true
    });
    return DealPlayerElement;
}(game_element_1.GameElement));
exports.DealPlayerElement = DealPlayerElement;
