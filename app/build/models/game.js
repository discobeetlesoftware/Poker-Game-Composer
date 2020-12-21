"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.to_json = function () {
            return JSON.stringify(_this.to_serializable(), null, 2);
        };
        this.to_serializable = function () {
            return {
                name: _this.name,
                details: _this.details,
                structure: _this.structure.to_serializable(),
                abbreviation: _this.abbreviation,
                alternative_names: _this.alternative_names,
                sections: _this.sections.map(function (section) {
                    return section.to_serializable();
                })
            };
        };
    }
    Object.defineProperty(Game.prototype, "sanitized_name", {
        get: function () {
            var spaceCharacters = /\s/gi;
            var disallowedCharacters = /`|'/gi;
            return this.name.replace(disallowedCharacters, '').replace(spaceCharacters, '_').toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
exports.Game = Game;
