var register = function(Handlebars) {

    var helpers = {
        // put all of your helpers inside this object

        loop: function(count, options) {
            console.log(options.data);
            var out = "";
            while (count--) {
                out += options.fn();
            }
            return out;
        },

        selected: function(element, type, options) {
            if (element.type == type) {
                return 'selected';
            } else {
                return '';
            }
        },

        checked: function(value, options) {
            return value ? 'checked' : '';
        },

        element_key: function(index, options) {
            return `element_${index}`;
        },

        section_key: function(index, options) {
            return `section_${index}`;
        },

        iterate: function(start, stop, options) {
            var result = "";
            for (var j = start; j < stop; j++) {
                result = result + options.fn(this);
            }
            return result;
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

// client
if (typeof window !== "undefined") {
    register(Handlebars);
}
// server
else {
    module.exports.register = register;
    module.exports.helpers = register(null);
}