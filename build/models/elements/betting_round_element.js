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
exports.BettingRoundElement = void 0;
var game_element_1 = require("../game_element");
var BettingRoundElement = /** @class */ (function (_super) {
    __extends(BettingRoundElement, _super);
    function BettingRoundElement() {
        return _super.call(this, 'betting_round') || this;
    }
    BettingRoundElement.load = function (data) {
        return new BettingRoundElement();
    };
    return BettingRoundElement;
}(game_element_1.GameElement));
exports.BettingRoundElement = BettingRoundElement;
