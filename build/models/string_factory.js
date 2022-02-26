"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringFactory = void 0;
var forced_bet_1 = require("./forced_bet");
var StringFactory = /** @class */ (function () {
    function StringFactory() {
    }
    StringFactory.forced_bet = function (forced_bet) {
        switch (forced_bet) {
            case forced_bet_1.ForcedBet.Ante: return 'Ante';
            case forced_bet_1.ForcedBet.Blinds: return 'Blinds';
            case forced_bet_1.ForcedBet.HighBringIn: return 'Bring-in (High)';
            case forced_bet_1.ForcedBet.LowBringIn: return 'Bring-in (Low)';
        }
    };
    return StringFactory;
}());
exports.StringFactory = StringFactory;
