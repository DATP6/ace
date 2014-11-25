define(function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    // defines the parent mode
    var TextMode = require("./text").Mode;
    var Tokenizer = require("../tokenizer").Tokenizer;

    // defines the language specific highlighters and folding rules
    var HmlHighlightRules = require("./hml_highlight_rules").HmlHighlightRules;

    var Mode = function() {
        // set everything up
        this.HighlightRules = HmlHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // configure comment start/end characters
        this.lineCommentStart = "*";

    }).call(Mode.prototype);

    exports.Mode = Mode;
});
