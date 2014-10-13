define(function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var Mirror = require("../worker/mirror").Mirror;
    var CCSParser = require("./ccs/ccs_grammar").CCSParser;
    var CCS = require("./ccs/ccs").CCS;
    //var lint = require("./my_language/lint");

    var CcsWorker = exports.CcsWorker = function(sender) {
        Mirror.call(this, sender);
        this.setTimeout(1500);
        //this.setOptions();
    };

    // Mirror is a simple class which keeps main and webWorker versions of the document in sync
    oop.inherits(CcsWorker, Mirror);

    (function() {
        this.onUpdate = function() {
            var value = this.doc.getValue();
            var errors = [];
            var results = lint(value);            

            for (var i = 0; i < results.length; i++) {
                var error = results[i];
                // convert to ace gutter annotation
                errors.push({
                    row: error.line-1, // must be 0 based
                    column: error.column-1,  // must be 0 based
                    text: error.message,  // text to show in tooltip
                    type: "error"
                });
            }
            this.sender.emit("lint", errors);
        };
    }).call(CcsWorker.prototype);

    function lint(value) {
        var lines = value.split("\n");
        var e = [];

        // Parse each line individually
        for (var i = 0; i < lines.length; i++) {
            var graph = new CCS.Graph();
            try {
                CCSParser.parse(lines[i], {ccs: CCS, graph: graph});
            } catch (err) {
                err.line = i+1;
                e.push(err);
            }
        }
        
        return e;
    }


});
