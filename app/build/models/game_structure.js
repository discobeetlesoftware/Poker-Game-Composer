"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStructure = void 0;
var GameStructure = /** @class */ (function () {
    function GameStructure() {
        var _this = this;
        this.to_serializable = function () {
            return {
                ante: _this.ante,
                fixed_limit: _this.fixed_limit,
                pot_limit: _this.pot_limit,
                no_limit: _this.no_limit
            };
        };
    }
    return GameStructure;
}());
exports.GameStructure = GameStructure;
