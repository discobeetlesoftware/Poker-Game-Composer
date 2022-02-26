"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameElement = void 0;
var GameElement = /** @class */ (function () {
    function GameElement(type) {
        var _this = this;
        if (type === void 0) { type = ''; }
        this.to_serializable = function () {
            return {
                type: _this.type
            };
        };
        this.type = type;
        this.is_proto = type == '' ? true : false;
        this.partial_name = "partials/canvas/elements/".concat(type, ".njk");
        this.edit_option_partial_name = "partials/edit/elements/".concat(type, ".njk");
    }
    Object.defineProperty(GameElement.prototype, "player_card_count", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "board_card_count", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    return GameElement;
}());
exports.GameElement = GameElement;
