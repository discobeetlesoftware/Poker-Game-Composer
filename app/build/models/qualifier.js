"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Qualifier = exports.QualifierType = void 0;
var QualifierType;
(function (QualifierType) {
    QualifierType["None"] = "none";
    QualifierType["LowerRank"] = "lower_rank";
    QualifierType["HigherRank"] = "higher_rank";
    QualifierType["LowerHand"] = "lower_hand";
    QualifierType["HigherHand"] = "higher_hand";
})(QualifierType = exports.QualifierType || (exports.QualifierType = {}));
var Qualifier = /** @class */ (function () {
    function Qualifier() {
        var _this = this;
        this.to_serializable = function () {
            return {
                type: _this.type,
                rank: _this.rank,
                hand: _this.hand
            };
        };
    }
    return Qualifier;
}());
exports.Qualifier = Qualifier;
