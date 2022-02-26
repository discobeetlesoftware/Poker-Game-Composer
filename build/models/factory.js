"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
var betting_round_element_1 = require("./elements/betting_round_element");
var deal_board_element_1 = require("./elements/deal_board_element");
var deal_player_element_1 = require("./elements/deal_player_element");
var discard_card_element_1 = require("./elements/discard_card_element");
var discard_hand_element_1 = require("./elements/discard_hand_element");
var draw_card_element_1 = require("./elements/draw_card_element");
var expose_card_element_1 = require("./elements/expose_card_element");
var split_hand_element_1 = require("./elements/split_hand_element");
var evalulation_1 = require("./evalulation");
var game_1 = require("./game");
var game_element_type_1 = require("./game_element_type");
var game_section_1 = require("./game_section");
var game_structure_1 = require("./game_structure");
var number_range_1 = require("./number_range");
var qualifier_1 = require("./qualifier");
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.create_element = function (type) {
        switch (type) {
            case game_element_type_1.GameElementType.BettingRound: return new betting_round_element_1.BettingRoundElement();
            case game_element_type_1.GameElementType.DealBoard: return new deal_board_element_1.DealBoardElement();
            case game_element_type_1.GameElementType.DealPlayer: return new deal_player_element_1.DealPlayerElement();
            case game_element_type_1.GameElementType.DiscardCard: return new discard_card_element_1.DiscardCardElement();
            case game_element_type_1.GameElementType.DiscardHand: return new discard_hand_element_1.DiscardHandElement();
            case game_element_type_1.GameElementType.DrawCard: return new draw_card_element_1.DrawCardElement();
            case game_element_type_1.GameElementType.ExposeCard: return new expose_card_element_1.ExposeCardElement();
            case game_element_type_1.GameElementType.SplitHand: return new split_hand_element_1.SplitHandElement();
        }
    };
    Factory.hydrate_game = function (params) {
        var _a;
        if (!params.name || params.name == '') {
            return null;
        }
        var game = new game_1.Game();
        game.name = params.name;
        game.abbreviation = params.abbreviation;
        game.structure = Factory.hydrate_structure(params.structures);
        game.evaluation = Factory.hydrate_evaluation(params.evaluation.shift());
        game.forced_bet = params.forced_bet;
        game.alternative_names = params.alternative_names;
        game.sections = ((_a = params.section) !== null && _a !== void 0 ? _a : []).map(function (data) {
            return Factory.hydrate_section(data);
        });
        return game;
    };
    Factory.hydrate_qualifier = function (params) {
        var qualifier = new qualifier_1.Qualifier();
        if (!params) {
            return qualifier;
        }
        qualifier.type = params.type;
        qualifier.rank = params.rank;
        qualifier.hand = params.hand;
        qualifier.specific_hand = params.specific_hand;
        return qualifier;
    };
    Factory.hydrate_evaluation = function (params) {
        var _a, _b;
        var evaluation = new evalulation_1.Evaluation();
        if (params != undefined) {
            evaluation.type = params.type;
            evaluation.formal_name = params.formal_name;
            evaluation.player_hand_size = params.player_hand_size;
            evaluation.ace_position = params.ace;
            evaluation.exclusivity = params.exclusivity;
            evaluation.qualifier = Factory.hydrate_qualifier(params.qualifier);
            evaluation.invalidation_hands = params.invalidation_hands;
            evaluation.qualifier_type = (_a = evaluation.qualifier.type) !== null && _a !== void 0 ? _a : qualifier_1.QualifierType.None;
            var splits = (_b = params.split) !== null && _b !== void 0 ? _b : [];
            evaluation.splits = splits.map(function (splitData) {
                return Factory.hydrate_evaluation(splitData);
            });
        }
        return evaluation;
    };
    Factory.hydrate_structure = function (params) {
        var structure = new game_structure_1.GameStructure();
        if (params != undefined) {
            structure.ante = params.ante == 'on';
            structure.fixed_limit = params.fixed_limit == 'on';
            structure.pot_limit = params.pot_limit == 'on';
            structure.no_limit = params.no_limit == 'on';
        }
        return structure;
    };
    Factory.hydrate_section = function (params) {
        var section = new game_section_1.GameSection();
        section.name = params.name;
        section.elements = params.elements.map(function (data) {
            return Factory.hydrate_element(data);
        });
        return section;
    };
    Factory.hydrate_element = function (params) {
        switch (params.type) {
            case game_element_type_1.GameElementType.BettingRound:
                return new betting_round_element_1.BettingRoundElement();
            case game_element_type_1.GameElementType.DealBoard:
                return new deal_board_element_1.DealBoardElement(parseInt(params.card_count));
            case game_element_type_1.GameElementType.DealPlayer:
                return new deal_player_element_1.DealPlayerElement(parseInt(params.card_count), params.is_face_up == 'on');
            case game_element_type_1.GameElementType.DiscardCard:
                var min = params.scope == 'exactly' ? parseInt(params.card_count) : 0;
                var range = new number_range_1.NumberRange([min, parseInt(params.card_count)]);
                return new discard_card_element_1.DiscardCardElement(range, params.then_draw == 'on');
            case game_element_type_1.GameElementType.DiscardHand:
                return new discard_hand_element_1.DiscardHandElement(new number_range_1.NumberRange([parseInt(params.hand_count), parseInt(params.hand_count)]));
            case game_element_type_1.GameElementType.DrawCard:
                return new draw_card_element_1.DrawCardElement(new number_range_1.NumberRange([parseInt(params.card_count), parseInt(params.card_count)]));
            case game_element_type_1.GameElementType.ExposeCard:
                return new expose_card_element_1.ExposeCardElement(new number_range_1.NumberRange([parseInt(params.card_count), parseInt(params.card_count)]));
            case game_element_type_1.GameElementType.SplitHand:
                return new split_hand_element_1.SplitHandElement(params.hand_size.map(function (size) { return parseInt(size); }));
        }
    };
    return Factory;
}());
exports.Factory = Factory;
