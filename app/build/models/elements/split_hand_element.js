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
exports.SplitHandElement = void 0;
var game_element_1 = require("../game_element");
var SplitHandElement = /** @class */ (function (_super) {
    __extends(SplitHandElement, _super);
    function SplitHandElement(split_sizes) {
        if (split_sizes === void 0) { split_sizes = []; }
        var _this = _super.call(this, 'split_hand') || this;
        _this.is_equal_split = function () {
            if (_this.split_sizes.length == 0) {
                return false;
            }
            var size = _this.split_sizes[0];
            for (var j = 0; j < _this.split_sizes.length; j++) {
                if (_this.split_sizes[j] != size) {
                    return false;
                }
            }
            return true;
        };
        _this.to_serializable = function () {
            return {
                type: _this.type,
                split_sizes: _this.split_sizes
            };
        };
        _this.split_sizes = split_sizes;
        if (_this.is_equal_split()) {
            _this.canvas_title = "Split";
        }
        else {
            var hands = _this.split_sizes.map(function (size) { return size + "-"; });
            var handString = hands.join(' & ');
            _this.canvas_title = "Separate into " + handString + "card hands, cap cards";
        }
        return _this;
    }
    SplitHandElement.load = function (data) {
        return new SplitHandElement(data['split_sizes']);
    };
    return SplitHandElement;
}(game_element_1.GameElement));
exports.SplitHandElement = SplitHandElement;
