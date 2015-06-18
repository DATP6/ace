define(function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var ThmlHighlightRules = function() {

        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
        this.$rules = {
            "start" : [
                {
                    token: "keyword.operator", regex: /[<>\[\]]|or|and|[mM][aA][xX]=|[mM][iI][nN]=/
                },
                {
                    token: "constant", regex: /\bff|tt\b/
                },
                {
                    token: "variable.bold", regex: /\b[A-Z][A-Za-z0-9?!_'\-#]*\b/
                },
                {
                    token: "delay", regex: /\b[0-9]+\b/
                },
                {
                    token: "comment", regex: /\*[^\n]*/
                }
            ]
        };
    };

    oop.inherits(ThmlHighlightRules, TextHighlightRules);

    exports.ThmlHighlightRules = ThmlHighlightRules;

});
