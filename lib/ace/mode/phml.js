define(function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    // defines the parent mode
    var TextMode = require("./text").Mode;
    var Tokenizer = require("../tokenizer").Tokenizer;
    var WorkerClient = require("../worker/worker_client").WorkerClient;

    // defines the language specific highlighters and folding rules
    var PhmlHighlightRules = require("./phml_highlight_rules").PhmlHighlightRules;

    var Mode = function() {
        // set everything up
        this.HighlightRules = PhmlHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // configure comment start/end characters
        this.lineCommentStart = "*";

        this.createWorker = function(session) {
            var worker = new WorkerClient(["ace"], "ace/mode/phml_worker", "PhmlWorker");
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
