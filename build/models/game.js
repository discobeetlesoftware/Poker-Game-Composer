"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var game_structure_1 = require("./game_structure");
var evalulation_1 = require("./evalulation");
var string_factory_1 = require("./string_factory");
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.file = '';
        this.name = '';
        this.structure = new game_structure_1.GameStructure();
        this.evaluation = new evalulation_1.Evaluation();
        this.abbreviation = '';
        this.alternative_names = '';
        this.clarification = '';
        this.max_players = function (use_burn_cards) {
            if (use_burn_cards === void 0) { use_burn_cards = true; }
            var player_card_count = 0;
            var board_card_count = 0;
            var burn_cards_count = 0;
            _this.sections.forEach(function (section) {
                section.elements.forEach(function (element) {
                    player_card_count += element.player_card_count;
                    var board_cards = element.board_card_count;
                    board_card_count += board_cards;
                    if (use_burn_cards && board_cards > 0) {
                        burn_cards_count += 1;
                    }
                });
            });
            return Math.floor(((_this.deck_size - board_card_count) - burn_cards_count) / player_card_count);
        };
        this.to_json = function () {
            return JSON.stringify(_this.to_serializable(), null, 2);
        };
        this.to_serializable = function () {
            return {
                name: _this.name,
                structure: _this.structure.to_serializable(),
                forced_bet: _this.forced_bet,
                evaluation: _this.evaluation.to_serializable(),
                abbreviation: _this.abbreviation,
                alternative_names: _this.alternative_names,
                clarification: _this.clarification,
                custom_player_max: _this.custom_player_max,
                sections: _this.sections.map(function (section) {
                    return section.to_serializable();
                })
            };
        };
    }
    ;
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
            return "Final Hand: ".concat(this.evaluation.description);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "is_split_pot", {
        get: function () {
            return this.evaluation.splits.length >= 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "deck_size", {
        get: function () { return 52; },
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
            if (this.is_split_pot) {
                elements.push('Split Pot');
            }
            var player_count = this.max_players();
            if (player_count < 10) {
                elements.push(player_count + ' Players Max');
            }
            return elements.join(' • ');
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
exports.Game = Game;
