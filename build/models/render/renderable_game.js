"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderableGame = void 0;
var escape = require("escape-html");
var renderable_evaluation_1 = require("./renderable_evaluation");
var RenderableGame = /** @class */ (function () {
    function RenderableGame(game, fx) {
        var _this = this;
        if (fx === void 0) { fx = null; }
        this.max_players = function (use_burn_cards) {
            if (use_burn_cards === void 0) { use_burn_cards = true; }
            return _this.game.max_players(use_burn_cards);
        };
        this.game = game;
        this.fx = fx;
        if (fx == null) {
            this.fx = function (input) { return input; };
            this.js = new RenderableGame(game, function (input) {
                if (!input) {
                    return '';
                }
                return input.replace(/[\\$'"]/g, "\\$&");
            });
            this.html = new RenderableGame(game, function (input) {
                if (!input) {
                    return '';
                }
                return escape(input);
            });
        }
    }
    Object.defineProperty(RenderableGame.prototype, "file", {
        get: function () { return this.game.file; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "name", {
        get: function () { return this.fx(this.game.name); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "structure", {
        get: function () { return this.game.structure; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "forced_bet", {
        get: function () { return this.game.forced_bet; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "evaluation", {
        get: function () { return new renderable_evaluation_1.RenderableEvaluation(this.game.evaluation); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "abbreviation", {
        get: function () { return this.fx(this.game.abbreviation); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "custom_player_max", {
        get: function () { return this.game.custom_player_max; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "alternative_names", {
        get: function () { return this.fx(this.game.alternative_names); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "clarification", {
        get: function () { return this.fx(this.clarification); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "sections", {
        get: function () { return this.game.sections; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "sanitized_name", {
        get: function () { return this.fx(this.game.sanitized_name); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "final_hand_description", {
        get: function () { return this.fx(this.game.final_hand_description); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "is_split_pot", {
        get: function () { return this.game.is_split_pot; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "description", {
        get: function () { return this.fx(this.game.description); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableGame.prototype, "details", {
        get: function () { return this.fx(this.game.details); },
        enumerable: false,
        configurable: true
    });
    return RenderableGame;
}());
exports.RenderableGame = RenderableGame;
