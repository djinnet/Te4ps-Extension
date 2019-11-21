(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _twitchChatClient = _interopRequireDefault(require("twitch-chat-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"twitch-chat-client":137}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel_1 = require("./LogLevel");
var BaseLogger = /** @class */ (function () {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected NO IT CAN'T
    function BaseLogger(_a) {
        var name = _a.name, _b = _a.minLevel, minLevel = _b === void 0 ? LogLevel_1.default.WARNING : _b, _c = _a.emoji, emoji = _c === void 0 ? false : _c, _d = _a.colors, colors = _d === void 0 ? true : _d;
        this._name = name;
        this._minLevel = minLevel;
        this._emoji = emoji;
        this._colors = colors;
    }
    // region convenience methods
    BaseLogger.prototype.crit = function (message) {
        this.log(LogLevel_1.default.CRITICAL, message);
    };
    BaseLogger.prototype.critical = function (message) {
        this.log(LogLevel_1.default.CRITICAL, message);
    };
    BaseLogger.prototype.err = function (message) {
        this.log(LogLevel_1.default.ERROR, message);
    };
    BaseLogger.prototype.error = function (message) {
        this.log(LogLevel_1.default.ERROR, message);
    };
    BaseLogger.prototype.warn = function (message) {
        this.log(LogLevel_1.default.WARNING, message);
    };
    BaseLogger.prototype.warning = function (message) {
        this.log(LogLevel_1.default.WARNING, message);
    };
    BaseLogger.prototype.info = function (message) {
        this.log(LogLevel_1.default.INFO, message);
    };
    BaseLogger.prototype.debug = function (message) {
        this.log(LogLevel_1.default.DEBUG1, message);
    };
    BaseLogger.prototype.debug1 = function (message) {
        this.log(LogLevel_1.default.DEBUG1, message);
    };
    BaseLogger.prototype.debug2 = function (message) {
        this.log(LogLevel_1.default.DEBUG2, message);
    };
    BaseLogger.prototype.debug3 = function (message) {
        this.log(LogLevel_1.default.DEBUG3, message);
    };
    BaseLogger.prototype.trace = function (message) {
        this.log(LogLevel_1.default.TRACE, message);
    };
    return BaseLogger;
}());
exports.default = BaseLogger;

},{"./LogLevel":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var LogLevel_1 = require("./LogLevel");
var BaseLogger_1 = require("./BaseLogger");
var BrowserLogger = /** @class */ (function (_super) {
    tslib_1.__extends(BrowserLogger, _super);
    function BrowserLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserLogger.prototype.log = function (level, message) {
        if (level > this._minLevel) {
            return;
        }
        var logFn = LogLevel_1.LogLevelToConsoleFunction[level];
        logFn("[" + this._name + "] " + message);
    };
    return BrowserLogger;
}(BaseLogger_1.default));
exports.default = BrowserLogger;

},{"./BaseLogger":2,"./LogLevel":4,"tslib":117}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var isNode = require("detect-node");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["CRITICAL"] = 0] = "CRITICAL";
    LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
    LogLevel[LogLevel["WARNING"] = 2] = "WARNING";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["DEBUG1"] = 4] = "DEBUG1";
    LogLevel[LogLevel["DEBUG2"] = 5] = "DEBUG2";
    LogLevel[LogLevel["DEBUG3"] = 6] = "DEBUG3";
    LogLevel[LogLevel["TRACE"] = 7] = "TRACE";
})(LogLevel || (LogLevel = {}));
exports.default = LogLevel;
// Node 8+ defines console.debug as noop, and earlier versions don't define it at all
var debugFunction = isNode ? console.log.bind(console) : console.debug.bind(console);
// tslint:disable-next-line:no-any
exports.LogLevelToConsoleFunction = (_a = {},
    _a[LogLevel.CRITICAL] = console.error.bind(console),
    _a[LogLevel.ERROR] = console.error.bind(console),
    _a[LogLevel.WARNING] = console.warn.bind(console),
    _a[LogLevel.INFO] = console.info.bind(console),
    _a[LogLevel.DEBUG1] = debugFunction.bind(console),
    _a[LogLevel.DEBUG2] = debugFunction.bind(console),
    _a[LogLevel.DEBUG3] = debugFunction.bind(console),
    _a[LogLevel.TRACE] = console.trace.bind(console),
    _a);

},{"detect-node":19}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _a, _b, _c;
var LogLevel_1 = require("./LogLevel");
var chalk_1 = require("chalk");
var BaseLogger_1 = require("./BaseLogger");
exports.LogLevelToEmoji = (_a = {},
    _a[LogLevel_1.default.CRITICAL] = "\uD83D\uDED1",
    _a[LogLevel_1.default.ERROR] = "\u274C",
    // these following two need extra spaces at the end because somehow they consume less space in a terminal than they should...
    _a[LogLevel_1.default.WARNING] = "\u26A0\uFE0F ",
    _a[LogLevel_1.default.INFO] = "\u2139\uFE0F ",
    _a[LogLevel_1.default.DEBUG1] = "\uD83D\uDC1E",
    _a[LogLevel_1.default.DEBUG2] = "\uD83D\uDC1C",
    _a[LogLevel_1.default.DEBUG3] = "\uD83D\uDC1B",
    _a[LogLevel_1.default.TRACE] = "\uD83D\uDC3E",
    _a);
exports.LogLevelToColor = (_b = {},
    _b[LogLevel_1.default.CRITICAL] = chalk_1.default.red,
    _b[LogLevel_1.default.ERROR] = chalk_1.default.redBright,
    _b[LogLevel_1.default.WARNING] = chalk_1.default.yellow,
    _b[LogLevel_1.default.INFO] = chalk_1.default.blue,
    _b[LogLevel_1.default.DEBUG1] = chalk_1.default.magenta,
    _b[LogLevel_1.default.DEBUG2] = chalk_1.default.magenta,
    _b[LogLevel_1.default.DEBUG3] = chalk_1.default.magenta,
    _b[LogLevel_1.default.TRACE] = chalk_1.default.reset,
    _b);
exports.LogLevelToBackgroundColor = (_c = {},
    _c[LogLevel_1.default.CRITICAL] = chalk_1.default.bgRed.white,
    _c[LogLevel_1.default.ERROR] = chalk_1.default.bgRedBright.white,
    _c[LogLevel_1.default.WARNING] = chalk_1.default.bgYellow.black,
    _c[LogLevel_1.default.INFO] = chalk_1.default.bgBlue.white,
    _c[LogLevel_1.default.DEBUG1] = chalk_1.default.bgMagenta.black,
    _c[LogLevel_1.default.DEBUG2] = chalk_1.default.bgMagenta.black,
    _c[LogLevel_1.default.DEBUG3] = chalk_1.default.bgMagenta.black,
    _c[LogLevel_1.default.TRACE] = chalk_1.default.inverse,
    _c);
var NodeLogger = /** @class */ (function (_super) {
    tslib_1.__extends(NodeLogger, _super);
    function NodeLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeLogger.prototype.log = function (level, message) {
        if (level > this._minLevel) {
            return;
        }
        var logFn = LogLevel_1.LogLevelToConsoleFunction[level];
        var builtMessage = '';
        if (this._emoji) {
            var emoji = exports.LogLevelToEmoji[level];
            builtMessage += emoji + " ";
        }
        if (this._colors) {
            builtMessage += exports.LogLevelToBackgroundColor[level](this._name) + " " + exports.LogLevelToBackgroundColor[level](LogLevel_1.default[level]) + " " + exports.LogLevelToColor[level](message);
        }
        else {
            builtMessage += "[" + this._name + ":" + LogLevel_1.default[level].toLowerCase() + "] " + message;
        }
        logFn(builtMessage);
    };
    return NodeLogger;
}(BaseLogger_1.default));
exports.default = NodeLogger;

},{"./BaseLogger":2,"./LogLevel":4,"chalk":12,"tslib":117}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isNode = require("detect-node");
var Logger = isNode ? require('./NodeLogger').default : require('./BrowserLogger').default;
exports.default = Logger;
var LogLevel_1 = require("./LogLevel");
exports.LogLevel = LogLevel_1.default;

},{"./BrowserLogger":3,"./LogLevel":4,"./NodeLogger":5,"detect-node":19}],7:[function(require,module,exports){
"use strict";
/******************************************************************************
 * The MIT License (MIT)                                                      *
 *                                                                            *
 * Copyright (c) 2016 Simon "Tenry" Burchert                                  *
 *                                                                            *
 * Permission is hereby granted, free of charge, to any person obtaining a    *
 * copy of this software and associated documentation files (the "Software"), *
 * to deal in the Software without restriction, including without limitation  *
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,   *
 * and/or sell copies of the Software, and to permit persons to whom the      *
 * Software is furnished to do so, subject to the following conditions:       *
 *                                                                            *
 * The above copyright notice and this permission notice shall be included in *
 * all copies or substantial portions of the Software.                        *
 *                                                                            *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR *
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,   *
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL    *
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER *
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING    *
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER        *
 * EALINGS IN THE SOFTWARE.                                                   *
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.eventListeners = new Map();
    }
    EventEmitter.prototype.on = function (event, listener) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, [listener]);
        }
        else {
            this.eventListeners.get(event).push(listener);
        }
        return new Listener(this, event, listener);
    };
    EventEmitter.prototype.addListener = function (event, listener) {
        return this.on(event, listener);
    };
    EventEmitter.prototype.removeListener = function () {
        if (arguments.length == 0) {
            this.eventListeners.clear();
        }
        else if (arguments.length == 1 && typeof arguments[0] == 'object') {
            var id = arguments[0];
            this.removeListener(id.event, id.listener);
        }
        else if (arguments.length >= 1) {
            var event = arguments[0];
            var listener = arguments[1];
            if (this.eventListeners.has(event)) {
                var listeners = this.eventListeners.get(event);
                var idx;
                while (!listener || (idx = listeners.indexOf(listener)) != -1) {
                    listeners.splice(idx, 1);
                }
            }
        }
    };
    /**
     * Emit event. Calls all bound listeners with args.
     */
    EventEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.eventListeners.has(event)) {
            for (var _a = 0, _b = this.eventListeners.get(event); _a < _b.length; _a++) {
                var listener = _b[_a];
                listener.apply(void 0, args);
            }
        }
    };
    /**
     * @typeparam T The event handler signature.
     */
    EventEmitter.prototype.registerEvent = function () {
        var _this = this;
        var eventBinder = function (handler) {
            return _this.addListener(eventBinder, handler);
        };
        return eventBinder;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
var Listener = /** @class */ (function () {
    function Listener(owner, event, listener) {
        this.owner = owner;
        this.event = event;
        this.listener = listener;
    }
    Listener.prototype.unbind = function () {
        this.owner.removeListener(this);
    };
    return Listener;
}());
exports.Listener = Listener;

},{}],8:[function(require,module,exports){
'use strict';
const colorConvert = require('color-convert');

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	for (const groupName of Object.keys(styles)) {
		const group = styles[groupName];

		for (const styleName of Object.keys(group)) {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});

		Object.defineProperty(styles, 'codes', {
			value: codes,
			enumerable: false
		});
	}

	const ansi2ansi = n => n;
	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 0)
	};
	styles.color.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 0)
	};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 10)
	};
	styles.bgColor.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 10)
	};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (let key of Object.keys(colorConvert)) {
		if (typeof colorConvert[key] !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if (key === 'ansi16') {
			key = 'ansi';
		}

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});

},{"color-convert":16}],9:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],10:[function(require,module,exports){

},{}],11:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? Symbol.for('nodejs.util.inspect.custom')
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

}).call(this,require("buffer").Buffer)
},{"base64-js":9,"buffer":11,"ieee754":22}],12:[function(require,module,exports){
(function (process){
'use strict';
const escapeStringRegexp = require('escape-string-regexp');
const ansiStyles = require('ansi-styles');
const stdoutColor = require('supports-color').stdout;

const template = require('./templates.js');

const isSimpleWindowsTerm = process.platform === 'win32' && !(process.env.TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	const scLevel = stdoutColor ? stdoutColor.level : 0;
	obj.level = options.level === undefined ? scLevel : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling `chalk.constructor()`
	// by itself will have a `this` of a previously constructed chalk object
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
		}
	};
}

styles.visible = {
	get() {
		return build.call(this, this._styles || [], true, 'visible');
	}
};

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, _empty, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder._empty = _empty;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = String(arguments[0]);

	if (argsLen === 0) {
		return '';
	}

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return this._empty ? '' : str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	if (!Array.isArray(strings)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return [].slice.call(arguments, 1).join(' ');
	}

	const args = [].slice.call(arguments, 2);
	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
		parts.push(String(strings.raw[i]));
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = stdoutColor;
module.exports.default = module.exports; // For TypeScript

}).call(this,require('_process'))
},{"./templates.js":13,"_process":115,"ansi-styles":8,"escape-string-regexp":20,"supports-color":116}],13:[function(require,module,exports){
'use strict';
const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	if ((c[0] === 'u' && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, args) {
	const results = [];
	const chunks = args.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		if (!isNaN(chunk)) {
			results.push(Number(chunk));
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const styleName of Object.keys(enabled)) {
		if (Array.isArray(enabled[styleName])) {
			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			if (enabled[styleName].length > 0) {
				current = current[styleName].apply(current, enabled[styleName]);
			} else {
				current = current[styleName];
			}
		}
	}

	return current;
}

module.exports = (chalk, tmp) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
		if (escapeChar) {
			chunk.push(unescape(escapeChar));
		} else if (style) {
			const str = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(chr);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMsg);
	}

	return chunks.join('');
};

},{}],14:[function(require,module,exports){
(function (Buffer){
var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      if (Buffer.allocUnsafe) {
        // Node.js >= 4.5.0
        child = Buffer.allocUnsafe(parent.length);
      } else {
        // Older Node.js versions
        child = new Buffer(parent.length);
      }
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}

}).call(this,require("buffer").Buffer)
},{"buffer":11}],15:[function(require,module,exports){
/* MIT license */
var cssKeywords = require('color-name');

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};

},{"color-name":18}],16:[function(require,module,exports){
var conversions = require('./conversions');
var route = require('./route');

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;

},{"./conversions":15,"./route":17}],17:[function(require,module,exports){
var conversions = require('./conversions');

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};


},{"./conversions":15}],18:[function(require,module,exports){
'use strict'

module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

},{}],19:[function(require,module,exports){
module.exports = false;


},{}],20:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

},{}],21:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],22:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// dummy capability, this capability reuses the same AWAY sytax from rfc1459 for broadcasts
var AwayNotifyCapability = {
    name: 'away-notify'
};
exports.default = AwayNotifyCapability;

},{}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../../../../Message/Message");
var MessageDefinition_1 = require("../../../../../Message/MessageDefinition");
var ChgHost = /** @class */ (function (_super) {
    __extends(ChgHost, _super);
    function ChgHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition()
    ], ChgHost.prototype, "newUser", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition()
    ], ChgHost.prototype, "newHost", void 0);
    ChgHost = __decorate([
        MessageDefinition_1.MessageType('CHGHOST')
    ], ChgHost);
    return ChgHost;
}(Message_1.default));
exports.default = ChgHost;

},{"../../../../../Message/Message":37,"../../../../../Message/MessageDefinition":39}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChgHost_1 = require("./MessageTypes/Commands/ChgHost");
var ChgHostCapability = {
    name: 'chghost',
    messageTypes: [ChgHost_1.default]
};
exports.default = ChgHostCapability;

},{"./MessageTypes/Commands/ChgHost":24}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// dummy capability, this capability reuses the same INVITE sytax from rfc1459 for broadcasts
var InviteNotifyCapability = {
    name: 'invite-notify'
};
exports.default = InviteNotifyCapability;

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// dummy capability, the code handles both single and multiple prefixes just fine
var MultiPrefixCapability = {
    name: 'multi-prefix'
};
exports.default = MultiPrefixCapability;

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AwayNotifyCapability_1 = require("./AwayNotifyCapability");
exports.AwayNotify = AwayNotifyCapability_1.default;
var ChgHostCapability_1 = require("./ChgHostCapability");
exports.ChgHost = ChgHostCapability_1.default;
var InviteNotifyCapability_1 = require("./InviteNotifyCapability");
exports.InviteNotify = InviteNotifyCapability_1.default;
var MultiPrefixCapability_1 = require("./MultiPrefixCapability");
exports.MultiPrefix = MultiPrefixCapability_1.default;

},{"./AwayNotifyCapability":23,"./ChgHostCapability":25,"./InviteNotifyCapability":26,"./MultiPrefixCapability":27}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Connection = /** @class */ (function (_super) {
    __extends(Connection, _super);
    function Connection(_a) {
        var hostName = _a.hostName, port = _a.port, secure = _a.secure;
        var _this = _super.call(this) || this;
        _this._connecting = false;
        _this._connected = false;
        _this._manualDisconnect = false;
        _this._currentLine = '';
        _this._secure = Boolean(secure);
        if (port) {
            _this._host = hostName;
            _this._port = port;
        }
        else {
            var splitHost = hostName.split(':');
            if (splitHost.length > 2) {
                throw new Error('malformed hostName');
            }
            var _b = __read(splitHost, 2), host = _b[0], splitPort = _b[1];
            _this._host = host;
            if (splitPort) {
                _this._port = Number(splitPort);
            }
        }
        return _this;
    }
    Connection.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doConnect()];
            });
        });
    };
    Connection.prototype.disconnect = function () {
        if (this.hasSocket) {
            this._manualDisconnect = true;
        }
    };
    Connection.prototype.destroy = function () {
        this.removeAllListeners();
    };
    Connection.prototype.sendLine = function (line) {
        if (this._connected) {
            line = line.replace(/[\0\r\n]/g, '');
            this.sendRaw(line + "\r\n");
        }
    };
    Connection.prototype.receiveRaw = function (data) {
        var e_1, _a;
        var receivedLines = data.split('\r\n');
        this._currentLine += receivedLines.shift() || '';
        if (receivedLines.length) {
            this.emit('lineReceived', this._currentLine);
            this._currentLine = receivedLines.pop() || '';
            try {
                for (var receivedLines_1 = __values(receivedLines), receivedLines_1_1 = receivedLines_1.next(); !receivedLines_1_1.done; receivedLines_1_1 = receivedLines_1.next()) {
                    var line = receivedLines_1_1.value;
                    this.emit('lineReceived', line);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (receivedLines_1_1 && !receivedLines_1_1.done && (_a = receivedLines_1.return)) _a.call(receivedLines_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    Object.defineProperty(Connection.prototype, "isConnecting", {
        get: function () {
            return this._connecting;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "isConnected", {
        get: function () {
            return this._connected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "host", {
        get: function () {
            return this._host;
        },
        enumerable: true,
        configurable: true
    });
    Connection.prototype._handleDisconnect = function (error) {
        this.emit('disconnect', this._manualDisconnect, error);
        if (this._manualDisconnect) {
            this._manualDisconnect = false;
        }
        this.destroy();
    };
    return Connection;
}(events_1.EventEmitter));
exports.default = Connection;

},{"events":21}],30:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = require("./Connection");
var net_1 = require("net");
var tls = require("tls");
var DirectConnection = /** @class */ (function (_super) {
    __extends(DirectConnection, _super);
    function DirectConnection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DirectConnection.prototype, "port", {
        get: function () {
            return this._port || (this._secure ? 6697 : 6667);
        },
        enumerable: true,
        configurable: true
    });
    DirectConnection.prototype.doConnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._connecting = true;
                        var connectionErrorListener = function (err) {
                            _this._connected = false;
                            _this._connecting = false;
                            _this._handleDisconnect(err);
                            reject(err);
                        };
                        var connectionListener = function () {
                            _this._connecting = false;
                            _this._connected = true;
                            _this.emit('connect');
                            resolve();
                        };
                        if (_this._secure) {
                            _this._socket = tls.connect(_this.port, _this._host, {}, connectionListener);
                        }
                        else {
                            _this._socket = new net_1.Socket();
                            _this._socket.connect(_this.port, _this._host, connectionListener);
                        }
                        _this._socket.on('error', connectionErrorListener);
                        _this._socket.on('data', function (data) {
                            _this.receiveRaw(data.toString());
                        });
                        _this._socket.on('close', function () {
                            _this._connected = false;
                            _this._connecting = false;
                            _this._handleDisconnect();
                        });
                    })];
            });
        });
    };
    Object.defineProperty(DirectConnection.prototype, "hasSocket", {
        get: function () {
            return !!this._socket;
        },
        enumerable: true,
        configurable: true
    });
    DirectConnection.prototype.destroy = function () {
        if (this._socket) {
            this._socket.destroy();
            this._socket = undefined;
        }
        _super.prototype.destroy.call(this);
    };
    DirectConnection.prototype.sendRaw = function (line) {
        if (this._socket) {
            this._socket.write(line);
        }
    };
    return DirectConnection;
}(Connection_1.default));
exports.default = DirectConnection;

},{"./Connection":29,"net":10,"tls":10}],31:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = require("./Connection");
var WebSocket = require("universal-websocket-client");
var WebSocketConnection = /** @class */ (function (_super) {
    __extends(WebSocketConnection, _super);
    function WebSocketConnection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WebSocketConnection.prototype, "port", {
        get: function () {
            return this._port || (this._secure ? 443 : 80);
        },
        enumerable: true,
        configurable: true
    });
    WebSocketConnection.prototype.doConnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._connecting = true;
                        var url = "ws" + (_this._secure ? 's' : '') + "://" + _this._host + ":" + _this.port;
                        _this._socket = new WebSocket(url);
                        _this._socket.onopen = function () {
                            _this._connected = true;
                            _this._connecting = false;
                            _this.emit('connect');
                            resolve();
                        };
                        _this._socket.onmessage = function (_a) {
                            var data = _a.data;
                            _this.receiveRaw(data.toString());
                        };
                        // The following empty error callback needs to exist so connection errors are passed down to `onclose` down below - otherwise the process just crashes instead
                        _this._socket.onerror = function () { };
                        _this._socket.onclose = function (_a) {
                            var wasClean = _a.wasClean, code = _a.code, reason = _a.reason;
                            _this._socket = undefined;
                            _this._connected = false;
                            _this._connecting = false;
                            if (wasClean) {
                                _this._handleDisconnect();
                            }
                            else {
                                var err = new Error("[" + code + "] " + reason);
                                _this._handleDisconnect(err);
                                reject(err);
                            }
                        };
                    })];
            });
        });
    };
    Object.defineProperty(WebSocketConnection.prototype, "hasSocket", {
        get: function () {
            return !!this._socket;
        },
        enumerable: true,
        configurable: true
    });
    WebSocketConnection.prototype.destroy = function () {
        if (this._socket) {
            this._socket.close();
            this._socket = undefined;
        }
        _super.prototype.destroy.call(this);
    };
    WebSocketConnection.prototype.sendRaw = function (line) {
        if (this._socket) {
            this._socket.send(line);
        }
    };
    return WebSocketConnection;
}(Connection_1.default));
exports.default = WebSocketConnection;

},{"./Connection":29,"universal-websocket-client":138}],32:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MessageError = /** @class */ (function (_super) {
    __extends(MessageError, _super);
    function MessageError(msg) {
        var _this = _super.call(this, "Received error from IRC server: " + msg.rawLine) || this;
        _this.ircMessage = msg;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, _this.constructor);
        }
        return _this;
    }
    Object.defineProperty(MessageError.prototype, "name", {
        get: function () {
            return this.constructor.name;
        },
        enumerable: true,
        configurable: true
    });
    return MessageError;
}(Error));
exports.default = MessageError;

},{}],33:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var NotEnoughParametersError = /** @class */ (function (_super) {
    __extends(NotEnoughParametersError, _super);
    function NotEnoughParametersError(_command, _expectedParams, _actualParams) {
        var _this = _super.call(this, "command \"" + _command + "\" expected " + _expectedParams + " or more parameters, got " + _actualParams) || this;
        _this._command = _command;
        _this._expectedParams = _expectedParams;
        _this._actualParams = _actualParams;
        Object.setPrototypeOf(_this, NotEnoughParametersError.prototype);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, NotEnoughParametersError);
        }
        return _this;
    }
    Object.defineProperty(NotEnoughParametersError.prototype, "command", {
        get: function () {
            return this._command;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotEnoughParametersError.prototype, "expectedParams", {
        get: function () {
            return this._expectedParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotEnoughParametersError.prototype, "actualParams", {
        get: function () {
            return this._actualParams;
        },
        enumerable: true,
        configurable: true
    });
    return NotEnoughParametersError;
}(Error));
exports.default = NotEnoughParametersError;

},{}],34:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ParameterRequirementMismatchError = /** @class */ (function (_super) {
    __extends(ParameterRequirementMismatchError, _super);
    function ParameterRequirementMismatchError(_command, _paramName, _paramSpec, _givenValue) {
        var _this = _super.call(this, "required parameter \"" + _paramName + "\" did not validate against " + (_paramSpec.type ||
            'regex') + " validation: \"" + _givenValue + "\"") || this;
        _this._command = _command;
        _this._paramName = _paramName;
        _this._paramSpec = _paramSpec;
        _this._givenValue = _givenValue;
        Object.setPrototypeOf(_this, ParameterRequirementMismatchError.prototype);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ParameterRequirementMismatchError);
        }
        return _this;
    }
    Object.defineProperty(ParameterRequirementMismatchError.prototype, "command", {
        get: function () {
            return this._command;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterRequirementMismatchError.prototype, "paramName", {
        get: function () {
            return this._paramName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterRequirementMismatchError.prototype, "paramSpec", {
        get: function () {
            return this._paramSpec;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterRequirementMismatchError.prototype, "givenValue", {
        get: function () {
            return this._givenValue;
        },
        enumerable: true,
        configurable: true
    });
    return ParameterRequirementMismatchError;
}(Error));
exports.default = ParameterRequirementMismatchError;

},{}],35:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UnknownChannelModeCharError = /** @class */ (function (_super) {
    __extends(UnknownChannelModeCharError, _super);
    function UnknownChannelModeCharError(_char) {
        var _this = _super.call(this, "Unknown channel mode character " + _char) || this;
        _this._char = _char;
        Object.setPrototypeOf(_this, UnknownChannelModeCharError.prototype);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, UnknownChannelModeCharError);
        }
        return _this;
    }
    Object.defineProperty(UnknownChannelModeCharError.prototype, "char", {
        get: function () {
            return this._char;
        },
        enumerable: true,
        configurable: true
    });
    return UnknownChannelModeCharError;
}(Error));
exports.default = UnknownChannelModeCharError;

},{}],36:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("@d-fischer/logger");
var typed_event_emitter_1 = require("@d-fischer/typed-event-emitter");
var clone = require("clone");
var CoreCapabilities = require("./Capability/CoreCapabilities");
var DirectConnection_1 = require("./Connection/DirectConnection");
var WebSocketConnection_1 = require("./Connection/WebSocketConnection");
var Message_1 = require("./Message/Message");
var MessageCollector_1 = require("./Message/MessageCollector");
var MessageParser_1 = require("./Message/MessageParser");
var MessageTypes = require("./Message/MessageTypes");
var Commands_1 = require("./Message/MessageTypes/Commands");
var ClientQuit_1 = require("./Message/MessageTypes/Commands/ClientQuit");
var Numerics_1 = require("./Message/MessageTypes/Numerics");
var ServerProperties_1 = require("./ServerProperties");
var MessageError_1 = require("./Errors/MessageError");
var NonEnumerable_1 = require("./Toolkit/NonEnumerable");
var ObjectTools_1 = require("./Toolkit/ObjectTools");
var StringTools_1 = require("./Toolkit/StringTools");
var IRCClient = /** @class */ (function (_super) {
    __extends(IRCClient, _super);
    function IRCClient(options) {
        var e_1, _a;
        var _this = _super.call(this) || this;
        _this._registered = false;
        _this._supportsCapabilities = true;
        _this._events = new Map();
        _this._registeredMessageTypes = new Map();
        // emitted events
        _this.onConnect = _this.registerEvent();
        _this.onRegister = _this.registerEvent();
        _this.onDisconnect = _this.registerEvent();
        _this.onPrivmsg = _this.registerEvent();
        _this.onAction = _this.registerEvent();
        _this.onNotice = _this.registerEvent();
        _this.onNickChange = _this.registerEvent();
        _this.onCtcp = _this.registerEvent();
        _this.onCtcpReply = _this.registerEvent();
        _this.onAnyMessage = _this.registerEvent();
        _this._serverProperties = clone(ServerProperties_1.defaultServerProperties, false);
        _this._supportedFeatures = {};
        _this._collectors = [];
        _this._clientCapabilities = new Map();
        _this._serverCapabilities = new Map();
        _this._negotiatedCapabilities = new Map();
        var connection = options.connection, credentials = options.credentials, channelTypes = options.channelTypes, _b = options.logLevel, logLevel = _b === void 0 ? logger_1.LogLevel.WARNING : _b;
        _this._options = options;
        var _c = connection.pingOnInactivity, pingOnInactivity = _c === void 0 ? 60 : _c, _d = connection.pingTimeout, pingTimeout = _d === void 0 ? 10 : _d;
        _this._pingOnInactivity = pingOnInactivity;
        _this._pingTimeout = pingTimeout;
        _this._currentNick = credentials.nick;
        _this._logger = new logger_1.default({ name: 'ircv3', emoji: true, minLevel: logLevel });
        _this.registerCoreMessageTypes();
        try {
            for (var _e = __values(Object.values(CoreCapabilities)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var cap = _f.value;
                _this.registerCapability(cap);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        _this.onMessage(Commands_1.CapabilityNegotiation, function (_a) {
            var _b = _a.params, subCommand = _b.subCommand, capabilities = _b.capabilities;
            var e_2, _c, e_3, _d;
            var caps = capabilities.split(' ');
            // eslint-disable-next-line default-case
            switch (subCommand.toUpperCase()) {
                case 'NEW': {
                    _this._logger.debug2("Server registered new capabilities: " + caps.join(', '));
                    var capList = ObjectTools_1.default.fromArray(caps, function (part) {
                        var _a;
                        if (!part) {
                            return {};
                        }
                        var _b = __read(StringTools_1.splitWithLimit(part, '=', 2), 2), cap = _b[0], param = _b[1];
                        return _a = {},
                            _a[cap] = {
                                name: cap,
                                param: param || true
                            },
                            _a;
                    });
                    try {
                        for (var _e = __values(Object.entries(capList)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var _g = __read(_f.value, 2), name_1 = _g[0], cap = _g[1];
                            _this._serverCapabilities.set(name_1, cap);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    var capNames_1 = Object.keys(capList);
                    _this._negotiateCapabilities(Array.from(_this._clientCapabilities.entries())
                        .filter(function (_a) {
                        var _b = __read(_a, 1), name = _b[0];
                        return capNames_1.includes(name);
                    })
                        .map(function (_a) {
                        var _b = __read(_a, 2), cap = _b[1];
                        return cap;
                    }));
                    break;
                }
                case 'DEL': {
                    _this._logger.debug2("Server removed capabilities: " + caps.join(', '));
                    try {
                        for (var caps_1 = __values(caps), caps_1_1 = caps_1.next(); !caps_1_1.done; caps_1_1 = caps_1.next()) {
                            var cap = caps_1_1.value;
                            _this._serverCapabilities.delete(cap);
                            _this._negotiatedCapabilities.delete(cap);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (caps_1_1 && !caps_1_1.done && (_d = caps_1.return)) _d.call(caps_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
        });
        _this.onMessage(Commands_1.Ping, function (_a) {
            var message = _a.params.message;
            _this.sendMessage(Commands_1.Pong, { message: message });
        });
        _this.onMessage(Numerics_1.Reply001Welcome, function () {
            if (!_this._supportsCapabilities) {
                _this._registered = true;
                _this.emit(_this.onRegister);
            }
        });
        _this.onMessage(Numerics_1.Reply004ServerInfo, function (_a) {
            var userModes = _a.params.userModes;
            if (userModes) {
                _this._serverProperties.supportedUserModes = userModes;
            }
        });
        _this.onMessage(Numerics_1.Reply005ISupport, function (_a) {
            var supports = _a.params.supports;
            var newFeatures = ObjectTools_1.default.fromArray(supports.split(' '), function (part) {
                var _a;
                var _b = __read(StringTools_1.splitWithLimit(part, '=', 2), 2), support = _b[0], param = _b[1];
                return _a = {}, _a[support] = param || true, _a;
            });
            _this._supportedFeatures = __assign({}, _this._supportedFeatures, newFeatures);
        });
        _this.onMessage(Numerics_1.Error462AlreadyRegistered, function () {
            // what, I thought we are not registered yet?
            if (!_this._registered) {
                // screw this, we are now.
                _this._logger.warn("We thought we're not registered yet, but we actually are");
                _this._registered = true;
                _this.emit(_this.onRegister);
            }
        });
        _this.onMessage(Commands_1.PrivateMessage, function (msg) {
            var _a = msg.params, target = _a.target, message = _a.message;
            var ctcpMessage = StringTools_1.decodeCtcp(message);
            var nick = msg.prefix && msg.prefix.nick;
            if (ctcpMessage) {
                if (ctcpMessage.command === 'ACTION') {
                    _this.emit(_this.onAction, target, nick, ctcpMessage.params, msg);
                }
                else {
                    _this.emit(_this.onCtcp, target, nick, ctcpMessage.command, ctcpMessage.params, msg);
                }
            }
            else {
                _this.emit(_this.onPrivmsg, target, nick, message, msg);
            }
        });
        _this.onMessage(Commands_1.NickChange, function (msg) {
            var newNick = msg.params.nick;
            var oldNick = msg.prefix && msg.prefix.nick;
            if (oldNick === _this._currentNick) {
                _this._currentNick = newNick;
            }
            _this.emit(_this.onNickChange, oldNick, newNick, msg);
        });
        _this.onMessage(Commands_1.Notice, function (msg) {
            var _a = msg.params, target = _a.target, message = _a.message;
            var ctcpMessage = StringTools_1.decodeCtcp(message);
            var nick = msg.prefix && msg.prefix.nick;
            if (ctcpMessage) {
                _this.emit(_this.onCtcpReply, target, nick, ctcpMessage.command, ctcpMessage.params, msg);
            }
            _this.emit(_this.onNotice, target, nick, message, msg);
        });
        _this.onRegister(function () { return _this._startPingCheckTimer(); });
        _this._credentials = __assign({}, credentials);
        if (channelTypes) {
            _this._serverProperties.channelTypes = channelTypes;
        }
        return _this;
    }
    IRCClient.prototype.setupConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, connection, webSocket, _b, nonConformingCommands, _c, reconnect, password;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this._options, connection = _a.connection, webSocket = _a.webSocket, _b = _a.nonConformingCommands, nonConformingCommands = _b === void 0 ? [] : _b;
                        _c = connection.reconnect, reconnect = _c === void 0 ? true : _c;
                        this._connection = webSocket ? new WebSocketConnection_1.default(connection) : new DirectConnection_1.default(connection);
                        this._logger.debug1('Determining connection password');
                        return [4 /*yield*/, this.getPassword(this._credentials.password)];
                    case 1:
                        password = _d.sent();
                        if (password) {
                            if (password !== this._credentials.password) {
                                this._updateCredentials({ password: password });
                            }
                        }
                        this._connection.on('connect', function () { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                this._retryDelayGenerator = undefined;
                                this._logger.info("Connection to server " + this._connection.host + ":" + this._connection.port + " established");
                                this.sendMessageAndCaptureReply(Commands_1.CapabilityNegotiation, {
                                    subCommand: 'LS',
                                    version: '302'
                                }).then(function (capReply) {
                                    if (!capReply.length || !(capReply[0] instanceof Commands_1.CapabilityNegotiation)) {
                                        _this._logger.debug2('Server does not support capabilities');
                                        return;
                                    }
                                    _this._supportsCapabilities = true;
                                    var capLists = capReply.map(function (line) {
                                        return ObjectTools_1.default.fromArray(line.params.capabilities.split(' '), function (part) {
                                            var _a;
                                            if (!part) {
                                                return {};
                                            }
                                            var _b = __read(StringTools_1.splitWithLimit(part, '=', 2), 2), cap = _b[0], param = _b[1];
                                            return _a = {},
                                                _a[cap] = {
                                                    name: cap,
                                                    param: param || true
                                                },
                                                _a;
                                        });
                                    });
                                    _this._serverCapabilities = new Map(Object.entries(Object.assign.apply(Object, __spread([{}], capLists))));
                                    _this._logger.debug2("Capabilities supported by server: " + Array.from(_this._serverCapabilities.keys()).join(', '));
                                    var capabilitiesToNegotiate = capLists.map(function (list) {
                                        var capNames = Object.keys(list);
                                        return Array.from(_this._clientCapabilities.entries())
                                            .filter(function (_a) {
                                            var _b = __read(_a, 1), name = _b[0];
                                            return capNames.includes(name);
                                        })
                                            .map(function (_a) {
                                            var _b = __read(_a, 2), cap = _b[1];
                                            return cap;
                                        });
                                    });
                                    _this._negotiateCapabilityBatch(capabilitiesToNegotiate).then(function () {
                                        _this.sendMessage(Commands_1.CapabilityNegotiation, { subCommand: 'END' });
                                        _this._registered = true;
                                        _this.emit(_this.onRegister);
                                    });
                                });
                                if (password) {
                                    this.sendMessage(Commands_1.Password, { password: password });
                                }
                                this.sendMessage(Commands_1.NickChange, { nick: this._credentials.nick });
                                this.sendMessage(Commands_1.UserRegistration, {
                                    user: this._credentials.userName || this._credentials.nick,
                                    mode: '8',
                                    unused: '*',
                                    realName: this._credentials.realName || this._credentials.nick
                                });
                                return [2 /*return*/];
                            });
                        }); });
                        this._connection.on('lineReceived', function (line) {
                            _this._logger.debug1("Received message: " + line);
                            var parsedMessage;
                            try {
                                parsedMessage = MessageParser_1.parseMessage(line, _this._serverProperties, _this._registeredMessageTypes, true, nonConformingCommands);
                            }
                            catch (e) {
                                _this._logger.err("Error parsing message: " + e.message);
                                _this._logger.trace(e.stack);
                                return;
                            }
                            _this._logger.debug3("Parsed message: " + JSON.stringify(parsedMessage));
                            _this._startPingCheckTimer();
                            _this.emit(_this.onAnyMessage, parsedMessage);
                            _this.handleEvents(parsedMessage);
                        });
                        this._connection.on('disconnect', function (manually, reason) {
                            _this._registered = false;
                            if (_this._pingCheckTimer) {
                                clearTimeout(_this._pingCheckTimer);
                            }
                            if (_this._pingTimeoutTimer) {
                                clearTimeout(_this._pingTimeoutTimer);
                            }
                            if (manually) {
                                _this._logger.info('Disconnected manually');
                            }
                            else {
                                if (reason) {
                                    _this._logger.err("Disconnected unexpectedly: " + reason.message);
                                }
                                else {
                                    _this._logger.err('Disconnected unexpectedly');
                                }
                            }
                            _this.emit(_this.onDisconnect, manually, reason);
                            _this._connection = undefined;
                            if (!manually && reconnect) {
                                if (!_this._retryDelayGenerator) {
                                    _this._retryDelayGenerator = IRCClient._getReconnectWaitTime();
                                }
                                var delay = _this._retryDelayGenerator.next().value;
                                _this._logger.info("Reconnecting in " + delay + " seconds");
                                _this._retryTimer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/, this.connect()];
                                }); }); }, delay * 1000);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(IRCClient.prototype, "serverProperties", {
        get: function () {
            return clone(this._serverProperties, false);
        },
        enumerable: true,
        configurable: true
    });
    IRCClient.prototype.pingCheck = function () {
        var _this = this;
        var now = Date.now();
        var nowStr = now.toString();
        var handler = this.onMessage(Commands_1.Pong, function (msg) {
            var message = msg.params.message;
            if (message === nowStr) {
                _this._logger.debug2("Current ping: " + (Date.now() - now) + "ms");
                if (_this._pingTimeoutTimer) {
                    clearTimeout(_this._pingTimeoutTimer);
                }
                _this.removeMessageListener(handler);
            }
        });
        this._pingTimeoutTimer = setTimeout(function () {
            _this._logger.warn("Reconnecting because the last ping took over " + _this._pingTimeout + " seconds");
            _this.removeMessageListener(handler);
            _this.reconnect('Ping timeout');
        }, this._pingTimeout * 1000);
        this.sendMessage(Commands_1.Ping, { message: nowStr });
    };
    IRCClient.prototype.reconnect = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.quit(message);
                return [2 /*return*/, this.connect()];
            });
        });
    };
    IRCClient.prototype.registerMessageType = function (cls) {
        if (cls.COMMAND !== '') {
            this._logger.debug3("Registering message type " + cls.COMMAND);
            this._registeredMessageTypes.set(cls.COMMAND.toUpperCase(), cls);
        }
    };
    IRCClient.prototype.knowsCommand = function (command) {
        return this._registeredMessageTypes.has(command.toUpperCase());
    };
    IRCClient.prototype.getCommandClass = function (command) {
        return this._registeredMessageTypes.get(command.toUpperCase());
    };
    IRCClient.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._supportsCapabilities = false;
                        this._negotiatedCapabilities = new Map();
                        this._currentNick = this._credentials.nick;
                        return [4 /*yield*/, this.setupConnection()];
                    case 1:
                        _a.sent();
                        this._logger.info("Connecting to " + this._connection.host + ":" + this._connection.port);
                        return [4 /*yield*/, this._connection.connect()];
                    case 2:
                        _a.sent();
                        this.emit(this.onConnect);
                        return [2 /*return*/];
                }
            });
        });
    };
    IRCClient.prototype.waitForRegistration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this._registered) {
                    return [2 /*return*/, undefined];
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var errorListener;
                        var disconnectListener;
                        var registerListener = _this.onRegister(function () {
                            registerListener.unbind();
                            _this.removeMessageListener(errorListener);
                            disconnectListener.unbind();
                            resolve();
                        });
                        errorListener = _this.onMessage(MessageTypes.Commands.ErrorMessage, function (msg) {
                            registerListener.unbind();
                            _this.removeMessageListener(errorListener);
                            disconnectListener.unbind();
                            reject(new MessageError_1.default(msg));
                        });
                        disconnectListener = _this.onDisconnect(function (reason) {
                            registerListener.unbind();
                            _this.removeMessageListener(errorListener);
                            disconnectListener.unbind();
                            reject(reason);
                        });
                    })];
            });
        });
    };
    IRCClient.prototype.registerCapability = function (cap) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4, _a, _b, _c, messageType;
            return __generator(this, function (_d) {
                this._clientCapabilities.set(cap.name, cap);
                if (cap.messageTypes) {
                    try {
                        for (_b = __values(cap.messageTypes), _c = _b.next(); !_c.done; _c = _b.next()) {
                            messageType = _c.value;
                            this.registerMessageType(messageType);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                if (this._serverCapabilities.has(cap.name)) {
                    return [2 /*return*/, this._negotiateCapabilities([cap])];
                }
                return [2 /*return*/, []];
            });
        });
    };
    IRCClient.prototype.send = function (message) {
        this.sendRaw(message.toString());
    };
    IRCClient.prototype.sendRaw = function (line) {
        if (this._connection) {
            this._logger.debug1("Sending message: " + line);
            this._connection.sendLine(line);
        }
    };
    IRCClient.prototype.onMessage = function (type, handler, handlerName) {
        var commandName = typeof type === 'string' ? type : type.COMMAND;
        if (!this._events.has(commandName)) {
            this._events.set(commandName, new Map());
        }
        var handlerList = this._events.get(commandName);
        if (!handlerName) {
            do {
                handlerName = commandName + ":" + StringTools_1.padLeft(Math.random() * 10000, 4, '0');
            } while (handlerList.has(handlerName));
        }
        handlerList.set(handlerName, handler);
        return handlerName;
    };
    IRCClient.prototype.removeMessageListener = function (handlerName) {
        var _a = __read(handlerName.split(':'), 1), commandName = _a[0];
        if (!this._events.has(commandName)) {
            return;
        }
        this._events.get(commandName).delete(handlerName);
    };
    IRCClient.prototype.createMessage = function (type, params, tags) {
        return Message_1.createMessage(type, params, undefined, tags, this.serverProperties);
    };
    IRCClient.prototype.sendMessage = function (type, params) {
        this.send(this.createMessage(type, params));
    };
    IRCClient.prototype.sendMessageAndCaptureReply = function (type, params) {
        return __awaiter(this, void 0, void 0, function () {
            var message, promise;
            return __generator(this, function (_a) {
                if (!type.SUPPORTS_CAPTURE) {
                    throw new Error("The command \"" + type.COMMAND + "\" does not support reply capture");
                }
                message = this.createMessage(type, params);
                promise = this.collect(message).promise();
                this.send(message);
                return [2 /*return*/, promise];
            });
        });
    };
    Object.defineProperty(IRCClient.prototype, "isConnected", {
        get: function () {
            return this._connection ? this._connection.isConnected : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IRCClient.prototype, "isConnecting", {
        get: function () {
            return this._connection ? this._connection.isConnecting : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IRCClient.prototype, "isRegistered", {
        get: function () {
            return this._registered;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IRCClient.prototype, "currentNick", {
        get: function () {
            return this._currentNick;
        },
        enumerable: true,
        configurable: true
    });
    /** @private */
    IRCClient.prototype.collect = function (originalMessage) {
        var types = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
        }
        var collector = new (MessageCollector_1.default.bind.apply(MessageCollector_1.default, __spread([void 0, this, originalMessage], types)))();
        this._collectors.push(collector);
        return collector;
    };
    /** @private */
    IRCClient.prototype.stopCollect = function (collector) {
        this._collectors.splice(this._collectors.findIndex(function (value) { return value === collector; }), 1);
    };
    // convenience methods
    IRCClient.prototype.join = function (channel, key) {
        this.sendMessage(Commands_1.ChannelJoin, { channel: channel, key: key });
    };
    IRCClient.prototype.part = function (channel) {
        this.sendMessage(Commands_1.ChannelPart, { channel: channel });
    };
    IRCClient.prototype.quit = function (message) {
        if (this._retryTimer) {
            clearInterval(this._retryTimer);
        }
        this._retryDelayGenerator = undefined;
        this.sendMessage(ClientQuit_1.default, { message: message });
        if (this._connection) {
            this._connection.disconnect();
        }
    };
    IRCClient.prototype.say = function (target, message) {
        this.sendMessage(Commands_1.PrivateMessage, { target: target, message: message });
    };
    IRCClient.prototype.sendCTCP = function (target, type, message) {
        this.say(target, "\u0001" + type.toUpperCase() + " " + message + "\u0001");
    };
    IRCClient.prototype.action = function (target, message) {
        this.sendCTCP(target, 'ACTION', message);
    };
    IRCClient.prototype.getPassword = function (currentPassword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, currentPassword];
            });
        });
    };
    IRCClient.prototype.registerCoreMessageTypes = function () {
        var _this = this;
        ObjectTools_1.default.forEach(MessageTypes.Commands, function (type) {
            _this.registerMessageType(type);
        });
        ObjectTools_1.default.forEach(MessageTypes.Numerics, function (type) {
            _this.registerMessageType(type);
        });
    };
    IRCClient.prototype._negotiateCapabilityBatch = function (capabilities) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(capabilities
                        .filter(function (list) { return list.length; })
                        .map(function (capList) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, this._negotiateCapabilities(capList)];
                    }); }); }))];
            });
        });
    };
    IRCClient.prototype._negotiateCapabilities = function (capList) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5, _a, mappedCapList, messages, capReply, negotiatedCapNames, newNegotiatedCaps, newNegotiatedCaps_1, newNegotiatedCaps_1_1, newCap, mergedCap;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mappedCapList = ObjectTools_1.default.fromArray(capList, function (cap) {
                            var _a;
                            return (_a = {},
                                _a[cap.name] = cap,
                                _a);
                        });
                        return [4 /*yield*/, this.sendMessageAndCaptureReply(Commands_1.CapabilityNegotiation, {
                                subCommand: 'REQ',
                                capabilities: capList.map(function (cap) { return cap.name; }).join(' ')
                            })];
                    case 1:
                        messages = _b.sent();
                        capReply = messages.shift();
                        if (!capReply) {
                            throw new Error('capability negotiation failed unexpectedly without any reply');
                        }
                        if (!(capReply instanceof Commands_1.CapabilityNegotiation)) {
                            throw new Error("capability negotiation failed unexpectedly with \"" + capReply.command + "\" command");
                        }
                        negotiatedCapNames = capReply.params.capabilities.split(' ').filter(function (c) { return c; });
                        if (capReply.params.subCommand === 'ACK') {
                            // filter is necessary because some networks seem to add trailing spaces...
                            this._logger.debug2("Successfully negotiated capabilities: " + negotiatedCapNames.join(', '));
                            newNegotiatedCaps = negotiatedCapNames.map(function (capName) { return mappedCapList[capName]; });
                            try {
                                for (newNegotiatedCaps_1 = __values(newNegotiatedCaps), newNegotiatedCaps_1_1 = newNegotiatedCaps_1.next(); !newNegotiatedCaps_1_1.done; newNegotiatedCaps_1_1 = newNegotiatedCaps_1.next()) {
                                    newCap = newNegotiatedCaps_1_1.value;
                                    mergedCap = this._clientCapabilities.get(newCap.name);
                                    mergedCap.param = newCap.param;
                                    this._negotiatedCapabilities.set(mergedCap.name, mergedCap);
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (newNegotiatedCaps_1_1 && !newNegotiatedCaps_1_1.done && (_a = newNegotiatedCaps_1.return)) _a.call(newNegotiatedCaps_1);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                            return [2 /*return*/, newNegotiatedCaps];
                        }
                        else {
                            this._logger.debug2("Failed to negotiate capabilities: " + negotiatedCapNames.join(', '));
                            return [2 /*return*/, new Error('capabilities failed to negotiate')];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    IRCClient.prototype._updateCredentials = function (newCredentials) {
        this._credentials = __assign({}, this._credentials, newCredentials);
    };
    // event helper
    IRCClient.prototype.handleEvents = function (message) {
        var e_6, _a;
        this._collectors.some(function (collector) { return collector.collect(message); });
        var handlers = this._events.get(message.constructor.COMMAND);
        if (!handlers) {
            return;
        }
        try {
            for (var _b = __values(handlers.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                handler(message);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    IRCClient.prototype._startPingCheckTimer = function () {
        var _this = this;
        if (this._pingCheckTimer) {
            clearTimeout(this._pingCheckTimer);
        }
        this._pingCheckTimer = setTimeout(function () { return _this.pingCheck(); }, this._pingOnInactivity * 1000);
    };
    // yes, this is just fibonacci with a limit
    IRCClient._getReconnectWaitTime = function () {
        var _a, current, next;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    current = 0;
                    next = 1;
                    _b.label = 1;
                case 1:
                    if (!(current < 120)) return [3 /*break*/, 3];
                    return [4 /*yield*/, current];
                case 2:
                    _b.sent();
                    _a = __read([next, current + next], 2), current = _a[0], next = _a[1];
                    return [3 /*break*/, 1];
                case 3:
                    if (!true) return [3 /*break*/, 5];
                    return [4 /*yield*/, 120];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 5: return [2 /*return*/];
            }
        });
    };
    __decorate([
        NonEnumerable_1.NonEnumerable
    ], IRCClient.prototype, "_options", void 0);
    __decorate([
        NonEnumerable_1.NonEnumerable
    ], IRCClient.prototype, "_credentials", void 0);
    return IRCClient;
}(typed_event_emitter_1.EventEmitter));
exports.default = IRCClient;

},{"./Capability/CoreCapabilities":28,"./Connection/DirectConnection":30,"./Connection/WebSocketConnection":31,"./Errors/MessageError":32,"./Message/Message":37,"./Message/MessageCollector":38,"./Message/MessageParser":40,"./Message/MessageTypes":109,"./Message/MessageTypes/Commands":71,"./Message/MessageTypes/Commands/ClientQuit":48,"./Message/MessageTypes/Numerics":108,"./ServerProperties":110,"./Toolkit/NonEnumerable":111,"./Toolkit/ObjectTools":112,"./Toolkit/StringTools":113,"@d-fischer/logger":6,"@d-fischer/typed-event-emitter":7,"clone":14}],37:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectTools_1 = require("../Toolkit/ObjectTools");
var StringTools_1 = require("../Toolkit/StringTools");
var ServerProperties_1 = require("../ServerProperties");
var NotEnoughParametersError_1 = require("../Errors/NotEnoughParametersError");
var ParameterRequirementMismatchError_1 = require("../Errors/ParameterRequirementMismatchError");
var tagEscapeMap = {
    '\\': '\\',
    ';': ':',
    '\n': 'n',
    '\r': 'r',
    ' ': 's'
};
function escapeTag(str) {
    return str.replace(/[\\;\n\r ]/g, function (match) { return "\\" + tagEscapeMap[match]; });
}
function prefixToString(prefix) {
    var result = "" + prefix.nick;
    if (prefix.user) {
        result += "!" + prefix.user;
    }
    if (prefix.host) {
        result += "@" + prefix.host;
    }
    return result;
}
exports.prefixToString = prefixToString;
function createMessage(type, params, prefix, tags, serverProperties, isServer) {
    if (serverProperties === void 0) { serverProperties = ServerProperties_1.defaultServerProperties; }
    if (isServer === void 0) { isServer = false; }
    var message = new type(type.COMMAND, undefined, undefined, undefined, serverProperties);
    var parsedParams = {};
    ObjectTools_1.default.forEach(type.PARAM_SPEC, function (paramSpec, paramName) {
        if (isServer && paramSpec.noServer) {
            return;
        }
        if (!isServer && paramSpec.noClient) {
            return;
        }
        if (paramName in params) {
            var param = params[paramName];
            if (param !== undefined) {
                if (type.checkParam(param, paramSpec, serverProperties)) {
                    parsedParams[paramName] = {
                        value: param,
                        trailing: Boolean(paramSpec.trailing)
                    };
                }
                else if (!paramSpec.optional) {
                    throw new Error("required parameter \"" + paramName + "\" did not suit requirements: \"" + param + "\"");
                }
            }
        }
        if (!(paramName in parsedParams) && !paramSpec.optional) {
            throw new Error("required parameter \"" + paramName + "\" not found in command \"" + type.COMMAND + "\"");
        }
    });
    Object.assign(message, parsedParams);
    message._initPrefixAndTags(prefix, tags);
    return message;
}
exports.createMessage = createMessage;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var Message = /** @class */ (function () {
    function Message(command, params, tags, prefix, serverProperties, rawLine, isServer, shouldParseParams) {
        if (serverProperties === void 0) { serverProperties = ServerProperties_1.defaultServerProperties; }
        if (isServer === void 0) { isServer = false; }
        if (shouldParseParams === void 0) { shouldParseParams = true; }
        this._params = [];
        this._serverProperties = ServerProperties_1.defaultServerProperties;
        this._command = command;
        this._params = params;
        this._tags = tags || new Map();
        this._prefix = prefix;
        this._serverProperties = serverProperties;
        this._raw = rawLine;
        if (shouldParseParams) {
            this.parseParams(isServer);
        }
    }
    Message.checkParam = function (param, spec, serverProperties) {
        if (serverProperties === void 0) { serverProperties = ServerProperties_1.defaultServerProperties; }
        if (spec.type === 'channel') {
            if (!StringTools_1.isChannel(param, serverProperties.channelTypes)) {
                return false;
            }
        }
        if (spec.type === 'channelList') {
            var channels = param.split(',');
            if (!channels.every(function (chan) { return StringTools_1.isChannel(chan, serverProperties.channelTypes); })) {
                return false;
            }
        }
        if (spec.match) {
            if (!spec.match.test(param)) {
                return false;
            }
        }
        return true;
    };
    Message.getMinParamCount = function (isServer) {
        if (isServer === void 0) { isServer = false; }
        if (!this.PARAM_SPEC) {
            return 0;
        }
        return Object.values(this.PARAM_SPEC).filter(function (spec) {
            if (spec.noServer && isServer) {
                return false;
            }
            if (spec.noClient && !isServer) {
                return false;
            }
            return !spec.optional;
        }).length;
    };
    Message.prototype.prefixToString = function () {
        if (!this._prefix) {
            return '';
        }
        return prefixToString(this._prefix);
    };
    Message.prototype.tagsToString = function () {
        if (!this._tags) {
            return '';
        }
        return __spread(this._tags.entries()).map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return (value ? key + "=" + escapeTag(value) : key);
        }).join(';');
    };
    Message.prototype.toString = function (complete) {
        var _this = this;
        if (complete === void 0) { complete = false; }
        var cls = this.constructor;
        var specKeys = ObjectTools_1.default.keys(cls.PARAM_SPEC);
        var fullCommand = __spread([
            this._command
        ], specKeys
            .map(function (paramName) {
            // TS inference does really not help here... so this is any for now
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var param = _this[paramName];
            if (param) {
                return (param.trailing ? ':' : '') + param.value;
            }
            return undefined;
        })
            .filter(function (param) { return param !== undefined; })).join(' ');
        if (!complete) {
            return fullCommand;
        }
        var parts = [fullCommand];
        var prefix = this.prefixToString();
        if (prefix) {
            parts.unshift(":" + prefix);
        }
        var tags = this.tagsToString();
        if (tags) {
            parts.unshift("@" + tags);
        }
        return parts.join(' ');
    };
    /** @private */
    Message.prototype._initPrefixAndTags = function (prefix, tags) {
        this._prefix = prefix;
        if (tags) {
            this._tags = tags;
        }
    };
    Message.prototype.parseParams = function (isServer) {
        if (isServer === void 0) { isServer = false; }
        var e_1, _a;
        if (this._params) {
            var cls = this.constructor;
            var requiredParamsLeft = cls.getMinParamCount(isServer);
            if (requiredParamsLeft > this._params.length) {
                throw new NotEnoughParametersError_1.default(this._command, requiredParamsLeft, this._params.length);
            }
            var paramSpecList = cls.PARAM_SPEC;
            if (!paramSpecList) {
                return;
            }
            var i = 0;
            var parsedParams = {};
            try {
                for (var _b = __values(Object.entries(paramSpecList)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), paramName = _d[0], paramSpec = _d[1];
                    if (paramSpec.noServer && isServer) {
                        continue;
                    }
                    if (paramSpec.noClient && !isServer) {
                        continue;
                    }
                    if (this._params.length - i <= requiredParamsLeft) {
                        if (paramSpec.optional) {
                            continue;
                        }
                        else if (this._params.length - i !== requiredParamsLeft) {
                            throw new Error('not enough parameters left for required parameters parsing (this is a library bug)');
                        }
                    }
                    var param = this._params[i];
                    if (!param) {
                        if (paramSpec.optional) {
                            break;
                        }
                        throw new Error('unexpected parameter underflow');
                    }
                    if (paramSpec.rest) {
                        var restParams = [];
                        while (this._params[i] && !this._params[i].trailing) {
                            restParams.push(this._params[i].value);
                            ++i;
                        }
                        if (!restParams.length) {
                            if (paramSpec.optional) {
                                continue;
                            }
                            throw new Error("no parameters left for required rest parameter \"" + paramName + "\"");
                        }
                        param = {
                            value: restParams.join(' '),
                            trailing: false
                        };
                    }
                    if (Message.checkParam(param.value, paramSpec)) {
                        parsedParams[paramName] = __assign({}, param);
                        if (!paramSpec.optional) {
                            --requiredParamsLeft;
                        }
                        if (!paramSpec.rest) {
                            ++i;
                        }
                    }
                    else if (!paramSpec.optional) {
                        throw new ParameterRequirementMismatchError_1.default(this._command, paramName, paramSpec, param.value);
                    }
                    if (paramSpec.trailing) {
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            Object.assign(this, parsedParams);
        }
    };
    Object.defineProperty(Message.prototype, "params", {
        get: function () {
            var _this = this;
            var cls = this.constructor;
            var specKeys = ObjectTools_1.default.keys(cls.PARAM_SPEC);
            return Object.assign.apply(Object, __spread([{}], specKeys
                .map(function (paramName) {
                // TS inference does really not help here... so this is any for now
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var param = _this[paramName];
                if (param) {
                    return [paramName, param.value];
                }
                return undefined;
            })
                .filter(function (pair) { return pair !== undefined; })
                .map(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                var _c;
                return (_c = {}, _c[key] = value, _c);
            })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "prefix", {
        get: function () {
            return this._prefix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "command", {
        get: function () {
            return this._command;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "rawLine", {
        get: function () {
            return this._raw;
        },
        enumerable: true,
        configurable: true
    });
    Message.prototype.isResponseTo = function (originalMessage) {
        return false;
    };
    Message.prototype.endsResponseTo = function (originalMessage) {
        return false;
    };
    Message.prototype._acceptsInReplyCollection = function (message) {
        // TODO implement IRCv3 labeled-response / batch here
        return message.isResponseTo(this);
    };
    Message.COMMAND = '';
    Message.SUPPORTS_CAPTURE = false;
    return Message;
}());
exports.default = Message;

},{"../Errors/NotEnoughParametersError":33,"../Errors/ParameterRequirementMismatchError":34,"../ServerProperties":110,"../Toolkit/ObjectTools":112,"../Toolkit/StringTools":113}],38:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageCollector = /** @class */ (function () {
    function MessageCollector(_client, _originalMessage) {
        var types = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            types[_i - 2] = arguments[_i];
        }
        this._client = _client;
        this._originalMessage = _originalMessage;
        this._messages = [];
        this._endEventHandlers = new Map();
        this._types = new Set(types);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MessageCollector.prototype.untilEvent = function (eventType) {
        var _this = this;
        this._cleanEndEventHandler(eventType);
        var listener = this._client.on(eventType, function () { return _this.end(); });
        this._endEventHandlers.set(eventType, listener);
    };
    MessageCollector.prototype.promise = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this._promise) {
                    this._promise = new Promise(function (resolve) { return (_this._promiseResolve = resolve); });
                }
                return [2 /*return*/, this._promise];
            });
        });
    };
    MessageCollector.prototype.collect = function (message) {
        if (!this._originalMessage._acceptsInReplyCollection(message)) {
            return false;
        }
        this._messages.push(message);
        if (message.endsResponseTo(this._originalMessage)) {
            this.end();
        }
        return true;
    };
    MessageCollector.prototype.end = function () {
        this._client.stopCollect(this);
        this._cleanEndEventHandlers();
        if (this._promiseResolve) {
            this._promiseResolve(this._messages);
        }
    };
    MessageCollector.prototype._cleanEndEventHandlers = function () {
        var _this = this;
        this._endEventHandlers.forEach(function (listener) { return _this._client.removeListener(listener); });
        this._endEventHandlers.clear();
    };
    MessageCollector.prototype._cleanEndEventHandler = function (eventType) {
        if (this._endEventHandlers.has(eventType)) {
            this._client.removeListener(this._endEventHandlers.get(eventType));
            this._endEventHandlers.delete(eventType);
        }
    };
    return MessageCollector;
}());
exports.default = MessageCollector;

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("./Message");
var isMessageType = function (ctor) {
    return Object.prototype.isPrototypeOf.call(Message_1.default, ctor);
};
exports.MessageType = function (commandName) { return function (target) {
    if (!isMessageType(target)) {
        throw new Error('You need to extend the Message class to use the MessageType decorator');
    }
    target.COMMAND = commandName;
}; };
exports.MessageParamDefinition = function (spec) {
    if (spec === void 0) { spec = {}; }
    return function (target, propertyKey) {
        if (!(target instanceof Message_1.default)) {
            throw new Error('You need to extend the Message class to use the MessageParam decorator');
        }
        if (typeof propertyKey !== 'string') {
            return;
        }
        var cls = target.constructor;
        if (!cls.PARAM_SPEC) {
            cls.PARAM_SPEC = {};
        }
        cls.PARAM_SPEC[propertyKey] = spec;
    };
};

},{"./Message":37}],40:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServerProperties_1 = require("../ServerProperties");
var StringTools_1 = require("../Toolkit/StringTools");
var Message_1 = require("./Message");
var MessageTypes_1 = require("./MessageTypes");
function parsePrefix(raw) {
    var _a = __read(StringTools_1.splitWithLimit(raw, '!', 2), 2), nick = _a[0], hostName = _a[1];
    if (hostName) {
        var _b = __read(StringTools_1.splitWithLimit(hostName, '@', 2), 2), user = _b[0], host = _b[1];
        if (host) {
            return { nick: nick, user: user, host: host };
        }
        else {
            return { nick: nick, host: user };
        }
    }
    else {
        return { nick: nick };
    }
}
exports.parsePrefix = parsePrefix;
var tagUnescapeMap = {
    ':': ';',
    n: '\n',
    r: '\r',
    s: ' '
};
function parseTags(raw) {
    var e_1, _a;
    var tags = new Map();
    var tagStrings = raw.split(';');
    try {
        for (var tagStrings_1 = __values(tagStrings), tagStrings_1_1 = tagStrings_1.next(); !tagStrings_1_1.done; tagStrings_1_1 = tagStrings_1.next()) {
            var tagString = tagStrings_1_1.value;
            var _b = __read(StringTools_1.splitWithLimit(tagString, '=', 2), 2), tagName = _b[0], tagValue = _b[1];
            if (tagName === '') {
                continue; // Ignore empty tags: @ @; @x; etc.
            }
            // unescape according to http://ircv3.net/specs/core/message-tags-3.2.html#escaping-values
            tags.set(tagName, tagValue
                ? tagValue.replace(/\\(.?)/g, function (_, match) {
                    return Object.prototype.hasOwnProperty.call(tagUnescapeMap, match) ? tagUnescapeMap[match] : match;
                })
                : '');
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (tagStrings_1_1 && !tagStrings_1_1.done && (_a = tagStrings_1.return)) _a.call(tagStrings_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return tags;
}
exports.parseTags = parseTags;
function parseMessage(line, serverProperties, knownCommands, isServer, nonConformingCommands) {
    if (serverProperties === void 0) { serverProperties = ServerProperties_1.defaultServerProperties; }
    if (knownCommands === void 0) { knownCommands = MessageTypes_1.all; }
    if (isServer === void 0) { isServer = false; }
    if (nonConformingCommands === void 0) { nonConformingCommands = []; }
    var splitLine = line.split(' ');
    var token;
    var command;
    var params = [];
    var tags;
    var prefix;
    while (splitLine.length) {
        token = splitLine[0];
        if (token[0] === '@' && !tags && !command && !prefix) {
            tags = parseTags(token.substr(1));
        }
        else if (token[0] === ':') {
            if (!prefix && !command) {
                if (token.length > 1) {
                    // Not an empty prefix
                    prefix = parsePrefix(token.substr(1));
                }
            }
            else {
                params.push({
                    value: splitLine.join(' ').substr(1),
                    trailing: true
                });
                break;
            }
        }
        else if (command) {
            params.push({
                value: token,
                trailing: false
            });
        }
        else {
            command = token.toUpperCase();
        }
        splitLine.shift();
    }
    if (!tags) {
        tags = new Map();
    }
    if (!command) {
        throw new Error("line without command received: " + line);
    }
    var messageClass = Message_1.default;
    if (knownCommands.has(command)) {
        messageClass = knownCommands.get(command);
    }
    return new messageClass(command, params, tags, prefix, serverProperties, line, isServer, !nonConformingCommands.includes(command));
}
exports.parseMessage = parseMessage;

},{"../ServerProperties":110,"../Toolkit/StringTools":113,"./Message":37,"./MessageTypes":109}],41:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Away = /** @class */ (function (_super) {
    __extends(Away, _super);
    function Away() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition()
    ], Away.prototype, "message", void 0);
    Away = __decorate([
        MessageDefinition_1.MessageType('AWAY')
    ], Away);
    return Away;
}(Message_1.default));
exports.default = Away;

},{"../../Message":37,"../../MessageDefinition":39}],42:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var CapabilityNegotiation = /** @class */ (function (_super) {
    __extends(CapabilityNegotiation, _super);
    function CapabilityNegotiation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CapabilityNegotiation_1 = CapabilityNegotiation;
    CapabilityNegotiation.prototype.isResponseTo = function (originalMessage) {
        if (!(originalMessage instanceof CapabilityNegotiation_1)) {
            return false;
        }
        switch (this.params.subCommand) {
            case 'ACK':
            case 'NAK': {
                // trim is necessary because some networks seem to add trailing spaces (looking at you, Freenode)...
                return (originalMessage.params.subCommand === 'REQ' &&
                    originalMessage.params.capabilities === this.params.capabilities.trim());
            }
            case 'LS':
            case 'LIST': {
                return originalMessage.params.subCommand === this.params.subCommand;
            }
            default: {
                return false;
            }
        }
    };
    CapabilityNegotiation.prototype.endsResponseTo = function (originalMessage) {
        if (!(originalMessage instanceof CapabilityNegotiation_1)) {
            return false;
        }
        switch (this.params.subCommand) {
            case 'LS':
            case 'LIST': {
                return !this.params.continued;
            }
            default: {
                return true;
            }
        }
    };
    var CapabilityNegotiation_1;
    CapabilityNegotiation.SUPPORTS_CAPTURE = true;
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            match: /^(?:[a-z_\-\[\]\\^{}|`][a-z0-9_\-\[\]\\^{}|`]+|\*)$/i,
            optional: true,
            noClient: true
        })
    ], CapabilityNegotiation.prototype, "target", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            match: /^(?:LS|LIST|REQ|ACK|NAK|END|NEW|DEL)$/i
        })
    ], CapabilityNegotiation.prototype, "subCommand", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            match: /^\d+$/,
            optional: true
        })
    ], CapabilityNegotiation.prototype, "version", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            match: /^\*$/,
            optional: true
        })
    ], CapabilityNegotiation.prototype, "continued", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true,
            optional: true
        })
    ], CapabilityNegotiation.prototype, "capabilities", void 0);
    CapabilityNegotiation = CapabilityNegotiation_1 = __decorate([
        MessageDefinition_1.MessageType('CAP')
    ], CapabilityNegotiation);
    return CapabilityNegotiation;
}(Message_1.default));
exports.default = CapabilityNegotiation;

},{"../../Message":37,"../../MessageDefinition":39}],43:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var ChannelInvite = /** @class */ (function (_super) {
    __extends(ChannelInvite, _super);
    function ChannelInvite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], ChannelInvite.prototype, "target", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], ChannelInvite.prototype, "channel", void 0);
    ChannelInvite = __decorate([
        MessageDefinition_1.MessageType('INVITE')
    ], ChannelInvite);
    return ChannelInvite;
}(Message_1.default));
exports.default = ChannelInvite;

},{"../../Message":37,"../../MessageDefinition":39}],44:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var ChannelJoin = /** @class */ (function (_super) {
    __extends(ChannelJoin, _super);
    function ChannelJoin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], ChannelJoin.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            optional: true
        })
    ], ChannelJoin.prototype, "key", void 0);
    ChannelJoin = __decorate([
        MessageDefinition_1.MessageType('JOIN')
    ], ChannelJoin);
    return ChannelJoin;
}(Message_1.default));
exports.default = ChannelJoin;

},{"../../Message":37,"../../MessageDefinition":39}],45:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var ChannelKick = /** @class */ (function (_super) {
    __extends(ChannelKick, _super);
    function ChannelKick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], ChannelKick.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], ChannelKick.prototype, "target", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true,
            optional: true
        })
    ], ChannelKick.prototype, "comment", void 0);
    ChannelKick = __decorate([
        MessageDefinition_1.MessageType('KICK')
    ], ChannelKick);
    return ChannelKick;
}(Message_1.default));
exports.default = ChannelKick;

},{"../../Message":37,"../../MessageDefinition":39}],46:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var ChannelList = /** @class */ (function (_super) {
    __extends(ChannelList, _super);
    function ChannelList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel',
            optional: true
        })
    ], ChannelList.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            optional: true
        })
    ], ChannelList.prototype, "server", void 0);
    ChannelList = __decorate([
        MessageDefinition_1.MessageType('LIST')
    ], ChannelList);
    return ChannelList;
}(Message_1.default));
exports.default = ChannelList;

},{"../../Message":37,"../../MessageDefinition":39}],47:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var ChannelPart = /** @class */ (function (_super) {
    __extends(ChannelPart, _super);
    function ChannelPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], ChannelPart.prototype, "channel", void 0);
    ChannelPart = __decorate([
        MessageDefinition_1.MessageType('PART')
    ], ChannelPart);
    return ChannelPart;
}(Message_1.default));
exports.default = ChannelPart;

},{"../../Message":37,"../../MessageDefinition":39}],48:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var ClientQuit = /** @class */ (function (_super) {
    __extends(ClientQuit, _super);
    function ClientQuit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true,
            optional: true
        })
    ], ClientQuit.prototype, "message", void 0);
    ClientQuit = __decorate([
        MessageDefinition_1.MessageType('QUIT')
    ], ClientQuit);
    return ClientQuit;
}(Message_1.default));
exports.default = ClientQuit;

},{"../../Message":37,"../../MessageDefinition":39}],49:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var ErrorMessage = /** @class */ (function (_super) {
    __extends(ErrorMessage, _super);
    function ErrorMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], ErrorMessage.prototype, "message", void 0);
    ErrorMessage = __decorate([
        MessageDefinition_1.MessageType('ERROR')
    ], ErrorMessage);
    return ErrorMessage;
}(Message_1.default));
exports.default = ErrorMessage;

},{"../../Message":37,"../../MessageDefinition":39}],50:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var IsOnQuery = /** @class */ (function (_super) {
    __extends(IsOnQuery, _super);
    function IsOnQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            rest: true
        })
    ], IsOnQuery.prototype, "nicks", void 0);
    IsOnQuery = __decorate([
        MessageDefinition_1.MessageType('ISON')
    ], IsOnQuery);
    return IsOnQuery;
}(Message_1.default));
exports.default = IsOnQuery;

},{"../../Message":37,"../../MessageDefinition":39}],51:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Kill = /** @class */ (function (_super) {
    __extends(Kill, _super);
    function Kill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Kill.prototype, "target", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true,
            optional: true
        })
    ], Kill.prototype, "comment", void 0);
    Kill = __decorate([
        MessageDefinition_1.MessageType('KILL')
    ], Kill);
    return Kill;
}(Message_1.default));
exports.default = Kill;

},{"../../Message":37,"../../MessageDefinition":39}],52:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var StringTools_1 = require("../../../Toolkit/StringTools");
var UnknownChannelModeCharError_1 = require("../../../Errors/UnknownChannelModeCharError");
var MessageDefinition_1 = require("../../MessageDefinition");
var Mode = /** @class */ (function (_super) {
    __extends(Mode, _super);
    function Mode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Mode.prototype, "isChannel", {
        get: function () {
            return StringTools_1.isChannel(this.params.target, this._serverProperties.channelTypes);
        },
        enumerable: true,
        configurable: true
    });
    Mode.prototype.separate = function () {
        var e_1, _a;
        var result = [];
        var modeRestParam = this.params.modes;
        if (!modeRestParam) {
            throw new Error("can't separate a channel mode request, just set actions");
        }
        var modeParams = modeRestParam.split(' ');
        var modes = modeParams.shift();
        var currentModeAction = 'add';
        try {
            for (var modes_1 = __values(modes), modes_1_1 = modes_1.next(); !modes_1_1.done; modes_1_1 = modes_1.next()) {
                var ch = modes_1_1.value;
                var thisModeAction = currentModeAction;
                switch (ch) {
                    case '+': {
                        currentModeAction = 'add';
                        break;
                    }
                    case '-': {
                        currentModeAction = 'remove';
                        break;
                    }
                    default: {
                        var requiresParam = false;
                        var known = true;
                        if (this.isChannel) {
                            if (this._serverProperties.supportedChannelModes.alwaysWithParam.includes(ch) ||
                                this._serverProperties.supportedChannelModes.prefix.includes(ch)) {
                                requiresParam = true;
                            }
                            else if (this._serverProperties.supportedChannelModes.paramWhenSet.includes(ch)) {
                                if (currentModeAction === 'add') {
                                    requiresParam = true;
                                }
                            }
                            else if (this._serverProperties.supportedChannelModes.list.includes(ch)) {
                                if (modeParams.length) {
                                    requiresParam = true;
                                }
                                else {
                                    thisModeAction = 'getList';
                                }
                            }
                            else if (this._serverProperties.supportedChannelModes.noParam.includes(ch)) {
                                // whatever
                            }
                            else {
                                throw new UnknownChannelModeCharError_1.default(ch);
                            }
                        }
                        else {
                            // user modes never have a param
                            // also, they don't break the whole command if invalid mode letters are given
                            known = this._serverProperties.supportedUserModes.includes(ch);
                        }
                        if (requiresParam && !modeParams.length) {
                            continue;
                        }
                        result.push({
                            prefix: this._prefix,
                            action: thisModeAction,
                            letter: ch,
                            param: requiresParam ? modeParams.shift() : undefined,
                            known: known
                        });
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (modes_1_1 && !modes_1_1.done && (_a = modes_1.return)) _a.call(modes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Mode.prototype, "target", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            rest: true,
            optional: true
        })
    ], Mode.prototype, "modes", void 0);
    Mode = __decorate([
        MessageDefinition_1.MessageType('MODE')
    ], Mode);
    return Mode;
}(Message_1.default));
exports.default = Mode;

},{"../../../Errors/UnknownChannelModeCharError":35,"../../../Toolkit/StringTools":113,"../../Message":37,"../../MessageDefinition":39}],53:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Names = /** @class */ (function (_super) {
    __extends(Names, _super);
    function Names() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Names.SUPPORTS_CAPTURE = true;
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channelList',
            optional: true
        })
    ], Names.prototype, "channel", void 0);
    Names = __decorate([
        MessageDefinition_1.MessageType('NAMES')
    ], Names);
    return Names;
}(Message_1.default));
exports.default = Names;

},{"../../Message":37,"../../MessageDefinition":39}],54:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var NickChange = /** @class */ (function (_super) {
    __extends(NickChange, _super);
    function NickChange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], NickChange.prototype, "nick", void 0);
    NickChange = __decorate([
        MessageDefinition_1.MessageType('NICK')
    ], NickChange);
    return NickChange;
}(Message_1.default));
exports.default = NickChange;

},{"../../Message":37,"../../MessageDefinition":39}],55:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Notice = /** @class */ (function (_super) {
    __extends(Notice, _super);
    function Notice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Notice.prototype, "target", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Notice.prototype, "message", void 0);
    Notice = __decorate([
        MessageDefinition_1.MessageType('NOTICE')
    ], Notice);
    return Notice;
}(Message_1.default));
exports.default = Notice;

},{"../../Message":37,"../../MessageDefinition":39}],56:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var OperLogin = /** @class */ (function (_super) {
    __extends(OperLogin, _super);
    function OperLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], OperLogin.prototype, "name", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], OperLogin.prototype, "password", void 0);
    OperLogin = __decorate([
        MessageDefinition_1.MessageType('OPER')
    ], OperLogin);
    return OperLogin;
}(Message_1.default));
exports.default = OperLogin;

},{"../../Message":37,"../../MessageDefinition":39}],57:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Password = /** @class */ (function (_super) {
    __extends(Password, _super);
    function Password() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Password.prototype, "password", void 0);
    Password = __decorate([
        MessageDefinition_1.MessageType('PASS')
    ], Password);
    return Password;
}(Message_1.default));
exports.default = Password;

},{"../../Message":37,"../../MessageDefinition":39}],58:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Ping = /** @class */ (function (_super) {
    __extends(Ping, _super);
    function Ping() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Ping.prototype, "message", void 0);
    Ping = __decorate([
        MessageDefinition_1.MessageType('PING')
    ], Ping);
    return Ping;
}(Message_1.default));
exports.default = Ping;

},{"../../Message":37,"../../MessageDefinition":39}],59:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Pong = /** @class */ (function (_super) {
    __extends(Pong, _super);
    function Pong() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            noClient: true
        })
    ], Pong.prototype, "server", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Pong.prototype, "message", void 0);
    Pong = __decorate([
        MessageDefinition_1.MessageType('PONG')
    ], Pong);
    return Pong;
}(Message_1.default));
exports.default = Pong;

},{"../../Message":37,"../../MessageDefinition":39}],60:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var PrivateMessage = /** @class */ (function (_super) {
    __extends(PrivateMessage, _super);
    function PrivateMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], PrivateMessage.prototype, "target", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], PrivateMessage.prototype, "message", void 0);
    PrivateMessage = __decorate([
        MessageDefinition_1.MessageType('PRIVMSG')
    ], PrivateMessage);
    return PrivateMessage;
}(Message_1.default));
exports.default = PrivateMessage;

},{"../../Message":37,"../../MessageDefinition":39}],61:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Rehash = /** @class */ (function (_super) {
    __extends(Rehash, _super);
    function Rehash() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rehash = __decorate([
        MessageDefinition_1.MessageType('REHASH')
    ], Rehash);
    return Rehash;
}(Message_1.default));
exports.default = Rehash;

},{"../../Message":37,"../../MessageDefinition":39}],62:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Restart = /** @class */ (function (_super) {
    __extends(Restart, _super);
    function Restart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Restart = __decorate([
        MessageDefinition_1.MessageType('RESTART')
    ], Restart);
    return Restart;
}(Message_1.default));
exports.default = Restart;

},{"../../Message":37,"../../MessageDefinition":39}],63:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var ServerQuit = /** @class */ (function (_super) {
    __extends(ServerQuit, _super);
    function ServerQuit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], ServerQuit.prototype, "server", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], ServerQuit.prototype, "message", void 0);
    ServerQuit = __decorate([
        MessageDefinition_1.MessageType('SQUIT')
    ], ServerQuit);
    return ServerQuit;
}(Message_1.default));
exports.default = ServerQuit;

},{"../../Message":37,"../../MessageDefinition":39}],64:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Topic = /** @class */ (function (_super) {
    __extends(Topic, _super);
    function Topic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Topic.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            optional: true,
            trailing: true
        })
    ], Topic.prototype, "newTopic", void 0);
    Topic = __decorate([
        MessageDefinition_1.MessageType('TOPIC')
    ], Topic);
    return Topic;
}(Message_1.default));
exports.default = Topic;

},{"../../Message":37,"../../MessageDefinition":39}],65:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var UserHostQuery = /** @class */ (function (_super) {
    __extends(UserHostQuery, _super);
    function UserHostQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            rest: true
        })
    ], UserHostQuery.prototype, "nicks", void 0);
    UserHostQuery = __decorate([
        MessageDefinition_1.MessageType('USERHOST')
    ], UserHostQuery);
    return UserHostQuery;
}(Message_1.default));
exports.default = UserHostQuery;

},{"../../Message":37,"../../MessageDefinition":39}],66:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var UserRegistration = /** @class */ (function (_super) {
    __extends(UserRegistration, _super);
    function UserRegistration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], UserRegistration.prototype, "user", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], UserRegistration.prototype, "mode", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], UserRegistration.prototype, "unused", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], UserRegistration.prototype, "realName", void 0);
    UserRegistration = __decorate([
        MessageDefinition_1.MessageType('USER')
    ], UserRegistration);
    return UserRegistration;
}(Message_1.default));
exports.default = UserRegistration;

},{"../../Message":37,"../../MessageDefinition":39}],67:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var WallopsMessage = /** @class */ (function (_super) {
    __extends(WallopsMessage, _super);
    function WallopsMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], WallopsMessage.prototype, "message", void 0);
    WallopsMessage = __decorate([
        MessageDefinition_1.MessageType('WALLOPS')
    ], WallopsMessage);
    return WallopsMessage;
}(Message_1.default));
exports.default = WallopsMessage;

},{"../../Message":37,"../../MessageDefinition":39}],68:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var WhoIsQuery = /** @class */ (function (_super) {
    __extends(WhoIsQuery, _super);
    function WhoIsQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            optional: true
        })
    ], WhoIsQuery.prototype, "server", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], WhoIsQuery.prototype, "nickMask", void 0);
    WhoIsQuery = __decorate([
        MessageDefinition_1.MessageType('WHOIS')
    ], WhoIsQuery);
    return WhoIsQuery;
}(Message_1.default));
exports.default = WhoIsQuery;

},{"../../Message":37,"../../MessageDefinition":39}],69:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var WhoQuery = /** @class */ (function (_super) {
    __extends(WhoQuery, _super);
    function WhoQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            optional: true
        })
    ], WhoQuery.prototype, "mask", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            rest: true
        })
    ], WhoQuery.prototype, "flags", void 0);
    WhoQuery = __decorate([
        MessageDefinition_1.MessageType('WHO')
    ], WhoQuery);
    return WhoQuery;
}(Message_1.default));
exports.default = WhoQuery;

},{"../../Message":37,"../../MessageDefinition":39}],70:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var WhoWasQuery = /** @class */ (function (_super) {
    __extends(WhoWasQuery, _super);
    function WhoWasQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], WhoWasQuery.prototype, "nickname", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            optional: true
        })
    ], WhoWasQuery.prototype, "count", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            optional: true
        })
    ], WhoWasQuery.prototype, "server", void 0);
    WhoWasQuery = __decorate([
        MessageDefinition_1.MessageType('WHOWAS')
    ], WhoWasQuery);
    return WhoWasQuery;
}(Message_1.default));
exports.default = WhoWasQuery;

},{"../../Message":37,"../../MessageDefinition":39}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// region RFC1459
// region 4 Message details
// region 4.1 Connection Registration
// 4.1.1 Password message
var Password_1 = require("./Password");
exports.Password = Password_1.default;
// 4.1.2 Nickname message
var NickChange_1 = require("./NickChange");
exports.NickChange = NickChange_1.default;
// 4.1.3 User message
var UserRegistration_1 = require("./UserRegistration");
exports.UserRegistration = UserRegistration_1.default;
// 4.1.4 Server message
// We can't be a server yet
// 4.1.5 Operator message
var OperLogin_1 = require("./OperLogin");
exports.OperLogin = OperLogin_1.default;
// 4.1.6 Quit message
var ClientQuit_1 = require("./ClientQuit");
exports.ClientQuit = ClientQuit_1.default;
// 4.1.7 Server Quit message
var ServerQuit_1 = require("./ServerQuit");
exports.ServerQuit = ServerQuit_1.default;
// endregion
// region 4.2 Channel operations
// 4.2.1 Join message
var ChannelJoin_1 = require("./ChannelJoin");
exports.ChannelJoin = ChannelJoin_1.default;
// 4.2.2 Part message
var ChannelPart_1 = require("./ChannelPart");
exports.ChannelPart = ChannelPart_1.default;
// 4.2.3 Mode message
var Mode_1 = require("./Mode");
exports.Mode = Mode_1.default;
// 4.2.4 Topic message
var Topic_1 = require("./Topic");
exports.Topic = Topic_1.default;
// 4.2.5 Names message
var Names_1 = require("./Names");
exports.Names = Names_1.default;
// 4.2.6 List message
var ChannelList_1 = require("./ChannelList");
exports.ChannelList = ChannelList_1.default;
// 4.2.7 Invite message
var ChannelInvite_1 = require("./ChannelInvite");
exports.ChannelInvite = ChannelInvite_1.default;
// 4.2.8 Kick message
var ChannelKick_1 = require("./ChannelKick");
exports.ChannelKick = ChannelKick_1.default;
// endregion
// region 4.3 Server queries and commands
// TODO
// endregion
// region 4.4 Sending messages
// 4.4.1 Private messages
var PrivateMessage_1 = require("./PrivateMessage");
exports.PrivateMessage = PrivateMessage_1.default;
// 4.4.2 Notice messages
var Notice_1 = require("./Notice");
exports.Notice = Notice_1.default;
// endregion
// region 4.5 User-based queries
// 4.5.1 Who query
var WhoQuery_1 = require("./WhoQuery");
exports.WhoQuery = WhoQuery_1.default;
// 4.5.2 Whois query
var WhoIsQuery_1 = require("./WhoIsQuery");
exports.WhoIsQuery = WhoIsQuery_1.default;
// 4.5.3 Whowas
var WhoWasQuery_1 = require("./WhoWasQuery");
exports.WhoWasQuery = WhoWasQuery_1.default;
// endregion
// region 4.6 Miscellaneous messages
// 4.6.1 Kill message
var Kill_1 = require("./Kill");
exports.Kill = Kill_1.default;
// 4.6.2 Ping message
var Ping_1 = require("./Ping");
exports.Ping = Ping_1.default;
// 4.6.3 Pong message
var Pong_1 = require("./Pong");
exports.Pong = Pong_1.default;
// 4.6.4 Error message
var ErrorMessage_1 = require("./ErrorMessage");
exports.ErrorMessage = ErrorMessage_1.default;
// endregion
// endregion
// region 5 Optionals
// 5.1 Away
var Away_1 = require("./Away");
exports.Away = Away_1.default;
// 5.2 Rehash message
var Rehash_1 = require("./Rehash");
exports.Rehash = Rehash_1.default;
// 5.3 Restart message
var Restart_1 = require("./Restart");
exports.Restart = Restart_1.default;
// 5.4 Summon message
// really, would anyone use that?
// 5.5 Users message
// would anyone WANT to have that? it seems like a huge security risk.
// 5.6 Operwall message
var WallopsMessage_1 = require("./WallopsMessage");
exports.Wallops = WallopsMessage_1.default;
// 5.7 Userhost message
var UserHostQuery_1 = require("./UserHostQuery");
exports.UserHostQuery = UserHostQuery_1.default;
// 5.8 Ison message
var IsOnQuery_1 = require("./IsOnQuery");
exports.IsOnQuery = IsOnQuery_1.default;
// endregion
// endregion
// region IRCv3
// Capability Negotiation
var CapabilityNegotiation_1 = require("./CapabilityNegotiation");
exports.CapabilityNegotiation = CapabilityNegotiation_1.default;
// endregion

},{"./Away":41,"./CapabilityNegotiation":42,"./ChannelInvite":43,"./ChannelJoin":44,"./ChannelKick":45,"./ChannelList":46,"./ChannelPart":47,"./ClientQuit":48,"./ErrorMessage":49,"./IsOnQuery":50,"./Kill":51,"./Mode":52,"./Names":53,"./NickChange":54,"./Notice":55,"./OperLogin":56,"./Password":57,"./Ping":58,"./Pong":59,"./PrivateMessage":60,"./Rehash":61,"./Restart":62,"./ServerQuit":63,"./Topic":64,"./UserHostQuery":65,"./UserRegistration":66,"./WallopsMessage":67,"./WhoIsQuery":68,"./WhoQuery":69,"./WhoWasQuery":70}],72:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error401NoSuchNick = /** @class */ (function (_super) {
    __extends(Error401NoSuchNick, _super);
    function Error401NoSuchNick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error401NoSuchNick.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error401NoSuchNick.prototype, "nick", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error401NoSuchNick.prototype, "suffix", void 0);
    Error401NoSuchNick = __decorate([
        MessageDefinition_1.MessageType('401')
    ], Error401NoSuchNick);
    return Error401NoSuchNick;
}(Message_1.default));
exports.default = Error401NoSuchNick;

},{"../../Message":37,"../../MessageDefinition":39}],73:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error403NoSuchChannel = /** @class */ (function (_super) {
    __extends(Error403NoSuchChannel, _super);
    function Error403NoSuchChannel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error403NoSuchChannel.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
        // channel type is wrong here - this numeric is also used for showing the user this is *not* a valid channel name
        // type: 'channel'
        })
    ], Error403NoSuchChannel.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error403NoSuchChannel.prototype, "suffix", void 0);
    Error403NoSuchChannel = __decorate([
        MessageDefinition_1.MessageType('403')
    ], Error403NoSuchChannel);
    return Error403NoSuchChannel;
}(Message_1.default));
exports.default = Error403NoSuchChannel;

},{"../../Message":37,"../../MessageDefinition":39}],74:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error404CanNotSendToChan = /** @class */ (function (_super) {
    __extends(Error404CanNotSendToChan, _super);
    function Error404CanNotSendToChan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error404CanNotSendToChan.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Error404CanNotSendToChan.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error404CanNotSendToChan.prototype, "suffix", void 0);
    Error404CanNotSendToChan = __decorate([
        MessageDefinition_1.MessageType('404')
    ], Error404CanNotSendToChan);
    return Error404CanNotSendToChan;
}(Message_1.default));
exports.default = Error404CanNotSendToChan;

},{"../../Message":37,"../../MessageDefinition":39}],75:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error421UnknownCommand = /** @class */ (function (_super) {
    __extends(Error421UnknownCommand, _super);
    function Error421UnknownCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error421UnknownCommand.prototype.isResponseTo = function (originalMessage) {
        return originalMessage.command === this.params.originalCommand;
    };
    Error421UnknownCommand.prototype.endsResponseTo = function (originalMessage) {
        return true;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error421UnknownCommand.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error421UnknownCommand.prototype, "originalCommand", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error421UnknownCommand.prototype, "suffix", void 0);
    Error421UnknownCommand = __decorate([
        MessageDefinition_1.MessageType('421')
    ], Error421UnknownCommand);
    return Error421UnknownCommand;
}(Message_1.default));
exports.default = Error421UnknownCommand;

},{"../../Message":37,"../../MessageDefinition":39}],76:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error422NoMOTD = /** @class */ (function (_super) {
    __extends(Error422NoMOTD, _super);
    function Error422NoMOTD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error422NoMOTD.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error422NoMOTD.prototype, "suffix", void 0);
    Error422NoMOTD = __decorate([
        MessageDefinition_1.MessageType('422')
    ], Error422NoMOTD);
    return Error422NoMOTD;
}(Message_1.default));
exports.default = Error422NoMOTD;

},{"../../Message":37,"../../MessageDefinition":39}],77:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error431NoNickNameGiven = /** @class */ (function (_super) {
    __extends(Error431NoNickNameGiven, _super);
    function Error431NoNickNameGiven() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error431NoNickNameGiven.prototype.isResponseTo = function (originalMessage) {
        return originalMessage.command === 'NICK';
    };
    Error431NoNickNameGiven.prototype.endsResponseTo = function (originalMessage) {
        return true;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error431NoNickNameGiven.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error431NoNickNameGiven.prototype, "suffix", void 0);
    Error431NoNickNameGiven = __decorate([
        MessageDefinition_1.MessageType('431')
    ], Error431NoNickNameGiven);
    return Error431NoNickNameGiven;
}(Message_1.default));
exports.default = Error431NoNickNameGiven;

},{"../../Message":37,"../../MessageDefinition":39}],78:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
// misspelt for historical reasons
var Error432ErroneusNickname = /** @class */ (function (_super) {
    __extends(Error432ErroneusNickname, _super);
    function Error432ErroneusNickname() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error432ErroneusNickname.prototype.isResponseTo = function (originalMessage) {
        return originalMessage.command === 'NICK';
    };
    Error432ErroneusNickname.prototype.endsResponseTo = function (originalMessage) {
        return true;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error432ErroneusNickname.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error432ErroneusNickname.prototype, "nick", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error432ErroneusNickname.prototype, "suffix", void 0);
    Error432ErroneusNickname = __decorate([
        MessageDefinition_1.MessageType('432')
    ], Error432ErroneusNickname);
    return Error432ErroneusNickname;
}(Message_1.default));
exports.default = Error432ErroneusNickname;

},{"../../Message":37,"../../MessageDefinition":39}],79:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error433NickNameInUse = /** @class */ (function (_super) {
    __extends(Error433NickNameInUse, _super);
    function Error433NickNameInUse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error433NickNameInUse.prototype.isResponseTo = function (originalMessage) {
        return originalMessage.command === 'NICK';
    };
    Error433NickNameInUse.prototype.endsResponseTo = function (originalMessage) {
        return true;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error433NickNameInUse.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error433NickNameInUse.prototype, "nick", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error433NickNameInUse.prototype, "suffix", void 0);
    Error433NickNameInUse = __decorate([
        MessageDefinition_1.MessageType('433')
    ], Error433NickNameInUse);
    return Error433NickNameInUse;
}(Message_1.default));
exports.default = Error433NickNameInUse;

},{"../../Message":37,"../../MessageDefinition":39}],80:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error436NickCollision = /** @class */ (function (_super) {
    __extends(Error436NickCollision, _super);
    function Error436NickCollision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error436NickCollision.prototype.isResponseTo = function (originalMessage) {
        return originalMessage.command === 'NICK';
    };
    Error436NickCollision.prototype.endsResponseTo = function (originalMessage) {
        return true;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error436NickCollision.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error436NickCollision.prototype, "nick", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error436NickCollision.prototype, "suffix", void 0);
    Error436NickCollision = __decorate([
        MessageDefinition_1.MessageType('436')
    ], Error436NickCollision);
    return Error436NickCollision;
}(Message_1.default));
exports.default = Error436NickCollision;

},{"../../Message":37,"../../MessageDefinition":39}],81:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error441UserNotInChannel = /** @class */ (function (_super) {
    __extends(Error441UserNotInChannel, _super);
    function Error441UserNotInChannel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error441UserNotInChannel.prototype.isResponseTo = function (originalMessage) {
        return originalMessage.command === 'NICK';
    };
    Error441UserNotInChannel.prototype.endsResponseTo = function (originalMessage) {
        return true;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error441UserNotInChannel.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error441UserNotInChannel.prototype, "nick", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Error441UserNotInChannel.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error441UserNotInChannel.prototype, "suffix", void 0);
    Error441UserNotInChannel = __decorate([
        MessageDefinition_1.MessageType('441')
    ], Error441UserNotInChannel);
    return Error441UserNotInChannel;
}(Message_1.default));
exports.default = Error441UserNotInChannel;

},{"../../Message":37,"../../MessageDefinition":39}],82:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error442NotOnChannel = /** @class */ (function (_super) {
    __extends(Error442NotOnChannel, _super);
    function Error442NotOnChannel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error442NotOnChannel.prototype.isResponseTo = function (originalMessage) {
        return originalMessage.command === 'NICK';
    };
    Error442NotOnChannel.prototype.endsResponseTo = function (originalMessage) {
        return true;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error442NotOnChannel.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Error442NotOnChannel.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error442NotOnChannel.prototype, "suffix", void 0);
    Error442NotOnChannel = __decorate([
        MessageDefinition_1.MessageType('442')
    ], Error442NotOnChannel);
    return Error442NotOnChannel;
}(Message_1.default));
exports.default = Error442NotOnChannel;

},{"../../Message":37,"../../MessageDefinition":39}],83:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error443UserOnChannel = /** @class */ (function (_super) {
    __extends(Error443UserOnChannel, _super);
    function Error443UserOnChannel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error443UserOnChannel.prototype.isResponseTo = function (originalMessage) {
        return originalMessage.command === 'NICK';
    };
    Error443UserOnChannel.prototype.endsResponseTo = function (originalMessage) {
        return true;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error443UserOnChannel.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error443UserOnChannel.prototype, "nick", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Error443UserOnChannel.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error443UserOnChannel.prototype, "suffix", void 0);
    Error443UserOnChannel = __decorate([
        MessageDefinition_1.MessageType('443')
    ], Error443UserOnChannel);
    return Error443UserOnChannel;
}(Message_1.default));
exports.default = Error443UserOnChannel;

},{"../../Message":37,"../../MessageDefinition":39}],84:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error451NotRegistered = /** @class */ (function (_super) {
    __extends(Error451NotRegistered, _super);
    function Error451NotRegistered() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error451NotRegistered.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error451NotRegistered.prototype, "suffix", void 0);
    Error451NotRegistered = __decorate([
        MessageDefinition_1.MessageType('451')
    ], Error451NotRegistered);
    return Error451NotRegistered;
}(Message_1.default));
exports.default = Error451NotRegistered;

},{"../../Message":37,"../../MessageDefinition":39}],85:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error461NeedMoreParams = /** @class */ (function (_super) {
    __extends(Error461NeedMoreParams, _super);
    function Error461NeedMoreParams() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error461NeedMoreParams.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error461NeedMoreParams.prototype, "originalCommand", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error461NeedMoreParams.prototype, "suffix", void 0);
    Error461NeedMoreParams = __decorate([
        MessageDefinition_1.MessageType('461')
    ], Error461NeedMoreParams);
    return Error461NeedMoreParams;
}(Message_1.default));
exports.default = Error461NeedMoreParams;

},{"../../Message":37,"../../MessageDefinition":39}],86:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error462AlreadyRegistered = /** @class */ (function (_super) {
    __extends(Error462AlreadyRegistered, _super);
    function Error462AlreadyRegistered() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error462AlreadyRegistered.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error462AlreadyRegistered.prototype, "suffix", void 0);
    Error462AlreadyRegistered = __decorate([
        MessageDefinition_1.MessageType('462')
    ], Error462AlreadyRegistered);
    return Error462AlreadyRegistered;
}(Message_1.default));
exports.default = Error462AlreadyRegistered;

},{"../../Message":37,"../../MessageDefinition":39}],87:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error472UnknownMode = /** @class */ (function (_super) {
    __extends(Error472UnknownMode, _super);
    function Error472UnknownMode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error472UnknownMode.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error472UnknownMode.prototype, "char", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error472UnknownMode.prototype, "suffix", void 0);
    Error472UnknownMode = __decorate([
        MessageDefinition_1.MessageType('472')
    ], Error472UnknownMode);
    return Error472UnknownMode;
}(Message_1.default));
exports.default = Error472UnknownMode;

},{"../../Message":37,"../../MessageDefinition":39}],88:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error473InviteOnlyChan = /** @class */ (function (_super) {
    __extends(Error473InviteOnlyChan, _super);
    function Error473InviteOnlyChan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error473InviteOnlyChan.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error473InviteOnlyChan.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error473InviteOnlyChan.prototype, "suffix", void 0);
    Error473InviteOnlyChan = __decorate([
        MessageDefinition_1.MessageType('473')
    ], Error473InviteOnlyChan);
    return Error473InviteOnlyChan;
}(Message_1.default));
exports.default = Error473InviteOnlyChan;

},{"../../Message":37,"../../MessageDefinition":39}],89:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error482ChanOPrivsNeeded = /** @class */ (function (_super) {
    __extends(Error482ChanOPrivsNeeded, _super);
    function Error482ChanOPrivsNeeded() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error482ChanOPrivsNeeded.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error482ChanOPrivsNeeded.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error482ChanOPrivsNeeded.prototype, "suffix", void 0);
    Error482ChanOPrivsNeeded = __decorate([
        MessageDefinition_1.MessageType('482')
    ], Error482ChanOPrivsNeeded);
    return Error482ChanOPrivsNeeded;
}(Message_1.default));
exports.default = Error482ChanOPrivsNeeded;

},{"../../Message":37,"../../MessageDefinition":39}],90:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error501UModeUnknownFlag = /** @class */ (function (_super) {
    __extends(Error501UModeUnknownFlag, _super);
    function Error501UModeUnknownFlag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error501UModeUnknownFlag.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error501UModeUnknownFlag.prototype, "suffix", void 0);
    Error501UModeUnknownFlag = __decorate([
        MessageDefinition_1.MessageType('501')
    ], Error501UModeUnknownFlag);
    return Error501UModeUnknownFlag;
}(Message_1.default));
exports.default = Error501UModeUnknownFlag;

},{"../../Message":37,"../../MessageDefinition":39}],91:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Error502UsersDontMatch = /** @class */ (function (_super) {
    __extends(Error502UsersDontMatch, _super);
    function Error502UsersDontMatch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Error502UsersDontMatch.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Error502UsersDontMatch.prototype, "suffix", void 0);
    Error502UsersDontMatch = __decorate([
        MessageDefinition_1.MessageType('502')
    ], Error502UsersDontMatch);
    return Error502UsersDontMatch;
}(Message_1.default));
exports.default = Error502UsersDontMatch;

},{"../../Message":37,"../../MessageDefinition":39}],92:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply001Welcome = /** @class */ (function (_super) {
    __extends(Reply001Welcome, _super);
    function Reply001Welcome() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply001Welcome.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply001Welcome.prototype, "welcomeText", void 0);
    Reply001Welcome = __decorate([
        MessageDefinition_1.MessageType('001')
    ], Reply001Welcome);
    return Reply001Welcome;
}(Message_1.default));
exports.default = Reply001Welcome;

},{"../../Message":37,"../../MessageDefinition":39}],93:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply002YourHost = /** @class */ (function (_super) {
    __extends(Reply002YourHost, _super);
    function Reply002YourHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply002YourHost.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply002YourHost.prototype, "yourHost", void 0);
    Reply002YourHost = __decorate([
        MessageDefinition_1.MessageType('002')
    ], Reply002YourHost);
    return Reply002YourHost;
}(Message_1.default));
exports.default = Reply002YourHost;

},{"../../Message":37,"../../MessageDefinition":39}],94:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply003Created = /** @class */ (function (_super) {
    __extends(Reply003Created, _super);
    function Reply003Created() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply003Created.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply003Created.prototype, "createdText", void 0);
    Reply003Created = __decorate([
        MessageDefinition_1.MessageType('003')
    ], Reply003Created);
    return Reply003Created;
}(Message_1.default));
exports.default = Reply003Created;

},{"../../Message":37,"../../MessageDefinition":39}],95:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply004ServerInfo = /** @class */ (function (_super) {
    __extends(Reply004ServerInfo, _super);
    function Reply004ServerInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply004ServerInfo.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply004ServerInfo.prototype, "serverName", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply004ServerInfo.prototype, "version", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply004ServerInfo.prototype, "userModes", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply004ServerInfo.prototype, "channelModes", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            optional: true
        })
    ], Reply004ServerInfo.prototype, "channelModesWithParam", void 0);
    Reply004ServerInfo = __decorate([
        MessageDefinition_1.MessageType('004')
    ], Reply004ServerInfo);
    return Reply004ServerInfo;
}(Message_1.default));
exports.default = Reply004ServerInfo;

},{"../../Message":37,"../../MessageDefinition":39}],96:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply005ISupport = /** @class */ (function (_super) {
    __extends(Reply005ISupport, _super);
    function Reply005ISupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply005ISupport.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            rest: true
        })
    ], Reply005ISupport.prototype, "supports", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply005ISupport.prototype, "suffix", void 0);
    Reply005ISupport = __decorate([
        MessageDefinition_1.MessageType('005')
    ], Reply005ISupport);
    return Reply005ISupport;
}(Message_1.default));
exports.default = Reply005ISupport;

},{"../../Message":37,"../../MessageDefinition":39}],97:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply221UModeIs = /** @class */ (function (_super) {
    __extends(Reply221UModeIs, _super);
    function Reply221UModeIs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply221UModeIs.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply221UModeIs.prototype, "modes", void 0);
    Reply221UModeIs = __decorate([
        MessageDefinition_1.MessageType('221')
    ], Reply221UModeIs);
    return Reply221UModeIs;
}(Message_1.default));
exports.default = Reply221UModeIs;

},{"../../Message":37,"../../MessageDefinition":39}],98:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply324ChannelModeIs = /** @class */ (function (_super) {
    __extends(Reply324ChannelModeIs, _super);
    function Reply324ChannelModeIs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply324ChannelModeIs.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Reply324ChannelModeIs.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            rest: true
        })
    ], Reply324ChannelModeIs.prototype, "modes", void 0);
    Reply324ChannelModeIs = __decorate([
        MessageDefinition_1.MessageType('324')
    ], Reply324ChannelModeIs);
    return Reply324ChannelModeIs;
}(Message_1.default));
exports.default = Reply324ChannelModeIs;

},{"../../Message":37,"../../MessageDefinition":39}],99:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply331NoTopic = /** @class */ (function (_super) {
    __extends(Reply331NoTopic, _super);
    function Reply331NoTopic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply331NoTopic.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Reply331NoTopic.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply331NoTopic.prototype, "suffix", void 0);
    Reply331NoTopic = __decorate([
        MessageDefinition_1.MessageType('331')
    ], Reply331NoTopic);
    return Reply331NoTopic;
}(Message_1.default));
exports.default = Reply331NoTopic;

},{"../../Message":37,"../../MessageDefinition":39}],100:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply332Topic = /** @class */ (function (_super) {
    __extends(Reply332Topic, _super);
    function Reply332Topic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply332Topic.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Reply332Topic.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply332Topic.prototype, "topic", void 0);
    Reply332Topic = __decorate([
        MessageDefinition_1.MessageType('332')
    ], Reply332Topic);
    return Reply332Topic;
}(Message_1.default));
exports.default = Reply332Topic;

},{"../../Message":37,"../../MessageDefinition":39}],101:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply333TopicWhoTime = /** @class */ (function (_super) {
    __extends(Reply333TopicWhoTime, _super);
    function Reply333TopicWhoTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply333TopicWhoTime.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Reply333TopicWhoTime.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply333TopicWhoTime.prototype, "who", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply333TopicWhoTime.prototype, "ts", void 0);
    Reply333TopicWhoTime = __decorate([
        MessageDefinition_1.MessageType('333')
    ], Reply333TopicWhoTime);
    return Reply333TopicWhoTime;
}(Message_1.default));
exports.default = Reply333TopicWhoTime;

},{"../../Message":37,"../../MessageDefinition":39}],102:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply341Inviting = /** @class */ (function (_super) {
    __extends(Reply341Inviting, _super);
    function Reply341Inviting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply341Inviting.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply341Inviting.prototype, "nick", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Reply341Inviting.prototype, "channel", void 0);
    Reply341Inviting = __decorate([
        MessageDefinition_1.MessageType('341')
    ], Reply341Inviting);
    return Reply341Inviting;
}(Message_1.default));
exports.default = Reply341Inviting;

},{"../../Message":37,"../../MessageDefinition":39}],103:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var Names_1 = require("../Commands/Names");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply353NamesReply = /** @class */ (function (_super) {
    __extends(Reply353NamesReply, _super);
    function Reply353NamesReply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reply353NamesReply.prototype.isResponseTo = function (originalMessage) {
        return originalMessage instanceof Names_1.default;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply353NamesReply.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply353NamesReply.prototype, "channelType", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Reply353NamesReply.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply353NamesReply.prototype, "names", void 0);
    Reply353NamesReply = __decorate([
        MessageDefinition_1.MessageType('353')
    ], Reply353NamesReply);
    return Reply353NamesReply;
}(Message_1.default));
exports.default = Reply353NamesReply;

},{"../../Message":37,"../../MessageDefinition":39,"../Commands/Names":53}],104:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var Names_1 = require("../Commands/Names");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply366EndOfNames = /** @class */ (function (_super) {
    __extends(Reply366EndOfNames, _super);
    function Reply366EndOfNames() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reply366EndOfNames.prototype.isResponseTo = function (originalMessage) {
        return originalMessage instanceof Names_1.default;
    };
    Reply366EndOfNames.prototype.endsResponseTo = function (originalMessage) {
        return true;
    };
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply366EndOfNames.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            type: 'channel'
        })
    ], Reply366EndOfNames.prototype, "channel", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply366EndOfNames.prototype, "suffix", void 0);
    Reply366EndOfNames = __decorate([
        MessageDefinition_1.MessageType('366')
    ], Reply366EndOfNames);
    return Reply366EndOfNames;
}(Message_1.default));
exports.default = Reply366EndOfNames;

},{"../../Message":37,"../../MessageDefinition":39,"../Commands/Names":53}],105:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply372MOTD = /** @class */ (function (_super) {
    __extends(Reply372MOTD, _super);
    function Reply372MOTD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply372MOTD.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply372MOTD.prototype, "line", void 0);
    Reply372MOTD = __decorate([
        MessageDefinition_1.MessageType('372')
    ], Reply372MOTD);
    return Reply372MOTD;
}(Message_1.default));
exports.default = Reply372MOTD;

},{"../../Message":37,"../../MessageDefinition":39}],106:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply375MOTDStart = /** @class */ (function (_super) {
    __extends(Reply375MOTDStart, _super);
    function Reply375MOTDStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply375MOTDStart.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply375MOTDStart.prototype, "message", void 0);
    Reply375MOTDStart = __decorate([
        MessageDefinition_1.MessageType('375')
    ], Reply375MOTDStart);
    return Reply375MOTDStart;
}(Message_1.default));
exports.default = Reply375MOTDStart;

},{"../../Message":37,"../../MessageDefinition":39}],107:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Message");
var MessageDefinition_1 = require("../../MessageDefinition");
var Reply376EndOfMOTD = /** @class */ (function (_super) {
    __extends(Reply376EndOfMOTD, _super);
    function Reply376EndOfMOTD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        MessageDefinition_1.MessageParamDefinition({})
    ], Reply376EndOfMOTD.prototype, "me", void 0);
    __decorate([
        MessageDefinition_1.MessageParamDefinition({
            trailing: true
        })
    ], Reply376EndOfMOTD.prototype, "suffix", void 0);
    Reply376EndOfMOTD = __decorate([
        MessageDefinition_1.MessageType('376')
    ], Reply376EndOfMOTD);
    return Reply376EndOfMOTD;
}(Message_1.default));
exports.default = Reply376EndOfMOTD;

},{"../../Message":37,"../../MessageDefinition":39}],108:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reply001Welcome_1 = require("./Reply001Welcome");
exports.Reply001Welcome = Reply001Welcome_1.default;
var Reply002YourHost_1 = require("./Reply002YourHost");
exports.Reply002YourHost = Reply002YourHost_1.default;
var Reply003Created_1 = require("./Reply003Created");
exports.Reply003Created = Reply003Created_1.default;
var Reply004ServerInfo_1 = require("./Reply004ServerInfo");
exports.Reply004ServerInfo = Reply004ServerInfo_1.default;
var Reply005ISupport_1 = require("./Reply005ISupport");
exports.Reply005ISupport = Reply005ISupport_1.default;
var Reply221UModeIs_1 = require("./Reply221UModeIs");
exports.Reply221UModeIs = Reply221UModeIs_1.default;
var Reply324ChannelModeIs_1 = require("./Reply324ChannelModeIs");
exports.Reply324ChannelModeIs = Reply324ChannelModeIs_1.default;
var Reply331NoTopic_1 = require("./Reply331NoTopic");
exports.Reply331NoTopic = Reply331NoTopic_1.default;
var Reply332Topic_1 = require("./Reply332Topic");
exports.Reply332Topic = Reply332Topic_1.default;
var Reply333TopicWhoTime_1 = require("./Reply333TopicWhoTime");
exports.Reply333TopicWhoTime = Reply333TopicWhoTime_1.default;
var Reply341Inviting_1 = require("./Reply341Inviting");
exports.Reply341Inviting = Reply341Inviting_1.default;
var Reply353NamesReply_1 = require("./Reply353NamesReply");
exports.Reply353NamesReply = Reply353NamesReply_1.default;
var Reply366EndOfNames_1 = require("./Reply366EndOfNames");
exports.Reply366EndOfNames = Reply366EndOfNames_1.default;
var Reply372MOTD_1 = require("./Reply372MOTD");
exports.Reply372MOTD = Reply372MOTD_1.default;
var Reply375MOTDStart_1 = require("./Reply375MOTDStart");
exports.Reply375MOTDStart = Reply375MOTDStart_1.default;
var Reply376EndOfMOTD_1 = require("./Reply376EndOfMOTD");
exports.Reply376EndOfMOTD = Reply376EndOfMOTD_1.default;
var Error401NoSuchNick_1 = require("./Error401NoSuchNick");
exports.Error401NoSuchNick = Error401NoSuchNick_1.default;
var Error403NoSuchChannel_1 = require("./Error403NoSuchChannel");
exports.Error403NoSuchChannel = Error403NoSuchChannel_1.default;
var Error404CanNotSendToChan_1 = require("./Error404CanNotSendToChan");
exports.Error404CanNotSendToChan = Error404CanNotSendToChan_1.default;
var Error421UnknownCommand_1 = require("./Error421UnknownCommand");
exports.Error421UnknownCommand = Error421UnknownCommand_1.default;
var Error422NoMOTD_1 = require("./Error422NoMOTD");
exports.Error422NoMOTD = Error422NoMOTD_1.default;
var Error431NoNickNameGiven_1 = require("./Error431NoNickNameGiven");
exports.Error431NoNickNameGiven = Error431NoNickNameGiven_1.default;
var Error432ErroneusNickname_1 = require("./Error432ErroneusNickname");
exports.Error432ErroneusNickname = Error432ErroneusNickname_1.default;
var Error433NickNameInUse_1 = require("./Error433NickNameInUse");
exports.Error433NickNameInUse = Error433NickNameInUse_1.default;
var Error436NickCollision_1 = require("./Error436NickCollision");
exports.Error436NickCollision = Error436NickCollision_1.default;
var Error441UserNotInChannel_1 = require("./Error441UserNotInChannel");
exports.Error441UserNotInChannel = Error441UserNotInChannel_1.default;
var Error442NotOnChannel_1 = require("./Error442NotOnChannel");
exports.Error442NotOnChannel = Error442NotOnChannel_1.default;
var Error443UserOnChannel_1 = require("./Error443UserOnChannel");
exports.Error443UserOnChannel = Error443UserOnChannel_1.default;
var Error451NotRegistered_1 = require("./Error451NotRegistered");
exports.Error451NotRegistered = Error451NotRegistered_1.default;
var Error461NeedMoreParams_1 = require("./Error461NeedMoreParams");
exports.Error461NeedMoreParams = Error461NeedMoreParams_1.default;
var Error462AlreadyRegistered_1 = require("./Error462AlreadyRegistered");
exports.Error462AlreadyRegistered = Error462AlreadyRegistered_1.default;
var Error472UnknownMode_1 = require("./Error472UnknownMode");
exports.Error472UnknownMode = Error472UnknownMode_1.default;
var Error473InviteOnlyChan_1 = require("./Error473InviteOnlyChan");
exports.Error473InviteOnlyChan = Error473InviteOnlyChan_1.default;
var Error482ChanOPrivsNeeded_1 = require("./Error482ChanOPrivsNeeded");
exports.Error482ChanOPrivsNeeded = Error482ChanOPrivsNeeded_1.default;
var Error501UModeUnknownFlag_1 = require("./Error501UModeUnknownFlag");
exports.Error501UModeUnknownFlag = Error501UModeUnknownFlag_1.default;
var Error502UsersDontMatch_1 = require("./Error502UsersDontMatch");
exports.Error502UsersDontMatch = Error502UsersDontMatch_1.default;

},{"./Error401NoSuchNick":72,"./Error403NoSuchChannel":73,"./Error404CanNotSendToChan":74,"./Error421UnknownCommand":75,"./Error422NoMOTD":76,"./Error431NoNickNameGiven":77,"./Error432ErroneusNickname":78,"./Error433NickNameInUse":79,"./Error436NickCollision":80,"./Error441UserNotInChannel":81,"./Error442NotOnChannel":82,"./Error443UserOnChannel":83,"./Error451NotRegistered":84,"./Error461NeedMoreParams":85,"./Error462AlreadyRegistered":86,"./Error472UnknownMode":87,"./Error473InviteOnlyChan":88,"./Error482ChanOPrivsNeeded":89,"./Error501UModeUnknownFlag":90,"./Error502UsersDontMatch":91,"./Reply001Welcome":92,"./Reply002YourHost":93,"./Reply003Created":94,"./Reply004ServerInfo":95,"./Reply005ISupport":96,"./Reply221UModeIs":97,"./Reply324ChannelModeIs":98,"./Reply331NoTopic":99,"./Reply332Topic":100,"./Reply333TopicWhoTime":101,"./Reply341Inviting":102,"./Reply353NamesReply":103,"./Reply366EndOfNames":104,"./Reply372MOTD":105,"./Reply375MOTDStart":106,"./Reply376EndOfMOTD":107}],109:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Commands = require("./Commands");
exports.Commands = Commands;
var Numerics = require("./Numerics");
exports.Numerics = Numerics;
exports.all = new Map(__spread(Object.values(Commands), Object.values(Numerics)).map(function (cmd) { return [cmd.COMMAND, cmd]; }));

},{"./Commands":71,"./Numerics":108}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// sane defaults based on RFC 1459
exports.defaultServerProperties = {
    channelTypes: '#&',
    supportedUserModes: 'iwso',
    supportedChannelModes: {
        prefix: 'ov',
        list: 'b',
        alwaysWithParam: 'ovk',
        paramWhenSet: 'l',
        noParam: 'imnpst'
    },
    prefixes: [
        {
            modeChar: 'v',
            prefix: '+'
        },
        {
            modeChar: 'o',
            prefix: '@'
        }
    ]
};

},{}],111:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @private */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NonEnumerable(target, key) {
    // first property defined in prototype, that's why we use getters/setters
    // (otherwise assignment in object will override property in prototype)
    Object.defineProperty(target, key, {
        get: function () {
            return;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set: function (val) {
            // here we have a reference to the instance and can set property directly to it
            Object.defineProperty(this, key, {
                value: val,
                writable: true,
                enumerable: false
            });
        },
        enumerable: false
    });
}
exports.NonEnumerable = NonEnumerable;

},{}],112:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @private */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
var ObjectTools = /** @class */ (function () {
    function ObjectTools() {
    }
    ObjectTools.map = function (obj, fn) {
        var mapped = Object.entries(obj).map(
        // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
        function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            var _c;
            return (_c = {}, _c[key] = fn(value, key), _c);
        });
        return Object.assign.apply(Object, __spread([{}], mapped));
    };
    ObjectTools.keys = function (o) {
        return Object.keys(o);
    };
    ObjectTools.indexBy = function (arr, keyFn) {
        if (typeof keyFn !== 'function') {
            var key_1 = keyFn;
            keyFn = (function (value) { return value[key_1].toString(); });
        }
        return this.fromArray(arr, function (val) {
            var _a;
            return (_a = {}, _a[keyFn(val)] = val, _a);
        });
    };
    ObjectTools.fromArray = function (arr, fn) {
        return Object.assign.apply(Object, __spread([{}], arr.map(fn)));
    };
    ObjectTools.forEach = function (obj, fn) {
        Object.entries(obj).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return fn(value, key);
        });
    };
    return ObjectTools;
}());
exports.default = ObjectTools;

},{}],113:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-require-imports
var escapeRegexString = require("escape-string-regexp");
exports.escapeRegexString = escapeRegexString;
function sanitizeParameter(param, spaceAllowed) {
    if (spaceAllowed === void 0) { spaceAllowed = false; }
    if (spaceAllowed) {
        return param.replace(/[\0\r\n]/g, '');
    }
    else {
        return param.replace(/[\0\r\n ]/g, '');
    }
}
exports.sanitizeParameter = sanitizeParameter;
function padLeft(str, length, padding) {
    if (typeof str === 'number') {
        str = str.toString();
    }
    length = length - str.length;
    if (length <= 0) {
        return str;
    }
    if (padding === undefined) {
        padding = ' ';
    }
    var paddingStr = '';
    do {
        /* eslint-disable no-bitwise */
        if ((length & 1) === 1) {
            paddingStr += padding;
        }
        length >>= 1;
        if (length) {
            padding += padding;
        }
        /* eslint-enable no-bitwise */
    } while (length);
    return paddingStr + str;
}
exports.padLeft = padLeft;
function isChannel(str, validTypes) {
    if (validTypes === void 0) { validTypes = '#&'; }
    var re = new RegExp("^[" + escapeRegexString(validTypes) + "][^ \b\0\n\r,]+$");
    return re.test(str);
}
exports.isChannel = isChannel;
var ctcpEscapeMap = {
    0: '\0',
    n: '\n',
    r: '\r',
    '\x10': '\x10'
};
function splitWithLimit(str, delim, count) {
    var parts = str.split(delim);
    if (parts.length <= count) {
        return parts;
    }
    return __spread(parts.slice(0, count - 1), [parts.slice(count - 1).join(delim)]);
}
exports.splitWithLimit = splitWithLimit;
function decodeCtcp(message) {
    if (message[0] !== '\x01') {
        // this is not a CTCP message
        return false;
    }
    message = message.substring(1);
    // remove trailing \x01 if present
    if (message.slice(-1) === '\x01') {
        message = message.slice(0, -1);
    }
    if (!message) {
        // completely empty CTCPs don't exist either, I think
        return false;
    }
    // unescape weirdly escaped stuff
    message = message.replace(/\x10(.)/, function (_, escapedChar) {
        return escapedChar in ctcpEscapeMap ? ctcpEscapeMap[escapedChar] : '';
    });
    var _a = __read(splitWithLimit(message, ' ', 2), 2), command = _a[0], _b = _a[1], params = _b === void 0 ? '' : _b;
    command = command ? command.toUpperCase() : '';
    return { command: command, params: params };
}
exports.decodeCtcp = decodeCtcp;

},{"escape-string-regexp":20}],114:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("./Message/Message");
exports.Message = Message_1.default;
exports.prefixToString = Message_1.prefixToString;
var MessageTypes = require("./Message/MessageTypes");
exports.MessageTypes = MessageTypes;
var CoreCapabilities = require("./Capability/CoreCapabilities");
exports.CoreCapabilities = CoreCapabilities;
var StringTools_1 = require("./Toolkit/StringTools");
exports.isChannel = StringTools_1.isChannel;
var IRCClient_1 = require("./IRCClient");
exports.default = IRCClient_1.default;
var MessageParser_1 = require("./Message/MessageParser");
exports.parseMessage = MessageParser_1.parseMessage;
exports.parsePrefix = MessageParser_1.parsePrefix;
exports.parseTags = MessageParser_1.parseTags;
var ServerProperties_1 = require("./ServerProperties");
exports.defaultServerProperties = ServerProperties_1.defaultServerProperties;
var MessageError_1 = require("./Errors/MessageError");
exports.MessageError = MessageError_1.default;
var NotEnoughParametersError_1 = require("./Errors/NotEnoughParametersError");
exports.NotEnoughParametersError = NotEnoughParametersError_1.default;
var ParameterRequirementMismatchError_1 = require("./Errors/ParameterRequirementMismatchError");
exports.ParameterRequirementMismatchError = ParameterRequirementMismatchError_1.default;
var UnknownChannelModeCharError_1 = require("./Errors/UnknownChannelModeCharError");
exports.UnknownChannelModeCharError = UnknownChannelModeCharError_1.default;
var MessageDefinition_1 = require("./Message/MessageDefinition");
exports.MessageType = MessageDefinition_1.MessageType;
exports.MessageParamDefinition = MessageDefinition_1.MessageParamDefinition;

},{"./Capability/CoreCapabilities":28,"./Errors/MessageError":32,"./Errors/NotEnoughParametersError":33,"./Errors/ParameterRequirementMismatchError":34,"./Errors/UnknownChannelModeCharError":35,"./IRCClient":36,"./Message/Message":37,"./Message/MessageDefinition":39,"./Message/MessageParser":40,"./Message/MessageTypes":109,"./ServerProperties":110,"./Toolkit/StringTools":113}],115:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],116:[function(require,module,exports){
'use strict';
module.exports = {
	stdout: false,
	stderr: false
};

},{}],117:[function(require,module,exports){
(function (global){
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function (m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/** @private */
var ClearChat = /** @class */ (function (_super) {
    tslib_1.__extends(ClearChat, _super);
    function ClearChat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], ClearChat.prototype, "channel", void 0);
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            trailing: true,
            optional: true
        })
    ], ClearChat.prototype, "user", void 0);
    ClearChat = tslib_1.__decorate([
        ircv3_1.MessageType('CLEARCHAT')
    ], ClearChat);
    return ClearChat;
}(ircv3_1.Message));
exports.default = ClearChat;

},{"ircv3":114,"tslib":117}],119:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
// this command has no *useful* parameters, all information is in tags
/** @private */
var HostTarget = /** @class */ (function (_super) {
    tslib_1.__extends(HostTarget, _super);
    function HostTarget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], HostTarget.prototype, "channel", void 0);
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            trailing: true
        })
    ], HostTarget.prototype, "targetAndViewers", void 0);
    HostTarget = tslib_1.__decorate([
        ircv3_1.MessageType('HOSTTARGET')
    ], HostTarget);
    return HostTarget;
}(ircv3_1.Message));
exports.default = HostTarget;

},{"ircv3":114,"tslib":117}],120:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/** @private */
var Reconnect = /** @class */ (function (_super) {
    tslib_1.__extends(Reconnect, _super);
    function Reconnect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reconnect.COMMAND = 'RECONNECT';
    return Reconnect;
}(ircv3_1.Message));
exports.default = Reconnect;

},{"ircv3":114,"tslib":117}],121:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/** @private */
var RoomState = /** @class */ (function (_super) {
    tslib_1.__extends(RoomState, _super);
    function RoomState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], RoomState.prototype, "channel", void 0);
    RoomState = tslib_1.__decorate([
        ircv3_1.MessageType('ROOMSTATE')
    ], RoomState);
    return RoomState;
}(ircv3_1.Message));
exports.default = RoomState;

},{"ircv3":114,"tslib":117}],122:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
var ChatUser_1 = require("../../../ChatUser");
var ChatTools_1 = require("../../../Toolkit/ChatTools");
/** @private */
var UserNotice = /** @class */ (function (_super) {
    tslib_1.__extends(UserNotice, _super);
    function UserNotice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UserNotice.prototype, "userInfo", {
        get: function () {
            return new ChatUser_1.default(this._prefix.nick, this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserNotice.prototype, "emoteOffsets", {
        get: function () {
            if (!this._tags) {
                return new Map();
            }
            return ChatTools_1.parseEmotes(this._tags.get('emotes'));
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], UserNotice.prototype, "channel", void 0);
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            trailing: true,
            optional: true
        })
    ], UserNotice.prototype, "message", void 0);
    UserNotice = tslib_1.__decorate([
        ircv3_1.MessageType('USERNOTICE')
    ], UserNotice);
    return UserNotice;
}(ircv3_1.Message));
exports.default = UserNotice;

},{"../../../ChatUser":131,"../../../Toolkit/ChatTools":133,"ircv3":114,"tslib":117}],123:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/** @private */
var UserState = /** @class */ (function (_super) {
    tslib_1.__extends(UserState, _super);
    function UserState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], UserState.prototype, "type", void 0);
    UserState = tslib_1.__decorate([
        ircv3_1.MessageType('USERSTATE')
    ], UserState);
    return UserState;
}(ircv3_1.Message));
exports.default = UserState;

},{"ircv3":114,"tslib":117}],124:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
var ChatUser_1 = require("../../../ChatUser");
var ChatTools_1 = require("../../../Toolkit/ChatTools");
/** @private */
var Whisper = /** @class */ (function (_super) {
    tslib_1.__extends(Whisper, _super);
    function Whisper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Whisper.prototype, "userInfo", {
        get: function () {
            return new ChatUser_1.default(this._prefix.nick, this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Whisper.prototype, "emoteOffsets", {
        get: function () {
            if (!this._tags) {
                return new Map();
            }
            return ChatTools_1.parseEmotes(this._tags.get('emotes'));
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition()
    ], Whisper.prototype, "target", void 0);
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            trailing: true,
            optional: true
        })
    ], Whisper.prototype, "message", void 0);
    Whisper = tslib_1.__decorate([
        ircv3_1.MessageType('WHISPER')
    ], Whisper);
    return Whisper;
}(ircv3_1.Message));
exports.default = Whisper;

},{"../../../ChatUser":131,"../../../Toolkit/ChatTools":133,"ircv3":114,"tslib":117}],125:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClearChat_1 = require("./MessageTypes/ClearChat");
var HostTarget_1 = require("./MessageTypes/HostTarget");
var Reconnect_1 = require("./MessageTypes/Reconnect");
var RoomState_1 = require("./MessageTypes/RoomState");
var UserNotice_1 = require("./MessageTypes/UserNotice");
var UserState_1 = require("./MessageTypes/UserState");
var Whisper_1 = require("./MessageTypes/Whisper");
/** @private */
var TwitchCommandsCapability = {
    name: 'twitch.tv/commands',
    messageTypes: [ClearChat_1.default, HostTarget_1.default, Reconnect_1.default, RoomState_1.default, UserNotice_1.default, UserState_1.default, Whisper_1.default]
};
exports.default = TwitchCommandsCapability;

},{"./MessageTypes/ClearChat":118,"./MessageTypes/HostTarget":119,"./MessageTypes/Reconnect":120,"./MessageTypes/RoomState":121,"./MessageTypes/UserNotice":122,"./MessageTypes/UserState":123,"./MessageTypes/Whisper":124}],126:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This capability just enables standard IRC commands that Twitch chose to disable by default.
 * It has no message types on its own.
 *
 * @private
 */
var TwitchMembershipCapability = {
    name: 'twitch.tv/membership'
};
exports.default = TwitchMembershipCapability;

},{}],127:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/**
 * @private
 */
var ClearMsg = /** @class */ (function (_super) {
    tslib_1.__extends(ClearMsg, _super);
    function ClearMsg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ClearMsg.prototype, "userName", {
        get: function () {
            return this._tags.get('login');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClearMsg.prototype, "targetMessageId", {
        get: function () {
            return this._tags.get('target-msg-id');
        },
        enumerable: true,
        configurable: true
    });
    ClearMsg.COMMAND = 'CLEARMSG';
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            type: 'channel'
        })
    ], ClearMsg.prototype, "channel", void 0);
    tslib_1.__decorate([
        ircv3_1.MessageParamDefinition({
            trailing: true
        })
    ], ClearMsg.prototype, "message", void 0);
    return ClearMsg;
}(ircv3_1.Message));
exports.default = ClearMsg;

},{"ircv3":114,"tslib":117}],128:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ircv3_1 = require("ircv3");
/**
 * This command has no parameters, all information is in tags.
 *
 * @private
 */
var GlobalUserState = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalUserState, _super);
    function GlobalUserState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalUserState.COMMAND = 'GLOBALUSERSTATE';
    return GlobalUserState;
}(ircv3_1.Message));
exports.default = GlobalUserState;

},{"ircv3":114,"tslib":117}],129:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClearMsg_1 = require("./MessageTypes/ClearMsg");
var GlobalUserState_1 = require("./MessageTypes/GlobalUserState");
/**
 * This capability mostly just adds tags to existing commands.
 *
 * @private
 */
var TwitchTagsCapability = {
    name: 'twitch.tv/tags',
    messageTypes: [GlobalUserState_1.default, ClearMsg_1.default]
};
exports.default = TwitchTagsCapability;

},{"./MessageTypes/ClearMsg":127,"./MessageTypes/GlobalUserState":128}],130:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var logger_1 = require("@d-fischer/logger");
var ircv3_1 = require("ircv3");
var Commands_1 = require("ircv3/lib/Message/MessageTypes/Commands/");
var TwitchCommandsCapability_1 = require("./Capabilities/TwitchCommandsCapability");
var ClearChat_1 = require("./Capabilities/TwitchCommandsCapability/MessageTypes/ClearChat");
var HostTarget_1 = require("./Capabilities/TwitchCommandsCapability/MessageTypes/HostTarget");
var RoomState_1 = require("./Capabilities/TwitchCommandsCapability/MessageTypes/RoomState");
var UserNotice_1 = require("./Capabilities/TwitchCommandsCapability/MessageTypes/UserNotice");
var Whisper_1 = require("./Capabilities/TwitchCommandsCapability/MessageTypes/Whisper");
var TwitchMembershipCapability_1 = require("./Capabilities/TwitchMembershipCapability");
var TwitchTagsCapability_1 = require("./Capabilities/TwitchTagsCapability");
var ClearMsg_1 = require("./Capabilities/TwitchTagsCapability/MessageTypes/ClearMsg");
var TwitchPrivateMessage_1 = require("./StandardCommands/TwitchPrivateMessage");
var Decorators_1 = require("./Toolkit/Decorators");
var UserTools_1 = require("./Toolkit/UserTools");
var GENERIC_CHANNEL = 'twjs';
/**
 * An interface to Twitch chat.
 *
 * @inheritDoc
 * @hideProtected
 */
var ChatClient = /** @class */ (function (_super) {
    tslib_1.__extends(ChatClient, _super);
    /**
     * Creates a new Twitch chat client.
     *
     * @expandParams
     *
     * @param twitchClient The {@TwitchClient} instance to use for API requests.
     * @param options
     */
    function ChatClient(twitchClient, options) {
        var _this = 
        /* eslint-disable no-restricted-syntax */
        _super.call(this, {
            connection: {
                hostName: options.webSocket === false ? 'irc.chat.twitch.tv' : 'irc-ws.chat.twitch.tv',
                secure: options.ssl !== false
            },
            credentials: {
                nick: ''
            },
            webSocket: options.webSocket !== false,
            logLevel: options.logLevel,
            nonConformingCommands: ['004']
        }) || this;
        _this._authVerified = false;
        /**
         * Fires when a user is timed out from a channel.
         *
         * @eventListener
         * @param channel The channel the user is timed out from.
         * @param user The timed out user.
         * @param reason The reason for the timeout.
         * @param duration The duration of the timeout, in seconds.
         */
        _this.onTimeout = _this.registerEvent();
        /**
         * Fires when a user is permanently banned from a channel.
         *
         * @eventListener
         * @param channel The channel the user is banned from.
         * @param user The banned user.
         * @param reason The reason for the ban.
         */
        _this.onBan = _this.registerEvent();
        /**
         * Fires when a user upgrades their bits badge in a channel.
         *
         * @eventListener
         * @param channel The channel where the bits badge was upgraded.
         * @param user The user that has upgraded their bits badge.
         * @param ritualInfo Additional information about the upgrade.
         * @param msg The raw message that was received.
         */
        _this.onBitsBadgeUpgrade = _this.registerEvent();
        /**
         * Fires when the chat of a channel is cleared.
         *
         * @eventListener
         * @param channel The channel whose chat is cleared.
         */
        _this.onChatClear = _this.registerEvent();
        /**
         * Fires when emote-only mode is toggled in a channel.
         *
         * @eventListener
         * @param channel The channel where emote-only mode is being toggled.
         * @param enabled Whether emote-only mode is being enabled. If false, it's being disabled.
         */
        _this.onEmoteOnly = _this.registerEvent();
        /**
         * Fires when followers-only mode is toggled in a channel.
         *
         * @eventListener
         * @param channel The channel where followers-only mode is being toggled.
         * @param enabled Whether followers-only mode is being enabled. If false, it's being disabled.
         * @param delay The time a user needs to follow the channel to be able to talk. Only available when `enabled === true`.
         */
        _this.onFollowersOnly = _this.registerEvent();
        /**
         * Fires when a channel hosts another channel.
         *
         * @eventListener
         * @param channel The hosting channel.
         * @param target The channel that is being hosted.
         * @param viewers The number of viewers in the hosting channel.
         *
         *   If you're not logged in as the owner of the channel, this is undefined.
         */
        _this.onHost = _this.registerEvent();
        /**
         * Fires when a channel you're logged in as its owner is being hosted by another channel.
         *
         * @eventListener
         * @param channel The channel that is being hosted.
         * @param byChannel The hosting channel.
         * @param auto Whether the host was triggered automatically (by Twitch's auto-host functionality).
         * @param viewers The number of viewers in the hosting channel.
         */
        _this.onHosted = _this.registerEvent();
        /**
         * Fires when Twitch tells you the number of hosts you have remaining in the next half hour for the channel
         * for which you're logged in as owner after hosting a channel.
         *
         * @eventListener
         * @param channel The hosting channel.
         * @param numberOfHosts The number of hosts remaining in the next half hour.
         */
        _this.onHostsRemaining = _this.registerEvent();
        /**
         * Fires when a user joins a channel.
         *
         * The join/part events are cached by the Twitch chat server and will be batched and sent every 30-60 seconds.
         *
         * @eventListener
         * @param channel The channel that is being joined.
         * @param user The user that joined.
         */
        _this.onJoin = _this.registerEvent();
        /**
         * Fires when a user leaves ("parts") a channel.
         *
         * The join/part events are cached by the Twitch chat server and will be batched and sent every 30-60 seconds.
         *
         * @eventListener
         * @param channel The channel that is being left.
         * @param user The user that left.
         */
        _this.onPart = _this.registerEvent();
        /**
         * Fires when a single message is removed from a channel.
         *
         * @eventListener
         * @param channel The channel where the message was removed.
         * @param messageId The ID of the message that was removed.
         * @param msg The raw message that was received.
         *
         * This is *not* the message that was removed. The text of the message is available using `msg.params.message` though.
         */
        _this.onMessageRemove = _this.registerEvent();
        /**
         * Fires when R9K mode is toggled in a channel.
         *
         * @eventListener
         * @param channel The channel where R9K mode is being toggled.
         * @param enabled Whether R9K mode is being enabled. If false, it's being disabled.
         */
        _this.onR9k = _this.registerEvent();
        /**
         * Fires when host mode is disabled in a channel.
         *
         * @eventListener
         * @param channel The channel where host mode is being disabled.
         */
        _this.onUnhost = _this.registerEvent();
        /**
         * Fires when a user raids a channel.
         *
         * @eventListener
         * @param channel The channel that was raided.
         * @param user The user that has raided the channel.
         * @param raidInfo Additional information about the raid.
         * @param msg The raw message that was received.
         */
        _this.onRaid = _this.registerEvent();
        /**
         * Fires when a user cancels a raid.
         *
         * @eventListener
         * @param channel The channel where the raid was cancelled.
         * @param msg The raw message that was received.
         */
        _this.onRaidCancel = _this.registerEvent();
        /**
         * Fires when a user performs a "ritual" in a channel.
         *
         * @eventListener
         * @param channel The channel where the ritual was performed.
         * @param user The user that has performed the ritual.
         * @param ritualInfo Additional information about the ritual.
         * @param msg The raw message that was received.
         */
        _this.onRitual = _this.registerEvent();
        /**
         * Fires when slow mode is toggled in a channel.
         *
         * @eventListener
         * @param channel The channel where slow mode is being toggled.
         * @param enabled Whether slow mode is being enabled. If false, it's being disabled.
         * @param delay The time a user has to wait between sending messages. Only set when enabling slow mode.
         */
        _this.onSlow = _this.registerEvent();
        /**
         * Fires when sub only mode is toggled in a channel.
         *
         * @eventListener
         * @param channel The channel where sub only mode is being toggled.
         * @param enabled Whether sub only mode is being enabled. If false, it's being disabled.
         */
        _this.onSubsOnly = _this.registerEvent();
        /**
         * Fires when a user subscribes to a channel.
         *
         * @eventListener
         * @param channel The channel that was subscribed to.
         * @param user The subscribing user.
         * @param subInfo Additional information about the subscription.
         * @param msg The raw message that was received.
         */
        _this.onSub = _this.registerEvent();
        /**
         * Fires when a user resubscribes to a channel.
         *
         * @eventListener
         * @param channel The channel that was resubscribed to.
         * @param user The resubscribing user.
         * @param subInfo Additional information about the resubscription.
         * @param msg The raw message that was received.
         */
        _this.onResub = _this.registerEvent();
        /**
         * Fires when a user gifts a subscription to a channel to another user.
         *
         * @eventListener
         * @param channel The channel that was subscribed to.
         * @param user The user that the subscription was gifted to. The gifting user is defined in `subInfo.gifter`.
         * @param subInfo Additional information about the subscription.
         * @param msg The raw message that was received.
         */
        _this.onSubGift = _this.registerEvent();
        /**
         * Fires when a user gifts random subscriptions to the community of a channel.
         *
         * @eventListener
         * @param channel The channel that was subscribed to.
         * @param user The gifting user.
         * @param subInfo Additional information about the community subscription.
         * @param msg The raw message that was received.
         */
        _this.onCommunitySub = _this.registerEvent();
        /**
         * Fires when a user extends their subscription using a Sub Token.
         *
         * @eventListener
         * @param channel The channel where the subscription was extended.
         * @param user The user that extended their subscription.
         * @param subInfo Additional information about the subscription extension.
         * @param msg The raw message that was received.
         */
        _this.onSubExtend = _this.registerEvent();
        /**
         * Fires when a user upgrades their Prime subscription to a paid subscription in a channel.
         *
         * @eventListener
         * @param channel The channel where the subscription was upgraded.
         * @param user The user that upgraded their subscription.
         * @param subInfo Additional information about the subscription upgrade.
         * @param msg The raw message that was received.
         */
        _this.onPrimePaidUpgrade = _this.registerEvent();
        /**
         * Fires when a user upgrades their gift subscription to a paid subscription in a channel.
         *
         * @eventListener
         * @param channel The channel where the subscription was upgraded.
         * @param user The user that upgraded their subscription.
         * @param subInfo Additional information about the subscription upgrade.
         * @param msg The raw message that was received.
         */
        _this.onGiftPaidUpgrade = _this.registerEvent();
        /**
         * Fires when a user gifts a Twitch Prime benefit to the channel.
         *
         * @eventListener
         * @param channel The channel where the benefit was gifted.
         * @param user The user that received the gift.
         *
         * **WARNING:** This is a *display name* and thus will not work as an identifier for the API (login) in some cases.
         * @param subInfo Additional information about the gift.
         * @param msg The raw message that was received.
         */
        _this.onPrimeCommunityGift = _this.registerEvent();
        /**
         * Fires when receiving a whisper from another user.
         *
         * @eventListener
         * @param user The user that sent the whisper.
         * @param message The message text.
         * @param msg The raw message that was received.
         */
        _this.onWhisper = _this.registerEvent();
        /**
         * Fires when you tried to execute a command you don't have sufficient permission for.
         *
         * @eventListener
         * @param channel The channel that a command without sufficient permissions was executed on.
         * @param message The message text.
         */
        _this.onNoPermission = _this.registerEvent();
        /**
         * Fires when a message you tried to send gets rejected by the ratelimiter.
         *
         * @eventListener
         * @param channel The channel that was attempted to send to.
         * @param message The message text.
         */
        _this.onMessageRatelimit = _this.registerEvent();
        /**
         * Fires when authentication fails.
         *
         * @eventListener
         * @param channel The channel that a command without sufficient permissions was executed on.
         * @param message The message text.
         */
        _this.onAuthenticationFailure = _this.registerEvent();
        // internal events to resolve promises and stuff
        _this._onBanResult = _this.registerEvent();
        _this._onTimeoutResult = _this.registerEvent();
        _this._onUnbanResult = _this.registerEvent();
        _this._onColorResult = _this.registerEvent();
        _this._onCommercialResult = _this.registerEvent();
        _this._onDeleteMessageResult = _this.registerEvent();
        _this._onEmoteOnlyResult = _this.registerEvent();
        _this._onEmoteOnlyOffResult = _this.registerEvent();
        _this._onFollowersOnlyResult = _this.registerEvent();
        _this._onFollowersOnlyOffResult = _this.registerEvent();
        _this._onHostResult = _this.registerEvent();
        _this._onUnhostResult = _this.registerEvent();
        _this._onModResult = _this.registerEvent();
        _this._onUnmodResult = _this.registerEvent();
        _this._onModsResult = _this.registerEvent();
        _this._onJoinResult = _this.registerEvent();
        _this._onR9kResult = _this.registerEvent();
        _this._onR9kOffResult = _this.registerEvent();
        _this._onSlowResult = _this.registerEvent();
        _this._onSlowOffResult = _this.registerEvent();
        _this._onSubsOnlyResult = _this.registerEvent();
        _this._onSubsOnlyOffResult = _this.registerEvent();
        _this._onVipResult = _this.registerEvent();
        _this._onUnvipResult = _this.registerEvent();
        _this._onVipsResult = _this.registerEvent();
        /* eslint-enable no-restricted-syntax */
        _this._chatLogger = new logger_1.default({ name: 'twitch-chat', emoji: true, minLevel: options.logLevel });
        _this._twitchClient = twitchClient;
        _this._useLegacyScopes = !!options.legacyScopes;
        _this._readOnly = !!options.readOnly;
        // tslint:disable:no-floating-promises
        _this.registerCapability(TwitchTagsCapability_1.default);
        _this.registerCapability(TwitchCommandsCapability_1.default);
        if (options.requestMembershipEvents) {
            _this.registerCapability(TwitchMembershipCapability_1.default);
        }
        // tslint:enable:no-floating-promises
        _this.onRegister(function () {
            _this._authVerified = true;
            _this._authFailureMessage = undefined;
        });
        _this.onMessage(ClearChat_1.default, function (_a) {
            var _b = _a.params, channel = _b.channel, user = _b.user, tags = _a.tags;
            if (user) {
                var duration = tags.get('ban-duration');
                var reason = tags.get('ban-reason');
                if (duration === undefined) {
                    // ban
                    _this.emit(_this.onBan, channel, user, reason);
                }
                else {
                    // timeout
                    _this.emit(_this.onTimeout, channel, user, reason, Number(duration));
                    _this.emit(_this._onTimeoutResult, channel, user, reason, Number(duration));
                }
            }
            else {
                // full chat clear
                _this.emit(_this.onChatClear, channel);
            }
        });
        _this.onMessage(ClearMsg_1.default, function (msg) {
            var channel = msg.params.channel, targetMessageId = msg.targetMessageId;
            _this.emit(_this.onMessageRemove, channel, targetMessageId, msg);
        });
        _this.onMessage(HostTarget_1.default, function (_a) {
            var _b = _a.params, channel = _b.channel, targetAndViewers = _b.targetAndViewers;
            var _c = tslib_1.__read(targetAndViewers.split(' '), 2), target = _c[0], viewers = _c[1];
            if (target === '-') {
                // unhost
                _this.emit(_this.onUnhost, channel);
            }
            else {
                var numViewers = Number(viewers);
                _this.emit(_this.onHost, channel, target, isNaN(numViewers) ? undefined : numViewers);
            }
        });
        _this.onMessage(Commands_1.ChannelJoin, function (_a) {
            var prefix = _a.prefix, channel = _a.params.channel;
            _this.emit(_this.onJoin, channel, prefix.nick);
        });
        _this.onMessage(Commands_1.ChannelPart, function (_a) {
            var prefix = _a.prefix, channel = _a.params.channel;
            _this.emit(_this.onPart, channel, prefix.nick);
        });
        _this.onMessage(TwitchPrivateMessage_1.default, function (_a) {
            var prefix = _a.prefix, _b = _a.params, channel = _b.target, message = _b.message;
            if (prefix && prefix.nick === 'jtv') {
                // 1 = who hosted
                // 2 = auto-host or not
                // 3 = how many viewers (not always present)
                var match = message.match(ChatClient.HOST_MESSAGE_REGEX);
                if (match) {
                    _this.emit(_this.onHosted, channel, match[1], Boolean(match[2]), match[3] === '' ? undefined : Number(match[3]));
                }
            }
        });
        _this.onMessage(RoomState_1.default, function (_a) {
            var channel = _a.params.channel, tags = _a.tags;
            var isInitial = false;
            if (tags.has('subs-only') && tags.has('slow')) {
                // this is the full state - so we just successfully joined
                _this.emit(_this._onJoinResult, channel, tags);
                isInitial = true;
            }
            if (tags.has('slow')) {
                var slowDelay = Number(tags.get('slow'));
                if (slowDelay) {
                    _this.emit(_this._onSlowResult, channel, slowDelay);
                    if (!isInitial) {
                        _this.emit(_this.onSlow, channel, true, slowDelay);
                    }
                }
                else {
                    _this.emit(_this._onSlowOffResult, channel);
                    if (!isInitial) {
                        _this.emit(_this.onSlow, channel, false);
                    }
                }
            }
            if (tags.has('followers-only')) {
                var followDelay = Number(tags.get('followers-only'));
                if (followDelay === -1) {
                    _this.emit(_this._onFollowersOnlyOffResult, channel);
                    if (!isInitial) {
                        _this.emit(_this.onFollowersOnly, channel, false);
                    }
                }
                else {
                    _this.emit(_this._onFollowersOnlyResult, channel, followDelay);
                    if (!isInitial) {
                        _this.emit(_this.onFollowersOnly, channel, true, followDelay);
                    }
                }
            }
        });
        _this.onMessage(UserNotice_1.default, function (userNotice) {
            var _a = userNotice.params, channel = _a.channel, message = _a.message, tags = userNotice.tags;
            var messageType = tags.get('msg-id');
            switch (messageType) {
                case 'sub':
                case 'resub': {
                    var event_1 = messageType === 'sub' ? _this.onSub : _this.onResub;
                    var plan = tags.get('msg-param-sub-plan');
                    var streakMonths = tags.get('msg-param-streak-months');
                    var subInfo = {
                        displayName: tags.get('display-name'),
                        plan: plan,
                        planName: tags.get('msg-param-sub-plan-name'),
                        isPrime: plan === 'Prime',
                        months: Number(tags.get('msg-param-cumulative-months')),
                        streak: streakMonths ? Number(streakMonths) : undefined,
                        message: message
                    };
                    _this.emit(event_1, channel, tags.get('login'), subInfo, userNotice);
                    break;
                }
                case 'subgift':
                case 'anonsubgift': {
                    var plan = tags.get('msg-param-sub-plan');
                    var gifter = tags.get('login');
                    var isAnon = messageType === 'anonsubgift' || gifter === 'ananonymousgifter';
                    var subInfo = {
                        displayName: tags.get('msg-param-recipient-display-name'),
                        gifter: isAnon ? undefined : gifter,
                        gifterDisplayName: isAnon ? undefined : tags.get('display-name'),
                        gifterGiftCount: isAnon ? undefined : Number(tags.get('msg-param-sender-count')),
                        plan: plan,
                        planName: tags.get('msg-param-sub-plan-name'),
                        isPrime: plan === 'Prime',
                        months: Number(tags.get('msg-param-months'))
                    };
                    _this.emit(_this.onSubGift, channel, tags.get('msg-param-recipient-user-name'), subInfo, userNotice);
                    break;
                }
                case 'anonsubmysterygift':
                case 'submysterygift': {
                    var gifter = tags.get('login');
                    var isAnon = messageType === 'anonsubmysterygift' || gifter === 'ananonymousgifter';
                    var communitySubInfo = {
                        gifter: isAnon ? undefined : gifter,
                        gifterDisplayName: isAnon ? undefined : tags.get('display-name'),
                        gifterGiftCount: isAnon ? undefined : Number(tags.get('msg-param-sender-count')),
                        count: Number(tags.get('msg-param-mass-gift-count')),
                        plan: tags.get('msg-param-sub-plan')
                    };
                    _this.emit(_this.onCommunitySub, channel, tags.get('login'), communitySubInfo, userNotice);
                    break;
                }
                case 'primepaidupgrade': {
                    var upgradeInfo = {
                        displayName: tags.get('display-name'),
                        plan: tags.get('msg-param-sub-plan')
                    };
                    _this.emit(_this.onPrimePaidUpgrade, channel, tags.get('login'), upgradeInfo, userNotice);
                    break;
                }
                case 'giftpaidupgrade': {
                    var upgradeInfo = {
                        displayName: tags.get('display-name'),
                        plan: tags.get('msg-param-sub-plan'),
                        gifter: tags.get('msg-param-sender-login'),
                        gifterDisplayName: tags.get('msg-param-sender-name')
                    };
                    _this.emit(_this.onGiftPaidUpgrade, channel, tags.get('login'), upgradeInfo, userNotice);
                    break;
                }
                case 'primecommunitygiftreceived': {
                    var giftInfo = {
                        name: tags.get('msg-param-gift-name'),
                        gifter: tags.get('login'),
                        gifterDisplayName: tags.get('display-name')
                    };
                    _this.emit(_this.onPrimeCommunityGift, channel, tags.get('msg-param-recipient'), giftInfo, userNotice);
                    break;
                }
                case 'raid': {
                    var raidInfo = {
                        displayName: tags.get('msg-param-displayName'),
                        viewerCount: Number(tags.get('msg-param-viewerCount'))
                    };
                    _this.emit(_this.onRaid, channel, tags.get('login'), raidInfo, userNotice);
                    break;
                }
                case 'unraid': {
                    _this.emit(_this.onRaidCancel, channel, userNotice);
                    break;
                }
                case 'ritual': {
                    var ritualInfo = {
                        ritualName: tags.get('msg-param-ritual-name'),
                        message: message
                    };
                    _this.emit(_this.onRitual, channel, tags.get('login'), ritualInfo, userNotice);
                    break;
                }
                case 'bitsbadgetier': {
                    var badgeUpgradeInfo = {
                        displayName: tags.get('display-name'),
                        threshold: Number(tags.get('msg-param-threshold'))
                    };
                    _this.emit(_this.onBitsBadgeUpgrade, channel, tags.get('login'), badgeUpgradeInfo, userNotice);
                    break;
                }
                case 'extendsub': {
                    var extendInfo = {
                        displayName: tags.get('display-name'),
                        plan: tags.get('msg-param-sub-plan'),
                        months: Number(tags.get('msg-param-cumulative-months')),
                        endMonth: Number(tags.get('msg-param-sub-benefit-end-month'))
                    };
                    _this.emit(_this.onSubExtend, channel, tags.get('login'), extendInfo, userNotice);
                    break;
                }
                default: {
                    _this._chatLogger.warn("Unrecognized usernotice ID: " + messageType);
                }
            }
        });
        _this.onMessage(Whisper_1.default, function (whisper) {
            _this.emit(_this.onWhisper, whisper.prefix.nick, whisper.params.message, whisper);
        });
        _this.onMessage(Commands_1.Notice, function (_a) {
            var _b = _a.params, channel = _b.target, message = _b.message, tags = _a.tags;
            var messageType = tags.get('msg-id');
            // this event handler involves a lot of parsing strings you shouldn't parse...
            // but Twitch doesn't give us the required info in tags (╯°□°）╯︵ ┻━┻
            // (this code also might not do the right thing with foreign character display names...)
            switch (messageType) {
                // ban
                case 'already_banned': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onBanResult, channel, user, messageType);
                    }
                    break;
                }
                case 'bad_ban_self': {
                    _this.emit(_this._onBanResult, channel, _this._credentials.nick, messageType);
                    break;
                }
                case 'bad_ban_broadcaster': {
                    _this.emit(_this._onBanResult, channel, UserTools_1.toUserName(channel), messageType);
                    break;
                }
                case 'bad_ban_admin':
                case 'bad_ban_global_mod':
                case 'bad_ban_staff': {
                    var match = message.match(/^You cannot ban (?:\w+ )+?(\w+)\.$/);
                    if (match) {
                        _this.emit(_this._onBanResult, channel, match[1].toLowerCase(), messageType);
                    }
                    break;
                }
                case 'ban_success': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onBanResult, channel, user);
                    }
                    break;
                }
                // unban
                case 'bad_unban_no_ban': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onUnbanResult, channel, user, messageType);
                    }
                    break;
                }
                case 'unban_success': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onUnbanResult, channel, user);
                    }
                    break;
                }
                // color
                case 'turbo_only_color': {
                    _this.emit(_this._onColorResult, messageType);
                    break;
                }
                case 'color_changed': {
                    _this.emit(_this._onColorResult);
                    break;
                }
                // commercial
                case 'bad_commercial_error': {
                    _this.emit(_this._onCommercialResult, channel, messageType);
                    break;
                }
                case 'commercial_success': {
                    _this.emit(_this._onCommercialResult, channel);
                    break;
                }
                // delete message
                case 'bad_delete_message_error':
                case 'bad_delete_message_broadcaster':
                case 'bad_delete_message_mod': {
                    _this.emit(_this._onDeleteMessageResult, channel, messageType);
                    break;
                }
                case 'delete_message_success': {
                    _this.emit(_this._onDeleteMessageResult, channel);
                    break;
                }
                // emote only
                case 'already_emote_only_on': {
                    _this.emit(_this._onEmoteOnlyResult, channel, messageType);
                    break;
                }
                case 'emote_only_on': {
                    _this.emit(_this._onEmoteOnlyResult, channel);
                    _this.emit(_this.onEmoteOnly, channel, true);
                    break;
                }
                // emote only off
                case 'already_emote_only_off': {
                    _this.emit(_this._onEmoteOnlyOffResult, channel, messageType);
                    break;
                }
                case 'emote_only_off': {
                    _this.emit(_this._onEmoteOnlyOffResult, channel);
                    _this.emit(_this.onEmoteOnly, channel, false);
                    break;
                }
                // host
                case 'bad_host_hosting':
                case 'bad_host_rate_exceeded':
                case 'bad_host_error': {
                    _this.emit(_this._onHostResult, channel, messageType);
                    break;
                }
                case 'hosts_remaining': {
                    var remainingHostsFromChar = +message[0];
                    var remainingHosts = isNaN(remainingHostsFromChar) ? 0 : Number(remainingHostsFromChar);
                    _this.emit(_this._onHostResult, channel);
                    _this.emit(_this.onHostsRemaining, channel, remainingHosts);
                    break;
                }
                // unhost (only fails, success is handled by HOSTTARGET)
                case 'not_hosting': {
                    _this.emit(_this._onUnhostResult, channel, messageType);
                    break;
                }
                // join (success is handled when ROOMSTATE comes in)
                case 'msg_channel_suspended': {
                    _this.emit(_this._onJoinResult, channel, undefined, messageType);
                    break;
                }
                // mod
                case 'bad_mod_banned':
                case 'bad_mod_mod': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onModResult, channel, user, messageType);
                    }
                    break;
                }
                case 'mod_success': {
                    var match = message.match(/^You have added (\w+) /);
                    if (match) {
                        _this.emit(_this._onModResult, channel, match[1]);
                    }
                    break;
                }
                // unmod
                case 'bad_unmod_mod': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onUnmodResult, channel, user, messageType);
                    }
                    break;
                }
                case 'unmod_success': {
                    var match = message.match(/^You have removed (\w+) /);
                    if (match) {
                        _this.emit(_this._onUnmodResult, channel, match[1]);
                    }
                    break;
                }
                // mods
                case 'no_mods': {
                    _this.emit(_this._onModsResult, channel, []);
                    break;
                }
                case 'room_mods': {
                    var _c = tslib_1.__read(message.split(': '), 2), modList = _c[1];
                    var mods = modList.split(', ');
                    _this.emit(_this._onModsResult, channel, mods);
                    break;
                }
                // r9k
                case 'already_r9k_on': {
                    _this.emit(_this._onR9kResult, channel, messageType);
                    break;
                }
                case 'r9k_on': {
                    _this.emit(_this._onR9kResult, channel);
                    _this.emit(_this.onR9k, channel, true);
                    break;
                }
                // r9k off
                case 'already_r9k_off': {
                    _this.emit(_this._onR9kOffResult, channel, messageType);
                    break;
                }
                case 'r9k_off': {
                    _this.emit(_this._onR9kOffResult, channel);
                    _this.emit(_this.onR9k, channel, false);
                    break;
                }
                // subs only
                case 'already_subs_on': {
                    _this.emit(_this._onSubsOnlyResult, channel, messageType);
                    break;
                }
                case 'subs_on': {
                    _this.emit(_this._onSubsOnlyResult, channel);
                    _this.emit(_this.onSubsOnly, channel, true);
                    break;
                }
                // subs only off
                case 'already_subs_off': {
                    _this.emit(_this._onSubsOnlyOffResult, channel, messageType);
                    break;
                }
                case 'subs_off': {
                    _this.emit(_this._onSubsOnlyOffResult, channel);
                    _this.emit(_this.onSubsOnly, channel, false);
                    break;
                }
                // timeout (only fails, success is handled by CLEARCHAT)
                case 'bad_timeout_self': {
                    _this.emit(_this._onTimeoutResult, channel, _this._credentials.nick, undefined, undefined, messageType);
                    break;
                }
                case 'bad_timeout_broadcaster': {
                    _this.emit(_this._onTimeoutResult, channel, UserTools_1.toUserName(channel), undefined, undefined, messageType);
                    break;
                }
                case 'bad_timeout_admin':
                case 'bad_timeout_global_mod':
                case 'bad_timeout_staff': {
                    var match = message.match(/^You cannot ban (?:\w+ )+?(\w+)\.$/);
                    if (match) {
                        _this.emit(_this._onTimeoutResult, channel, match[1].toLowerCase(), undefined, undefined, messageType);
                    }
                    break;
                }
                // vip
                case 'bad_vip_grantee_banned':
                case 'bad_vip_grantee_already_vip': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onVipResult, channel, user, messageType);
                    }
                    break;
                }
                case 'vip_success': {
                    var match = message.match(/^You have added (\w+) /);
                    if (match) {
                        _this.emit(_this._onVipResult, channel, match[1]);
                    }
                    break;
                }
                // unvip
                case 'bad_unvip_grantee_not_vip': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onUnvipResult, channel, user, messageType);
                    }
                    break;
                }
                case 'unvip_success': {
                    var match = message.match(/^You have removed (\w+) /);
                    if (match) {
                        _this.emit(_this._onUnvipResult, channel, match[1]);
                    }
                    break;
                }
                // vips
                case 'no_vips': {
                    _this.emit(_this._onVipsResult, channel, []);
                    break;
                }
                case 'vips_success': {
                    var _d = tslib_1.__read(message.split(': '), 2), vipList = _d[1];
                    var vips = vipList.split(', ');
                    _this.emit(_this._onVipsResult, channel, vips);
                    break;
                }
                case 'cmds_available': {
                    // do we really care?
                    break;
                }
                // there's other messages that show us the following things...
                // ...like ROOMSTATE...
                case 'followers_on':
                case 'followers_on_zero':
                case 'followers_off':
                case 'slow_on':
                case 'slow_off': {
                    break;
                }
                // ...and CLEARCHAT...
                case 'timeout_success': {
                    break;
                }
                // ...and HOSTTARGET
                case 'host_off':
                case 'host_on':
                case 'host_target_went_offline': {
                    break;
                }
                case 'unrecognized_cmd': {
                    break;
                }
                case 'no_permission': {
                    _this.emit(_this.onNoPermission, channel, message);
                    break;
                }
                case 'msg_ratelimit': {
                    _this.emit(_this.onMessageRatelimit, channel, message);
                    break;
                }
                case undefined: {
                    // this might be one of these weird authentication error notices that don't have a msg-id...
                    if (message === 'Login authentication failed' ||
                        message === 'Improperly formatted AUTH' ||
                        message === 'Invalid NICK') {
                        _this._authVerified = false;
                        _this._authFailureMessage = message;
                        _this.emit(_this.onAuthenticationFailure, message);
                        _this._connection.disconnect();
                    }
                    break;
                }
                default: {
                    if (!messageType || messageType.substr(0, 6) !== 'usage_') {
                        _this._chatLogger.warn("Unrecognized notice ID: '" + messageType + "'");
                    }
                }
            }
        });
        return _this;
    }
    /**
     * Creates a new Twitch chat client with the user info from the TwitchClient instance.
     *
     * @expandParams
     *
     * @param twitchClient The TwitchClient instance to use for user info and API requests.
     * @param options
     */
    ChatClient.forTwitchClient = function (twitchClient, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new this(twitchClient, options)];
            });
        });
    };
    /**
     * Creates a new anonymous Twitch chat client.
     *
     * @expandParams
     *
     * @param options
     */
    ChatClient.anonymous = function (options) {
        if (options === void 0) { options = {}; }
        return new this(undefined, options);
    };
    ChatClient.prototype.connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._twitchClient) {
                            this._updateCredentials({
                                nick: ChatClient._generateJustinfanNick(),
                                password: undefined
                            });
                        }
                        return [4 /*yield*/, _super.prototype.connect.call(this)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // TODO swap arguments in 4.0
    /**
     * Hosts a channel on another channel.
     *
     * @param target The host target, i.e. the channel that is being hosted.
     * @param channel The host source, i.e. the channel that is hosting. Defaults to the channel of the connected user.
     */
    ChatClient.prototype.host = function (target, channel) {
        if (channel === void 0) { channel = this._credentials.nick; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onHostResult(function (chan, error) {
                            if (UserTools_1.toUserName(chan) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/host " + target);
                    })];
            });
        });
    };
    /**
     * Ends any host on a channel.
     *
     * This only works when in the channel that was hosted in order to provide feedback about success of the command.
     *
     * If you don't need this feedback, consider using {@ChatClient#unhostOutside} instead.
     *
     * @param channel The channel to end the host on. Defaults to the channel of the connected user.
     */
    ChatClient.prototype.unhost = function (channel) {
        if (channel === void 0) { channel = this._credentials.nick; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onUnhostResult(function (chan, error) {
                            if (UserTools_1.toUserName(chan) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/unhost');
                    })];
            });
        });
    };
    /**
     * Ends any host on a channel.
     *
     * This works even when not in the channel that was hosted, but provides no feedback about success of the command.
     *
     * If you need feedback about success, use {@ChatClient#unhost} (but make sure you're in the channel you are hosting).
     *
     * @param channel The channel to end the host on. Defaults to the channel of the connected user.
     */
    ChatClient.prototype.unhostOutside = function (channel) {
        if (channel === void 0) { channel = this._credentials.nick; }
        this.say(channel, '/unhost');
    };
    /**
     * Bans a user from a channel.
     *
     * This only works when in the channel that was hosted in order to provide feedback about success of the command.
     *
     * @param channel The channel to ban the user from. Defaults to the channel of the connected user.
     * @param user The user to ban from the channel.
     * @param reason The reason for the ban.
     */
    ChatClient.prototype.ban = function (channel, user, reason) {
        if (channel === void 0) { channel = this._credentials.nick; }
        if (reason === void 0) { reason = ''; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                user = UserTools_1.toUserName(user);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onBanResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/ban " + user + " " + reason);
                    })];
            });
        });
    };
    /**
     * Clears all messages in a channel.
     *
     * This only works when in the channel that was hosted in order to provide feedback about success of the command.
     *
     * @param channel The channel to ban the user from. Defaults to the channel of the connected user.
     */
    ChatClient.prototype.clear = function (channel) {
        if (channel === void 0) { channel = this._credentials.nick; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve) {
                        var e = _this.onChatClear(function (_channel) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                resolve();
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/clear');
                    })];
            });
        });
    };
    /**
     * Changes your username color.
     *
     * @param color The hexadecimal code (prefixed with #) or color name to use for your username.
     *
     * Please note that only Twitch Turbo or Prime users can use hexadecimal codes for arbitrary colors.
     *
     * If you have neither of those, you can only choose from the following color names:
     *
     * Blue, BlueViolet, CadetBlue, Chocolate, Coral, DodgerBlue, Firebrick, GoldenRod, Green, HotPink, OrangeRed, Red, SeaGreen, SpringGreen, YellowGreen
     */
    ChatClient.prototype.changeColor = function (color) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onColorResult(function (error) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve();
                            }
                            _this.removeListener(e);
                        });
                        _this.say(GENERIC_CHANNEL, "/color " + color);
                    })];
            });
        });
    };
    /**
     * Runs a commercial break on a channel.
     *
     * @param channel The channel to run the commercial break on.
     * @param duration The duration of the commercial break.
     */
    ChatClient.prototype.runCommercial = function (channel, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onCommercialResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/commercial " + duration);
                    })];
            });
        });
    };
    /**
     * Deletes a message from a channel.
     *
     * @param channel The channel to delete the message from.
     * @param message The message (as message ID or message object) to delete.
     */
    ChatClient.prototype.deleteMessage = function (channel, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var messageId;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                messageId = message instanceof Commands_1.PrivateMessage ? message.tags.get('id') : message;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onDeleteMessageResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/delete " + messageId);
                    })];
            });
        });
    };
    /**
     * Enables emote-only mode in a channel.
     *
     * @param channel The channel to enable emote-only mode in.
     */
    ChatClient.prototype.enableEmoteOnly = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onEmoteOnlyResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/emoteonly');
                    })];
            });
        });
    };
    /**
     * Disables emote-only mode in a channel.
     *
     * @param channel The channel to disable emote-only mode in.
     */
    ChatClient.prototype.disableEmoteOnly = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onEmoteOnlyOffResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/emoteonlyoff');
                    })];
            });
        });
    };
    /**
     * Enables followers-only mode in a channel.
     *
     * @param channel The channel to enable followers-only mode in.
     * @param delay The time (in minutes) a user needs to be following before being able to send messages.
     */
    ChatClient.prototype.enableFollowersOnly = function (channel, delay) {
        if (delay === void 0) { delay = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onFollowersOnlyResult(function (_channel, _delay, error) {
                            if (UserTools_1.toUserName(_channel) === channel && _delay === delay) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/followers " + (delay || ''));
                    })];
            });
        });
    };
    /**
     * Disables followers-only mode in a channel.
     *
     * @param channel The channel to disable followers-only mode in.
     */
    ChatClient.prototype.disableFollowersOnly = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onFollowersOnlyOffResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/followersoff');
                    })];
            });
        });
    };
    /**
     * Gives a user moderator rights in a channel.
     *
     * @param channel The channel to give the user moderator rights in.
     * @param user The user to give moderator rights.
     */
    ChatClient.prototype.mod = function (channel, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                user = UserTools_1.toUserName(user);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onModResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/mod " + user);
                    })];
            });
        });
    };
    /**
     * Takes moderator rights from a user in a channel.
     *
     * @param channel The channel to remove the user's moderator rights in.
     * @param user The user to take moderator rights from.
     */
    ChatClient.prototype.unmod = function (channel, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                user = UserTools_1.toUserName(user);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onUnmodResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/unmod " + user);
                    })];
            });
        });
    };
    /**
     * Retrieves a list of moderators in a channel.
     *
     * @param channel The channel to retrieve the moderators of.
     */
    ChatClient.prototype.getMods = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve) {
                        var e = _this._onModsResult(function (_channel, mods) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                resolve(mods);
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/mods');
                    })];
            });
        });
    };
    /**
     * Enables r9k mode in a channel.
     *
     * @param channel The channel to enable r9k mode in.
     */
    ChatClient.prototype.enableR9k = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onR9kResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/r9kbeta');
                    })];
            });
        });
    };
    /**
     * Disables r9k mode in a channel.
     *
     * @param channel The channel to disable r9k mode in.
     */
    ChatClient.prototype.disableR9k = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onR9kOffResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/r9kbetaoff');
                    })];
            });
        });
    };
    /**
     * Enables slow mode in a channel.
     *
     * @param channel The channel to enable slow mode in.
     * @param delay The time (in seconds) a user needs to wait between messages.
     */
    ChatClient.prototype.enableSlow = function (channel, delay) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onSlowResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/slow');
                    })];
            });
        });
    };
    /**
     * Disables slow mode in a channel.
     *
     * @param channel The channel to disable slow mode in.
     */
    ChatClient.prototype.disableSlow = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onSlowOffResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/slowoff');
                    })];
            });
        });
    };
    /**
     * Enables subscribers-only mode in a channel.
     *
     * @param channel The channel to enable subscribers-only mode in.
     */
    ChatClient.prototype.enableSubsOnly = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onSubsOnlyResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/subscribers');
                    })];
            });
        });
    };
    /**
     * Disables subscribers-only mode in a channel.
     *
     * @param channel The channel to disable subscribers-only mode in.
     */
    ChatClient.prototype.disableSubsOnly = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onSubsOnlyOffResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/subscribersoff');
                    })];
            });
        });
    };
    /**
     * Times out a user in a channel and removes all their messages.
     *
     * @param channel The channel to time out the user in.
     * @param user The user to time out.
     * @param duration The time (in seconds) until the user can send messages again. Defaults to 1 minute.
     * @param reason
     */
    ChatClient.prototype.timeout = function (channel, user, duration, reason) {
        if (duration === void 0) { duration = 60; }
        if (reason === void 0) { reason = ''; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onTimeoutResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/timeout " + user + " " + duration + " " + reason);
                    })];
            });
        });
    };
    /**
     * Removes all messages of a user from a channel.
     *
     * @param channel The channel to purge the user's messages from.
     * @param user The user to purge.
     * @param reason The reason for the purge.
     */
    ChatClient.prototype.purge = function (channel, user, reason) {
        if (reason === void 0) { reason = ''; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.timeout(channel, user, 1, reason)];
            });
        });
    };
    /**
     * Gives a user VIP status in a channel.
     *
     * @param channel The channel to give the user VIP status in.
     * @param user The user to give VIP status.
     */
    ChatClient.prototype.addVIP = function (channel, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                user = UserTools_1.toUserName(user);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onVipResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/vip " + user);
                    })];
            });
        });
    };
    /**
     * Takes VIP status from a user in a channel.
     *
     * @param channel The channel to remove the user's VIP status in.
     * @param user The user to take VIP status from.
     */
    ChatClient.prototype.removeVIP = function (channel, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                user = UserTools_1.toUserName(user);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onUnvipResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/unvip " + user);
                    })];
            });
        });
    };
    /**
     * Retrieves a list of moderators in a channel.
     *
     * @param channel The channel to retrieve the moderators of.
     */
    ChatClient.prototype.getVIPs = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve) {
                        var e = _this._onVipsResult(function (_channel, vips) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                resolve(vips);
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/vips');
                    })];
            });
        });
    };
    /**
     * Sends a message to a channel.
     *
     * @param channel The channel to send the message to.
     * @param message The message to send.
     */
    ChatClient.prototype.say = function (channel, message) {
        _super.prototype.say.call(this, UserTools_1.toChannelName(channel), message);
    };
    /**
     * Sends an action message (/me) to a channel.
     *
     * @param channel The channel to send the message to.
     * @param message The message to send.
     */
    ChatClient.prototype.action = function (channel, message) {
        _super.prototype.action.call(this, UserTools_1.toChannelName(channel), message);
    };
    /**
     * Sends a whisper message to another user.
     *
     * @param user The user to send the message to.
     * @param message The message to send.
     */
    ChatClient.prototype.whisper = function (user, message) {
        _super.prototype.say.call(this, GENERIC_CHANNEL, "/w " + UserTools_1.toUserName(user) + " " + message);
    };
    /**
     * Joins a channel.
     *
     * @param channel The channel to join.
     */
    ChatClient.prototype.join = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toChannelName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var timer;
                        var e = _this._onJoinResult(function (chan, state, error) {
                            if (chan === channel) {
                                clearTimeout(timer);
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        timer = setTimeout(function () {
                            _this.removeListener(e);
                            reject(new Error("Did not receive a reply to join " + channel + " in time; assuming that the join failed"));
                        }, 10000);
                        _super.prototype.join.call(_this, channel);
                    })];
            });
        });
    };
    /**
     * Disconnects from the chat server.
     */
    ChatClient.prototype.quit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        if (_this._connection) {
                            var handler_1 = function () {
                                _this._connection.removeListener('disconnect', handler_1);
                                resolve();
                            };
                            _this._connection.addListener('disconnect', handler_1);
                            _this._connection.disconnect();
                        }
                    })];
            });
        });
    };
    /**
     * Waits for authentication (or "registration" in IRC terms) to finish.
     */
    ChatClient.prototype.waitForRegistration = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var authListener;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._registered) {
                            return [2 /*return*/];
                        }
                        if (this._authFailureMessage) {
                            throw new Error("Registration failed. Response from Twitch: " + this._authFailureMessage);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, Promise.race([
                                new Promise(function (resolve, reject) {
                                    authListener = _this.onAuthenticationFailure(function (message) {
                                        reject(Error("Registration failed. Response from Twitch: " + message));
                                    });
                                }),
                                _super.prototype.waitForRegistration.call(this)
                            ])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (authListener) {
                            this.removeListener(authListener);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChatClient.prototype.registerCoreMessageTypes = function () {
        _super.prototype.registerCoreMessageTypes.call(this);
        this.registerMessageType(TwitchPrivateMessage_1.default);
    };
    ChatClient.prototype.getPassword = function (currentPassword) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scopes, accessToken, token, e_1, newToken, token, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._twitchClient) {
                            return [2 /*return*/, undefined];
                        }
                        if (currentPassword && this._authVerified) {
                            this._chatLogger.debug2('Password assumed to be correct from last connection');
                            return [2 /*return*/, currentPassword];
                        }
                        if (this._useLegacyScopes) {
                            scopes = ['chat_login'];
                        }
                        else if (this._readOnly) {
                            scopes = ['chat:read'];
                        }
                        else {
                            scopes = ['chat:read', 'chat:edit'];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this._twitchClient.getAccessToken(scopes)];
                    case 2:
                        accessToken = _a.sent();
                        if (!accessToken) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._twitchClient.getTokenInfo()];
                    case 3:
                        token = _a.sent();
                        if (token.valid) {
                            this._updateCredentials({
                                nick: token.userName
                            });
                            return [2 /*return*/, "oauth:" + accessToken.accessToken];
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this._chatLogger.err("Retrieving an access token failed: " + e_1.message);
                        return [3 /*break*/, 6];
                    case 6:
                        this._chatLogger.warning('No valid token available; trying to refresh');
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 11, , 12]);
                        return [4 /*yield*/, this._twitchClient.refreshAccessToken()];
                    case 8:
                        newToken = _a.sent();
                        if (!newToken) return [3 /*break*/, 10];
                        return [4 /*yield*/, this._twitchClient.getTokenInfo()];
                    case 9:
                        token = _a.sent();
                        if (token.valid) {
                            this._updateCredentials({
                                nick: token.userName
                            });
                            return [2 /*return*/, "oauth:" + newToken.accessToken];
                        }
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_2 = _a.sent();
                        this._chatLogger.err("Refreshing the access token failed: " + e_2.message);
                        return [3 /*break*/, 12];
                    case 12:
                        this._authVerified = false;
                        throw new Error('Could not retrieve a valid token');
                }
            });
        });
    };
    ChatClient._generateJustinfanNick = function () {
        var randomSuffix = Math.floor(Math.random() * 100000)
            .toString()
            .padStart(5, '0');
        return "justinfan" + randomSuffix;
    };
    ChatClient.HOST_MESSAGE_REGEX = /(\w+) is now ((?:auto[- ])?)hosting you(?: for (?:up to )?(\d+))?/;
    tslib_1.__decorate([
        Decorators_1.NonEnumerable
    ], ChatClient.prototype, "_twitchClient", void 0);
    return ChatClient;
}(ircv3_1.default));
exports.default = ChatClient;

},{"./Capabilities/TwitchCommandsCapability":125,"./Capabilities/TwitchCommandsCapability/MessageTypes/ClearChat":118,"./Capabilities/TwitchCommandsCapability/MessageTypes/HostTarget":119,"./Capabilities/TwitchCommandsCapability/MessageTypes/RoomState":121,"./Capabilities/TwitchCommandsCapability/MessageTypes/UserNotice":122,"./Capabilities/TwitchCommandsCapability/MessageTypes/Whisper":124,"./Capabilities/TwitchMembershipCapability":126,"./Capabilities/TwitchTagsCapability":129,"./Capabilities/TwitchTagsCapability/MessageTypes/ClearMsg":127,"./StandardCommands/TwitchPrivateMessage":132,"./Toolkit/Decorators":134,"./Toolkit/UserTools":136,"@d-fischer/logger":6,"ircv3":114,"ircv3/lib/Message/MessageTypes/Commands/":71,"tslib":117}],131:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A user in chat.
 */
var ChatUser = /** @class */ (function () {
    /** @private */
    function ChatUser(userName, userData) {
        this._userName = userName.toLowerCase();
        this._userData = userData ? new Map(userData) : new Map();
    }
    Object.defineProperty(ChatUser.prototype, "userName", {
        /**
         * The name of the user.
         */
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "displayName", {
        /**
         * The display name of the user.
         */
        get: function () {
            return this._userData.get('display-name') || this._userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "color", {
        /**
         * The color the user chose to display in chat.
         *
         * Returns null if the user didn't choose a color. In this case, you should generate your own color.
         */
        get: function () {
            return this._userData.get('color');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "badges", {
        /**
         * The badges of the user. Returned as a map that maps the badge category to the detail.
         */
        get: function () {
            var badgesStr = this._userData.get('badges');
            if (!badgesStr) {
                return new Map();
            }
            return new Map(badgesStr.split(',').map(function (badge) { return badge.split('/', 2); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "userId", {
        /**
         * The ID of the user.
         */
        get: function () {
            return this._userData.get('user-id') || undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "userType", {
        /**
         * The type of the user.
         * Possible values are undefined, 'mod', 'global_mod', 'admin' and 'staff'.
         */
        get: function () {
            return this._userData.get('user-type') || undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "isSubscriber", {
        /**
         * Whether the user is subscribed to the channel.
         */
        get: function () {
            return this.badges.has('subscriber') || this.isFounder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "isFounder", {
        /**
         * Whether the user is a Founder of the channel.
         */
        get: function () {
            return this.badges.has('founder');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "isMod", {
        /**
         * Whether the user is a moderator of the channel.
         */
        get: function () {
            return this.badges.has('moderator');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatUser.prototype, "isVip", {
        /**
         * Whether the user is a VIP in the channel.
         */
        get: function () {
            return this.badges.has('vip');
        },
        enumerable: true,
        configurable: true
    });
    return ChatUser;
}());
exports.default = ChatUser;

},{}],132:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Commands_1 = require("ircv3/lib/Message/MessageTypes/Commands/");
var ChatUser_1 = require("../ChatUser");
var ChatTools_1 = require("../Toolkit/ChatTools");
var StringTools_1 = require("../Toolkit/StringTools");
var TwitchPrivateMessage = /** @class */ (function (_super) {
    tslib_1.__extends(TwitchPrivateMessage, _super);
    function TwitchPrivateMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TwitchPrivateMessage.prototype, "userInfo", {
        get: function () {
            return new ChatUser_1.default(this._prefix.nick, this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchPrivateMessage.prototype, "channelId", {
        get: function () {
            if (!this._tags) {
                return null;
            }
            return this._tags.get('room-id') || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchPrivateMessage.prototype, "isCheer", {
        get: function () {
            if (!this._tags) {
                return false;
            }
            return this._tags.has('bits');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchPrivateMessage.prototype, "totalBits", {
        get: function () {
            if (!this._tags) {
                return 0;
            }
            return Number(this._tags.get('bits'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitchPrivateMessage.prototype, "emoteOffsets", {
        get: function () {
            if (!this._tags) {
                return new Map();
            }
            return ChatTools_1.parseEmotes(this._tags.get('emotes'));
        },
        enumerable: true,
        configurable: true
    });
    TwitchPrivateMessage.prototype.parseEmotes = function () {
        var foundEmotes = this._parseEmotePositions();
        return this._fillTextPositions(this.params.message, foundEmotes);
    };
    TwitchPrivateMessage.prototype.parseEmotesAndBits = function (cheermotes) {
        var messageText = this.params.message;
        var foundCheermotes = cheermotes.parseMessage(messageText);
        var foundEmotesAndCheermotes = tslib_1.__spread(this._parseEmotePositions(), foundCheermotes.map(function (cheermote) { return ({
            type: 'cheer',
            position: cheermote.position,
            length: cheermote.length,
            name: cheermote.name,
            amount: cheermote.amount,
            displayInfo: cheermote.displayInfo
        }); }));
        foundEmotesAndCheermotes.sort(function (a, b) { return a.position - b.position; });
        return this._fillTextPositions(messageText, foundEmotesAndCheermotes);
    };
    TwitchPrivateMessage.prototype._parseEmotePositions = function () {
        var _this = this;
        return tslib_1.__spread(this.emoteOffsets.entries()).flatMap(function (_a) {
            var _b = tslib_1.__read(_a, 2), emote = _b[0], placements = _b[1];
            return placements.map(function (placement) {
                var _a = tslib_1.__read(placement.split('-'), 2), startStr = _a[0], endStr = _a[1];
                var start = +startStr;
                var end = +endStr;
                return {
                    type: 'emote',
                    position: start,
                    length: end - start + 1,
                    id: emote,
                    name: StringTools_1.utf8Substring(_this.params.message, start, end + 1)
                };
            });
        })
            .sort(function (a, b) { return a.position - b.position; });
    };
    TwitchPrivateMessage.prototype._fillTextPositions = function (message, otherPositions) {
        var e_1, _a;
        var messageLength = StringTools_1.utf8Length(message);
        if (!otherPositions.length) {
            return [
                {
                    type: 'text',
                    position: 0,
                    length: messageLength,
                    text: message
                }
            ];
        }
        var result = [];
        var currentPosition = 0;
        try {
            for (var otherPositions_1 = tslib_1.__values(otherPositions), otherPositions_1_1 = otherPositions_1.next(); !otherPositions_1_1.done; otherPositions_1_1 = otherPositions_1.next()) {
                var token = otherPositions_1_1.value;
                if (token.position > currentPosition) {
                    result.push({
                        type: 'text',
                        position: currentPosition,
                        length: token.position - currentPosition,
                        text: StringTools_1.utf8Substring(message, currentPosition, token.position)
                    });
                }
                result.push(token);
                currentPosition = token.position + token.length;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (otherPositions_1_1 && !otherPositions_1_1.done && (_a = otherPositions_1.return)) _a.call(otherPositions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (currentPosition < messageLength) {
            result.push({
                type: 'text',
                position: currentPosition,
                length: messageLength - currentPosition,
                text: StringTools_1.utf8Substring(message, currentPosition)
            });
        }
        return result;
    };
    return TwitchPrivateMessage;
}(Commands_1.PrivateMessage));
exports.default = TwitchPrivateMessage;

},{"../ChatUser":131,"../Toolkit/ChatTools":133,"../Toolkit/StringTools":135,"ircv3/lib/Message/MessageTypes/Commands/":71,"tslib":117}],133:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/** @private */
function parseEmotes(emotes) {
    if (!emotes) {
        return new Map();
    }
    return new Map(emotes.split('/').map(function (emote) {
        var _a = tslib_1.__read(emote.split(':', 2), 2), emoteId = _a[0], placements = _a[1];
        return [emoteId, placements.split(',')];
    }));
}
exports.parseEmotes = parseEmotes;

},{"tslib":117}],134:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @private */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NonEnumerable(target, key) {
    // first property defined in prototype, that's why we use getters/setters
    // (otherwise assignment in object will override property in prototype)
    Object.defineProperty(target, key, {
        get: function () {
            return;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set: function (val) {
            // here we have reference to instance and can set property directly to it
            Object.defineProperty(this, key, {
                value: val,
                writable: true,
                enumerable: false
            });
        },
        enumerable: false
    });
}
exports.NonEnumerable = NonEnumerable;

},{}],135:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function utf8Substring(str, start, end) {
    return tslib_1.__spread(str).slice(start, end).join('');
}
exports.utf8Substring = utf8Substring;
function utf8Length(str) {
    return tslib_1.__spread(str).length;
}
exports.utf8Length = utf8Length;

},{"tslib":117}],136:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @private */
function toUserName(channel) {
    // it's okay if this is already a user name, we only remove the first character if it's a pound
    return channel.replace(/^#/, '').toLowerCase();
}
exports.toUserName = toUserName;
/** @private */
function toChannelName(user) {
    // remove leading pound first - in case it already is a channel name
    return "#" + toUserName(user);
}
exports.toChannelName = toChannelName;

},{}],137:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable filenames/match-exported */
var ChatClient_1 = require("./ChatClient");
exports.default = ChatClient_1.default;
var TwitchPrivateMessage_1 = require("./StandardCommands/TwitchPrivateMessage");
exports.PrivateMessage = TwitchPrivateMessage_1.default;
var ChatUser_1 = require("./ChatUser");
exports.ChatUser = ChatUser_1.default;
var logger_1 = require("@d-fischer/logger");
exports.LogLevel = logger_1.LogLevel;

},{"./ChatClient":130,"./ChatUser":131,"./StandardCommands/TwitchPrivateMessage":132,"@d-fischer/logger":6}],138:[function(require,module,exports){
'use strict';

module.exports = WebSocket;

},{}]},{},[1]);
