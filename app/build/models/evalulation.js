"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluation = exports.Hand = exports.EvaluationExclusivity = exports.EvaluationType = void 0;
var ace_position_1 = require("./ace_position");
var EvaluationType;
(function (EvaluationType) {
    EvaluationType["High"] = "high";
    EvaluationType["Low"] = "low";
    EvaluationType["PointLow"] = "point_low";
    EvaluationType["PointHigh"] = "point_high";
    EvaluationType["Badugi"] = "badugi";
    EvaluationType["Split"] = "split";
})(EvaluationType = exports.EvaluationType || (exports.EvaluationType = {}));
(function (EvaluationType) {
    function All() {
        return Object.keys(EvaluationType);
    }
    EvaluationType.All = All;
})(EvaluationType = exports.EvaluationType || (exports.EvaluationType = {}));
var EvaluationExclusivity;
(function (EvaluationExclusivity) {
    EvaluationExclusivity["Any"] = "any";
    EvaluationExclusivity["All"] = "all";
    EvaluationExclusivity["ExactlyOne"] = "one";
    EvaluationExclusivity["ExactlyTwo"] = "two";
    EvaluationExclusivity["ExactlyThree"] = "three";
    EvaluationExclusivity["ExactlyFour"] = "four";
    EvaluationExclusivity["ExactlyFive"] = "five";
    EvaluationExclusivity["ExactlySix"] = "six";
    EvaluationExclusivity["ExactlySeven"] = "seven";
})(EvaluationExclusivity = exports.EvaluationExclusivity || (exports.EvaluationExclusivity = {}));
var Hand;
(function (Hand) {
    Hand["High"] = "high";
    Hand["Pair"] = "pair";
    Hand["TwoPair"] = "two_pair";
    Hand["ThreeOfAKind"] = "three_of_a_kind";
    Hand["Straight"] = "straight";
    Hand["Flush"] = "flush";
    Hand["FullHouse"] = "full_house";
    Hand["FourOfAKind"] = "four_of_a_kind";
    Hand["StraightFlush"] = "straight_flush";
    Hand["RoyalFlush"] = "royal_flush";
    Hand["FiveOfAKind"] = "five_of_a_kind";
})(Hand = exports.Hand || (exports.Hand = {}));
var Evaluation = /** @class */ (function () {
    function Evaluation() {
        var _this = this;
        this.ace_position = ace_position_1.AcePosition.Both;
        this.to_serializable = function () {
            return {
                type: _this.type,
                splits: _this.splits.map(function (element) {
                    return element.to_serializable();
                }),
                qualifier: _this.qualifier.to_serializable(),
                exclusivity: _this.exclusivity,
                ace_position: _this.ace_position,
                invalidation_hands: _this.invalidation_hands,
                bug_completion_hands: _this.bug_completion_hands
            };
        };
    }
    Object.defineProperty(Evaluation.prototype, "hand_description", {
        get: function () {
            var individual_count = 0;
            var community_count = 0;
            switch (this.exclusivity) {
                case EvaluationExclusivity.ExactlyOne:
                    individual_count = 1;
                    break;
                case EvaluationExclusivity.ExactlyTwo:
                    individual_count = 2;
                    break;
                case EvaluationExclusivity.ExactlyThree:
                    individual_count = 3;
                    break;
                case EvaluationExclusivity.ExactlyFour:
                    individual_count = 4;
                    break;
            }
            if (individual_count > 0) {
                community_count = 5 - individual_count;
            }
            return "Best 5-card hand using " + individual_count + " individual and " + community_count + " community";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Evaluation.prototype, "description", {
        get: function () {
            return this.hand_description;
        },
        enumerable: false,
        configurable: true
    });
    return Evaluation;
}());
exports.Evaluation = Evaluation;
