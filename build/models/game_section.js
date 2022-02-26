"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSection = void 0;
var GameSection = /** @class */ (function () {
    function GameSection() {
        var _this = this;
        this.build_function_name = function (index) {
            var regex = /\-|\s/gi;
            return 'build_section_' + index + '_' + _this.name.replace(regex, '');
        };
        this.to_serializable = function () {
            return {
                name: _this.name,
                elements: _this.elements.map(function (element) {
                    if (element != undefined) {
                        return element.to_serializable();
                    }
                    else {
                        return {};
                    }
                })
            };
        };
    }
    return GameSection;
}());
exports.GameSection = GameSection;
