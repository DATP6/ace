define(function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var TTccsHighlightRules = function() {

        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
        this.$rules = {
            "start" : [
                {
                    token: "keyword.operator", regex: /[+|=\\\.]/
                },
                {
                    token: "variable.overline", regex: /'([a-z][a-zA-Z0-9?!_'\-#]*)\b/
                },
                {
                    token: "variable", regex: /\b[a-z][a-zA-Z0-9?!_'\-#]*\b/
                },
                {
                    token: "variable.bold", regex: /\b[0-9]+\b/
                },
                {
                    token: "variable.bold", regex: /\b[A-Z][A-Za-z0-9?!_'\-#]*\b/
                },
                {
                    token: "comment", regex: /\*[^\n]*/
                }
            ]
        };
    };

    oop.inherits(TccsHighlightRules, TextHighlightRules);

    exports.TccsHighlightRules = CcsHighlightRules;

});
