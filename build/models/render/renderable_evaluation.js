"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderableEvaluation = void 0;
var escape = require("escape-html");
var RenderableEvaluation = /** @class */ (function () {
    function RenderableEvaluation(evaluation, fx) {
        if (fx === void 0) { fx = null; }
        this.evaluation = evaluation;
        this.fx = fx;
        if (fx == null) {
            this.fx = function (input) { return input; };
            this.js = new RenderableEvaluation(evaluation, function (input) {
                if (!input) {
                    return '';
                }
                return input.replace(/[\\$'"]/g, "\\$&");
            });
            this.html = new RenderableEvaluation(evaluation, function (input) {
                if (!input) {
                    return '';
                }
                return escape(input);
            });
        }
    }
    Object.defineProperty(RenderableEvaluation.prototype, "type", {
        get: function () { return this.evaluation.type; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableEvaluation.prototype, "formal_name", {
        get: function () { return this.fx(this.evaluation.formal_name); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableEvaluation.prototype, "splits", {
        get: function () { return this.evaluation.splits.map(function (evaluation) { return new RenderableEvaluation(evaluation); }); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableEvaluation.prototype, "qualifier", {
        get: function () { return this.evaluation.qualifier; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableEvaluation.prototype, "exclusivity", {
        get: function () { return this.evaluation.exclusivity; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableEvaluation.prototype, "ace_position", {
        get: function () { return this.evaluation.ace_position; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableEvaluation.prototype, "player_hand_size", {
        get: function () { return this.evaluation.player_hand_size; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableEvaluation.prototype, "invalidation_hands", {
        get: function () { return this.evaluation.invalidation_hands; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableEvaluation.prototype, "bug_completion_hand", {
        get: function () { return this.evaluation.bug_completion_hands; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableEvaluation.prototype, "hand_description", {
        get: function () { return this.fx(this.evaluation.hand_description); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableEvaluation.prototype, "description", {
        get: function () { return this.fx(this.evaluation.description); },
        enumerable: false,
        configurable: true
    });
    return RenderableEvaluation;
}());
exports.RenderableEvaluation = RenderableEvaluation;
