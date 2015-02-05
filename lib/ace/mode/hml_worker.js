define(function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var Mirror = require("../worker/mirror").Mirror;
    var HMLParser = require("./ccs/hml_grammar").HMLParser;
    var CCS = require("./ccs/ccs").CCS;
    var HML = require("./ccs/ccs").HML;
    //var lint = require("./my_language/lint");

    var HmlWorker = exports.HmlWorker = function(sender) {
        Mirror.call(this, sender);
        this.setTimeout(1500);
        //this.setOptions();
    };

    // Mirror is a simple class which keeps main and webWorker versions of the document in sync
    oop.inherits(HmlWorker, Mirror);

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
    }).call(HmlWorker.prototype);


    function lint(value) {
        var lines = value.split("\n");
        var e = [];
        
        var i = 0; 
        while (i < lines.length) {
            try {
                HMLParser.parse(value, {ccs: CCS, hml: HML});
            } catch (err) {
                var temp = err.line;
                
                err.line += i; // adjust line number
                e.push(err);
                
                // remove the lines already parsed
                var nextLines = lines.slice(0);
                nextLines.splice(0, i+temp);
                value = nextLines.join("\n");
                
                // remember how many lines have already been parsed, and continue
                i += temp;
                continue;
            }

            break;
        }
        
        return e;
   } 



});
