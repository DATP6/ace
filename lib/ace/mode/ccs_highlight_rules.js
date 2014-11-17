define(function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var CcsHighlightRules = function() {

        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
        this.$rules = {
            "start" : [
                {
                    token: "keyword.operator", regex: /[+|=\\\.]/
                },
                {
                    token: "constant.other", regex: /'([a-zA-Z0-9])+/
                },
                {
                    token: "variable", regex: /\b[A-Z][A-Za-z0-9?!_'\-#]*\b/
                },
                {
                    token: "comment", regex: /\*[^\n]*/
                }
            ]
        };
    };

    oop.inherits(CcsHighlightRules, TextHighlightRules);

    exports.CcsHighlightRules = CcsHighlightRules;

});
