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
                    token: "keyword.operator", regex: /[+|=\\]/
                },
                {
                    token: "variable", regex: /[\s]*[A-Z][a-zA-Z0-9_]*/
                },
                {
                    token: "comment", regex: /\*.*/
                }
            ]
        };
    };

    oop.inherits(CcsHighlightRules, TextHighlightRules);

    exports.CcsHighlightRules = CcsHighlightRules;

});
