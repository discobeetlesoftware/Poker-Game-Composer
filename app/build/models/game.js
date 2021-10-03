"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var string_factory_1 = require("./string_factory");
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.to_json = function () {
            return JSON.stringify(_this.to_serializable(), null, 2);
        };
        this.to_serializable = function () {
            return {
                name: _this.name,
                structure: _this.structure.to_serializable(),
                forced_bet: _this.forced_bet,
                evaluation: _this.evaluation.to_serializable(),
                details: _this.details,
                abbreviation: _this.abbreviation,
                alternative_names: _this.alternative_names,
                clarification: _this.clarification,
                sections: _this.sections.map(function (section) {
                    return section.to_serializable();
                })
            };
        };
    }
    Object.defineProperty(Game.prototype, "sanitized_name", {
        get: function () {
            var space_characters = /\s/gi;
            var disallowed_characters = /`|'/gi;
            return this.name.replace(disallowed_characters, '').replace(space_characters, '_').toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "final_hand_description", {
        get: function () {
            return "Final Hand: " + this.evaluation.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "description", {
        get: function () {
            var elements = [];
            elements.push(this.final_hand_description);
            return elements.join('\n');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "details", {
        get: function () {
            var elements = [];
            if (this.clarification) {
                elements.push(this.clarification);
            }
            elements.push(string_factory_1.StringFactory.forced_bet(this.forced_bet));
            return elements.join(' • ');
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
exports.Game = Game;
