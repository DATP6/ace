define(function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    // defines the parent mode
    var TextMode = require("./text").Mode;
    var Tokenizer = require("../tokenizer").Tokenizer;
    var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
    var WorkerClient = require("../worker/worker_client").WorkerClient;

    // defines the language specific highlighters and folding rules
    var CcsHighlightRules = require("./ccs_highlight_rules").CcsHighlightRules;

    var Mode = function() {
        // set everything up
        this.HighlightRules = CcsHighlightRules;
        this.$outdent = new MatchingBraceOutdent();
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // configure comment start/end characters
        this.lineCommentStart = "*";

        // special logic for indent/outdent.
        // By default ace keeps indentation of previous line
        this.getNextLineIndent = function(state, line, tab) {
            var indent = this.$getIndent(line);
            return indent;
        };

        this.checkOutdent = function(state, line, input) {
            return this.$outdent.checkOutdent(line, input);
        };

        this.autoOutdent = function(state, doc, row) {
            this.$outdent.autoOutdent(doc, row);
        };


        this.createWorker = function(session) {
            var worker = new WorkerClient(["ace"], "ace/mode/ccs_worker", "CcsWorker");
            worker.attachToDocument(session.getDocument());

            worker.on("lint", function(results) {
                session.setAnnotations(results.data);
            });

            worker.on("terminate", function() {
                session.clearAnnotations();
            });

            return worker;
        };

    }).call(Mode.prototype);

    exports.Mode = Mode;
});
