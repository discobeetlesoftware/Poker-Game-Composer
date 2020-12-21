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
var game_1 = require("./game");
var game_element_type_1 = require("./game_element_type");
var game_section_1 = require("./game_section");
var game_structure_1 = require("./game_structure");
var number_range_1 = require("./number_range");
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
        var game = new game_1.Game();
        game.name = params.name;
        game.abbreviation = params.abbreviation;
        game.structure = Factory.hydrate_structure(params.structures);
        game.alternative_names = params.alternative_names;
        game.sections = params.section.map(function (data) {
            return Factory.hydrate_section(data);
        });
        return game;
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
                return new discard_card_element_1.DiscardCardElement(range, params.then_draw);
            case game_element_type_1.GameElementType.DiscardHand:
                return new discard_hand_element_1.DiscardHandElement(new number_range_1.NumberRange([parseInt(params.hand_count), parseInt(params.hand_count)]));
            case game_element_type_1.GameElementType.DrawCard:
                return new draw_card_element_1.DrawCardElement(new number_range_1.NumberRange([parseInt(params.card_count), parseInt(params.card_count)]));
            case game_element_type_1.GameElementType.ExposeCard:
                return new expose_card_element_1.ExposeCardElement(new number_range_1.NumberRange([parseInt(params.card_count), parseInt(params.card_count)]));
            case game_element_type_1.GameElementType.SplitHand:
                return new split_hand_element_1.SplitHandElement(params.hand_size.map(parseInt));
        }
    };
    return Factory;
}());
exports.Factory = Factory;
