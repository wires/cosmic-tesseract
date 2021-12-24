parser = // Generated by Peggy 1.2.0.
//
// https://peggyjs.org/
(function() {
  "use strict";

  function peg$subclass(child, parent) {
    function C() { this.constructor = child; }
    C.prototype = parent.prototype;
    child.prototype = new C();
  }

  function peg$SyntaxError(message, expected, found, location) {
    var self = Error.call(this, message);
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(self, peg$SyntaxError.prototype);
    }
    self.expected = expected;
    self.found = found;
    self.location = location;
    self.name = "SyntaxError";
    return self;
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$padEnd(str, targetLength, padString) {
    padString = padString || " ";
    if (str.length > targetLength) { return str; }
    targetLength -= str.length;
    padString += padString.repeat(targetLength);
    return str + padString.slice(0, targetLength);
  }

  peg$SyntaxError.prototype.format = function(sources) {
    var str = "Error: " + this.message;
    if (this.location) {
      var src = null;
      var k;
      for (k = 0; k < sources.length; k++) {
        if (sources[k].source === this.location.source) {
          src = sources[k].text.split(/\r\n|\n|\r/g);
          break;
        }
      }
      var s = this.location.start;
      var loc = this.location.source + ":" + s.line + ":" + s.column;
      if (src) {
        var e = this.location.end;
        var filler = peg$padEnd("", s.line.toString().length, ' ');
        var line = src[s.line - 1];
        var last = s.line === e.line ? e.column : line.length + 1;
        str += "\n --> " + loc + "\n"
            + filler + " |\n"
            + s.line + " | " + line + "\n"
            + filler + " | " + peg$padEnd("", s.column - 1, ' ')
            + peg$padEnd("", last - s.column, "^");
      } else {
        str += "\n at " + loc;
      }
    }
    return str;
  };

  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function(expectation) {
        return "\"" + literalEscape(expectation.text) + "\"";
      },

      class: function(expectation) {
        var escapedParts = expectation.parts.map(function(part) {
          return Array.isArray(part)
            ? classEscape(part[0]) + "-" + classEscape(part[1])
            : classEscape(part);
        });

        return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
      },

      any: function() {
        return "any character";
      },

      end: function() {
        return "end of input";
      },

      other: function(expectation) {
        return expectation.description;
      }
    };

    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/"/g,  "\\\"")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
    }

    function classEscape(s) {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/\]/g, "\\]")
        .replace(/\^/g, "\\^")
        .replace(/-/g,  "\\-")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
    }

    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected(expected) {
      var descriptions = expected.map(describeExpectation);
      var i, j;

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found) {
      return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  function peg$parse(input, options) {
    options = options !== undefined ? options : {};

    var peg$FAILED = {};
    var peg$source = options.grammarSource;

    var peg$startRuleFunctions = { Transforms: peg$parseTransforms };
    var peg$startRuleFunction = peg$parseTransforms;

    var peg$c0 = "(";
    var peg$c1 = ")";
    var peg$c2 = "zw";
    var peg$c3 = "yw";
    var peg$c4 = "yz";
    var peg$c5 = "xw";
    var peg$c6 = "xz";
    var peg$c7 = "xy";
    var peg$c8 = "+";
    var peg$c9 = "-";
    var peg$c10 = "*";
    var peg$c11 = "/";
    var peg$c12 = ".";

    var peg$r0 = /^[txy]/;
    var peg$r1 = /^[0-9]/;
    var peg$r2 = /^[ \t\n\r]/;

    var peg$e0 = peg$literalExpectation("(", false);
    var peg$e1 = peg$literalExpectation(")", false);
    var peg$e2 = peg$classExpectation(["t", "x", "y"], false, false);
    var peg$e3 = peg$literalExpectation("zw", false);
    var peg$e4 = peg$literalExpectation("yw", false);
    var peg$e5 = peg$literalExpectation("yz", false);
    var peg$e6 = peg$literalExpectation("xw", false);
    var peg$e7 = peg$literalExpectation("xz", false);
    var peg$e8 = peg$literalExpectation("xy", false);
    var peg$e9 = peg$literalExpectation("+", false);
    var peg$e10 = peg$literalExpectation("-", false);
    var peg$e11 = peg$literalExpectation("*", false);
    var peg$e12 = peg$literalExpectation("/", false);
    var peg$e13 = peg$otherExpectation("float");
    var peg$e14 = peg$classExpectation([["0", "9"]], false, false);
    var peg$e15 = peg$literalExpectation(".", false);
    var peg$e16 = peg$otherExpectation("whitespace");
    var peg$e17 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false);

    var peg$f0 = function(head, tail) {
    	return tail.concat(head)
    };
    var peg$f1 = function(a, e) {
    	return {rot:a, theta:e}
      };
    var peg$f2 = function(e, v) {
    	if(v) {
    		return { op: 'mul', lhs: e, rhs: v }
        } else {
    	    return e
        }
    };
    var peg$f3 = function(e) {
    		return { op: 'expr', expr: e }
    	};
    var peg$f4 = function(v) {
    	return { op: 'var', var: v }
    };
    var peg$f5 = function(head, tail) {
          return tail.reduce(function(result, element) {
            if (element[1] === "+") { return result + element[3]; }
            if (element[1] === "-") { return result - element[3]; }
          }, head);
        };
    var peg$f6 = function(head, tail) {
          return tail.reduce(function(result, element) {
            if (element[1] === "*") { return result * element[3]; }
            if (element[1] === "/") { return result / element[3]; }
          }, head);
        };
    var peg$f7 = function(expr) { return expr; };
    var peg$f8 = function() { return parseFloat(text(), 10); };

    var peg$currPos = 0;
    var peg$savedPos = 0;
    var peg$posDetailsCache = [{ line: 1, column: 1 }];
    var peg$maxFailPos = 0;
    var peg$maxFailExpected = [];
    var peg$silentFails = 0;

    var peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function offset() {
      return peg$savedPos;
    }

    function range() {
      return {
        source: peg$source,
        start: peg$savedPos,
        end: peg$currPos
      };
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description, location) {
      location = location !== undefined
        ? location
        : peg$computeLocation(peg$savedPos, peg$currPos);

      throw peg$buildStructuredError(
        [peg$otherExpectation(description)],
        input.substring(peg$savedPos, peg$currPos),
        location
      );
    }

    function error(message, location) {
      location = location !== undefined
        ? location
        : peg$computeLocation(peg$savedPos, peg$currPos);

      throw peg$buildSimpleError(message, location);
    }

    function peg$literalExpectation(text, ignoreCase) {
      return { type: "literal", text: text, ignoreCase: ignoreCase };
    }

    function peg$classExpectation(parts, inverted, ignoreCase) {
      return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }

    function peg$anyExpectation() {
      return { type: "any" };
    }

    function peg$endExpectation() {
      return { type: "end" };
    }

    function peg$otherExpectation(description) {
      return { type: "other", description: description };
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos];
      var p;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;

        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos);
      var endPosDetails = peg$computePosDetails(endPos);

      return {
        source: peg$source,
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildSimpleError(message, location) {
      return new peg$SyntaxError(message, null, null, location);
    }

    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(
        peg$SyntaxError.buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parseTransforms() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseTransform();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse_();
        s5 = peg$parseTransform();
        if (s5 !== peg$FAILED) {
          s3 = s5;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse_();
          s5 = peg$parseTransform();
          if (s5 !== peg$FAILED) {
            s3 = s5;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        peg$savedPos = s0;
        s0 = peg$f0(s1, s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseTransform() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseaxis();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c0;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e0); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          s5 = peg$parseSymbol();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (input.charCodeAt(peg$currPos) === 41) {
              s7 = peg$c1;
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e1); }
            }
            if (s7 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f1(s1, s5);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSymbol() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseExpression();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parse_();
        s4 = peg$parseVar();
        if (s4 !== peg$FAILED) {
          s2 = s4;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        peg$savedPos = s0;
        s0 = peg$f2(s1, s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseExpr() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseExpression();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$f3(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseVar() {
      var s0, s1;

      s0 = peg$currPos;
      if (peg$r0.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e2); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$f4(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseaxis() {
      var s0;

      if (input.substr(peg$currPos, 2) === peg$c2) {
        s0 = peg$c2;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e3); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c3) {
          s0 = peg$c3;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e4); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c4) {
            s0 = peg$c4;
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e5); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c5) {
              s0 = peg$c5;
              peg$currPos += 2;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e6); }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c6) {
                s0 = peg$c6;
                peg$currPos += 2;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$e7); }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c7) {
                  s0 = peg$c7;
                  peg$currPos += 2;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$e8); }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseTerm();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (input.charCodeAt(peg$currPos) === 43) {
          s5 = peg$c8;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e9); }
        }
        if (s5 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 45) {
            s5 = peg$c9;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e10); }
          }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          s7 = peg$parseTerm();
          if (s7 !== peg$FAILED) {
            s4 = [s4, s5, s6, s7];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (input.charCodeAt(peg$currPos) === 43) {
            s5 = peg$c8;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e9); }
          }
          if (s5 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s5 = peg$c9;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e10); }
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            s7 = peg$parseTerm();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        peg$savedPos = s0;
        s0 = peg$f5(s1, s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseTerm() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseFactor();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (input.charCodeAt(peg$currPos) === 42) {
          s5 = peg$c10;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e11); }
        }
        if (s5 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 47) {
            s5 = peg$c11;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e12); }
          }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          s7 = peg$parseFactor();
          if (s7 !== peg$FAILED) {
            s4 = [s4, s5, s6, s7];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (input.charCodeAt(peg$currPos) === 42) {
            s5 = peg$c10;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e11); }
          }
          if (s5 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
              s5 = peg$c11;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e12); }
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            s7 = peg$parseFactor();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        peg$savedPos = s0;
        s0 = peg$f6(s1, s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseFactor() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c0;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e0); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        s3 = peg$parseExpression();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (input.charCodeAt(peg$currPos) === 41) {
            s5 = peg$c1;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e1); }
          }
          if (s5 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f7(s3);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseInteger();
      }

      return s0;
    }

    function peg$parseInteger() {
      var s0, s1, s2, s3, s4, s5, s6;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse_();
      s2 = [];
      if (peg$r1.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e14); }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$r1.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e14); }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
          s4 = peg$c12;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e15); }
        }
        if (s4 !== peg$FAILED) {
          s5 = [];
          if (peg$r1.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e14); }
          }
          if (s6 !== peg$FAILED) {
            while (s6 !== peg$FAILED) {
              s5.push(s6);
              if (peg$r1.test(input.charAt(peg$currPos))) {
                s6 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$e14); }
              }
            }
          } else {
            s5 = peg$FAILED;
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        peg$savedPos = s0;
        s0 = peg$f8();
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e13); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$r2.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e17); }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$r2.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e17); }
        }
      }
      peg$silentFails--;
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e16); }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
})();