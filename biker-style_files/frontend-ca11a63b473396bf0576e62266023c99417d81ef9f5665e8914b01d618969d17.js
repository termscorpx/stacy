/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
if ( !Array.prototype.forEach ) {

  Array.prototype.forEach = function forEach( callback, thisArg ) {

    var T, k;

    if ( this == null ) {
      throw new TypeError( "this is null or not defined" );
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ( {}.toString.call(callback) !== "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if ( thisArg ) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while( k < len ) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if ( Object.prototype.hasOwnProperty.call(O, k) ) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call( T, kValue, k, O );
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some)
{
  Array.prototype.some = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && fun.call(thisArg, t[i], i, t))
        return true;
    }

    return false;
  };
}
;
// I18n.js
// =======
//
// This small library provides the Rails I18n API on the Javascript.
// You don't actually have to use Rails (or even Ruby) to use I18n.js.
// Just make sure you export all translations in an object like this:
//
//     I18n.translations.en = {
//       hello: "Hello World"
//     };
//
// See tests for specific formatting like numbers and dates.
//

;(function(factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // Node/CommonJS
    module.exports = factory(this);
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    var global=this;
    define('i18n', function(){ return factory(global);});
  } else {
    // Browser globals
    this.I18n = factory(this);
  }
}(function(global) {
  "use strict";

  // Use previously defined object if exists in current scope
  var I18n = global && global.I18n || {};

  // Just cache the Array#slice function.
  var slice = Array.prototype.slice;

  // Apply number padding.
  var padding = function(number) {
    return ("0" + number.toString()).substr(-2);
  };

  // Improved toFixed number rounding function with support for unprecise floating points
  // JavaScript's standard toFixed function does not round certain numbers correctly (for example 0.105 with precision 2).
  var toFixed = function(number, precision) {
    return decimalAdjust('round', number, -precision).toFixed(precision);
  };

  // Is a given variable an object?
  // Borrowed from Underscore.js
  var isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Is a given value an array?
  // Borrowed from Underscore.js
  var isArray = function(obj) {
    if (Array.isArray) {
      return Array.isArray(obj);
    };
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var decimalAdjust = function(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Set default days/months translations.
  var DATE = {
      day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    , abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    , month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    , abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    , meridian: ["AM", "PM"]
  };

  // Set default number format.
  var NUMBER_FORMAT = {
      precision: 3
    , separator: "."
    , delimiter: ","
    , strip_insignificant_zeros: false
  };

  // Set default currency format.
  var CURRENCY_FORMAT = {
      unit: "$"
    , precision: 2
    , format: "%u%n"
    , sign_first: true
    , delimiter: ","
    , separator: "."
  };

  // Set default percentage format.
  var PERCENTAGE_FORMAT = {
      unit: "%"
    , precision: 3
    , format: "%n%u"
    , separator: "."
    , delimiter: ""
  };

  // Set default size units.
  var SIZE_UNITS = [null, "kb", "mb", "gb", "tb"];

  // Other default options
  var DEFAULT_OPTIONS = {
    // Set default locale. This locale will be used when fallback is enabled and
    // the translation doesn't exist in a particular locale.
      defaultLocale: "en"
    // Set the current locale to `en`.
    , locale: "en"
    // Set the translation key separator.
    , defaultSeparator: "."
    // Set the placeholder format. Accepts `{{placeholder}}` and `%{placeholder}`.
    , placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm
    // Set if engine should fallback to the default locale when a translation
    // is missing.
    , fallbacks: false
    // Set the default translation object.
    , translations: {}
    // Set missing translation behavior. 'message' will display a message
    // that the translation is missing, 'guess' will try to guess the string
    , missingBehaviour: 'message'
    // if you use missingBehaviour with 'message', but want to know that the
    // string is actually missing for testing purposes, you can prefix the
    // guessed string by setting the value here. By default, no prefix!
    , missingTranslationPrefix: ''
  };

  I18n.reset = function() {
    // Set default locale. This locale will be used when fallback is enabled and
    // the translation doesn't exist in a particular locale.
    this.defaultLocale = DEFAULT_OPTIONS.defaultLocale;

    // Set the current locale to `en`.
    this.locale = DEFAULT_OPTIONS.locale;

    // Set the translation key separator.
    this.defaultSeparator = DEFAULT_OPTIONS.defaultSeparator;

    // Set the placeholder format. Accepts `{{placeholder}}` and `%{placeholder}`.
    this.placeholder = DEFAULT_OPTIONS.placeholder;

    // Set if engine should fallback to the default locale when a translation
    // is missing.
    this.fallbacks = DEFAULT_OPTIONS.fallbacks;

    // Set the default translation object.
    this.translations = DEFAULT_OPTIONS.translations;

    // Set the default missing behaviour
    this.missingBehaviour = DEFAULT_OPTIONS.missingBehaviour;

    // Set the default missing string prefix for guess behaviour
    this.missingTranslationPrefix = DEFAULT_OPTIONS.missingTranslationPrefix;

  };

  // Much like `reset`, but only assign options if not already assigned
  I18n.initializeOptions = function() {
    if (typeof(this.defaultLocale) === "undefined" && this.defaultLocale !== null)
      this.defaultLocale = DEFAULT_OPTIONS.defaultLocale;

    if (typeof(this.locale) === "undefined" && this.locale !== null)
      this.locale = DEFAULT_OPTIONS.locale;

    if (typeof(this.defaultSeparator) === "undefined" && this.defaultSeparator !== null)
      this.defaultSeparator = DEFAULT_OPTIONS.defaultSeparator;

    if (typeof(this.placeholder) === "undefined" && this.placeholder !== null)
      this.placeholder = DEFAULT_OPTIONS.placeholder;

    if (typeof(this.fallbacks) === "undefined" && this.fallbacks !== null)
      this.fallbacks = DEFAULT_OPTIONS.fallbacks;

    if (typeof(this.translations) === "undefined" && this.translations !== null)
      this.translations = DEFAULT_OPTIONS.translations;
  };
  I18n.initializeOptions();

  // Return a list of all locales that must be tried before returning the
  // missing translation message. By default, this will consider the inline option,
  // current locale and fallback locale.
  //
  //     I18n.locales.get("de-DE");
  //     // ["de-DE", "de", "en"]
  //
  // You can define custom rules for any locale. Just make sure you return a array
  // containing all locales.
  //
  //     // Default the Wookie locale to English.
  //     I18n.locales["wk"] = function(locale) {
  //       return ["en"];
  //     };
  //
  I18n.locales = {};

  // Retrieve locales based on inline locale, current locale or default to
  // I18n's detection.
  I18n.locales.get = function(locale) {
    var result = this[locale] || this[I18n.locale] || this["default"];

    if (typeof(result) === "function") {
      result = result(locale);
    }

    if (isArray(result) === false) {
      result = [result];
    }

    return result;
  };

  // The default locale list.
  I18n.locales["default"] = function(locale) {
    var locales = []
      , list = []
      , countryCode
      , count
    ;

    // Handle the inline locale option that can be provided to
    // the `I18n.t` options.
    if (locale) {
      locales.push(locale);
    }

    // Add the current locale to the list.
    if (!locale && I18n.locale) {
      locales.push(I18n.locale);
    }

    // Add the default locale if fallback strategy is enabled.
    if (I18n.fallbacks && I18n.defaultLocale) {
      locales.push(I18n.defaultLocale);
    }

    // Compute each locale with its country code.
    // So this will return an array containing both
    // `de-DE` and `de` locales.
    locales.forEach(function(locale){
      countryCode = locale.split("-")[0];

      if (!~list.indexOf(locale)) {
        list.push(locale);
      }

      if (I18n.fallbacks && countryCode && countryCode !== locale && !~list.indexOf(countryCode)) {
        list.push(countryCode);
      }
    });

    // No locales set? English it is.
    if (!locales.length) {
      locales.push("en");
    }

    return list;
  };

  // Hold pluralization rules.
  I18n.pluralization = {};

  // Return the pluralizer for a specific locale.
  // If no specify locale is found, then I18n's default will be used.
  I18n.pluralization.get = function(locale) {
    return this[locale] || this[I18n.locale] || this["default"];
  };

  // The default pluralizer rule.
  // It detects the `zero`, `one`, and `other` scopes.
  I18n.pluralization["default"] = function(count) {
    switch (count) {
      case 0: return ["zero", "other"];
      case 1: return ["one"];
      default: return ["other"];
    }
  };

  // Return current locale. If no locale has been set, then
  // the current locale will be the default locale.
  I18n.currentLocale = function() {
    return this.locale || this.defaultLocale;
  };

  // Check if value is different than undefined and null;
  I18n.isSet = function(value) {
    return value !== undefined && value !== null;
  };

  // Find and process the translation using the provided scope and options.
  // This is used internally by some functions and should not be used as an
  // public API.
  I18n.lookup = function(scope, options) {
    options = this.prepareOptions(options);

    var locales = this.locales.get(options.locale).slice()
      , requestedLocale = locales[0]
      , locale
      , scopes
      , translations
    ;

    scope = this.getFullScope(scope, options);

    while (locales.length) {
      locale = locales.shift();
      scopes = scope.split(this.defaultSeparator);
      translations = this.translations[locale];

      if (!translations) {
        continue;
      }

      while (scopes.length) {
        translations = translations[scopes.shift()];

        if (translations === undefined || translations === null) {
          break;
        }
      }

      if (translations !== undefined && translations !== null) {
        return translations;
      }
    }

    if (this.isSet(options.defaultValue)) {
      return options.defaultValue;
    }
  };

  // Rails changed the way the meridian is stored.
  // It started with `date.meridian` returning an array,
  // then it switched to `time.am` and `time.pm`.
  // This function abstracts this difference and returns
  // the correct meridian or the default value when none is provided.
  I18n.meridian = function() {
    var time = this.lookup("time");
    var date = this.lookup("date");

    if (time && time.am && time.pm) {
      return [time.am, time.pm];
    } else if (date && date.meridian) {
      return date.meridian;
    } else {
      return DATE.meridian;
    }
  };

  // Merge serveral hash options, checking if value is set before
  // overwriting any value. The precedence is from left to right.
  //
  //     I18n.prepareOptions({name: "John Doe"}, {name: "Mary Doe", role: "user"});
  //     #=> {name: "John Doe", role: "user"}
  //
  I18n.prepareOptions = function() {
    var args = slice.call(arguments)
      , options = {}
      , subject
    ;

    while (args.length) {
      subject = args.shift();

      if (typeof(subject) != "object") {
        continue;
      }

      for (var attr in subject) {
        if (!subject.hasOwnProperty(attr)) {
          continue;
        }

        if (this.isSet(options[attr])) {
          continue;
        }

        options[attr] = subject[attr];
      }
    }

    return options;
  };

  // Generate a list of translation options for default fallbacks.
  // `defaultValue` is also deleted from options as it is returned as part of
  // the translationOptions array.
  I18n.createTranslationOptions = function(scope, options) {
    var translationOptions = [{scope: scope}];

    // Defaults should be an array of hashes containing either
    // fallback scopes or messages
    if (this.isSet(options.defaults)) {
      translationOptions = translationOptions.concat(options.defaults);
    }

    // Maintain support for defaultValue. Since it is always a message
    // insert it in to the translation options as such.
    if (this.isSet(options.defaultValue)) {
      translationOptions.push({ message: options.defaultValue });
      delete options.defaultValue;
    }

    return translationOptions;
  };

  // Translate the given scope with the provided options.
  I18n.translate = function(scope, options) {
    options = this.prepareOptions(options);

    var translationOptions = this.createTranslationOptions(scope, options);

    var translation;
    // Iterate through the translation options until a translation
    // or message is found.
    var translationFound =
      translationOptions.some(function(translationOption) {
        if (this.isSet(translationOption.scope)) {
          translation = this.lookup(translationOption.scope, options);
        } else if (this.isSet(translationOption.message)) {
          translation = translationOption.message;
        }

        if (translation !== undefined && translation !== null) {
          return true;
        }
      }, this);

    if (!translationFound) {
      return this.missingTranslation(scope, options);
    }

    if (typeof(translation) === "string") {
      translation = this.interpolate(translation, options);
    } else if (isObject(translation) && this.isSet(options.count)) {
      translation = this.pluralize(options.count, translation, options);
    }

    return translation;
  };

  // This function interpolates the all variables in the given message.
  I18n.interpolate = function(message, options) {
    options = this.prepareOptions(options);
    var matches = message.match(this.placeholder)
      , placeholder
      , value
      , name
      , regex
    ;

    if (!matches) {
      return message;
    }

    var value;

    while (matches.length) {
      placeholder = matches.shift();
      name = placeholder.replace(this.placeholder, "$1");

      if (this.isSet(options[name])) {
        value = options[name].toString().replace(/\$/gm, "_#$#_");
      } else if (name in options) {
        value = this.nullPlaceholder(placeholder, message, options);
      } else {
        value = this.missingPlaceholder(placeholder, message, options);
      }

      regex = new RegExp(placeholder.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}"));
      message = message.replace(regex, value);
    }

    return message.replace(/_#\$#_/g, "$");
  };

  // Pluralize the given scope using the `count` value.
  // The pluralized translation may have other placeholders,
  // which will be retrieved from `options`.
  I18n.pluralize = function(count, scope, options) {
    options = this.prepareOptions(options);
    var translations, pluralizer, keys, key, message;

    if (isObject(scope)) {
      translations = scope;
    } else {
      translations = this.lookup(scope, options);
    }

    if (!translations) {
      return this.missingTranslation(scope, options);
    }

    pluralizer = this.pluralization.get(options.locale);
    keys = pluralizer(count);

    while (keys.length) {
      key = keys.shift();

      if (this.isSet(translations[key])) {
        message = translations[key];
        break;
      }
    }

    options.count = String(count);
    return this.interpolate(message, options);
  };

  // Return a missing translation message for the given parameters.
  I18n.missingTranslation = function(scope, options) {
    //guess intended string
    if(this.missingBehaviour == 'guess'){
      //get only the last portion of the scope
      var s = scope.split('.').slice(-1)[0];
      //replace underscore with space && camelcase with space and lowercase letter
      return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix : '') +
          s.replace('_',' ').replace(/([a-z])([A-Z])/g,
          function(match, p1, p2) {return p1 + ' ' + p2.toLowerCase()} );
    }

    var fullScope           = this.getFullScope(scope, options);
    var fullScopeWithLocale = [this.currentLocale(), fullScope].join(this.defaultSeparator);

    return '[missing "' + fullScopeWithLocale + '" translation]';
  };

  // Return a missing placeholder message for given parameters
  I18n.missingPlaceholder = function(placeholder, message, options) {
    return "[missing " + placeholder + " value]";
  };

  I18n.nullPlaceholder = function() {
    return I18n.missingPlaceholder.apply(I18n, arguments);
  };

  // Format number using localization rules.
  // The options will be retrieved from the `number.format` scope.
  // If this isn't present, then the following options will be used:
  //
  // - `precision`: `3`
  // - `separator`: `"."`
  // - `delimiter`: `","`
  // - `strip_insignificant_zeros`: `false`
  //
  // You can also override these options by providing the `options` argument.
  //
  I18n.toNumber = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.format")
      , NUMBER_FORMAT
    );

    var negative = number < 0
      , string = toFixed(Math.abs(number), options.precision).toString()
      , parts = string.split(".")
      , precision
      , buffer = []
      , formattedNumber
      , format = options.format || "%n"
      , sign = negative ? "-" : ""
    ;

    number = parts[0];
    precision = parts[1];

    while (number.length > 0) {
      buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
      number = number.substr(0, number.length -3);
    }

    formattedNumber = buffer.join(options.delimiter);

    if (options.strip_insignificant_zeros && precision) {
      precision = precision.replace(/0+$/, "");
    }

    if (options.precision > 0 && precision) {
      formattedNumber += options.separator + precision;
    }

    if (options.sign_first) {
      format = "%s" + format;
    }
    else {
      format = format.replace("%n", "%s%n");
    }

    formattedNumber = format
      .replace("%u", options.unit)
      .replace("%n", formattedNumber)
      .replace("%s", sign)
    ;

    return formattedNumber;
  };

  // Format currency with localization rules.
  // The options will be retrieved from the `number.currency.format` and
  // `number.format` scopes, in that order.
  //
  // Any missing option will be retrieved from the `I18n.toNumber` defaults and
  // the following options:
  //
  // - `unit`: `"$"`
  // - `precision`: `2`
  // - `format`: `"%u%n"`
  // - `delimiter`: `","`
  // - `separator`: `"."`
  //
  // You can also override these options by providing the `options` argument.
  //
  I18n.toCurrency = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.currency.format")
      , this.lookup("number.format")
      , CURRENCY_FORMAT
    );

    return this.toNumber(number, options);
  };

  // Localize several values.
  // You can provide the following scopes: `currency`, `number`, or `percentage`.
  // If you provide a scope that matches the `/^(date|time)/` regular expression
  // then the `value` will be converted by using the `I18n.toTime` function.
  //
  // It will default to the value's `toString` function.
  //
  I18n.localize = function(scope, value, options) {
    options || (options = {});

    switch (scope) {
      case "currency":
        return this.toCurrency(value);
      case "number":
        scope = this.lookup("number.format");
        return this.toNumber(value, scope);
      case "percentage":
        return this.toPercentage(value);
      default:
        var localizedValue;

        if (scope.match(/^(date|time)/)) {
          localizedValue = this.toTime(scope, value);
        } else {
          localizedValue = value.toString();
        }

        return this.interpolate(localizedValue, options);
    }
  };

  // Parse a given `date` string into a JavaScript Date object.
  // This function is time zone aware.
  //
  // The following string formats are recognized:
  //
  //    yyyy-mm-dd
  //    yyyy-mm-dd[ T]hh:mm::ss
  //    yyyy-mm-dd[ T]hh:mm::ss
  //    yyyy-mm-dd[ T]hh:mm::ssZ
  //    yyyy-mm-dd[ T]hh:mm::ss+0000
  //    yyyy-mm-dd[ T]hh:mm::ss+00:00
  //    yyyy-mm-dd[ T]hh:mm::ss.123Z
  //
  I18n.parseDate = function(date) {
    var matches, convertedDate, fraction;
    // we have a date, so just return it.
    if (typeof(date) == "object") {
      return date;
    };

    matches = date.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/);

    if (matches) {
      for (var i = 1; i <= 6; i++) {
        matches[i] = parseInt(matches[i], 10) || 0;
      }

      // month starts on 0
      matches[2] -= 1;

      fraction = matches[7] ? 1000 * ("0" + matches[7]) : null;

      if (matches[8]) {
        convertedDate = new Date(Date.UTC(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction));
      } else {
        convertedDate = new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction);
      }
    } else if (typeof(date) == "number") {
      // UNIX timestamp
      convertedDate = new Date();
      convertedDate.setTime(date);
    } else if (date.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/)) {
      // This format `Wed Jul 20 13:03:39 +0000 2011` is parsed by
      // webkit/firefox, but not by IE, so we must parse it manually.
      convertedDate = new Date();
      convertedDate.setTime(Date.parse([
        RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5
      ].join(" ")));
    } else if (date.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/)) {
      // a valid javascript format with timezone info
      convertedDate = new Date();
      convertedDate.setTime(Date.parse(date));
    } else {
      // an arbitrary javascript string
      convertedDate = new Date();
      convertedDate.setTime(Date.parse(date));
    }

    return convertedDate;
  };

  // Formats time according to the directives in the given format string.
  // The directives begins with a percent (%) character. Any text not listed as a
  // directive will be passed through to the output string.
  //
  // The accepted formats are:
  //
  //     %a  - The abbreviated weekday name (Sun)
  //     %A  - The full weekday name (Sunday)
  //     %b  - The abbreviated month name (Jan)
  //     %B  - The full month name (January)
  //     %c  - The preferred local date and time representation
  //     %d  - Day of the month (01..31)
  //     %-d - Day of the month (1..31)
  //     %H  - Hour of the day, 24-hour clock (00..23)
  //     %-H - Hour of the day, 24-hour clock (0..23)
  //     %I  - Hour of the day, 12-hour clock (01..12)
  //     %-I - Hour of the day, 12-hour clock (1..12)
  //     %m  - Month of the year (01..12)
  //     %-m - Month of the year (1..12)
  //     %M  - Minute of the hour (00..59)
  //     %-M - Minute of the hour (0..59)
  //     %p  - Meridian indicator (AM  or  PM)
  //     %S  - Second of the minute (00..60)
  //     %-S - Second of the minute (0..60)
  //     %w  - Day of the week (Sunday is 0, 0..6)
  //     %y  - Year without a century (00..99)
  //     %-y - Year without a century (0..99)
  //     %Y  - Year with century
  //     %z  - Timezone offset (+0545)
  //
  I18n.strftime = function(date, format) {
    var options = this.lookup("date")
      , meridianOptions = I18n.meridian()
    ;

    if (!options) {
      options = {};
    }

    options = this.prepareOptions(options, DATE);

    var weekDay = date.getDay()
      , day = date.getDate()
      , year = date.getFullYear()
      , month = date.getMonth() + 1
      , hour = date.getHours()
      , hour12 = hour
      , meridian = hour > 11 ? 1 : 0
      , secs = date.getSeconds()
      , mins = date.getMinutes()
      , offset = date.getTimezoneOffset()
      , absOffsetHours = Math.floor(Math.abs(offset / 60))
      , absOffsetMinutes = Math.abs(offset) - (absOffsetHours * 60)
      , timezoneoffset = (offset > 0 ? "-" : "+") +
          (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) +
          (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes)
    ;

    if (hour12 > 12) {
      hour12 = hour12 - 12;
    } else if (hour12 === 0) {
      hour12 = 12;
    }

    format = format.replace("%a", options.abbr_day_names[weekDay]);
    format = format.replace("%A", options.day_names[weekDay]);
    format = format.replace("%b", options.abbr_month_names[month]);
    format = format.replace("%B", options.month_names[month]);
    format = format.replace("%d", padding(day));
    format = format.replace("%e", day);
    format = format.replace("%-d", day);
    format = format.replace("%H", padding(hour));
    format = format.replace("%-H", hour);
    format = format.replace("%I", padding(hour12));
    format = format.replace("%-I", hour12);
    format = format.replace("%m", padding(month));
    format = format.replace("%-m", month);
    format = format.replace("%M", padding(mins));
    format = format.replace("%-M", mins);
    format = format.replace("%p", meridianOptions[meridian]);
    format = format.replace("%S", padding(secs));
    format = format.replace("%-S", secs);
    format = format.replace("%w", weekDay);
    format = format.replace("%y", padding(year));
    format = format.replace("%-y", padding(year).replace(/^0+/, ""));
    format = format.replace("%Y", year);
    format = format.replace("%z", timezoneoffset);

    return format;
  };

  // Convert the given dateString into a formatted date.
  I18n.toTime = function(scope, dateString) {
    var date = this.parseDate(dateString)
      , format = this.lookup(scope)
    ;

    if (date.toString().match(/invalid/i)) {
      return date.toString();
    }

    if (!format) {
      return date.toString();
    }

    return this.strftime(date, format);
  };

  // Convert a number into a formatted percentage value.
  I18n.toPercentage = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.percentage.format")
      , this.lookup("number.format")
      , PERCENTAGE_FORMAT
    );

    return this.toNumber(number, options);
  };

  // Convert a number into a readable size representation.
  I18n.toHumanSize = function(number, options) {
    var kb = 1024
      , size = number
      , iterations = 0
      , unit
      , precision
    ;

    while (size >= kb && iterations < 4) {
      size = size / kb;
      iterations += 1;
    }

    if (iterations === 0) {
      unit = this.t("number.human.storage_units.units.byte", {count: size});
      precision = 0;
    } else {
      unit = this.t("number.human.storage_units.units." + SIZE_UNITS[iterations]);
      precision = (size - Math.floor(size) === 0) ? 0 : 1;
    }

    options = this.prepareOptions(
        options
      , {unit: unit, precision: precision, format: "%n%u", delimiter: ""}
    );

    return this.toNumber(size, options);
  };

  I18n.getFullScope = function(scope, options) {
    options = this.prepareOptions(options);

    // Deal with the scope as an array.
    if (scope.constructor === Array) {
      scope = scope.join(this.defaultSeparator);
    }

    // Deal with the scope option provided through the second argument.
    //
    //    I18n.t('hello', {scope: 'greetings'});
    //
    if (options.scope) {
      scope = [options.scope, scope].join(this.defaultSeparator);
    }

    return scope;
  };
  /**
   * Merge obj1 with obj2 (shallow merge), without modifying inputs
   * @param {Object} obj1
   * @param {Object} obj2
   * @returns {Object} Merged values of obj1 and obj2
   *
   * In order to support ES3, `Object.prototype.hasOwnProperty.call` is used
   * Idea is from:
   * https://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
   */
  I18n.extend = function ( obj1, obj2 ) {
    var extended = {};
    var prop;
    for (prop in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, prop)) {
        extended[prop] = obj1[prop];
      }
    }
    for (prop in obj2) {
      if (Object.prototype.hasOwnProperty.call(obj2, prop)) {
        extended[prop] = obj2[prop];
      }
    }
    return extended;
  };

  // Set aliases, so we can save some typing.
  I18n.t = I18n.translate;
  I18n.l = I18n.localize;
  I18n.p = I18n.pluralize;

  return I18n;
}));

;(function(factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // Node/CommonJS
    factory(require('i18n'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['i18n'], factory);
  } else {
    // Browser globals
    factory(this.I18n);
  }
}(function(I18n) {
  "use strict";

  I18n.translations = {"de":{"faker":{"address":{"building_number":["###","##","#","##a","##b","##c"],"city":["#{city_prefix} #{Name.first_name}#{city_suffix}","#{city_prefix} #{Name.first_name}","#{Name.first_name}#{city_suffix}","#{Name.last_name}#{city_suffix}"],"city_prefix":["Nord","Ost","West","Süd","Neu","Alt","Bad"],"city_suffix":["stadt","dorf","land","scheid","burg"],"country":["Ägypten","Äquatorialguinea","Äthiopien","Österreich","Afghanistan","Albanien","Algerien","Amerikanisch-Samoa","Amerikanische Jungferninseln","Andorra","Angola","Anguilla","Antarktis","Antigua und Barbuda","Argentinien","Armenien","Aruba","Aserbaidschan","Australien","Bahamas","Bahrain","Bangladesch","Barbados","Belarus","Belgien","Belize","Benin","die Bermudas","Bhutan","Bolivien","Bosnien und Herzegowina","Botsuana","Bouvetinsel","Brasilien","Britische Jungferninseln","Britisches Territorium im Indischen Ozean","Brunei Darussalam","Bulgarien","Burkina Faso","Burundi","Chile","China","Cookinseln","Costa Rica","Dänemark","Demokratische Republik Kongo","Demokratische Volksrepublik Korea","Deutschland","Dominica","Dominikanische Republik","Dschibuti","Ecuador","El Salvador","Eritrea","Estland","Färöer","Falklandinseln","Fidschi","Finnland","Frankreich","Französisch-Guayana","Französisch-Polynesien","Französische Gebiete im südlichen Indischen Ozean","Gabun","Gambia","Georgien","Ghana","Gibraltar","Grönland","Grenada","Griechenland","Guadeloupe","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Heard und McDonaldinseln","Honduras","Hongkong","Indien","Indonesien","Irak","Iran","Irland","Island","Israel","Italien","Jamaika","Japan","Jemen","Jordanien","Jugoslawien","Kaimaninseln","Kambodscha","Kamerun","Kanada","Kap Verde","Kasachstan","Katar","Kenia","Kirgisistan","Kiribati","Kleinere amerikanische Überseeinseln","Kokosinseln","Kolumbien","Komoren","Kongo","Kroatien","Kuba","Kuwait","Laos","Lesotho","Lettland","Libanon","Liberia","Libyen","Liechtenstein","Litauen","Luxemburg","Macau","Madagaskar","Malawi","Malaysia","Malediven","Mali","Malta","ehemalige jugoslawische Republik Mazedonien","Marokko","Marshallinseln","Martinique","Mauretanien","Mauritius","Mayotte","Mexiko","Mikronesien","Monaco","Mongolei","Montserrat","Mosambik","Myanmar","Nördliche Marianen","Namibia","Nauru","Nepal","Neukaledonien","Neuseeland","Nicaragua","Niederländische Antillen","Niederlande","Niger","Nigeria","Niue","Norfolkinsel","Norwegen","Oman","Osttimor","Pakistan","Palau","Panama","Papua-Neuguinea","Paraguay","Peru","Philippinen","Pitcairninseln","Polen","Portugal","Puerto Rico","Réunion","Republik Korea","Republik Moldau","Ruanda","Rumänien","Russische Föderation","São Tomé und Príncipe","Südafrika","Südgeorgien und Südliche Sandwichinseln","Salomonen","Sambia","Samoa","San Marino","Saudi-Arabien","Schweden","Schweiz","Senegal","Seychellen","Sierra Leone","Simbabwe","Singapur","Slowakei","Slowenien","Somalien","Spanien","Sri Lanka","St. Helena","St. Kitts und Nevis","St. Lucia","St. Pierre und Miquelon","St. Vincent und die Grenadinen","Sudan","Surinam","Svalbard und Jan Mayen","Swasiland","Syrien","Türkei","Tadschikistan","Taiwan","Tansania","Thailand","Togo","Tokelau","Tonga","Trinidad und Tobago","Tschad","Tschechische Republik","Tunesien","Turkmenistan","Turks- und Caicosinseln","Tuvalu","Uganda","Ukraine","Ungarn","Uruguay","Usbekistan","Vanuatu","Vatikanstadt","Venezuela","Vereinigte Arabische Emirate","Vereinigte Staaten","Vereinigtes Königreich","Vietnam","Wallis und Futuna","Weihnachtsinsel","Westsahara","Zentralafrikanische Republik","Zypern"],"default_country":["Deutschland"],"postcode":["#####","#####"],"secondary_address":["Apt. ###","Zimmer ###","# OG"],"state":["Baden-Württemberg","Bayern","Berlin","Brandenburg","Bremen","Hamburg","Hessen","Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz","Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thüringen"],"state_abbr":["BW","BY","BE","BB","HB","HH","HE","MV","NI","NW","RP","SL","SN","ST","SH","TH"],"street_address":["#{street_name} #{building_number}"],"street_name":["#{street_root}"],"street_root":["Ackerweg","Adalbert-Stifter-Str.","Adalbertstr.","Adolf-Baeyer-Str.","Adolf-Kaschny-Str.","Adolf-Reichwein-Str.","Adolfsstr.","Ahornweg","Ahrstr.","Akazienweg","Albert-Einstein-Str.","Albert-Schweitzer-Str.","Albertus-Magnus-Str.","Albert-Zarthe-Weg","Albin-Edelmann-Str.","Albrecht-Haushofer-Str.","Aldegundisstr.","Alexanderstr.","Alfred-Delp-Str.","Alfred-Kubin-Str.","Alfred-Stock-Str.","Alkenrather Str.","Allensteiner Str.","Alsenstr.","Alt Steinbücheler Weg","Alte Garten","Alte Heide","Alte Landstr.","Alte Ziegelei","Altenberger Str.","Altenhof","Alter Grenzweg","Altstadtstr.","Am Alten Gaswerk","Am Alten Schafstall","Am Arenzberg","Am Benthal","Am Birkenberg","Am Blauen Berg","Am Borsberg","Am Brungen","Am Büchelter Hof","Am Buttermarkt","Am Ehrenfriedhof","Am Eselsdamm","Am Falkenberg","Am Frankenberg","Am Gesundheitspark","Am Gierlichshof","Am Graben","Am Hagelkreuz","Am Hang","Am Heidkamp","Am Hemmelrather Hof","Am Hofacker","Am Hohen Ufer","Am Höllers Eck","Am Hühnerberg","Am Jägerhof","Am Junkernkamp","Am Kemperstiegel","Am Kettnersbusch","Am Kiesberg","Am Klösterchen","Am Knechtsgraben","Am Köllerweg","Am Köttersbach","Am Kreispark","Am Kronefeld","Am Küchenhof","Am Kühnsbusch","Am Lindenfeld","Am Märchen","Am Mittelberg","Am Mönchshof","Am Mühlenbach","Am Neuenhof","Am Nonnenbruch","Am Plattenbusch","Am Quettinger Feld","Am Rosenhügel","Am Sandberg","Am Scherfenbrand","Am Schokker","Am Silbersee","Am Sonnenhang","Am Sportplatz","Am Stadtpark","Am Steinberg","Am Telegraf","Am Thelenhof","Am Vogelkreuz","Am Vogelsang","Am Vogelsfeldchen","Am Wambacher Hof","Am Wasserturm","Am Weidenbusch","Am Weiher","Am Weingarten","Am Werth","Amselweg","An den Irlen","An den Rheinauen","An der Bergerweide","An der Dingbank","An der Evangelischen Kirche","An der Evgl. Kirche","An der Feldgasse","An der Fettehenne","An der Kante","An der Laach","An der Lehmkuhle","An der Lichtenburg","An der Luisenburg","An der Robertsburg","An der Schmitten","An der Schusterinsel","An der Steinrütsch","An St. Andreas","An St. Remigius","Andreasstr.","Ankerweg","Annette-Kolb-Str.","Apenrader Str.","Arnold-Ohletz-Str.","Atzlenbacher Str.","Auerweg","Auestr.","Auf dem Acker","Auf dem Blahnenhof","Auf dem Bohnbüchel","Auf dem Bruch","Auf dem End","Auf dem Forst","Auf dem Herberg","Auf dem Lehn","Auf dem Stein","Auf dem Weierberg","Auf dem Weiherhahn","Auf den Reien","Auf der Donnen","Auf der Grieße","Auf der Ohmer","Auf der Weide","Auf'm Berg","Auf'm Kamp","Augustastr.","August-Kekulé-Str.","A.-W.-v.-Hofmann-Str.","Bahnallee","Bahnhofstr.","Baltrumstr.","Bamberger Str.","Baumberger Str.","Bebelstr.","Beckers Kämpchen","Beerenstr.","Beethovenstr.","Behringstr.","Bendenweg","Bensberger Str.","Benzstr.","Bergische Landstr.","Bergstr.","Berliner Platz","Berliner Str.","Bernhard-Letterhaus-Str.","Bernhard-Lichtenberg-Str.","Bernhard-Ridder-Str.","Bernsteinstr.","Bertha-Middelhauve-Str.","Bertha-von-Suttner-Str.","Bertolt-Brecht-Str.","Berzeliusstr.","Bielertstr.","Biesenbach","Billrothstr.","Birkenbergstr.","Birkengartenstr.","Birkenweg","Bismarckstr.","Bitterfelder Str.","Blankenburg","Blaukehlchenweg","Blütenstr.","Boberstr.","Böcklerstr.","Bodelschwinghstr.","Bodestr.","Bogenstr.","Bohnenkampsweg","Bohofsweg","Bonifatiusstr.","Bonner Str.","Borkumstr.","Bornheimer Str.","Borsigstr.","Borussiastr.","Bracknellstr.","Brahmsweg","Brandenburger Str.","Breidenbachstr.","Breslauer Str.","Bruchhauser Str.","Brückenstr.","Brucknerstr.","Brüder-Bonhoeffer-Str.","Buchenweg","Bürgerbuschweg","Burgloch","Burgplatz","Burgstr.","Burgweg","Bürriger Weg","Burscheider Str.","Buschkämpchen","Butterheider Str.","Carl-Duisberg-Platz","Carl-Duisberg-Str.","Carl-Leverkus-Str.","Carl-Maria-von-Weber-Platz","Carl-Maria-von-Weber-Str.","Carlo-Mierendorff-Str.","Carl-Rumpff-Str.","Carl-von-Ossietzky-Str.","Charlottenburger Str.","Christian-Heß-Str.","Claasbruch","Clemens-Winkler-Str.","Concordiastr.","Cranachstr.","Dahlemer Str.","Daimlerstr.","Damaschkestr.","Danziger Str.","Debengasse","Dechant-Fein-Str.","Dechant-Krey-Str.","Deichtorstr.","Dhünnberg","Dhünnstr.","Dianastr.","Diedenhofener Str.","Diepental","Diepenthaler Str.","Dieselstr.","Dillinger Str.","Distelkamp","Dohrgasse","Domblick","Dönhoffstr.","Dornierstr.","Drachenfelsstr.","Dr.-August-Blank-Str.","Dresdener Str.","Driescher Hecke","Drosselweg","Dudweilerstr.","Dünenweg","Dünfelder Str.","Dünnwalder Grenzweg","Düppeler Str.","Dürerstr.","Dürscheider Weg","Düsseldorfer Str.","Edelrather Weg","Edmund-Husserl-Str.","Eduard-Spranger-Str.","Ehrlichstr.","Eichenkamp","Eichenweg","Eidechsenweg","Eifelstr.","Eifgenstr.","Eintrachtstr.","Elbestr.","Elisabeth-Langgässer-Str.","Elisabethstr.","Elisabeth-von-Thadden-Str.","Elisenstr.","Elsa-Brändström-Str.","Elsbachstr.","Else-Lasker-Schüler-Str.","Elsterstr.","Emil-Fischer-Str.","Emil-Nolde-Str.","Engelbertstr.","Engstenberger Weg","Entenpfuhl","Erbelegasse","Erftstr.","Erfurter Str.","Erich-Heckel-Str.","Erich-Klausener-Str.","Erich-Ollenhauer-Str.","Erlenweg","Ernst-Bloch-Str.","Ernst-Ludwig-Kirchner-Str.","Erzbergerstr.","Eschenallee","Eschenweg","Esmarchstr.","Espenweg","Euckenstr.","Eulengasse","Eulenkamp","Ewald-Flamme-Str.","Ewald-Röll-Str.","Fährstr.","Farnweg","Fasanenweg","Faßbacher Hof","Felderstr.","Feldkampstr.","Feldsiefer Weg","Feldsiefer Wiesen","Feldstr.","Feldtorstr.","Felix-von-Roll-Str.","Ferdinand-Lassalle-Str.","Fester Weg","Feuerbachstr.","Feuerdornweg","Fichtenweg","Fichtestr.","Finkelsteinstr.","Finkenweg","Fixheider Str.","Flabbenhäuschen","Flensburger Str.","Fliederweg","Florastr.","Florianweg","Flotowstr.","Flurstr.","Föhrenweg","Fontanestr.","Forellental","Fortunastr.","Franz-Esser-Str.","Franz-Hitze-Str.","Franz-Kail-Str.","Franz-Marc-Str.","Freiburger Str.","Freiheitstr.","Freiherr-vom-Stein-Str.","Freudenthal","Freudenthaler Weg","Fridtjof-Nansen-Str.","Friedenberger Str.","Friedensstr.","Friedhofstr.","Friedlandstr.","Friedlieb-Ferdinand-Runge-Str.","Friedrich-Bayer-Str.","Friedrich-Bergius-Platz","Friedrich-Ebert-Platz","Friedrich-Ebert-Str.","Friedrich-Engels-Str.","Friedrich-List-Str.","Friedrich-Naumann-Str.","Friedrich-Sertürner-Str.","Friedrichstr.","Friedrich-Weskott-Str.","Friesenweg","Frischenberg","Fritz-Erler-Str.","Fritz-Henseler-Str.","Fröbelstr.","Fürstenbergplatz","Fürstenbergstr.","Gabriele-Münter-Str.","Gartenstr.","Gebhardstr.","Geibelstr.","Gellertstr.","Georg-von-Vollmar-Str.","Gerhard-Domagk-Str.","Gerhart-Hauptmann-Str.","Gerichtsstr.","Geschwister-Scholl-Str.","Gezelinallee","Gierener Weg","Ginsterweg","Gisbert-Cremer-Str.","Glücksburger Str.","Gluckstr.","Gneisenaustr.","Goetheplatz","Goethestr.","Golo-Mann-Str.","Görlitzer Str.","Görresstr.","Graebestr.","Graf-Galen-Platz","Gregor-Mendel-Str.","Greifswalder Str.","Grillenweg","Gronenborner Weg","Große Kirchstr.","Grunder Wiesen","Grundermühle","Grundermühlenhof","Grundermühlenweg","Grüner Weg","Grunewaldstr.","Grünstr.","Günther-Weisenborn-Str.","Gustav-Freytag-Str.","Gustav-Heinemann-Str.","Gustav-Radbruch-Str.","Gut Reuschenberg","Gutenbergstr.","Haberstr.","Habichtgasse","Hafenstr.","Hagenauer Str.","Hahnenblecher","Halenseestr.","Halfenleimbach","Hallesche Str.","Halligstr.","Hamberger Str.","Hammerweg","Händelstr.","Hannah-Höch-Str.","Hans-Arp-Str.","Hans-Gerhard-Str.","Hans-Sachs-Str.","Hans-Schlehahn-Str.","Hans-von-Dohnanyi-Str.","Hardenbergstr.","Haselweg","Hauptstr.","Haus-Vorster-Str.","Hauweg","Havelstr.","Havensteinstr.","Haydnstr.","Hebbelstr.","Heckenweg","Heerweg","Hegelstr.","Heidberg","Heidehöhe","Heidestr.","Heimstättenweg","Heinrich-Böll-Str.","Heinrich-Brüning-Str.","Heinrich-Claes-Str.","Heinrich-Heine-Str.","Heinrich-Hörlein-Str.","Heinrich-Lübke-Str.","Heinrich-Lützenkirchen-Weg","Heinrichstr.","Heinrich-Strerath-Str.","Heinrich-von-Kleist-Str.","Heinrich-von-Stephan-Str.","Heisterbachstr.","Helenenstr.","Helmestr.","Hemmelrather Weg","Henry-T.-v.-Böttinger-Str.","Herderstr.","Heribertstr.","Hermann-Ehlers-Str.","Hermann-Hesse-Str.","Hermann-König-Str.","Hermann-Löns-Str.","Hermann-Milde-Str.","Hermann-Nörrenberg-Str.","Hermann-von-Helmholtz-Str.","Hermann-Waibel-Str.","Herzogstr.","Heymannstr.","Hindenburgstr.","Hirzenberg","Hitdorfer Kirchweg","Hitdorfer Str.","Höfer Mühle","Höfer Weg","Hohe Str.","Höhenstr.","Höltgestal","Holunderweg","Holzer Weg","Holzer Wiesen","Hornpottweg","Hubertusweg","Hufelandstr.","Hufer Weg","Humboldtstr.","Hummelsheim","Hummelweg","Humperdinckstr.","Hüscheider Gärten","Hüscheider Str.","Hütte","Ilmstr.","Im Bergischen Heim","Im Bruch","Im Buchenhain","Im Bühl","Im Burgfeld","Im Dorf","Im Eisholz","Im Friedenstal","Im Frohental","Im Grunde","Im Hederichsfeld","Im Jücherfeld","Im Kalkfeld","Im Kirberg","Im Kirchfeld","Im Kreuzbruch","Im Mühlenfeld","Im Nesselrader Kamp","Im Oberdorf","Im Oberfeld","Im Rosengarten","Im Rottland","Im Scheffengarten","Im Staderfeld","Im Steinfeld","Im Weidenblech","Im Winkel","Im Ziegelfeld","Imbach","Imbacher Weg","Immenweg","In den Blechenhöfen","In den Dehlen","In der Birkenau","In der Dasladen","In der Felderhütten","In der Hartmannswiese","In der Höhle","In der Schaafsdellen","In der Wasserkuhl","In der Wüste","In Holzhausen","Insterstr.","Jacob-Fröhlen-Str.","Jägerstr.","Jahnstr.","Jakob-Eulenberg-Weg","Jakobistr.","Jakob-Kaiser-Str.","Jenaer Str.","Johannes-Baptist-Str.","Johannes-Dott-Str.","Johannes-Popitz-Str.","Johannes-Wislicenus-Str.","Johannisburger Str.","Johann-Janssen-Str.","Johann-Wirtz-Weg","Josefstr.","Jüch","Julius-Doms-Str.","Julius-Leber-Str.","Kaiserplatz","Kaiserstr.","Kaiser-Wilhelm-Allee","Kalkstr.","Kämpchenstr.","Kämpenwiese","Kämper Weg","Kamptalweg","Kanalstr.","Kandinskystr.","Kantstr.","Kapellenstr.","Karl-Arnold-Str.","Karl-Bosch-Str.","Karl-Bückart-Str.","Karl-Carstens-Ring","Karl-Friedrich-Goerdeler-Str.","Karl-Jaspers-Str.","Karl-König-Str.","Karl-Krekeler-Str.","Karl-Marx-Str.","Karlstr.","Karl-Ulitzka-Str.","Karl-Wichmann-Str.","Karl-Wingchen-Str.","Käsenbrod","Käthe-Kollwitz-Str.","Katzbachstr.","Kerschensteinerstr.","Kiefernweg","Kieler Str.","Kieselstr.","Kiesweg","Kinderhausen","Kleiberweg","Kleine Kirchstr.","Kleingansweg","Kleinheider Weg","Klief","Kneippstr.","Knochenbergsweg","Kochergarten","Kocherstr.","Kockelsberg","Kolberger Str.","Kolmarer Str.","Kölner Gasse","Kölner Str.","Kolpingstr.","Königsberger Platz","Konrad-Adenauer-Platz","Köpenicker Str.","Kopernikusstr.","Körnerstr.","Köschenberg","Köttershof","Kreuzbroicher Str.","Kreuzkamp","Krummer Weg","Kruppstr.","Kuhlmannweg","Kump","Kumper Weg","Kunstfeldstr.","Küppersteger Str.","Kursiefen","Kursiefer Weg","Kurtekottenweg","Kurt-Schumacher-Ring","Kyllstr.","Langenfelder Str.","Längsleimbach","Lärchenweg","Legienstr.","Lehner Mühle","Leichlinger Str.","Leimbacher Hof","Leinestr.","Leineweberstr.","Leipziger Str.","Lerchengasse","Lessingstr.","Libellenweg","Lichstr.","Liebigstr.","Lindenstr.","Lingenfeld","Linienstr.","Lippe","Löchergraben","Löfflerstr.","Loheweg","Lohrbergstr.","Lohrstr.","Löhstr.","Lortzingstr.","Lötzener Str.","Löwenburgstr.","Lucasstr.","Ludwig-Erhard-Platz","Ludwig-Girtler-Str.","Ludwig-Knorr-Str.","Luisenstr.","Lupinenweg","Lurchenweg","Lützenkirchener Str.","Lycker Str.","Maashofstr.","Manforter Str.","Marc-Chagall-Str.","Maria-Dresen-Str.","Maria-Terwiel-Str.","Marie-Curie-Str.","Marienburger Str.","Mariendorfer Str.","Marienwerderstr.","Marie-Schlei-Str.","Marktplatz","Markusweg","Martin-Buber-Str.","Martin-Heidegger-Str.","Martin-Luther-Str.","Masurenstr.","Mathildenweg","Maurinusstr.","Mauspfad","Max-Beckmann-Str.","Max-Delbrück-Str.","Max-Ernst-Str.","Max-Holthausen-Platz","Max-Horkheimer-Str.","Max-Liebermann-Str.","Max-Pechstein-Str.","Max-Planck-Str.","Max-Scheler-Str.","Max-Schönenberg-Str.","Maybachstr.","Meckhofer Feld","Meisenweg","Memelstr.","Menchendahler Str.","Mendelssohnstr.","Merziger Str.","Mettlacher Str.","Metzer Str.","Michaelsweg","Miselohestr.","Mittelstr.","Mohlenstr.","Moltkestr.","Monheimer Str.","Montanusstr.","Montessoriweg","Moosweg","Morsbroicher Str.","Moselstr.","Moskauer Str.","Mozartstr.","Mühlenweg","Muhrgasse","Muldestr.","Mülhausener Str.","Mülheimer Str.","Münsters Gäßchen","Münzstr.","Müritzstr.","Myliusstr.","Nachtigallenweg","Nauener Str.","Neißestr.","Nelly-Sachs-Str.","Netzestr.","Neuendriesch","Neuenhausgasse","Neuenkamp","Neujudenhof","Neukronenberger Str.","Neustadtstr.","Nicolai-Hartmann-Str.","Niederblecher","Niederfeldstr.","Nietzschestr.","Nikolaus-Groß-Str.","Nobelstr.","Norderneystr.","Nordstr.","Ober dem Hof","Obere Lindenstr.","Obere Str.","Oberölbach","Odenthaler Str.","Oderstr.","Okerstr.","Olof-Palme-Str.","Ophovener Str.","Opladener Platz","Opladener Str.","Ortelsburger Str.","Oskar-Moll-Str.","Oskar-Schlemmer-Str.","Oststr.","Oswald-Spengler-Str.","Otto-Dix-Str.","Otto-Grimm-Str.","Otto-Hahn-Str.","Otto-Müller-Str.","Otto-Stange-Str.","Ottostr.","Otto-Varnhagen-Str.","Otto-Wels-Str.","Ottweilerstr.","Oulustr.","Overfeldweg","Pappelweg","Paracelsusstr.","Parkstr.","Pastor-Louis-Str.","Pastor-Scheibler-Str.","Pastorskamp","Paul-Klee-Str.","Paul-Löbe-Str.","Paulstr.","Peenestr.","Pescher Busch","Peschstr.","Pestalozzistr.","Peter-Grieß-Str.","Peter-Joseph-Lenné-Str.","Peter-Neuenheuser-Str.","Petersbergstr.","Peterstr.","Pfarrer-Jekel-Str.","Pfarrer-Klein-Str.","Pfarrer-Röhr-Str.","Pfeilshofstr.","Philipp-Ott-Str.","Piet-Mondrian-Str.","Platanenweg","Pommernstr.","Porschestr.","Poststr.","Potsdamer Str.","Pregelstr.","Prießnitzstr.","Pützdelle","Quarzstr.","Quettinger Str.","Rat-Deycks-Str.","Rathenaustr.","Ratherkämp","Ratiborer Str.","Raushofstr.","Regensburger Str.","Reinickendorfer Str.","Renkgasse","Rennbaumplatz","Rennbaumstr.","Reuschenberger Str.","Reusrather Str.","Reuterstr.","Rheinallee","Rheindorfer Str.","Rheinstr.","Rhein-Wupper-Platz","Richard-Wagner-Str.","Rilkestr.","Ringstr.","Robert-Blum-Str.","Robert-Koch-Str.","Robert-Medenwald-Str.","Rolandstr.","Romberg","Röntgenstr.","Roonstr.","Ropenstall","Ropenstaller Weg","Rosenthal","Rostocker Str.","Rotdornweg","Röttgerweg","Rückertstr.","Rudolf-Breitscheid-Str.","Rudolf-Mann-Platz","Rudolf-Stracke-Str.","Ruhlachplatz","Ruhlachstr.","Rüttersweg","Saalestr.","Saarbrücker Str.","Saarlauterner Str.","Saarstr.","Salamanderweg","Samlandstr.","Sanddornstr.","Sandstr.","Sauerbruchstr.","Schäfershütte","Scharnhorststr.","Scheffershof","Scheidemannstr.","Schellingstr.","Schenkendorfstr.","Schießbergstr.","Schillerstr.","Schlangenhecke","Schlebuscher Heide","Schlebuscher Str.","Schlebuschrath","Schlehdornstr.","Schleiermacherstr.","Schloßstr.","Schmalenbruch","Schnepfenflucht","Schöffenweg","Schöllerstr.","Schöne Aussicht","Schöneberger Str.","Schopenhauerstr.","Schubertplatz","Schubertstr.","Schulberg","Schulstr.","Schumannstr.","Schwalbenweg","Schwarzastr.","Sebastianusweg","Semmelweisstr.","Siebelplatz","Siemensstr.","Solinger Str.","Sonderburger Str.","Spandauer Str.","Speestr.","Sperberweg","Sperlingsweg","Spitzwegstr.","Sporrenberger Mühle","Spreestr.","St. Ingberter Str.","Starenweg","Stauffenbergstr.","Stefan-Zweig-Str.","Stegerwaldstr.","Steglitzer Str.","Steinbücheler Feld","Steinbücheler Str.","Steinstr.","Steinweg","Stephan-Lochner-Str.","Stephanusstr.","Stettiner Str.","Stixchesstr.","Stöckenstr.","Stralsunder Str.","Straßburger Str.","Stresemannplatz","Strombergstr.","Stromstr.","Stüttekofener Str.","Sudestr.","Sürderstr.","Syltstr.","Talstr.","Tannenbergstr.","Tannenweg","Taubenweg","Teitscheider Weg","Telegrafenstr.","Teltower Str.","Tempelhofer Str.","Theodor-Adorno-Str.","Theodor-Fliedner-Str.","Theodor-Gierath-Str.","Theodor-Haubach-Str.","Theodor-Heuss-Ring","Theodor-Storm-Str.","Theodorstr.","Thomas-Dehler-Str.","Thomas-Morus-Str.","Thomas-von-Aquin-Str.","Tönges Feld","Torstr.","Treptower Str.","Treuburger Str.","Uhlandstr.","Ulmenweg","Ulmer Str.","Ulrichstr.","Ulrich-von-Hassell-Str.","Umlag","Unstrutstr.","Unter dem Schildchen","Unterölbach","Unterstr.","Uppersberg","Van\\'t-Hoff-Str.","Veit-Stoß-Str.","Vereinsstr.","Viktor-Meyer-Str.","Vincent-van-Gogh-Str.","Virchowstr.","Voigtslach","Volhardstr.","Völklinger Str.","Von-Brentano-Str.","Von-Diergardt-Str.","Von-Eichendorff-Str.","Von-Ketteler-Str.","Von-Knoeringen-Str.","Von-Pettenkofer-Str.","Von-Siebold-Str.","Wacholderweg","Waldstr.","Walter-Flex-Str.","Walter-Hempel-Str.","Walter-Hochapfel-Str.","Walter-Nernst-Str.","Wannseestr.","Warnowstr.","Warthestr.","Weddigenstr.","Weichselstr.","Weidenstr.","Weidfeldstr.","Weiherfeld","Weiherstr.","Weinhäuser Str.","Weißdornweg","Weißenseestr.","Weizkamp","Werftstr.","Werkstättenstr.","Werner-Heisenberg-Str.","Werrastr.","Weyerweg","Widdauener Str.","Wiebertshof","Wiehbachtal","Wiembachallee","Wiesdorfer Platz","Wiesenstr.","Wilhelm-Busch-Str.","Wilhelm-Hastrich-Str.","Wilhelm-Leuschner-Str.","Wilhelm-Liebknecht-Str.","Wilhelmsgasse","Wilhelmstr.","Willi-Baumeister-Str.","Willy-Brandt-Ring","Winand-Rossi-Str.","Windthorststr.","Winkelweg","Winterberg","Wittenbergstr.","Wolf-Vostell-Str.","Wolkenburgstr.","Wupperstr.","Wuppertalstr.","Wüstenhof","Yitzhak-Rabin-Str.","Zauberkuhle","Zedernweg","Zehlendorfer Str.","Zehntenweg","Zeisigweg","Zeppelinstr.","Zschopaustr.","Zum Claashäuschen","Zündhütchenweg","Zur Alten Brauerei","Zur alten Fabrik"]},"cell_phone":{"formats":["+49-1##-#######","+49-1###-########"]},"company":{"legal_form":["GmbH","AG","Gruppe","KG","GmbH \u0026 Co. KG","UG","OHG"],"name":["#{Name.last_name} #{suffix}","#{Name.last_name}-#{Name.last_name}","#{Name.last_name}, #{Name.last_name} und #{Name.last_name}"],"suffix":["GmbH","AG","Gruppe","KG","GmbH \u0026 Co. KG","UG","OHG"]},"internet":{"domain_suffix":["com","info","name","net","org","de","ch"],"free_email":["gmail.com","yahoo.com","hotmail.com"]},"lorem":{"words":["alias","consequatur","aut","perferendis","sit","voluptatem","accusantium","doloremque","aperiam","eaque","ipsa","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt","explicabo","aspernatur","aut","odit","aut","fugit","sed","quia","consequuntur","magni","dolores","eos","qui","ratione","voluptatem","sequi","nesciunt","neque","dolorem","ipsum","quia","dolor","sit","amet","consectetur","adipisci","velit","sed","quia","non","numquam","eius","modi","tempora","incidunt","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem","ut","enim","ad","minima","veniam","quis","nostrum","exercitationem","ullam","corporis","nemo","enim","ipsam","voluptatem","quia","voluptas","sit","suscipit","laboriosam","nisi","ut","aliquid","ex","ea","commodi","consequatur","quis","autem","vel","eum","iure","reprehenderit","qui","in","ea","voluptate","velit","esse","quam","nihil","molestiae","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","laudantium","totam","rem","voluptatum","deleniti","atque","corrupti","quos","dolores","et","quas","molestias","excepturi","sint","occaecati","cupiditate","non","provident","sed","ut","perspiciatis","unde","omnis","iste","natus","error","similique","sunt","in","culpa","qui","officia","deserunt","mollitia","animi","id","est","laborum","et","dolorum","fuga","et","harum","quidem","rerum","facilis","est","et","expedita","distinctio","nam","libero","tempore","cum","soluta","nobis","est","eligendi","optio","cumque","nihil","impedit","quo","porro","quisquam","est","qui","minus","id","quod","maxime","placeat","facere","possimus","omnis","voluptas","assumenda","est","omnis","dolor","repellendus","temporibus","autem","quibusdam","et","aut","consequatur","vel","illum","qui","dolorem","eum","fugiat","quo","voluptas","nulla","pariatur","at","vero","eos","et","accusamus","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet","ut","et","voluptates","repudiandae","sint","et","molestiae","non","recusandae","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus","ut","aut","reiciendis","voluptatibus","maiores","doloribus","asperiores","repellat"]},"name":{"first_name":["Aaron","Abdul","Abdullah","Adam","Adrian","Adriano","Ahmad","Ahmed","Ahmet","Alan","Albert","Alessandro","Alessio","Alex","Alexander","Alfred","Ali","Amar","Amir","Amon","Andre","Andreas","Andrew","Angelo","Ansgar","Anthony","Anton","Antonio","Arda","Arian","Armin","Arne","Arno","Arthur","Artur","Arved","Arvid","Ayman","Baran","Baris","Bastian","Batuhan","Bela","Ben","Benedikt","Benjamin","Bennet","Bennett","Benno","Bent","Berat","Berkay","Bernd","Bilal","Bjarne","Björn","Bo","Boris","Brandon","Brian","Bruno","Bryan","Burak","Calvin","Can","Carl","Carlo","Carlos","Caspar","Cedric","Cedrik","Cem","Charlie","Chris","Christian","Christiano","Christoph","Christopher","Claas","Clemens","Colin","Collin","Conner","Connor","Constantin","Corvin","Curt","Damian","Damien","Daniel","Danilo","Danny","Darian","Dario","Darius","Darren","David","Davide","Davin","Dean","Deniz","Dennis","Denny","Devin","Diego","Dion","Domenic","Domenik","Dominic","Dominik","Dorian","Dustin","Dylan","Ecrin","Eddi","Eddy","Edgar","Edwin","Efe","Ege","Elia","Eliah","Elias","Elijah","Emanuel","Emil","Emilian","Emilio","Emir","Emirhan","Emre","Enes","Enno","Enrico","Eren","Eric","Erik","Etienne","Fabian","Fabien","Fabio","Fabrice","Falk","Felix","Ferdinand","Fiete","Filip","Finlay","Finley","Finn","Finnley","Florian","Francesco","Franz","Frederic","Frederick","Frederik","Friedrich","Fritz","Furkan","Fynn","Gabriel","Georg","Gerrit","Gian","Gianluca","Gino","Giuliano","Giuseppe","Gregor","Gustav","Hagen","Hamza","Hannes","Hanno","Hans","Hasan","Hassan","Hauke","Hendrik","Hennes","Henning","Henri","Henrick","Henrik","Henry","Hugo","Hussein","Ian","Ibrahim","Ilias","Ilja","Ilyas","Immanuel","Ismael","Ismail","Ivan","Iven","Jack","Jacob","Jaden","Jakob","Jamal","James","Jamie","Jan","Janek","Janis","Janne","Jannek","Jannes","Jannik","Jannis","Jano","Janosch","Jared","Jari","Jarne","Jarno","Jaron","Jason","Jasper","Jay","Jayden","Jayson","Jean","Jens","Jeremias","Jeremie","Jeremy","Jermaine","Jerome","Jesper","Jesse","Jim","Jimmy","Joe","Joel","Joey","Johann","Johannes","John","Johnny","Jon","Jona","Jonah","Jonas","Jonathan","Jonte","Joost","Jordan","Joris","Joscha","Joschua","Josef","Joseph","Josh","Joshua","Josua","Juan","Julian","Julien","Julius","Juri","Justin","Justus","Kaan","Kai","Kalle","Karim","Karl","Karlo","Kay","Keanu","Kenan","Kenny","Keno","Kerem","Kerim","Kevin","Kian","Kilian","Kim","Kimi","Kjell","Klaas","Klemens","Konrad","Konstantin","Koray","Korbinian","Kurt","Lars","Lasse","Laurence","Laurens","Laurenz","Laurin","Lean","Leander","Leandro","Leif","Len","Lenn","Lennard","Lennart","Lennert","Lennie","Lennox","Lenny","Leo","Leon","Leonard","Leonardo","Leonhard","Leonidas","Leopold","Leroy","Levent","Levi","Levin","Lewin","Lewis","Liam","Lian","Lias","Lino","Linus","Lio","Lion","Lionel","Logan","Lorenz","Lorenzo","Loris","Louis","Luan","Luc","Luca","Lucas","Lucian","Lucien","Ludwig","Luis","Luiz","Luk","Luka","Lukas","Luke","Lutz","Maddox","Mads","Magnus","Maik","Maksim","Malik","Malte","Manuel","Marc","Marcel","Marco","Marcus","Marek","Marian","Mario","Marius","Mark","Marko","Markus","Marlo","Marlon","Marten","Martin","Marvin","Marwin","Mateo","Mathis","Matis","Mats","Matteo","Mattes","Matthias","Matthis","Matti","Mattis","Maurice","Max","Maxim","Maximilian","Mehmet","Meik","Melvin","Merlin","Mert","Michael","Michel","Mick","Miguel","Mika","Mikail","Mike","Milan","Milo","Mio","Mirac","Mirco","Mirko","Mohamed","Mohammad","Mohammed","Moritz","Morten","Muhammed","Murat","Mustafa","Nathan","Nathanael","Nelson","Neo","Nevio","Nick","Niclas","Nico","Nicolai","Nicolas","Niels","Nikita","Niklas","Niko","Nikolai","Nikolas","Nils","Nino","Noah","Noel","Norman","Odin","Oke","Ole","Oliver","Omar","Onur","Oscar","Oskar","Pascal","Patrice","Patrick","Paul","Peer","Pepe","Peter","Phil","Philip","Philipp","Pierre","Piet","Pit","Pius","Quentin","Quirin","Rafael","Raik","Ramon","Raphael","Rasmus","Raul","Rayan","René","Ricardo","Riccardo","Richard","Rick","Rico","Robert","Robin","Rocco","Roman","Romeo","Ron","Ruben","Ryan","Said","Salih","Sam","Sami","Sammy","Samuel","Sandro","Santino","Sascha","Sean","Sebastian","Selim","Semih","Shawn","Silas","Simeon","Simon","Sinan","Sky","Stefan","Steffen","Stephan","Steve","Steven","Sven","Sönke","Sören","Taha","Tamino","Tammo","Tarik","Tayler","Taylor","Teo","Theo","Theodor","Thies","Thilo","Thomas","Thorben","Thore","Thorge","Tiago","Til","Till","Tillmann","Tim","Timm","Timo","Timon","Timothy","Tino","Titus","Tizian","Tjark","Tobias","Tom","Tommy","Toni","Tony","Torben","Tore","Tristan","Tyler","Tyron","Umut","Valentin","Valentino","Veit","Victor","Viktor","Vin","Vincent","Vito","Vitus","Wilhelm","Willi","William","Willy","Xaver","Yannic","Yannick","Yannik","Yannis","Yasin","Youssef","Yunus","Yusuf","Yven","Yves","Ömer","Aaliyah","Abby","Abigail","Ada","Adelina","Adriana","Aileen","Aimee","Alana","Alea","Alena","Alessa","Alessia","Alexa","Alexandra","Alexia","Alexis","Aleyna","Alia","Alica","Alice","Alicia","Alina","Alisa","Alisha","Alissa","Aliya","Aliyah","Allegra","Alma","Alyssa","Amalia","Amanda","Amelia","Amelie","Amina","Amira","Amy","Ana","Anabel","Anastasia","Andrea","Angela","Angelina","Angelique","Anja","Ann","Anna","Annabel","Annabell","Annabelle","Annalena","Anne","Anneke","Annelie","Annemarie","Anni","Annie","Annika","Anny","Anouk","Antonia","Arda","Ariana","Ariane","Arwen","Ashley","Asya","Aurelia","Aurora","Ava","Ayleen","Aylin","Ayse","Azra","Betty","Bianca","Bianka","Caitlin","Cara","Carina","Carla","Carlotta","Carmen","Carolin","Carolina","Caroline","Cassandra","Catharina","Catrin","Cecile","Cecilia","Celia","Celina","Celine","Ceyda","Ceylin","Chantal","Charleen","Charlotta","Charlotte","Chayenne","Cheyenne","Chiara","Christin","Christina","Cindy","Claire","Clara","Clarissa","Colleen","Collien","Cora","Corinna","Cosima","Dana","Daniela","Daria","Darleen","Defne","Delia","Denise","Diana","Dilara","Dina","Dorothea","Ecrin","Eda","Eileen","Ela","Elaine","Elanur","Elea","Elena","Eleni","Eleonora","Eliana","Elif","Elina","Elisa","Elisabeth","Ella","Ellen","Elli","Elly","Elsa","Emelie","Emely","Emilia","Emilie","Emily","Emma","Emmely","Emmi","Emmy","Enie","Enna","Enya","Esma","Estelle","Esther","Eva","Evelin","Evelina","Eveline","Evelyn","Fabienne","Fatima","Fatma","Felicia","Felicitas","Felina","Femke","Fenja","Fine","Finia","Finja","Finnja","Fiona","Flora","Florentine","Francesca","Franka","Franziska","Frederike","Freya","Frida","Frieda","Friederike","Giada","Gina","Giulia","Giuliana","Greta","Hailey","Hana","Hanna","Hannah","Heidi","Helen","Helena","Helene","Helin","Henriette","Henrike","Hermine","Ida","Ilayda","Imke","Ina","Ines","Inga","Inka","Irem","Isa","Isabel","Isabell","Isabella","Isabelle","Ivonne","Jacqueline","Jamie","Jamila","Jana","Jane","Janin","Janina","Janine","Janna","Janne","Jara","Jasmin","Jasmina","Jasmine","Jella","Jenna","Jennifer","Jenny","Jessica","Jessy","Jette","Jil","Jill","Joana","Joanna","Joelina","Joeline","Joelle","Johanna","Joleen","Jolie","Jolien","Jolin","Jolina","Joline","Jona","Jonah","Jonna","Josefin","Josefine","Josephin","Josephine","Josie","Josy","Joy","Joyce","Judith","Judy","Jule","Julia","Juliana","Juliane","Julie","Julienne","Julika","Julina","Juna","Justine","Kaja","Karina","Karla","Karlotta","Karolina","Karoline","Kassandra","Katarina","Katharina","Kathrin","Katja","Katrin","Kaya","Kayra","Kiana","Kiara","Kim","Kimberley","Kimberly","Kira","Klara","Korinna","Kristin","Kyra","Laila","Lana","Lara","Larissa","Laura","Laureen","Lavinia","Lea","Leah","Leana","Leandra","Leann","Lee","Leila","Lena","Lene","Leni","Lenia","Lenja","Lenya","Leona","Leoni","Leonie","Leonora","Leticia","Letizia","Levke","Leyla","Lia","Liah","Liana","Lili","Lilia","Lilian","Liliana","Lilith","Lilli","Lillian","Lilly","Lily","Lina","Linda","Lindsay","Line","Linn","Linnea","Lisa","Lisann","Lisanne","Liv","Livia","Liz","Lola","Loreen","Lorena","Lotta","Lotte","Louisa","Louise","Luana","Luca","Lucia","Lucie","Lucienne","Lucy","Luisa","Luise","Luka","Luna","Luzie","Lya","Lydia","Lyn","Lynn","Madeleine","Madita","Madleen","Madlen","Magdalena","Maike","Mailin","Maira","Maja","Malena","Malia","Malin","Malina","Mandy","Mara","Marah","Mareike","Maren","Maria","Mariam","Marie","Marieke","Mariella","Marika","Marina","Marisa","Marissa","Marit","Marla","Marleen","Marlen","Marlena","Marlene","Marta","Martha","Mary","Maryam","Mathilda","Mathilde","Matilda","Maxi","Maxima","Maxine","Maya","Mayra","Medina","Medine","Meike","Melanie","Melek","Melike","Melina","Melinda","Melis","Melisa","Melissa","Merle","Merve","Meryem","Mette","Mia","Michaela","Michelle","Mieke","Mila","Milana","Milena","Milla","Mina","Mira","Miray","Miriam","Mirja","Mona","Monique","Nadine","Nadja","Naemi","Nancy","Naomi","Natalia","Natalie","Nathalie","Neele","Nela","Nele","Nelli","Nelly","Nia","Nicole","Nika","Nike","Nikita","Nila","Nina","Nisa","Noemi","Nora","Olivia","Patricia","Patrizia","Paula","Paulina","Pauline","Penelope","Philine","Phoebe","Pia","Rahel","Rania","Rebecca","Rebekka","Riana","Rieke","Rike","Romina","Romy","Ronja","Rosa","Rosalie","Ruby","Sabrina","Sahra","Sally","Salome","Samantha","Samia","Samira","Sandra","Sandy","Sanja","Saphira","Sara","Sarah","Saskia","Selin","Selina","Selma","Sena","Sidney","Sienna","Silja","Sina","Sinja","Smilla","Sofia","Sofie","Sonja","Sophia","Sophie","Soraya","Stefanie","Stella","Stephanie","Stina","Sude","Summer","Susanne","Svea","Svenja","Sydney","Tabea","Talea","Talia","Tamara","Tamia","Tamina","Tanja","Tara","Tarja","Teresa","Tessa","Thalea","Thalia","Thea","Theresa","Tia","Tina","Tomke","Tuana","Valentina","Valeria","Valerie","Vanessa","Vera","Veronika","Victoria","Viktoria","Viola","Vivian","Vivien","Vivienne","Wibke","Wiebke","Xenia","Yara","Yaren","Yasmin","Ylvi","Ylvie","Yvonne","Zara","Zehra","Zeynep","Zoe","Zoey","Zoé"],"last_name":["Abel","Abicht","Abraham","Abramovic","Abt","Achilles","Achkinadze","Ackermann","Adam","Adams","Ade","Agostini","Ahlke","Ahrenberg","Ahrens","Aigner","Albert","Albrecht","Alexa","Alexander","Alizadeh","Allgeyer","Amann","Amberg","Anding","Anggreny","Apitz","Arendt","Arens","Arndt","Aryee","Aschenbroich","Assmus","Astafei","Auer","Axmann","Baarck","Bachmann","Badane","Bader","Baganz","Bahl","Bak","Balcer","Balck","Balkow","Balnuweit","Balzer","Banse","Barr","Bartels","Barth","Barylla","Baseda","Battke","Bauer","Bauermeister","Baumann","Baumeister","Bauschinger","Bauschke","Bayer","Beavogui","Beck","Beckel","Becker","Beckmann","Bedewitz","Beele","Beer","Beggerow","Beh","Behr","Behrenbruch","Belz","Bender","Benecke","Benner","Benninger","Benzing","Berends","Berger","Berner","Berning","Bertenbreiter","Best","Bethke","Betz","Beushausen","Beutelspacher","Beyer","Biba","Bichler","Bickel","Biedermann","Bieler","Bielert","Bienasch","Bienias","Biesenbach","Bigdeli","Birkemeyer","Bittner","Blank","Blaschek","Blassneck","Bloch","Blochwitz","Blockhaus","Blum","Blume","Bock","Bode","Bogdashin","Bogenrieder","Bohge","Bolm","Borgschulze","Bork","Bormann","Bornscheuer","Borrmann","Borsch","Boruschewski","Bos","Bosler","Bourrouag","Bouschen","Boxhammer","Boyde","Bozsik","Brand","Brandenburg","Brandis","Brandt","Brauer","Braun","Brehmer","Breitenstein","Bremer","Bremser","Brenner","Brettschneider","Breu","Breuer","Briesenick","Bringmann","Brinkmann","Brix","Broening","Brosch","Bruckmann","Bruder","Bruhns","Brunner","Bruns","Bräutigam","Brömme","Brüggmann","Buchholz","Buchrucker","Buder","Bultmann","Bunjes","Burger","Burghagen","Burkhard","Burkhardt","Burmeister","Busch","Buschbaum","Busemann","Buss","Busse","Bussmann","Byrd","Bäcker","Böhm","Bönisch","Börgeling","Börner","Böttner","Büchele","Bühler","Büker","Büngener","Bürger","Bürklein","Büscher","Büttner","Camara","Carlowitz","Carlsohn","Caspari","Caspers","Chapron","Christ","Cierpinski","Clarius","Cleem","Cleve","Co","Conrad","Cordes","Cornelsen","Cors","Cotthardt","Crews","Cronjäger","Crosskofp","Da","Dahm","Dahmen","Daimer","Damaske","Danneberg","Danner","Daub","Daubner","Daudrich","Dauer","Daum","Dauth","Dautzenberg","De","Decker","Deckert","Deerberg","Dehmel","Deja","Delonge","Demut","Dengler","Denner","Denzinger","Derr","Dertmann","Dethloff","Deuschle","Dieckmann","Diedrich","Diekmann","Dienel","Dies","Dietrich","Dietz","Dietzsch","Diezel","Dilla","Dingelstedt","Dippl","Dittmann","Dittmar","Dittmer","Dix","Dobbrunz","Dobler","Dohring","Dolch","Dold","Dombrowski","Donie","Doskoczynski","Dragu","Drechsler","Drees","Dreher","Dreier","Dreissigacker","Dressler","Drews","Duma","Dutkiewicz","Dyett","Dylus","Dächert","Döbel","Döring","Dörner","Dörre","Dück","Eberhard","Eberhardt","Ecker","Eckhardt","Edorh","Effler","Eggenmueller","Ehm","Ehmann","Ehrig","Eich","Eichmann","Eifert","Einert","Eisenlauer","Ekpo","Elbe","Eleyth","Elss","Emert","Emmelmann","Ender","Engel","Engelen","Engelmann","Eplinius","Erdmann","Erhardt","Erlei","Erm","Ernst","Ertl","Erwes","Esenwein","Esser","Evers","Everts","Ewald","Fahner","Faller","Falter","Farber","Fassbender","Faulhaber","Fehrig","Feld","Felke","Feller","Fenner","Fenske","Feuerbach","Fietz","Figl","Figura","Filipowski","Filsinger","Fincke","Fink","Finke","Fischer","Fitschen","Fleischer","Fleischmann","Floder","Florczak","Flore","Flottmann","Forkel","Forst","Frahmeke","Frank","Franke","Franta","Frantz","Franz","Franzis","Franzmann","Frauen","Frauendorf","Freigang","Freimann","Freimuth","Freisen","Frenzel","Frey","Fricke","Fried","Friedek","Friedenberg","Friedmann","Friedrich","Friess","Frisch","Frohn","Frosch","Fuchs","Fuhlbrügge","Fusenig","Fust","Förster","Gaba","Gabius","Gabler","Gadschiew","Gakstädter","Galander","Gamlin","Gamper","Gangnus","Ganzmann","Garatva","Gast","Gastel","Gatzka","Gauder","Gebhardt","Geese","Gehre","Gehrig","Gehring","Gehrke","Geiger","Geisler","Geissler","Gelling","Gens","Gerbennow","Gerdel","Gerhardt","Gerschler","Gerson","Gesell","Geyer","Ghirmai","Ghosh","Giehl","Gierisch","Giesa","Giesche","Gilde","Glatting","Goebel","Goedicke","Goldbeck","Goldfuss","Goldkamp","Goldkühle","Goller","Golling","Gollnow","Golomski","Gombert","Gotthardt","Gottschalk","Gotz","Goy","Gradzki","Graf","Grams","Grasse","Gratzky","Grau","Greb","Green","Greger","Greithanner","Greschner","Griem","Griese","Grimm","Gromisch","Gross","Grosser","Grossheim","Grosskopf","Grothaus","Grothkopp","Grotke","Grube","Gruber","Grundmann","Gruning","Gruszecki","Gröss","Grötzinger","Grün","Grüner","Gummelt","Gunkel","Gunther","Gutjahr","Gutowicz","Gutschank","Göbel","Göckeritz","Göhler","Görlich","Görmer","Götz","Götzelmann","Güldemeister","Günther","Günz","Gürbig","Haack","Haaf","Habel","Hache","Hackbusch","Hackelbusch","Hadfield","Hadwich","Haferkamp","Hahn","Hajek","Hallmann","Hamann","Hanenberger","Hannecker","Hanniske","Hansen","Hardy","Hargasser","Harms","Harnapp","Harter","Harting","Hartlieb","Hartmann","Hartwig","Hartz","Haschke","Hasler","Hasse","Hassfeld","Haug","Hauke","Haupt","Haverney","Heberstreit","Hechler","Hecht","Heck","Hedermann","Hehl","Heidelmann","Heidler","Heinemann","Heinig","Heinke","Heinrich","Heinze","Heiser","Heist","Hellmann","Helm","Helmke","Helpling","Hengmith","Henkel","Hennes","Henry","Hense","Hensel","Hentel","Hentschel","Hentschke","Hepperle","Herberger","Herbrand","Hering","Hermann","Hermecke","Herms","Herold","Herrmann","Herschmann","Hertel","Herweg","Herwig","Herzenberg","Hess","Hesse","Hessek","Hessler","Hetzler","Heuck","Heydemüller","Hiebl","Hildebrand","Hildenbrand","Hilgendorf","Hillard","Hiller","Hingsen","Hingst","Hinrichs","Hirsch","Hirschberg","Hirt","Hodea","Hoffman","Hoffmann","Hofmann","Hohenberger","Hohl","Hohn","Hohnheiser","Hold","Holdt","Holinski","Holl","Holtfreter","Holz","Holzdeppe","Holzner","Hommel","Honz","Hooss","Hoppe","Horak","Horn","Horna","Hornung","Hort","Howard","Huber","Huckestein","Hudak","Huebel","Hugo","Huhn","Hujo","Huke","Huls","Humbert","Huneke","Huth","Häber","Häfner","Höcke","Höft","Höhne","Hönig","Hördt","Hübenbecker","Hübl","Hübner","Hügel","Hüttcher","Hütter","Ibe","Ihly","Illing","Isak","Isekenmeier","Itt","Jacob","Jacobs","Jagusch","Jahn","Jahnke","Jakobs","Jakubczyk","Jambor","Jamrozy","Jander","Janich","Janke","Jansen","Jarets","Jaros","Jasinski","Jasper","Jegorov","Jellinghaus","Jeorga","Jerschabek","Jess","John","Jonas","Jossa","Jucken","Jung","Jungbluth","Jungton","Just","Jürgens","Kaczmarek","Kaesmacher","Kahl","Kahlert","Kahles","Kahlmeyer","Kaiser","Kalinowski","Kallabis","Kallensee","Kampf","Kampschulte","Kappe","Kappler","Karhoff","Karrass","Karst","Karsten","Karus","Kass","Kasten","Kastner","Katzinski","Kaufmann","Kaul","Kausemann","Kawohl","Kazmarek","Kedzierski","Keil","Keiner","Keller","Kelm","Kempe","Kemper","Kempter","Kerl","Kern","Kesselring","Kesselschläger","Kette","Kettenis","Keutel","Kick","Kiessling","Kinadeter","Kinzel","Kinzy","Kirch","Kirst","Kisabaka","Klaas","Klabuhn","Klapper","Klauder","Klaus","Kleeberg","Kleiber","Klein","Kleinert","Kleininger","Kleinmann","Kleinsteuber","Kleiss","Klemme","Klimczak","Klinger","Klink","Klopsch","Klose","Kloss","Kluge","Kluwe","Knabe","Kneifel","Knetsch","Knies","Knippel","Knobel","Knoblich","Knoll","Knorr","Knorscheidt","Knut","Kobs","Koch","Kochan","Kock","Koczulla","Koderisch","Koehl","Koehler","Koenig","Koester","Kofferschlager","Koha","Kohle","Kohlmann","Kohnle","Kohrt","Koj","Kolb","Koleiski","Kolokas","Komoll","Konieczny","Konig","Konow","Konya","Koob","Kopf","Kosenkow","Koster","Koszewski","Koubaa","Kovacs","Kowalick","Kowalinski","Kozakiewicz","Krabbe","Kraft","Kral","Kramer","Krauel","Kraus","Krause","Krauspe","Kreb","Krebs","Kreissig","Kresse","Kreutz","Krieger","Krippner","Krodinger","Krohn","Krol","Kron","Krueger","Krug","Kruger","Krull","Kruschinski","Krämer","Kröckert","Kröger","Krüger","Kubera","Kufahl","Kuhlee","Kuhnen","Kulimann","Kulma","Kumbernuss","Kummle","Kunz","Kupfer","Kupprion","Kuprion","Kurnicki","Kurrat","Kurschilgen","Kuschewitz","Kuschmann","Kuske","Kustermann","Kutscherauer","Kutzner","Kwadwo","Kähler","Käther","Köhler","Köhrbrück","Köhre","Kölotzei","König","Köpernick","Köseoglu","Kúhn","Kúhnert","Kühn","Kühnel","Kühnemund","Kühnert","Kühnke","Küsters","Küter","Laack","Lack","Ladewig","Lakomy","Lammert","Lamos","Landmann","Lang","Lange","Langfeld","Langhirt","Lanig","Lauckner","Lauinger","Laurén","Lausecker","Laux","Laws","Lax","Leberer","Lehmann","Lehner","Leibold","Leide","Leimbach","Leipold","Leist","Leiter","Leiteritz","Leitheim","Leiwesmeier","Lenfers","Lenk","Lenz","Lenzen","Leo","Lepthin","Lesch","Leschnik","Letzelter","Lewin","Lewke","Leyckes","Lg","Lichtenfeld","Lichtenhagen","Lichtl","Liebach","Liebe","Liebich","Liebold","Lieder","Lienshöft","Linden","Lindenberg","Lindenmayer","Lindner","Linke","Linnenbaum","Lippe","Lipske","Lipus","Lischka","Lobinger","Logsch","Lohmann","Lohre","Lohse","Lokar","Loogen","Lorenz","Losch","Loska","Lott","Loy","Lubina","Ludolf","Lufft","Lukoschek","Lutje","Lutz","Löser","Löwa","Lübke","Maak","Maczey","Madetzky","Madubuko","Mai","Maier","Maisch","Malek","Malkus","Mallmann","Malucha","Manns","Manz","Marahrens","Marchewski","Margis","Markowski","Marl","Marner","Marquart","Marschek","Martel","Marten","Martin","Marx","Marxen","Mathes","Mathies","Mathiszik","Matschke","Mattern","Matthes","Matula","Mau","Maurer","Mauroff","May","Maybach","Mayer","Mebold","Mehl","Mehlhorn","Mehlorn","Meier","Meisch","Meissner","Meloni","Melzer","Menga","Menne","Mensah","Mensing","Merkel","Merseburg","Mertens","Mesloh","Metzger","Metzner","Mewes","Meyer","Michallek","Michel","Mielke","Mikitenko","Milde","Minah","Mintzlaff","Mockenhaupt","Moede","Moedl","Moeller","Moguenara","Mohr","Mohrhard","Molitor","Moll","Moller","Molzan","Montag","Moormann","Mordhorst","Morgenstern","Morhelfer","Moritz","Moser","Motchebon","Motzenbbäcker","Mrugalla","Muckenthaler","Mues","Muller","Mulrain","Mächtig","Mäder","Möcks","Mögenburg","Möhsner","Möldner","Möllenbeck","Möller","Möllinger","Mörsch","Mühleis","Müller","Münch","Nabein","Nabow","Nagel","Nannen","Nastvogel","Nau","Naubert","Naumann","Ne","Neimke","Nerius","Neubauer","Neubert","Neuendorf","Neumair","Neumann","Neupert","Neurohr","Neuschwander","Newton","Ney","Nicolay","Niedermeier","Nieklauson","Niklaus","Nitzsche","Noack","Nodler","Nolte","Normann","Norris","Northoff","Nowak","Nussbeck","Nwachukwu","Nytra","Nöh","Oberem","Obergföll","Obermaier","Ochs","Oeser","Olbrich","Onnen","Ophey","Oppong","Orth","Orthmann","Oschkenat","Osei","Osenberg","Ostendarp","Ostwald","Otte","Otto","Paesler","Pajonk","Pallentin","Panzig","Paschke","Patzwahl","Paukner","Peselman","Peter","Peters","Petzold","Pfeiffer","Pfennig","Pfersich","Pfingsten","Pflieger","Pflügner","Philipp","Pichlmaier","Piesker","Pietsch","Pingpank","Pinnock","Pippig","Pitschugin","Plank","Plass","Platzer","Plauk","Plautz","Pletsch","Plotzitzka","Poehn","Poeschl","Pogorzelski","Pohl","Pohland","Pohle","Polifka","Polizzi","Pollmächer","Pomp","Ponitzsch","Porsche","Porth","Poschmann","Poser","Pottel","Prah","Prange","Prediger","Pressler","Preuk","Preuss","Prey","Priemer","Proske","Pusch","Pöche","Pöge","Raabe","Rabenstein","Rach","Radtke","Rahn","Ranftl","Rangen","Ranz","Rapp","Rath","Rau","Raubuch","Raukuc","Rautenkranz","Rehwagen","Reiber","Reichardt","Reichel","Reichling","Reif","Reifenrath","Reimann","Reinberg","Reinelt","Reinhardt","Reinke","Reitze","Renk","Rentz","Renz","Reppin","Restle","Restorff","Retzke","Reuber","Reumann","Reus","Reuss","Reusse","Rheder","Rhoden","Richards","Richter","Riedel","Riediger","Rieger","Riekmann","Riepl","Riermeier","Riester","Riethmüller","Rietmüller","Rietscher","Ringel","Ringer","Rink","Ripken","Ritosek","Ritschel","Ritter","Rittweg","Ritz","Roba","Rockmeier","Rodehau","Rodowski","Roecker","Roggatz","Rohländer","Rohrer","Rokossa","Roleder","Roloff","Roos","Rosbach","Roschinsky","Rose","Rosenauer","Rosenbauer","Rosenthal","Rosksch","Rossberg","Rossler","Roth","Rother","Ruch","Ruckdeschel","Rumpf","Rupprecht","Ruth","Ryjikh","Ryzih","Rädler","Räntsch","Rödiger","Röse","Röttger","Rücker","Rüdiger","Rüter","Sachse","Sack","Saflanis","Sagafe","Sagonas","Sahner","Saile","Sailer","Salow","Salzer","Salzmann","Sammert","Sander","Sarvari","Sattelmaier","Sauer","Sauerland","Saumweber","Savoia","Scc","Schacht","Schaefer","Schaffarzik","Schahbasian","Scharf","Schedler","Scheer","Schelk","Schellenbeck","Schembera","Schenk","Scherbarth","Scherer","Schersing","Scherz","Scheurer","Scheuring","Scheytt","Schielke","Schieskow","Schildhauer","Schilling","Schima","Schimmer","Schindzielorz","Schirmer","Schirrmeister","Schlachter","Schlangen","Schlawitz","Schlechtweg","Schley","Schlicht","Schlitzer","Schmalzle","Schmid","Schmidt","Schmidtchen","Schmitt","Schmitz","Schmuhl","Schneider","Schnelting","Schnieder","Schniedermeier","Schnürer","Schoberg","Scholz","Schonberg","Schondelmaier","Schorr","Schott","Schottmann","Schouren","Schrader","Schramm","Schreck","Schreiber","Schreiner","Schreiter","Schroder","Schröder","Schuermann","Schuff","Schuhaj","Schuldt","Schult","Schulte","Schultz","Schultze","Schulz","Schulze","Schumacher","Schumann","Schupp","Schuri","Schuster","Schwab","Schwalm","Schwanbeck","Schwandke","Schwanitz","Schwarthoff","Schwartz","Schwarz","Schwarzer","Schwarzkopf","Schwarzmeier","Schwatlo","Schweisfurth","Schwennen","Schwerdtner","Schwidde","Schwirkschlies","Schwuchow","Schäfer","Schäffel","Schäffer","Schäning","Schöckel","Schönball","Schönbeck","Schönberg","Schönebeck","Schönenberger","Schönfeld","Schönherr","Schönlebe","Schötz","Schüler","Schüppel","Schütz","Schütze","Seeger","Seelig","Sehls","Seibold","Seidel","Seiders","Seigel","Seiler","Seitz","Semisch","Senkel","Sewald","Siebel","Siebert","Siegling","Sielemann","Siemon","Siener","Sievers","Siewert","Sihler","Sillah","Simon","Sinnhuber","Sischka","Skibicki","Sladek","Slotta","Smieja","Soboll","Sokolowski","Soller","Sollner","Sommer","Somssich","Sonn","Sonnabend","Spahn","Spank","Spelmeyer","Spiegelburg","Spielvogel","Spinner","Spitzmüller","Splinter","Sporrer","Sprenger","Spöttel","Stahl","Stang","Stanger","Stauss","Steding","Steffen","Steffny","Steidl","Steigauf","Stein","Steinecke","Steinert","Steinkamp","Steinmetz","Stelkens","Stengel","Stengl","Stenzel","Stepanov","Stephan","Stern","Steuk","Stief","Stifel","Stoll","Stolle","Stolz","Storl","Storp","Stoutjesdijk","Stratmann","Straub","Strausa","Streck","Streese","Strege","Streit","Streller","Strieder","Striezel","Strogies","Strohschank","Strunz","Strutz","Stube","Stöckert","Stöppler","Stöwer","Stürmer","Suffa","Sujew","Sussmann","Suthe","Sutschet","Swillims","Szendrei","Sören","Sürth","Tafelmeier","Tang","Tasche","Taufratshofer","Tegethof","Teichmann","Tepper","Terheiden","Terlecki","Teufel","Theele","Thieke","Thimm","Thiomas","Thomas","Thriene","Thränhardt","Thust","Thyssen","Thöne","Tidow","Tiedtke","Tietze","Tilgner","Tillack","Timmermann","Tischler","Tischmann","Tittman","Tivontschik","Tonat","Tonn","Trampeli","Trauth","Trautmann","Travan","Treff","Tremmel","Tress","Tsamonikian","Tschiers","Tschirch","Tuch","Tucholke","Tudow","Tuschmo","Tächl","Többen","Töpfer","Uhlemann","Uhlig","Uhrig","Uibel","Uliczka","Ullmann","Ullrich","Umbach","Umlauft","Umminger","Unger","Unterpaintner","Urban","Urbaniak","Urbansky","Urhig","Vahlensieck","Van","Vangermain","Vater","Venghaus","Verniest","Verzi","Vey","Viellehner","Vieweg","Voelkel","Vogel","Vogelgsang","Vogt","Voigt","Vokuhl","Volk","Volker","Volkmann","Von","Vona","Vontein","Wachenbrunner","Wachtel","Wagner","Waibel","Wakan","Waldmann","Wallner","Wallstab","Walter","Walther","Walton","Walz","Wanner","Wartenberg","Waschbüsch","Wassilew","Wassiluk","Weber","Wehrsen","Weidlich","Weidner","Weigel","Weight","Weiler","Weimer","Weis","Weiss","Weller","Welsch","Welz","Welzel","Weniger","Wenk","Werle","Werner","Werrmann","Wessel","Wessinghage","Weyel","Wezel","Wichmann","Wickert","Wiebe","Wiechmann","Wiegelmann","Wierig","Wiese","Wieser","Wilhelm","Wilky","Will","Willwacher","Wilts","Wimmer","Winkelmann","Winkler","Winter","Wischek","Wischer","Wissing","Wittich","Wittl","Wolf","Wolfarth","Wolff","Wollenberg","Wollmann","Woytkowska","Wujak","Wurm","Wyludda","Wölpert","Wöschler","Wühn","Wünsche","Zach","Zaczkiewicz","Zahn","Zaituc","Zandt","Zanner","Zapletal","Zauber","Zeidler","Zekl","Zender","Zeuch","Zeyen","Zeyhle","Ziegler","Zimanyi","Zimmer","Zimmermann","Zinser","Zintl","Zipp","Zipse","Zschunke","Zuber","Zwiener","Zümsande","Östringer","Überacker"],"name":["#{prefix} #{first_name} #{last_name}","#{first_name} #{nobility_title_prefix} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}"],"nobility_title_prefix":["zu","von","vom","von der"],"prefix":["Hr.","Fr.","Dr.","Prof. Dr."]},"phone_number":{"formats":["(0###) #########","(0####) #######","+49-###-#######","+49-####-########"]}}},"de-AT":{"faker":{"address":{"building_number":["###","##","#","##a","##b","##c"],"city":["#{city_name}"],"city_name":["Aigen im Mühlkreis","Allerheiligen bei Wildon","Altenfelden","Arriach","Axams","Baumgartenberg","Bergern im Dunkelsteinerwald","Berndorf bei Salzburg","Bregenz","Breitenbach am Inn","Deutsch-Wagram","Dienten am Hochkönig","Dietach","Dornbirn","Dürnkrut","Eben im Pongau","Ebenthal in Kärnten","Eichgraben","Eisenstadt","Ellmau","Feistritz am Wechsel","Finkenberg","Fiss","Frantschach-St. Gertraud","Fritzens","Gams bei Hieflau","Geiersberg","Graz","Großhöflein","Gößnitz","Hartl","Hausleiten","Herzogenburg","Hinterhornbach","Hochwolkersdorf","Ilz","Ilztal","Innerbraz","Innsbruck","Itter","Jagerberg","Jeging","Johnsbach","Johnsdorf-Brunn","Jungholz","Kirchdorf am Inn","Klagenfurt","Kottes-Purk","Krumau am Kamp","Krumbach","Lavamünd","Lech","Linz","Ludesch","Lödersdorf","Marbach an der Donau","Mattsee","Mautern an der Donau","Mauterndorf","Mitterbach am Erlaufsee","Neudorf bei Passail","Neudorf bei Staatz","Neukirchen an der Enknach","Neustift an der Lafnitz","Niederleis","Oberndorf in Tirol","Oberstorcha","Oberwaltersdorf","Oed-Oehling","Ort im Innkreis","Pilgersdorf","Pitschgau","Pollham","Preitenegg","Purbach am Neusiedler See","Rabenwald","Raiding","Rastenfeld","Ratten","Rettenegg","Salzburg","Sankt Johann im Saggautal","St. Peter am Kammersberg","St. Pölten","St. Veit an der Glan","Taxenbach","Tragwein","Trebesing","Trieben","Turnau","Ungerdorf","Unterauersbach","Unterstinkenbrunn","Untertilliach","Uttendorf","Vals","Velden am Wörther See","Viehhofen","Villach","Vitis","Waidhofen an der Thaya","Waldkirchen am Wesen","Weißkirchen an der Traun","Wien","Wimpassing im Schwarzatale","Ybbs an der Donau","Ybbsitz","Yspertal","Zeillern","Zell am Pettenfirst","Zell an der Pram","Zerlach","Zwölfaxing","Öblarn","Übelbach","Überackern","Übersaxen","Übersbach"],"country":["Ägypten","Äquatorialguinea","Äthiopien","Österreich","Afghanistan","Albanien","Algerien","Amerikanisch-Samoa","Amerikanische Jungferninseln","Andorra","Angola","Anguilla","Antarktis","Antigua und Barbuda","Argentinien","Armenien","Aruba","Aserbaidschan","Australien","Bahamas","Bahrain","Bangladesch","Barbados","Belarus","Belgien","Belize","Benin","die Bermudas","Bhutan","Bolivien","Bosnien und Herzegowina","Botsuana","Bouvetinsel","Brasilien","Britische Jungferninseln","Britisches Territorium im Indischen Ozean","Brunei Darussalam","Bulgarien","Burkina Faso","Burundi","Chile","China","Cookinseln","Costa Rica","Dänemark","Demokratische Republik Kongo","Demokratische Volksrepublik Korea","Deutschland","Dominica","Dominikanische Republik","Dschibuti","Ecuador","El Salvador","Eritrea","Estland","Färöer","Falklandinseln","Fidschi","Finnland","Frankreich","Französisch-Guayana","Französisch-Polynesien","Französische Gebiete im südlichen Indischen Ozean","Gabun","Gambia","Georgien","Ghana","Gibraltar","Grönland","Grenada","Griechenland","Guadeloupe","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Heard und McDonaldinseln","Honduras","Hongkong","Indien","Indonesien","Irak","Iran","Irland","Island","Israel","Italien","Jamaika","Japan","Jemen","Jordanien","Jugoslawien","Kaimaninseln","Kambodscha","Kamerun","Kanada","Kap Verde","Kasachstan","Katar","Kenia","Kirgisistan","Kiribati","Kleinere amerikanische Überseeinseln","Kokosinseln","Kolumbien","Komoren","Kongo","Kroatien","Kuba","Kuwait","Laos","Lesotho","Lettland","Libanon","Liberia","Libyen","Liechtenstein","Litauen","Luxemburg","Macau","Madagaskar","Malawi","Malaysia","Malediven","Mali","Malta","ehemalige jugoslawische Republik Mazedonien","Marokko","Marshallinseln","Martinique","Mauretanien","Mauritius","Mayotte","Mexiko","Mikronesien","Monaco","Mongolei","Montserrat","Mosambik","Myanmar","Nördliche Marianen","Namibia","Nauru","Nepal","Neukaledonien","Neuseeland","Nicaragua","Niederländische Antillen","Niederlande","Niger","Nigeria","Niue","Norfolkinsel","Norwegen","Oman","Osttimor","Pakistan","Palau","Panama","Papua-Neuguinea","Paraguay","Peru","Philippinen","Pitcairninseln","Polen","Portugal","Puerto Rico","Réunion","Republik Korea","Republik Moldau","Ruanda","Rumänien","Russische Föderation","São Tomé und Príncipe","Südafrika","Südgeorgien und Südliche Sandwichinseln","Salomonen","Sambia","Samoa","San Marino","Saudi-Arabien","Schweden","Schweiz","Senegal","Seychellen","Sierra Leone","Simbabwe","Singapur","Slowakei","Slowenien","Somalien","Spanien","Sri Lanka","St. Helena","St. Kitts und Nevis","St. Lucia","St. Pierre und Miquelon","St. Vincent und die Grenadinen","Sudan","Surinam","Svalbard und Jan Mayen","Swasiland","Syrien","Türkei","Tadschikistan","Taiwan","Tansania","Thailand","Togo","Tokelau","Tonga","Trinidad und Tobago","Tschad","Tschechische Republik","Tunesien","Turkmenistan","Turks- und Caicosinseln","Tuvalu","Uganda","Ukraine","Ungarn","Uruguay","Usbekistan","Vanuatu","Vatikanstadt","Venezuela","Vereinigte Arabische Emirate","Vereinigte Staaten","Vereinigtes Königreich","Vietnam","Wallis und Futuna","Weihnachtsinsel","Westsahara","Zentralafrikanische Republik","Zypern"],"default_country":["Österreich"],"postcode":["####"],"secondary_address":["Apt. ###","Zimmer ###","# OG"],"state":["Burgenland","Kärnten","Niederösterreich","Oberösterreich","Salzburg","Steiermark","Tirol","Vorarlberg","Wien"],"state_abbr":["Bgld.","Ktn.","NÖ","OÖ","Sbg.","Stmk.","T","Vbg.","W"],"street_address":["#{street_name} #{building_number}"],"street_name":["#{street_root}"],"street_root":["Ahorn","Ahorngasse (St. Andrä)","Alleestraße (Poysbrunn)","Alpenlandstraße","Alte Poststraße","Alte Ufergasse","Am Kronawett (Hagenbrunn)","Am Mühlwasser","Am Rebenhang","Am Sternweg","Anton Wildgans-Straße","Auer-von-Welsbach-Weg","Auf der Stift","Aufeldgasse","Bahngasse","Bahnhofstraße","Bahnstraße (Gerhaus)","Basteigasse","Berggasse","Bergstraße","Birkenweg","Blasiussteig","Blattur","Bruderhofgasse","Brunnelligasse","Bühelweg","Darnautgasse","Donaugasse","Dorfplatz (Haselbach)","Dr.-Oberreiter-Straße","Dr.Karl Holoubek-Str.","Drautal Bundesstraße","Dürnrohrer Straße","Ebenthalerstraße","Eckgrabenweg","Erlenstraße","Erlenweg","Eschenweg","Etrichgasse","Fassergasse","Feichteggerwiese","Feld-Weg","Feldgasse","Feldstapfe","Fischpointweg","Flachbergstraße","Flurweg","Franz Schubert-Gasse","Franz-Schneeweiß-Weg","Franz-von-Assisi-Straße","Fritz-Pregl-Straße","Fuchsgrubenweg","Födlerweg","Föhrenweg","Fünfhaus (Paasdorf)","Gabelsbergerstraße","Gartenstraße","Geigen","Geigergasse","Gemeindeaugasse","Gemeindeplatz","Georg-Aichinger-Straße","Glanfeldbachweg","Graben (Burgauberg)","Grub","Gröretgasse","Grünbach","Gösting","Hainschwang","Hans-Mauracher-Straße","Hart","Teichstraße","Hauptplatz","Hauptstraße","Heideweg","Heinrich Landauer Gasse","Helenengasse","Hermann von Gilmweg","Hermann-Löns-Gasse","Herminengasse","Hernstorferstraße","Hirsdorf","Hochfeistritz","Hochhaus Neue Donau","Hof","Hussovits Gasse","Höggen","Hütten","Janzgasse","Jochriemgutstraße","Johann-Strauß-Gasse","Julius-Raab-Straße","Kahlenberger Straße","Karl Kraft-Straße","Kegelprielstraße","Keltenberg-Eponaweg","Kennedybrücke","Kerpelystraße","Kindergartenstraße","Kinderheimgasse","Kirchenplatz","Kirchweg","Klagenfurter Straße","Klamm","Kleinbaumgarten","Klingergasse","Koloniestraße","Konrad-Duden-Gasse","Krankenhausstraße","Kubinstraße","Köhldorfergasse","Lackenweg","Lange Mekotte","Leifling","Leopold Frank-Straße (Pellendorf)","Lerchengasse (Pirka)","Lichtensternsiedlung V","Lindenhofstraße","Lindenweg","Luegstraße","Maierhof","Malerweg","Mitterweg","Mittlere Hauptstraße","Moosbachgasse","Morettigasse","Musikpavillon Riezlern","Mühlboden","Mühle","Mühlenweg","Neustiftgasse","Niederegg","Niedergams","Nordwestbahnbrücke","Oberbödenalm","Obere Berggasse","Oedt","Am Färberberg","Ottogasse","Paul Peters-Gasse","Perspektivstraße","Poppichl","Privatweg","Prixgasse","Pyhra","Radetzkystraße","Raiden","Reichensteinstraße","Reitbauernstraße","Reiterweg","Reitschulgasse","Ringweg","Rupertistraße","Römerstraße","Römerweg","Sackgasse","Schaunbergerstraße","Schloßweg","Schulgasse (Langeck)","Schönholdsiedlung","Seeblick","Seestraße","Semriacherstraße","Simling","Sipbachzeller Straße","Sonnenweg","Spargelfeldgasse","Spiesmayrweg","Sportplatzstraße","St.Ulrich","Steilmannstraße","Steingrüneredt","Strassfeld","Straßerau","Stöpflweg","Stüra","Taferngasse","Tennweg","Thomas Koschat-Gasse","Tiroler Straße","Torrogasse","Uferstraße (Schwarzau am Steinfeld)","Unterdörfl","Unterer Sonnrainweg","Verwaltersiedlung","Waldhang","Wasen","Weidenstraße","Weiherweg","Wettsteingasse","Wiener Straße","Windisch","Zebragasse","Zellerstraße","Ziehrerstraße","Zulechnerweg","Zwergjoch","Ötzbruck"]},"cell_phone":{"formats":["+43-6##-#######","06##-########","+436#########","06##########"]},"company":{"legal_form":["GmbH","AG","Gruppe","KG","GmbH \u0026 Co. KG","UG","OHG"],"name":["#{Name.last_name} #{suffix}","#{Name.last_name}-#{Name.last_name}","#{Name.last_name}, #{Name.last_name} und #{Name.last_name}"],"suffix":["GmbH","AG","Gruppe","KG","GmbH \u0026 Co. KG","UG","OHG"]},"internet":{"domain_suffix":["com","info","name","net","org","de","ch","at"],"free_email":["gmail.com","yahoo.com","hotmail.com"]},"name":{"first_name":["Aaron","Abdul","Abdullah","Adam","Adrian","Adriano","Ahmad","Ahmed","Ahmet","Alan","Albert","Alessandro","Alessio","Alex","Alexander","Alfred","Ali","Amar","Amir","Amon","Andre","Andreas","Andrew","Angelo","Ansgar","Anthony","Anton","Antonio","Arda","Arian","Armin","Arne","Arno","Arthur","Artur","Arved","Arvid","Ayman","Baran","Baris","Bastian","Batuhan","Bela","Ben","Benedikt","Benjamin","Bennet","Bennett","Benno","Bent","Berat","Berkay","Bernd","Bilal","Bjarne","Björn","Bo","Boris","Brandon","Brian","Bruno","Bryan","Burak","Calvin","Can","Carl","Carlo","Carlos","Caspar","Cedric","Cedrik","Cem","Charlie","Chris","Christian","Christiano","Christoph","Christopher","Claas","Clemens","Colin","Collin","Conner","Connor","Constantin","Corvin","Curt","Damian","Damien","Daniel","Danilo","Danny","Darian","Dario","Darius","Darren","David","Davide","Davin","Dean","Deniz","Dennis","Denny","Devin","Diego","Dion","Domenic","Domenik","Dominic","Dominik","Dorian","Dustin","Dylan","Ecrin","Eddi","Eddy","Edgar","Edwin","Efe","Ege","Elia","Eliah","Elias","Elijah","Emanuel","Emil","Emilian","Emilio","Emir","Emirhan","Emre","Enes","Enno","Enrico","Eren","Eric","Erik","Etienne","Fabian","Fabien","Fabio","Fabrice","Falk","Felix","Ferdinand","Fiete","Filip","Finlay","Finley","Finn","Finnley","Florian","Francesco","Franz","Frederic","Frederick","Frederik","Friedrich","Fritz","Furkan","Fynn","Gabriel","Georg","Gerrit","Gian","Gianluca","Gino","Giuliano","Giuseppe","Gregor","Gustav","Hagen","Hamza","Hannes","Hanno","Hans","Hasan","Hassan","Hauke","Hendrik","Hennes","Henning","Henri","Henrick","Henrik","Henry","Hugo","Hussein","Ian","Ibrahim","Ilias","Ilja","Ilyas","Immanuel","Ismael","Ismail","Ivan","Iven","Jack","Jacob","Jaden","Jakob","Jamal","James","Jamie","Jan","Janek","Janis","Janne","Jannek","Jannes","Jannik","Jannis","Jano","Janosch","Jared","Jari","Jarne","Jarno","Jaron","Jason","Jasper","Jay","Jayden","Jayson","Jean","Jens","Jeremias","Jeremie","Jeremy","Jermaine","Jerome","Jesper","Jesse","Jim","Jimmy","Joe","Joel","Joey","Johann","Johannes","John","Johnny","Jon","Jona","Jonah","Jonas","Jonathan","Jonte","Joost","Jordan","Joris","Joscha","Joschua","Josef","Joseph","Josh","Joshua","Josua","Juan","Julian","Julien","Julius","Juri","Justin","Justus","Kaan","Kai","Kalle","Karim","Karl","Karlo","Kay","Keanu","Kenan","Kenny","Keno","Kerem","Kerim","Kevin","Kian","Kilian","Kim","Kimi","Kjell","Klaas","Klemens","Konrad","Konstantin","Koray","Korbinian","Kurt","Lars","Lasse","Laurence","Laurens","Laurenz","Laurin","Lean","Leander","Leandro","Leif","Len","Lenn","Lennard","Lennart","Lennert","Lennie","Lennox","Lenny","Leo","Leon","Leonard","Leonardo","Leonhard","Leonidas","Leopold","Leroy","Levent","Levi","Levin","Lewin","Lewis","Liam","Lian","Lias","Lino","Linus","Lio","Lion","Lionel","Logan","Lorenz","Lorenzo","Loris","Louis","Luan","Luc","Luca","Lucas","Lucian","Lucien","Ludwig","Luis","Luiz","Luk","Luka","Lukas","Luke","Lutz","Maddox","Mads","Magnus","Maik","Maksim","Malik","Malte","Manuel","Marc","Marcel","Marco","Marcus","Marek","Marian","Mario","Marius","Mark","Marko","Markus","Marlo","Marlon","Marten","Martin","Marvin","Marwin","Mateo","Mathis","Matis","Mats","Matteo","Mattes","Matthias","Matthis","Matti","Mattis","Maurice","Max","Maxim","Maximilian","Mehmet","Meik","Melvin","Merlin","Mert","Michael","Michel","Mick","Miguel","Mika","Mikail","Mike","Milan","Milo","Mio","Mirac","Mirco","Mirko","Mohamed","Mohammad","Mohammed","Moritz","Morten","Muhammed","Murat","Mustafa","Nathan","Nathanael","Nelson","Neo","Nevio","Nick","Niclas","Nico","Nicolai","Nicolas","Niels","Nikita","Niklas","Niko","Nikolai","Nikolas","Nils","Nino","Noah","Noel","Norman","Odin","Oke","Ole","Oliver","Omar","Onur","Oscar","Oskar","Pascal","Patrice","Patrick","Paul","Peer","Pepe","Peter","Phil","Philip","Philipp","Pierre","Piet","Pit","Pius","Quentin","Quirin","Rafael","Raik","Ramon","Raphael","Rasmus","Raul","Rayan","René","Ricardo","Riccardo","Richard","Rick","Rico","Robert","Robin","Rocco","Roman","Romeo","Ron","Ruben","Ryan","Said","Salih","Sam","Sami","Sammy","Samuel","Sandro","Santino","Sascha","Sean","Sebastian","Selim","Semih","Shawn","Silas","Simeon","Simon","Sinan","Sky","Stefan","Steffen","Stephan","Steve","Steven","Sven","Sönke","Sören","Taha","Tamino","Tammo","Tarik","Tayler","Taylor","Teo","Theo","Theodor","Thies","Thilo","Thomas","Thorben","Thore","Thorge","Tiago","Til","Till","Tillmann","Tim","Timm","Timo","Timon","Timothy","Tino","Titus","Tizian","Tjark","Tobias","Tom","Tommy","Toni","Tony","Torben","Tore","Tristan","Tyler","Tyron","Umut","Valentin","Valentino","Veit","Victor","Viktor","Vin","Vincent","Vito","Vitus","Wilhelm","Willi","William","Willy","Xaver","Yannic","Yannick","Yannik","Yannis","Yasin","Youssef","Yunus","Yusuf","Yven","Yves","Ömer","Aaliyah","Abby","Abigail","Ada","Adelina","Adriana","Aileen","Aimee","Alana","Alea","Alena","Alessa","Alessia","Alexa","Alexandra","Alexia","Alexis","Aleyna","Alia","Alica","Alice","Alicia","Alina","Alisa","Alisha","Alissa","Aliya","Aliyah","Allegra","Alma","Alyssa","Amalia","Amanda","Amelia","Amelie","Amina","Amira","Amy","Ana","Anabel","Anastasia","Andrea","Angela","Angelina","Angelique","Anja","Ann","Anna","Annabel","Annabell","Annabelle","Annalena","Anne","Anneke","Annelie","Annemarie","Anni","Annie","Annika","Anny","Anouk","Antonia","Arda","Ariana","Ariane","Arwen","Ashley","Asya","Aurelia","Aurora","Ava","Ayleen","Aylin","Ayse","Azra","Betty","Bianca","Bianka","Caitlin","Cara","Carina","Carla","Carlotta","Carmen","Carolin","Carolina","Caroline","Cassandra","Catharina","Catrin","Cecile","Cecilia","Celia","Celina","Celine","Ceyda","Ceylin","Chantal","Charleen","Charlotta","Charlotte","Chayenne","Cheyenne","Chiara","Christin","Christina","Cindy","Claire","Clara","Clarissa","Colleen","Collien","Cora","Corinna","Cosima","Dana","Daniela","Daria","Darleen","Defne","Delia","Denise","Diana","Dilara","Dina","Dorothea","Ecrin","Eda","Eileen","Ela","Elaine","Elanur","Elea","Elena","Eleni","Eleonora","Eliana","Elif","Elina","Elisa","Elisabeth","Ella","Ellen","Elli","Elly","Elsa","Emelie","Emely","Emilia","Emilie","Emily","Emma","Emmely","Emmi","Emmy","Enie","Enna","Enya","Esma","Estelle","Esther","Eva","Evelin","Evelina","Eveline","Evelyn","Fabienne","Fatima","Fatma","Felicia","Felicitas","Felina","Femke","Fenja","Fine","Finia","Finja","Finnja","Fiona","Flora","Florentine","Francesca","Franka","Franziska","Frederike","Freya","Frida","Frieda","Friederike","Giada","Gina","Giulia","Giuliana","Greta","Hailey","Hana","Hanna","Hannah","Heidi","Helen","Helena","Helene","Helin","Henriette","Henrike","Hermine","Ida","Ilayda","Imke","Ina","Ines","Inga","Inka","Irem","Isa","Isabel","Isabell","Isabella","Isabelle","Ivonne","Jacqueline","Jamie","Jamila","Jana","Jane","Janin","Janina","Janine","Janna","Janne","Jara","Jasmin","Jasmina","Jasmine","Jella","Jenna","Jennifer","Jenny","Jessica","Jessy","Jette","Jil","Jill","Joana","Joanna","Joelina","Joeline","Joelle","Johanna","Joleen","Jolie","Jolien","Jolin","Jolina","Joline","Jona","Jonah","Jonna","Josefin","Josefine","Josephin","Josephine","Josie","Josy","Joy","Joyce","Judith","Judy","Jule","Julia","Juliana","Juliane","Julie","Julienne","Julika","Julina","Juna","Justine","Kaja","Karina","Karla","Karlotta","Karolina","Karoline","Kassandra","Katarina","Katharina","Kathrin","Katja","Katrin","Kaya","Kayra","Kiana","Kiara","Kim","Kimberley","Kimberly","Kira","Klara","Korinna","Kristin","Kyra","Laila","Lana","Lara","Larissa","Laura","Laureen","Lavinia","Lea","Leah","Leana","Leandra","Leann","Lee","Leila","Lena","Lene","Leni","Lenia","Lenja","Lenya","Leona","Leoni","Leonie","Leonora","Leticia","Letizia","Levke","Leyla","Lia","Liah","Liana","Lili","Lilia","Lilian","Liliana","Lilith","Lilli","Lillian","Lilly","Lily","Lina","Linda","Lindsay","Line","Linn","Linnea","Lisa","Lisann","Lisanne","Liv","Livia","Liz","Lola","Loreen","Lorena","Lotta","Lotte","Louisa","Louise","Luana","Luca","Lucia","Lucie","Lucienne","Lucy","Luisa","Luise","Luka","Luna","Luzie","Lya","Lydia","Lyn","Lynn","Madeleine","Madita","Madleen","Madlen","Magdalena","Maike","Mailin","Maira","Maja","Malena","Malia","Malin","Malina","Mandy","Mara","Marah","Mareike","Maren","Maria","Mariam","Marie","Marieke","Mariella","Marika","Marina","Marisa","Marissa","Marit","Marla","Marleen","Marlen","Marlena","Marlene","Marta","Martha","Mary","Maryam","Mathilda","Mathilde","Matilda","Maxi","Maxima","Maxine","Maya","Mayra","Medina","Medine","Meike","Melanie","Melek","Melike","Melina","Melinda","Melis","Melisa","Melissa","Merle","Merve","Meryem","Mette","Mia","Michaela","Michelle","Mieke","Mila","Milana","Milena","Milla","Mina","Mira","Miray","Miriam","Mirja","Mona","Monique","Nadine","Nadja","Naemi","Nancy","Naomi","Natalia","Natalie","Nathalie","Neele","Nela","Nele","Nelli","Nelly","Nia","Nicole","Nika","Nike","Nikita","Nila","Nina","Nisa","Noemi","Nora","Olivia","Patricia","Patrizia","Paula","Paulina","Pauline","Penelope","Philine","Phoebe","Pia","Rahel","Rania","Rebecca","Rebekka","Riana","Rieke","Rike","Romina","Romy","Ronja","Rosa","Rosalie","Ruby","Sabrina","Sahra","Sally","Salome","Samantha","Samia","Samira","Sandra","Sandy","Sanja","Saphira","Sara","Sarah","Saskia","Selin","Selina","Selma","Sena","Sidney","Sienna","Silja","Sina","Sinja","Smilla","Sofia","Sofie","Sonja","Sophia","Sophie","Soraya","Stefanie","Stella","Stephanie","Stina","Sude","Summer","Susanne","Svea","Svenja","Sydney","Tabea","Talea","Talia","Tamara","Tamia","Tamina","Tanja","Tara","Tarja","Teresa","Tessa","Thalea","Thalia","Thea","Theresa","Tia","Tina","Tomke","Tuana","Valentina","Valeria","Valerie","Vanessa","Vera","Veronika","Victoria","Viktoria","Viola","Vivian","Vivien","Vivienne","Wibke","Wiebke","Xenia","Yara","Yaren","Yasmin","Ylvi","Ylvie","Yvonne","Zara","Zehra","Zeynep","Zoe","Zoey","Zoé"],"last_name":["Abel","Abicht","Abraham","Abramovic","Abt","Achilles","Achkinadze","Ackermann","Adam","Adams","Ade","Agostini","Ahlke","Ahrenberg","Ahrens","Aigner","Albert","Albrecht","Alexa","Alexander","Alizadeh","Allgeyer","Amann","Amberg","Anding","Anggreny","Apitz","Arendt","Arens","Arndt","Aryee","Aschenbroich","Assmus","Astafei","Auer","Axmann","Baarck","Bachmann","Badane","Bader","Baganz","Bahl","Bak","Balcer","Balck","Balkow","Balnuweit","Balzer","Banse","Barr","Bartels","Barth","Barylla","Baseda","Battke","Bauer","Bauermeister","Baumann","Baumeister","Bauschinger","Bauschke","Bayer","Beavogui","Beck","Beckel","Becker","Beckmann","Bedewitz","Beele","Beer","Beggerow","Beh","Behr","Behrenbruch","Belz","Bender","Benecke","Benner","Benninger","Benzing","Berends","Berger","Berner","Berning","Bertenbreiter","Best","Bethke","Betz","Beushausen","Beutelspacher","Beyer","Biba","Bichler","Bickel","Biedermann","Bieler","Bielert","Bienasch","Bienias","Biesenbach","Bigdeli","Birkemeyer","Bittner","Blank","Blaschek","Blassneck","Bloch","Blochwitz","Blockhaus","Blum","Blume","Bock","Bode","Bogdashin","Bogenrieder","Bohge","Bolm","Borgschulze","Bork","Bormann","Bornscheuer","Borrmann","Borsch","Boruschewski","Bos","Bosler","Bourrouag","Bouschen","Boxhammer","Boyde","Bozsik","Brand","Brandenburg","Brandis","Brandt","Brauer","Braun","Brehmer","Breitenstein","Bremer","Bremser","Brenner","Brettschneider","Breu","Breuer","Briesenick","Bringmann","Brinkmann","Brix","Broening","Brosch","Bruckmann","Bruder","Bruhns","Brunner","Bruns","Bräutigam","Brömme","Brüggmann","Buchholz","Buchrucker","Buder","Bultmann","Bunjes","Burger","Burghagen","Burkhard","Burkhardt","Burmeister","Busch","Buschbaum","Busemann","Buss","Busse","Bussmann","Byrd","Bäcker","Böhm","Bönisch","Börgeling","Börner","Böttner","Büchele","Bühler","Büker","Büngener","Bürger","Bürklein","Büscher","Büttner","Camara","Carlowitz","Carlsohn","Caspari","Caspers","Chapron","Christ","Cierpinski","Clarius","Cleem","Cleve","Co","Conrad","Cordes","Cornelsen","Cors","Cotthardt","Crews","Cronjäger","Crosskofp","Da","Dahm","Dahmen","Daimer","Damaske","Danneberg","Danner","Daub","Daubner","Daudrich","Dauer","Daum","Dauth","Dautzenberg","De","Decker","Deckert","Deerberg","Dehmel","Deja","Delonge","Demut","Dengler","Denner","Denzinger","Derr","Dertmann","Dethloff","Deuschle","Dieckmann","Diedrich","Diekmann","Dienel","Dies","Dietrich","Dietz","Dietzsch","Diezel","Dilla","Dingelstedt","Dippl","Dittmann","Dittmar","Dittmer","Dix","Dobbrunz","Dobler","Dohring","Dolch","Dold","Dombrowski","Donie","Doskoczynski","Dragu","Drechsler","Drees","Dreher","Dreier","Dreissigacker","Dressler","Drews","Duma","Dutkiewicz","Dyett","Dylus","Dächert","Döbel","Döring","Dörner","Dörre","Dück","Eberhard","Eberhardt","Ecker","Eckhardt","Edorh","Effler","Eggenmueller","Ehm","Ehmann","Ehrig","Eich","Eichmann","Eifert","Einert","Eisenlauer","Ekpo","Elbe","Eleyth","Elss","Emert","Emmelmann","Ender","Engel","Engelen","Engelmann","Eplinius","Erdmann","Erhardt","Erlei","Erm","Ernst","Ertl","Erwes","Esenwein","Esser","Evers","Everts","Ewald","Fahner","Faller","Falter","Farber","Fassbender","Faulhaber","Fehrig","Feld","Felke","Feller","Fenner","Fenske","Feuerbach","Fietz","Figl","Figura","Filipowski","Filsinger","Fincke","Fink","Finke","Fischer","Fitschen","Fleischer","Fleischmann","Floder","Florczak","Flore","Flottmann","Forkel","Forst","Frahmeke","Frank","Franke","Franta","Frantz","Franz","Franzis","Franzmann","Frauen","Frauendorf","Freigang","Freimann","Freimuth","Freisen","Frenzel","Frey","Fricke","Fried","Friedek","Friedenberg","Friedmann","Friedrich","Friess","Frisch","Frohn","Frosch","Fuchs","Fuhlbrügge","Fusenig","Fust","Förster","Gaba","Gabius","Gabler","Gadschiew","Gakstädter","Galander","Gamlin","Gamper","Gangnus","Ganzmann","Garatva","Gast","Gastel","Gatzka","Gauder","Gebhardt","Geese","Gehre","Gehrig","Gehring","Gehrke","Geiger","Geisler","Geissler","Gelling","Gens","Gerbennow","Gerdel","Gerhardt","Gerschler","Gerson","Gesell","Geyer","Ghirmai","Ghosh","Giehl","Gierisch","Giesa","Giesche","Gilde","Glatting","Goebel","Goedicke","Goldbeck","Goldfuss","Goldkamp","Goldkühle","Goller","Golling","Gollnow","Golomski","Gombert","Gotthardt","Gottschalk","Gotz","Goy","Gradzki","Graf","Grams","Grasse","Gratzky","Grau","Greb","Green","Greger","Greithanner","Greschner","Griem","Griese","Grimm","Gromisch","Gross","Grosser","Grossheim","Grosskopf","Grothaus","Grothkopp","Grotke","Grube","Gruber","Grundmann","Gruning","Gruszecki","Gröss","Grötzinger","Grün","Grüner","Gummelt","Gunkel","Gunther","Gutjahr","Gutowicz","Gutschank","Göbel","Göckeritz","Göhler","Görlich","Görmer","Götz","Götzelmann","Güldemeister","Günther","Günz","Gürbig","Haack","Haaf","Habel","Hache","Hackbusch","Hackelbusch","Hadfield","Hadwich","Haferkamp","Hahn","Hajek","Hallmann","Hamann","Hanenberger","Hannecker","Hanniske","Hansen","Hardy","Hargasser","Harms","Harnapp","Harter","Harting","Hartlieb","Hartmann","Hartwig","Hartz","Haschke","Hasler","Hasse","Hassfeld","Haug","Hauke","Haupt","Haverney","Heberstreit","Hechler","Hecht","Heck","Hedermann","Hehl","Heidelmann","Heidler","Heinemann","Heinig","Heinke","Heinrich","Heinze","Heiser","Heist","Hellmann","Helm","Helmke","Helpling","Hengmith","Henkel","Hennes","Henry","Hense","Hensel","Hentel","Hentschel","Hentschke","Hepperle","Herberger","Herbrand","Hering","Hermann","Hermecke","Herms","Herold","Herrmann","Herschmann","Hertel","Herweg","Herwig","Herzenberg","Hess","Hesse","Hessek","Hessler","Hetzler","Heuck","Heydemüller","Hiebl","Hildebrand","Hildenbrand","Hilgendorf","Hillard","Hiller","Hingsen","Hingst","Hinrichs","Hirsch","Hirschberg","Hirt","Hodea","Hoffman","Hoffmann","Hofmann","Hohenberger","Hohl","Hohn","Hohnheiser","Hold","Holdt","Holinski","Holl","Holtfreter","Holz","Holzdeppe","Holzner","Hommel","Honz","Hooss","Hoppe","Horak","Horn","Horna","Hornung","Hort","Howard","Huber","Huckestein","Hudak","Huebel","Hugo","Huhn","Hujo","Huke","Huls","Humbert","Huneke","Huth","Häber","Häfner","Höcke","Höft","Höhne","Hönig","Hördt","Hübenbecker","Hübl","Hübner","Hügel","Hüttcher","Hütter","Ibe","Ihly","Illing","Isak","Isekenmeier","Itt","Jacob","Jacobs","Jagusch","Jahn","Jahnke","Jakobs","Jakubczyk","Jambor","Jamrozy","Jander","Janich","Janke","Jansen","Jarets","Jaros","Jasinski","Jasper","Jegorov","Jellinghaus","Jeorga","Jerschabek","Jess","John","Jonas","Jossa","Jucken","Jung","Jungbluth","Jungton","Just","Jürgens","Kaczmarek","Kaesmacher","Kahl","Kahlert","Kahles","Kahlmeyer","Kaiser","Kalinowski","Kallabis","Kallensee","Kampf","Kampschulte","Kappe","Kappler","Karhoff","Karrass","Karst","Karsten","Karus","Kass","Kasten","Kastner","Katzinski","Kaufmann","Kaul","Kausemann","Kawohl","Kazmarek","Kedzierski","Keil","Keiner","Keller","Kelm","Kempe","Kemper","Kempter","Kerl","Kern","Kesselring","Kesselschläger","Kette","Kettenis","Keutel","Kick","Kiessling","Kinadeter","Kinzel","Kinzy","Kirch","Kirst","Kisabaka","Klaas","Klabuhn","Klapper","Klauder","Klaus","Kleeberg","Kleiber","Klein","Kleinert","Kleininger","Kleinmann","Kleinsteuber","Kleiss","Klemme","Klimczak","Klinger","Klink","Klopsch","Klose","Kloss","Kluge","Kluwe","Knabe","Kneifel","Knetsch","Knies","Knippel","Knobel","Knoblich","Knoll","Knorr","Knorscheidt","Knut","Kobs","Koch","Kochan","Kock","Koczulla","Koderisch","Koehl","Koehler","Koenig","Koester","Kofferschlager","Koha","Kohle","Kohlmann","Kohnle","Kohrt","Koj","Kolb","Koleiski","Kolokas","Komoll","Konieczny","Konig","Konow","Konya","Koob","Kopf","Kosenkow","Koster","Koszewski","Koubaa","Kovacs","Kowalick","Kowalinski","Kozakiewicz","Krabbe","Kraft","Kral","Kramer","Krauel","Kraus","Krause","Krauspe","Kreb","Krebs","Kreissig","Kresse","Kreutz","Krieger","Krippner","Krodinger","Krohn","Krol","Kron","Krueger","Krug","Kruger","Krull","Kruschinski","Krämer","Kröckert","Kröger","Krüger","Kubera","Kufahl","Kuhlee","Kuhnen","Kulimann","Kulma","Kumbernuss","Kummle","Kunz","Kupfer","Kupprion","Kuprion","Kurnicki","Kurrat","Kurschilgen","Kuschewitz","Kuschmann","Kuske","Kustermann","Kutscherauer","Kutzner","Kwadwo","Kähler","Käther","Köhler","Köhrbrück","Köhre","Kölotzei","König","Köpernick","Köseoglu","Kúhn","Kúhnert","Kühn","Kühnel","Kühnemund","Kühnert","Kühnke","Küsters","Küter","Laack","Lack","Ladewig","Lakomy","Lammert","Lamos","Landmann","Lang","Lange","Langfeld","Langhirt","Lanig","Lauckner","Lauinger","Laurén","Lausecker","Laux","Laws","Lax","Leberer","Lehmann","Lehner","Leibold","Leide","Leimbach","Leipold","Leist","Leiter","Leiteritz","Leitheim","Leiwesmeier","Lenfers","Lenk","Lenz","Lenzen","Leo","Lepthin","Lesch","Leschnik","Letzelter","Lewin","Lewke","Leyckes","Lg","Lichtenfeld","Lichtenhagen","Lichtl","Liebach","Liebe","Liebich","Liebold","Lieder","Lienshöft","Linden","Lindenberg","Lindenmayer","Lindner","Linke","Linnenbaum","Lippe","Lipske","Lipus","Lischka","Lobinger","Logsch","Lohmann","Lohre","Lohse","Lokar","Loogen","Lorenz","Losch","Loska","Lott","Loy","Lubina","Ludolf","Lufft","Lukoschek","Lutje","Lutz","Löser","Löwa","Lübke","Maak","Maczey","Madetzky","Madubuko","Mai","Maier","Maisch","Malek","Malkus","Mallmann","Malucha","Manns","Manz","Marahrens","Marchewski","Margis","Markowski","Marl","Marner","Marquart","Marschek","Martel","Marten","Martin","Marx","Marxen","Mathes","Mathies","Mathiszik","Matschke","Mattern","Matthes","Matula","Mau","Maurer","Mauroff","May","Maybach","Mayer","Mebold","Mehl","Mehlhorn","Mehlorn","Meier","Meisch","Meissner","Meloni","Melzer","Menga","Menne","Mensah","Mensing","Merkel","Merseburg","Mertens","Mesloh","Metzger","Metzner","Mewes","Meyer","Michallek","Michel","Mielke","Mikitenko","Milde","Minah","Mintzlaff","Mockenhaupt","Moede","Moedl","Moeller","Moguenara","Mohr","Mohrhard","Molitor","Moll","Moller","Molzan","Montag","Moormann","Mordhorst","Morgenstern","Morhelfer","Moritz","Moser","Motchebon","Motzenbbäcker","Mrugalla","Muckenthaler","Mues","Muller","Mulrain","Mächtig","Mäder","Möcks","Mögenburg","Möhsner","Möldner","Möllenbeck","Möller","Möllinger","Mörsch","Mühleis","Müller","Münch","Nabein","Nabow","Nagel","Nannen","Nastvogel","Nau","Naubert","Naumann","Ne","Neimke","Nerius","Neubauer","Neubert","Neuendorf","Neumair","Neumann","Neupert","Neurohr","Neuschwander","Newton","Ney","Nicolay","Niedermeier","Nieklauson","Niklaus","Nitzsche","Noack","Nodler","Nolte","Normann","Norris","Northoff","Nowak","Nussbeck","Nwachukwu","Nytra","Nöh","Oberem","Obergföll","Obermaier","Ochs","Oeser","Olbrich","Onnen","Ophey","Oppong","Orth","Orthmann","Oschkenat","Osei","Osenberg","Ostendarp","Ostwald","Otte","Otto","Paesler","Pajonk","Pallentin","Panzig","Paschke","Patzwahl","Paukner","Peselman","Peter","Peters","Petzold","Pfeiffer","Pfennig","Pfersich","Pfingsten","Pflieger","Pflügner","Philipp","Pichlmaier","Piesker","Pietsch","Pingpank","Pinnock","Pippig","Pitschugin","Plank","Plass","Platzer","Plauk","Plautz","Pletsch","Plotzitzka","Poehn","Poeschl","Pogorzelski","Pohl","Pohland","Pohle","Polifka","Polizzi","Pollmächer","Pomp","Ponitzsch","Porsche","Porth","Poschmann","Poser","Pottel","Prah","Prange","Prediger","Pressler","Preuk","Preuss","Prey","Priemer","Proske","Pusch","Pöche","Pöge","Raabe","Rabenstein","Rach","Radtke","Rahn","Ranftl","Rangen","Ranz","Rapp","Rath","Rau","Raubuch","Raukuc","Rautenkranz","Rehwagen","Reiber","Reichardt","Reichel","Reichling","Reif","Reifenrath","Reimann","Reinberg","Reinelt","Reinhardt","Reinke","Reitze","Renk","Rentz","Renz","Reppin","Restle","Restorff","Retzke","Reuber","Reumann","Reus","Reuss","Reusse","Rheder","Rhoden","Richards","Richter","Riedel","Riediger","Rieger","Riekmann","Riepl","Riermeier","Riester","Riethmüller","Rietmüller","Rietscher","Ringel","Ringer","Rink","Ripken","Ritosek","Ritschel","Ritter","Rittweg","Ritz","Roba","Rockmeier","Rodehau","Rodowski","Roecker","Roggatz","Rohländer","Rohrer","Rokossa","Roleder","Roloff","Roos","Rosbach","Roschinsky","Rose","Rosenauer","Rosenbauer","Rosenthal","Rosksch","Rossberg","Rossler","Roth","Rother","Ruch","Ruckdeschel","Rumpf","Rupprecht","Ruth","Ryjikh","Ryzih","Rädler","Räntsch","Rödiger","Röse","Röttger","Rücker","Rüdiger","Rüter","Sachse","Sack","Saflanis","Sagafe","Sagonas","Sahner","Saile","Sailer","Salow","Salzer","Salzmann","Sammert","Sander","Sarvari","Sattelmaier","Sauer","Sauerland","Saumweber","Savoia","Scc","Schacht","Schaefer","Schaffarzik","Schahbasian","Scharf","Schedler","Scheer","Schelk","Schellenbeck","Schembera","Schenk","Scherbarth","Scherer","Schersing","Scherz","Scheurer","Scheuring","Scheytt","Schielke","Schieskow","Schildhauer","Schilling","Schima","Schimmer","Schindzielorz","Schirmer","Schirrmeister","Schlachter","Schlangen","Schlawitz","Schlechtweg","Schley","Schlicht","Schlitzer","Schmalzle","Schmid","Schmidt","Schmidtchen","Schmitt","Schmitz","Schmuhl","Schneider","Schnelting","Schnieder","Schniedermeier","Schnürer","Schoberg","Scholz","Schonberg","Schondelmaier","Schorr","Schott","Schottmann","Schouren","Schrader","Schramm","Schreck","Schreiber","Schreiner","Schreiter","Schroder","Schröder","Schuermann","Schuff","Schuhaj","Schuldt","Schult","Schulte","Schultz","Schultze","Schulz","Schulze","Schumacher","Schumann","Schupp","Schuri","Schuster","Schwab","Schwalm","Schwanbeck","Schwandke","Schwanitz","Schwarthoff","Schwartz","Schwarz","Schwarzer","Schwarzkopf","Schwarzmeier","Schwatlo","Schweisfurth","Schwennen","Schwerdtner","Schwidde","Schwirkschlies","Schwuchow","Schäfer","Schäffel","Schäffer","Schäning","Schöckel","Schönball","Schönbeck","Schönberg","Schönebeck","Schönenberger","Schönfeld","Schönherr","Schönlebe","Schötz","Schüler","Schüppel","Schütz","Schütze","Seeger","Seelig","Sehls","Seibold","Seidel","Seiders","Seigel","Seiler","Seitz","Semisch","Senkel","Sewald","Siebel","Siebert","Siegling","Sielemann","Siemon","Siener","Sievers","Siewert","Sihler","Sillah","Simon","Sinnhuber","Sischka","Skibicki","Sladek","Slotta","Smieja","Soboll","Sokolowski","Soller","Sollner","Sommer","Somssich","Sonn","Sonnabend","Spahn","Spank","Spelmeyer","Spiegelburg","Spielvogel","Spinner","Spitzmüller","Splinter","Sporrer","Sprenger","Spöttel","Stahl","Stang","Stanger","Stauss","Steding","Steffen","Steffny","Steidl","Steigauf","Stein","Steinecke","Steinert","Steinkamp","Steinmetz","Stelkens","Stengel","Stengl","Stenzel","Stepanov","Stephan","Stern","Steuk","Stief","Stifel","Stoll","Stolle","Stolz","Storl","Storp","Stoutjesdijk","Stratmann","Straub","Strausa","Streck","Streese","Strege","Streit","Streller","Strieder","Striezel","Strogies","Strohschank","Strunz","Strutz","Stube","Stöckert","Stöppler","Stöwer","Stürmer","Suffa","Sujew","Sussmann","Suthe","Sutschet","Swillims","Szendrei","Sören","Sürth","Tafelmeier","Tang","Tasche","Taufratshofer","Tegethof","Teichmann","Tepper","Terheiden","Terlecki","Teufel","Theele","Thieke","Thimm","Thiomas","Thomas","Thriene","Thränhardt","Thust","Thyssen","Thöne","Tidow","Tiedtke","Tietze","Tilgner","Tillack","Timmermann","Tischler","Tischmann","Tittman","Tivontschik","Tonat","Tonn","Trampeli","Trauth","Trautmann","Travan","Treff","Tremmel","Tress","Tsamonikian","Tschiers","Tschirch","Tuch","Tucholke","Tudow","Tuschmo","Tächl","Többen","Töpfer","Uhlemann","Uhlig","Uhrig","Uibel","Uliczka","Ullmann","Ullrich","Umbach","Umlauft","Umminger","Unger","Unterpaintner","Urban","Urbaniak","Urbansky","Urhig","Vahlensieck","Van","Vangermain","Vater","Venghaus","Verniest","Verzi","Vey","Viellehner","Vieweg","Voelkel","Vogel","Vogelgsang","Vogt","Voigt","Vokuhl","Volk","Volker","Volkmann","Von","Vona","Vontein","Wachenbrunner","Wachtel","Wagner","Waibel","Wakan","Waldmann","Wallner","Wallstab","Walter","Walther","Walton","Walz","Wanner","Wartenberg","Waschbüsch","Wassilew","Wassiluk","Weber","Wehrsen","Weidlich","Weidner","Weigel","Weight","Weiler","Weimer","Weis","Weiss","Weller","Welsch","Welz","Welzel","Weniger","Wenk","Werle","Werner","Werrmann","Wessel","Wessinghage","Weyel","Wezel","Wichmann","Wickert","Wiebe","Wiechmann","Wiegelmann","Wierig","Wiese","Wieser","Wilhelm","Wilky","Will","Willwacher","Wilts","Wimmer","Winkelmann","Winkler","Winter","Wischek","Wischer","Wissing","Wittich","Wittl","Wolf","Wolfarth","Wolff","Wollenberg","Wollmann","Woytkowska","Wujak","Wurm","Wyludda","Wölpert","Wöschler","Wühn","Wünsche","Zach","Zaczkiewicz","Zahn","Zaituc","Zandt","Zanner","Zapletal","Zauber","Zeidler","Zekl","Zender","Zeuch","Zeyen","Zeyhle","Ziegler","Zimanyi","Zimmer","Zimmermann","Zinser","Zintl","Zipp","Zipse","Zschunke","Zuber","Zwiener","Zümsande","Östringer","Überacker"],"name":["#{prefix} #{first_name} #{last_name}","#{first_name} #{nobility_title_prefix} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}"],"nobility_title_prefix":["zu","von","vom","von der"],"prefix":["Dr.","Prof. Dr."]},"phone_number":{"formats":["01 #######","01#######","+43-1-#######","+431#######","0#### ####","0#########","+43-####-####","+43 ########"]}}},"de-CH":{"faker":{"address":{"country_code":["CH","CH","CH","DE","AT","US","LI","US","HK","VN"],"default_country":["Schweiz"],"postcode":["1###","2###","3###","4###","5###","6###","7###","8###","9###"]},"company":{"name":["#{Name.last_name} #{suffix}","#{Name.last_name}-#{Name.last_name}","#{Name.last_name}, #{Name.last_name} und #{Name.last_name}"],"suffix":["AG","GmbH","und Söhne","und Partner","\u0026 Co.","Gruppe","LLC","Inc."]},"internet":{"domain_suffix":["com","net","biz","ch","de","li","at","ch","ch"]},"phone_number":{"formats":["0800 ### ###","0800 ## ## ##","0## ### ## ##","0## ### ## ##","+41 ## ### ## ##","0900 ### ###","076 ### ## ##","+4178 ### ## ##","0041 79 ### ## ##"]}}},"en":{"activemodel":{"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","blank":"can't be blank","confirmation":"doesn't match %{attribute}","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","not_a_number":"is not a number","not_an_integer":"must be an integer","odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"many":"Cannot delete record because dependent %{record} exist","one":"Cannot delete record because a dependent %{record} exists"},"taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}},"template":{"body":"There were problems with the following fields:","header":{"one":"1 error prohibited this %{model} from being saved","other":"%{count} errors prohibited this %{model} from being saved"}}}},"activerecord":{"attributes":{"deal":{"comment":"Description","name":"Title"},"lookbook":{"name":"Title"},"user":{"created_at":"Created","email":"Email","id":"ID","password":"Password","password_confirmation":"Password again","updated_at":"Updated"}},"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","blank":"can't be blank","confirmation":"doesn't match %{attribute}","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","not_a_number":"is not a number","not_an_integer":"must be an integer","odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"many":"Cannot delete record because dependent %{record} exist","one":"Cannot delete record because a dependent %{record} exists"},"taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}},"template":{"body":"There were problems with the following fields:","header":{"one":"1 error prohibited this %{model} from being saved","other":"%{count} errors prohibited this %{model} from being saved"}}},"models":{"lookbook":{"one":"Lookbook","other":"Lookbooks"},"store":{"one":"Lookbook","other":"Lookbooks"},"user":{"one":"User","other":"Users"}}},"application":{"auth_form":{"header":"We're currently accepting people with high social influience. Please, verify your identity to quality using all most popular social networks."},"cancel":"Cancel","close":"Close","copyright":{"html":"\u0026copy;\u0026nbsp;%{year}\u0026nbsp;%{link}"},"create":{"button":"Add %{model}"},"destroy":{"button":"Destroy","confirm":"Are you sure that you want to delete %{model}? It can't be restored!"},"edit":{"button":{"html":"\u003ci class='fa fa-pencil'\u003e\u003c/i\u003e \u003cspan\u003eEdit\u003c/span\u003e"},"header":"Edit %{display_name}"},"fetching_image":"Fetching image...","incorrect_url_msg":"Incorrect URL (http://example.com).","index":{"button":"Back","header":"%{Models}"},"invalid_domain_msg":"The URL is not in the list of allowed domains","latest":{"header":"Last updated %{models}"},"menu":"%{Models}","minimal_size_msg":"Image must be at least %{size}px in height and width.","modal_error":"Sorry but there was an error: %{error}","new":{"button":{"html":"\u003ci class='fa fa-plus'\u003e\u003c/i\u003e \u003cspan\u003eAdd new one\u003c/span\u003e"},"header":"%{display_name}"},"next":"Next","no_img_msg":"Sorry, URL does not contain any suitable image.","no_items":"No %{models}","ok":"OK","passwords":{"button":"Change password","html":"Password"},"please_wait":"Please wait...","processing_image":"Processing image...","profile":{"menu":"My profile"},"request_invitation":"Request invitation","saved":"Saved","search":{"button":{"html":"Go"},"html":"Search..."},"searching_similar_products":"Searching similar products...","show":{"header":"%{Model} #%{id}","html":"Go"},"sign_in":{"button":"Sign In","header":"Sign in"},"sign_out":{"button":"Sign Out","html":"Sign out"},"sign_up":{"button":"Sign up","header":"Sign up"},"sorry_error_colon":"Sorry but there was an error","stats":{"button":"Statistics","header":"Statistics of %{display_name}"},"total":{"few":"(total: %{count} %{models})","one":"(total: %{count} %{model})","other":"(total: %{count} %{models})"},"total_lookbooks":{"html":{"few":"\u003cspan\u003e%{count}\u003c/span\u003e lookbooks","one":"\u003cspan\u003e%{count}\u003c/span\u003e lookbook","other":"\u003cspan\u003e%{count}\u003c/span\u003e lookbooks"}},"unlink_provider":"Unlink","update":{"button":"Save Changes"}},"authentication":{"application":{"auth_form":{"header":"We're currently accepting people with high social influience. Please, verify your identity to quality using all most popular social networks."},"cancel":"Cancel","close":"Close","copyright":{"html":"\u0026copy;\u0026nbsp;%{year}\u0026nbsp;%{link}"},"create":{"button":"Add %{model}"},"destroy":{"button":"Destroy","confirm":"Are you sure that you want to delete %{model}? It can't be restored!"},"edit":{"button":{"html":"\u003ci class='fa fa-pencil'\u003e\u003c/i\u003e \u003cspan\u003eEdit\u003c/span\u003e"},"header":"Edit %{display_name}"},"fetching_image":"Fetching image...","incorrect_url_msg":"Incorrect URL (http://example.com).","index":{"button":"Back","header":"%{Models}"},"invalid_domain_msg":"The URL is not in the list of allowed domains","latest":{"header":"Last updated %{models}"},"menu":"%{Models}","minimal_size_msg":"Image must be at least %{size}px in height and width.","modal_error":"Sorry but there was an error: %{error}","new":{"button":{"html":"\u003ci class='fa fa-plus'\u003e\u003c/i\u003e \u003cspan\u003eAdd new one\u003c/span\u003e"},"header":"%{display_name}"},"next":"Next","no_img_msg":"Sorry, URL does not contain any suitable image.","no_items":"No %{models}","ok":"OK","operations":{"menu":"Balance history"},"passwords":{"button":"Change password","html":"Password"},"please_wait":"Please wait...","processing_image":"Processing image...","profile":{"menu":"My profile"},"request_invitation":"Request invitation","saved":"Saved","search":{"button":{"html":"Go"},"html":"Search..."},"searching_similar_products":"Searching similar products...","show":{"header":"%{Model} #%{id}","html":"Go"},"sign_in":{"button":"Sign in","header":"Sign in"},"sign_out":{"button":"Sign out","html":"Sign out"},"sign_up":{"button":"Sign up","header":"Sign up"},"sorry_error_colon":"Sorry but there was an error","stats":{"button":"Statistics","header":"Statistics of %{display_name}"},"total":{"few":"(total: %{count} %{models})","one":"(total: %{count} %{model})","other":"(total: %{count} %{models})"},"total_lookbooks":{"html":{"few":"\u003cspan\u003e%{count}\u003c/span\u003e lookbooks","one":"\u003cspan\u003e%{count}\u003c/span\u003e lookbook","other":"\u003cspan\u003e%{count}\u003c/span\u003e lookbooks"}},"unlink_provider":"Unlink","update":{"button":"Save Changes"}}},"client":{"application":{"archived_links":"Archived Links","auth_form":{"header":"We're currently accepting people with high social influience. Please, verify your identity to quality using all most popular social networks."},"cancel":"Cancel","change_image":"Change image","close":"Close","copyright":{"html":"\u0026copy;\u0026nbsp;%{year}\u0026nbsp;%{link}"},"create":{"button":"Add %{model}"},"create_deal":"Paste url","create_lookbook":"Create Lookbook","deals":{"menu":"Links"},"destroy":{"button":"Destroy","confirm":"Are you sure that you want to delete %{model}? It can't be restored!"},"drag_drop":"You can drag and drop images into this window to upload.","edit":{"button":{"html":"\u003ci class='fa fa-pencil'\u003e\u003c/i\u003e \u003cspan\u003eEdit\u003c/span\u003e"},"header":"Edit %{display_name}"},"fetching_image":"Fetching image...","image_extentions":".gif, .jpg, .png","incorrect_url_msg":"Incorrect URL (http://example.com).","index":{"button":"Back","header":"%{Models}"},"invalid_domain_msg":"The URL is not in the list of allowed domains","latest":{"header":"Last updated %{models}"},"lookbooks":{"menu":"Lookbooks"},"menu":"%{Models}","minimal_size_msg":"Image must be at least %{size}px in height and width.","modal_error":"Sorry but there was an error: %{error}","new":{"button":{"html":"\u003ci class='fa fa-plus'\u003e\u003c/i\u003e \u003cspan\u003eAdd new %{model}\u003c/span\u003e"},"header":"%{display_name}"},"next":"Next","no_img_msg":"Sorry, URL does not contain any suitable image.","no_items":"No %{models}","ok":"OK","operations":{"menu":"Balance history"},"or":"or","passwords":{"button":"Change password","html":"Password"},"please_wait":"Please wait...","preview":{"html":"\u003ci class='fa fa-external-link-square'\u003e\u003c/i\u003e \u003cspan\u003ePreview\u003c/span\u003e"},"processing_image":"Processing image...","profile":{"menu":"My Profile"},"request_invitation":"Request invitation","saved":"Saved","search":{"button":{"html":"Go"},"html":"Search..."},"searching_similar_products":"Searching similar products...","show":{"header":"%{Model} #%{id}","html":"Go"},"sign_out":{"button":"Sign Out","html":"Sign out"},"sorry_error_colon":"Sorry but there was an error","stats":{"button":"Statistics","header":"Statistics of %{display_name}"},"total":{"few":"(total: %{count} %{models})","one":"(total: %{count} %{model})","other":"(total: %{count} %{models})"},"total_lookbooks":{"html":{"few":"\u003cspan\u003e%{count}\u003c/span\u003e lookbooks","one":"\u003cspan\u003e%{count}\u003c/span\u003e lookbook","other":"\u003cspan\u003e%{count}\u003c/span\u003e lookbooks"}},"unlink_provider":"Unlink","update":{"button":"Save Changes"}},"deals":{"active":"Public","archived":"Private","browsers":"Browsers","clicks":"Clicks","clicks_day":"Clicks per day","clicks_public":"Total views","clicks_total":"Total clicks","conversion_rate":"Conversion Rate","countries":"Countries","date":"Date","earning":"Earning","earnings_table":"Daily Statistics","edit":{"header":"Edit link"},"epc":"EPC","image_url":"Paste a new Product Link URL","index":{"header":"Generated Links"},"name":"Name","network_commission":"Commission","new":{"header":"Create a Link"},"os":"Operation systems","real_url":"Product URL","referrers":"Referrers","sales":"Sales","shares":"Shares"},"lookbooks":{"browsers":"Browsers","choose_deal":"Choose a link to add","clicks":"Clicks","clicks_day":"Clicks per day","clicks_public":"Total views","clicks_total":"Total clicks","conversion_rate":"Conversion Rate","countries":"Countries","date":"Date","deals_count":{"one":"Single link","other":"%{count} links","zero":"Without any link"},"earning":"Earning","earnings_table":"Daily Statistics","edit":{"header":"Add Links"},"epc":"EPC","name":"Name your Lookbook","new":{"header":"Create Lookbook"},"os":"Operation systems","publish":"Publish","real_url":"Upload from URL or Instagram","sales":"Sales","save":"Save","shares":"Shares","show":{"header":"%{id}"},"upload_image":"Upload main Image","upload_notice":"Choose main photo that contains products to tag"},"lookbooks_links":{"description":"Description","edit":{"header":"Edit a link"},"existing":{"header":"Add a existing Link"},"links_list":"Add a existing Link","new":{"header":"Add a link"},"new_link":"Create a Link","real_url":"Paste a new Product Link URL","title":"Title"},"operations":{"pending_operations":"Pending operations"},"profiles":{"edit":{"form":"Profile Account","title":"Edit User Profile"},"payments":"Payments","show":{"info":"About %{display_name}","title":"User Profile"},"socials":"Socials"},"published_lookbooks":{"published":"Lookbook is Published"},"suggestions":{"check_offer":"Check the offer","detected":{"html":"Detected product \u003cstrong\u003e%{keyword}\u003c/strong\u003e."},"do_search_suggestions":"Search and suggest same product on supported merchants...","generate":"Add a Link","merchants":"The following merchants sell it and we grant you receive the commission if you share their link:","no_merchants":"No merchants from supported list sell it.","no_product":"No product detected","not_supported":{"html":"\u003cstrong\u003e%{hostname}\u003c/strong\u003e is currently not supported"},"search_suggestions":"Trying to suggest same product on supported merchants..."}},"date":{"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"formats":{"default":"%Y-%m-%d","long":"%B %d, %Y","short":"%b %d"},"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"order":["year","month","day"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"about 1 hour","other":"about %{count} hours"},"about_x_months":{"one":"about 1 month","other":"about %{count} months"},"about_x_years":{"one":"about 1 year","other":"about %{count} years"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"},"half_a_minute":"half a minute","less_than_x_minutes":{"one":"less than a minute","other":"less than %{count} minutes"},"less_than_x_seconds":{"one":"less than 1 second","other":"less than %{count} seconds"},"over_x_years":{"one":"over 1 year","other":"over %{count} years"},"x_days":{"one":"1 day","other":"%{count} days"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"x_months":{"one":"1 month","other":"%{count} months"},"x_seconds":{"one":"1 second","other":"%{count} seconds"}},"prompts":{"day":"Day","hour":"Hour","minute":"Minute","month":"Month","second":"Seconds","year":"Year"}},"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","blank":"can't be blank","carrierwave_download_error":"could not be downloaded","carrierwave_integrity_error":"is not of an allowed file type","carrierwave_processing_error":"failed to be processed","confirmation":"doesn't match %{attribute}","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","extension_black_list_error":"You are not allowed to upload %{extension} files, prohibited types: %{prohibited_types}","extension_white_list_error":"You are not allowed to upload %{extension} files, allowed types: %{allowed_types}","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is invalid","invalid_currency":"Must be a valid currency (eg. '100', '5%{decimal}24', or '123%{thousands}456%{decimal}78'). Got %{currency}","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","mime_types_processing_error":"Failed to process file with MIME::Types, maybe not valid content-type? Original Error: %{e}","mini_magick_processing_error":"Failed to manipulate with MiniMagick, maybe it is not an image? Original Error: %{e}","not_a_number":"is not a number","not_an_integer":"must be an integer","odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"many":"Cannot delete record because dependent %{record} exist","one":"Cannot delete record because a dependent %{record} exists"},"rmagick_processing_error":"Failed to manipulate with rmagick, maybe it is not an image? Original Error: %{e}","taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}},"template":{"body":"There were problems with the following fields:","header":{"one":"1 error prohibited this %{model} from being saved","other":"%{count} errors prohibited this %{model} from being saved"}}},"faker":{"address":{"building_number":["#####","####","###"],"city":["#{city_prefix} #{Name.first_name}#{city_suffix}","#{city_prefix} #{Name.first_name}","#{Name.first_name}#{city_suffix}","#{Name.last_name}#{city_suffix}"],"city_prefix":["North","East","West","South","New","Lake","Port"],"city_suffix":["town","ton","land","ville","berg","burgh","borough","bury","view","port","mouth","stad","furt","chester","mouth","fort","haven","side","shire"],"country":["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica (the territory South of 60 deg S)","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island (Bouvetoya)","Brazil","British Indian Ocean Territory (Chagos Archipelago)","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Congo","Cook Islands","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Faroe Islands","Falkland Islands (Malvinas)","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Democratic People's Republic of Korea","Republic of Korea","Kuwait","Kyrgyz Republic","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands Antilles","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Barthelemy","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia (Slovak Republic)","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Spain","Sri Lanka","Sudan","Suriname","Svalbard \u0026 Jan Mayen Islands","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands, British","Virgin Islands, U.S.","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"],"country_code":["AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"],"default_country":["United States of America"],"postcode":["#####","#####-####"],"postcode_by_state":["#####","#####-####"],"secondary_address":["Apt. ###","Suite ###"],"state":["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],"state_abbr":["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"],"street_address":["#{building_number} #{street_name}"],"street_name":["#{Name.first_name} #{street_suffix}","#{Name.last_name} #{street_suffix}"],"street_suffix":["Alley","Avenue","Branch","Bridge","Brook","Brooks","Burg","Burgs","Bypass","Camp","Canyon","Cape","Causeway","Center","Centers","Circle","Circles","Cliff","Cliffs","Club","Common","Corner","Corners","Course","Court","Courts","Cove","Coves","Creek","Crescent","Crest","Crossing","Crossroad","Curve","Dale","Dam","Divide","Drive","Drive","Drives","Estate","Estates","Expressway","Extension","Extensions","Fall","Falls","Ferry","Field","Fields","Flat","Flats","Ford","Fords","Forest","Forge","Forges","Fork","Forks","Fort","Freeway","Garden","Gardens","Gateway","Glen","Glens","Green","Greens","Grove","Groves","Harbor","Harbors","Haven","Heights","Highway","Hill","Hills","Hollow","Inlet","Inlet","Island","Island","Islands","Islands","Isle","Isle","Junction","Junctions","Key","Keys","Knoll","Knolls","Lake","Lakes","Land","Landing","Lane","Light","Lights","Loaf","Lock","Locks","Locks","Lodge","Lodge","Loop","Mall","Manor","Manors","Meadow","Meadows","Mews","Mill","Mills","Mission","Mission","Motorway","Mount","Mountain","Mountain","Mountains","Mountains","Neck","Orchard","Oval","Overpass","Park","Parks","Parkway","Parkways","Pass","Passage","Path","Pike","Pine","Pines","Place","Plain","Plains","Plains","Plaza","Plaza","Point","Points","Port","Port","Ports","Ports","Prairie","Prairie","Radial","Ramp","Ranch","Rapid","Rapids","Rest","Ridge","Ridges","River","Road","Road","Roads","Roads","Route","Row","Rue","Run","Shoal","Shoals","Shore","Shores","Skyway","Spring","Springs","Springs","Spur","Spurs","Square","Square","Squares","Squares","Station","Station","Stravenue","Stravenue","Stream","Stream","Street","Street","Streets","Summit","Summit","Terrace","Throughway","Trace","Track","Trafficway","Trail","Trail","Tunnel","Tunnel","Turnpike","Turnpike","Underpass","Union","Unions","Valley","Valleys","Via","Viaduct","View","Views","Village","Village","Villages","Ville","Vista","Vista","Walk","Walks","Wall","Way","Ways","Well","Wells"],"time_zone":["Pacific/Midway","Pacific/Pago_Pago","Pacific/Honolulu","America/Juneau","America/Los_Angeles","America/Tijuana","America/Denver","America/Phoenix","America/Chihuahua","America/Mazatlan","America/Chicago","America/Regina","America/Mexico_City","America/Mexico_City","America/Monterrey","America/Guatemala","America/New_York","America/Indiana/Indianapolis","America/Bogota","America/Lima","America/Lima","America/Halifax","America/Caracas","America/La_Paz","America/Santiago","America/St_Johns","America/Sao_Paulo","America/Argentina/Buenos_Aires","America/Guyana","America/Godthab","Atlantic/South_Georgia","Atlantic/Azores","Atlantic/Cape_Verde","Europe/Dublin","Europe/London","Europe/Lisbon","Europe/London","Africa/Casablanca","Africa/Monrovia","Etc/UTC","Europe/Belgrade","Europe/Bratislava","Europe/Budapest","Europe/Ljubljana","Europe/Prague","Europe/Sarajevo","Europe/Skopje","Europe/Warsaw","Europe/Zagreb","Europe/Brussels","Europe/Copenhagen","Europe/Madrid","Europe/Paris","Europe/Amsterdam","Europe/Berlin","Europe/Berlin","Europe/Rome","Europe/Stockholm","Europe/Vienna","Africa/Algiers","Europe/Bucharest","Africa/Cairo","Europe/Helsinki","Europe/Kiev","Europe/Riga","Europe/Sofia","Europe/Tallinn","Europe/Vilnius","Europe/Athens","Europe/Istanbul","Europe/Minsk","Asia/Jerusalem","Africa/Harare","Africa/Johannesburg","Europe/Moscow","Europe/Moscow","Europe/Moscow","Asia/Kuwait","Asia/Riyadh","Africa/Nairobi","Asia/Baghdad","Asia/Tehran","Asia/Muscat","Asia/Muscat","Asia/Baku","Asia/Tbilisi","Asia/Yerevan","Asia/Kabul","Asia/Yekaterinburg","Asia/Karachi","Asia/Karachi","Asia/Tashkent","Asia/Kolkata","Asia/Kolkata","Asia/Kolkata","Asia/Kolkata","Asia/Kathmandu","Asia/Dhaka","Asia/Dhaka","Asia/Colombo","Asia/Almaty","Asia/Novosibirsk","Asia/Rangoon","Asia/Bangkok","Asia/Bangkok","Asia/Jakarta","Asia/Krasnoyarsk","Asia/Shanghai","Asia/Chongqing","Asia/Hong_Kong","Asia/Urumqi","Asia/Kuala_Lumpur","Asia/Singapore","Asia/Taipei","Australia/Perth","Asia/Irkutsk","Asia/Ulaanbaatar","Asia/Seoul","Asia/Tokyo","Asia/Tokyo","Asia/Tokyo","Asia/Yakutsk","Australia/Darwin","Australia/Adelaide","Australia/Melbourne","Australia/Melbourne","Australia/Sydney","Australia/Brisbane","Australia/Hobart","Asia/Vladivostok","Pacific/Guam","Pacific/Port_Moresby","Asia/Magadan","Asia/Magadan","Pacific/Noumea","Pacific/Fiji","Asia/Kamchatka","Pacific/Majuro","Pacific/Auckland","Pacific/Auckland","Pacific/Tongatapu","Pacific/Fakaofo","Pacific/Apia"]},"app":{"author":["#{Name.name}","#{Company.name}"],"name":["Redhold","Treeflex","Trippledex","Kanlam","Bigtax","Daltfresh","Toughjoyfax","Mat Lam Tam","Otcom","Tres-Zap","Y-Solowarm","Tresom","Voltsillam","Biodex","Greenlam","Viva","Matsoft","Temp","Zoolab","Subin","Rank","Job","Stringtough","Tin","It","Home Ing","Zamit","Sonsing","Konklab","Alpha","Latlux","Voyatouch","Alphazap","Holdlamis","Zaam-Dox","Sub-Ex","Quo Lux","Bamity","Ventosanzap","Lotstring","Hatity","Tempsoft","Overhold","Fixflex","Konklux","Zontrax","Tampflex","Span","Namfix","Transcof","Stim","Fix San","Sonair","Stronghold","Fintone","Y-find","Opela","Lotlux","Ronstring","Zathin","Duobam","Keylex"],"version":["0.#.#","0.##","#.##","#.#","#.#.#"]},"business":{"credit_card_expiry_dates":["2011-10-12","2012-11-12","2015-11-11","2013-9-12"],"credit_card_numbers":["1234-2121-1221-1211","1212-1221-1121-1234","1211-1221-1234-2201","1228-1221-1221-1431"],"credit_card_types":["visa","mastercard","americanexpress","discover"]},"cell_phone":{"formats":["###-###-####","(###) ###-####","1-###-###-####","###.###.####"]},"commerce":{"color":["red","green","blue","yellow","purple","mint green","teal","white","black","orange","pink","grey","maroon","violet","turquoise","tan","sky blue","salmon","plum","orchid","olive","magenta","lime","ivory","indigo","gold","fuchsia","cyan","azure","lavender","silver"],"department":["Books","Movies","Music","Games","Electronics","Computers","Home","Garden","Tools","Grocery","Health","Beauty","Toys","Kids","Baby","Clothing","Shoes","Jewelery","Sports","Outdoors","Automotive","Industrial"],"product_name":{"adjective":["Small","Ergonomic","Rustic","Intelligent","Gorgeous","Incredible","Fantastic","Practical","Sleek","Awesome"],"material":["Steel","Wooden","Concrete","Plastic","Cotton","Granite","Rubber"],"product":["Chair","Car","Computer","Gloves","Pants","Shirt","Table","Shoes","Hat"]}},"company":{"bs":[["implement","utilize","integrate","streamline","optimize","evolve","transform","embrace","enable","orchestrate","leverage","reinvent","aggregate","architect","enhance","incentivize","morph","empower","envisioneer","monetize","harness","facilitate","seize","disintermediate","synergize","strategize","deploy","brand","grow","target","syndicate","synthesize","deliver","mesh","incubate","engage","maximize","benchmark","expedite","reintermediate","whiteboard","visualize","repurpose","innovate","scale","unleash","drive","extend","engineer","revolutionize","generate","exploit","transition","e-enable","iterate","cultivate","matrix","productize","redefine","recontextualize"],["clicks-and-mortar","value-added","vertical","proactive","robust","revolutionary","scalable","leading-edge","innovative","intuitive","strategic","e-business","mission-critical","sticky","one-to-one","24/7","end-to-end","global","B2B","B2C","granular","frictionless","virtual","viral","dynamic","24/365","best-of-breed","killer","magnetic","bleeding-edge","web-enabled","interactive","dot-com","sexy","back-end","real-time","efficient","front-end","distributed","seamless","extensible","turn-key","world-class","open-source","cross-platform","cross-media","synergistic","bricks-and-clicks","out-of-the-box","enterprise","integrated","impactful","wireless","transparent","next-generation","cutting-edge","user-centric","visionary","customized","ubiquitous","plug-and-play","collaborative","compelling","holistic","rich"],["synergies","web-readiness","paradigms","markets","partnerships","infrastructures","platforms","initiatives","channels","eyeballs","communities","ROI","solutions","e-tailers","e-services","action-items","portals","niches","technologies","content","vortals","supply-chains","convergence","relationships","architectures","interfaces","e-markets","e-commerce","systems","bandwidth","infomediaries","models","mindshare","deliverables","users","schemas","networks","applications","metrics","e-business","functionalities","experiences","web services","methodologies"]],"buzzwords":[["Adaptive","Advanced","Ameliorated","Assimilated","Automated","Balanced","Business-focused","Centralized","Cloned","Compatible","Configurable","Cross-group","Cross-platform","Customer-focused","Customizable","Decentralized","De-engineered","Devolved","Digitized","Distributed","Diverse","Down-sized","Enhanced","Enterprise-wide","Ergonomic","Exclusive","Expanded","Extended","Face to face","Focused","Front-line","Fully-configurable","Function-based","Fundamental","Future-proofed","Grass-roots","Horizontal","Implemented","Innovative","Integrated","Intuitive","Inverse","Managed","Mandatory","Monitored","Multi-channelled","Multi-lateral","Multi-layered","Multi-tiered","Networked","Object-based","Open-architected","Open-source","Operative","Optimized","Optional","Organic","Organized","Persevering","Persistent","Phased","Polarised","Pre-emptive","Proactive","Profit-focused","Profound","Programmable","Progressive","Public-key","Quality-focused","Reactive","Realigned","Re-contextualized","Re-engineered","Reduced","Reverse-engineered","Right-sized","Robust","Seamless","Secured","Self-enabling","Sharable","Stand-alone","Streamlined","Switchable","Synchronised","Synergistic","Synergized","Team-oriented","Total","Triple-buffered","Universal","Up-sized","Upgradable","User-centric","User-friendly","Versatile","Virtual","Visionary","Vision-oriented"],["24 hour","24/7","3rd generation","4th generation","5th generation","6th generation","actuating","analyzing","asymmetric","asynchronous","attitude-oriented","background","bandwidth-monitored","bi-directional","bifurcated","bottom-line","clear-thinking","client-driven","client-server","coherent","cohesive","composite","context-sensitive","contextually-based","content-based","dedicated","demand-driven","didactic","directional","discrete","disintermediate","dynamic","eco-centric","empowering","encompassing","even-keeled","executive","explicit","exuding","fault-tolerant","foreground","fresh-thinking","full-range","global","grid-enabled","heuristic","high-level","holistic","homogeneous","human-resource","hybrid","impactful","incremental","intangible","interactive","intermediate","leading edge","local","logistical","maximized","methodical","mission-critical","mobile","modular","motivating","multimedia","multi-state","multi-tasking","national","needs-based","neutral","next generation","non-volatile","object-oriented","optimal","optimizing","radical","real-time","reciprocal","regional","responsive","scalable","secondary","solution-oriented","stable","static","systematic","systemic","system-worthy","tangible","tertiary","transitional","uniform","upward-trending","user-facing","value-added","web-enabled","well-modulated","zero administration","zero defect","zero tolerance"],["ability","access","adapter","algorithm","alliance","analyzer","application","approach","architecture","archive","artificial intelligence","array","attitude","benchmark","budgetary management","capability","capacity","challenge","circuit","collaboration","complexity","concept","conglomeration","contingency","core","customer loyalty","database","data-warehouse","definition","emulation","encoding","encryption","extranet","firmware","flexibility","focus group","forecast","frame","framework","function","functionalities","Graphic Interface","groupware","Graphical User Interface","hardware","help-desk","hierarchy","hub","implementation","info-mediaries","infrastructure","initiative","installation","instruction set","interface","internet solution","intranet","knowledge user","knowledge base","local area network","leverage","matrices","matrix","methodology","middleware","migration","model","moderator","monitoring","moratorium","neural-net","open architecture","open system","orchestration","paradigm","parallelism","policy","portal","pricing structure","process improvement","product","productivity","project","projection","protocol","secured line","service-desk","software","solution","standardization","strategy","structure","success","superstructure","support","synergy","system engine","task-force","throughput","time-frame","toolset","utilisation","website","workforce"]],"name":["#{Name.last_name} #{suffix}","#{Name.last_name}-#{Name.last_name}","#{Name.last_name}, #{Name.last_name} and #{Name.last_name}"],"suffix":["Inc","and Sons","LLC","Group"]},"credit_card":{"american_express":["/34##-######-####L/","/37##-######-####L/"],"dankort":"/5019-####-####-###L/","diners_club":["/30[0-5]#-######-###L/","/368#-######-###L/"],"discover":["/6011-####-####-###L/","/65##-####-####-###L/","/64[4-9]#-####-####-###L/","/6011-62##-####-####-###L/","/65##-62##-####-####-###L/","/64[4-9]#-62##-####-####-###L/"],"forbrugsforeningen":"/6007-22##-####-###L/","jcb":["/3528-####-####-###L/","/3529-####-####-###L/","/35[3-8]#-####-####-###L/"],"laser":["/6304###########L/","/6706###########L/","/6771###########L/","/6709###########L/","/6304#########{5,6}L/","/6706#########{5,6}L/","/6771#########{5,6}L/","/6709#########{5,6}L/"],"maestro":["/50#{9,16}L/","/5[6-8]#{9,16}L/","/56##{9,16}L/"],"mastercard":["/5[1-5]##-####-####-###L/","/6771-89##-####-###L/"],"solo":["/6767-####-####-###L/","/6767-####-####-####-#L/","/6767-####-####-####-##L/"],"switch":["/6759-####-####-###L/","/6759-####-####-####-#L/","/6759-####-####-####-##L/"],"visa":["/4###########L/","/4###-####-####-###L/"]},"hacker":{"abbreviation":["TCP","HTTP","SDD","RAM","GB","CSS","SSL","AGP","SQL","FTP","PCI","AI","ADP","RSS","XML","EXE","COM","HDD","THX","SMTP","SMS","USB","PNG","SAS","IB","SCSI","JSON","XSS","JBOD"],"adjective":["auxiliary","primary","back-end","digital","open-source","virtual","cross-platform","redundant","online","haptic","multi-byte","bluetooth","wireless","1080p","neural","optical","solid state","mobile"],"ingverb":["backing up","bypassing","hacking","overriding","compressing","copying","navigating","indexing","connecting","generating","quantifying","calculating","synthesizing","transmitting","programming","parsing"],"noun":["driver","protocol","bandwidth","panel","microchip","program","port","card","array","interface","system","sensor","firewall","hard drive","pixel","alarm","feed","monitor","application","transmitter","bus","circuit","capacitor","matrix"],"verb":["back up","bypass","hack","override","compress","copy","navigate","index","connect","generate","quantify","calculate","synthesize","input","transmit","program","reboot","parse"]},"internet":{"domain_suffix":["com","biz","info","name","net","org"],"free_email":["gmail.com","yahoo.com","hotmail.com"]},"lorem":{"supplemental":["abbas","abduco","abeo","abscido","absconditus","absens","absorbeo","absque","abstergo","absum","abundans","abutor","accedo","accendo","acceptus","accipio","accommodo","accusator","acer","acerbitas","acervus","acidus","acies","acquiro","acsi","adamo","adaugeo","addo","adduco","ademptio","adeo","adeptio","adfectus","adfero","adficio","adflicto","adhaero","adhuc","adicio","adimpleo","adinventitias","adipiscor","adiuvo","administratio","admiratio","admitto","admoneo","admoveo","adnuo","adopto","adsidue","adstringo","adsuesco","adsum","adulatio","adulescens","adultus","aduro","advenio","adversus","advoco","aedificium","aeger","aegre","aegrotatio","aegrus","aeneus","aequitas","aequus","aer","aestas","aestivus","aestus","aetas","aeternus","ager","aggero","aggredior","agnitio","agnosco","ago","ait","aiunt","alienus","alii","alioqui","aliqua","alius","allatus","alo","alter","altus","alveus","amaritudo","ambitus","ambulo","amicitia","amiculum","amissio","amita","amitto","amo","amor","amoveo","amplexus","amplitudo","amplus","ancilla","angelus","angulus","angustus","animadverto","animi","animus","annus","anser","ante","antea","antepono","antiquus","aperio","aperte","apostolus","apparatus","appello","appono","appositus","approbo","apto","aptus","apud","aqua","ara","aranea","arbitro","arbor","arbustum","arca","arceo","arcesso","arcus","argentum","argumentum","arguo","arma","armarium","armo","aro","ars","articulus","artificiose","arto","arx","ascisco","ascit","asper","aspicio","asporto","assentator","astrum","atavus","ater","atqui","atrocitas","atrox","attero","attollo","attonbitus","auctor","auctus","audacia","audax","audentia","audeo","audio","auditor","aufero","aureus","auris","aurum","aut","autem","autus","auxilium","avaritia","avarus","aveho","averto","avoco","baiulus","balbus","barba","bardus","basium","beatus","bellicus","bellum","bene","beneficium","benevolentia","benigne","bestia","bibo","bis","blandior","bonus","bos","brevis","cado","caecus","caelestis","caelum","calamitas","calcar","calco","calculus","callide","campana","candidus","canis","canonicus","canto","capillus","capio","capitulus","capto","caput","carbo","carcer","careo","caries","cariosus","caritas","carmen","carpo","carus","casso","caste","casus","catena","caterva","cattus","cauda","causa","caute","caveo","cavus","cedo","celebrer","celer","celo","cena","cenaculum","ceno","censura","centum","cerno","cernuus","certe","certo","certus","cervus","cetera","charisma","chirographum","cibo","cibus","cicuta","cilicium","cimentarius","ciminatio","cinis","circumvenio","cito","civis","civitas","clam","clamo","claro","clarus","claudeo","claustrum","clementia","clibanus","coadunatio","coaegresco","coepi","coerceo","cogito","cognatus","cognomen","cogo","cohaero","cohibeo","cohors","colligo","colloco","collum","colo","color","coma","combibo","comburo","comedo","comes","cometes","comis","comitatus","commemoro","comminor","commodo","communis","comparo","compello","complectus","compono","comprehendo","comptus","conatus","concedo","concido","conculco","condico","conduco","confero","confido","conforto","confugo","congregatio","conicio","coniecto","conitor","coniuratio","conor","conqueror","conscendo","conservo","considero","conspergo","constans","consuasor","contabesco","contego","contigo","contra","conturbo","conventus","convoco","copia","copiose","cornu","corona","corpus","correptius","corrigo","corroboro","corrumpo","coruscus","cotidie","crapula","cras","crastinus","creator","creber","crebro","credo","creo","creptio","crepusculum","cresco","creta","cribro","crinis","cruciamentum","crudelis","cruentus","crur","crustulum","crux","cubicularis","cubitum","cubo","cui","cuius","culpa","culpo","cultellus","cultura","cum","cunabula","cunae","cunctatio","cupiditas","cupio","cuppedia","cupressus","cur","cura","curatio","curia","curiositas","curis","curo","curriculum","currus","cursim","curso","cursus","curto","curtus","curvo","curvus","custodia","damnatio","damno","dapifer","debeo","debilito","decens","decerno","decet","decimus","decipio","decor","decretum","decumbo","dedecor","dedico","deduco","defaeco","defendo","defero","defessus","defetiscor","deficio","defigo","defleo","defluo","defungo","degenero","degero","degusto","deinde","delectatio","delego","deleo","delibero","delicate","delinquo","deludo","demens","demergo","demitto","demo","demonstro","demoror","demulceo","demum","denego","denique","dens","denuncio","denuo","deorsum","depereo","depono","depopulo","deporto","depraedor","deprecator","deprimo","depromo","depulso","deputo","derelinquo","derideo","deripio","desidero","desino","desipio","desolo","desparatus","despecto","despirmatio","infit","inflammatio","paens","patior","patria","patrocinor","patruus","pauci","paulatim","pauper","pax","peccatus","pecco","pecto","pectus","pecunia","pecus","peior","pel","ocer","socius","sodalitas","sol","soleo","solio","solitudo","solium","sollers","sollicito","solum","solus","solutio","solvo","somniculosus","somnus","sonitus","sono","sophismata","sopor","sordeo","sortitus","spargo","speciosus","spectaculum","speculum","sperno","spero","spes","spiculum","spiritus","spoliatio","sponte","stabilis","statim","statua","stella","stillicidium","stipes","stips","sto","strenuus","strues","studio","stultus","suadeo","suasoria","sub","subito","subiungo","sublime","subnecto","subseco","substantia","subvenio","succedo","succurro","sufficio","suffoco","suffragium","suggero","sui","sulum","sum","summa","summisse","summopere","sumo","sumptus","supellex","super","suppellex","supplanto","suppono","supra","surculus","surgo","sursum","suscipio","suspendo","sustineo","suus","synagoga","tabella","tabernus","tabesco","tabgo","tabula","taceo","tactus","taedium","talio","talis","talus","tam","tamdiu","tamen","tametsi","tamisium","tamquam","tandem","tantillus","tantum","tardus","tego","temeritas","temperantia","templum","temptatio","tempus","tenax","tendo","teneo","tener","tenuis","tenus","tepesco","tepidus","ter","terebro","teres","terga","tergeo","tergiversatio","tergo","tergum","termes","terminatio","tero","terra","terreo","territo","terror","tersus","tertius","testimonium","texo","textilis","textor","textus","thalassinus","theatrum","theca","thema","theologus","thermae","thesaurus","thesis","thorax","thymbra","thymum","tibi","timidus","timor","titulus","tolero","tollo","tondeo","tonsor","torqueo","torrens","tot","totidem","toties","totus","tracto","trado","traho","trans","tredecim","tremo","trepide","tres","tribuo","tricesimus","triduana","triginta","tripudio","tristis","triumphus","trucido","truculenter","tubineus","tui","tum","tumultus","tunc","turba","turbo","turpe","turpis","tutamen","tutis","tyrannus","uberrime","ubi","ulciscor","ullus","ulterius","ultio","ultra","umbra","umerus","umquam","una","unde","undique","universe","unus","urbanus","urbs","uredo","usitas","usque","ustilo","ustulo","usus","uter","uterque","utilis","utique","utor","utpote","utrimque","utroque","utrum","uxor","vaco","vacuus","vado","vae","valde","valens","valeo","valetudo","validus","vallum","vapulus","varietas","varius","vehemens","vel","velociter","velum","velut","venia","venio","ventito","ventosus","ventus","venustas","ver","verbera","verbum","vere","verecundia","vereor","vergo","veritas","vero","versus","verto","verumtamen","verus","vesco","vesica","vesper","vespillo","vester","vestigium","vestrum","vetus","via","vicinus","vicissitudo","victoria","victus","videlicet","video","viduata","viduo","vigilo","vigor","vilicus","vilis","vilitas","villa","vinco","vinculum","vindico","vinitor","vinum","vir","virga","virgo","viridis","viriliter","virtus","vis","viscus","vita","vitiosus","vitium","vito","vivo","vix","vobis","vociferor","voco","volaticus","volo","volubilis","voluntarius","volup","volutabrum","volva","vomer","vomica","vomito","vorago","vorax","voro","vos","votum","voveo","vox","vulariter","vulgaris","vulgivagus","vulgo","vulgus","vulnero","vulnus","vulpes","vulticulus","vultuosus","xiphias"],"words":["alias","consequatur","aut","perferendis","sit","voluptatem","accusantium","doloremque","aperiam","eaque","ipsa","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt","explicabo","aspernatur","aut","odit","aut","fugit","sed","quia","consequuntur","magni","dolores","eos","qui","ratione","voluptatem","sequi","nesciunt","neque","dolorem","ipsum","quia","dolor","sit","amet","consectetur","adipisci","velit","sed","quia","non","numquam","eius","modi","tempora","incidunt","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem","ut","enim","ad","minima","veniam","quis","nostrum","exercitationem","ullam","corporis","nemo","enim","ipsam","voluptatem","quia","voluptas","sit","suscipit","laboriosam","nisi","ut","aliquid","ex","ea","commodi","consequatur","quis","autem","vel","eum","iure","reprehenderit","qui","in","ea","voluptate","velit","esse","quam","nihil","molestiae","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","laudantium","totam","rem","voluptatum","deleniti","atque","corrupti","quos","dolores","et","quas","molestias","excepturi","sint","occaecati","cupiditate","non","provident","sed","ut","perspiciatis","unde","omnis","iste","natus","error","similique","sunt","in","culpa","qui","officia","deserunt","mollitia","animi","id","est","laborum","et","dolorum","fuga","et","harum","quidem","rerum","facilis","est","et","expedita","distinctio","nam","libero","tempore","cum","soluta","nobis","est","eligendi","optio","cumque","nihil","impedit","quo","porro","quisquam","est","qui","minus","id","quod","maxime","placeat","facere","possimus","omnis","voluptas","assumenda","est","omnis","dolor","repellendus","temporibus","autem","quibusdam","et","aut","consequatur","vel","illum","qui","dolorem","eum","fugiat","quo","voluptas","nulla","pariatur","at","vero","eos","et","accusamus","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet","ut","et","voluptates","repudiandae","sint","et","molestiae","non","recusandae","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus","ut","aut","reiciendis","voluptatibus","maiores","doloribus","asperiores","repellat"]},"name":{"first_name":["Aaliyah","Aaron","Abagail","Abbey","Abbie","Abbigail","Abby","Abdiel","Abdul","Abdullah","Abe","Abel","Abelardo","Abigail","Abigale","Abigayle","Abner","Abraham","Ada","Adah","Adalberto","Adaline","Adam","Adan","Addie","Addison","Adela","Adelbert","Adele","Adelia","Adeline","Adell","Adella","Adelle","Aditya","Adolf","Adolfo","Adolph","Adolphus","Adonis","Adrain","Adrian","Adriana","Adrianna","Adriel","Adrien","Adrienne","Afton","Aglae","Agnes","Agustin","Agustina","Ahmad","Ahmed","Aida","Aidan","Aiden","Aileen","Aimee","Aisha","Aiyana","Akeem","Al","Alaina","Alan","Alana","Alanis","Alanna","Alayna","Alba","Albert","Alberta","Albertha","Alberto","Albin","Albina","Alda","Alden","Alec","Aleen","Alejandra","Alejandrin","Alek","Alena","Alene","Alessandra","Alessandro","Alessia","Aletha","Alex","Alexa","Alexander","Alexandra","Alexandre","Alexandrea","Alexandria","Alexandrine","Alexandro","Alexane","Alexanne","Alexie","Alexis","Alexys","Alexzander","Alf","Alfonso","Alfonzo","Alford","Alfred","Alfreda","Alfredo","Ali","Alia","Alice","Alicia","Alisa","Alisha","Alison","Alivia","Aliya","Aliyah","Aliza","Alize","Allan","Allen","Allene","Allie","Allison","Ally","Alphonso","Alta","Althea","Alva","Alvah","Alvena","Alvera","Alverta","Alvina","Alvis","Alyce","Alycia","Alysa","Alysha","Alyson","Alysson","Amalia","Amanda","Amani","Amara","Amari","Amaya","Amber","Ambrose","Amelia","Amelie","Amely","America","Americo","Amie","Amina","Amir","Amira","Amiya","Amos","Amparo","Amy","Amya","Ana","Anabel","Anabelle","Anahi","Anais","Anastacio","Anastasia","Anderson","Andre","Andreane","Andreanne","Andres","Andrew","Andy","Angel","Angela","Angelica","Angelina","Angeline","Angelita","Angelo","Angie","Angus","Anibal","Anika","Anissa","Anita","Aniya","Aniyah","Anjali","Anna","Annabel","Annabell","Annabelle","Annalise","Annamae","Annamarie","Anne","Annetta","Annette","Annie","Ansel","Ansley","Anthony","Antoinette","Antone","Antonetta","Antonette","Antonia","Antonietta","Antonina","Antonio","Antwan","Antwon","Anya","April","Ara","Araceli","Aracely","Arch","Archibald","Ardella","Arden","Ardith","Arely","Ari","Ariane","Arianna","Aric","Ariel","Arielle","Arjun","Arlene","Arlie","Arlo","Armand","Armando","Armani","Arnaldo","Arne","Arno","Arnold","Arnoldo","Arnulfo","Aron","Art","Arthur","Arturo","Arvel","Arvid","Arvilla","Aryanna","Asa","Asha","Ashlee","Ashleigh","Ashley","Ashly","Ashlynn","Ashton","Ashtyn","Asia","Assunta","Astrid","Athena","Aubree","Aubrey","Audie","Audra","Audreanne","Audrey","August","Augusta","Augustine","Augustus","Aurelia","Aurelie","Aurelio","Aurore","Austen","Austin","Austyn","Autumn","Ava","Avery","Avis","Axel","Ayana","Ayden","Ayla","Aylin","Baby","Bailee","Bailey","Barbara","Barney","Baron","Barrett","Barry","Bart","Bartholome","Barton","Baylee","Beatrice","Beau","Beaulah","Bell","Bella","Belle","Ben","Benedict","Benjamin","Bennett","Bennie","Benny","Benton","Berenice","Bernadette","Bernadine","Bernard","Bernardo","Berneice","Bernhard","Bernice","Bernie","Berniece","Bernita","Berry","Bert","Berta","Bertha","Bertram","Bertrand","Beryl","Bessie","Beth","Bethany","Bethel","Betsy","Bette","Bettie","Betty","Bettye","Beulah","Beverly","Bianka","Bill","Billie","Billy","Birdie","Blair","Blaise","Blake","Blanca","Blanche","Blaze","Bo","Bobbie","Bobby","Bonita","Bonnie","Boris","Boyd","Brad","Braden","Bradford","Bradley","Bradly","Brady","Braeden","Brain","Brandi","Brando","Brandon","Brandt","Brandy","Brandyn","Brannon","Branson","Brant","Braulio","Braxton","Brayan","Breana","Breanna","Breanne","Brenda","Brendan","Brenden","Brendon","Brenna","Brennan","Brennon","Brent","Bret","Brett","Bria","Brian","Briana","Brianne","Brice","Bridget","Bridgette","Bridie","Brielle","Brigitte","Brionna","Brisa","Britney","Brittany","Brock","Broderick","Brody","Brook","Brooke","Brooklyn","Brooks","Brown","Bruce","Bryana","Bryce","Brycen","Bryon","Buck","Bud","Buddy","Buford","Bulah","Burdette","Burley","Burnice","Buster","Cade","Caden","Caesar","Caitlyn","Cale","Caleb","Caleigh","Cali","Calista","Callie","Camden","Cameron","Camila","Camilla","Camille","Camren","Camron","Camryn","Camylle","Candace","Candelario","Candice","Candida","Candido","Cara","Carey","Carissa","Carlee","Carleton","Carley","Carli","Carlie","Carlo","Carlos","Carlotta","Carmel","Carmela","Carmella","Carmelo","Carmen","Carmine","Carol","Carolanne","Carole","Carolina","Caroline","Carolyn","Carolyne","Carrie","Carroll","Carson","Carter","Cary","Casandra","Casey","Casimer","Casimir","Casper","Cassandra","Cassandre","Cassidy","Cassie","Catalina","Caterina","Catharine","Catherine","Cathrine","Cathryn","Cathy","Cayla","Ceasar","Cecelia","Cecil","Cecile","Cecilia","Cedrick","Celestine","Celestino","Celia","Celine","Cesar","Chad","Chadd","Chadrick","Chaim","Chance","Chandler","Chanel","Chanelle","Charity","Charlene","Charles","Charley","Charlie","Charlotte","Chase","Chasity","Chauncey","Chaya","Chaz","Chelsea","Chelsey","Chelsie","Chesley","Chester","Chet","Cheyanne","Cheyenne","Chloe","Chris","Christ","Christa","Christelle","Christian","Christiana","Christina","Christine","Christop","Christophe","Christopher","Christy","Chyna","Ciara","Cicero","Cielo","Cierra","Cindy","Citlalli","Clair","Claire","Clara","Clarabelle","Clare","Clarissa","Clark","Claud","Claude","Claudia","Claudie","Claudine","Clay","Clemens","Clement","Clementina","Clementine","Clemmie","Cleo","Cleora","Cleta","Cletus","Cleve","Cleveland","Clifford","Clifton","Clint","Clinton","Clotilde","Clovis","Cloyd","Clyde","Coby","Cody","Colby","Cole","Coleman","Colin","Colleen","Collin","Colt","Colten","Colton","Columbus","Concepcion","Conner","Connie","Connor","Conor","Conrad","Constance","Constantin","Consuelo","Cooper","Cora","Coralie","Corbin","Cordelia","Cordell","Cordia","Cordie","Corene","Corine","Cornelius","Cornell","Corrine","Cortez","Cortney","Cory","Coty","Courtney","Coy","Craig","Crawford","Creola","Cristal","Cristian","Cristina","Cristobal","Cristopher","Cruz","Crystal","Crystel","Cullen","Curt","Curtis","Cydney","Cynthia","Cyril","Cyrus","Dagmar","Dahlia","Daija","Daisha","Daisy","Dakota","Dale","Dallas","Dallin","Dalton","Damaris","Dameon","Damian","Damien","Damion","Damon","Dan","Dana","Dandre","Dane","D'angelo","Dangelo","Danial","Daniela","Daniella","Danielle","Danika","Dannie","Danny","Dante","Danyka","Daphne","Daphnee","Daphney","Darby","Daren","Darian","Dariana","Darien","Dario","Darion","Darius","Darlene","Daron","Darrel","Darrell","Darren","Darrick","Darrin","Darrion","Darron","Darryl","Darwin","Daryl","Dashawn","Dasia","Dave","David","Davin","Davion","Davon","Davonte","Dawn","Dawson","Dax","Dayana","Dayna","Dayne","Dayton","Dean","Deangelo","Deanna","Deborah","Declan","Dedric","Dedrick","Dee","Deion","Deja","Dejah","Dejon","Dejuan","Delaney","Delbert","Delfina","Delia","Delilah","Dell","Della","Delmer","Delores","Delpha","Delphia","Delphine","Delta","Demarco","Demarcus","Demario","Demetris","Demetrius","Demond","Dena","Denis","Dennis","Deon","Deondre","Deontae","Deonte","Dereck","Derek","Derick","Deron","Derrick","Deshaun","Deshawn","Desiree","Desmond","Dessie","Destany","Destin","Destinee","Destiney","Destini","Destiny","Devan","Devante","Deven","Devin","Devon","Devonte","Devyn","Dewayne","Dewitt","Dexter","Diamond","Diana","Dianna","Diego","Dillan","Dillon","Dimitri","Dina","Dino","Dion","Dixie","Dock","Dolly","Dolores","Domenic","Domenica","Domenick","Domenico","Domingo","Dominic","Dominique","Don","Donald","Donato","Donavon","Donna","Donnell","Donnie","Donny","Dora","Dorcas","Dorian","Doris","Dorothea","Dorothy","Dorris","Dortha","Dorthy","Doug","Douglas","Dovie","Doyle","Drake","Drew","Duane","Dudley","Dulce","Duncan","Durward","Dustin","Dusty","Dwight","Dylan","Earl","Earlene","Earline","Earnest","Earnestine","Easter","Easton","Ebba","Ebony","Ed","Eda","Edd","Eddie","Eden","Edgar","Edgardo","Edison","Edmond","Edmund","Edna","Eduardo","Edward","Edwardo","Edwin","Edwina","Edyth","Edythe","Effie","Efrain","Efren","Eileen","Einar","Eino","Eladio","Elaina","Elbert","Elda","Eldon","Eldora","Eldred","Eldridge","Eleanora","Eleanore","Eleazar","Electa","Elena","Elenor","Elenora","Eleonore","Elfrieda","Eli","Elian","Eliane","Elias","Eliezer","Elijah","Elinor","Elinore","Elisa","Elisabeth","Elise","Eliseo","Elisha","Elissa","Eliza","Elizabeth","Ella","Ellen","Ellie","Elliot","Elliott","Ellis","Ellsworth","Elmer","Elmira","Elmo","Elmore","Elna","Elnora","Elody","Eloisa","Eloise","Elouise","Eloy","Elroy","Elsa","Else","Elsie","Elta","Elton","Elva","Elvera","Elvie","Elvis","Elwin","Elwyn","Elyse","Elyssa","Elza","Emanuel","Emelia","Emelie","Emely","Emerald","Emerson","Emery","Emie","Emil","Emile","Emilia","Emiliano","Emilie","Emilio","Emily","Emma","Emmalee","Emmanuel","Emmanuelle","Emmet","Emmett","Emmie","Emmitt","Emmy","Emory","Ena","Enid","Enoch","Enola","Enos","Enrico","Enrique","Ephraim","Era","Eriberto","Eric","Erica","Erich","Erick","Ericka","Erik","Erika","Erin","Erling","Erna","Ernest","Ernestina","Ernestine","Ernesto","Ernie","Ervin","Erwin","Eryn","Esmeralda","Esperanza","Esta","Esteban","Estefania","Estel","Estell","Estella","Estelle","Estevan","Esther","Estrella","Etha","Ethan","Ethel","Ethelyn","Ethyl","Ettie","Eudora","Eugene","Eugenia","Eula","Eulah","Eulalia","Euna","Eunice","Eusebio","Eva","Evalyn","Evan","Evangeline","Evans","Eve","Eveline","Evelyn","Everardo","Everett","Everette","Evert","Evie","Ewald","Ewell","Ezekiel","Ezequiel","Ezra","Fabian","Fabiola","Fae","Fannie","Fanny","Fatima","Faustino","Fausto","Favian","Fay","Faye","Federico","Felicia","Felicita","Felicity","Felipa","Felipe","Felix","Felton","Fermin","Fern","Fernando","Ferne","Fidel","Filiberto","Filomena","Finn","Fiona","Flavie","Flavio","Fleta","Fletcher","Flo","Florence","Florencio","Florian","Florida","Florine","Flossie","Floy","Floyd","Ford","Forest","Forrest","Foster","Frances","Francesca","Francesco","Francis","Francisca","Francisco","Franco","Frank","Frankie","Franz","Fred","Freda","Freddie","Freddy","Frederic","Frederick","Frederik","Frederique","Fredrick","Fredy","Freeda","Freeman","Freida","Frida","Frieda","Friedrich","Fritz","Furman","Gabe","Gabriel","Gabriella","Gabrielle","Gaetano","Gage","Gail","Gardner","Garett","Garfield","Garland","Garnet","Garnett","Garret","Garrett","Garrick","Garrison","Garry","Garth","Gaston","Gavin","Gay","Gayle","Gaylord","Gene","General","Genesis","Genevieve","Gennaro","Genoveva","Geo","Geoffrey","George","Georgette","Georgiana","Georgianna","Geovanni","Geovanny","Geovany","Gerald","Geraldine","Gerard","Gerardo","Gerda","Gerhard","Germaine","German","Gerry","Gerson","Gertrude","Gia","Gianni","Gideon","Gilbert","Gilberto","Gilda","Giles","Gillian","Gina","Gino","Giovani","Giovanna","Giovanni","Giovanny","Gisselle","Giuseppe","Gladyce","Gladys","Glen","Glenda","Glenna","Glennie","Gloria","Godfrey","Golda","Golden","Gonzalo","Gordon","Grace","Gracie","Graciela","Grady","Graham","Grant","Granville","Grayce","Grayson","Green","Greg","Gregg","Gregoria","Gregorio","Gregory","Greta","Gretchen","Greyson","Griffin","Grover","Guadalupe","Gudrun","Guido","Guillermo","Guiseppe","Gunnar","Gunner","Gus","Gussie","Gust","Gustave","Guy","Gwen","Gwendolyn","Hadley","Hailee","Hailey","Hailie","Hal","Haleigh","Haley","Halie","Halle","Hallie","Hank","Hanna","Hannah","Hans","Hardy","Harley","Harmon","Harmony","Harold","Harrison","Harry","Harvey","Haskell","Hassan","Hassie","Hattie","Haven","Hayden","Haylee","Hayley","Haylie","Hazel","Hazle","Heath","Heather","Heaven","Heber","Hector","Heidi","Helen","Helena","Helene","Helga","Hellen","Helmer","Heloise","Henderson","Henri","Henriette","Henry","Herbert","Herman","Hermann","Hermina","Herminia","Herminio","Hershel","Herta","Hertha","Hester","Hettie","Hilario","Hilbert","Hilda","Hildegard","Hillard","Hillary","Hilma","Hilton","Hipolito","Hiram","Hobart","Holden","Hollie","Hollis","Holly","Hope","Horace","Horacio","Hortense","Hosea","Houston","Howard","Howell","Hoyt","Hubert","Hudson","Hugh","Hulda","Humberto","Hunter","Hyman","Ian","Ibrahim","Icie","Ida","Idell","Idella","Ignacio","Ignatius","Ike","Ila","Ilene","Iliana","Ima","Imani","Imelda","Immanuel","Imogene","Ines","Irma","Irving","Irwin","Isaac","Isabel","Isabell","Isabella","Isabelle","Isac","Isadore","Isai","Isaiah","Isaias","Isidro","Ismael","Isobel","Isom","Israel","Issac","Itzel","Iva","Ivah","Ivory","Ivy","Izabella","Izaiah","Jabari","Jace","Jacey","Jacinthe","Jacinto","Jack","Jackeline","Jackie","Jacklyn","Jackson","Jacky","Jaclyn","Jacquelyn","Jacques","Jacynthe","Jada","Jade","Jaden","Jadon","Jadyn","Jaeden","Jaida","Jaiden","Jailyn","Jaime","Jairo","Jakayla","Jake","Jakob","Jaleel","Jalen","Jalon","Jalyn","Jamaal","Jamal","Jamar","Jamarcus","Jamel","Jameson","Jamey","Jamie","Jamil","Jamir","Jamison","Jammie","Jan","Jana","Janae","Jane","Janelle","Janessa","Janet","Janice","Janick","Janie","Janis","Janiya","Jannie","Jany","Jaquan","Jaquelin","Jaqueline","Jared","Jaren","Jarod","Jaron","Jarred","Jarrell","Jarret","Jarrett","Jarrod","Jarvis","Jasen","Jasmin","Jason","Jasper","Jaunita","Javier","Javon","Javonte","Jay","Jayce","Jaycee","Jayda","Jayde","Jayden","Jaydon","Jaylan","Jaylen","Jaylin","Jaylon","Jayme","Jayne","Jayson","Jazlyn","Jazmin","Jazmyn","Jazmyne","Jean","Jeanette","Jeanie","Jeanne","Jed","Jedediah","Jedidiah","Jeff","Jefferey","Jeffery","Jeffrey","Jeffry","Jena","Jenifer","Jennie","Jennifer","Jennings","Jennyfer","Jensen","Jerad","Jerald","Jeramie","Jeramy","Jerel","Jeremie","Jeremy","Jermain","Jermaine","Jermey","Jerod","Jerome","Jeromy","Jerrell","Jerrod","Jerrold","Jerry","Jess","Jesse","Jessica","Jessie","Jessika","Jessy","Jessyca","Jesus","Jett","Jettie","Jevon","Jewel","Jewell","Jillian","Jimmie","Jimmy","Jo","Joan","Joana","Joanie","Joanne","Joannie","Joanny","Joany","Joaquin","Jocelyn","Jodie","Jody","Joe","Joel","Joelle","Joesph","Joey","Johan","Johann","Johanna","Johathan","John","Johnathan","Johnathon","Johnnie","Johnny","Johnpaul","Johnson","Jolie","Jon","Jonas","Jonatan","Jonathan","Jonathon","Jordan","Jordane","Jordi","Jordon","Jordy","Jordyn","Jorge","Jose","Josefa","Josefina","Joseph","Josephine","Josh","Joshua","Joshuah","Josiah","Josiane","Josianne","Josie","Josue","Jovan","Jovani","Jovanny","Jovany","Joy","Joyce","Juana","Juanita","Judah","Judd","Jude","Judge","Judson","Judy","Jules","Julia","Julian","Juliana","Julianne","Julie","Julien","Juliet","Julio","Julius","June","Junior","Junius","Justen","Justice","Justina","Justine","Juston","Justus","Justyn","Juvenal","Juwan","Kacey","Kaci","Kacie","Kade","Kaden","Kadin","Kaela","Kaelyn","Kaia","Kailee","Kailey","Kailyn","Kaitlin","Kaitlyn","Kale","Kaleb","Kaleigh","Kaley","Kali","Kallie","Kameron","Kamille","Kamren","Kamron","Kamryn","Kane","Kara","Kareem","Karelle","Karen","Kari","Kariane","Karianne","Karina","Karine","Karl","Karlee","Karley","Karli","Karlie","Karolann","Karson","Kasandra","Kasey","Kassandra","Katarina","Katelin","Katelyn","Katelynn","Katharina","Katherine","Katheryn","Kathleen","Kathlyn","Kathryn","Kathryne","Katlyn","Katlynn","Katrina","Katrine","Kattie","Kavon","Kay","Kaya","Kaycee","Kayden","Kayla","Kaylah","Kaylee","Kayleigh","Kayley","Kayli","Kaylie","Kaylin","Keagan","Keanu","Keara","Keaton","Keegan","Keeley","Keely","Keenan","Keira","Keith","Kellen","Kelley","Kelli","Kellie","Kelly","Kelsi","Kelsie","Kelton","Kelvin","Ken","Kendall","Kendra","Kendrick","Kenna","Kennedi","Kennedy","Kenneth","Kennith","Kenny","Kenton","Kenya","Kenyatta","Kenyon","Keon","Keshaun","Keshawn","Keven","Kevin","Kevon","Keyon","Keyshawn","Khalid","Khalil","Kian","Kiana","Kianna","Kiara","Kiarra","Kiel","Kiera","Kieran","Kiley","Kim","Kimberly","King","Kip","Kira","Kirk","Kirsten","Kirstin","Kitty","Kobe","Koby","Kody","Kolby","Kole","Korbin","Korey","Kory","Kraig","Kris","Krista","Kristian","Kristin","Kristina","Kristofer","Kristoffer","Kristopher","Kristy","Krystal","Krystel","Krystina","Kurt","Kurtis","Kyla","Kyle","Kylee","Kyleigh","Kyler","Kylie","Kyra","Lacey","Lacy","Ladarius","Lafayette","Laila","Laisha","Lamar","Lambert","Lamont","Lance","Landen","Lane","Laney","Larissa","Laron","Larry","Larue","Laura","Laurel","Lauren","Laurence","Lauretta","Lauriane","Laurianne","Laurie","Laurine","Laury","Lauryn","Lavada","Lavern","Laverna","Laverne","Lavina","Lavinia","Lavon","Lavonne","Lawrence","Lawson","Layla","Layne","Lazaro","Lea","Leann","Leanna","Leanne","Leatha","Leda","Lee","Leif","Leila","Leilani","Lela","Lelah","Leland","Lelia","Lempi","Lemuel","Lenna","Lennie","Lenny","Lenora","Lenore","Leo","Leola","Leon","Leonard","Leonardo","Leone","Leonel","Leonie","Leonor","Leonora","Leopold","Leopoldo","Leora","Lera","Lesley","Leslie","Lesly","Lessie","Lester","Leta","Letha","Letitia","Levi","Lew","Lewis","Lexi","Lexie","Lexus","Lia","Liam","Liana","Libbie","Libby","Lila","Lilian","Liliana","Liliane","Lilla","Lillian","Lilliana","Lillie","Lilly","Lily","Lilyan","Lina","Lincoln","Linda","Lindsay","Lindsey","Linnea","Linnie","Linwood","Lionel","Lisa","Lisandro","Lisette","Litzy","Liza","Lizeth","Lizzie","Llewellyn","Lloyd","Logan","Lois","Lola","Lolita","Loma","Lon","London","Lonie","Lonnie","Lonny","Lonzo","Lora","Loraine","Loren","Lorena","Lorenz","Lorenza","Lorenzo","Lori","Lorine","Lorna","Lottie","Lou","Louie","Louisa","Lourdes","Louvenia","Lowell","Loy","Loyal","Loyce","Lucas","Luciano","Lucie","Lucienne","Lucile","Lucinda","Lucio","Lucious","Lucius","Lucy","Ludie","Ludwig","Lue","Luella","Luigi","Luis","Luisa","Lukas","Lula","Lulu","Luna","Lupe","Lura","Lurline","Luther","Luz","Lyda","Lydia","Lyla","Lynn","Lyric","Lysanne","Mabel","Mabelle","Mable","Mac","Macey","Maci","Macie","Mack","Mackenzie","Macy","Madaline","Madalyn","Maddison","Madeline","Madelyn","Madelynn","Madge","Madie","Madilyn","Madisen","Madison","Madisyn","Madonna","Madyson","Mae","Maegan","Maeve","Mafalda","Magali","Magdalen","Magdalena","Maggie","Magnolia","Magnus","Maia","Maida","Maiya","Major","Makayla","Makenna","Makenzie","Malachi","Malcolm","Malika","Malinda","Mallie","Mallory","Malvina","Mandy","Manley","Manuel","Manuela","Mara","Marc","Marcel","Marcelina","Marcelino","Marcella","Marcelle","Marcellus","Marcelo","Marcia","Marco","Marcos","Marcus","Margaret","Margarete","Margarett","Margaretta","Margarette","Margarita","Marge","Margie","Margot","Margret","Marguerite","Maria","Mariah","Mariam","Marian","Mariana","Mariane","Marianna","Marianne","Mariano","Maribel","Marie","Mariela","Marielle","Marietta","Marilie","Marilou","Marilyne","Marina","Mario","Marion","Marisa","Marisol","Maritza","Marjolaine","Marjorie","Marjory","Mark","Markus","Marlee","Marlen","Marlene","Marley","Marlin","Marlon","Marques","Marquis","Marquise","Marshall","Marta","Martin","Martina","Martine","Marty","Marvin","Mary","Maryam","Maryjane","Maryse","Mason","Mateo","Mathew","Mathias","Mathilde","Matilda","Matilde","Matt","Matteo","Mattie","Maud","Maude","Maudie","Maureen","Maurice","Mauricio","Maurine","Maverick","Mavis","Max","Maxie","Maxime","Maximilian","Maximillia","Maximillian","Maximo","Maximus","Maxine","Maxwell","May","Maya","Maybell","Maybelle","Maye","Maymie","Maynard","Mayra","Mazie","Mckayla","Mckenna","Mckenzie","Meagan","Meaghan","Meda","Megane","Meggie","Meghan","Mekhi","Melany","Melba","Melisa","Melissa","Mellie","Melody","Melvin","Melvina","Melyna","Melyssa","Mercedes","Meredith","Merl","Merle","Merlin","Merritt","Mertie","Mervin","Meta","Mia","Micaela","Micah","Michael","Michaela","Michale","Micheal","Michel","Michele","Michelle","Miguel","Mikayla","Mike","Mikel","Milan","Miles","Milford","Miller","Millie","Milo","Milton","Mina","Minerva","Minnie","Miracle","Mireille","Mireya","Misael","Missouri","Misty","Mitchel","Mitchell","Mittie","Modesta","Modesto","Mohamed","Mohammad","Mohammed","Moises","Mollie","Molly","Mona","Monica","Monique","Monroe","Monserrat","Monserrate","Montana","Monte","Monty","Morgan","Moriah","Morris","Mortimer","Morton","Mose","Moses","Moshe","Mossie","Mozell","Mozelle","Muhammad","Muriel","Murl","Murphy","Murray","Mustafa","Mya","Myah","Mylene","Myles","Myra","Myriam","Myrl","Myrna","Myron","Myrtice","Myrtie","Myrtis","Myrtle","Nadia","Nakia","Name","Nannie","Naomi","Naomie","Napoleon","Narciso","Nash","Nasir","Nat","Natalia","Natalie","Natasha","Nathan","Nathanael","Nathanial","Nathaniel","Nathen","Nayeli","Neal","Ned","Nedra","Neha","Neil","Nelda","Nella","Nelle","Nellie","Nels","Nelson","Neoma","Nestor","Nettie","Neva","Newell","Newton","Nia","Nicholas","Nicholaus","Nichole","Nick","Nicklaus","Nickolas","Nico","Nicola","Nicolas","Nicole","Nicolette","Nigel","Nikita","Nikki","Nikko","Niko","Nikolas","Nils","Nina","Noah","Noble","Noe","Noel","Noelia","Noemi","Noemie","Noemy","Nola","Nolan","Nona","Nora","Norbert","Norberto","Norene","Norma","Norris","Norval","Norwood","Nova","Novella","Nya","Nyah","Nyasia","Obie","Oceane","Ocie","Octavia","Oda","Odell","Odessa","Odie","Ofelia","Okey","Ola","Olaf","Ole","Olen","Oleta","Olga","Olin","Oliver","Ollie","Oma","Omari","Omer","Ona","Onie","Opal","Ophelia","Ora","Oral","Oran","Oren","Orie","Orin","Orion","Orland","Orlando","Orlo","Orpha","Orrin","Orval","Orville","Osbaldo","Osborne","Oscar","Osvaldo","Oswald","Oswaldo","Otha","Otho","Otilia","Otis","Ottilie","Ottis","Otto","Ova","Owen","Ozella","Pablo","Paige","Palma","Pamela","Pansy","Paolo","Paris","Parker","Pascale","Pasquale","Pat","Patience","Patricia","Patrick","Patsy","Pattie","Paul","Paula","Pauline","Paxton","Payton","Pearl","Pearlie","Pearline","Pedro","Peggie","Penelope","Percival","Percy","Perry","Pete","Peter","Petra","Peyton","Philip","Phoebe","Phyllis","Pierce","Pierre","Pietro","Pink","Pinkie","Piper","Polly","Porter","Precious","Presley","Preston","Price","Prince","Princess","Priscilla","Providenci","Prudence","Queen","Queenie","Quentin","Quincy","Quinn","Quinten","Quinton","Rachael","Rachel","Rachelle","Rae","Raegan","Rafael","Rafaela","Raheem","Rahsaan","Rahul","Raina","Raleigh","Ralph","Ramiro","Ramon","Ramona","Randal","Randall","Randi","Randy","Ransom","Raoul","Raphael","Raphaelle","Raquel","Rashad","Rashawn","Rasheed","Raul","Raven","Ray","Raymond","Raymundo","Reagan","Reanna","Reba","Rebeca","Rebecca","Rebeka","Rebekah","Reece","Reed","Reese","Regan","Reggie","Reginald","Reid","Reilly","Reina","Reinhold","Remington","Rene","Renee","Ressie","Reta","Retha","Retta","Reuben","Reva","Rex","Rey","Reyes","Reymundo","Reyna","Reynold","Rhea","Rhett","Rhianna","Rhiannon","Rhoda","Ricardo","Richard","Richie","Richmond","Rick","Rickey","Rickie","Ricky","Rico","Rigoberto","Riley","Rita","River","Robb","Robbie","Robert","Roberta","Roberto","Robin","Robyn","Rocio","Rocky","Rod","Roderick","Rodger","Rodolfo","Rodrick","Rodrigo","Roel","Rogelio","Roger","Rogers","Rolando","Rollin","Roma","Romaine","Roman","Ron","Ronaldo","Ronny","Roosevelt","Rory","Rosa","Rosalee","Rosalia","Rosalind","Rosalinda","Rosalyn","Rosamond","Rosanna","Rosario","Roscoe","Rose","Rosella","Roselyn","Rosemarie","Rosemary","Rosendo","Rosetta","Rosie","Rosina","Roslyn","Ross","Rossie","Rowan","Rowena","Rowland","Roxane","Roxanne","Roy","Royal","Royce","Rozella","Ruben","Rubie","Ruby","Rubye","Rudolph","Rudy","Rupert","Russ","Russel","Russell","Rusty","Ruth","Ruthe","Ruthie","Ryan","Ryann","Ryder","Rylan","Rylee","Ryleigh","Ryley","Sabina","Sabrina","Sabryna","Sadie","Sadye","Sage","Saige","Sallie","Sally","Salma","Salvador","Salvatore","Sam","Samanta","Samantha","Samara","Samir","Sammie","Sammy","Samson","Sandra","Sandrine","Sandy","Sanford","Santa","Santiago","Santina","Santino","Santos","Sarah","Sarai","Sarina","Sasha","Saul","Savanah","Savanna","Savannah","Savion","Scarlett","Schuyler","Scot","Scottie","Scotty","Seamus","Sean","Sebastian","Sedrick","Selena","Selina","Selmer","Serena","Serenity","Seth","Shad","Shaina","Shakira","Shana","Shane","Shanel","Shanelle","Shania","Shanie","Shaniya","Shanna","Shannon","Shanny","Shanon","Shany","Sharon","Shaun","Shawn","Shawna","Shaylee","Shayna","Shayne","Shea","Sheila","Sheldon","Shemar","Sheridan","Sherman","Sherwood","Shirley","Shyann","Shyanne","Sibyl","Sid","Sidney","Sienna","Sierra","Sigmund","Sigrid","Sigurd","Silas","Sim","Simeon","Simone","Sincere","Sister","Skye","Skyla","Skylar","Sofia","Soledad","Solon","Sonia","Sonny","Sonya","Sophia","Sophie","Spencer","Stacey","Stacy","Stan","Stanford","Stanley","Stanton","Stefan","Stefanie","Stella","Stephan","Stephania","Stephanie","Stephany","Stephen","Stephon","Sterling","Steve","Stevie","Stewart","Stone","Stuart","Summer","Sunny","Susan","Susana","Susanna","Susie","Suzanne","Sven","Syble","Sydnee","Sydney","Sydni","Sydnie","Sylvan","Sylvester","Sylvia","Tabitha","Tad","Talia","Talon","Tamara","Tamia","Tania","Tanner","Tanya","Tara","Taryn","Tate","Tatum","Tatyana","Taurean","Tavares","Taya","Taylor","Teagan","Ted","Telly","Terence","Teresa","Terrance","Terrell","Terrence","Terrill","Terry","Tess","Tessie","Tevin","Thad","Thaddeus","Thalia","Thea","Thelma","Theo","Theodora","Theodore","Theresa","Therese","Theresia","Theron","Thomas","Thora","Thurman","Tia","Tiana","Tianna","Tiara","Tierra","Tiffany","Tillman","Timmothy","Timmy","Timothy","Tina","Tito","Titus","Tobin","Toby","Tod","Tom","Tomas","Tomasa","Tommie","Toney","Toni","Tony","Torey","Torrance","Torrey","Toy","Trace","Tracey","Tracy","Travis","Travon","Tre","Tremaine","Tremayne","Trent","Trenton","Tressa","Tressie","Treva","Trever","Trevion","Trevor","Trey","Trinity","Trisha","Tristian","Tristin","Triston","Troy","Trudie","Trycia","Trystan","Turner","Twila","Tyler","Tyra","Tyree","Tyreek","Tyrel","Tyrell","Tyrese","Tyrique","Tyshawn","Tyson","Ubaldo","Ulices","Ulises","Una","Unique","Urban","Uriah","Uriel","Ursula","Vada","Valentin","Valentina","Valentine","Valerie","Vallie","Van","Vance","Vanessa","Vaughn","Veda","Velda","Vella","Velma","Velva","Vena","Verda","Verdie","Vergie","Verla","Verlie","Vern","Verna","Verner","Vernice","Vernie","Vernon","Verona","Veronica","Vesta","Vicenta","Vicente","Vickie","Vicky","Victor","Victoria","Vida","Vidal","Vilma","Vince","Vincent","Vincenza","Vincenzo","Vinnie","Viola","Violet","Violette","Virgie","Virgil","Virginia","Virginie","Vita","Vito","Viva","Vivian","Viviane","Vivianne","Vivien","Vivienne","Vladimir","Wade","Waino","Waldo","Walker","Wallace","Walter","Walton","Wanda","Ward","Warren","Watson","Wava","Waylon","Wayne","Webster","Weldon","Wellington","Wendell","Wendy","Werner","Westley","Weston","Whitney","Wilber","Wilbert","Wilburn","Wiley","Wilford","Wilfred","Wilfredo","Wilfrid","Wilhelm","Wilhelmine","Will","Willa","Willard","William","Willie","Willis","Willow","Willy","Wilma","Wilmer","Wilson","Wilton","Winfield","Winifred","Winnifred","Winona","Winston","Woodrow","Wyatt","Wyman","Xander","Xavier","Xzavier","Yadira","Yasmeen","Yasmin","Yasmine","Yazmin","Yesenia","Yessenia","Yolanda","Yoshiko","Yvette","Yvonne","Zachariah","Zachary","Zachery","Zack","Zackary","Zackery","Zakary","Zander","Zane","Zaria","Zechariah","Zelda","Zella","Zelma","Zena","Zetta","Zion","Zita","Zoe","Zoey","Zoie","Zoila","Zola","Zora","Zula"],"last_name":["Abbott","Abernathy","Abshire","Adams","Altenwerth","Anderson","Ankunding","Armstrong","Auer","Aufderhar","Bahringer","Bailey","Balistreri","Barrows","Bartell","Bartoletti","Barton","Bashirian","Batz","Bauch","Baumbach","Bayer","Beahan","Beatty","Bechtelar","Becker","Bednar","Beer","Beier","Berge","Bergnaum","Bergstrom","Bernhard","Bernier","Bins","Blanda","Blick","Block","Bode","Boehm","Bogan","Bogisich","Borer","Bosco","Botsford","Boyer","Boyle","Bradtke","Brakus","Braun","Breitenberg","Brekke","Brown","Bruen","Buckridge","Carroll","Carter","Cartwright","Casper","Cassin","Champlin","Christiansen","Cole","Collier","Collins","Conn","Connelly","Conroy","Considine","Corkery","Cormier","Corwin","Cremin","Crist","Crona","Cronin","Crooks","Cruickshank","Cummerata","Cummings","Dach","D'Amore","Daniel","Dare","Daugherty","Davis","Deckow","Denesik","Dibbert","Dickens","Dicki","Dickinson","Dietrich","Donnelly","Dooley","Douglas","Doyle","DuBuque","Durgan","Ebert","Effertz","Eichmann","Emard","Emmerich","Erdman","Ernser","Fadel","Fahey","Farrell","Fay","Feeney","Feest","Feil","Ferry","Fisher","Flatley","Frami","Franecki","Friesen","Fritsch","Funk","Gaylord","Gerhold","Gerlach","Gibson","Gislason","Gleason","Gleichner","Glover","Goldner","Goodwin","Gorczany","Gottlieb","Goyette","Grady","Graham","Grant","Green","Greenfelder","Greenholt","Grimes","Gulgowski","Gusikowski","Gutkowski","Gutmann","Haag","Hackett","Hagenes","Hahn","Haley","Halvorson","Hamill","Hammes","Hand","Hane","Hansen","Harber","Harris","Hartmann","Harvey","Hauck","Hayes","Heaney","Heathcote","Hegmann","Heidenreich","Heller","Herman","Hermann","Hermiston","Herzog","Hessel","Hettinger","Hickle","Hilll","Hills","Hilpert","Hintz","Hirthe","Hodkiewicz","Hoeger","Homenick","Hoppe","Howe","Howell","Hudson","Huel","Huels","Hyatt","Jacobi","Jacobs","Jacobson","Jakubowski","Jaskolski","Jast","Jenkins","Jerde","Johns","Johnson","Johnston","Jones","Kassulke","Kautzer","Keebler","Keeling","Kemmer","Kerluke","Kertzmann","Kessler","Kiehn","Kihn","Kilback","King","Kirlin","Klein","Kling","Klocko","Koch","Koelpin","Koepp","Kohler","Konopelski","Koss","Kovacek","Kozey","Krajcik","Kreiger","Kris","Kshlerin","Kub","Kuhic","Kuhlman","Kuhn","Kulas","Kunde","Kunze","Kuphal","Kutch","Kuvalis","Labadie","Lakin","Lang","Langosh","Langworth","Larkin","Larson","Leannon","Lebsack","Ledner","Leffler","Legros","Lehner","Lemke","Lesch","Leuschke","Lind","Lindgren","Littel","Little","Lockman","Lowe","Lubowitz","Lueilwitz","Luettgen","Lynch","Macejkovic","MacGyver","Maggio","Mann","Mante","Marks","Marquardt","Marvin","Mayer","Mayert","McClure","McCullough","McDermott","McGlynn","McKenzie","McLaughlin","Medhurst","Mertz","Metz","Miller","Mills","Mitchell","Moen","Mohr","Monahan","Moore","Morar","Morissette","Mosciski","Mraz","Mueller","Muller","Murazik","Murphy","Murray","Nader","Nicolas","Nienow","Nikolaus","Nitzsche","Nolan","Oberbrunner","O'Connell","O'Conner","O'Hara","O'Keefe","O'Kon","Okuneva","Olson","Ondricka","O'Reilly","Orn","Ortiz","Osinski","Pacocha","Padberg","Pagac","Parisian","Parker","Paucek","Pfannerstill","Pfeffer","Pollich","Pouros","Powlowski","Predovic","Price","Prohaska","Prosacco","Purdy","Quigley","Quitzon","Rath","Ratke","Rau","Raynor","Reichel","Reichert","Reilly","Reinger","Rempel","Renner","Reynolds","Rice","Rippin","Ritchie","Robel","Roberts","Rodriguez","Rogahn","Rohan","Rolfson","Romaguera","Roob","Rosenbaum","Rowe","Ruecker","Runolfsdottir","Runolfsson","Runte","Russel","Rutherford","Ryan","Sanford","Satterfield","Sauer","Sawayn","Schaden","Schaefer","Schamberger","Schiller","Schimmel","Schinner","Schmeler","Schmidt","Schmitt","Schneider","Schoen","Schowalter","Schroeder","Schulist","Schultz","Schumm","Schuppe","Schuster","Senger","Shanahan","Shields","Simonis","Sipes","Skiles","Smith","Smitham","Spencer","Spinka","Sporer","Stamm","Stanton","Stark","Stehr","Steuber","Stiedemann","Stokes","Stoltenberg","Stracke","Streich","Stroman","Strosin","Swaniawski","Swift","Terry","Thiel","Thompson","Tillman","Torp","Torphy","Towne","Toy","Trantow","Tremblay","Treutel","Tromp","Turcotte","Turner","Ullrich","Upton","Vandervort","Veum","Volkman","Von","VonRueden","Waelchi","Walker","Walsh","Walter","Ward","Waters","Watsica","Weber","Wehner","Weimann","Weissnat","Welch","West","White","Wiegand","Wilderman","Wilkinson","Will","Williamson","Willms","Windler","Wintheiser","Wisoky","Wisozk","Witting","Wiza","Wolf","Wolff","Wuckert","Wunsch","Wyman","Yost","Yundt","Zboncak","Zemlak","Ziemann","Zieme","Zulauf"],"name":["#{prefix} #{first_name} #{last_name}","#{first_name} #{last_name} #{suffix}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}"],"prefix":["Mr.","Mrs.","Ms.","Miss","Dr."],"suffix":["Jr.","Sr.","I","II","III","IV","V","MD","DDS","PhD","DVM"],"title":{"descriptor":["Lead","Senior","Direct","Corporate","Dynamic","Future","Product","National","Regional","District","Central","Global","Customer","Investor","Dynamic","International","Legacy","Forward","Internal","Human","Chief","Principal"],"job":["Supervisor","Associate","Executive","Liason","Officer","Manager","Engineer","Specialist","Director","Coordinator","Administrator","Architect","Analyst","Designer","Planner","Orchestrator","Technician","Developer","Producer","Consultant","Assistant","Facilitator","Agent","Representative","Strategist"],"level":["Solutions","Program","Brand","Security","Research","Marketing","Directives","Implementation","Integration","Functionality","Response","Paradigm","Tactics","Identity","Markets","Group","Division","Applications","Optimization","Operations","Infrastructure","Intranet","Communications","Web","Branding","Quality","Assurance","Mobility","Accounts","Data","Creative","Configuration","Accountability","Interactions","Factors","Usability","Metrics"]}},"phone_number":{"formats":["###-###-####","(###) ###-####","1-###-###-####","###.###.####","###-###-####","(###) ###-####","1-###-###-####","###.###.####","###-###-#### x###","(###) ###-#### x###","1-###-###-#### x###","###.###.#### x###","###-###-#### x####","(###) ###-#### x####","1-###-###-#### x####","###.###.#### x####","###-###-#### x#####","(###) ###-#### x#####","1-###-###-#### x#####","###.###.#### x#####"]},"separator":" \u0026 ","team":{"creature":["ants","bats","bears","bees","birds","buffalo","cats","chickens","cattle","dogs","dolphins","ducks","elephants","fishes","foxes","frogs","geese","goats","horses","kangaroos","lions","monkeys","owls","oxen","penguins","people","pigs","rabbits","sheep","tigers","whales","wolves","zebras","banshees","crows","black cats","chimeras","ghosts","conspirators","dragons","dwarves","elves","enchanters","exorcists","sons","foes","giants","gnomes","goblins","gooses","griffins","lycanthropes","nemesis","ogres","oracles","prophets","sorcerors","spiders","spirits","vampires","warlocks","vixens","werewolves","witches","worshipers","zombies","druids"],"name":["#{Address.state} #{creature}"]}},"flash":{"actions":{"create":{"notice":"%{resource_name} was successfully created."},"destroy":{"alert":"%{resource_name} could not be destroyed.","notice":"%{resource_name} was successfully destroyed."},"update":{"notice":"%{resource_name} was successfully updated."}}},"frontend":{"application":{"about_us":{"menu":"About us"},"auth_form":{"header":"We're currently accepting people with high social influience. Please, verify your identity to quality using all most popular social networks."},"buy_now":"Buy Now","cancel":"Cancel","close":"Close","copyright":{"html":"\u0026copy;\u0026nbsp;%{year}\u0026nbsp;%{link}"},"create":{"button":"Add %{model}"},"destroy":{"button":"Destroy","confirm":"Are you sure that you want to delete %{model}? It can't be restored!"},"edit":{"button":{"html":"\u003ci class='fa fa-pencil'\u003e\u003c/i\u003e \u003cspan\u003eEdit\u003c/span\u003e"},"header":"Edit %{display_name}"},"fetching_image":"Fetching image...","incorrect_url_msg":"Incorrect URL (http://example.com).","index":{"button":"Back","header":"%{Models}"},"invalid_domain_msg":"The URL is not in the list of allowed domains","latest":{"header":"Last updated %{models}"},"menu":"%{Models}","minimal_size_msg":"Image must be at least %{size}px in height and width.","modal_error":"Sorry but there was an error: %{error}","new":{"button":{"html":"\u003ci class='fa fa-plus'\u003e\u003c/i\u003e \u003cspan\u003eAdd new one\u003c/span\u003e"},"header":"%{display_name}"},"next":"Next","no_img_msg":"Sorry, URL does not contain any suitable image.","no_items":"No %{models}","ok":"OK","operations":{"menu":"Balance history"},"passwords":{"button":"Change password","html":"Password"},"please_wait":"Please wait...","privacy":{"menu":"Privacy"},"processing_image":"Processing image...","profile":{"menu":"My profile"},"request_invitation":"Request invitation","saved":"Saved","search":{"button":{"html":"Go"},"html":"Search..."},"searching_similar_products":"Searching similar products...","share":"Share","show":{"header":"%{Model} #%{id}","html":"Go"},"sign_in":{"button":"Sign in","header":"Sign in"},"sign_out":{"button":"Sign out","html":"Sign out"},"sign_up":{"button":"Sign up","header":"Sign up"},"sorry_error_colon":"Sorry but there was an error","stats":{"button":"Statistics","header":"Statistics of %{display_name}"},"terms":{"menu":"Terms"},"total":{"few":"(total: %{count} %{models})","one":"(total: %{count} %{model})","other":"(total: %{count} %{models})"},"total_lookbooks":{"html":{"few":"\u003cspan\u003e%{count}\u003c/span\u003e lookbooks","one":"\u003cspan\u003e%{count}\u003c/span\u003e lookbook","other":"\u003cspan\u003e%{count}\u003c/span\u003e lookbooks"}},"unlink_provider":"Unlink","update":{"button":"Save Changes"}}},"helpers":{"select":{"prompt":"Please select"},"submit":{"create":"Create","submit":"Save %{model}","update":"Update"}},"number":{"currency":{"format":{"delimiter":",","format":"%u%n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"$"}},"format":{"delimiter":",","precision":3,"separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Billion","million":"Million","quadrillion":"Quadrillion","thousand":"Thousand","trillion":"Trillion","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"owner":{"application":{"create":{"button":"Add %{model}"},"deals":{"menu":"Deals"},"destroy":{"button":"Destroy","confirm":"Are you sure that you want to delete %{model}? It can't be restored!"},"domain_wishes":{"menu":"Domain Wishes"},"edit":{"button":{"html":"\u003ci class='fa fa-pencil'\u003e\u003c/i\u003e \u003cspan\u003eEdit\u003c/span\u003e"},"header":"Edit %{display_name}"},"index":{"button":"Back","header":"%{Models}"},"lookbooks":{"menu":"Lookbooks"},"merchants":{"menu":"Merchants"},"new":{"button":{"html":"\u003ci class='fa fa-plus'\u003e\u003c/i\u003e \u003cspan\u003eAdd new one\u003c/span\u003e"},"header":"%{display_name}"},"operations":{"menu":"Operations"},"show":{"header":"%{Model} #%{id}","html":"Go"},"unassigned_commissions":{"menu":"Unassigned Commission"},"update":{"button":"Save Changes"},"users":{"menu":"Users"}},"merchants":{"add_domain":"+ Add domain","preview_refresh":{"description":"Following merchants are available, but not in the system yet. The lower table contains discontinued merchants that should be deleted from our system.","discontinued_merchants":"Discontinued merchants","header":"Actual merchants","new_merchants":"New merchants","no_items":"Currently all your merchants are up to date."},"refresh_list":"Refresh merchants...","refresh_list_confirm":"Add %{count} merchants and remove %{discontinued_count}","remove":"remove"},"users":{"activate":"Activate","active_users":"Active users","disactivate":"Disactivate","requested_invite":"Invite requests"}},"simple_form":{"error_notification":{"default_message":"Please review the problems below:"},"no":"No","required":{"mark":"*","text":"required"},"yes":"Yes"},"social_share_button":{"baidu":"Baidu.com","delicious":"Delicious","douban":"Douban","email":"Email","facebook":"Facebook","google_bookmark":"Google Bookmark","google_plus":"Google+","kaixin001":"Kaixin001.com","pinterest":"Pinterest","plurk":"Plurk","qq":"Qzone","renren":"Renren.com","share_to":"Share to %{name}","tqq":"Tqq","tumblr":"Tumblr","twitter":"Twitter","weibo":"Sina Weibo"},"support":{"array":{"last_word_connector":", and ","two_words_connector":" and ","words_connector":", "}},"time":{"am":"am","formats":{"default":"%a, %d %b %Y %H:%M:%S %z","long":"%B %d, %Y %H:%M","short":"%d %b %H:%M"},"pm":"pm"},"time_ago_in_words":{"ago":"%{sencence} ago","since":"%{sencence} since"}},"en-AU":{"faker":{"address":{"building_number":["####","###","##"],"default_country":["Australia"],"postcode":["0###","2###","3###","4###","5###","6###","7###"],"state":["New South Wales","Queensland","Northern Territory","South Australia","Western Australia","Tasmania","Australian Capital Territory","Victoria"],"state_abbr":["NSW","QLD","NT","SA","WA","TAS","ACT","VIC"],"street_suffix":["Avenue","Boulevard","Circle","Circuit","Court","Crescent","Crest","Drive","Estate Dr","Grove","Hill","Island","Junction","Knoll","Lane","Loop","Mall","Manor","Meadow","Mews","Parade","Parkway","Pass","Place","Plaza","Ridge","Road","Run","Square","Station St","Street","Summit","Terrace","Track","Trail","View Rd","Way"]},"company":{"suffix":["Pty Ltd","and Sons","Corp","Group","Brothers","Partners"]},"internet":{"domain_suffix":["com.au","com","net.au","net","org.au","org"]},"name":{"first_name":["William","Jack","Oliver","Joshua","Thomas","Lachlan","Cooper","Noah","Ethan","Lucas","James","Samuel","Jacob","Liam","Alexander","Benjamin","Max","Isaac","Daniel","Riley","Ryan","Charlie","Tyler","Jake","Matthew","Xavier","Harry","Jayden","Nicholas","Harrison","Levi","Luke","Adam","Henry","Aiden","Dylan","Oscar","Michael","Jackson","Logan","Joseph","Blake","Nathan","Connor","Elijah","Nate","Archie","Bailey","Marcus","Cameron","Jordan","Zachary","Caleb","Hunter","Ashton","Toby","Aidan","Hayden","Mason","Hamish","Edward","Angus","Eli","Sebastian","Christian","Patrick","Andrew","Anthony","Luca","Kai","Beau","Alex","George","Callum","Finn","Zac","Mitchell","Jett","Jesse","Gabriel","Leo","Declan","Charles","Jasper","Jonathan","Aaron","Hugo","David","Christopher","Chase","Owen","Justin","Ali","Darcy","Lincoln","Cody","Phoenix","Sam","John","Joel","Isabella","Ruby","Chloe","Olivia","Charlotte","Mia","Lily","Emily","Ella","Sienna","Sophie","Amelia","Grace","Ava","Zoe","Emma","Sophia","Matilda","Hannah","Jessica","Lucy","Georgia","Sarah","Abigail","Zara","Eva","Scarlett","Jasmine","Chelsea","Lilly","Ivy","Isla","Evie","Isabelle","Maddison","Layla","Summer","Annabelle","Alexis","Elizabeth","Bella","Holly","Lara","Madison","Alyssa","Maya","Tahlia","Claire","Hayley","Imogen","Jade","Ellie","Sofia","Addison","Molly","Phoebe","Alice","Savannah","Gabriella","Kayla","Mikayla","Abbey","Eliza","Willow","Alexandra","Poppy","Samantha","Stella","Amy","Amelie","Anna","Piper","Gemma","Isabel","Victoria","Stephanie","Caitlin","Heidi","Paige","Rose","Amber","Audrey","Claudia","Taylor","Madeline","Angelina","Natalie","Charli","Lauren","Ashley","Violet","Mackenzie","Abby","Skye","Lillian","Alana","Lola","Leah","Eve","Kiara"],"last_name":["Smith","Jones","Williams","Brown","Wilson","Taylor","Johnson","White","Martin","Anderson","Thompson","Nguyen","Thomas","Walker","Harris","Lee","Ryan","Robinson","Kelly","King","Davis","Wright","Evans","Roberts","Green","Hall","Wood","Jackson","Clarke","Patel","Khan","Lewis","James","Phillips","Mason","Mitchell","Rose","Davies","Rodriguez","Cox","Alexander","Garden","Campbell","Johnston","Moore","Smyth","O'neill","Doherty","Stewart","Quinn","Murphy","Graham","Mclaughlin","Hamilton","Murray","Hughes","Robertson","Thomson","Scott","Macdonald","Reid","Clark","Ross","Young","Watson","Paterson","Morrison","Morgan","Griffiths","Edwards","Rees","Jenkins","Owen","Price","Moss","Richards","Abbott","Adams","Armstrong","Bahringer","Bailey","Barrows","Bartell","Bartoletti","Barton","Bauch","Baumbach","Bayer","Beahan","Beatty","Becker","Beier","Berge","Bergstrom","Bode","Bogan","Borer","Bosco","Botsford","Boyer","Boyle","Braun","Bruen","Carroll","Carter","Cartwright","Casper","Cassin","Champlin","Christiansen","Cole","Collier","Collins","Connelly","Conroy","Corkery","Cormier","Corwin","Cronin","Crooks","Cruickshank","Cummings","D'amore","Daniel","Dare","Daugherty","Dickens","Dickinson","Dietrich","Donnelly","Dooley","Douglas","Doyle","Durgan","Ebert","Emard","Emmerich","Erdman","Ernser","Fadel","Fahey","Farrell","Fay","Feeney","Feil","Ferry","Fisher","Flatley","Gibson","Gleason","Glover","Goldner","Goodwin","Grady","Grant","Greenfelder","Greenholt","Grimes","Gutmann","Hackett","Hahn","Haley","Hammes","Hand","Hane","Hansen","Harber","Hartmann","Harvey","Hayes","Heaney","Heathcote","Heller","Hermann","Hermiston","Hessel","Hettinger","Hickle","Hill","Hills","Hoppe","Howe","Howell","Hudson","Huel","Hyatt","Jacobi","Jacobs","Jacobson","Jerde","Johns","Keeling","Kemmer","Kessler","Kiehn","Kirlin","Klein","Koch","Koelpin","Kohler","Koss","Kovacek","Kreiger","Kris","Kuhlman","Kuhn","Kulas","Kunde","Kutch","Lakin","Lang","Langworth","Larkin","Larson","Leannon","Leffler","Little","Lockman","Lowe","Lynch","Mann","Marks","Marvin","Mayer","Mccullough","Mcdermott","Mckenzie","Miller","Mills","Monahan","Morissette","Mueller","Muller","Nader","Nicolas","Nolan","O'connell","O'conner","O'hara","O'keefe","Olson","O'reilly","Parisian","Parker","Quigley","Reilly","Reynolds","Rice","Ritchie","Rohan","Rolfson","Rowe","Russel","Rutherford","Sanford","Sauer","Schmidt","Schmitt","Schneider","Schroeder","Schultz","Shields","Smitham","Spencer","Stanton","Stark","Stokes","Swift","Tillman","Towne","Tremblay","Tromp","Turcotte","Turner","Walsh","Walter","Ward","Waters","Weber","Welch","West","Wilderman","Wilkinson","Williamson","Windler","Wolf"]},"phone_number":{"formats":["0# #### ####","+61 # #### ####","04## ### ###","+61 4## ### ###"]}}},"en-BORK":{"faker":{"lorem":{"words":["Boot","I","Nu","Nur","Tu","Um","a","becoose-a","boot","bork","burn","chuuses","cumplete-a","cun","cunseqooences","curcoomstunces","dee","deeslikes","denuoonceeng","desures","du","eccuoont","ectooel","edfuntege-a","efueeds","egeeen","ell","ere-a","feend","foolt","frum","geefe-a","gesh","greet","heem","heppeeness","hes","hoo","hoomun","idea","ifer","in","incuoonter","injuy","itselff","ixcept","ixemple-a","ixerceese-a","ixpleeen","ixplurer","ixpuoond","ixtremely","knoo","lebureeuoos","lufes","meestekee","mester-booeelder","moost","mun","nu","nut","oobteeen","oocceseeunelly","ooccoor","ooff","oone-a","oor","peeen","peeenffool","physeecel","pleesoore-a","poorsooe-a","poorsooes","preeesing","prucoore-a","prudooces","reeght","reshunelly","resooltunt","sume-a","teecheengs","teke-a","thees","thet","thuse-a","treefiel","troot","tu","tueel","und","undertekes","unnuyeeng","uny","unyune-a","us","veell","veet","ves","vheech","vhu","yuoo","zee","zeere-a"]}}},"en-CA":{"faker":{"address":{"default_country":["Canada"],"postcode":["?#? #?#","?#?#?#"],"state":["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Nova Scotia","Northwest Territories","Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon"],"state_abbr":["AB","BC","MB","NB","NL","NS","NU","NT","ON","PE","QC","SK","YK"]},"internet":{"domain_suffix":["ca","com","biz","info","name","net","org"],"free_email":["gmail.com","yahoo.ca","hotmail.com"]},"phone_number":{"formats":["###-###-####","(###)###-####","###.###.####","1-###-###-####","###-###-#### x###","(###)###-#### x###","1-###-###-#### x###","###.###.#### x###","###-###-#### x####","(###)###-#### x####","1-###-###-#### x####","###.###.#### x####","###-###-#### x#####","(###)###-#### x#####","1-###-###-#### x#####","###.###.#### x#####"]}}},"en-GB":{"faker":{"address":{"county":["Avon","Bedfordshire","Berkshire","Borders","Buckinghamshire","Cambridgeshire","Central","Cheshire","Cleveland","Clwyd","Cornwall","County Antrim","County Armagh","County Down","County Fermanagh","County Londonderry","County Tyrone","Cumbria","Derbyshire","Devon","Dorset","Dumfries and Galloway","Durham","Dyfed","East Sussex","Essex","Fife","Gloucestershire","Grampian","Greater Manchester","Gwent","Gwynedd County","Hampshire","Herefordshire","Hertfordshire","Highlands and Islands","Humberside","Isle of Wight","Kent","Lancashire","Leicestershire","Lincolnshire","Lothian","Merseyside","Mid Glamorgan","Norfolk","North Yorkshire","Northamptonshire","Northumberland","Nottinghamshire","Oxfordshire","Powys","Rutland","Shropshire","Somerset","South Glamorgan","South Yorkshire","Staffordshire","Strathclyde","Suffolk","Surrey","Tayside","Tyne and Wear","Warwickshire","West Glamorgan","West Midlands","West Sussex","West Yorkshire","Wiltshire","Worcestershire"],"default_country":["England","Scotland","Wales","Northern Ireland"],"postcode":"/[A-PR-UWYZ][A-HK-Y]?[0-9][ABEHMNPRVWXY0-9]? [0-9][ABD-HJLN-UW-Z]{2}/","uk_country":["England","Scotland","Wales","Northern Ireland"]},"cell_phone":{"formats":["074## ######","075## ######","076## ######","077## ######","078## ######","079## ######"]},"internet":{"domain_suffix":["co.uk","com","biz","info","name"]},"phone_number":{"formats":["01#### #####","01### ######","01#1 ### ####","011# ### ####","02# #### ####","03## ### ####","055 #### ####","056 #### ####","0800 ### ####","08## ### ####","09## ### ####","016977 ####","01### #####","0500 ######","0800 ######"]}}},"en-IND":{"faker":{"address":{"default_country":["India","Indian Republic","Bharat","Hindustan"],"postcode":["?#? #?#"],"state":["Andra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttaranchal","Uttar Pradesh","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadar and Nagar Haveli","Daman and Diu","Delhi","Lakshadweep","Pondicherry"],"state_abbr":["AP","AR","AS","BR","CG","DL","GA","GJ","HR","HP","JK","JS","KA","KL","MP","MH","MN","ML","MZ","NL","OR","PB","RJ","SK","TN","TR","UK","UP","WB","AN","CH","DN","DD","LD","PY"]},"company":{"suffix":["Pvt Ltd","Limited","Ltd","and Sons","Corp","Group","Brothers"]},"internet":{"domain_suffix":["in","com","biz","info","name","net","org","co.in"],"free_email":["gmail.com","yahoo.co.in","hotmail.com"]},"name":{"first_name":["Aadrika","Aanandinii","Aaratrika","Aarya","Arya","Aashritha","Aatmaja","Atmaja","Abhaya","Adwitiya","Agrata","Ahilya","Ahalya","Aishani","Akshainie","Akshata","Akshita","Akula","Ambar","Amodini","Amrita","Amritambu","Anala","Anamika","Ananda","Anandamayi","Ananta","Anila","Anjali","Anjushri","Anjushree","Annapurna","Anshula","Anuja","Anusuya","Anasuya","Anasooya","Anwesha","Apsara","Aruna","Asha","Aasa","Aasha","Aslesha","Atreyi","Atreyee","Avani","Abani","Avantika","Ayushmati","Baidehi","Vaidehi","Bala","Baala","Balamani","Basanti","Vasanti","Bela","Bhadra","Bhagirathi","Bhagwanti","Bhagwati","Bhamini","Bhanumati","Bhaanumati","Bhargavi","Bhavani","Bhilangana","Bilwa","Bilva","Buddhana","Chakrika","Chanda","Chandi","Chandni","Chandini","Chandani","Chandra","Chandira","Chandrabhaga","Chandrakala","Chandrakin","Chandramani","Chandrani","Chandraprabha","Chandraswaroopa","Chandravati","Chapala","Charumati","Charvi","Chatura","Chitrali","Chitramala","Chitrangada","Daksha","Dakshayani","Damayanti","Darshwana","Deepali","Dipali","Deeptimoyee","Deeptimayee","Devangana","Devani","Devasree","Devi","Daevi","Devika","Daevika","Dhaanyalakshmi","Dhanalakshmi","Dhana","Dhanadeepa","Dhara","Dharani","Dharitri","Dhatri","Diksha","Deeksha","Divya","Draupadi","Dulari","Durga","Durgeshwari","Ekaparnika","Elakshi","Enakshi","Esha","Eshana","Eshita","Gautami","Gayatri","Geeta","Geetanjali","Gitanjali","Gemine","Gemini","Girja","Girija","Gita","Hamsini","Harinakshi","Harita","Heema","Himadri","Himani","Hiranya","Indira","Jaimini","Jaya","Jyoti","Jyotsana","Kali","Kalinda","Kalpana","Kalyani","Kama","Kamala","Kamla","Kanchan","Kanishka","Kanti","Kashyapi","Kumari","Kumuda","Lakshmi","Laxmi","Lalita","Lavanya","Leela","Lila","Leela","Madhuri","Malti","Malati","Mandakini","Mandaakin","Mangala","Mangalya","Mani","Manisha","Manjusha","Meena","Mina","Meenakshi","Minakshi","Menka","Menaka","Mohana","Mohini","Nalini","Nikita","Ojaswini","Omana","Oormila","Urmila","Opalina","Opaline","Padma","Parvati","Poornima","Purnima","Pramila","Prasanna","Preity","Prema","Priya","Priyala","Pushti","Radha","Rageswari","Rageshwari","Rajinder","Ramaa","Rati","Rita","Rohana","Rukhmani","Rukmin","Rupinder","Sanya","Sarada","Sharda","Sarala","Sarla","Saraswati","Sarisha","Saroja","Shakti","Shakuntala","Shanti","Sharmila","Shashi","Shashikala","Sheela","Shivakari","Shobhana","Shresth","Shresthi","Shreya","Shreyashi","Shridevi","Shrishti","Shubha","Shubhaprada","Siddhi","Sitara","Sloka","Smita","Smriti","Soma","Subhashini","Subhasini","Sucheta","Sudeva","Sujata","Sukanya","Suma","Suma","Sumitra","Sunita","Suryakantam","Sushma","Swara","Swarnalata","Sweta","Shwet","Tanirika","Tanushree","Tanushri","Tanushri","Tanya","Tara","Trisha","Uma","Usha","Vaijayanti","Vaijayanthi","Baijayanti","Vaishvi","Vaishnavi","Vaishno","Varalakshmi","Vasudha","Vasundhara","Veda","Vedanshi","Vidya","Vimala","Vrinda","Vrund","Aadi","Aadidev","Aadinath","Aaditya","Aagam","Aagney","Aamod","Aanandaswarup","Anand Swarup","Aanjaneya","Anjaneya","Aaryan","Aryan","Aatmaj","Aatreya","Aayushmaan","Aayushman","Abhaidev","Abhaya","Abhirath","Abhisyanta","Acaryatanaya","Achalesvara","Acharyanandana","Acharyasuta","Achintya","Achyut","Adheesh","Adhiraj","Adhrit","Adikavi","Adinath","Aditeya","Aditya","Adityanandan","Adityanandana","Adripathi","Advaya","Agasti","Agastya","Agneya","Aagneya","Agnimitra","Agniprava","Agnivesh","Agrata","Ajit","Ajeet","Akroor","Akshaj","Akshat","Akshayakeerti","Alok","Aalok","Amaranaath","Amarnath","Amaresh","Ambar","Ameyatma","Amish","Amogh","Amrit","Anaadi","Anagh","Anal","Anand","Aanand","Anang","Anil","Anilaabh","Anilabh","Anish","Ankal","Anunay","Anurag","Anuraag","Archan","Arindam","Arjun","Arnesh","Arun","Ashlesh","Ashok","Atmanand","Atmananda","Avadhesh","Baalaaditya","Baladitya","Baalagopaal","Balgopal","Balagopal","Bahula","Bakula","Bala","Balaaditya","Balachandra","Balagovind","Bandhu","Bandhul","Bankim","Bankimchandra","Bhadrak","Bhadraksh","Bhadran","Bhagavaan","Bhagvan","Bharadwaj","Bhardwaj","Bharat","Bhargava","Bhasvan","Bhaasvan","Bhaswar","Bhaaswar","Bhaumik","Bhaves","Bheeshma","Bhisham","Bhishma","Bhima","Bhoj","Bhramar","Bhudev","Bhudeva","Bhupati","Bhoopati","Bhoopat","Bhupen","Bhushan","Bhooshan","Bhushit","Bhooshit","Bhuvanesh","Bhuvaneshwar","Bilva","Bodhan","Brahma","Brahmabrata","Brahmanandam","Brahmaanand","Brahmdev","Brajendra","Brajesh","Brijesh","Birjesh","Budhil","Chakor","Chakradhar","Chakravartee","Chakravarti","Chanakya","Chaanakya","Chandak","Chandan","Chandra","Chandraayan","Chandrabhan","Chandradev","Chandraketu","Chandramauli","Chandramohan","Chandran","Chandranath","Chapal","Charak","Charuchandra","Chaaruchandra","Charuvrat","Chatur","Chaturaanan","Chaturbhuj","Chetan","Chaten","Chaitan","Chetanaanand","Chidaakaash","Chidaatma","Chidambar","Chidambaram","Chidananda","Chinmayanand","Chinmayananda","Chiranjeev","Chiranjeeve","Chitraksh","Daiwik","Daksha","Damodara","Dandak","Dandapaani","Darshan","Datta","Dayaamay","Dayamayee","Dayaananda","Dayaanidhi","Kin","Deenabandhu","Deepan","Deepankar","Dipankar","Deependra","Dipendra","Deepesh","Dipesh","Deeptanshu","Deeptendu","Diptendu","Deeptiman","Deeptimoy","Deeptimay","Dev","Deb","Devadatt","Devagya","Devajyoti","Devak","Devdan","Deven","Devesh","Deveshwar","Devi","Devvrat","Dhananjay","Dhanapati","Dhanpati","Dhanesh","Dhanu","Dhanvin","Dharmaketu","Dhruv","Dhyanesh","Dhyaneshwar","Digambar","Digambara","Dinakar","Dinkar","Dinesh","Divaakar","Divakar","Deevakar","Divjot","Dron","Drona","Dwaipayan","Dwaipayana","Eekalabya","Ekalavya","Ekaksh","Ekaaksh","Ekaling","Ekdant","Ekadant","Gajaadhar","Gajadhar","Gajbaahu","Gajabahu","Ganak","Ganaka","Ganapati","Gandharv","Gandharva","Ganesh","Gangesh","Garud","Garuda","Gati","Gatik","Gaurang","Gauraang","Gauranga","Gouranga","Gautam","Gautama","Goutam","Ghanaanand","Ghanshyam","Ghanashyam","Giri","Girik","Girika","Girindra","Giriraaj","Giriraj","Girish","Gopal","Gopaal","Gopi","Gopee","Gorakhnath","Gorakhanatha","Goswamee","Goswami","Gotum","Gautam","Govinda","Gobinda","Gudakesha","Gudakesa","Gurdev","Guru","Hari","Harinarayan","Harit","Himadri","Hiranmay","Hiranmaya","Hiranya","Inder","Indra","Indra","Jagadish","Jagadisha","Jagathi","Jagdeep","Jagdish","Jagmeet","Jahnu","Jai","Javas","Jay","Jitendra","Jitender","Jyotis","Kailash","Kama","Kamalesh","Kamlesh","Kanak","Kanaka","Kannan","Kannen","Karan","Karthik","Kartik","Karunanidhi","Kashyap","Kiran","Kirti","Keerti","Krishna","Krishnadas","Krishnadasa","Kumar","Lai","Lakshman","Laxman","Lakshmidhar","Lakshminath","Lal","Laal","Mahendra","Mohinder","Mahesh","Maheswar","Mani","Manik","Manikya","Manoj","Marut","Mayoor","Meghnad","Meghnath","Mohan","Mukesh","Mukul","Nagabhushanam","Nanda","Narayan","Narendra","Narinder","Naveen","Navin","Nawal","Naval","Nimit","Niranjan","Nirbhay","Niro","Param","Paramartha","Pran","Pranay","Prasad","Prathamesh","Prayag","Prem","Puneet","Purushottam","Rahul","Raj","Rajan","Rajendra","Rajinder","Rajiv","Rakesh","Ramesh","Rameshwar","Ranjit","Ranjeet","Ravi","Ritesh","Rohan","Rohit","Rudra","Sachin","Sameer","Samir","Sanjay","Sanka","Sarvin","Satish","Satyen","Shankar","Shantanu","Shashi","Sher","Shiv","Siddarth","Siddhran","Som","Somu","Somnath","Subhash","Subodh","Suman","Suresh","Surya","Suryakant","Suryakanta","Sushil","Susheel","Swami","Swapnil","Tapan","Tara","Tarun","Tej","Tejas","Trilochan","Trilochana","Trilok","Trilokesh","Triloki","Triloki Nath","Trilokanath","Tushar","Udai","Udit","Ujjawal","Ujjwal","Umang","Upendra","Uttam","Vasudev","Vasudeva","Vedang","Vedanga","Vidhya","Vidur","Vidhur","Vijay","Vimal","Vinay","Vishnu","Bishnu","Vishwamitra","Vyas","Yogendra","Yoginder","Yogesh"],"last_name":["Abbott","Achari","Acharya","Adiga","Agarwal","Ahluwalia","Ahuja","Arora","Asan","Bandopadhyay","Banerjee","Bharadwaj","Bhat","Butt","Bhattacharya","Bhattathiri","Chaturvedi","Chattopadhyay","Chopra","Desai","Deshpande","Devar","Dhawan","Dubashi","Dutta","Dwivedi","Embranthiri","Ganaka","Gandhi","Gill","Gowda","Guha","Guneta","Gupta","Iyer","Iyengar","Jain","Jha","Johar","Joshi","Kakkar","Kaniyar","Kapoor","Kaul","Kaur","Khan","Khanna","Khatri","Kocchar","Mahajan","Malik","Marar","Menon","Mehra","Mehrotra","Mishra","Mukhopadhyay","Nayar","Naik","Nair","Nambeesan","Namboothiri","Nehru","Pandey","Panicker","Patel","Patil","Pilla","Pillai","Pothuvaal","Prajapat","Rana","Reddy","Saini","Sethi","Shah","Sharma","Shukla","Singh","Sinha","Somayaji","Tagore","Talwar","Tandon","Trivedi","Varrier","Varma","Varman","Verma"]},"phone_number":{"formats":["+91###-###-####","+91##########","+91-###-#######"]}}},"en-US":{"faker":{"address":{"default_country":["United States","United States of America","USA"],"postcode_by_state":{"AK":"995##","AL":"350##","AR":"717##","AS":"967##","AZ":"850##","CA":"900##","CO":"800##","CT":"061##","DC":"204##","DE":"198##","FL":"322##","GA":"301##","HI":"967##","IA":"510##","ID":"832##","IL":"600##","IN":"463##","KS":"666##","KY":"404##","LA":"701##","MA":"026##","MD":"210##","ME":"042##","MI":"480##","MN":"555##","MO":"650##","MS":"387##","MT":"590##","NC":"288##","ND":"586##","NE":"688##","NH":"036##","NJ":"076##","NM":"880##","NV":"898##","NY":"122##","OH":"444##","OK":"730##","OR":"979##","PA":"186##","RI":"029##","SC":"299##","SD":"577##","TN":"383##","TX":"798##","UT":"847##","VA":"222##","VT":"050##","WA":"990##","WI":"549##","WV":"247##","WY":"831##"}},"internet":{"domain_suffix":["com","us","biz","info","name","net","org"]},"phone_number":{"area_code":["201","202","203","205","206","207","208","209","210","212","213","214","215","216","217","218","219","224","225","227","228","229","231","234","239","240","248","251","252","253","254","256","260","262","267","269","270","276","281","283","301","302","303","304","305","307","308","309","310","312","313","314","315","316","317","318","319","320","321","323","330","331","334","336","337","339","347","351","352","360","361","386","401","402","404","405","406","407","408","409","410","412","413","414","415","417","419","423","424","425","434","435","440","443","445","464","469","470","475","478","479","480","484","501","502","503","504","505","507","508","509","510","512","513","515","516","517","518","520","530","540","541","551","557","559","561","562","563","564","567","570","571","573","574","580","585","586","601","602","603","605","606","607","608","609","610","612","614","615","616","617","618","619","620","623","626","630","631","636","641","646","650","651","660","661","662","667","678","682","701","702","703","704","706","707","708","712","713","714","715","716","717","718","719","720","724","727","731","732","734","737","740","754","757","760","763","765","770","772","773","774","775","781","785","786","801","802","803","804","805","806","808","810","812","813","814","815","816","817","818","828","830","831","832","835","843","845","847","848","850","856","857","858","859","860","862","863","864","865","870","872","878","901","903","904","906","907","908","909","910","912","913","914","915","916","917","918","919","920","925","928","931","936","937","940","941","947","949","952","954","956","959","970","971","972","973","975","978","979","980","984","985","989"],"exchange_code":["201","202","203","205","206","207","208","209","210","212","213","214","215","216","217","218","219","224","225","227","228","229","231","234","239","240","248","251","252","253","254","256","260","262","267","269","270","276","281","283","301","302","303","304","305","307","308","309","310","312","313","314","315","316","317","318","319","320","321","323","330","331","334","336","337","339","347","351","352","360","361","386","401","402","404","405","406","407","408","409","410","412","413","414","415","417","419","423","424","425","434","435","440","443","445","464","469","470","475","478","479","480","484","501","502","503","504","505","507","508","509","510","512","513","515","516","517","518","520","530","540","541","551","557","559","561","562","563","564","567","570","571","573","574","580","585","586","601","602","603","605","606","607","608","609","610","612","614","615","616","617","618","619","620","623","626","630","631","636","641","646","650","651","660","661","662","667","678","682","701","702","703","704","706","707","708","712","713","714","715","716","717","718","719","720","724","727","731","732","734","737","740","754","757","760","763","765","770","772","773","774","775","781","785","786","801","802","803","804","805","806","808","810","812","813","814","815","816","817","818","828","830","831","832","835","843","845","847","848","850","856","857","858","859","860","862","863","864","865","870","872","878","901","903","904","906","907","908","909","910","912","913","914","915","916","917","918","919","920","925","928","931","936","937","940","941","947","949","952","954","956","959","970","971","972","973","975","978","979","980","984","985","989"],"formats":["#{PhoneNumber.area_code}-#{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number}","(#{PhoneNumber.area_code}) #{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number}","1-#{PhoneNumber.area_code}-#{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number}","#{PhoneNumber.area_code}.#{PhoneNumber.exchange_code}.#{PhoneNumber.subscriber_number}","#{PhoneNumber.area_code}-#{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number}","(#{PhoneNumber.area_code}) #{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number}","1-#{PhoneNumber.area_code}-#{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number}","#{PhoneNumber.area_code}.#{PhoneNumber.exchange_code}.#{PhoneNumber.subscriber_number}","#{PhoneNumber.area_code}-#{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","(#{PhoneNumber.area_code}) #{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","1-#{PhoneNumber.area_code}-#{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","#{PhoneNumber.area_code}.#{PhoneNumber.exchange_code}.#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","#{PhoneNumber.area_code}-#{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","(#{PhoneNumber.area_code}) #{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","1-#{PhoneNumber.area_code}-#{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","#{PhoneNumber.area_code}.#{PhoneNumber.exchange_code}.#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","#{PhoneNumber.area_code}-#{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","(#{PhoneNumber.area_code}) #{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","1-#{PhoneNumber.area_code}-#{PhoneNumber.exchange_code}-#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}","#{PhoneNumber.area_code}.#{PhoneNumber.exchange_code}.#{PhoneNumber.subscriber_number} x#{PhoneNumber.extension}"]}}},"en-au-ocker":{"faker":{"address":{"building_number":["####","###","##"],"city":["#{city_prefix}"],"city_prefix":["Bondi","Burleigh Heads","Carlton","Fitzroy","Fremantle","Glenelg","Manly","Noosa","Stones Corner","St Kilda","Surry Hills","Yarra Valley"],"default_country":["Australia"],"postcode":["0###","2###","3###","4###","5###","6###","7###"],"region":["South East Queensland","Wide Bay Burnett","Margaret River","Port Pirie","Gippsland","Elizabeth","Barossa"],"state":["New South Wales","Queensland","Northern Territory","South Australia","Western Australia","Tasmania","Australian Capital Territory","Victoria"],"state_abbr":["NSW","QLD","NT","SA","WA","TAS","ACT","VIC"],"street_name":["#{street_root}"],"street_root":["Ramsay Street","Bonnie Doon","Cavill Avenue","Queen Street"],"street_suffix":["Avenue","Boulevard","Circle","Circuit","Court","Crescent","Crest","Drive","Estate Dr","Grove","Hill","Island","Junction","Knoll","Lane","Loop","Mall","Manor","Meadow","Mews","Parade","Parkway","Pass","Place","Plaza","Ridge","Road","Run","Square","Station St","Street","Summit","Terrace","Track","Trail","View Rd","Way"]},"company":{"suffix":["Pty Ltd","and Sons","Corp","Group","Brothers","Partners"]},"internet":{"domain_suffix":["com.au","com","net.au","net","org.au","org"]},"name":{"first_name":["Charlotte","Ava","Chloe","Emily","Olivia","Zoe","Lily","Sophie","Amelia","Sofia","Ella","Isabella","Ruby","Sienna","Mia+3","Grace","Emma","Ivy","Layla","Abigail","Isla","Hannah","Zara","Lucy","Evie","Annabelle","Madison","Alice","Georgia","Maya","Madeline","Audrey","Scarlett","Isabelle","Chelsea","Mila","Holly","Indiana","Poppy","Harper","Sarah","Alyssa","Jasmine","Imogen","Hayley","Pheobe","Eva","Evelyn","Mackenzie","Ayla","Oliver","Jack","Jackson","William","Ethan","Charlie","Lucas","Cooper","Lachlan","Noah","Liam","Alexander","Max","Isaac","Thomas","Xavier","Oscar","Benjamin","Aiden","Mason","Samuel","James","Levi","Riley","Harrison","Ryan","Henry","Jacob","Joshua","Leo","Zach","Harry","Hunter","Flynn","Archie","Tyler","Elijah","Hayden","Jayden","Blake","Archer","Ashton","Sebastian","Zachery","Lincoln","Mitchell","Luca","Nathan","Kai","Connor","Tom","Nigel","Matt","Sean"],"last_name":["Smith","Jones","Williams","Brown","Wilson","Taylor","Morton","White","Martin","Anderson","Thompson","Nguyen","Thomas","Walker","Harris","Lee","Ryan","Robinson","Kelly","King","Rausch","Ridge","Connolly","LeQuesne"],"ocker_first_name":["Bazza","Bluey","Davo","Johno","Shano","Shazza"]},"phone_number":{"formats":["0# #### ####","+61 # #### ####","04## ### ###","+61 4## ### ###"]}}},"es":{"faker":{"address":{"building_number":[" s/n.",", #",", ##"," #"," ##"],"city":["#{city_prefix}"],"city_prefix":["Parla","Telde","Baracaldo","San Fernando","Torrevieja","Lugo","Santiago de Compostela","Gerona","Cáceres","Lorca","Coslada","Talavera de la Reina","El Puerto de Santa María","Cornellá de Llobregat","Avilés","Palencia","Gecho","Orihuela","Pontevedra","Pozuelo de Alarcón","Toledo","El Ejido","Guadalajara","Gandía","Ceuta","Ferrol","Chiclana de la Frontera","Manresa","Roquetas de Mar","Ciudad Real","Rubí","Benidorm","San Sebastían de los Reyes","Ponferrada","Zamora","Alcalá de Guadaira","Fuengirola","Mijas","Sanlúcar de Barrameda","La Línea de la Concepción","Majadahonda","Sagunto","El Prat de LLobregat","Viladecans","Linares","Alcoy","Irún","Estepona","Torremolinos","Rivas-Vaciamadrid","Molina de Segura","Paterna","Granollers","Santa Lucía de Tirajana","Motril","Cerdañola del Vallés","Arrecife","Segovia","Torrelavega","Elda","Mérida","Ávila","Valdemoro","Cuenta","Collado Villalba","Benalmádena","Mollet del Vallés","Puertollano","Madrid","Barcelona","Valencia","Sevilla","Zaragoza","Málaga","Murcia","Palma de Mallorca","Las Palmas de Gran Canaria","Bilbao","Córdoba","Alicante","Valladolid","Vigo","Gijón","Hospitalet de LLobregat","La Coruña","Granada","Vitoria","Elche","Santa Cruz de Tenerife","Oviedo","Badalona","Cartagena","Móstoles","Jerez de la Frontera","Tarrasa","Sabadell","Alcalá de Henares","Pamplona","Fuenlabrada","Almería","San Sebastián","Leganés","Santander","Burgos","Castellón de la Plana","Alcorcón","Albacete","Getafe","Salamanca","Huelva","Logroño","Badajoz","San Cristróbal de la Laguna","León","Tarragona","Cádiz","Lérida","Marbella","Mataró","Dos Hermanas","Santa Coloma de Gramanet","Jaén","Algeciras","Torrejón de Ardoz","Orense","Alcobendas","Reus","Calahorra","Inca"],"country":["Afganistán","Albania","Argelia","Andorra","Angola","Argentina","Armenia","Aruba","Australia","Austria","Azerbayán","Bahamas","Barein","Bangladesh","Barbados","Bielorusia","Bélgica","Belice","Bermuda","Bután","Bolivia","Bosnia Herzegovina","Botswana","Brasil","Bulgaria","Burkina Faso","Burundi","Camboya","Camerún","Canada","Cabo Verde","Islas Caimán","Chad","Chile","China","Isla de Navidad","Colombia","Comodos","Congo","Costa Rica","Costa de Marfil","Croacia","Cuba","Chipre","República Checa","Dinamarca","Dominica","República Dominicana","Ecuador","Egipto","El Salvador","Guinea Ecuatorial","Eritrea","Estonia","Etiopía","Islas Faro","Fiji","Finlandia","Francia","Gabón","Gambia","Georgia","Alemania","Ghana","Grecia","Groenlandia","Granada","Guadalupe","Guam","Guatemala","Guinea","Guinea-Bisau","Guayana","Haiti","Honduras","Hong Kong","Hungria","Islandia","India","Indonesia","Iran","Irak","Irlanda","Italia","Jamaica","Japón","Jordania","Kazajistan","Kenia","Kiribati","Corea","Kuwait","Letonia","Líbano","Liberia","Liechtenstein","Lituania","Luxemburgo","Macao","Macedonia","Madagascar","Malawi","Malasia","Maldivas","Mali","Malta","Martinica","Mauritania","Méjico","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Montserrat","Marruecos","Mozambique","Namibia","Nauru","Nepal","Holanda","Nueva Zelanda","Nicaragua","Niger","Nigeria","Noruega","Omán","Pakistan","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Filipinas","Poland","Portugal","Puerto Rico","Rusia","Ruanda","Samoa","San Marino","Santo Tomé y Principe","Arabia Saudí","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Eslovaquia","Eslovenia","Somalia","España","Sri Lanka","Sudán","Suriname","Suecia","Suiza","Siria","Taiwan","Tajikistan","Tanzania","Tailandia","Timor-Leste","Togo","Tonga","Trinidad y Tobago","Tunez","Turquia","Uganda","Ucrania","Emiratos Árabes Unidos","Reino Unido","Estados Unidos de América","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"],"default_country":["España"],"postcode":["#####"],"province":["Álava","Albacete","Alicante","Almería","Asturias","Ávila","Badajoz","Barcelona","Burgos","Cantabria","Castellón","Ciudad Real","Cuenca","Cáceres","Cádiz","Córdoba","Gerona","Granada","Guadalajara","Guipúzcoa","Huelva","Huesca","Islas Baleares","Jaén","La Coruña","La Rioja","Las Palmas","León","Lugo","lérida","Madrid","Murcia","Málaga","Navarra","Orense","Palencia","Pontevedra","Salamanca","Santa Cruz de Tenerife","Segovia","Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Vizcaya","Zamora","Zaragoza"],"secondary_address":["Esc. ###","Puerta ###"],"state":["Andalucía","Aragón","Principado de Asturias","Baleares","Canarias","Cantabria","Castilla-La Mancha","Castilla y León","Cataluña","Comunidad Valenciana","Extremadura","Galicia","La Rioja","Comunidad de Madrid","Navarra","País Vasco","Región de Murcia"],"state_abbr":["And","Ara","Ast","Bal","Can","Cbr","Man","Leo","Cat","Com","Ext","Gal","Rio","Mad","Nav","Vas","Mur"],"street_address":["#{street_name}#{building_number}","#{street_name}#{building_number} #{secondary_address}"],"street_name":["#{street_suffix} #{Name.first_name}","#{street_suffix} #{Name.first_name} #{Name.last_name}"],"street_suffix":["Aldea","Apartamento","Arrabal","Arroyo","Avenida","Bajada","Barranco","Barrio","Bloque","Calle","Calleja","Camino","Carretera","Caserio","Colegio","Colonia","Conjunto","Cuesta","Chalet","Edificio","Entrada","Escalinata","Explanada","Extramuros","Extrarradio","Ferrocarril","Glorieta","Gran Subida","Grupo","Huerta","Jardines","Lado","Lugar","Manzana","Masía","Mercado","Monte","Muelle","Municipio","Parcela","Parque","Partida","Pasaje","Paseo","Plaza","Poblado","Polígono","Prolongación","Puente","Puerta","Quinta","Ramal","Rambla","Rampa","Riera","Rincón","Ronda","Rua","Salida","Sector","Sección","Senda","Solar","Subida","Terrenos","Torrente","Travesía","Urbanización","Vía","Vía Pública"],"time_zone":["Pacífico/Midway","Pacífico/Pago_Pago","Pacífico/Honolulu","America/Juneau","America/Los_Angeles","America/Tijuana","America/Denver","America/Phoenix","America/Chihuahua","America/Mazatlan","America/Chicago","America/Regina","America/Mexico_City","America/Mexico_City","America/Monterrey","America/Guatemala","America/New_York","America/Indiana/Indianapolis","America/Bogota","America/Lima","America/Lima","America/Halifax","America/Caracas","America/La_Paz","America/Santiago","America/St_Johns","America/Sao_Paulo","America/Argentina/Buenos_Aires","America/Guyana","America/Godthab","Atlantic/South_Georgia","Atlantic/Azores","Atlantic/Cape_Verde","Europa/Dublin","Europa/London","Europa/Lisbon","Europa/London","Africa/Casablanca","Africa/Monrovia","Etc/UTC","Europa/Belgrade","Europa/Bratislava","Europa/Budapest","Europa/Ljubljana","Europa/Prague","Europa/Sarajevo","Europa/Skopje","Europa/Warsaw","Europa/Zagreb","Europa/Brussels","Europa/Copenhagen","Europa/Madrid","Europa/Paris","Europa/Amsterdam","Europa/Berlin","Europa/Berlin","Europa/Rome","Europa/Stockholm","Europa/Vienna","Africa/Algiers","Europa/Bucharest","Africa/Cairo","Europa/Helsinki","Europa/Kiev","Europa/Riga","Europa/Sofia","Europa/Tallinn","Europa/Vilnius","Europa/Athens","Europa/Istanbul","Europa/Minsk","Asia/Jerusalen","Africa/Harare","Africa/Johannesburg","Europa/Moscú","Europa/Moscú","Europa/Moscú","Asia/Kuwait","Asia/Riyadh","Africa/Nairobi","Asia/Baghdad","Asia/Tehran","Asia/Muscat","Asia/Muscat","Asia/Baku","Asia/Tbilisi","Asia/Yerevan","Asia/Kabul","Asia/Yekaterinburg","Asia/Karachi","Asia/Karachi","Asia/Tashkent","Asia/Kolkata","Asia/Kolkata","Asia/Kolkata","Asia/Kolkata","Asia/Kathmandu","Asia/Dhaka","Asia/Dhaka","Asia/Colombo","Asia/Almaty","Asia/Novosibirsk","Asia/Rangoon","Asia/Bangkok","Asia/Bangkok","Asia/Jakarta","Asia/Krasnoyarsk","Asia/Shanghai","Asia/Chongqing","Asia/Hong_Kong","Asia/Urumqi","Asia/Kuala_Lumpur","Asia/Singapore","Asia/Taipei","Australia/Perth","Asia/Irkutsk","Asia/Ulaanbaatar","Asia/Seoul","Asia/Tokyo","Asia/Tokyo","Asia/Tokyo","Asia/Yakutsk","Australia/Darwin","Australia/Adelaide","Australia/Melbourne","Australia/Melbourne","Australia/Sydney","Australia/Brisbane","Australia/Hobart","Asia/Vladivostok","Pacífico/Guam","Pacífico/Port_Moresby","Asia/Magadan","Asia/Magadan","Pacífico/Noumea","Pacífico/Fiji","Asia/Kamchatka","Pacífico/Majuro","Pacífico/Auckland","Pacífico/Auckland","Pacífico/Tongatapu","Pacífico/Fakaofo","Pacífico/Apia"]},"cell_phone":{"formats":["6##-###-###","6##.###.###","6## ### ###","6########"]},"company":{"buzzwords":[["habilidad","acceso","adaptador","algoritmo","alianza","analista","aplicación","enfoque","arquitectura","archivo","inteligencia artificial","array","actitud","medición","gestión presupuestaria","capacidad","desafío","circuito","colaboración","complejidad","concepto","conglomeración","contingencia","núcleo","fidelidad","base de datos","data-warehouse","definición","emulación","codificar","encriptar","extranet","firmware","flexibilidad","focus group","previsión","base de trabajo","función","funcionalidad","Interfaz Gráfica","groupware","Interfaz gráfico de usuario","hardware","Soporte","jerarquía","conjunto","implementación","infraestructura","iniciativa","instalación","conjunto de instrucciones","interfaz","intranet","base del conocimiento","red de area local","aprovechar","matrices","metodologías","middleware","migración","modelo","moderador","monitorizar","arquitectura abierta","sistema abierto","orquestar","paradigma","paralelismo","política","portal","estructura de precios","proceso de mejora","producto","productividad","proyecto","proyección","protocolo","línea segura","software","solución","estandardización","estrategia","estructura","éxito","superestructura","soporte","sinergia","mediante","marco de tiempo","caja de herramientas","utilización","website","fuerza de trabajo"],["24 horas","24/7","3rd generación","4th generación","5th generación","6th generación","analizada","asimétrica","asíncrona","monitorizada por red","bidireccional","bifurcada","generada por el cliente","cliente servidor","coherente","cohesiva","compuesto","sensible al contexto","basado en el contexto","basado en contenido","dedicada","generado por la demanda","didactica","direccional","discreta","dinámica","potenciada","acompasada","ejecutiva","explícita","tolerante a fallos","innovadora","amplio ábanico","global","heurística","alto nivel","holística","homogénea","hibrida","incremental","intangible","interactiva","intermedia","local","logística","maximizada","metódica","misión crítica","móbil","modular","motivadora","multimedia","multiestado","multitarea","nacional","basado en necesidades","neutral","nueva generación","no-volátil","orientado a objetos","óptima","optimizada","radical","tiempo real","recíproca","regional","escalable","secundaria","orientada a soluciones","estable","estatica","sistemática","sistémica","tangible","terciaria","transicional","uniforme","valor añadido","vía web","defectos cero","tolerancia cero"],["Adaptativo","Avanzado","Asimilado","Automatizado","Equilibrado","Centrado en el negocio","Centralizado","Clonado","Compatible","Configurable","Multi grupo","Multi plataforma","Centrado en el usuario","Configurable","Descentralizado","Digitalizado","Distribuido","Diverso","Reducido","Mejorado","Para toda la empresa","Ergonomico","Exclusivo","Expandido","Extendido","Cara a cara","Enfocado","Totalmente configurable","Fundamental","Orígenes","Horizontal","Implementado","Innovador","Integrado","Intuitivo","Inverso","Gestionado","Obligatorio","Monitorizado","Multi canal","Multi lateral","Multi capa","En red","Orientado a objetos","Open-source","Operativo","Optimizado","Opcional","Organico","Organizado","Perseverando","Persistente","en fases","Polarizado","Pre-emptivo","Proactivo","Enfocado a benficios","Profundo","Programable","Progresivo","Public-key","Enfocado en la calidad","Reactivo","Realineado","Re-contextualizado","Re-implementado","Reducido","Ingenieria inversa","Robusto","Fácil","Seguro","Auto proporciona","Compartible","Intercambiable","Sincronizado","Orientado a equipos","Total","Universal","Mejorado","Actualizable","Centrado en el usuario","Amigable","Versatil","Virtual","Visionario"]],"name":["#{Name.last_name} #{suffix}","#{Name.last_name} y #{Name.last_name}","#{Name.last_name} #{Name.last_name} #{suffix}","#{Name.last_name}, #{Name.last_name} y #{Name.last_name} Asociados"],"suffix":["S.L.","e Hijos","S.A.","Hermanos"]},"internet":{"domain_suffix":["com","es","info","com.es","org"],"free_email":["gmail.com","yahoo.com","hotmail.com"]},"name":{"first_name":["Adán","Agustín","Alberto","Alejandro","Alfonso","Alfredo","Andrés","Antonio","Armando","Arturo","Benito","Benjamín","Bernardo","Carlos","César","Claudio","Clemente","Cristian","Cristobal","Daniel","David","Diego","Eduardo","Emilio","Enrique","Ernesto","Esteban","Federico","Felipe","Fernando","Francisco","Gabriel","Gerardo","Germán","Gilberto","Gonzalo","Gregorio","Guillermo","Gustavo","Hernán","Homero","Horacio","Hugo","Ignacio","Jacobo","Jaime","Javier","Jerónimo","Jesús","Joaquín","Jorge","Jorge Luis","José","José Eduardo","José Emilio","José Luis","José María","Juan","Juan Carlos","Julio","Julio César","Lorenzo","Lucas","Luis","Luis Miguel","Manuel","Marco Antonio","Marcos","Mariano","Mario","Martín","Mateo","Miguel","Miguel Ángel","Nicolás","Octavio","Óscar","Pablo","Patricio","Pedro","Rafael","Ramiro","Ramón","Raúl","Ricardo","Roberto","Rodrigo","Rubén","Salvador","Samuel","Sancho","Santiago","Sergio","Teodoro","Timoteo","Tomás","Vicente","Víctor","Adela","Adriana","Alejandra","Alicia","Amalia","Ana","Ana Luisa","Ana María","Andrea","Anita","Ángela","Antonia","Ariadna","Barbara","Beatriz","Berta","Blanca","Caridad","Carla","Carlota","Carmen","Carolina","Catalina","Cecilia","Clara","Claudia","Concepción","Conchita","Cristina","Daniela","Débora","Diana","Dolores","Lola","Dorotea","Elena","Elisa","Eloisa","Elsa","Elvira","Emilia","Esperanza","Estela","Ester","Eva","Florencia","Francisca","Gabriela","Gloria","Graciela","Guadalupe","Guillermina","Inés","Irene","Isabel","Isabela","Josefina","Juana","Julia","Laura","Leonor","Leticia","Lilia","Lorena","Lourdes","Lucia","Luisa","Luz","Magdalena","Manuela","Marcela","Margarita","María","María del Carmen","María Cristina","María Elena","María Eugenia","María José","María Luisa","María Soledad","María Teresa","Mariana","Maricarmen","Marilu","Marisol","Marta","Mayte","Mercedes","Micaela","Mónica","Natalia","Norma","Olivia","Patricia","Pilar","Ramona","Raquel","Rebeca","Reina","Rocio","Rosa","Rosalia","Rosario","Sara","Silvia","Sofia","Soledad","Sonia","Susana","Teresa","Verónica","Victoria","Virginia","Yolanda"],"last_name":["Abeyta","Abrego","Abreu","Acevedo","Acosta","Acuña","Adame","Adorno","Agosto","Aguayo","Águilar","Aguilera","Aguirre","Alanis","Alaniz","Alarcón","Alba","Alcala","Alcántar","Alcaraz","Alejandro","Alemán","Alfaro","Alicea","Almanza","Almaraz","Almonte","Alonso","Alonzo","Altamirano","Alva","Alvarado","Alvarez","Amador","Amaya","Anaya","Anguiano","Angulo","Aparicio","Apodaca","Aponte","Aragón","Araña","Aranda","Arce","Archuleta","Arellano","Arenas","Arevalo","Arguello","Arias","Armas","Armendáriz","Armenta","Armijo","Arredondo","Arreola","Arriaga","Arroyo","Arteaga","Atencio","Ávalos","Ávila","Avilés","Ayala","Baca","Badillo","Báez","Baeza","Bahena","Balderas","Ballesteros","Banda","Bañuelos","Barajas","Barela","Barragán","Barraza","Barrera","Barreto","Barrientos","Barrios","Batista","Becerra","Beltrán","Benavides","Benavídez","Benítez","Bermúdez","Bernal","Berríos","Bétancourt","Blanco","Bonilla","Borrego","Botello","Bravo","Briones","Briseño","Brito","Bueno","Burgos","Bustamante","Bustos","Caballero","Cabán","Cabrera","Cadena","Caldera","Calderón","Calvillo","Camacho","Camarillo","Campos","Canales","Candelaria","Cano","Cantú","Caraballo","Carbajal","Cardenas","Cardona","Carmona","Carranza","Carrasco","Carrasquillo","Carreón","Carrera","Carrero","Carrillo","Carrion","Carvajal","Casanova","Casares","Casárez","Casas","Casillas","Castañeda","Castellanos","Castillo","Castro","Cavazos","Cazares","Ceballos","Cedillo","Ceja","Centeno","Cepeda","Cerda","Cervantes","Cervántez","Chacón","Chapa","Chavarría","Chávez","Cintrón","Cisneros","Collado","Collazo","Colón","Colunga","Concepción","Contreras","Cordero","Córdova","Cornejo","Corona","Coronado","Corral","Corrales","Correa","Cortés","Cortez","Cotto","Covarrubias","Crespo","Cruz","Cuellar","Curiel","Dávila","de Anda","de Jesús","Delacrúz","Delafuente","Delagarza","Delao","Delapaz","Delarosa","Delatorre","Deleón","Delgadillo","Delgado","Delrío","Delvalle","Díaz","Domínguez","Domínquez","Duarte","Dueñas","Duran","Echevarría","Elizondo","Enríquez","Escalante","Escamilla","Escobar","Escobedo","Esparza","Espinal","Espino","Espinosa","Espinoza","Esquibel","Esquivel","Estévez","Estrada","Fajardo","Farías","Feliciano","Fernández","Ferrer","Fierro","Figueroa","Flores","Flórez","Fonseca","Franco","Frías","Fuentes","Gaitán","Galarza","Galindo","Gallardo","Gallegos","Galván","Gálvez","Gamboa","Gamez","Gaona","Garay","García","Garibay","Garica","Garrido","Garza","Gastélum","Gaytán","Gil","Girón","Godínez","Godoy","Gómez","Gonzales","González","Gollum","Gracia","Granado","Granados","Griego","Grijalva","Guajardo","Guardado","Guerra","Guerrero","Guevara","Guillen","Gurule","Gutiérrez","Guzmán","Haro","Henríquez","Heredia","Hernádez","Hernandes","Hernández","Herrera","Hidalgo","Hinojosa","Holguín","Huerta","Hurtado","Ibarra","Iglesias","Irizarry","Jaime","Jaimes","Jáquez","Jaramillo","Jasso","Jiménez","Jimínez","Juárez","Jurado","Laboy","Lara","Laureano","Leal","Lebrón","Ledesma","Leiva","Lemus","León","Lerma","Leyva","Limón","Linares","Lira","Llamas","Loera","Lomeli","Longoria","López","Lovato","Loya","Lozada","Lozano","Lucero","Lucio","Luevano","Lugo","Luna","Macías","Madera","Madrid","Madrigal","Maestas","Magaña","Malave","Maldonado","Manzanares","Mares","Marín","Márquez","Marrero","Marroquín","Martínez","Mascareñas","Mata","Mateo","Matías","Matos","Maya","Mayorga","Medina","Medrano","Mejía","Meléndez","Melgar","Mena","Menchaca","Méndez","Mendoza","Menéndez","Meraz","Mercado","Merino","Mesa","Meza","Miramontes","Miranda","Mireles","Mojica","Molina","Mondragón","Monroy","Montalvo","Montañez","Montaño","Montemayor","Montenegro","Montero","Montes","Montez","Montoya","Mora","Morales","Moreno","Mota","Moya","Munguía","Muñiz","Muñoz","Murillo","Muro","Nájera","Naranjo","Narváez","Nava","Navarrete","Navarro","Nazario","Negrete","Negrón","Nevárez","Nieto","Nieves","Niño","Noriega","Núñez","Ocampo","Ocasio","Ochoa","Ojeda","Olivares","Olivárez","Olivas","Olivera","Olivo","Olmos","Olvera","Ontiveros","Oquendo","Ordóñez","Orellana","Ornelas","Orosco","Orozco","Orta","Ortega","Ortiz","Osorio","Otero","Ozuna","Pabón","Pacheco","Padilla","Padrón","Páez","Pagan","Palacios","Palomino","Palomo","Pantoja","Paredes","Parra","Partida","Patiño","Paz","Pedraza","Pedroza","Pelayo","Peña","Perales","Peralta","Perea","Peres","Pérez","Pichardo","Piña","Pineda","Pizarro","Polanco","Ponce","Porras","Portillo","Posada","Prado","Preciado","Prieto","Puente","Puga","Pulido","Quesada","Quezada","Quiñones","Quiñónez","Quintana","Quintanilla","Quintero","Quiroz","Rael","Ramírez","Ramón","Ramos","Rangel","Rascón","Raya","Razo","Regalado","Rendón","Rentería","Reséndez","Reyes","Reyna","Reynoso","Rico","Rincón","Riojas","Ríos","Rivas","Rivera","Rivero","Robledo","Robles","Rocha","Rodarte","Rodrígez","Rodríguez","Rodríquez","Rojas","Rojo","Roldán","Rolón","Romero","Romo","Roque","Rosado","Rosales","Rosario","Rosas","Roybal","Rubio","Ruelas","Ruiz","Saavedra","Sáenz","Saiz","Salas","Salazar","Salcedo","Salcido","Saldaña","Saldivar","Salgado","Salinas","Samaniego","Sanabria","Sanches","Sánchez","Sandoval","Santacruz","Santana","Santiago","Santillán","Sarabia","Sauceda","Saucedo","Sedillo","Segovia","Segura","Sepúlveda","Serna","Serrano","Serrato","Sevilla","Sierra","Sisneros","Solano","Solís","Soliz","Solorio","Solorzano","Soria","Sosa","Sotelo","Soto","Suárez","Tafoya","Tamayo","Tamez","Tapia","Tejada","Tejeda","Téllez","Tello","Terán","Terrazas","Tijerina","Tirado","Toledo","Toro","Torres","Tórrez","Tovar","Trejo","Treviño","Trujillo","Ulibarri","Ulloa","Urbina","Ureña","Urías","Uribe","Urrutia","Vaca","Valadez","Valdés","Valdez","Valdivia","Valencia","Valentín","Valenzuela","Valladares","Valle","Vallejo","Valles","Valverde","Vanegas","Varela","Vargas","Vásquez","Vázquez","Vega","Vela","Velasco","Velásquez","Velázquez","Vélez","Véliz","Venegas","Vera","Verdugo","Verduzco","Vergara","Viera","Vigil","Villa","Villagómez","Villalobos","Villalpando","Villanueva","Villareal","Villarreal","Villaseñor","Villegas","Yáñez","Ybarra","Zambrano","Zamora","Zamudio","Zapata","Zaragoza","Zarate","Zavala","Zayas","Zelaya","Zepeda","Zúñiga"],"name":["#{prefix} #{first_name} #{last_name} #{last_name}","#{first_name} #{last_name} #{last_name}","#{first_name} #{last_name} #{last_name}","#{first_name} #{last_name} #{last_name}","#{first_name} #{last_name} #{last_name}"],"prefix":["Sr.","Sra.","Sta."],"suffix":["Jr.","Sr.","I","II","III","IV","V","MD","DDS","PhD","DVM"],"title":{"descriptor":["Jefe","Senior","Directo","Corporativo","Dinánmico","Futuro","Producto","Nacional","Regional","Distrito","Central","Global","Cliente","Inversor","International","Heredado","Adelante","Interno","Humano","Gerente","Director"],"job":["Supervisor","Asociado","Ejecutivo","Relacciones","Oficial","Gerente","Ingeniero","Especialista","Director","Coordinador","Administrador","Arquitecto","Analista","Diseñador","Planificador","Técnico","Funcionario","Desarrollador","Productor","Consultor","Asistente","Facilitador","Agente","Representante","Estratega"],"level":["Soluciones","Programa","Marca","Seguridada","Investigación","Marketing","Normas","Implementación","Integración","Funcionalidad","Respuesta","Paradigma","Tácticas","Identidad","Mercados","Grupo","División","Aplicaciones","Optimización","Operaciones","Infraestructura","Intranet","Comunicaciones","Web","Calidad","Seguro","Mobilidad","Cuentas","Datos","Creativo","Configuración","Contabilidad","Interacciones","Factores","Usabilidad","Métricas"]}},"phone_number":{"formats":["9##-###-###","9##.###.###","9## ### ###","9########"]}}},"fa":{"faker":{"name":{"first_name":["آبان دخت","آبتین","آتوسا","آفر","آفره دخت","آذرنوش‌","آذین","آراه","آرزو","آرش","آرتین","آرتام","آرتمن","آرشام","آرمان","آرمین","آرمیتا","آریا فر","آریا","آریا مهر","آرین","آزاده","آزرم","آزرمدخت","آزیتا","آناهیتا","آونگ","آهو","آیدا","اتسز","اختر","ارد","ارد شیر","اردوان","ارژن","ارژنگ","ارسلان","ارغوان","ارمغان","ارنواز","اروانه","استر","اسفندیار","اشکان","اشکبوس","افسانه","افسون","افشین","امید","انوش (‌ آنوشا )","انوشروان","اورنگ","اوژن","اوستا","اهورا","ایاز","ایران","ایراندخت","ایرج","ایزدیار","بابک","باپوک","باربد","بارمان","بامداد","بامشاد","بانو","بختیار","برانوش","بردیا","برزو","برزویه","برزین","برمک","بزرگمهر","بنفشه","بوژان","بویان","بهار","بهارک","بهاره","بهتاش","بهداد","بهرام","بهدیس","بهرخ","بهرنگ","بهروز","بهزاد","بهشاد","بهمن","بهناز","بهنام","بهنود","بهنوش","بیتا","بیژن","پارسا","پاکان","پاکتن","پاکدخت","پانته آ","پدرام","پرتو","پرشنگ","پرتو","پرستو","پرویز","پردیس","پرهام","پژمان","پژوا","پرنیا","پشنگ","پروانه","پروین","پری","پریچهر","پریدخت","پریسا","پرناز","پریوش","پریا","پوپک","پوران","پوراندخت","پوریا","پولاد","پویا","پونه","پیام","پیروز","پیمان","تابان","تاباندخت","تاجی","تارا","تاویار","ترانه","تناز","توران","توراندخت","تورج","تورتک","توفان","توژال","تیر داد","تینا","تینو","جابان","جامین","جاوید","جریره","جمشید","جوان","جویا","جهان","جهانبخت","جهانبخش","جهاندار","جهانگیر","جهان بانو","جهاندخت","جهان ناز","جیران","چابک","چالاک","چاوش","چترا","چوبین","چهرزاد","خاوردخت","خداداد","خدایار","خرم","خرمدخت","خسرو","خشایار","خورشید","دادمهر","دارا","داراب","داریا","داریوش","دانوش","داور‌","دایان","دریا","دل آرا","دل آویز","دلارام","دل انگیز","دلبر","دلبند","دلربا","دلشاد","دلکش","دلناز","دلنواز","دورشاسب","دنیا","دیااکو","دیانوش","دیبا","دیبا دخت","رابو","رابین","رادبانو","رادمان","رازبان","راژانه","راسا","رامتین","رامش","رامشگر","رامونا","رامیار","رامیلا","رامین","راویار","رژینا","رخپاک","رخسار","رخشانه","رخشنده","رزمیار","رستم","رکسانا","روبینا","رودابه","روزبه","روشنک","روناک","رهام","رهی","ریبار","راسپینا","زادبخت","زاد به","زاد چهر","زاد فر","زال","زادماسب","زاوا","زردشت","زرنگار","زری","زرین","زرینه","زمانه","زونا","زیبا","زیبار","زیما","زینو","ژاله","ژالان","ژیار","ژینا","ژیوار","سارا","سارک","سارنگ","ساره","ساسان","ساغر","سام","سامان","سانا","ساناز","سانیار","ساویز","ساهی","ساینا","سایه","سپنتا","سپند","سپهر","سپهرداد","سپیدار","سپید بانو","سپیده","ستاره","ستی","سرافراز","سرور","سروش","سرور","سوبا","سوبار","سنبله","سودابه","سوری","سورن","سورنا","سوزان","سوزه","سوسن","سومار","سولان","سولماز","سوگند","سهراب","سهره","سهند","سیامک","سیاوش","سیبوبه ‌","سیما","سیمدخت","سینا","سیمین","سیمین دخت","شاپرک","شادی","شادمهر","شاران","شاهپور","شاهدخت","شاهرخ","شاهین","شاهیندخت","شایسته","شباهنگ","شب بو","شبدیز","شبنم","شراره","شرمین","شروین","شکوفه","شکفته","شمشاد","شمین","شوان","شمیلا","شورانگیز","شوری","شهاب","شهبار","شهباز","شهبال","شهپر","شهداد","شهرآرا","شهرام","شهربانو","شهرزاد","شهرناز","شهرنوش","شهره","شهریار","شهرزاد","شهلا","شهنواز","شهین","شیبا","شیدا","شیده","شیردل","شیرزاد","شیرنگ","شیرو","شیرین دخت","شیما","شینا","شیرین","شیوا","طوس","طوطی","طهماسب","طهمورث","غوغا","غنچه","فتانه","فدا","فراز","فرامرز","فرانک","فراهان","فربد","فربغ","فرجاد","فرخ","فرخ پی","فرخ داد","فرخ رو","فرخ زاد","فرخ لقا","فرخ مهر","فرداد","فردیس","فرین","فرزاد","فرزام","فرزان","فرزانه","فرزین","فرشاد","فرشته","فرشید","فرمان","فرناز","فرنگیس","فرنود","فرنوش","فرنیا","فروتن","فرود","فروز","فروزان","فروزش","فروزنده","فروغ","فرهاد","فرهنگ","فرهود","فربار","فریبا","فرید","فریدخت","فریدون","فریمان","فریناز","فرینوش","فریوش","فیروز","فیروزه","قابوس","قباد","قدسی","کابان","کابوک","کارا","کارو","کاراکو","کامبخت","کامبخش","کامبیز","کامجو","کامدین","کامران","کامراوا","کامک","کامنوش","کامیار","کانیار","کاووس","کاوه","کتایون","کرشمه","کسری","کلاله","کمبوجیه","کوشا","کهبد","کهرام","کهزاد","کیارش","کیان","کیانا","کیانچهر","کیاندخت","کیانوش","کیاوش","کیخسرو","کیقباد","کیکاووس","کیوان","کیوان دخت","کیومرث","کیهان","کیاندخت","کیهانه","گرد آفرید","گردان","گرشا","گرشاسب","گرشین","گرگین","گزل","گشتاسب","گشسب","گشسب بانو","گل","گل آذین","گل آرا‌","گلاره","گل افروز","گلاله","گل اندام","گلاویز","گلباد","گلبار","گلبام","گلبان","گلبانو","گلبرگ","گلبو","گلبهار","گلبیز","گلپاره","گلپر","گلپری","گلپوش","گل پونه","گلچین","گلدخت","گلدیس","گلربا","گلرخ","گلرنگ","گلرو","گلشن","گلریز","گلزاد","گلزار","گلسا","گلشید","گلنار","گلناز","گلنسا","گلنواز","گلنوش","گلی","گودرز","گوماتو","گهر چهر","گوهر ناز","گیتی","گیسو","گیلدا","گیو","لادن","لاله","لاله رخ","لاله دخت","لبخند","لقاء","لومانا","لهراسب","مارال","ماری","مازیار","ماکان","مامک","مانا","ماندانا","مانوش","مانی","مانیا","ماهان","ماهاندخت","ماه برزین","ماه جهان","ماهچهر","ماهدخت","ماهور","ماهرخ","ماهزاد","مردآویز","مرداس","مرزبان","مرمر","مزدک","مژده","مژگان","مستان","مستانه","مشکاندخت","مشکناز","مشکین دخت","منیژه","منوچهر","مهبانو","مهبد","مه داد","مهتاب","مهدیس","مه جبین","مه دخت","مهر آذر","مهر آرا","مهر آسا","مهر آفاق","مهر افرین","مهرآب","مهرداد","مهر افزون","مهرام","مهران","مهراندخت","مهراندیش","مهرانفر","مهرانگیز","مهرداد","مهر دخت","مهرزاده ‌","مهرناز","مهرنوش","مهرنکار","مهرنیا","مهروز","مهری","مهریار","مهسا","مهستی","مه سیما","مهشاد","مهشید","مهنام","مهناز","مهنوش","مهوش","مهیار","مهین","مهین دخت","میترا","میخک","مینا","مینا دخت","مینو","مینودخت","مینو فر","نادر","ناز آفرین","نازبانو","نازپرور","نازچهر","نازفر","نازلی","نازی","نازیدخت","نامور","ناهید","ندا","نرسی","نرگس","نرمک","نرمین","نریمان","نسترن","نسرین","نسرین دخت","نسرین نوش","نکیسا","نگار","نگاره","نگارین","نگین","نوا","نوش","نوش آذر","نوش آور","نوشا","نوش آفرین","نوشدخت","نوشروان","نوشفر","نوشناز","نوشین","نوید","نوین","نوین دخت","نیش ا","نیک بین","نیک پی","نیک چهر","نیک خواه","نیکداد","نیکدخت","نیکدل","نیکزاد","نیلوفر","نیما","وامق","ورجاوند","وریا","وشمگیر","وهرز","وهسودان","ویدا","ویس","ویشتاسب","ویگن","هژیر","هخامنش","هربد( هیربد )","هرمز","همایون","هما","همادخت","همدم","همراز","همراه","هنگامه","هوتن","هور","هورتاش","هورچهر","هورداد","هوردخت","هورزاد","هورمند","هوروش","هوشنگ","هوشیار","هومان","هومن","هونام","هویدا","هیتاسب","هیرمند","هیما","هیوا","یادگار","یاسمن ( یاسمین )","یاشار","یاور","یزدان","یگانه","یوشیتا"],"last_name":["عارف","عاشوری","عالی","عبادی","عبدالکریمی","عبدالملکی","عراقی","عزیزی","عصار","عقیلی","علم","علم‌الهدی","علی عسگری","علی‌آبادی","علیا","علی‌پور","علی‌زمانی","عنایت","غضنفری","غنی","فارسی","فاطمی","فانی","فتاحی","فرامرزی","فرج","فرشیدورد","فرمانفرمائیان","فروتن","فرهنگ","فریاد","فنایی","فنی‌زاده","فولادوند","فهمیده","قاضی","قانعی","قانونی","قمیشی","قنبری","قهرمان","قهرمانی","قهرمانیان","قهستانی","کاشی","کاکاوند","کامکار","کاملی","کاویانی","کدیور","کردبچه","کرمانی","کریمی","کلباسی","کمالی","کوشکی","کهنمویی","کیان","کیانی (نام خانوادگی)","کیمیایی","گل محمدی","گلپایگانی","گنجی","لاجوردی","لاچینی","لاهوتی","لنکرانی","لوکس","مجاهد","مجتبایی","مجتبوی","مجتهد شبستری","مجتهدی","مجرد","محجوب","محجوبی","محدثی","محمدرضایی","محمدی","مددی","مرادخانی","مرتضوی","مستوفی","مشا","مصاحب","مصباح","مصباح‌زاده","مطهری","مظفر","معارف","معروف","معین","مفتاح","مفتح","مقدم","ملایری","ملک","ملکیان","منوچهری","موحد","موسوی","موسویان","مهاجرانی","مهدی‌پور","میرباقری","میردامادی","میرزاده","میرسپاسی","میزبانی","ناظری","نامور","نجفی","ندوشن","نراقی","نعمت‌زاده","نقدی","نقیب‌زاده","نواب","نوبخت","نوبختی","نهاوندی","نیشابوری","نیلوفری","واثقی","واعظ","واعظ‌زاده","واعظی","وکیلی","هاشمی","هاشمی رفسنجانی","هاشمیان","هامون","هدایت","هراتی","هروی","همایون","همت","همدانی","هوشیار","هومن","یاحقی","یادگار","یثربی","یلدا"],"prefix":["آقای","خانم","دکتر"]}}},"fr":{"faker":{"address":{"building_number":["####","###","##","#"],"city":["#{city_name}"],"city_name":["Paris","Marseille","Lyon","Toulouse","Nice","Nantes","Strasbourg","Montpellier","Bordeaux","Lille13","Rennes","Reims","Le Havre","Saint-Étienne","Toulon","Grenoble","Dijon","Angers","Saint-Denis","Villeurbanne","Le Mans","Aix-en-Provence","Brest","Nîmes","Limoges","Clermont-Ferrand","Tours","Amiens","Metz","Perpignan","Besançon","Orléans","Boulogne-Billancourt","Mulhouse","Rouen","Caen","Nancy","Saint-Denis","Saint-Paul","Montreuil","Argenteuil","Roubaix","Dunkerque14","Tourcoing","Nanterre","Avignon","Créteil","Poitiers","Fort-de-France","Courbevoie","Versailles","Vitry-sur-Seine","Colombes","Pau","Aulnay-sous-Bois","Asnières-sur-Seine","Rueil-Malmaison","Saint-Pierre","Antibes","Saint-Maur-des-Fossés","Champigny-sur-Marne","La Rochelle","Aubervilliers","Calais","Cannes","Le Tampon","Béziers","Colmar","Bourges","Drancy","Mérignac","Saint-Nazaire","Valence","Ajaccio","Issy-les-Moulineaux","Villeneuve-d'Ascq","Levallois-Perret","Noisy-le-Grand","Quimper","La Seyne-sur-Mer","Antony","Troyes","Neuilly-sur-Seine","Sarcelles","Les Abymes","Vénissieux","Clichy","Lorient","Pessac","Ivry-sur-Seine","Cergy","Cayenne","Niort","Chambéry","Montauban","Saint-Quentin","Villejuif","Hyères","Beauvais","Cholet"],"default_country":["France"],"postcode":["#####"],"secondary_address":["Apt. ###","# étage"],"state":["Alsace","Aquitaine","Auvergne","Basse-Normandie","Bourgogne","Bretagne","Centre","Champagne-Ardenne","Corse","Franche-Comté","Haute-Normandie","Île-de-France","Languedoc-Roussillon","Limousin","Lorraine","Midi-Pyrénées","Nord-Pas-de-Calais","Pays de la Loire","Picardie","Poitou-Charentes","Provence-Alpes-Côte d'Azur","Rhône-Alpes"],"street_address":["#{building_number} #{street_name}"],"street_name":["#{street_prefix} #{street_suffix}"],"street_prefix":["Allée, Voie","Rue","Avenue","Boulevard","Quai","Passage","Impasse","Place"],"street_suffix":["de l'Abbaye","Adolphe Mille","d'Alésia","d'Argenteuil","d'Assas","du Bac","de Paris","La Boétie","Bonaparte","de la Bûcherie","de Caumartin","Charlemagne","du Chat-qui-Pêche","de la Chaussée-d'Antin","du Dahomey","Dauphine","Delesseux","du Faubourg Saint-Honoré","du Faubourg-Saint-Denis","de la Ferronnerie","des Francs-Bourgeois","des Grands Augustins","de la Harpe","du Havre","de la Huchette","Joubert","Laffitte","Lepic","des Lombards","Marcadet","Molière","Monsieur-le-Prince","de Montmorency","Montorgueil","Mouffetard","de Nesle","Oberkampf","de l'Odéon","d'Orsel","de la Paix","des Panoramas","Pastourelle","Pierre Charron","de la Pompe","de Presbourg","de Provence","de Richelieu","de Rivoli","des Rosiers","Royale","d'Abbeville","Saint-Honoré","Saint-Bernard","Saint-Denis","Saint-Dominique","Saint-Jacques","Saint-Séverin","des Saussaies","de Seine","de Solférino","Du Sommerard","de Tilsitt","Vaneau","de Vaugirard","de la Victoire","Zadkine"]},"company":{"bs":[["implement","utilize","integrate","streamline","optimize","evolve","transform","embrace","enable","orchestrate","leverage","reinvent","aggregate","architect","enhance","incentivize","morph","empower","envisioneer","monetize","harness","facilitate","seize","disintermediate","synergize","strategize","deploy","brand","grow","target","syndicate","synthesize","deliver","mesh","incubate","engage","maximize","benchmark","expedite","reintermediate","whiteboard","visualize","repurpose","innovate","scale","unleash","drive","extend","engineer","revolutionize","generate","exploit","transition","e-enable","iterate","cultivate","matrix","productize","redefine","recontextualize"],["clicks-and-mortar","value-added","vertical","proactive","robust","revolutionary","scalable","leading-edge","innovative","intuitive","strategic","e-business","mission-critical","sticky","one-to-one","24/7","end-to-end","global","B2B","B2C","granular","frictionless","virtual","viral","dynamic","24/365","best-of-breed","killer","magnetic","bleeding-edge","web-enabled","interactive","dot-com","sexy","back-end","real-time","efficient","front-end","distributed","seamless","extensible","turn-key","world-class","open-source","cross-platform","cross-media","synergistic","bricks-and-clicks","out-of-the-box","enterprise","integrated","impactful","wireless","transparent","next-generation","cutting-edge","user-centric","visionary","customized","ubiquitous","plug-and-play","collaborative","compelling","holistic","rich"],["synergies","web-readiness","paradigms","markets","partnerships","infrastructures","platforms","initiatives","channels","eyeballs","communities","ROI","solutions","e-tailers","e-services","action-items","portals","niches","technologies","content","vortals","supply-chains","convergence","relationships","architectures","interfaces","e-markets","e-commerce","systems","bandwidth","infomediaries","models","mindshare","deliverables","users","schemas","networks","applications","metrics","e-business","functionalities","experiences","web services","methodologies"]],"buzzwords":[["Adaptive","Advanced","Ameliorated","Assimilated","Automated","Balanced","Business-focused","Centralized","Cloned","Compatible","Configurable","Cross-group","Cross-platform","Customer-focused","Customizable","Decentralized","De-engineered","Devolved","Digitized","Distributed","Diverse","Down-sized","Enhanced","Enterprise-wide","Ergonomic","Exclusive","Expanded","Extended","Face to face","Focused","Front-line","Fully-configurable","Function-based","Fundamental","Future-proofed","Grass-roots","Horizontal","Implemented","Innovative","Integrated","Intuitive","Inverse","Managed","Mandatory","Monitored","Multi-channelled","Multi-lateral","Multi-layered","Multi-tiered","Networked","Object-based","Open-architected","Open-source","Operative","Optimized","Optional","Organic","Organized","Persevering","Persistent","Phased","Polarised","Pre-emptive","Proactive","Profit-focused","Profound","Programmable","Progressive","Public-key","Quality-focused","Reactive","Realigned","Re-contextualized","Re-engineered","Reduced","Reverse-engineered","Right-sized","Robust","Seamless","Secured","Self-enabling","Sharable","Stand-alone","Streamlined","Switchable","Synchronised","Synergistic","Synergized","Team-oriented","Total","Triple-buffered","Universal","Up-sized","Upgradable","User-centric","User-friendly","Versatile","Virtual","Visionary","Vision-oriented"],["24 hour","24/7","3rd generation","4th generation","5th generation","6th generation","actuating","analyzing","asymmetric","asynchronous","attitude-oriented","background","bandwidth-monitored","bi-directional","bifurcated","bottom-line","clear-thinking","client-driven","client-server","coherent","cohesive","composite","context-sensitive","contextually-based","content-based","dedicated","demand-driven","didactic","directional","discrete","disintermediate","dynamic","eco-centric","empowering","encompassing","even-keeled","executive","explicit","exuding","fault-tolerant","foreground","fresh-thinking","full-range","global","grid-enabled","heuristic","high-level","holistic","homogeneous","human-resource","hybrid","impactful","incremental","intangible","interactive","intermediate","leading edge","local","logistical","maximized","methodical","mission-critical","mobile","modular","motivating","multimedia","multi-state","multi-tasking","national","needs-based","neutral","next generation","non-volatile","object-oriented","optimal","optimizing","radical","real-time","reciprocal","regional","responsive","scalable","secondary","solution-oriented","stable","static","systematic","systemic","system-worthy","tangible","tertiary","transitional","uniform","upward-trending","user-facing","value-added","web-enabled","well-modulated","zero administration","zero defect","zero tolerance"],["ability","access","adapter","algorithm","alliance","analyzer","application","approach","architecture","archive","artificial intelligence","array","attitude","benchmark","budgetary management","capability","capacity","challenge","circuit","collaboration","complexity","concept","conglomeration","contingency","core","customer loyalty","database","data-warehouse","definition","emulation","encoding","encryption","extranet","firmware","flexibility","focus group","forecast","frame","framework","function","functionalities","Graphic Interface","groupware","Graphical User Interface","hardware","help-desk","hierarchy","hub","implementation","info-mediaries","infrastructure","initiative","installation","instruction set","interface","internet solution","intranet","knowledge user","knowledge base","local area network","leverage","matrices","matrix","methodology","middleware","migration","model","moderator","monitoring","moratorium","neural-net","open architecture","open system","orchestration","paradigm","parallelism","policy","portal","pricing structure","process improvement","product","productivity","project","projection","protocol","secured line","service-desk","software","solution","standardization","strategy","structure","success","superstructure","support","synergy","system engine","task-force","throughput","time-frame","toolset","utilisation","website","workforce"]],"name":["#{Name.last_name} #{suffix}","#{Name.last_name} et #{Name.last_name}"],"suffix":["SARL","SA","EURL","SAS","SEM","SCOP","GIE","EI"]},"internet":{"domain_suffix":["com","fr","eu","info","name","net","org"],"free_email":["gmail.com","yahoo.fr","hotmail.fr"]},"lorem":{"supplemental":["abbas","abduco","abeo","abscido","absconditus","absens","absorbeo","absque","abstergo","absum","abundans","abutor","accedo","accendo","acceptus","accipio","accommodo","accusator","acer","acerbitas","acervus","acidus","acies","acquiro","acsi","adamo","adaugeo","addo","adduco","ademptio","adeo","adeptio","adfectus","adfero","adficio","adflicto","adhaero","adhuc","adicio","adimpleo","adinventitias","adipiscor","adiuvo","administratio","admiratio","admitto","admoneo","admoveo","adnuo","adopto","adsidue","adstringo","adsuesco","adsum","adulatio","adulescens","adultus","aduro","advenio","adversus","advoco","aedificium","aeger","aegre","aegrotatio","aegrus","aeneus","aequitas","aequus","aer","aestas","aestivus","aestus","aetas","aeternus","ager","aggero","aggredior","agnitio","agnosco","ago","ait","aiunt","alienus","alii","alioqui","aliqua","alius","allatus","alo","alter","altus","alveus","amaritudo","ambitus","ambulo","amicitia","amiculum","amissio","amita","amitto","amo","amor","amoveo","amplexus","amplitudo","amplus","ancilla","angelus","angulus","angustus","animadverto","animi","animus","annus","anser","ante","antea","antepono","antiquus","aperio","aperte","apostolus","apparatus","appello","appono","appositus","approbo","apto","aptus","apud","aqua","ara","aranea","arbitro","arbor","arbustum","arca","arceo","arcesso","arcus","argentum","argumentum","arguo","arma","armarium","armo","aro","ars","articulus","artificiose","arto","arx","ascisco","ascit","asper","aspicio","asporto","assentator","astrum","atavus","ater","atqui","atrocitas","atrox","attero","attollo","attonbitus","auctor","auctus","audacia","audax","audentia","audeo","audio","auditor","aufero","aureus","auris","aurum","aut","autem","autus","auxilium","avaritia","avarus","aveho","averto","avoco","baiulus","balbus","barba","bardus","basium","beatus","bellicus","bellum","bene","beneficium","benevolentia","benigne","bestia","bibo","bis","blandior","bonus","bos","brevis","cado","caecus","caelestis","caelum","calamitas","calcar","calco","calculus","callide","campana","candidus","canis","canonicus","canto","capillus","capio","capitulus","capto","caput","carbo","carcer","careo","caries","cariosus","caritas","carmen","carpo","carus","casso","caste","casus","catena","caterva","cattus","cauda","causa","caute","caveo","cavus","cedo","celebrer","celer","celo","cena","cenaculum","ceno","censura","centum","cerno","cernuus","certe","certo","certus","cervus","cetera","charisma","chirographum","cibo","cibus","cicuta","cilicium","cimentarius","ciminatio","cinis","circumvenio","cito","civis","civitas","clam","clamo","claro","clarus","claudeo","claustrum","clementia","clibanus","coadunatio","coaegresco","coepi","coerceo","cogito","cognatus","cognomen","cogo","cohaero","cohibeo","cohors","colligo","colloco","collum","colo","color","coma","combibo","comburo","comedo","comes","cometes","comis","comitatus","commemoro","comminor","commodo","communis","comparo","compello","complectus","compono","comprehendo","comptus","conatus","concedo","concido","conculco","condico","conduco","confero","confido","conforto","confugo","congregatio","conicio","coniecto","conitor","coniuratio","conor","conqueror","conscendo","conservo","considero","conspergo","constans","consuasor","contabesco","contego","contigo","contra","conturbo","conventus","convoco","copia","copiose","cornu","corona","corpus","correptius","corrigo","corroboro","corrumpo","coruscus","cotidie","crapula","cras","crastinus","creator","creber","crebro","credo","creo","creptio","crepusculum","cresco","creta","cribro","crinis","cruciamentum","crudelis","cruentus","crur","crustulum","crux","cubicularis","cubitum","cubo","cui","cuius","culpa","culpo","cultellus","cultura","cum","cunabula","cunae","cunctatio","cupiditas","cupio","cuppedia","cupressus","cur","cura","curatio","curia","curiositas","curis","curo","curriculum","currus","cursim","curso","cursus","curto","curtus","curvo","curvus","custodia","damnatio","damno","dapifer","debeo","debilito","decens","decerno","decet","decimus","decipio","decor","decretum","decumbo","dedecor","dedico","deduco","defaeco","defendo","defero","defessus","defetiscor","deficio","defigo","defleo","defluo","defungo","degenero","degero","degusto","deinde","delectatio","delego","deleo","delibero","delicate","delinquo","deludo","demens","demergo","demitto","demo","demonstro","demoror","demulceo","demum","denego","denique","dens","denuncio","denuo","deorsum","depereo","depono","depopulo","deporto","depraedor","deprecator","deprimo","depromo","depulso","deputo","derelinquo","derideo","deripio","desidero","desino","desipio","desolo","desparatus","despecto","despirmatio","infit","inflammatio","paens","patior","patria","patrocinor","patruus","pauci","paulatim","pauper","pax","peccatus","pecco","pecto","pectus","pecunia","pecus","peior","pel","ocer","socius","sodalitas","sol","soleo","solio","solitudo","solium","sollers","sollicito","solum","solus","solutio","solvo","somniculosus","somnus","sonitus","sono","sophismata","sopor","sordeo","sortitus","spargo","speciosus","spectaculum","speculum","sperno","spero","spes","spiculum","spiritus","spoliatio","sponte","stabilis","statim","statua","stella","stillicidium","stipes","stips","sto","strenuus","strues","studio","stultus","suadeo","suasoria","sub","subito","subiungo","sublime","subnecto","subseco","substantia","subvenio","succedo","succurro","sufficio","suffoco","suffragium","suggero","sui","sulum","sum","summa","summisse","summopere","sumo","sumptus","supellex","super","suppellex","supplanto","suppono","supra","surculus","surgo","sursum","suscipio","suspendo","sustineo","suus","synagoga","tabella","tabernus","tabesco","tabgo","tabula","taceo","tactus","taedium","talio","talis","talus","tam","tamdiu","tamen","tametsi","tamisium","tamquam","tandem","tantillus","tantum","tardus","tego","temeritas","temperantia","templum","temptatio","tempus","tenax","tendo","teneo","tener","tenuis","tenus","tepesco","tepidus","ter","terebro","teres","terga","tergeo","tergiversatio","tergo","tergum","termes","terminatio","tero","terra","terreo","territo","terror","tersus","tertius","testimonium","texo","textilis","textor","textus","thalassinus","theatrum","theca","thema","theologus","thermae","thesaurus","thesis","thorax","thymbra","thymum","tibi","timidus","timor","titulus","tolero","tollo","tondeo","tonsor","torqueo","torrens","tot","totidem","toties","totus","tracto","trado","traho","trans","tredecim","tremo","trepide","tres","tribuo","tricesimus","triduana","triginta","tripudio","tristis","triumphus","trucido","truculenter","tubineus","tui","tum","tumultus","tunc","turba","turbo","turpe","turpis","tutamen","tutis","tyrannus","uberrime","ubi","ulciscor","ullus","ulterius","ultio","ultra","umbra","umerus","umquam","una","unde","undique","universe","unus","urbanus","urbs","uredo","usitas","usque","ustilo","ustulo","usus","uter","uterque","utilis","utique","utor","utpote","utrimque","utroque","utrum","uxor","vaco","vacuus","vado","vae","valde","valens","valeo","valetudo","validus","vallum","vapulus","varietas","varius","vehemens","vel","velociter","velum","velut","venia","venio","ventito","ventosus","ventus","venustas","ver","verbera","verbum","vere","verecundia","vereor","vergo","veritas","vero","versus","verto","verumtamen","verus","vesco","vesica","vesper","vespillo","vester","vestigium","vestrum","vetus","via","vicinus","vicissitudo","victoria","victus","videlicet","video","viduata","viduo","vigilo","vigor","vilicus","vilis","vilitas","villa","vinco","vinculum","vindico","vinitor","vinum","vir","virga","virgo","viridis","viriliter","virtus","vis","viscus","vita","vitiosus","vitium","vito","vivo","vix","vobis","vociferor","voco","volaticus","volo","volubilis","voluntarius","volup","volutabrum","volva","vomer","vomica","vomito","vorago","vorax","voro","vos","votum","voveo","vox","vulariter","vulgaris","vulgivagus","vulgo","vulgus","vulnero","vulnus","vulpes","vulticulus","vultuosus","xiphias"],"words":["alias","consequatur","aut","perferendis","sit","voluptatem","accusantium","doloremque","aperiam","eaque","ipsa","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt","explicabo","aspernatur","aut","odit","aut","fugit","sed","quia","consequuntur","magni","dolores","eos","qui","ratione","voluptatem","sequi","nesciunt","neque","dolorem","ipsum","quia","dolor","sit","amet","consectetur","adipisci","velit","sed","quia","non","numquam","eius","modi","tempora","incidunt","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem","ut","enim","ad","minima","veniam","quis","nostrum","exercitationem","ullam","corporis","nemo","enim","ipsam","voluptatem","quia","voluptas","sit","suscipit","laboriosam","nisi","ut","aliquid","ex","ea","commodi","consequatur","quis","autem","vel","eum","iure","reprehenderit","qui","in","ea","voluptate","velit","esse","quam","nihil","molestiae","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","laudantium","totam","rem","voluptatum","deleniti","atque","corrupti","quos","dolores","et","quas","molestias","excepturi","sint","occaecati","cupiditate","non","provident","sed","ut","perspiciatis","unde","omnis","iste","natus","error","similique","sunt","in","culpa","qui","officia","deserunt","mollitia","animi","id","est","laborum","et","dolorum","fuga","et","harum","quidem","rerum","facilis","est","et","expedita","distinctio","nam","libero","tempore","cum","soluta","nobis","est","eligendi","optio","cumque","nihil","impedit","quo","porro","quisquam","est","qui","minus","id","quod","maxime","placeat","facere","possimus","omnis","voluptas","assumenda","est","omnis","dolor","repellendus","temporibus","autem","quibusdam","et","aut","consequatur","vel","illum","qui","dolorem","eum","fugiat","quo","voluptas","nulla","pariatur","at","vero","eos","et","accusamus","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet","ut","et","voluptates","repudiandae","sint","et","molestiae","non","recusandae","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus","ut","aut","reiciendis","voluptatibus","maiores","doloribus","asperiores","repellat"]},"name":{"first_name":["Enzo","Lucas","Mathis","Nathan","Thomas","Hugo","Théo","Tom","Louis","Raphaël","Clément","Léo","Mathéo","Maxime","Alexandre","Antoine","Yanis","Paul","Baptiste","Alexis","Gabriel","Arthur","Jules","Ethan","Noah","Quentin","Axel","Evan","Mattéo","Romain","Valentin","Maxence","Noa","Adam","Nicolas","Julien","Mael","Pierre","Rayan","Victor","Mohamed","Adrien","Kylian","Sacha","Benjamin","Léa","Clara","Manon","Chloé","Camille","Ines","Sarah","Jade","Lola","Anaïs","Lucie","Océane","Lilou","Marie","Eva","Romane","Lisa","Zoe","Julie","Mathilde","Louise","Juliette","Clémence","Célia","Laura","Lena","Maëlys","Charlotte","Ambre","Maeva","Pauline","Lina","Jeanne","Lou","Noémie","Justine","Louna","Elisa","Alice","Emilie","Carla","Maëlle","Alicia","Mélissa"],"last_name":["Martin","Bernard","Dubois","Thomas","Robert","Richard","Petit","Durand","Leroy","Moreau","Simon","Laurent","Lefebvre","Michel","Garcia","David","Bertrand","Roux","Vincent","Fournier","Morel","Girard","Andre","Lefevre","Mercier","Dupont","Lambert","Bonnet","Francois","Martinez","Legrand","Garnier","Faure","Rousseau","Blanc","Guerin","Muller","Henry","Roussel","Nicolas","Perrin","Morin","Mathieu","Clement","Gauthier","Dumont","Lopez","Fontaine","Chevalier","Robin","Masson","Sanchez","Gerard","Nguyen","Boyer","Denis","Lemaire","Duval","Joly","Gautier","Roger","Roche","Roy","Noel","Meyer","Lucas","Meunier","Jean","Perez","Marchand","Dufour","Blanchard","Marie","Barbier","Brun","Dumas","Brunet","Schmitt","Leroux","Colin","Fernandez","Pierre","Renard","Arnaud","Rolland","Caron","Aubert","Giraud","Leclerc","Vidal","Bourgeois","Renaud","Lemoine","Picard","Gaillard","Philippe","Leclercq","Lacroix","Fabre","Dupuis","Olivier","Rodriguez","Da silva","Hubert","Louis","Charles","Guillot","Riviere","Le gall","Guillaume","Adam","Rey","Moulin","Gonzalez","Berger","Lecomte","Menard","Fleury","Deschamps","Carpentier","Julien","Benoit","Paris","Maillard","Marchal","Aubry","Vasseur","Le roux","Renault","Jacquet","Collet","Prevost","Poirier","Charpentier","Royer","Huet","Baron","Dupuy","Pons","Paul","Laine","Carre","Breton","Remy","Schneider","Perrot","Guyot","Barre","Marty","Cousin"],"name":["#{prefix} #{first_name} #{last_name}","#{first_name} #{last_name}","#{last_name} #{first_name}"],"prefix":["M","Mme","Mlle","Dr","Prof"],"title":{"job":["Superviseur","Executif","Manager","Ingenieur","Specialiste","Directeur","Coordinateur","Administrateur","Architecte","Analyste","Designer","Technicien","Developpeur","Producteur","Consultant","Assistant","Agent","Stagiaire"]}},"phone_number":{"formats":["01########","02########","03########","04########","05########","06########","07########","+33 1########","+33 2########","+33 3########","+33 4########","+33 5########","+33 6########","+33 7########"]}}},"it":{"faker":{"address":{"building_number":["###","##","#"],"city":["#{city_prefix} #{Name.first_name} #{city_suffix}","#{city_prefix} #{Name.first_name}","#{Name.first_name} #{city_suffix}","#{Name.last_name} #{city_suffix}"],"city_prefix":["San","Borgo","Sesto","Quarto","Settimo"],"city_suffix":["a mare","lido","ligure","del friuli","salentino","calabro","veneto","nell'emilia","umbro","laziale","terme","sardo"],"country":["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antartide (territori a sud del 60° parallelo)","Antigua e Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Bielorussia","Belgio","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia e Herzegovina","Botswana","Bouvet Island (Bouvetoya)","Brasile","Territorio dell'arcipelago indiano","Isole Vergini Britanniche","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambogia","Cameroon","Canada","Capo Verde","Isole Cayman","Repubblica Centrale Africana","Chad","Cile","Cina","Isola di Pasqua","Isola di Cocos (Keeling)","Colombia","Comoros","Congo","Isole Cook","Costa Rica","Costa d'Avorio","Croazia","Cuba","Cipro","Repubblica Ceca","Danimarca","Gibuti","Repubblica Dominicana","Equador","Egitto","El Salvador","Guinea Equatoriale","Eritrea","Estonia","Etiopia","Isole Faroe","Isole Falkland (Malvinas)","Fiji","Finlandia","Francia","Guyana Francese","Polinesia Francese","Territori Francesi del sud","Gabon","Gambia","Georgia","Germania","Ghana","Gibilterra","Grecia","Groenlandia","Grenada","Guadalupa","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Città del Vaticano","Honduras","Hong Kong","Ungheria","Islanda","India","Indonesia","Iran","Iraq","Irlanda","Isola di Man","Israele","Italia","Giamaica","Giappone","Jersey","Giordania","Kazakhstan","Kenya","Kiribati","Korea","Kuwait","Republicca Kirgiza","Repubblica del Laos","Latvia","Libano","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lituania","Lussemburgo","Macao","Macedonia","Madagascar","Malawi","Malesia","Maldive","Mali","Malta","Isole Marshall","Martinica","Mauritania","Mauritius","Mayotte","Messico","Micronesia","Moldova","Principato di Monaco","Mongolia","Montenegro","Montserrat","Marocco","Mozambico","Myanmar","Namibia","Nauru","Nepal","Antille Olandesi","Olanda","Nuova Caledonia","Nuova Zelanda","Nicaragua","Niger","Nigeria","Niue","Isole Norfolk","Northern Mariana Islands","Norvegia","Oman","Pakistan","Palau","Palestina","Panama","Papua Nuova Guinea","Paraguay","Peru","Filippine","Pitcairn Islands","Polonia","Portogallo","Porto Rico","Qatar","Reunion","Romania","Russia","Rwanda","San Bartolomeo","Sant'Elena","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Arabia Saudita","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovenia","Isole Solomon","Somalia","Sud Africa","Georgia del sud e South Sandwich Islands","Spagna","Sri Lanka","Sudan","Suriname","Svalbard \u0026 Jan Mayen Islands","Swaziland","Svezia","Svizzera","Siria","Taiwan","Tajikistan","Tanzania","Tailandia","Timor-Leste","Togo","Tokelau","Tonga","Trinidad e Tobago","Tunisia","Turchia","Turkmenistan","Isole di Turks and Caicos","Tuvalu","Uganda","Ucraina","Emirati Arabi Uniti","Regno Unito","Stati Uniti d'America","United States Minor Outlying Islands","Isole Vergini Statunitensi","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"],"default_country":["Italia"],"postcode":["#####"],"secondary_address":["Appartamento ##","Piano #"],"state":["Agrigento","Alessandria","Ancona","Aosta","Arezzo","Ascoli Piceno","Asti","Avellino","Bari","Barletta-Andria-Trani","Belluno","Benevento","Bergamo","Biella","Bologna","Bolzano","Brescia","Brindisi","Cagliari","Caltanissetta","Campobasso","Carbonia-Iglesias","Caserta","Catania","Catanzaro","Chieti","Como","Cosenza","Cremona","Crotone","Cuneo","Enna","Fermo","Ferrara","Firenze","Foggia","Forlì-Cesena","Frosinone","Genova","Gorizia","Grosseto","Imperia","Isernia","La Spezia","L'Aquila","Latina","Lecce","Lecco","Livorno","Lodi","Lucca","Macerata","Mantova","Massa-Carrara","Matera","Messina","Milano","Modena","Monza e della Brianza","Napoli","Novara","Nuoro","Olbia-Tempio","Oristano","Padova","Palermo","Parma","Pavia","Perugia","Pesaro e Urbino","Pescara","Piacenza","Pisa","Pistoia","Pordenone","Potenza","Prato","Ragusa","Ravenna","Reggio Calabria","Reggio Emilia","Rieti","Rimini","Roma","Rovigo","Salerno","Medio Campidano","Sassari","Savona","Siena","Siracusa","Sondrio","Taranto","Teramo","Terni","Torino","Ogliastra","Trapani","Trento","Treviso","Trieste","Udine","Varese","Venezia","Verbano-Cusio-Ossola","Vercelli","Verona","Vibo Valentia","Vicenza","Viterbo"],"state_abbr":["AG","AL","AN","AO","AR","AP","AT","AV","BA","BT","BL","BN","BG","BI","BO","BZ","BS","BR","CA","CL","CB","CI","CE","CT","CZ","CH","CO","CS","CR","KR","CN","EN","FM","FE","FI","FG","FC","FR","GE","GO","GR","IM","IS","SP","AQ","LT","LE","LC","LI","LO","LU","MC","MN","MS","MT","ME","MI","MO","MB","NA",false,"NU","OT","OR","PD","PA","PR","PV","PG","PU","PE","PC","PI","PT","PN","PZ","PO","RG","RA","RC","RE","RI","RN","RM","RO","SA","VS","SS","SV","SI","SR","SO","TA","TE","TR","TO","OG","TP","TN","TV","TS","UD","VA","VE","VB","VC","VR","VV","VI","VT"],"street_address":["#{street_name} #{building_number}","#{street_name} #{building_number}, #{secondary_address}"],"street_name":["#{street_suffix} #{Name.first_name}","#{street_suffix} #{Name.last_name}"],"street_suffix":["Piazza","Strada","Via","Borgo","Contrada","Rotonda","Incrocio"]},"company":{"bs":[["partnerships","comunità","ROI","soluzioni","e-services","nicchie","tecnologie","contenuti","supply-chains","convergenze","relazioni","architetture","interfacce","mercati","e-commerce","sistemi","modelli","schemi","reti","applicazioni","metriche","e-business","funzionalità","esperienze","webservices","metodologie"],["implementate","utilizzo","integrate","ottimali","evolutive","abilitate","reinventate","aggregate","migliorate","incentivate","monetizzate","sinergizzate","strategiche","deploy","marchi","accrescitive","target","sintetizzate","spedizioni","massimizzate","innovazione","guida","estensioni","generate","exploit","transizionali","matrici","ricontestualizzate"],["valore aggiunto","verticalizzate","proattive","forti","rivoluzionari","scalabili","innovativi","intuitivi","strategici","e-business","mission-critical","24/7","globali","B2B","B2C","granulari","virtuali","virali","dinamiche","magnetiche","web","interattive","sexy","back-end","real-time","efficienti","front-end","distributivi","estensibili","mondiali","open-source","cross-platform","sinergiche","out-of-the-box","enterprise","integrate","di impatto","wireless","trasparenti","next-generation","cutting-edge","visionari","plug-and-play","collaborative","olistiche","ricche"]],"buzzwords":[["Abilità","Access","Adattatore","Algoritmo","Alleanza","Analizzatore","Applicazione","Approccio","Architettura","Archivio","Intelligenza artificiale","Array","Attitudine","Benchmark","Capacità","Sfida","Circuito","Collaborazione","Complessità","Concetto","Conglomerato","Contingenza","Core","Database","Data-warehouse","Definizione","Emulazione","Codifica","Criptazione","Firmware","Flessibilità","Previsione","Frame","framework","Funzione","Funzionalità","Interfaccia grafica","Hardware","Help-desk","Gerarchia","Hub","Implementazione","Infrastruttura","Iniziativa","Installazione","Set di istruzioni","Interfaccia","Soluzione internet","Intranet","Conoscenza base","Matrici","Matrice","Metodologia","Middleware","Migrazione","Modello","Moderazione","Monitoraggio","Moratoria","Rete","Architettura aperta","Sistema aperto","Orchestrazione","Paradigma","Parallelismo","Policy","Portale","Struttura di prezzo","Prodotto","Produttività","Progetto","Proiezione","Protocollo","Servizio clienti","Software","Soluzione","Standardizzazione","Strategia","Struttura","Successo","Sovrastruttura","Supporto","Sinergia","Task-force","Finestra temporale","Strumenti","Utilizzazione","Sito web","Forza lavoro"],["adattiva","avanzata","migliorata","assimilata","automatizzata","bilanciata","centralizzata","compatibile","configurabile","cross-platform","decentralizzata","digitalizzata","distribuita","piccola","ergonomica","esclusiva","espansa","estesa","configurabile","fondamentale","orizzontale","implementata","innovativa","integrata","intuitiva","inversa","gestita","obbligatoria","monitorata","multi-canale","multi-laterale","open-source","operativa","ottimizzata","organica","persistente","polarizzata","proattiva","programmabile","progressiva","reattiva","riallineata","ricontestualizzata","ridotta","robusta","sicura","condivisibile","stand-alone","switchabile","sincronizzata","sinergica","totale","universale","user-friendly","versatile","virtuale","visionaria"],["24 ore","24/7","terza generazione","quarta generazione","quinta generazione","sesta generazione","asimmetrica","asincrona","background","bi-direzionale","biforcata","bottom-line","coerente","coesiva","composita","sensibile al contesto","basta sul contesto","basata sul contenuto","dedicata","didattica","direzionale","discreta","dinamica","eco-centrica","esecutiva","esplicita","full-range","globale","euristica","alto livello","olistica","omogenea","ibrida","impattante","incrementale","intangibile","interattiva","intermediaria","locale","logistica","massimizzata","metodica","mission-critical","mobile","modulare","motivazionale","multimedia","multi-tasking","nazionale","neutrale","nextgeneration","non-volatile","object-oriented","ottima","ottimizzante","radicale","real-time","reciproca","regionale","responsiva","scalabile","secondaria","stabile","statica","sistematica","sistemica","tangibile","terziaria","uniforme","valore aggiunto"]],"name":["#{Name.last_name} #{suffix}","#{Name.last_name}-#{Name.last_name} #{suffix}","#{Name.last_name}, #{Name.last_name} e #{Name.last_name} #{suffix}"],"suffix":["SPA","e figli","Group","s.r.l."]},"internet":{"domain_suffix":["com","com","com","net","org","it","it","it"],"free_email":["gmail.com","yahoo.com","hotmail.com","email.it","libero.it","yahoo.it"]},"name":{"first_name":["Aaron","Akira","Alberto","Alessandro","Alighieri","Amedeo","Amos","Anselmo","Antonino","Arcibaldo","Armando","Artes","Audenico","Ausonio","Bacchisio","Battista","Bernardo","Boris","Caio","Carlo","Cecco","Cirino","Cleros","Costantino","Damiano","Danny","Davide","Demian","Dimitri","Domingo","Dylan","Edilio","Egidio","Elio","Emanuel","Enrico","Ercole","Ermes","Ethan","Eusebio","Evangelista","Fabiano","Ferdinando","Fiorentino","Flavio","Fulvio","Gabriele","Gastone","Germano","Giacinto","Gianantonio","Gianleonardo","Gianmarco","Gianriccardo","Gioacchino","Giordano","Giuliano","Graziano","Guido","Harry","Iacopo","Ilario","Ione","Italo","Jack","Jari","Joey","Joseph","Kai","Kociss","Laerte","Lauro","Leonardo","Liborio","Lorenzo","Ludovico","Maggiore","Manuele","Mariano","Marvin","Matteo","Mauro","Michael","Mirco","Modesto","Muzio","Nabil","Nathan","Nick","Noah","Odino","Olo","Oreste","Osea","Pablo","Patrizio","Piererminio","Pierfrancesco","Piersilvio","Priamo","Quarto","Quirino","Radames","Raniero","Renato","Rocco","Romeo","Rosalino","Rudy","Sabatino","Samuel","Santo","Sebastian","Serse","Silvano","Sirio","Tancredi","Terzo","Timoteo","Tolomeo","Trevis","Ubaldo","Ulrico","Valdo","Neri","Vinicio","Walter","Xavier","Yago","Zaccaria","Abramo","Adriano","Alan","Albino","Alessio","Alighiero","Amerigo","Anastasio","Antimo","Antonio","Arduino","Aroldo","Arturo","Augusto","Avide","Baldassarre","Bettino","Bortolo","Caligola","Carmelo","Celeste","Ciro","Costanzo","Dante","Danthon","Davis","Demis","Dindo","Domiziano","Edipo","Egisto","Eliziario","Emidio","Enzo","Eriberto","Erminio","Ettore","Eustachio","Fabio","Fernando","Fiorenzo","Folco","Furio","Gaetano","Gavino","Gerlando","Giacobbe","Giancarlo","Gianmaria","Giobbe","Giorgio","Giulio","Gregorio","Hector","Ian","Ippolito","Ivano","Jacopo","Jarno","Joannes","Joshua","Karim","Kris","Lamberto","Lazzaro","Leone","Lino","Loris","Luigi","Manfredi","Marco","Marino","Marzio","Mattia","Max","Michele","Mirko","Moreno","Nadir","Nazzareno","Nestore","Nico","Noel","Odone","Omar","Orfeo","Osvaldo","Pacifico","Pericle","Pietro","Primo","Quasimodo","Radio","Raoul","Renzo","Rodolfo","Romolo","Rosolino","Rufo","Sabino","Sandro","Sasha","Secondo","Sesto","Silverio","Siro","Tazio","Teseo","Timothy","Tommaso","Tristano","Umberto","Ariel","Artemide","Assia","Azue","Benedetta","Bibiana","Brigitta","Carmela","Cassiopea","Cesidia","Cira","Clea","Cleopatra","Clodovea","Concetta","Cosetta","Cristyn","Damiana","Danuta","Deborah","Demi","Diamante","Diana","Donatella","Doriana","Edvige","Elda","Elga","Elsa","Emilia","Enrica","Erminia","Eufemia","Evita","Fatima","Felicia","Filomena","Flaviana","Fortunata","Gelsomina","Genziana","Giacinta","Gilda","Giovanna","Giulietta","Grazia","Guendalina","Helga","Ileana","Ingrid","Irene","Isabel","Isira","Ivonne","Jelena","Jole","Claudia","Kayla","Kristel","Laura","Lucia","Lia","Lidia","Lisa","Loredana","Loretta","Luce","Lucrezia","Luna","Maika","Marcella","Maria","Mariagiulia","Marianita","Mariapia","Marieva","Marina","Maristella","Maruska","Matilde","Mecren","Mercedes","Mietta","Miriana","Miriam","Monia","Morgana","Naomi","Nayade","Nicoletta","Ninfa","Noemi","Nunzia","Olimpia","Oretta","Ortensia","Penelope","Piccarda","Prisca","Rebecca","Rita","Rosalba","Rosaria","Rosita","Ruth","Samira","Sarita","Selvaggia","Shaira","Sibilla","Soriana","Thea","Tosca","Ursula","Vania","Vera","Vienna","Violante","Vitalba","Zelida"],"last_name":["Amato","Barbieri","Barone","Basile","Battaglia","Bellini","Benedetti","Bernardi","Bianc","Bianchi","Bruno","Caputo","Carbon","Caruso","Cattaneo","Colombo","Cont","Conte","Coppola","Costa","Costantin","D'amico","D'angelo","Damico","De Angelis","De luca","De rosa","De Santis","Donati","Esposito","Fabbri","Farin","Ferrara","Ferrari","Ferraro","Ferretti","Ferri","Fior","Fontana","Galli","Gallo","Gatti","Gentile","Giordano","Giuliani","Grassi","Grasso","Greco","Guerra","Leone","Lombardi","Lombardo","Longo","Mancini","Marchetti","Marian","Marini","Marino","Martinelli","Martini","Martino","Mazza","Messina","Milani","Montanari","Monti","Morelli","Moretti","Negri","Neri","Orlando","Pagano","Palmieri","Palumbo","Parisi","Pellegrini","Pellegrino","Piras","Ricci","Rinaldi","Riva","Rizzi","Rizzo","Romano","Ross","Rossetti","Ruggiero","Russo","Sala","Sanna","Santoro","Sartori","Serr","Silvestri","Sorrentino","Testa","Valentini","Villa","Vitale","Vitali"],"name":["#{prefix} #{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}"],"prefix":["Sig.","Dott.","Dr.","Ing."],"suffix":[]},"phone_number":{"formats":["+## ### ## ## ####","+## ## #######","+## ## ########","+## ### #######","+## ### ########","+## #### #######","+## #### ########","0## ### ####","+39 0## ### ###","3## ### ###","+39 3## ### ###"]}}},"ja":{"faker":{"address":{"city":["#{city_prefix}#{Name.first_name}#{city_suffix}","#{Name.first_name}#{city_suffix}","#{city_prefix}#{Name.last_name}#{city_suffix}","#{Name.last_name}#{city_suffix}"],"city_prefix":["北","東","西","南","新","湖","港"],"city_suffix":["市","区","町","村"],"postcode":["###-####"],"state":["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"],"state_abbr":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47"],"street_name":["#{Name.first_name}#{street_suffix}","#{Name.last_name}#{street_suffix}"]},"cell_phone":{"formats":["090-####-####","080-####-####","070-####-####"]},"name":{"first_name":["大翔","蓮","颯太","樹","大和","陽翔","陸斗","太一","海翔","蒼空","翼","陽菜","結愛","結衣","杏","莉子","美羽","結菜","心愛","愛菜","美咲"],"last_name":["佐藤","鈴木","高橋","田中","渡辺","伊藤","山本","中村","小林","加藤","吉田","山田","佐々木","山口","斎藤","松本","井上","木村","林","清水"],"name":["#{last_name} #{first_name}"]},"phone_number":{"formats":["0####-#-####","0###-##-####","0##-###-####","0#-####-####"]}}},"ko":{"faker":{"address":{"city":["#{city_name}#{city_suffix}"],"city_name":["강릉","양양","인제","광주","구리","부천","밀양","통영","창원","거창","고성","양산","김천","구미","영주","광산","남","북","고창","군산","남원","동작","마포","송파","용산","부평","강화","수성"],"city_suffix":["구","시","군"],"postcode":["###-###"],"state":["강원","경기","경남","경북","광주","대구","대전","부산","서울","울산","인천","전남","전북","제주","충남","충북","세종"],"state_abbr":["강원","경기","경남","경북","광주","대구","대전","부산","서울","울산","인천","전남","전북","제주","충남","충북","세종"],"street_name":["#{street_root}#{street_suffix}"],"street_root":["상계","화곡","신정","목","잠실","면목","주안","안양","중","정왕","구로","신월","연산","부평","창","만수","중계","검단","시흥","상도","방배","장유","상","광명","신길","행신","대명","동탄"],"street_suffix":["읍","면","동"]},"company":{"name":["#{prefix} #{Name.first_name}","#{Name.first_name} #{suffix}"],"prefix":["주식회사","한국"],"suffix":["연구소","게임즈","그룹","전자","물산","코리아"]},"internet":{"domain_suffix":["co.kr","com","biz","info","ne.kr","net","or.kr","org"],"free_email":["gmail.com","yahoo.co.kr","hanmail.net","naver.com"]},"lorem":{"words":["국가는","법률이","정하는","바에","의하여","재외국민을","보호할","의무를","진다.","모든","국민은","신체의","자유를","가진다.","국가는","전통문화의","계승·발전과","민족문화의","창달에","노력하여야","한다.","통신·방송의","시설기준과","신문의","기능을","보장하기","위하여","필요한","사항은","법률로","정한다.","헌법에","의하여","체결·공포된","조약과","일반적으로","승인된","국제법규는","국내법과","같은","효력을","가진다.","다만,","현행범인인","경우와","장기","3년","이상의","형에","해당하는","죄를","범하고","도피","또는","증거인멸의","염려가","있을","때에는","사후에","영장을","청구할","수","있다.","저작자·발명가·과학기술자와","예술가의","권리는","법률로써","보호한다.","형사피고인은","유죄의","판결이","확정될","때까지는","무죄로","추정된다.","모든","국민은","행위시의","법률에","의하여","범죄를","구성하지","아니하는","행위로","소추되지","아니하며,","동일한","범죄에","대하여","거듭","처벌받지","아니한다.","국가는","평생교육을","진흥하여야","한다.","모든","국민은","사생활의","비밀과","자유를","침해받지","아니한다.","의무교육은","무상으로","한다.","저작자·발명가·과학기술자와","예술가의","권리는","법률로써","보호한다.","국가는","모성의","보호를","위하여","노력하여야","한다.","헌법에","의하여","체결·공포된","조약과","일반적으로","승인된","국제법규는","국내법과","같은","효력을","가진다."]},"name":{"first_name":["서연","민서","서현","지우","서윤","지민","수빈","하은","예은","윤서","민준","지후","지훈","준서","현우","예준","건우","현준","민재","우진","은주"],"last_name":["김","이","박","최","정","강","조","윤","장","임","오","한","신","서","권","황","안","송","류","홍"],"name":["#{last_name} #{first_name}"]},"phone_number":{"formats":["0#-#####-####","0##-###-####","0##-####-####"]}}},"nb-NO":{"faker":{"address":{"building_number":["#","##"],"city":["#{city_root}#{city_suffix}"],"city_root":["Fet","Gjes","Høy","Inn","Fager","Lille","Lo","Mal","Nord","Nær","Sand","Sme","Stav","Stor","Tand","Ut","Vest"],"city_suffix":["berg","borg","by","bø","dal","eid","fjell","fjord","foss","grunn","hamn","havn","helle","mark","nes","odden","sand","sjøen","stad","strand","strøm","sund","vik","vær","våg","ø","øy","ås"],"common_street_suffix":["sgate","svei","s Gate","s Vei","gata","veien"],"default_country":["Norge"],"postcode":["####","####","####","0###"],"secondary_address":["Leil. ###","Oppgang A","Oppgang B"],"state":[""],"street_address":["#{street_name} #{building_number}"],"street_name":["#{street_root}#{street_suffix}","#{street_prefix} #{street_root}#{street_suffix}","#{Name.first_name}#{common_street_suffix}","#{Name.last_name}#{common_street_suffix}"],"street_prefix":["Øvre","Nedre","Søndre","Gamle","Østre","Vestre"],"street_root":["Eike","Bjørke","Gran","Vass","Furu","Litj","Lille","Høy","Fosse","Elve","Ku","Konvall","Soldugg","Hestemyr","Granitt","Hegge","Rogne","Fiol","Sol","Ting","Malm","Klokker","Preste","Dam","Geiterygg","Bekke","Berg","Kirke","Kors","Bru","Blåveis","Torg","Sjø"],"street_suffix":["alléen","bakken","berget","bråten","eggen","engen","ekra","faret","flata","gata","gjerdet","grenda","gropa","hagen","haugen","havna","holtet","høgda","jordet","kollen","kroken","lia","lunden","lyngen","løkka","marka","moen","myra","plassen","ringen","roa","røa","skogen","skrenten","spranget","stien","stranda","stubben","stykket","svingen","tjernet","toppen","tunet","vollen","vika","åsen"]},"company":{"name":["#{Name.last_name} #{suffix}","#{Name.last_name}-#{Name.last_name}","#{Name.last_name}, #{Name.last_name} og #{Name.last_name}"],"suffix":["Gruppen","AS","ASA","BA","RFH","og Sønner"]},"internet":{"domain_suffix":["no","com","net","org"]},"name":{"feminine_name":["Emma","Sara","Thea","Ida","Julie","Nora","Emilie","Ingrid","Hanna","Maria","Sofie","Anna","Malin","Amalie","Vilde","Frida","Andrea","Tuva","Victoria","Mia","Karoline","Mathilde","Martine","Linnea","Marte","Hedda","Marie","Helene","Silje","Leah","Maja","Elise","Oda","Kristine","Aurora","Kaja","Camilla","Mari","Maren","Mina","Selma","Jenny","Celine","Eline","Sunniva","Natalie","Tiril","Synne","Sandra","Madeleine"],"first_name":["Emma","Sara","Thea","Ida","Julie","Nora","Emilie","Ingrid","Hanna","Maria","Sofie","Anna","Malin","Amalie","Vilde","Frida","Andrea","Tuva","Victoria","Mia","Karoline","Mathilde","Martine","Linnea","Marte","Hedda","Marie","Helene","Silje","Leah","Maja","Elise","Oda","Kristine","Aurora","Kaja","Camilla","Mari","Maren","Mina","Selma","Jenny","Celine","Eline","Sunniva","Natalie","Tiril","Synne","Sandra","Madeleine","Markus","Mathias","Kristian","Jonas","Andreas","Alexander","Martin","Sander","Daniel","Magnus","Henrik","Tobias","Kristoffer","Emil","Adrian","Sebastian","Marius","Elias","Fredrik","Thomas","Sondre","Benjamin","Jakob","Oliver","Lucas","Oskar","Nikolai","Filip","Mats","William","Erik","Simen","Ole","Eirik","Isak","Kasper","Noah","Lars","Joakim","Johannes","Håkon","Sindre","Jørgen","Herman","Anders","Jonathan","Even","Theodor","Mikkel","Aksel"],"last_name":["Johansen","Hansen","Andersen","Kristiansen","Larsen","Olsen","Solberg","Andresen","Pedersen","Nilsen","Berg","Halvorsen","Karlsen","Svendsen","Jensen","Haugen","Martinsen","Eriksen","Sørensen","Johnsen","Myhrer","Johannessen","Nielsen","Hagen","Pettersen","Bakke","Skuterud","Løken","Gundersen","Strand","Jørgensen","Kvarme","Røed","Sæther","Stensrud","Moe","Kristoffersen","Jakobsen","Holm","Aas","Lie","Moen","Andreassen","Vedvik","Nguyen","Jacobsen","Torgersen","Ruud","Krogh","Christiansen","Bjerke","Aalerud","Borge","Sørlie","Berge","Østli","Ødegård","Torp","Henriksen","Haukelidsæter","Fjeld","Danielsen","Aasen","Fredriksen","Dahl","Berntsen","Arnesen","Wold","Thoresen","Solheim","Skoglund","Bakken","Amundsen","Solli","Smogeli","Kristensen","Glosli","Fossum","Evensen","Eide","Carlsen","Østby","Vegge","Tangen","Smedsrud","Olstad","Lunde","Kleven","Huseby","Bjørnstad","Ryan","Rasmussen","Nygård","Nordskaug","Nordby","Mathisen","Hopland","Gran","Finstad","Edvardsen"],"masculine_name":["Markus","Mathias","Kristian","Jonas","Andreas","Alexander","Martin","Sander","Daniel","Magnus","Henrik","Tobias","Kristoffer","Emil","Adrian","Sebastian","Marius","Elias","Fredrik","Thomas","Sondre","Benjamin","Jakob","Oliver","Lucas","Oskar","Nikolai","Filip","Mats","William","Erik","Simen","Ole","Eirik","Isak","Kasper","Noah","Lars","Joakim","Johannes","Håkon","Sindre","Jørgen","Herman","Anders","Jonathan","Even","Theodor","Mikkel","Aksel"],"name":["#{prefix} #{first_name} #{last_name}","#{first_name} #{last_name} #{suffix}","#{feminine_name} #{feminine_name} #{last_name}","#{masculine_name} #{masculine_name} #{last_name}","#{first_name} #{last_name} #{last_name}","#{first_name} #{last_name}"],"prefix":["Dr.","Prof."],"suffix":["Jr.","Sr.","I","II","III","IV","V"]},"phone_number":{"formats":["########","## ## ## ##","### ## ###","+47 ## ## ## ##"]}}},"nep":{"faker":{"address":{"city":["Bhaktapur","Biratnagar","Birendranagar","Birgunj","Butwal","Damak","Dharan","Gaur","Gorkha","Hetauda","Itahari","Janakpur","Kathmandu","Lahan","Nepalgunj","Pokhara"],"default_country":["Nepal"],"postcode":[0],"state":["Baglung","Banke","Bara","Bardiya","Bhaktapur","Bhojupu","Chitwan","Dailekh","Dang","Dhading","Dhankuta","Dhanusa","Dolakha","Dolpha","Gorkha","Gulmi","Humla","Ilam","Jajarkot","Jhapa","Jumla","Kabhrepalanchok","Kalikot","Kapilvastu","Kaski","Kathmandu","Lalitpur","Lamjung","Manang","Mohottari","Morang","Mugu","Mustang","Myagdi","Nawalparasi","Nuwakot","Palpa","Parbat","Parsa","Ramechhap","Rauswa","Rautahat","Rolpa","Rupandehi","Sankhuwasabha","Sarlahi","Sindhuli","Sindhupalchok","Sunsari","Surket","Syangja","Tanahu","Terhathum"]},"company":{"suffix":["Pvt Ltd","Group","Ltd","Limited"]},"internet":{"domain_suffix":["np","com","info","net","org"],"free_email":["worldlink.com.np","gmail.com","yahoo.com","hotmail.com"]},"name":{"first_name":["Aarav","Ajita","Amit","Amita","Amrit","Arijit","Ashmi","Asmita","Bibek","Bijay","Bikash","Bina","Bishal","Bishnu","Buddha","Deepika","Dipendra","Gagan","Ganesh","Khem","Krishna","Laxmi","Manisha","Nabin","Nikita","Niraj","Nischal","Padam","Pooja","Prabin","Prakash","Prashant","Prem","Purna","Rajendra","Rajina","Raju","Rakesh","Ranjan","Ratna","Sagar","Sandeep","Sanjay","Santosh","Sarita","Shilpa","Shirisha","Shristi","Siddhartha","Subash","Sumeet","Sunita","Suraj","Susan","Sushant"],"last_name":["Adhikari","Aryal","Baral","Basnet","Bastola","Basynat","Bhandari","Bhattarai","Chettri","Devkota","Dhakal","Dongol","Ghale","Gurung","Gyawali","Hamal","Jung","KC","Kafle","Karki","Khadka","Koirala","Lama","Limbu","Magar","Maharjan","Niroula","Pandey","Pradhan","Rana","Raut","Sai","Shai","Shakya","Sherpa","Shrestha","Subedi","Tamang","Thapa"]},"phone_number":{"formats":["##-#######","+977-#-#######","+977########"]}}},"nl":{"faker":{"address":{"building_number":["#","##","###","###a","###b","###c","### I","### II","### III"],"city":["#{Name.first_name}#{city_suffix}","#{Name.last_name}#{city_suffix}","#{city_prefix} #{Name.first_name}#{city_suffix}","#{city_prefix} #{Name.last_name}#{city_suffix}"],"city_prefix":["Noord","Oost","West","Zuid","Nieuw","Oud"],"city_suffix":["dam","berg"," aan de Rijn"," aan de IJssel","swaerd","endrecht","recht","ambacht","enmaes","wijk","sland","stroom","sluus","dijk","dorp","burg","veld","sluis","koop","lek","hout","geest","kerk","woude","hoven","hoten","ingen","plas","meer"],"country":["Afghanistan","Akrotiri","Albanië","Algerije","Amerikaanse Maagdeneilanden","Amerikaans-Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua en Barbuda","Arctic Ocean","Argentinië","Armenië","Aruba","Ashmore and Cartier Islands","Atlantic Ocean","Australië","Azerbeidzjan","Bahama's","Bahrein","Bangladesh","Barbados","Belarus","België","Belize","Benin","Bermuda","Bhutan","Bolivië","Bosnië-Herzegovina","Botswana","Bouvet Island","Brazilië","British Indian Ocean Territory","Britse Maagdeneilanden","Brunei","Bulgarije","Burkina Faso","Burundi","Cambodja","Canada","Caymaneilanden","Centraal-Afrikaanse Republiek","Chili","China","Christmas Island","Clipperton Island","Cocos (Keeling) Islands","Colombia","Comoren (Unie)","Congo (Democratische Republiek)","Congo (Volksrepubliek)","Cook","Coral Sea Islands","Costa Rica","Cuba","Cyprus","Denemarken","Dhekelia","Djibouti","Dominica","Dominicaanse Republiek","Duitsland","Ecuador","Egypte","El Salvador","Equatoriaal-Guinea","Eritrea","Estland","Ethiopië","European Union","Falkland","Faroe Islands","Fiji","Filipijnen","Finland","Frankrijk","Frans-Polynesië","French Southern and Antarctic Lands","Gabon","Gambia","Gaza Strip","Georgië","Ghana","Gibraltar","Grenada","Griekenland","Groenland","Guam","Guatemala","Guernsey","Guinea","Guinee-Bissau","Guyana","Haïti","Heard Island and McDonald Islands","Heilige Stoel","Honduras","Hongarije","Hongkong","Ierland","IJsland","India","Indian Ocean","Indonesië","Irak","Iran","Isle of Man","Israël","Italië","Ivoorkust","Jamaica","Jan Mayen","Japan","Jemen","Jersey","Jordanië","Kaapverdië","Kameroen","Kazachstan","Kenia","Kirgizstan","Kiribati","Koeweit","Kroatië","Laos","Lesotho","Letland","Libanon","Liberia","Libië","Liechtenstein","Litouwen","Luxemburg","Macao","Macedonië","Madagaskar","Malawi","Maldiven","Maleisië","Mali","Malta","Marokko","Marshall Islands","Mauritanië","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldavië","Monaco","Mongolië","Montenegro","Montserrat","Mozambique","Myanmar","Namibië","Nauru","Navassa Island","Nederland","Nederlandse Antillen","Nepal","Ngwane","Nicaragua","Nieuw-Caledonië","Nieuw-Zeeland","Niger","Nigeria","Niue","Noordelijke Marianen","Noord-Korea","Noorwegen","Norfolk Island","Oekraïne","Oezbekistan","Oman","Oostenrijk","Pacific Ocean","Pakistan","Palau","Panama","Papoea-Nieuw-Guinea","Paracel Islands","Paraguay","Peru","Pitcairn","Polen","Portugal","Puerto Rico","Qatar","Roemenië","Rusland","Rwanda","Saint Helena","Saint Lucia","Saint Vincent en de Grenadines","Saint-Pierre en Miquelon","Salomon","Samoa","San Marino","São Tomé en Principe","Saudi-Arabië","Senegal","Servië","Seychellen","Sierra Leone","Singapore","Sint-Kitts en Nevis","Slovenië","Slowakije","Soedan","Somalië","South Georgia and the South Sandwich Islands","Southern Ocean","Spanje","Spratly Islands","Sri Lanka","Suriname","Svalbard","Syrië","Tadzjikistan","Taiwan","Tanzania","Thailand","Timor Leste","Togo","Tokelau","Tonga","Trinidad en Tobago","Tsjaad","Tsjechië","Tunesië","Turkije","Turkmenistan","Turks-en Caicoseilanden","Tuvalu","Uganda","Uruguay","Vanuatu","Venezuela","Verenigd Koninkrijk","Verenigde Arabische Emiraten","Verenigde Staten van Amerika","Vietnam","Wake Island","Wallis en Futuna","Wereld","West Bank","Westelijke Sahara","Zambia","Zimbabwe","Zuid-Afrika","Zuid-Korea","Zweden","Zwitserland"],"default_country":["Nederland"],"postcode":["#### ??"],"secondary_address":["1 hoog","2 hoog","3 hoog"],"state":["Noord-Holland","Zuid-Holland","Utrecht","Zeeland","Overijssel","Gelderland","Drenthe","Friesland","Groningen","Noord-Braband","Limburg"],"street_address":["#{street_name} #{building_number}"],"street_name":["#{Name.first_name}#{street_suffix}","#{Name.last_name}#{street_suffix}"],"street_suffix":["straat","laan","weg","plantsoen","park"]},"company":{"suffix":["BV","V.O.F.","Group","en Zonen"]},"internet":{"domain_suffix":["nl","com","net","org"],"free_email":["gmail.com","yahoo.com","hotmail.com"]},"lorem":{"supplemental":["abbas","abduco","abeo","abscido","absconditus","absens","absorbeo","absque","abstergo","absum","abundans","abutor","accedo","accendo","acceptus","accipio","accommodo","accusator","acer","acerbitas","acervus","acidus","acies","acquiro","acsi","adamo","adaugeo","addo","adduco","ademptio","adeo","adeptio","adfectus","adfero","adficio","adflicto","adhaero","adhuc","adicio","adimpleo","adinventitias","adipiscor","adiuvo","administratio","admiratio","admitto","admoneo","admoveo","adnuo","adopto","adsidue","adstringo","adsuesco","adsum","adulatio","adulescens","adultus","aduro","advenio","adversus","advoco","aedificium","aeger","aegre","aegrotatio","aegrus","aeneus","aequitas","aequus","aer","aestas","aestivus","aestus","aetas","aeternus","ager","aggero","aggredior","agnitio","agnosco","ago","ait","aiunt","alienus","alii","alioqui","aliqua","alius","allatus","alo","alter","altus","alveus","amaritudo","ambitus","ambulo","amicitia","amiculum","amissio","amita","amitto","amo","amor","amoveo","amplexus","amplitudo","amplus","ancilla","angelus","angulus","angustus","animadverto","animi","animus","annus","anser","ante","antea","antepono","antiquus","aperio","aperte","apostolus","apparatus","appello","appono","appositus","approbo","apto","aptus","apud","aqua","ara","aranea","arbitro","arbor","arbustum","arca","arceo","arcesso","arcus","argentum","argumentum","arguo","arma","armarium","armo","aro","ars","articulus","artificiose","arto","arx","ascisco","ascit","asper","aspicio","asporto","assentator","astrum","atavus","ater","atqui","atrocitas","atrox","attero","attollo","attonbitus","auctor","auctus","audacia","audax","audentia","audeo","audio","auditor","aufero","aureus","auris","aurum","aut","autem","autus","auxilium","avaritia","avarus","aveho","averto","avoco","baiulus","balbus","barba","bardus","basium","beatus","bellicus","bellum","bene","beneficium","benevolentia","benigne","bestia","bibo","bis","blandior","bonus","bos","brevis","cado","caecus","caelestis","caelum","calamitas","calcar","calco","calculus","callide","campana","candidus","canis","canonicus","canto","capillus","capio","capitulus","capto","caput","carbo","carcer","careo","caries","cariosus","caritas","carmen","carpo","carus","casso","caste","casus","catena","caterva","cattus","cauda","causa","caute","caveo","cavus","cedo","celebrer","celer","celo","cena","cenaculum","ceno","censura","centum","cerno","cernuus","certe","certo","certus","cervus","cetera","charisma","chirographum","cibo","cibus","cicuta","cilicium","cimentarius","ciminatio","cinis","circumvenio","cito","civis","civitas","clam","clamo","claro","clarus","claudeo","claustrum","clementia","clibanus","coadunatio","coaegresco","coepi","coerceo","cogito","cognatus","cognomen","cogo","cohaero","cohibeo","cohors","colligo","colloco","collum","colo","color","coma","combibo","comburo","comedo","comes","cometes","comis","comitatus","commemoro","comminor","commodo","communis","comparo","compello","complectus","compono","comprehendo","comptus","conatus","concedo","concido","conculco","condico","conduco","confero","confido","conforto","confugo","congregatio","conicio","coniecto","conitor","coniuratio","conor","conqueror","conscendo","conservo","considero","conspergo","constans","consuasor","contabesco","contego","contigo","contra","conturbo","conventus","convoco","copia","copiose","cornu","corona","corpus","correptius","corrigo","corroboro","corrumpo","coruscus","cotidie","crapula","cras","crastinus","creator","creber","crebro","credo","creo","creptio","crepusculum","cresco","creta","cribro","crinis","cruciamentum","crudelis","cruentus","crur","crustulum","crux","cubicularis","cubitum","cubo","cui","cuius","culpa","culpo","cultellus","cultura","cum","cunabula","cunae","cunctatio","cupiditas","cupio","cuppedia","cupressus","cur","cura","curatio","curia","curiositas","curis","curo","curriculum","currus","cursim","curso","cursus","curto","curtus","curvo","curvus","custodia","damnatio","damno","dapifer","debeo","debilito","decens","decerno","decet","decimus","decipio","decor","decretum","decumbo","dedecor","dedico","deduco","defaeco","defendo","defero","defessus","defetiscor","deficio","defigo","defleo","defluo","defungo","degenero","degero","degusto","deinde","delectatio","delego","deleo","delibero","delicate","delinquo","deludo","demens","demergo","demitto","demo","demonstro","demoror","demulceo","demum","denego","denique","dens","denuncio","denuo","deorsum","depereo","depono","depopulo","deporto","depraedor","deprecator","deprimo","depromo","depulso","deputo","derelinquo","derideo","deripio","desidero","desino","desipio","desolo","desparatus","despecto","despirmatio","infit","inflammatio","paens","patior","patria","patrocinor","patruus","pauci","paulatim","pauper","pax","peccatus","pecco","pecto","pectus","pecunia","pecus","peior","pel","ocer","socius","sodalitas","sol","soleo","solio","solitudo","solium","sollers","sollicito","solum","solus","solutio","solvo","somniculosus","somnus","sonitus","sono","sophismata","sopor","sordeo","sortitus","spargo","speciosus","spectaculum","speculum","sperno","spero","spes","spiculum","spiritus","spoliatio","sponte","stabilis","statim","statua","stella","stillicidium","stipes","stips","sto","strenuus","strues","studio","stultus","suadeo","suasoria","sub","subito","subiungo","sublime","subnecto","subseco","substantia","subvenio","succedo","succurro","sufficio","suffoco","suffragium","suggero","sui","sulum","sum","summa","summisse","summopere","sumo","sumptus","supellex","super","suppellex","supplanto","suppono","supra","surculus","surgo","sursum","suscipio","suspendo","sustineo","suus","synagoga","tabella","tabernus","tabesco","tabgo","tabula","taceo","tactus","taedium","talio","talis","talus","tam","tamdiu","tamen","tametsi","tamisium","tamquam","tandem","tantillus","tantum","tardus","tego","temeritas","temperantia","templum","temptatio","tempus","tenax","tendo","teneo","tener","tenuis","tenus","tepesco","tepidus","ter","terebro","teres","terga","tergeo","tergiversatio","tergo","tergum","termes","terminatio","tero","terra","terreo","territo","terror","tersus","tertius","testimonium","texo","textilis","textor","textus","thalassinus","theatrum","theca","thema","theologus","thermae","thesaurus","thesis","thorax","thymbra","thymum","tibi","timidus","timor","titulus","tolero","tollo","tondeo","tonsor","torqueo","torrens","tot","totidem","toties","totus","tracto","trado","traho","trans","tredecim","tremo","trepide","tres","tribuo","tricesimus","triduana","triginta","tripudio","tristis","triumphus","trucido","truculenter","tubineus","tui","tum","tumultus","tunc","turba","turbo","turpe","turpis","tutamen","tutis","tyrannus","uberrime","ubi","ulciscor","ullus","ulterius","ultio","ultra","umbra","umerus","umquam","una","unde","undique","universe","unus","urbanus","urbs","uredo","usitas","usque","ustilo","ustulo","usus","uter","uterque","utilis","utique","utor","utpote","utrimque","utroque","utrum","uxor","vaco","vacuus","vado","vae","valde","valens","valeo","valetudo","validus","vallum","vapulus","varietas","varius","vehemens","vel","velociter","velum","velut","venia","venio","ventito","ventosus","ventus","venustas","ver","verbera","verbum","vere","verecundia","vereor","vergo","veritas","vero","versus","verto","verumtamen","verus","vesco","vesica","vesper","vespillo","vester","vestigium","vestrum","vetus","via","vicinus","vicissitudo","victoria","victus","videlicet","video","viduata","viduo","vigilo","vigor","vilicus","vilis","vilitas","villa","vinco","vinculum","vindico","vinitor","vinum","vir","virga","virgo","viridis","viriliter","virtus","vis","viscus","vita","vitiosus","vitium","vito","vivo","vix","vobis","vociferor","voco","volaticus","volo","volubilis","voluntarius","volup","volutabrum","volva","vomer","vomica","vomito","vorago","vorax","voro","vos","votum","voveo","vox","vulariter","vulgaris","vulgivagus","vulgo","vulgus","vulnero","vulnus","vulpes","vulticulus","vultuosus","xiphias"],"words":["alias","consequatur","aut","perferendis","sit","voluptatem","accusantium","doloremque","aperiam","eaque","ipsa","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt","explicabo","aspernatur","aut","odit","aut","fugit","sed","quia","consequuntur","magni","dolores","eos","qui","ratione","voluptatem","sequi","nesciunt","neque","dolorem","ipsum","quia","dolor","sit","amet","consectetur","adipisci","velit","sed","quia","non","numquam","eius","modi","tempora","incidunt","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem","ut","enim","ad","minima","veniam","quis","nostrum","exercitationem","ullam","corporis","nemo","enim","ipsam","voluptatem","quia","voluptas","sit","suscipit","laboriosam","nisi","ut","aliquid","ex","ea","commodi","consequatur","quis","autem","vel","eum","iure","reprehenderit","qui","in","ea","voluptate","velit","esse","quam","nihil","molestiae","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","laudantium","totam","rem","voluptatum","deleniti","atque","corrupti","quos","dolores","et","quas","molestias","excepturi","sint","occaecati","cupiditate","non","provident","sed","ut","perspiciatis","unde","omnis","iste","natus","error","similique","sunt","in","culpa","qui","officia","deserunt","mollitia","animi","id","est","laborum","et","dolorum","fuga","et","harum","quidem","rerum","facilis","est","et","expedita","distinctio","nam","libero","tempore","cum","soluta","nobis","est","eligendi","optio","cumque","nihil","impedit","quo","porro","quisquam","est","qui","minus","id","quod","maxime","placeat","facere","possimus","omnis","voluptas","assumenda","est","omnis","dolor","repellendus","temporibus","autem","quibusdam","et","aut","consequatur","vel","illum","qui","dolorem","eum","fugiat","quo","voluptas","nulla","pariatur","at","vero","eos","et","accusamus","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet","ut","et","voluptates","repudiandae","sint","et","molestiae","non","recusandae","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus","ut","aut","reiciendis","voluptatibus","maiores","doloribus","asperiores","repellat"]},"name":{"first_name":["Amber","Anna","Anne","Anouk","Bas","Bram","Britt","Daan","Emma","Eva","Femke","Finn","Fleur","Iris","Isa","Jan","Jasper","Jayden","Jesse","Johannes","Julia","Julian","Kevin","Lars","Lieke","Lisa","Lotte","Lucas","Luuk","Maud","Max","Mike","Milan","Nick","Niels","Noa","Rick","Roos","Ruben","Sander","Sanne","Sem","Sophie","Stijn","Sven","Thijs","Thijs","Thomas","Tim","Tom"],"last_name":["Bakker","Beek","Berg","Boer","Bos","Bosch","Brink","Broek","Brouwer","Bruin","Dam","Dekker","Dijk","Dijkstra","Graaf","Groot","Haan","Hendriks","Heuvel","Hoek","Jacobs","Jansen","Janssen","Jong","Klein","Kok","Koning","Koster","Leeuwen","Linden","Maas","Meer","Meijer","Mulder","Peters","Ruiter","Schouten","Smit","Smits","Stichting","Veen","Ven","Vermeulen","Visser","Vliet","Vos","Vries","Wal","Willems","Wit"],"name":["#{prefix} #{first_name} #{last_name}","#{first_name} #{last_name} #{suffix}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{tussenvoegsel} #{last_name}","#{first_name} #{tussenvoegsel} #{last_name}"],"prefix":["Dhr.","Mevr. Dr.","Bsc","Msc","Prof."],"suffix":["Jr.","Sr.","I","II","III","IV","V"],"tussenvoegsel":["van","van de","van den","van 't","van het","de","den"]},"phone_number":{"formats":["(####) ######","##########","06########","06 #### ####"]}}},"pl":{"faker":{"address":{"building_number":["#####","####","###"],"city":["#{city_name}"],"city_name":["Aleksandrów Kujawski","Aleksandrów Łódzki","Alwernia","Andrychów","Annopol","Augustów","Babimost","Baborów","Baranów Sandomierski","Barcin","Barczewo","Bardo","Barlinek","Bartoszyce","Barwice","Bełchatów","Bełżyce","Będzin","Biała","Biała Piska","Biała Podlaska","Biała Rawska","Białobrzegi","Białogard","Biały Bór","Białystok","Biecz","Bielawa","Bielsk Podlaski","Bielsko-Biała","Bieruń","Bierutów","Bieżuń","Biłgoraj","Biskupiec","Bisztynek","Blachownia","Błaszki","Błażowa","Błonie","Bobolice","Bobowa","Bochnia","Bodzentyn","Bogatynia","Boguchwała","Boguszów-Gorce","Bojanowo","Bolesławiec","Bolków","Borek Wielkopolski","Borne Sulinowo","Braniewo","Brańsk","Brodnica","Brok","Brusy","Brwinów","Brzeg","Brzeg Dolny","Brzesko","Brzeszcze","Brześć Kujawski","Brzeziny","Brzostek","Brzozów","Buk","Bukowno","Busko-Zdrój","Bychawa","Byczyna","Bydgoszcz","Bystrzyca Kłodzka","Bytom","Bytom Odrzański","Bytów","Cedynia","Chełm","Chełmek","Chełmno","Chełmża","Chęciny","Chmielnik","Chocianów","Chociwel","Chodecz","Chodzież","Chojna","Chojnice","Chojnów","Choroszcz","Chorzele","Chorzów","Choszczno","Chrzanów","Ciechanowiec","Ciechanów","Ciechocinek","Cieszanów","Cieszyn","Ciężkowice","Cybinka","Czaplinek","Czarna Białostocka","Czarna Woda","Czarne","Czarnków","Czchów","Czechowice-Dziedzice","Czeladź","Czempiń","Czerniejewo","Czersk","Czerwieńsk","Czerwionka-Leszczyny","Częstochowa","Człopa","Człuchów","Czyżew","Ćmielów","Daleszyce","Darłowo","Dąbie","Dąbrowa Białostocka","Dąbrowa Górnicza","Dąbrowa Tarnowska","Debrzno","Dębica","Dęblin","Dębno","Dobczyce","Dobiegniew","Dobra (powiat łobeski)","Dobra (powiat turecki)","Dobre Miasto","Dobrodzień","Dobrzany","Dobrzyń nad Wisłą","Dolsk","Drawno","Drawsko Pomorskie","Drezdenko","Drobin","Drohiczyn","Drzewica","Dukla","Duszniki-Zdrój","Dynów","Działdowo","Działoszyce","Działoszyn","Dzierzgoń","Dzierżoniów","Dziwnów","Elbląg","Ełk","Frampol","Frombork","Garwolin","Gąbin","Gdańsk","Gdynia","Giżycko","Glinojeck","Gliwice","Głogów","Głogów Małopolski","Głogówek","Głowno","Głubczyce","Głuchołazy","Głuszyca","Gniew","Gniewkowo","Gniezno","Gogolin","Golczewo","Goleniów","Golina","Golub-Dobrzyń","Gołańcz","Gołdap","Goniądz","Gorlice","Gorzów Śląski","Gorzów Wielkopolski","Gostynin","Gostyń","Gościno","Gozdnica","Góra","Góra Kalwaria","Górowo Iławeckie","Górzno","Grabów nad Prosną","Grajewo","Grodków","Grodzisk Mazowiecki","Grodzisk Wielkopolski","Grójec","Grudziądz","Grybów","Gryfice","Gryfino","Gryfów Śląski","Gubin","Hajnówka","Halinów","Hel","Hrubieszów","Iława","Iłowa","Iłża","Imielin","Inowrocław","Ińsko","Iwonicz-Zdrój","Izbica Kujawska","Jabłonowo Pomorskie","Janikowo","Janowiec Wielkopolski","Janów Lubelski","Jarocin","Jarosław","Jasień","Jasło","Jastarnia","Jastrowie","Jastrzębie-Zdrój","Jawor","Jaworzno","Jaworzyna Śląska","Jedlicze","Jedlina-Zdrój","Jedwabne","Jelcz-Laskowice","Jelenia Góra","Jeziorany","Jędrzejów","Jordanów","Józefów (powiat biłgorajski)","Józefów (powiat otwocki)","Jutrosin","Kalety","Kalisz","Kalisz Pomorski","Kalwaria Zebrzydowska","Kałuszyn","Kamienna Góra","Kamień Krajeński","Kamień Pomorski","Kamieńsk","Kańczuga","Karczew","Kargowa","Karlino","Karpacz","Kartuzy","Katowice","Kazimierz Dolny","Kazimierza Wielka","Kąty Wrocławskie","Kcynia","Kędzierzyn-Koźle","Kępice","Kępno","Kętrzyn","Kęty","Kielce","Kietrz","Kisielice","Kleczew","Kleszczele","Kluczbork","Kłecko","Kłobuck","Kłodawa","Kłodzko","Knurów","Knyszyn","Kobylin","Kobyłka","Kock","Kolbuszowa","Kolno","Kolonowskie","Koluszki","Kołaczyce","Koło","Kołobrzeg","Koniecpol","Konin","Konstancin-Jeziorna","Konstantynów Łódzki","Końskie","Koprzywnica","Korfantów","Koronowo","Korsze","Kosów Lacki","Kostrzyn","Kostrzyn nad Odrą","Koszalin","Kościan","Kościerzyna","Kowal","Kowalewo Pomorskie","Kowary","Koziegłowy","Kozienice","Koźmin Wielkopolski","Kożuchów","Kórnik","Krajenka","Kraków","Krapkowice","Krasnobród","Krasnystaw","Kraśnik","Krobia","Krosno","Krosno Odrzańskie","Krośniewice","Krotoszyn","Kruszwica","Krynica Morska","Krynica-Zdrój","Krynki","Krzanowice","Krzepice","Krzeszowice","Krzywiń","Krzyż Wielkopolski","Książ Wielkopolski","Kudowa-Zdrój","Kunów","Kutno","Kuźnia Raciborska","Kwidzyn","Lądek-Zdrój","Legionowo","Legnica","Lesko","Leszno","Leśna","Leśnica","Lewin Brzeski","Leżajsk","Lębork","Lędziny","Libiąż","Lidzbark","Lidzbark Warmiński","Limanowa","Lipiany","Lipno","Lipsk","Lipsko","Lubaczów","Lubań","Lubartów","Lubawa","Lubawka","Lubień Kujawski","Lubin","Lublin","Lubliniec","Lubniewice","Lubomierz","Luboń","Lubraniec","Lubsko","Lwówek","Lwówek Śląski","Łabiszyn","Łańcut","Łapy","Łasin","Łask","Łaskarzew","Łaszczów","Łaziska Górne","Łazy","Łeba","Łęczna","Łęczyca","Łęknica","Łobez","Łobżenica","Łochów","Łomianki","Łomża","Łosice","Łowicz","Łódź","Łuków","Maków Mazowiecki","Maków Podhalański","Malbork","Małogoszcz","Małomice","Margonin","Marki","Maszewo","Miasteczko Śląskie","Miastko","Michałowo","Miechów","Miejska Górka","Mielec","Mieroszów","Mieszkowice","Międzybórz","Międzychód","Międzylesie","Międzyrzec Podlaski","Międzyrzecz","Międzyzdroje","Mikołajki","Mikołów","Mikstat","Milanówek","Milicz","Miłakowo","Miłomłyn","Miłosław","Mińsk Mazowiecki","Mirosławiec","Mirsk","Mława","Młynary","Mogielnica","Mogilno","Mońki","Morąg","Mordy","Moryń","Mosina","Mrągowo","Mrocza","Mszana Dolna","Mszczonów","Murowana Goślina","Muszyna","Mysłowice","Myszków","Myszyniec","Myślenice","Myślibórz","Nakło nad Notecią","Nałęczów","Namysłów","Narol","Nasielsk","Nekla","Nidzica","Niemcza","Niemodlin","Niepołomice","Nieszawa","Nisko","Nowa Dęba","Nowa Ruda","Nowa Sarzyna","Nowa Sól","Nowe","Nowe Brzesko","Nowe Miasteczko","Nowe Miasto Lubawskie","Nowe Miasto nad Pilicą","Nowe Skalmierzyce","Nowe Warpno","Nowogard","Nowogrodziec","Nowogród","Nowogród Bobrzański","Nowy Dwór Gdański","Nowy Dwór Mazowiecki","Nowy Sącz","Nowy Staw","Nowy Targ","Nowy Tomyśl","Nowy Wiśnicz","Nysa","Oborniki","Oborniki Śląskie","Obrzycko","Odolanów","Ogrodzieniec","Okonek","Olecko","Olesno","Oleszyce","Oleśnica","Olkusz","Olsztyn","Olsztynek","Olszyna","Oława","Opalenica","Opatów","Opoczno","Opole","Opole Lubelskie","Orneta","Orzesze","Orzysz","Osieczna","Osiek","Ostrołęka","Ostroróg","Ostrowiec Świętokrzyski","Ostróda","Ostrów Lubelski","Ostrów Mazowiecka","Ostrów Wielkopolski","Ostrzeszów","Ośno Lubuskie","Oświęcim","Otmuchów","Otwock","Ozimek","Ozorków","Ożarów","Ożarów Mazowiecki","Pabianice","Paczków","Pajęczno","Pakość","Parczew","Pasłęk","Pasym","Pelplin","Pełczyce","Piaseczno","Piaski","Piastów","Piechowice","Piekary Śląskie","Pieniężno","Pieńsk","Pieszyce","Pilawa","Pilica","Pilzno","Piła","Piława Górna","Pińczów","Pionki","Piotrków Kujawski","Piotrków Trybunalski","Pisz","Piwniczna-Zdrój","Pleszew","Płock","Płońsk","Płoty","Pniewy","Pobiedziska","Poddębice","Podkowa Leśna","Pogorzela","Polanica-Zdrój","Polanów","Police","Polkowice","Połaniec","Połczyn-Zdrój","Poniatowa","Poniec","Poręba","Poznań","Prabuty","Praszka","Prochowice","Proszowice","Prószków","Pruchnik","Prudnik","Prusice","Pruszcz Gdański","Pruszków","Przasnysz","Przecław","Przedbórz","Przedecz","Przemków","Przemyśl","Przeworsk","Przysucha","Pszczyna","Pszów","Puck","Puławy","Pułtusk","Puszczykowo","Pyrzyce","Pyskowice","Pyzdry","Rabka-Zdrój","Raciąż","Racibórz","Radków","Radlin","Radłów","Radom","Radomsko","Radomyśl Wielki","Radymno","Radziejów","Radzionków","Radzymin","Radzyń Chełmiński","Radzyń Podlaski","Rajgród","Rakoniewice","Raszków","Rawa Mazowiecka","Rawicz","Recz","Reda","Rejowiec Fabryczny","Resko","Reszel","Rogoźno","Ropczyce","Różan","Ruciane-Nida","Ruda Śląska","Rudnik nad Sanem","Rumia","Rybnik","Rychwał","Rydułtowy","Rydzyna","Ryglice","Ryki","Rymanów","Ryn","Rypin","Rzepin","Rzeszów","Rzgów","Sandomierz","Sanok","Sejny","Serock","Sędziszów","Sędziszów Małopolski","Sępopol","Sępólno Krajeńskie","Sianów","Siechnice","Siedlce","Siemianowice Śląskie","Siemiatycze","Sieniawa","Sieradz","Sieraków","Sierpc","Siewierz","Skalbmierz","Skała","Skarszewy","Skaryszew","Skarżysko-Kamienna","Skawina","Skępe","Skierniewice","Skoczów","Skoki","Skórcz","Skwierzyna","Sława","Sławków","Sławno","Słomniki","Słubice","Słupca","Słupsk","Sobótka","Sochaczew","Sokołów Małopolski","Sokołów Podlaski","Sokółka","Solec Kujawski","Sompolno","Sopot","Sosnowiec","Sośnicowice","Stalowa Wola","Starachowice","Stargard Szczeciński","Starogard Gdański","Stary Sącz","Staszów","Stawiski","Stawiszyn","Stąporków","Stęszew","Stoczek Łukowski","Stronie Śląskie","Strumień","Stryków","Strzegom","Strzelce Krajeńskie","Strzelce Opolskie","Strzelin","Strzelno","Strzyżów","Sucha Beskidzka","Suchań","Suchedniów","Suchowola","Sulechów","Sulejów","Sulejówek","Sulęcin","Sulmierzyce","Sułkowice","Supraśl","Suraż","Susz","Suwałki","Swarzędz","Syców","Szadek","Szamocin","Szamotuły","Szczawnica","Szczawno-Zdrój","Szczebrzeszyn","Szczecin","Szczecinek","Szczekociny","Szczucin","Szczuczyn","Szczyrk","Szczytna","Szczytno","Szepietowo","Szklarska Poręba","Szlichtyngowa","Szprotawa","Sztum","Szubin","Szydłowiec","Ścinawa","Ślesin","Śmigiel","Śrem","Środa Śląska","Środa Wielkopolska","Świątniki Górne","Świdnica","Świdnik","Świdwin","Świebodzice","Świebodzin","Świecie","Świeradów-Zdrój","Świerzawa","Świętochłowice","Świnoujście","Tarczyn","Tarnobrzeg","Tarnogród","Tarnowskie Góry","Tarnów","Tczew","Terespol","Tłuszcz","Tolkmicko","Tomaszów Lubelski","Tomaszów Mazowiecki","Toruń","Torzym","Toszek","Trzcianka","Trzciel","Trzcińsko-Zdrój","Trzebiatów","Trzebinia","Trzebnica","Trzemeszno","Tuchola","Tuchów","Tuczno","Tuliszków","Turek","Tuszyn","Twardogóra","Tychowo","Tychy","Tyczyn","Tykocin","Tyszowce","Ujazd","Ujście","Ulanów","Uniejów","Ustka","Ustroń","Ustrzyki Dolne","Wadowice","Wałbrzych","Wałcz","Warka","Warszawa","Warta","Wasilków","Wąbrzeźno","Wąchock","Wągrowiec","Wąsosz","Wejherowo","Węgliniec","Węgorzewo","Węgorzyno","Węgrów","Wiązów","Wieleń","Wielichowo","Wieliczka","Wieluń","Wieruszów","Więcbork","Wilamowice","Wisła","Witkowo","Witnica","Wleń","Władysławowo","Włocławek","Włodawa","Włoszczowa","Wodzisław Śląski","Wojcieszów","Wojkowice","Wojnicz","Wolbórz","Wolbrom","Wolin","Wolsztyn","Wołczyn","Wołomin","Wołów","Woźniki","Wrocław","Wronki","Września","Wschowa","Wyrzysk","Wysoka","Wysokie Mazowieckie","Wyszków","Wyszogród","Wyśmierzyce","Zabłudów","Zabrze","Zagórów","Zagórz","Zakliczyn","Zakopane","Zakroczym","Zalewo","Zambrów","Zamość","Zator","Zawadzkie","Zawichost","Zawidów","Zawiercie","Ząbki","Ząbkowice Śląskie","Zbąszynek","Zbąszyń","Zduny","Zduńska Wola","Zdzieszowice","Zelów","Zgierz","Zgorzelec","Zielona Góra","Zielonka","Ziębice","Złocieniec","Złoczew","Złotoryja","Złotów","Złoty Stok","Zwierzyniec","Zwoleń","Żabno","Żagań","Żarki","Żarów","Żary","Żelechów","Żerków","Żmigród","Żnin","Żory","Żukowo","Żuromin","Żychlin","Żyrardów","Żywiec"],"country":["Afganistan","Albania","Algieria","Andora","Angola","Antigua i Barbuda","Arabia Saudyjska","Argentyna","Armenia","Australia","Austria","Azerbejdżan","Bahamy","Bahrajn","Bangladesz","Barbados","Belgia","Belize","Benin","Bhutan","Białoruś","Birma","Boliwia","Sucre","Bośnia i Hercegowina","Botswana","Brazylia","Brunei","Bułgaria","Burkina Faso","Burundi","Chile","Chiny","Chorwacja","Cypr","Czad","Czarnogóra","Czechy","Dania","Demokratyczna Republika Konga","Dominika","Dominikana","Dżibuti","Egipt","Ekwador","Erytrea","Estonia","Etiopia","Fidżi","Filipiny","Finlandia","Francja","Gabon","Gambia","Ghana","Grecja","Grenada","Gruzja","Gujana","Gwatemala","Gwinea","Gwinea Bissau","Gwinea Równikowa","Haiti","Hiszpania","Holandia","Haga","Honduras","Indie","Indonezja","Irak","Iran","Irlandia","Islandia","Izrael","Jamajka","Japonia","Jemen","Jordania","Kambodża","Kamerun","Kanada","Katar","Kazachstan","Kenia","Kirgistan","Kiribati","Kolumbia","Komory","Kongo","Korea Południowa","Korea Północna","Kostaryka","Kuba","Kuwejt","Laos","Lesotho","Liban","Liberia","Libia","Liechtenstein","Litwa","Luksemburg","Łotwa","Macedonia","Madagaskar","Malawi","Malediwy","Malezja","Mali","Malta","Maroko","Mauretania","Mauritius","Meksyk","Mikronezja","Mołdawia","Monako","Mongolia","Mozambik","Namibia","Nauru","Nepal","Niemcy","Niger","Nigeria","Nikaragua","Norwegia","Nowa Zelandia","Oman","Pakistan","Palau","Panama","Papua-Nowa Gwinea","Paragwaj","Peru","Polska","322 575","Portugalia","Republika Południowej Afryki","Republika Środkowoafrykańska","Republika Zielonego Przylądka","Rosja","Rumunia","Rwanda","Saint Kitts i Nevis","Saint Lucia","Saint Vincent i Grenadyny","Salwador","Samoa","San Marino","Senegal","Serbia","Seszele","Sierra Leone","Singapur","Słowacja","Słowenia","Somalia","Sri Lanka","Stany Zjednoczone","Suazi","Sudan","Sudan Południowy","Surinam","Syria","Szwajcaria","Szwecja","Tadżykistan","Tajlandia","Tanzania","Timor Wschodni","Togo","Tonga","Trynidad i Tobago","Tunezja","Turcja","Turkmenistan","Tuvalu","Funafuti","Uganda","Ukraina","Urugwaj",2008,"Uzbekistan","Vanuatu","Watykan","Wenezuela","Węgry","Wielka Brytania","Wietnam","Włochy","Wybrzeże Kości Słoniowej","Wyspy Marshalla","Wyspy Salomona","Wyspy Świętego Tomasza i Książęca","Zambia","Zimbabwe","Zjednoczone Emiraty Arabskie"],"default_country":["Polska"],"postcode":["##-###"],"secondary_address":["Apt. ###","Suite ###"],"state":["Dolnośląskie","Kujawsko-pomorskie","Lubelskie","Lubuskie","Łódzkie","Małopolskie","Mazowieckie","Opolskie","Podkarpackie","Podlaskie","Pomorskie","Śląskie","Świętokrzyskie","Warmińsko-mazurskie","Wielkopolskie","Zachodniopomorskie"],"state_abbr":["DŚ","KP","LB","LS","ŁD","MP","MZ","OP","PK","PL","PM","ŚL","ŚK","WM","WP","ZP"],"street_address":["#{street_name} #{building_number}"],"street_name":["#{street_prefix} #{Name.last_name}"],"street_prefix":["ul.","al."]},"cell_phone":{"formats":["50-###-##-##","51-###-##-##","53-###-##-##","57-###-##-##","60-###-##-##","66-###-##-##","69-###-##-##","72-###-##-##","73-###-##-##","78-###-##-##","79-###-##-##","88-###-##-##"]},"company":{"bs":[["implement","utilize","integrate","streamline","optimize","evolve","transform","embrace","enable","orchestrate","leverage","reinvent","aggregate","architect","enhance","incentivize","morph","empower","envisioneer","monetize","harness","facilitate","seize","disintermediate","synergize","strategize","deploy","brand","grow","target","syndicate","synthesize","deliver","mesh","incubate","engage","maximize","benchmark","expedite","reintermediate","whiteboard","visualize","repurpose","innovate","scale","unleash","drive","extend","engineer","revolutionize","generate","exploit","transition","e-enable","iterate","cultivate","matrix","productize","redefine","recontextualize"],["clicks-and-mortar","value-added","vertical","proactive","robust","revolutionary","scalable","leading-edge","innovative","intuitive","strategic","e-business","mission-critical","sticky","one-to-one","24/7","end-to-end","global","B2B","B2C","granular","frictionless","virtual","viral","dynamic","24/365","best-of-breed","killer","magnetic","bleeding-edge","web-enabled","interactive","dot-com","sexy","back-end","real-time","efficient","front-end","distributed","seamless","extensible","turn-key","world-class","open-source","cross-platform","cross-media","synergistic","bricks-and-clicks","out-of-the-box","enterprise","integrated","impactful","wireless","transparent","next-generation","cutting-edge","user-centric","visionary","customized","ubiquitous","plug-and-play","collaborative","compelling","holistic","rich"],["synergies","web-readiness","paradigms","markets","partnerships","infrastructures","platforms","initiatives","channels","eyeballs","communities","ROI","solutions","e-tailers","e-services","action-items","portals","niches","technologies","content","vortals","supply-chains","convergence","relationships","architectures","interfaces","e-markets","e-commerce","systems","bandwidth","infomediaries","models","mindshare","deliverables","users","schemas","networks","applications","metrics","e-business","functionalities","experiences","web services","methodologies"]],"buzzwords":[["Adaptive","Advanced","Ameliorated","Assimilated","Automated","Balanced","Business-focused","Centralized","Cloned","Compatible","Configurable","Cross-group","Cross-platform","Customer-focused","Customizable","Decentralized","De-engineered","Devolved","Digitized","Distributed","Diverse","Down-sized","Enhanced","Enterprise-wide","Ergonomic","Exclusive","Expanded","Extended","Face to face","Focused","Front-line","Fully-configurable","Function-based","Fundamental","Future-proofed","Grass-roots","Horizontal","Implemented","Innovative","Integrated","Intuitive","Inverse","Managed","Mandatory","Monitored","Multi-channelled","Multi-lateral","Multi-layered","Multi-tiered","Networked","Object-based","Open-architected","Open-source","Operative","Optimized","Optional","Organic","Organized","Persevering","Persistent","Phased","Polarised","Pre-emptive","Proactive","Profit-focused","Profound","Programmable","Progressive","Public-key","Quality-focused","Reactive","Realigned","Re-contextualized","Re-engineered","Reduced","Reverse-engineered","Right-sized","Robust","Seamless","Secured","Self-enabling","Sharable","Stand-alone","Streamlined","Switchable","Synchronised","Synergistic","Synergized","Team-oriented","Total","Triple-buffered","Universal","Up-sized","Upgradable","User-centric","User-friendly","Versatile","Virtual","Visionary","Vision-oriented"],["24 hour","24/7","3rd generation","4th generation","5th generation","6th generation","actuating","analyzing","asymmetric","asynchronous","attitude-oriented","background","bandwidth-monitored","bi-directional","bifurcated","bottom-line","clear-thinking","client-driven","client-server","coherent","cohesive","composite","context-sensitive","contextually-based","content-based","dedicated","demand-driven","didactic","directional","discrete","disintermediate","dynamic","eco-centric","empowering","encompassing","even-keeled","executive","explicit","exuding","fault-tolerant","foreground","fresh-thinking","full-range","global","grid-enabled","heuristic","high-level","holistic","homogeneous","human-resource","hybrid","impactful","incremental","intangible","interactive","intermediate","leading edge","local","logistical","maximized","methodical","mission-critical","mobile","modular","motivating","multimedia","multi-state","multi-tasking","national","needs-based","neutral","next generation","non-volatile","object-oriented","optimal","optimizing","radical","real-time","reciprocal","regional","responsive","scalable","secondary","solution-oriented","stable","static","systematic","systemic","system-worthy","tangible","tertiary","transitional","uniform","upward-trending","user-facing","value-added","web-enabled","well-modulated","zero administration","zero defect","zero tolerance"],["ability","access","adapter","algorithm","alliance","analyzer","application","approach","architecture","archive","artificial intelligence","array","attitude","benchmark","budgetary management","capability","capacity","challenge","circuit","collaboration","complexity","concept","conglomeration","contingency","core","customer loyalty","database","data-warehouse","definition","emulation","encoding","encryption","extranet","firmware","flexibility","focus group","forecast","frame","framework","function","functionalities","Graphic Interface","groupware","Graphical User Interface","hardware","help-desk","hierarchy","hub","implementation","info-mediaries","infrastructure","initiative","installation","instruction set","interface","internet solution","intranet","knowledge user","knowledge base","local area network","leverage","matrices","matrix","methodology","middleware","migration","model","moderator","monitoring","moratorium","neural-net","open architecture","open system","orchestration","paradigm","parallelism","policy","portal","pricing structure","process improvement","product","productivity","project","projection","protocol","secured line","service-desk","software","solution","standardization","strategy","structure","success","superstructure","support","synergy","system engine","task-force","throughput","time-frame","toolset","utilisation","website","workforce"]],"name":["#{Name.last_name} #{suffix}","#{Name.last_name}-#{Name.last_name}","#{Name.last_name}, #{Name.last_name} and #{Name.last_name}"],"suffix":["Inc","and Sons","LLC","Group"]},"internet":{"domain_suffix":["com","pl","com.pl","net","org"],"free_email":["gmail.com","yahoo.com","hotmail.com"]},"lorem":{"supplemental":["abbas","abduco","abeo","abscido","absconditus","absens","absorbeo","absque","abstergo","absum","abundans","abutor","accedo","accendo","acceptus","accipio","accommodo","accusator","acer","acerbitas","acervus","acidus","acies","acquiro","acsi","adamo","adaugeo","addo","adduco","ademptio","adeo","adeptio","adfectus","adfero","adficio","adflicto","adhaero","adhuc","adicio","adimpleo","adinventitias","adipiscor","adiuvo","administratio","admiratio","admitto","admoneo","admoveo","adnuo","adopto","adsidue","adstringo","adsuesco","adsum","adulatio","adulescens","adultus","aduro","advenio","adversus","advoco","aedificium","aeger","aegre","aegrotatio","aegrus","aeneus","aequitas","aequus","aer","aestas","aestivus","aestus","aetas","aeternus","ager","aggero","aggredior","agnitio","agnosco","ago","ait","aiunt","alienus","alii","alioqui","aliqua","alius","allatus","alo","alter","altus","alveus","amaritudo","ambitus","ambulo","amicitia","amiculum","amissio","amita","amitto","amo","amor","amoveo","amplexus","amplitudo","amplus","ancilla","angelus","angulus","angustus","animadverto","animi","animus","annus","anser","ante","antea","antepono","antiquus","aperio","aperte","apostolus","apparatus","appello","appono","appositus","approbo","apto","aptus","apud","aqua","ara","aranea","arbitro","arbor","arbustum","arca","arceo","arcesso","arcus","argentum","argumentum","arguo","arma","armarium","armo","aro","ars","articulus","artificiose","arto","arx","ascisco","ascit","asper","aspicio","asporto","assentator","astrum","atavus","ater","atqui","atrocitas","atrox","attero","attollo","attonbitus","auctor","auctus","audacia","audax","audentia","audeo","audio","auditor","aufero","aureus","auris","aurum","aut","autem","autus","auxilium","avaritia","avarus","aveho","averto","avoco","baiulus","balbus","barba","bardus","basium","beatus","bellicus","bellum","bene","beneficium","benevolentia","benigne","bestia","bibo","bis","blandior","bonus","bos","brevis","cado","caecus","caelestis","caelum","calamitas","calcar","calco","calculus","callide","campana","candidus","canis","canonicus","canto","capillus","capio","capitulus","capto","caput","carbo","carcer","careo","caries","cariosus","caritas","carmen","carpo","carus","casso","caste","casus","catena","caterva","cattus","cauda","causa","caute","caveo","cavus","cedo","celebrer","celer","celo","cena","cenaculum","ceno","censura","centum","cerno","cernuus","certe","certo","certus","cervus","cetera","charisma","chirographum","cibo","cibus","cicuta","cilicium","cimentarius","ciminatio","cinis","circumvenio","cito","civis","civitas","clam","clamo","claro","clarus","claudeo","claustrum","clementia","clibanus","coadunatio","coaegresco","coepi","coerceo","cogito","cognatus","cognomen","cogo","cohaero","cohibeo","cohors","colligo","colloco","collum","colo","color","coma","combibo","comburo","comedo","comes","cometes","comis","comitatus","commemoro","comminor","commodo","communis","comparo","compello","complectus","compono","comprehendo","comptus","conatus","concedo","concido","conculco","condico","conduco","confero","confido","conforto","confugo","congregatio","conicio","coniecto","conitor","coniuratio","conor","conqueror","conscendo","conservo","considero","conspergo","constans","consuasor","contabesco","contego","contigo","contra","conturbo","conventus","convoco","copia","copiose","cornu","corona","corpus","correptius","corrigo","corroboro","corrumpo","coruscus","cotidie","crapula","cras","crastinus","creator","creber","crebro","credo","creo","creptio","crepusculum","cresco","creta","cribro","crinis","cruciamentum","crudelis","cruentus","crur","crustulum","crux","cubicularis","cubitum","cubo","cui","cuius","culpa","culpo","cultellus","cultura","cum","cunabula","cunae","cunctatio","cupiditas","cupio","cuppedia","cupressus","cur","cura","curatio","curia","curiositas","curis","curo","curriculum","currus","cursim","curso","cursus","curto","curtus","curvo","curvus","custodia","damnatio","damno","dapifer","debeo","debilito","decens","decerno","decet","decimus","decipio","decor","decretum","decumbo","dedecor","dedico","deduco","defaeco","defendo","defero","defessus","defetiscor","deficio","defigo","defleo","defluo","defungo","degenero","degero","degusto","deinde","delectatio","delego","deleo","delibero","delicate","delinquo","deludo","demens","demergo","demitto","demo","demonstro","demoror","demulceo","demum","denego","denique","dens","denuncio","denuo","deorsum","depereo","depono","depopulo","deporto","depraedor","deprecator","deprimo","depromo","depulso","deputo","derelinquo","derideo","deripio","desidero","desino","desipio","desolo","desparatus","despecto","despirmatio","infit","inflammatio","paens","patior","patria","patrocinor","patruus","pauci","paulatim","pauper","pax","peccatus","pecco","pecto","pectus","pecunia","pecus","peior","pel","ocer","socius","sodalitas","sol","soleo","solio","solitudo","solium","sollers","sollicito","solum","solus","solutio","solvo","somniculosus","somnus","sonitus","sono","sophismata","sopor","sordeo","sortitus","spargo","speciosus","spectaculum","speculum","sperno","spero","spes","spiculum","spiritus","spoliatio","sponte","stabilis","statim","statua","stella","stillicidium","stipes","stips","sto","strenuus","strues","studio","stultus","suadeo","suasoria","sub","subito","subiungo","sublime","subnecto","subseco","substantia","subvenio","succedo","succurro","sufficio","suffoco","suffragium","suggero","sui","sulum","sum","summa","summisse","summopere","sumo","sumptus","supellex","super","suppellex","supplanto","suppono","supra","surculus","surgo","sursum","suscipio","suspendo","sustineo","suus","synagoga","tabella","tabernus","tabesco","tabgo","tabula","taceo","tactus","taedium","talio","talis","talus","tam","tamdiu","tamen","tametsi","tamisium","tamquam","tandem","tantillus","tantum","tardus","tego","temeritas","temperantia","templum","temptatio","tempus","tenax","tendo","teneo","tener","tenuis","tenus","tepesco","tepidus","ter","terebro","teres","terga","tergeo","tergiversatio","tergo","tergum","termes","terminatio","tero","terra","terreo","territo","terror","tersus","tertius","testimonium","texo","textilis","textor","textus","thalassinus","theatrum","theca","thema","theologus","thermae","thesaurus","thesis","thorax","thymbra","thymum","tibi","timidus","timor","titulus","tolero","tollo","tondeo","tonsor","torqueo","torrens","tot","totidem","toties","totus","tracto","trado","traho","trans","tredecim","tremo","trepide","tres","tribuo","tricesimus","triduana","triginta","tripudio","tristis","triumphus","trucido","truculenter","tubineus","tui","tum","tumultus","tunc","turba","turbo","turpe","turpis","tutamen","tutis","tyrannus","uberrime","ubi","ulciscor","ullus","ulterius","ultio","ultra","umbra","umerus","umquam","una","unde","undique","universe","unus","urbanus","urbs","uredo","usitas","usque","ustilo","ustulo","usus","uter","uterque","utilis","utique","utor","utpote","utrimque","utroque","utrum","uxor","vaco","vacuus","vado","vae","valde","valens","valeo","valetudo","validus","vallum","vapulus","varietas","varius","vehemens","vel","velociter","velum","velut","venia","venio","ventito","ventosus","ventus","venustas","ver","verbera","verbum","vere","verecundia","vereor","vergo","veritas","vero","versus","verto","verumtamen","verus","vesco","vesica","vesper","vespillo","vester","vestigium","vestrum","vetus","via","vicinus","vicissitudo","victoria","victus","videlicet","video","viduata","viduo","vigilo","vigor","vilicus","vilis","vilitas","villa","vinco","vinculum","vindico","vinitor","vinum","vir","virga","virgo","viridis","viriliter","virtus","vis","viscus","vita","vitiosus","vitium","vito","vivo","vix","vobis","vociferor","voco","volaticus","volo","volubilis","voluntarius","volup","volutabrum","volva","vomer","vomica","vomito","vorago","vorax","voro","vos","votum","voveo","vox","vulariter","vulgaris","vulgivagus","vulgo","vulgus","vulnero","vulnus","vulpes","vulticulus","vultuosus","xiphias"],"words":["alias","consequatur","aut","perferendis","sit","voluptatem","accusantium","doloremque","aperiam","eaque","ipsa","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt","explicabo","aspernatur","aut","odit","aut","fugit","sed","quia","consequuntur","magni","dolores","eos","qui","ratione","voluptatem","sequi","nesciunt","neque","dolorem","ipsum","quia","dolor","sit","amet","consectetur","adipisci","velit","sed","quia","non","numquam","eius","modi","tempora","incidunt","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem","ut","enim","ad","minima","veniam","quis","nostrum","exercitationem","ullam","corporis","nemo","enim","ipsam","voluptatem","quia","voluptas","sit","suscipit","laboriosam","nisi","ut","aliquid","ex","ea","commodi","consequatur","quis","autem","vel","eum","iure","reprehenderit","qui","in","ea","voluptate","velit","esse","quam","nihil","molestiae","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","laudantium","totam","rem","voluptatum","deleniti","atque","corrupti","quos","dolores","et","quas","molestias","excepturi","sint","occaecati","cupiditate","non","provident","sed","ut","perspiciatis","unde","omnis","iste","natus","error","similique","sunt","in","culpa","qui","officia","deserunt","mollitia","animi","id","est","laborum","et","dolorum","fuga","et","harum","quidem","rerum","facilis","est","et","expedita","distinctio","nam","libero","tempore","cum","soluta","nobis","est","eligendi","optio","cumque","nihil","impedit","quo","porro","quisquam","est","qui","minus","id","quod","maxime","placeat","facere","possimus","omnis","voluptas","assumenda","est","omnis","dolor","repellendus","temporibus","autem","quibusdam","et","aut","consequatur","vel","illum","qui","dolorem","eum","fugiat","quo","voluptas","nulla","pariatur","at","vero","eos","et","accusamus","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet","ut","et","voluptates","repudiandae","sint","et","molestiae","non","recusandae","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus","ut","aut","reiciendis","voluptatibus","maiores","doloribus","asperiores","repellat"]},"name":{"first_name":["Aaron","Abraham","Adam","Adrian","Atanazy","Agaton","Alan","Albert","Aleksander","Aleksy","Alfred","Alwar","Ambroży","Anatol","Andrzej","Antoni","Apollinary","Apollo","Arkady","Arkadiusz","Archibald","Arystarch","Arnold","Arseniusz","Artur","August","Baldwin","Bazyli","Benedykt","Beniamin","Bernard","Bertrand","Bertram","Borys","Brajan","Bruno","Cezary","Cecyliusz","Karol","Krystian","Krzysztof","Klarencjusz","Klaudiusz","Klemens","Konrad","Konstanty","Konstantyn","Kornel","Korneliusz","Korneli","Cyryl","Cyrus","Damian","Daniel","Dariusz","Dawid","Dionizy","Demetriusz","Dominik","Donald","Dorian","Edgar","Edmund","Edward","Edwin","Efrem","Efraim","Eliasz","Eleazar","Emil","Emanuel","Erast","Ernest","Eugeniusz","Eustracjusz","Fabian","Feliks","Florian","Franciszek","Fryderyk","Gabriel","Gedeon","Galfryd","Jerzy","Gerald","Gerazym","Gilbert","Gonsalwy","Grzegorz","Gwido","Harald","Henryk","Herbert","Herman","Hilary","Horacy","Hubert","Hugo","Ignacy","Igor","Hilarion","Innocenty","Hipolit","Ireneusz","Erwin","Izaak","Izajasz","Izydor","Jakub","Jeremi","Jeremiasz","Hieronim","Gerald","Joachim","Jan","Janusz","Jonatan","Józef","Jozue","Julian","Juliusz","Justyn","Kalistrat","Kazimierz","Wawrzyniec","Laurenty","Laurencjusz","Łazarz","Leon","Leonard","Leonid","Leon","Ludwik","Łukasz","Lucjan","Magnus","Makary","Marceli","Marek","Marcin","Mateusz","Maurycy","Maksym","Maksymilian","Michał","Miron","Modest","Mojżesz","Natan","Natanael","Nazariusz","Nazary","Nestor","Mikołaj","Nikodem","Olaf","Oleg","Oliwier","Onufry","Orestes","Oskar","Ansgary","Osmund","Pankracy","Pantaleon","Patryk","Patrycjusz","Patrycy","Paweł","Piotr","Filemon","Filip","Platon","Polikarp","Porfiry","Porfiriusz","Prokles","Prokul","Prokop","Kwintyn","Randolf","Rafał","Rajmund","Reginald","Rajnold","Ryszard","Robert","Roderyk","Roger","Roland","Roman","Romeo","Reginald","Rudolf","Samson","Samuel","Salwator","Sebastian","Serafin","Sergiusz","Seweryn","Zygmunt","Sylwester","Szymon","Salomon","Spirydion","Stanisław","Szczepan","Stefan","Terencjusz","Teodor","Tomasz","Tymoteusz","Tobiasz","Walenty","Walentyn","Walerian","Walery","Wiktor","Wincenty","Witalis","Włodzimierz","Władysław","Błażej","Walter","Walgierz","Wacław","Wilfryd","Wilhelm","Ksawery","Ksenofont","Jerzy","Zachariasz","Zachary","Ada","Adelajda","Agata","Agnieszka","Agrypina","Aida","Aleksandra","Alicja","Alina","Amanda","Anastazja","Angela","Andżelika","Angelina","Anna","Hanna","—","Antonina","Ariadna","Aurora","Barbara","Beatrycze","Berta","Brygida","Kamila","Karolina","Karolina","Kornelia","Katarzyna","Cecylia","Karolina","Chloe","Krystyna","Klara","Klaudia","Klementyna","Konstancja","Koralia","Daria","Diana","Dina","Dorota","Edyta","Eleonora","Eliza","Elżbieta","Izabela","Elwira","Emilia","Estera","Eudoksja","Eudokia","Eugenia","Ewa","Ewelina","Ferdynanda","Florencja","Franciszka","Gabriela","Gertruda","Gloria","Gracja","Jadwiga","Helena","Henryka","Nadzieja","Ida","Ilona","Helena","Irena","Irma","Izabela","Izolda","Jakubina","Joanna","Janina","Żaneta","Joanna","Ginewra","Józefina","Judyta","Julia","Julia","Julita","Justyna","Kira","Cyra","Kleopatra","Larysa","Laura","Laurencja","Laurentyna","Lea","Leila","Eleonora","Liliana","Lilianna","Lilia","Lilla","Liza","Eliza","Laura","Ludwika","Luiza","Łucja","Lucja","Lidia","Amabela","Magdalena","Malwina","Małgorzata","Greta","Marianna","Maryna","Marta","Martyna","Maria","Matylda","Maja","Maja","Melania","Michalina","Monika","Nadzieja","Noemi","Natalia","Nikola","Nina","Olga","Olimpia","Oliwia","Ofelia","Patrycja","Paula","Pelagia","Penelopa","Filipa","Paulina","Rachela","Rebeka","Regina","Renata","Rozalia","Róża","Roksana","Rufina","Ruta","Sabina","Sara","Serafina","Sybilla","Sylwia","Zofia","Stella","Stefania","Zuzanna","Tamara","Tacjana","Tekla","Teodora","Teresa","Walentyna","Waleria","Wanesa","Wiara","Weronika","Wiktoria","Wirginia","Bibiana","Bibianna","Wanda","Wilhelmina","Ksawera","Ksenia","Zoe"],"last_name":["Adamczak","Adamczyk","Adamek","Adamiak","Adamiec","Adamowicz","Adamski","Adamus","Aleksandrowicz","Andrzejczak","Andrzejewski","Antczak","Augustyn","Augustyniak","Bagiński","Balcerzak","Banach","Banasiak","Banasik","Banaś","Baran","Baranowski","Barański","Bartczak","Bartkowiak","Bartnik","Bartosik","Bednarczyk","Bednarek","Bednarski","Bednarz","Białas","Białek","Białkowski","Bielak","Bielawski","Bielecki","Bielski","Bieniek","Biernacki","Biernat","Bieńkowski","Bilski","Bober","Bochenek","Bogucki","Bogusz","Borek","Borkowski","Borowiec","Borowski","Bożek","Broda","Brzeziński","Brzozowski","Buczek","Buczkowski","Buczyński","Budziński","Budzyński","Bujak","Bukowski","Burzyński","Bąk","Bąkowski","Błaszczak","Błaszczyk","Cebula","Chmiel","Chmielewski","Chmura","Chojnacki","Chojnowski","Cholewa","Chrzanowski","Chudzik","Cichocki","Cichoń","Cichy","Ciesielski","Cieśla","Cieślak","Cieślik","Ciszewski","Cybulski","Cygan","Czaja","Czajka","Czajkowski","Czapla","Czarnecki","Czech","Czechowski","Czekaj","Czerniak","Czerwiński","Czyż","Czyżewski","Dec","Dobosz","Dobrowolski","Dobrzyński","Domagała","Domański","Dominiak","Drabik","Drozd","Drozdowski","Drzewiecki","Dróżdż","Dubiel","Duda","Dudek","Dudziak","Dudzik","Dudziński","Duszyński","Dziedzic","Dziuba","Dąbek","Dąbkowski","Dąbrowski","Dębowski","Dębski","Długosz","Falkowski","Fijałkowski","Filipek","Filipiak","Filipowicz","Flak","Flis","Florczak","Florek","Frankowski","Frąckowiak","Frączek","Frątczak","Furman","Gadomski","Gajda","Gajewski","Gaweł","Gawlik","Gawron","Gawroński","Gałka","Gałązka","Gil","Godlewski","Golec","Gołąb","Gołębiewski","Gołębiowski","Grabowski","Graczyk","Grochowski","Grudzień","Gruszczyński","Gruszka","Grzegorczyk","Grzelak","Grzesiak","Grzesik","Grześkowiak","Grzyb","Grzybowski","Grzywacz","Gutowski","Guzik","Gwóźdź","Góra","Góral","Górecki","Górka","Górniak","Górny","Górski","Gąsior","Gąsiorowski","Głogowski","Głowacki","Głąb","Hajduk","Herman","Iwański","Izdebski","Jabłoński","Jackowski","Jagielski","Jagiełło","Jagodziński","Jakubiak","Jakubowski","Janas","Janiak","Janicki","Janik","Janiszewski","Jankowiak","Jankowski","Janowski","Janus","Janusz","Januszewski","Jaros","Jarosz","Jarząbek","Jasiński","Jastrzębski","Jaworski","Jaśkiewicz","Jezierski","Jurek","Jurkiewicz","Jurkowski","Juszczak","Jóźwiak","Jóźwik","Jędrzejczak","Jędrzejczyk","Jędrzejewski","Kacprzak","Kaczmarczyk","Kaczmarek","Kaczmarski","Kaczor","Kaczorowski","Kaczyński","Kaleta","Kalinowski","Kalisz","Kamiński","Kania","Kaniewski","Kapusta","Karaś","Karczewski","Karpiński","Karwowski","Kasperek","Kasprzak","Kasprzyk","Kaszuba","Kawa","Kawecki","Kałuża","Kaźmierczak","Kiełbasa","Kisiel","Kita","Klimczak","Klimek","Kmiecik","Kmieć","Knapik","Kobus","Kogut","Kolasa","Komorowski","Konieczna","Konieczny","Konopka","Kopczyński","Koper","Kopeć","Korzeniowski","Kos","Kosiński","Kosowski","Kostecki","Kostrzewa","Kot","Kotowski","Kowal","Kowalczuk","Kowalczyk","Kowalewski","Kowalik","Kowalski","Koza","Kozak","Kozieł","Kozioł","Kozłowski","Kołakowski","Kołodziej","Kołodziejczyk","Kołodziejski","Krajewski","Krakowiak","Krawczyk","Krawiec","Kruk","Krukowski","Krupa","Krupiński","Kruszewski","Krysiak","Krzemiński","Krzyżanowski","Król","Królikowski","Książek","Kubacki","Kubiak","Kubica","Kubicki","Kubik","Kuc","Kucharczyk","Kucharski","Kuchta","Kuciński","Kuczyński","Kujawa","Kujawski","Kula","Kulesza","Kulig","Kulik","Kuliński","Kurek","Kurowski","Kuś","Kwaśniewski","Kwiatkowski","Kwiecień","Kwieciński","Kędzierski","Kędziora","Kępa","Kłos","Kłosowski","Lach","Laskowski","Lasota","Lech","Lenart","Lesiak","Leszczyński","Lewandowski","Lewicki","Leśniak","Leśniewski","Lipiński","Lipka","Lipski","Lis","Lisiecki","Lisowski","Maciejewski","Maciąg","Mackiewicz","Madej","Maj","Majcher","Majchrzak","Majewski","Majka","Makowski","Malec","Malicki","Malinowski","Maliszewski","Marchewka","Marciniak","Marcinkowski","Marczak","Marek","Markiewicz","Markowski","Marszałek","Marzec","Masłowski","Matusiak","Matuszak","Matuszewski","Matysiak","Mazur","Mazurek","Mazurkiewicz","Maćkowiak","Małecki","Małek","Maślanka","Michalak","Michalczyk","Michalik","Michalski","Michałek","Michałowski","Mielczarek","Mierzejewski","Mika","Mikołajczak","Mikołajczyk","Mikulski","Milczarek","Milewski","Miller","Misiak","Misztal","Miśkiewicz","Modzelewski","Molenda","Morawski","Motyka","Mroczek","Mroczkowski","Mrozek","Mróz","Mucha","Murawski","Musiał","Muszyński","Młynarczyk","Napierała","Nawrocki","Nawrot","Niedziela","Niedzielski","Niedźwiecki","Niemczyk","Niemiec","Niewiadomski","Noga","Nowacki","Nowaczyk","Nowak","Nowakowski","Nowicki","Nowiński","Olczak","Olejniczak","Olejnik","Olszewski","Orzechowski","Orłowski","Osiński","Ossowski","Ostrowski","Owczarek","Paczkowski","Pająk","Pakuła","Paluch","Panek","Partyka","Pasternak","Paszkowski","Pawelec","Pawlak","Pawlicki","Pawlik","Pawlikowski","Pawłowski","Pałka","Piasecki","Piechota","Piekarski","Pietras","Pietruszka","Pietrzak","Pietrzyk","Pilarski","Pilch","Piotrowicz","Piotrowski","Piwowarczyk","Piórkowski","Piątek","Piątkowski","Piłat","Pluta","Podgórski","Polak","Popławski","Porębski","Prokop","Prus","Przybylski","Przybysz","Przybył","Przybyła","Ptak","Puchalski","Pytel","Płonka","Raczyński","Radecki","Radomski","Rak","Rakowski","Ratajczak","Robak","Rogala","Rogalski","Rogowski","Rojek","Romanowski","Rosa","Rosiak","Rosiński","Ruciński","Rudnicki","Rudziński","Rudzki","Rusin","Rutkowski","Rybak","Rybarczyk","Rybicki","Rzepka","Różański","Różycki","Sadowski","Sawicki","Serafin","Siedlecki","Sienkiewicz","Sieradzki","Sikora","Sikorski","Sitek","Siwek","Skalski","Skiba","Skibiński","Skoczylas","Skowron","Skowronek","Skowroński","Skrzypczak","Skrzypek","Skóra","Smoliński","Sobczak","Sobczyk","Sobieraj","Sobolewski","Socha","Sochacki","Sokołowski","Sokół","Sosnowski","Sowa","Sowiński","Sołtys","Sołtysiak","Sroka","Stachowiak","Stachowicz","Stachura","Stachurski","Stanek","Staniszewski","Stanisławski","Stankiewicz","Stasiak","Staszewski","Stawicki","Stec","Stefaniak","Stefański","Stelmach","Stolarczyk","Stolarski","Strzelczyk","Strzelecki","Stępień","Stępniak","Surma","Suski","Szafrański","Szatkowski","Szczepaniak","Szczepanik","Szczepański","Szczerba","Szcześniak","Szczygieł","Szczęsna","Szczęsny","Szeląg","Szewczyk","Szostak","Szulc","Szwarc","Szwed","Szydłowski","Szymański","Szymczak","Szymczyk","Szymkowiak","Szyszka","Sławiński","Słowik","Słowiński","Tarnowski","Tkaczyk","Tokarski","Tomala","Tomaszewski","Tomczak","Tomczyk","Tracz","Trojanowski","Trzciński","Trzeciak","Turek","Twardowski","Urban","Urbanek","Urbaniak","Urbanowicz","Urbańczyk","Urbański","Walczak","Walkowiak","Warchoł","Wasiak","Wasilewski","Wawrzyniak","Wesołowski","Wieczorek","Wierzbicki","Wilczek","Wilczyński","Wilk","Winiarski","Witczak","Witek","Witkowski","Wiącek","Więcek","Więckowski","Wiśniewski","Wnuk","Wojciechowski","Wojtas","Wojtasik","Wojtczak","Wojtkowiak","Wolak","Woliński","Wolny","Wolski","Woś","Woźniak","Wrona","Wroński","Wróbel","Wróblewski","Wypych","Wysocki","Wyszyński","Wójcicki","Wójcik","Wójtowicz","Wąsik","Węgrzyn","Włodarczyk","Włodarski","Zaborowski","Zabłocki","Zagórski","Zając","Zajączkowski","Zakrzewski","Zalewski","Zaremba","Zarzycki","Zaręba","Zawada","Zawadzki","Zdunek","Zieliński","Zielonka","Ziółkowski","Zięba","Ziętek","Zwoliński","Zych","Zygmunt","Łapiński","Łuczak","Łukasiewicz","Łukasik","Łukaszewski","Śliwa","Śliwiński","Ślusarczyk","Świderski","Świerczyński","Świątek","Żak","Żebrowski","Żmuda","Żuk","Żukowski","Żurawski","Żurek","Żyła"],"name":["#{prefix} #{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}","#{first_name} #{last_name}"],"prefix":["Pan","Pani"],"title":{"descriptor":["Lead","Senior","Direct","Corporate","Dynamic","Future","Product","National","Regional","District","Central","Global","Customer","Investor","Dynamic","International","Legacy","Forward","Internal","Human","Chief","Principal"],"job":["Supervisor","Associate","Executive","Liason","Officer","Manager","Engineer","Specialist","Director","Coordinator","Administrator","Architect","Analyst","Designer","Planner","Orchestrator","Technician","Developer","Producer","Consultant","Assistant","Facilitator","Agent","Representative","Strategist"],"level":["Solutions","Program","Brand","Security","Research","Marketing","Directives","Implementation","Integration","Functionality","Response","Paradigm","Tactics","Identity","Markets","Group","Division","Applications","Optimization","Operations","Infrastructure","Intranet","Communications","Web","Branding","Quality","Assurance","Mobility","Accounts","Data","Creative","Configuration","Accountability","Interactions","Factors","Usability","Metrics"]}},"phone_number":{"formats":["12-###-##-##","13-###-##-##","14-###-##-##","15-###-##-##","16-###-##-##","17-###-##-##","18-###-##-##","22-###-##-##","23-###-##-##","24-###-##-##","25-###-##-##","29-###-##-##","32-###-##-##","33-###-##-##","34-###-##-##","41-###-##-##","42-###-##-##","43-###-##-##","44-###-##-##","46-###-##-##","48-###-##-##","52-###-##-##","54-###-##-##","55-###-##-##","56-###-##-##","58-###-##-##","59-###-##-##","61-###-##-##","62-###-##-##","63-###-##-##","65-###-##-##","67-###-##-##","68-###-##-##","71-###-##-##","74-###-##-##","75-###-##-##","76-###-##-##","77-###-##-##","81-###-##-##","82-###-##-##","83-###-##-##","84-###-##-##","85-###-##-##","86-###-##-##","87-###-##-##","89-###-##-##","91-###-##-##","94-###-##-##","95-###-##-##"]}}},"pt-BR":{"faker":{"address":{"building_number":["#####","####","###"],"city_prefix":["Nova","Velha","Grande","Vila","Município de"],"city_suffix":["do Descoberto","de Nossa Senhora","do Norte","do Sul"],"country":["Afeganistão","Albânia","Algéria","Samoa","Andorra","Angola","Anguilla","Antigua and Barbada","Argentina","Armênia","Aruba","Austrália","Áustria","Alzerbajão","Bahamas","Barém","Bangladesh","Barbado","Belgrado","Bélgica","Belize","Benin","Bermuda","Bhutan","Bolívia","Bôsnia","Botuasuna","Bouvetoia","Brasil","Arquipélago de Chagos","Ilhas Virgens","Brunei","Bulgária","Burkina Faso","Burundi","Cambójia","Camarões","Canadá","Cabo Verde","Ilhas Caiman","República da África Central","Chad","Chile","China","Ilhas Natal","Ilhas Cocos","Colômbia","Comoros","Congo","Ilhas Cook","Costa Rica","Costa do Marfim","Croácia","Cuba","Cyprus","República Tcheca","Dinamarca","Djibouti","Dominica","República Dominicana","Equador","Egito","El Salvador","Guiné Equatorial","Eritrea","Estônia","Etiópia","Ilhas Faroe","Malvinas","Fiji","Finlândia","França","Guiné Francesa","Polinésia Francesa","Gabão","Gâmbia","Georgia","Alemanha","Gana","Gibraltar","Grécia","Groelândia","Granada","Guadalupe","Guano","Guatemala","Guernsey","Guiné","Guiné-Bissau","Guiana","Haiti","Heard Island and McDonald Islands","Vaticano","Honduras","Hong Kong","Hungria","Iceland","Índia","Indonésia","Irã","Iraque","Irlanda","Ilha de Man","Israel","Itália","Jamaica","Japão","Jersey","Jordânia","Cazaquistão","Quênia","Kiribati","Coreia do Norte","Coreia do Sul","Kuwait","Kyrgyz Republic","República Democrática de Lao People","Latvia","Líbano","Lesotho","Libéria","Libyan Arab Jamahiriya","Liechtenstein","Lituânia","Luxemburgo","Macao","Macedônia","Madagascar","Malawi","Malásia","Maldives","Mali","Malta","Ilhas Marshall","Martinica","Mauritânia","Mauritius","Mayotte","México","Micronésia","Moldova","Mônaco","Mongólia","Montenegro","Montserrat","Marrocos","Moçambique","Myanmar","Namibia","Nauru","Nepal","Antilhas Holandesas","Holanda","Nova Caledonia","Nova Zelândia","Nicarágua","Nigéria","Niue","Ilha Norfolk","Northern Mariana Islands","Noruega","Oman","Paquistão","Palau","Território da Palestina","Panamá","Nova Guiné Papua","Paraguai","Peru","Filipinas","Polônia","Portugal","Puerto Rico","Qatar","Romênia","Rússia","Ruanda","São Bartolomeu","Santa Helena","Santa Lúcia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tomé e Príncipe","Arábia Saudita","Senegal","Sérvia","Seychelles","Serra Leoa","Singapura","Eslováquia","Eslovênia","Ilhas Salomão","Somália","África do Sul","South Georgia and the South Sandwich Islands","Spanha","Sri Lanka","Sudão","Suriname","Svalbard \u0026 Jan Mayen Islands","Swaziland","Suécia","Suíça","Síria","Taiwan","Tajiquistão","Tanzânia","Tailândia","Timor-Leste","Togo","Tokelau","Tonga","Trinidá e Tobago","Tunísia","Turquia","Turcomenistão","Turks and Caicos Islands","Tuvalu","Uganda","Ucrânia","Emirados Árabes Unidos","Reino Unido","Estados Unidos da América","Estados Unidos das Ilhas Virgens","Uruguai","Uzbequistão","Vanuatu","Venezuela","Vietnã","Wallis and Futuna","Sahara","Yemen","Zâmbia","Zimbábue"],"default_country":["Brasil"],"postcode":["#####","#####-###"],"secondary_address":["Apto. ###","Sobrado ##","Casa #","Lote ##","Quadra ##"],"state":["Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito Federal","Espírito Santo","Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul","Minas Gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí","Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondônia","Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins"],"state_abbr":["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP"],"street_suffix":["Rua","Avenida","Travessa","Ponte","Alameda","Marginal","Viela","Rodovia"]},"company":{"name":["#{Name.last_name} #{suffix}","#{Name.last_name}-#{Name.last_name}","#{Name.last_name}, #{Name.last_name} e #{Name.last_name}"],"suffix":["S.A.","LTDA","e Associados","Comércio"]},"internet":{"domain_suffix":["br","com","biz","info","name","net","org"],"free_email":["gmail.com","yahoo.com","hotmail.com","live.com","bol.com.br"]},"lorem":{"words":["alias","consequatur","aut","perferendis","sit","voluptatem","accusantium","doloremque","aperiam","eaque","ipsa","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt","explicabo","aspernatur","aut","odit","aut","fugit","sed","quia","consequuntur","magni","dolores","eos","qui","ratione","voluptatem","sequi","nesciunt","neque","dolorem","ipsum","quia","dolor","sit","amet","consectetur","adipisci","velit","sed","quia","non","numquam","eius","modi","tempora","incidunt","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem","ut","enim","ad","minima","veniam","quis","nostrum","exercitationem","ullam","corporis","nemo","enim","ipsam","voluptatem","quia","voluptas","sit","suscipit","laboriosam","nisi","ut","aliquid","ex","ea","commodi","consequatur","quis","autem","vel","eum","iure","reprehenderit","qui","in","ea","voluptate","velit","esse","quam","nihil","molestiae","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","laudantium","totam","rem","voluptatum","deleniti","atque","corrupti","quos","dolores","et","quas","molestias","excepturi","sint","occaecati","cupiditate","non","provident","sed","ut","perspiciatis","unde","omnis","iste","natus","error","similique","sunt","in","culpa","qui","officia","deserunt","mollitia","animi","id","est","laborum","et","dolorum","fuga","et","harum","quidem","rerum","facilis","est","et","expedita","distinctio","nam","libero","tempore","cum","soluta","nobis","est","eligendi","optio","cumque","nihil","impedit","quo","porro","quisquam","est","qui","minus","id","quod","maxime","placeat","facere","possimus","omnis","voluptas","assumenda","est","omnis","dolor","repellendus","temporibus","autem","quibusdam","et","aut","consequatur","vel","illum","qui","dolorem","eum","fugiat","quo","voluptas","nulla","pariatur","at","vero","eos","et","accusamus","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet","ut","et","voluptates","repudiandae","sint","et","molestiae","non","recusandae","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus","ut","aut","reiciendis","voluptatibus","maiores","doloribus","asperiores","repellat"]},"name":{"first_name":["Alessandro","Alessandra","Alexandre","Aline","Antônio","Breno","Bruna","Carlos","Carla","Célia","Cecília","César","Danilo","Dalila","Deneval","Eduardo","Eduarda","Esther","Elísio","Fábio","Fabrício","Fabrícia","Félix","Felícia","Feliciano","Frederico","Fabiano","Gustavo","Guilherme","Gúbio","Heitor","Hélio","Hugo","Isabel","Isabela","Ígor","João","Joana","Júlio César","Júlio","Júlia","Janaína","Karla","Kléber","Lucas","Lorena","Lorraine","Larissa","Ladislau","Marcos","Meire","Marcelo","Marcela","Margarida","Mércia","Márcia","Marli","Morgana","Maria","Norberto","Natália","Nataniel","Núbia","Ofélia","Paulo","Paula","Pablo","Pedro","Raul","Rafael","Rafaela","Ricardo","Roberto","Roberta","Sílvia","Sílvia","Silas","Suélen","Sara","Salvador","Sirineu","Talita","Tertuliano","Vicente","Víctor","Vitória","Yango","Yago","Yuri","Washington","Warley"],"last_name":["Silva","Souza","Carvalho","Santos","Reis","Xavier","Franco","Braga","Macedo","Batista","Barros","Moraes","Costa","Pereira","Carvalho","Melo","Saraiva","Nogueira","Oliveira","Martins","Moreira","Albuquerque"],"prefix":["Sr.","Sra.","Srta.","Dr."],"suffix":["Jr.","Neto","Filho"]},"phone_number":{"formats":["(##) ####-####","+55 (##) ####-####","(##) #####-####"]}}},"ru":{"faker":{"address":{"building_number":["###"],"city":["#{Address.city_name}"],"city_name":["Москва","Владимир","Санкт-Петербург","Новосибирск","Екатеринбург","Нижний Новгород","Самара","Казань","Омск","Челябинск","Ростов-на-Дону","Уфа","Волгоград","Пермь","Красноярск","Воронеж","Саратов","Краснодар","Тольятти","Ижевск","Барнаул","Ульяновск","Тюмень","Иркутск","Владивосток","Ярославль","Хабаровск","Махачкала","Оренбург","Новокузнецк","Томск","Кемерово","Рязань","Астрахань","Пенза","Липецк","Тула","Киров","Чебоксары","Курск","Брянскm Магнитогорск","Иваново","Тверь","Ставрополь","Белгород","Сочи"],"country":["Австралия","Австрия","Азербайджан","Албания","Алжир","Американское Самоа (не признана)","Ангилья","Ангола","Андорра","Антарктика (не признана)","Антигуа и Барбуда","Антильские Острова (не признана)","Аомынь (не признана)","Аргентина","Армения","Афганистан","Багамские Острова","Бангладеш","Барбадос","Бахрейн","Беларусь","Белиз","Бельгия","Бенин","Болгария","Боливия","Босния и Герцеговина","Ботсвана","Бразилия","Бруней","Буркина-Фасо","Бурунди","Бутан","Вануату","Ватикан","Великобритания","Венгрия","Венесуэла","Восточный Тимор","Вьетнам","Габон","Гаити","Гайана","Гамбия","Гана","Гваделупа (не признана)","Гватемала","Гвиана (не признана)","Гвинея","Гвинея-Бисау","Германия","Гондурас","Гренада","Греция","Грузия","Дания","Джибути","Доминика","Доминиканская Республика","Египет","Замбия","Зимбабве","Израиль","Индия","Индонезия","Иордания","Ирак","Иран","Ирландия","Исландия","Испания","Италия","Йемен","Кабо-Верде","Казахстан","Камбоджа","Камерун","Канада","Катар","Кения","Кипр","Кирибати","Китай","Колумбия","Коморские Острова","Конго","Демократическая Республика","Корея (Северная)","Корея (Южная)","Косово","Коста-Рика","Кот-д'Ивуар","Куба","Кувейт","Кука острова","Кыргызстан","Лаос","Латвия","Лесото","Либерия","Ливан","Ливия","Литва","Лихтенштейн","Люксембург","Маврикий","Мавритания","Мадагаскар","Македония","Малави","Малайзия","Мали","Мальдивы","Мальта","Маршалловы Острова","Мексика","Микронезия","Мозамбик","Молдова","Монако","Монголия","Марокко","Мьянма","Намибия","Науру","Непал","Нигер","Нигерия","Нидерланды","Никарагуа","Новая Зеландия","Норвегия","Объединенные Арабские Эмираты","Оман","Пакистан","Палау","Панама","Папуа — Новая Гвинея","Парагвай","Перу","Польша","Португалия","Республика Конго","Россия","Руанда","Румыния","Сальвадор","Самоа","Сан-Марино","Сан-Томе и Принсипи","Саудовская Аравия","Свазиленд","Сейшельские острова","Сенегал","Сент-Винсент и Гренадины","Сент-Киттс и Невис","Сент-Люсия","Сербия","Сингапур","Сирия","Словакия","Словения","Соединенные Штаты Америки","Соломоновы Острова","Сомали","Судан","Суринам","Сьерра-Леоне","Таджикистан","Таиланд","Тайвань (не признана)","Тамил-Илам (не признана)","Танзания","Тёркс и Кайкос (не признана)","Того","Токелау (не признана)","Тонга","Тринидад и Тобаго","Тувалу","Тунис","Турецкая Республика Северного Кипра (не признана)","Туркменистан","Турция","Уганда","Узбекистан","Украина","Уругвай","Фарерские Острова (не признана)","Фиджи","Филиппины","Финляндия","Франция","Французская Полинезия (не признана)","Хорватия","Центральноафриканская Республика","Чад","Черногория","Чехия","Чили","Швейцария","Швеция","Шри-Ланка","Эквадор","Экваториальная Гвинея","Эритрея","Эстония","Эфиопия","Южно-Африканская Республика","Ямайка","Япония"],"default_country":["Россия"],"postcode":["######"],"secondary_address":["кв. ###"],"state":["Республика Адыгея","Республика Башкортостан","Республика Бурятия","Республика Алтай Республика Дагестан","Республика Ингушетия","Кабардино-Балкарская Республика","Республика Калмыкия","Республика Карачаево-Черкессия","Республика Карелия","Республика Коми","Республика Марий Эл","Республика Мордовия","Республика Саха (Якутия)","Республика Северная Осетия-Алания","Республика Татарстан","Республика Тыва","Удмуртская Республика","Республика Хакасия","Чувашская Республика","Алтайский край","Краснодарский край","Красноярский край","Приморский край","Ставропольский край","Хабаровский край","Амурская область","Архангельская область","Астраханская область","Белгородская область","Брянская область","Владимирская область","Волгоградская область","Вологодская область","Воронежская область","Ивановская область","Иркутская область","Калиниградская область","Калужская область","Камчатская область","Кемеровская область","Кировская область","Костромская область","Курганская область","Курская область","Ленинградская область","Липецкая область","Магаданская область","Московская область","Мурманская область","Нижегородская область","Новгородская область","Новосибирская область","Омская область","Оренбургская область","Орловская область","Пензенская область","Пермская область","Псковская область","Ростовская область","Рязанская область","Самарская область","Саратовская область","Сахалинская область","Свердловская область","Смоленская область","Тамбовская область","Тверская область","Томская область","Тульская область","Тюменская область","Ульяновская область","Челябинская область","Читинская область","Ярославская область","Еврейская автономная область","Агинский Бурятский авт. округ","Коми-Пермяцкий автономный округ","Корякский автономный округ","Ненецкий автономный округ","Таймырский (Долгано-Ненецкий) автономный округ","Усть-Ордынский Бурятский автономный округ","Ханты-Мансийский автономный округ","Чукотский автономный округ","Эвенкийский автономный округ","Ямало-Ненецкий автономный округ","Чеченская Республика"],"street_address":["#{street_name}, #{building_number}"],"street_name":["#{street_suffix} #{Address.street_title}","#{Address.street_title} #{street_suffix}"],"street_suffix":["ул.","улица","проспект","пр.","площадь","пл."],"street_title":["Советская","Молодежная","Центральная","Школьная","Новая","Садовая","Лесная","Набережная","Ленина","Мира","Октябрьская","Зеленая","Комсомольская","Заречная","Первомайская","Гагарина","Полевая","Луговая","Пионерская","Кирова","Юбилейная","Северная","Пролетарская","Степная","Пушкина","Калинина","Южная","Колхозная","Рабочая","Солнечная","Железнодорожная","Восточная","Заводская","Чапаева","Нагорная","Строителей","Береговая","Победы","Горького","Кооперативная","Красноармейская","Совхозная","Речная","Школьный","Спортивная","Озерная","Строительная","Парковая","Чкалова","Мичурина","речень улиц","Подгорная","Дружбы","Почтовая","Партизанская","Вокзальная","Лермонтова","Свободы","Дорожная","Дачная","Маяковского","Западная","Фрунзе","Дзержинского","Московская","Свердлова","Некрасова","Гоголя","Красная","Трудовая","Шоссейная","Чехова","Коммунистическая","Труда","Комарова","Матросова","Островского","Сосновая","Клубная","Куйбышева","Крупской","Березовая","Карла Маркса","8 Марта","Больничная","Садовый","Интернациональная","Суворова","Цветочная","Трактовая","Ломоносова","Горная","Космонавтов","Энергетиков","Шевченко","Весенняя","Механизаторов","Коммунальная","Лесной","40 лет Победы","Майская"]},"commerce":{"color":["красный","зеленый","синий","желтый","багровый","мятный","зеленовато-голубой","белый","черный","оранжевый","розовый","серый","красно-коричневый","фиолетовый","бирюзовый","желто-коричневый","небесно голубой","оранжево-розовый","темно-фиолетовый","орхидный","оливковый","пурпурный","лимонный","кремовый","сине-фиолетовый","золотой","красно-пурпурный","голубой","лазурный","лиловый","серебряный"],"department":["Книги","Фильмы","музыка","игры","Электроника","компьютеры","Дом","садинструмент","Бакалея","здоровье","красота","Игрушки","детское","для малышей","Одежда","обувь","украшения","Спорт","туризм","Автомобильное","промышленное"],"product_name":{"adjective":["Маленький","Эргономичный","Грубый","Интеллектуальный","Великолепный","Невероятный","Фантастический","Практчиный","Лоснящийся","Потрясающий"],"material":["Стальной","Деревянный","Бетонный","Пластиковый","Хлопковый","Гранитный","Резиновый"],"product":["Стул","Автомобиль","Компьютер","Берет","Кулон","Стол","Свитер","Ремень","Ботинок"]}},"company":{"name":["#{prefix} #{Name.female_first_name}","#{prefix} #{Name.male_first_name}","#{prefix} #{Name.male_last_name}","#{prefix} #{suffix}#{suffix}","#{prefix} #{suffix}#{suffix}#{suffix}","#{prefix} #{Address.city_name}#{suffix}","#{prefix} #{Address.city_name}#{suffix}#{suffix}","#{prefix} #{Address.city_name}#{suffix}#{suffix}#{suffix}"],"prefix":["ИП","ООО","ЗАО","ОАО","НКО","ТСЖ","ОП"],"suffix":["Снаб","Торг","Пром","Трейд","Сбыт"]},"internet":{"domain_suffix":["com","ru","info","рф","net","org"],"free_email":["yandex.ru","ya.ru","mail.ru","gmail.com","yahoo.com","hotmail.com"]},"name":{"female_first_name":["Анна","Алёна","Алевтина","Александра","Алина","Алла","Анастасия","Ангелина","Анжела","Анжелика","Антонида","Антонина","Анфиса","Арина","Валентина","Валерия","Варвара","Василиса","Вера","Вероника","Виктория","Галина","Дарья","Евгения","Екатерина","Елена","Елизавета","Жанна","Зинаида","Зоя","Ирина","Кира","Клавдия","Ксения","Лариса","Лидия","Любовь","Людмила","Маргарита","Марина","Мария","Надежда","Наталья","Нина","Оксана","Ольга","Раиса","Регина","Римма","Светлана","София","Таисия","Тамара","Татьяна","Ульяна","Юлия"],"female_last_name":["Смирнова","Иванова","Кузнецова","Попова","Соколова","Лебедева","Козлова","Новикова","Морозова","Петрова","Волкова","Соловьева","Васильева","Зайцева","Павлова","Семенова","Голубева","Виноградова","Богданова","Воробьева","Федорова","Михайлова","Беляева","Тарасова","Белова","Комарова","Орлова","Киселева","Макарова","Андреева","Ковалева","Ильина","Гусева","Титова","Кузьмина","Кудрявцева","Баранова","Куликова","Алексеева","Степанова","Яковлева","Сорокина","Сергеева","Романова","Захарова","Борисова","Королева","Герасимова","Пономарева","Григорьева","Лазарева","Медведева","Ершова","Никитина","Соболева","Рябова","Полякова","Цветкова","Данилова","Жукова","Фролова","Журавлева","Николаева","Крылова","Максимова","Сидорова","Осипова","Белоусова","Федотова","Дорофеева","Егорова","Матвеева","Боброва","Дмитриева","Калинина","Анисимова","Петухова","Антонова","Тимофеева","Никифорова","Веселова","Филиппова","Маркова","Большакова","Суханова","Миронова","Ширяева","Александрова","Коновалова","Шестакова","Казакова","Ефимова","Денисова","Громова","Фомина","Давыдова","Мельникова","Щербакова","Блинова","Колесникова","Карпова","Афанасьева","Власова","Маслова","Исакова","Тихонова","Аксенова","Гаврилова","Родионова","Котова","Горбунова","Кудряшова","Быкова","Зуева","Третьякова","Савельева","Панова","Рыбакова","Суворова","Абрамова","Воронова","Мухина","Архипова","Трофимова","Мартынова","Емельянова","Горшкова","Чернова","Овчинникова","Селезнева","Панфилова","Копылова","Михеева","Галкина","Назарова","Лобанова","Лукина","Белякова","Потапова","Некрасова","Хохлова","Жданова","Наумова","Шилова","Воронцова","Ермакова","Дроздова","Игнатьева","Савина","Логинова","Сафонова","Капустина","Кириллова","Моисеева","Елисеева","Кошелева","Костина","Горбачева","Орехова","Ефремова","Исаева","Евдокимова","Калашникова","Кабанова","Носкова","Юдина","Кулагина","Лапина","Прохорова","Нестерова","Харитонова","Агафонова","Муравьева","Ларионова","Федосеева","Зимина","Пахомова","Шубина","Игнатова","Филатова","Крюкова","Рогова","Кулакова","Терентьева","Молчанова","Владимирова","Артемьева","Гурьева","Зиновьева","Гришина","Кононова","Дементьева","Ситникова","Симонова","Мишина","Фадеева","Комиссарова","Мамонтова","Носова","Гуляева","Шарова","Устинова","Вишнякова","Евсеева","Лаврентьева","Брагина","Константинова","Корнилова","Авдеева","Зыкова","Бирюкова","Шарапова","Никонова","Щукина","Дьячкова","Одинцова","Сазонова","Якушева","Красильникова","Гордеева","Самойлова","Князева","Беспалова","Уварова","Шашкова","Бобылева","Доронина","Белозерова","Рожкова","Самсонова","Мясникова","Лихачева","Бурова","Сысоева","Фомичева","Русакова","Стрелкова","Гущина","Тетерина","Колобова","Субботина","Фокина","Блохина","Селиверстова","Пестова","Кондратьева","Силина","Меркушева","Лыткина","Турова"],"female_middle_name":["Александровна","Алексеевна","Альбертовна","Анатольевна","Андреевна","Антоновна","Аркадьевна","Арсеньевна","Артёмовна","Борисовна","Вадимовна","Валентиновна","Валерьевна","Васильевна","Викторовна","Витальевна","Владимировна","Владиславовна","Вячеславовна","Геннадьевна","Георгиевна","Германовна","Григорьевна","Данииловна","Денисовна","Дмитриевна","Евгеньевна","Егоровна","Ивановна","Игнатьевна","Игоревна","Ильинична","Константиновна","Лаврентьевна","Леонидовна","Макаровна","Максимовна","Матвеевна","Михайловна","Никитична","Николаевна","Олеговна","Романовна","Семёновна","Сергеевна","Станиславовна","Степановна","Фёдоровна","Эдуардовна","Юрьевна","Ярославовна"],"male_first_name":["Александр","Алексей","Альберт","Анатолий","Андрей","Антон","Аркадий","Арсений","Артём","Борис","Вадим","Валентин","Валерий","Василий","Виктор","Виталий","Владимир","Владислав","Вячеслав","Геннадий","Георгий","Герман","Григорий","Даниил","Денис","Дмитрий","Евгений","Егор","Иван","Игнатий","Игорь","Илья","Константин","Лаврентий","Леонид","Лука","Макар","Максим","Матвей","Михаил","Никита","Николай","Олег","Роман","Семён","Сергей","Станислав","Степан","Фёдор","Эдуард","Юрий","Ярослав"],"male_last_name":["Смирнов","Иванов","Кузнецов","Попов","Соколов","Лебедев","Козлов","Новиков","Морозов","Петров","Волков","Соловьев","Васильев","Зайцев","Павлов","Семенов","Голубев","Виноградов","Богданов","Воробьев","Федоров","Михайлов","Беляев","Тарасов","Белов","Комаров","Орлов","Киселев","Макаров","Андреев","Ковалев","Ильин","Гусев","Титов","Кузьмин","Кудрявцев","Баранов","Куликов","Алексеев","Степанов","Яковлев","Сорокин","Сергеев","Романов","Захаров","Борисов","Королев","Герасимов","Пономарев","Григорьев","Лазарев","Медведев","Ершов","Никитин","Соболев","Рябов","Поляков","Цветков","Данилов","Жуков","Фролов","Журавлев","Николаев","Крылов","Максимов","Сидоров","Осипов","Белоусов","Федотов","Дорофеев","Егоров","Матвеев","Бобров","Дмитриев","Калинин","Анисимов","Петухов","Антонов","Тимофеев","Никифоров","Веселов","Филиппов","Марков","Большаков","Суханов","Миронов","Ширяев","Александров","Коновалов","Шестаков","Казаков","Ефимов","Денисов","Громов","Фомин","Давыдов","Мельников","Щербаков","Блинов","Колесников","Карпов","Афанасьев","Власов","Маслов","Исаков","Тихонов","Аксенов","Гаврилов","Родионов","Котов","Горбунов","Кудряшов","Быков","Зуев","Третьяков","Савельев","Панов","Рыбаков","Суворов","Абрамов","Воронов","Мухин","Архипов","Трофимов","Мартынов","Емельянов","Горшков","Чернов","Овчинников","Селезнев","Панфилов","Копылов","Михеев","Галкин","Назаров","Лобанов","Лукин","Беляков","Потапов","Некрасов","Хохлов","Жданов","Наумов","Шилов","Воронцов","Ермаков","Дроздов","Игнатьев","Савин","Логинов","Сафонов","Капустин","Кириллов","Моисеев","Елисеев","Кошелев","Костин","Горбачев","Орехов","Ефремов","Исаев","Евдокимов","Калашников","Кабанов","Носков","Юдин","Кулагин","Лапин","Прохоров","Нестеров","Харитонов","Агафонов","Муравьев","Ларионов","Федосеев","Зимин","Пахомов","Шубин","Игнатов","Филатов","Крюков","Рогов","Кулаков","Терентьев","Молчанов","Владимиров","Артемьев","Гурьев","Зиновьев","Гришин","Кононов","Дементьев","Ситников","Симонов","Мишин","Фадеев","Комиссаров","Мамонтов","Носов","Гуляев","Шаров","Устинов","Вишняков","Евсеев","Лаврентьев","Брагин","Константинов","Корнилов","Авдеев","Зыков","Бирюков","Шарапов","Никонов","Щукин","Дьячков","Одинцов","Сазонов","Якушев","Красильников","Гордеев","Самойлов","Князев","Беспалов","Уваров","Шашков","Бобылев","Доронин","Белозеров","Рожков","Самсонов","Мясников","Лихачев","Буров","Сысоев","Фомичев","Русаков","Стрелков","Гущин","Тетерин","Колобов","Субботин","Фокин","Блохин","Селиверстов","Пестов","Кондратьев","Силин","Меркушев","Лыткин","Туров"],"male_middle_name":["Александрович","Алексеевич","Альбертович","Анатольевич","Андреевич","Антонович","Аркадьевич","Арсеньевич","Артёмович","Борисович","Вадимович","Валентинович","Валерьевич","Васильевич","Викторович","Витальевич","Владимирович","Владиславович","Вячеславович","Геннадьевич","Георгиевич","Германович","Григорьевич","Даниилович","Денисович","Дмитриевич","Евгеньевич","Егорович","Иванович","Игнатьевич","Игоревич","Ильич","Константинович","Лаврентьевич","Леонидович","Лукич","Макарович","Максимович","Матвеевич","Михайлович","Никитич","Николаевич","Олегович","Романович","Семёнович","Сергеевич","Станиславович","Степанович","Фёдорович","Эдуардович","Юрьевич","Ярославович"],"name":["#{male_first_name} #{male_last_name}","#{male_last_name} #{male_first_name}","#{male_first_name} #{male_middle_name} #{male_last_name}","#{male_last_name} #{male_first_name} #{male_middle_name}","#{female_first_name} #{female_last_name}","#{female_last_name} #{female_first_name}","#{female_first_name} #{female_middle_name} #{female_last_name}","#{female_last_name} #{female_first_name} #{female_middle_name}"]},"phone_number":{"formats":["(9##)###-##-##"]},"separator":" и "}},"sk":{"faker":{"address":{"building_number":["#","##","###"],"city":["#{city_name}"],"city_name":["Bánovce nad Bebravou","Banská Bystrica","Banská Štiavnica","Bardejov","Bratislava I","Bratislava II","Bratislava III","Bratislava IV","Bratislava V","Brezno","Bytča","Čadca","Detva","Dolný Kubín","Dunajská Streda","Galanta","Gelnica","Hlohovec","Humenné","Ilava","Kežmarok","Komárno","Košice I","Košice II","Košice III","Košice IV","Košice-okolie","Krupina","Kysucké Nové Mesto","Levice","Levoča","Liptovský Mikuláš","Lučenec","Malacky","Martin","Medzilaborce","Michalovce","Myjava","Námestovo","Nitra","Nové Mesto n.Váhom","Nové Zámky","Partizánske","Pezinok","Piešťany","Poltár","Poprad","Považská Bystrica","Prešov","Prievidza","Púchov","Revúca","Rimavská Sobota","Rožňava","Ružomberok","Sabinov","Šaľa","Senec","Senica","Skalica","Snina","Sobrance","Spišská Nová Ves","Stará Ľubovňa","Stropkov","Svidník","Topoľčany","Trebišov","Trenčín","Trnava","Turčianske Teplice","Tvrdošín","Veľký Krtíš","Vranov nad Topľou","Žarnovica","Žiar nad Hronom","Žilina","Zlaté Moravce","Zvolen"],"city_prefix":["North","East","West","South","New","Lake","Port"],"city_suffix":["town","ton","land","ville","berg","burgh","borough","bury","view","port","mouth","stad","furt","chester","mouth","fort","haven","side","shire"],"country":["Afganistan","Afgánsky islamský štát","Albánsko","Albánska republika","Alžírsko","Alžírska demokratická ľudová republika","Andorra","Andorrské kniežatsvo","Angola","Angolská republika","Antigua a Barbuda","Antigua a Barbuda","Argentína","Argentínska republika","Arménsko","Arménska republika","Austrália","Austrálsky zväz","Azerbajdžan","Azerbajdžanská republika","Bahamy","Bahamské spoločenstvo","Bahrajn","Bahrajnské kráľovstvo","Bangladéš","Bangladéšska ľudová republika","Barbados","Barbados","Belgicko","Belgické kráľovstvo","Belize","Belize","Benin","Beninská republika","Bhután","Bhutánske kráľovstvo","Bielorusko","Bieloruská republika","Bolívia","Bolívijská republika","Bosna a Hercegovina","Republika Bosny a Hercegoviny","Botswana","Botswanská republika","Brazília","Brazílska federatívna republika","Brunej","Brunejský sultanát","Bulharsko","Bulharská republika","Burkina Faso","Burkina Faso","Burundi","Burundská republika","Cyprus","Cyperská republika","Čad","Republika Čad","Česko","Česká republika","Čína","Čínska ľudová republika","Dánsko","Dánsko kráľovstvo","Dominika","Spoločenstvo Dominika","Dominikánska republika","Dominikánska republika","Džibutsko","Džibutská republika","Egypt","Egyptská arabská republika","Ekvádor","Ekvádorská republika","Eritrea","Eritrejský štát","Estónsko","Estónska republika","Etiópia","Etiópska federatívna demokratická republika","Fidži","Republika ostrovy Fidži","Filipíny","Filipínska republika","Fínsko","Fínska republika","Francúzsko","Francúzska republika","Gabon","Gabonská republika","Gambia","Gambijská republika","Ghana","Ghanská republika","Grécko","Helénska republika","Grenada","Grenada","Gruzínsko","Gruzínsko","Guatemala","Guatemalská republika","Guinea","Guinejská republika","Guinea-Bissau","Republika Guinea-Bissau","Guayana","Guayanská republika","Haiti","Republika Haiti","Holandsko","Holandské kráľovstvo","Honduras","Honduraská republika","Chile","Čílska republika","Chorvátsko","Chorvátska republika","India","Indická republika","Indonézia","Indonézska republika","Irak","Iracká republika","Irán","Iránska islamská republika","Island","Islandská republika","Izrael","Štát Izrael","Írsko","Írska republika","Jamajka","Jamajka","Japonsko","Japonsko","Jemen","Jemenská republika","Jordánsko","Jordánske hášimovské kráľovstvo","Južná Afrika","Juhoafrická republika","Kambodža","Kambodžské kráľovstvo","Kamerun","Kamerunská republika","Kanada","Kanada","Kapverdy","Kapverdská republika","Katar","Štát Katar","Kazachstan","Kazašská republika","Keňa","Kenská republika","Kirgizsko","Kirgizská republika","Kiribati","Kiribatská republika","Kolumbia","Kolumbijská republika","Komory","Komorská únia","Kongo","Konžská demokratická republika","Kongo (\"Brazzaville\")","Konžská republika","Kórea (\"Južná\")","Kórejská republika","Kórea (\"Severná\")","Kórejská ľudovodemokratická republika","Kostarika","Kostarická republika","Kuba","Kubánska republika","Kuvajt","Kuvajtský štát","Laos","Laoská ľudovodemokratická republika","Lesotho","Lesothské kráľovstvo","Libanon","Libanonská republika","Libéria","Libérijská republika","Líbya","Líbyjská arabská ľudová socialistická džamáhírija","Lichtenštajnsko","Lichtenštajnské kniežatstvo","Litva","Litovská republika","Lotyšsko","Lotyšská republika","Luxembursko","Luxemburské veľkovojvodstvo","Macedónsko","Macedónska republika","Madagaskar","Madagaskarská republika","Maďarsko","Maďarská republika","Malajzia","Malajzia","Malawi","Malawijská republika","Maldivy","Maldivská republika","Mali","Malijská republika","Malta","Malta","Maroko","Marocké kráľovstvo","Marshallove ostrovy","Republika Marshallových ostrovy","Mauritánia","Mauritánska islamská republika","Maurícius","Maurícijská republika","Mexiko","Spojené štáty mexické","Mikronézia","Mikronézske federatívne štáty","Mjanmarsko","Mjanmarský zväz","Moldavsko","Moldavská republika","Monako","Monacké kniežatstvo","Mongolsko","Mongolsko","Mozambik","Mozambická republika","Namíbia","Namíbijská republika","Nauru","Naurská republika","Nemecko","Nemecká spolková republika","Nepál","Nepálske kráľovstvo","Niger","Nigerská republika","Nigéria","Nigérijská federatívna republika","Nikaragua","Nikaragujská republika","Nový Zéland","Nový Zéland","Nórsko","Nórske kráľovstvo","Omán","Ománsky sultanát","Pakistan","Pakistanská islamská republika","Palau","Palauská republika","Panama","Panamská republika","Papua-Nová Guinea","Nezávislý štát Papua-Nová Guinea","Paraguaj","Paraguajská republika","Peru","Peruánska republika","Pobrežie Slonoviny","Republika Pobrežie Slonoviny","Poľsko","Poľská republika","Portugalsko","Portugalská republika","Rakúsko","Rakúska republika","Rovníková Guinea","Republika Rovníková Guinea","Rumunsko","Rumunsko","Rusko","Ruská federácia","Rwanda","Rwandská republika","Salvádor","Salvádorská republika","Samoa","Nezávislý štát Samoa","San Maríno","Sanmarínska republika","Saudská Arábia","Kráľovstvo Saudskej Arábie","Senegal","Senegalská republika","Seychely","Seychelská republika","Sierra Leone","Republika Sierra Leone","Singapur","Singapurska republika","Slovensko","Slovenská republika","Slovinsko","Slovinská republika","Somálsko","Somálska demokratická republika","Spojené arabské emiráty","Spojené arabské emiráty","Spojené štáty americké","Spojené štáty americké","Srbsko a Čierna Hora","Srbsko a Čierna Hora","Srí Lanka","Demokratická socialistická republika Srí Lanka","Stredoafrická republika","Stredoafrická republika","Sudán","Sudánska republika","Surinam","Surinamská republika","Svazijsko","Svazijské kráľovstvo","Svätá Lucia","Svätá Lucia","Svätý Krištof a Nevis","Federácia Svätý Krištof a Nevis","Sv. Tomáš a Princov Ostrov","Demokratická republika Svätý Tomáš a Princov Ostrov","Sv. Vincent a Grenadíny","Svätý Vincent a Grenadíny","Sýria","Sýrska arabská republika","Šalamúnove ostrovy","Šalamúnove ostrovy","Španielsko","Španielske kráľovstvo","Švajčiarsko","Švajčiarska konfederácia","Švédsko","Švédske kráľovstvo","Tadžikistan","Tadžická republika","Taliansko","Talianska republika","Tanzánia","Tanzánijská zjednotená republika","Thajsko","Thajské kráľovstvo","Togo","Tožská republika","Tonga","Tonžské kráľovstvo","Trinidad a Tobago","Republika Trinidad a Tobago","Tunisko","Tuniská republika","Turecko","Turecká republika","Turkménsko","Turkménsko","Tuvalu","Tuvalu","Uganda","Ugandská republika","Ukrajina","Uruguaj","Uruguajská východná republika","Uzbekistan","Vanuatu","Vanuatská republika","Vatikán","Svätá Stolica","Veľká Británia","Spojené kráľovstvo Veľkej Británie a Severného Írska","Venezuela","Venezuelská bolívarovská republika","Vietnam","Vietnamská socialistická republika","Východný Timor","Demokratická republika Východný Timor","Zambia","Zambijská republika","Zimbabwe","Zimbabwianska republika"],"default_country":["Slovensko"],"postcode":["#####","### ##","## ###"],"secondary_address":["Apt. ###","Suite ###"],"state":[],"state_abbr":[],"street":["Adámiho","Ahoj","Albína Brunovského","Albrechtova","Alejová","Alešova","Alibernetová","Alžbetínska","Alžbety Gwerkovej","Ambroseho","Ambrušova","Americká","Americké námestie","Americké námestie","Andreja Mráza","Andreja Plávku","Andrusovova","Anenská","Anenská","Antolská","Astronomická","Astrová","Azalková","Azovská","Babuškova","Bachova","Bajkalská","Bajkalská","Bajkalská","Bajkalská","Bajkalská","Bajkalská","Bajzova","Bancíkovej","Banícka","Baníkova","Banskobystrická","Banšelova","Bardejovská","Bartókova","Bartoňova","Bartoškova","Baštová","Bazová","Bažantia","Beblavého","Beckovská","Bedľová","Belániková","Belehradská","Belinského","Belopotockého","Beňadická","Bencúrova","Benediktiho","Beniakova","Bernolákova","Beskydská","Betliarska","Bezručova","Biela","Bielkova","Björnsonova","Blagoevova","Blatnická","Blumentálska","Blyskáčová","Bočná","Bohrova","Bohúňova","Bojnická","Borodáčova","Borská","Bosákova","Botanická","Bottova","Boženy Němcovej","Bôrik","Bradáčova","Bradlianska","Brančská","Bratská","Brestová","Brezovská","Briežky","Brnianska","Brodná","Brodská","Broskyňová","Břeclavská","Budatínska","Budatínska","Budatínska","Búdkova  cesta","Budovateľská","Budyšínska","Budyšínska","Buková","Bukureštská","Bulharská","Bulíkova","Bystrého","Bzovícka","Cablkova","Cesta na Červený most","Cesta na Červený most","Cesta na Senec","Cikkerova","Cintorínska","Cintulova","Cukrová","Cyrilova","Čajakova","Čajkovského","Čaklovská","Čalovská","Čapajevova","Čapkova","Čárskeho","Čavojského","Čečinová","Čelakovského","Čerešňová","Černyševského","Červeňova","Česká","Československých par","Čipkárska","Čmelíkova","Čmeľovec","Čulenova","Daliborovo námestie","Dankovského","Dargovská","Ďatelinová","Daxnerovo námestie","Devínska cesta","Dlhé diely I.","Dlhé diely II.","Dlhé diely III.","Dobrovičova","Dobrovičova","Dobrovského","Dobšinského","Dohnalova","Dohnányho","Doležalova","Dolná","Dolnozemská cesta","Domkárska","Domové role","Donnerova","Donovalova","Dostojevského rad","Dr. Vladimíra Clemen","Drevená","Drieňová","Drieňová","Drieňová","Drotárska cesta","Drotárska cesta","Drotárska cesta","Družicová","Družstevná","Dubnická","Dubová","Dúbravská cesta","Dudova","Dulovo námestie","Dulovo námestie","Dunajská","Dvořákovo nábrežie","Edisonova","Einsteinova","Elektrárenská","Exnárova","F. Kostku","Fadruszova","Fajnorovo nábrežie","Fándlyho","Farebná","Farská","Farského","Fazuľová","Fedinova","Ferienčíkova","Fialkové údolie","Fibichova","Filiálne nádražie","Flöglova","Floriánske námestie","Fraňa Kráľa","Francisciho","Francúzskych partizá","Františkánska","Františkánske námest","Furdekova","Furdekova","Gabčíkova","Gagarinova","Gagarinova","Gagarinova","Gajova","Galaktická","Galandova","Gallova","Galvaniho","Gašparíkova","Gaštanová","Gavlovičova","Gemerská","Gercenova","Gessayova","Gettingová","Godrova","Gogoľova","Goláňova","Gondova","Goralská","Gorazdova","Gorkého","Gregorovej","Grösslingova","Gruzínska","Gunduličova","Gusevova","Haanova","Haburská","Halašova","Hálkova","Hálova","Hamuliakova","Hanácka","Handlovská","Hany Meličkovej","Harmanecká","Hasičská","Hattalova","Havlíčkova","Havrania","Haydnova","Herlianska","Herlianska","Heydukova","Hlaváčikova","Hlavatého","Hlavné námestie","Hlboká cesta","Hlboká cesta","Hlivová","Hlučínska","Hodálova","Hodžovo námestie","Holekova","Holíčska","Hollého","Holubyho","Hontianska","Horárska","Horné Židiny","Horská","Horská","Hrad","Hradné údolie","Hrachová","Hraničná","Hrebendova","Hríbová","Hriňovská","Hrobákova","Hrobárska","Hroboňova","Hudecova","Humenské námestie","Hummelova","Hurbanovo námestie","Hurbanovo námestie","Hviezdoslavovo námes","Hýrošova","Chalupkova","Chemická","Chlumeckého","Chorvátska","Chorvátska","Iľjušinova","Ilkovičova","Inovecká","Inovecká","Iskerníková","Ivana Horvátha","Ivánska cesta","J.C.Hronského","Jabloňová","Jadrová","Jakabova","Jakubovo námestie","Jamnického","Jána Stanislava","Janáčkova","Jančova","Janíkove role","Jankolova","Jánošíkova","Jánoškova","Janotova","Jánska","Jantárová cesta","Jarabinková","Jarná","Jaroslavova","Jarošova","Jaseňová","Jasná","Jasovská","Jastrabia","Jašíkova","Javorinská","Javorová","Jazdecká","Jedlíkova","Jégého","Jelačičova","Jelenia","Jesenná","Jesenského","Jiráskova","Jiskrova","Jozefská","Junácka","Jungmannova","Jurigovo námestie","Jurovského","Jurská","Justičná","K lomu","K Železnej studienke","Kalinčiakova","Kamenárska","Kamenné námestie","Kapicova","Kapitulská","Kapitulský dvor","Kapucínska","Kapušianska","Karadžičova","Karadžičova","Karadžičova","Karadžičova","Karloveská","Karloveské rameno","Karpatská","Kašmírska","Kaštielska","Kaukazská","Kempelenova","Kežmarské námestie","Kladnianska","Klariská","Kláštorská","Klatovská","Klatovská","Klemensova","Klincová","Klobučnícka","Klokočova","Kľukatá","Kmeťovo námestie","Koceľova","Kočánkova","Kohútova","Kolárska","Kolískova","Kollárovo námestie","Kollárovo námestie","Kolmá","Komárňanská","Komárnická","Komárnická","Komenského námestie","Kominárska","Komonicová","Konopná","Konvalinková","Konventná","Kopanice","Kopčianska","Koperníkova","Korabinského","Koreničova","Kostlivého","Kostolná","Košická","Košická","Košická","Kováčska","Kovorobotnícka","Kozia","Koziarka","Kozmonautická","Krajná","Krakovská","Kráľovské údolie","Krasinského","Kraskova","Krásna","Krásnohorská","Krasovského","Krátka","Krčméryho","Kremnická","Kresánkova","Krivá","Križkova","Krížna","Krížna","Krížna","Krížna","Krmanova","Krompašská","Krupinská","Krupkova","Kubániho","Kubínska","Kuklovská","Kukučínova","Kukuričná","Kulíškova","Kultúrna","Kupeckého","Kúpeľná","Kutlíkova","Kutuzovova","Kuzmányho","Kvačalova","Kvetná","Kýčerského","Kyjevská","Kysucká","Laborecká","Lackova","Ladislava Sáru","Ľadová","Lachova","Ľaliová","Lamačská cesta","Lamačská cesta","Lamanského","Landererova","Langsfeldova","Ľanová","Laskomerského","Laučekova","Laurinská","Lazaretská","Lazaretská","Legerského","Legionárska","Legionárska","Lehockého","Lehockého","Lenardova","Lermontovova","Lesná","Leškova","Letecká","Letisko M.R.Štefánik","Letná","Levárska","Levická","Levočská","Lidická","Lietavská","Lichardova","Lipová","Lipovinová","Liptovská","Listová","Líščie nivy","Líščie údolie","Litovská","Lodná","Lombardiniho","Lomonosovova","Lopenícka","Lovinského","Ľubietovská","Ľubinská","Ľubľanská","Ľubochnianska","Ľubovnianska","Lúčna","Ľudové námestie","Ľudovíta Fullu","Luhačovická","Lužická","Lužná","Lýcejná","Lykovcová","M. Hella","Magnetová","Macharova","Majakovského","Majerníkova","Májkova","Májová","Makovického","Malá","Malé pálenisko","Malinová","Malý Draždiak","Malý trh","Mamateyova","Mamateyova","Mánesovo námestie","Mariánska","Marie Curie-Sklodows","Márie Medveďovej","Markova","Marótyho","Martákovej","Martinčekova","Martinčekova","Martinengova","Martinská","Mateja Bela","Matejkova","Matičná","Matúšova","Medená","Medzierka","Medzilaborecká","Merlotová","Mesačná","Mestská","Meteorová","Metodova","Mickiewiczova","Mierová","Michalská","Mikovíniho","Mikulášska","Miletičova","Miletičova","Mišíkova","Mišíkova","Mišíkova","Mliekárenská","Mlynarovičova","Mlynská dolina","Mlynská dolina","Mlynská dolina","Mlynské luhy","Mlynské nivy","Mlynské nivy","Mlynské nivy","Mlynské nivy","Mlynské nivy","Mlyny","Modranská","Mojmírova","Mokráň záhon","Mokrohájska cesta","Moldavská","Molecova","Moravská","Moskovská","Most SNP","Mostová","Mošovského","Motýlia","Moyzesova","Mozartova","Mraziarenská","Mudroňova","Mudroňova","Mudroňova","Muchovo námestie","Murgašova","Muškátová","Muštová","Múzejná","Myjavská","Mýtna","Mýtna","Na Baránku","Na Brezinách","Na Hrebienku","Na Kalvárii","Na Kampárke","Na kopci","Na križovatkách","Na lánoch","Na paši","Na piesku","Na Riviére","Na Sitine","Na Slavíne","Na stráni","Na Štyridsiatku","Na úvrati","Na vŕšku","Na výslní","Nábělkova","Nábrežie arm. gen. L","Nábrežná","Nad Dunajom","Nad lomom","Nad lúčkami","Nad lúčkami","Nad ostrovom","Nad Sihoťou","Námestie 1. mája","Námestie Alexandra D","Námestie Biely kríž","Námestie Hraničiarov","Námestie Jána Pavla","Námestie Ľudovíta Št","Námestie Martina Ben","Nám. M.R.Štefánika","Námestie slobody","Námestie slobody","Námestie SNP","Námestie SNP","Námestie sv. Františ","Narcisová","Nedbalova","Nekrasovova","Neronetová","Nerudova","Nevädzová","Nezábudková","Niťová","Nitrianska","Nížinná","Nobelova","Nobelovo námestie","Nová","Nová Rožňavská","Novackého","Nové pálenisko","Nové záhrady I","Nové záhrady II","Nové záhrady III","Nové záhrady IV","Nové záhrady V","Nové záhrady VI","Nové záhrady VII","Novinárska","Novobanská","Novohradská","Novosvetská","Novosvetská","Novosvetská","Obežná","Obchodná","Očovská","Odbojárov","Odborárska","Odborárske námestie","Odborárske námestie","Ohnicová","Okánikova","Okružná","Olbrachtova","Olejkárska","Ondavská","Ondrejovova","Oravská","Orechová cesta","Orechový rad","Oriešková","Ormisova","Osadná","Ostravská","Ostredková","Osuského","Osvetová","Otonelská","Ovručská","Ovsištské námestie","Pajštúnska","Palackého","Palárikova","Palárikova","Pálavská","Palisády","Palisády","Palisády","Palkovičova","Panenská","Pankúchova","Panónska cesta","Panská","Papánkovo námestie","Papraďová","Páričkova","Parková","Partizánska","Pasienky","Paulínyho","Pavlovičova","Pavlovova","Pavlovská","Pažického","Pažítková","Pečnianska","Pernecká","Pestovateľská","Peterská","Petzvalova","Pezinská","Piesočná","Piešťanská","Pifflova","Pilárikova","Pionierska","Pivoňková","Planckova","Planét","Plátenícka","Pluhová","Plynárenská","Plzenská","Pobrežná","Pod Bôrikom","Pod Kalváriou","Pod lesom","Pod Rovnicami","Pod vinicami","Podhorského","Podjavorinskej","Podlučinského","Podniková","Podtatranského","Pohronská","Polárna","Poloreckého","Poľná","Poľská","Poludníková","Porubského","Poštová","Považská","Povraznícka","Povraznícka","Pražská","Predstaničné námesti","Prepoštská","Prešernova","Prešovská","Prešovská","Prešovská","Pri Bielom kríži","Pri dvore","Pri Dynamitke","Pri Habánskom mlyne","Pri hradnej studni","Pri seči","Pri Starej Prachárni","Pri Starom háji","Pri Starom Mýte","Pri strelnici","Pri Suchom mlyne","Pri zvonici","Pribinova","Pribinova","Pribinova","Pribišova","Pribylinská","Priečna","Priekopy","Priemyselná","Priemyselná","Prievozská","Prievozská","Prievozská","Príkopova","Primaciálne námestie","Prístav","Prístavná","Prokofievova","Prokopa Veľkého","Prokopova","Prúdová","Prvosienková","Púpavová","Pustá","Puškinova","Račianska","Račianska","Račianske mýto","Radarová","Rádiová","Radlinského","Radničná","Radničné námestie","Radvanská","Rajská","Raketová","Rákosová","Rastislavova","Rázusovo nábrežie","Repná","Rešetkova","Revolučná","Révová","Revúcka","Rezedová","Riazanská","Riazanská","Ribayová","Riečna","Rigeleho","Rízlingová","Riznerova","Robotnícka","Romanova","Röntgenova","Rosná","Rovná","Rovniankova","Rovníková","Rozmarínová","Rožňavská","Rožňavská","Rožňavská","Rubinsteinova","Rudnayovo námestie","Rumančeková","Rusovská cesta","Ružičková","Ružinovská","Ružinovská","Ružinovská","Ružomberská","Ružová dolina","Ružová dolina","Rybárska brána","Rybné námestie","Rýdziková","Sabinovská","Sabinovská","Sad Janka Kráľa","Sadová","Sartorisova","Sasinkova","Seberíniho","Sečovská","Sedlárska","Sedmokrásková","Segnerova","Sekulská","Semianova","Senická","Senná","Schillerova","Schody pri starej vo","Sibírska","Sienkiewiczova","Silvánska","Sinokvetná","Skalická cesta","Skalná","Sklenárova","Sklenárska","Sládkovičova","Sladová","Slávičie údolie","Slavín","Slepá","Sliačska","Sliezska","Slivková","Slnečná","Slovanská","Slovinská","Slovnaftská","Slowackého","Smetanova","Smikova","Smolenická","Smolnícka","Smrečianska","Soferove schody","Socháňova","Sokolská","Solivarská","Sološnická","Somolického","Somolického","Sosnová","Spišská","Spojná","Spoločenská","Sputniková","Sreznevského","Srnčia","Stachanovská","Stálicová","Staničná","Stará Černicová","Stará Ivánska cesta","Stará Prievozská","Stará Vajnorská","Stará vinárska","Staré Grunty","Staré ihrisko","Staré záhrady","Starhradská","Starohájska","Staromestská","Staroturský chodník","Staviteľská","Stodolova","Stoklasová","Strakova","Strážnická","Strážny dom","Strečnianska","Stredná","Strelecká","Strmá cesta","Strojnícka","Stropkovská","Struková","Studená","Stuhová","Súbežná","Súhvezdná","Suché mýto","Suchohradská","Súkennícka","Súľovská","Sumbalova","Súmračná","Súťažná","Svätého Vincenta","Svätoplukova","Svätoplukova","Svätovojtešská","Svetlá","Svíbová","Svidnícka","Svoradova","Svrčia","Syslia","Šafárikovo námestie","Šafárikovo námestie","Šafránová","Šagátova","Šalviová","Šancová","Šancová","Šancová","Šancová","Šándorova","Šarišská","Šášovská","Šaštínska","Ševčenkova","Šintavská","Šípková","Škarniclova","Školská","Škovránčia","Škultétyho","Šoltésovej","Špieszova","Špitálska","Športová","Šrobárovo námestie","Šťastná","Štedrá","Štefánikova","Štefánikova","Štefánikova","Štefanovičova","Štefunkova","Štetinova","Štiavnická","Štúrova","Štyndlova","Šulekova","Šulekova","Šulekova","Šumavská","Šuňavcova","Šustekova","Švabinského","Tabaková","Tablicova","Táborská","Tajovského","Tallerova","Tehelná","Technická","Tekovská","Telocvičná","Tematínska","Teplická","Terchovská","Teslova","Tetmayerova","Thurzova","Tichá","Tilgnerova","Timravina","Tobrucká","Tokajícka","Tolstého","Tománkova","Tomášikova","Tomášikova","Tomášikova","Tomášikova","Tomášikova","Topoľčianska","Topoľová","Továrenská","Trebišovská","Trebišovská","Trebišovská","Trenčianska","Treskoňova","Trnavská cesta","Trnavská cesta","Trnavská cesta","Trnavská cesta","Trnavská cesta","Trnavské mýto","Tŕňová","Trojdomy","Tučkova","Tupolevova","Turbínova","Turčianska","Turnianska","Tvarožkova","Tylova","Tyršovo nábrežie","Údernícka","Údolná","Uhorková","Ukrajinská","Ulica 29. augusta","Ulica 29. augusta","Ulica 29. augusta","Ulica 29. augusta","Ulica Imricha Karvaš","Ulica Jozefa Krónera","Ulica Viktora Tegelh","Úprkova","Úradnícka","Uránová","Urbánkova","Ursínyho","Uršulínska","Úzka","V záhradách","Vajanského nábrežie","Vajnorská","Vajnorská","Vajnorská","Vajnorská","Vajnorská","Vajnorská","Vajnorská","Vajnorská","Vajnorská","Valašská","Valchárska","Vansovej","Vápenná","Varínska","Varšavská","Varšavská","Vavilovova","Vavrínova","Vazovova","Včelárska","Velehradská","Veltlínska","Ventúrska","Veterná","Veternicová","Vetvová","Viedenská cesta","Viedenská cesta","Vietnamská","Vígľašská","Vihorlatská","Viktorínova","Vilová","Vincenta Hložníka","Vínna","Vlastenecké námestie","Vlčkova","Vlčkova","Vlčkova","Vodný vrch","Votrubova","Vrábeľská","Vrakunská cesta","Vranovská","Vretenová","Vrchná","Vrútocká","Vyhliadka","Vyhnianska cesta","Vysoká","Vyšehradská","Vyšná","Wattova","Wilsonova","Wolkrova","Za Kasárňou","Za sokolovňou","Za Stanicou","Za tehelňou","Záborského","Zadunajská cesta","Záhorácka","Záhradnícka","Záhradnícka","Záhradnícka","Záhradnícka","Záhrebská","Záhrebská","Zálužická","Zámocká","Zámocké schody","Zámočnícka","Západná","Západný rad","Záporožská","Zátišie","Závodníkova","Zelená","Zelinárska","Zimná","Zlaté piesky","Zlaté schody","Znievska","Zohorská","Zochova","Zrinského","Zvolenská","Žabí majer","Žabotova","Žehrianska","Železná","Železničiarska","Žellova","Žiarska","Židovská","Žilinská","Žilinská","Živnostenská","Žižkova","Župné námestie"],"street_address":["#{street_name} #{building_number}"],"street_name":["#{street}"],"time_zone":["Pacific/Midway","Pacific/Pago_Pago","Pacific/Honolulu","America/Juneau","America/Los_Angeles","America/Tijuana","America/Denver","America/Phoenix","America/Chihuahua","America/Mazatlan","America/Chicago","America/Regina","America/Mexico_City","America/Mexico_City","America/Monterrey","America/Guatemala","America/New_York","America/Indiana/Indianapolis","America/Bogota","America/Lima","America/Lima","America/Halifax","America/Caracas","America/La_Paz","America/Santiago","America/St_Johns","America/Sao_Paulo","America/Argentina/Buenos_Aires","America/Guyana","America/Godthab","Atlantic/South_Georgia","Atlantic/Azores","Atlantic/Cape_Verde","Europe/Dublin","Europe/London","Europe/Lisbon","Europe/London","Africa/Casablanca","Africa/Monrovia","Etc/UTC","Europe/Belgrade","Europe/Bratislava","Europe/Budapest","Europe/Ljubljana","Europe/Prague","Europe/Sarajevo","Europe/Skopje","Europe/Warsaw","Europe/Zagreb","Europe/Brussels","Europe/Copenhagen","Europe/Madrid","Europe/Paris","Europe/Amsterdam","Europe/Berlin","Europe/Berlin","Europe/Rome","Europe/Stockholm","Europe/Vienna","Africa/Algiers","Europe/Bucharest","Africa/Cairo","Europe/Helsinki","Europe/Kiev","Europe/Riga","Europe/Sofia","Europe/Tallinn","Europe/Vilnius","Europe/Athens","Europe/Istanbul","Europe/Minsk","Asia/Jerusalem","Africa/Harare","Africa/Johannesburg","Europe/Moscow","Europe/Moscow","Europe/Moscow","Asia/Kuwait","Asia/Riyadh","Africa/Nairobi","Asia/Baghdad","Asia/Tehran","Asia/Muscat","Asia/Muscat","Asia/Baku","Asia/Tbilisi","Asia/Yerevan","Asia/Kabul","Asia/Yekaterinburg","Asia/Karachi","Asia/Karachi","Asia/Tashkent","Asia/Kolkata","Asia/Kolkata","Asia/Kolkata","Asia/Kolkata","Asia/Kathmandu","Asia/Dhaka","Asia/Dhaka","Asia/Colombo","Asia/Almaty","Asia/Novosibirsk","Asia/Rangoon","Asia/Bangkok","Asia/Bangkok","Asia/Jakarta","Asia/Krasnoyarsk","Asia/Shanghai","Asia/Chongqing","Asia/Hong_Kong","Asia/Urumqi","Asia/Kuala_Lumpur","Asia/Singapore","Asia/Taipei","Australia/Perth","Asia/Irkutsk","Asia/Ulaanbaatar","Asia/Seoul","Asia/Tokyo","Asia/Tokyo","Asia/Tokyo","Asia/Yakutsk","Australia/Darwin","Australia/Adelaide","Australia/Melbourne","Australia/Melbourne","Australia/Sydney","Australia/Brisbane","Australia/Hobart","Asia/Vladivostok","Pacific/Guam","Pacific/Port_Moresby","Asia/Magadan","Asia/Magadan","Pacific/Noumea","Pacific/Fiji","Asia/Kamchatka","Pacific/Majuro","Pacific/Auckland","Pacific/Auckland","Pacific/Tongatapu","Pacific/Fakaofo","Pacific/Apia"]},"company":{"bs":[["implement","utilize","integrate","streamline","optimize","evolve","transform","embrace","enable","orchestrate","leverage","reinvent","aggregate","architect","enhance","incentivize","morph","empower","envisioneer","monetize","harness","facilitate","seize","disintermediate","synergize","strategize","deploy","brand","grow","target","syndicate","synthesize","deliver","mesh","incubate","engage","maximize","benchmark","expedite","reintermediate","whiteboard","visualize","repurpose","innovate","scale","unleash","drive","extend","engineer","revolutionize","generate","exploit","transition","e-enable","iterate","cultivate","matrix","productize","redefine","recontextualize"],["clicks-and-mortar","value-added","vertical","proactive","robust","revolutionary","scalable","leading-edge","innovative","intuitive","strategic","e-business","mission-critical","sticky","one-to-one","24/7","end-to-end","global","B2B","B2C","granular","frictionless","virtual","viral","dynamic","24/365","best-of-breed","killer","magnetic","bleeding-edge","web-enabled","interactive","dot-com","sexy","back-end","real-time","efficient","front-end","distributed","seamless","extensible","turn-key","world-class","open-source","cross-platform","cross-media","synergistic","bricks-and-clicks","out-of-the-box","enterprise","integrated","impactful","wireless","transparent","next-generation","cutting-edge","user-centric","visionary","customized","ubiquitous","plug-and-play","collaborative","compelling","holistic","rich"],["synergies","web-readiness","paradigms","markets","partnerships","infrastructures","platforms","initiatives","channels","eyeballs","communities","ROI","solutions","e-tailers","e-services","action-items","portals","niches","technologies","content","vortals","supply-chains","convergence","relationships","architectures","interfaces","e-markets","e-commerce","systems","bandwidth","infomediaries","models","mindshare","deliverables","users","schemas","networks","applications","metrics","e-business","functionalities","experiences","web services","methodologies"]],"buzzwords":[["Adaptive","Advanced","Ameliorated","Assimilated","Automated","Balanced","Business-focused","Centralized","Cloned","Compatible","Configurable","Cross-group","Cross-platform","Customer-focused","Customizable","Decentralized","De-engineered","Devolved","Digitized","Distributed","Diverse","Down-sized","Enhanced","Enterprise-wide","Ergonomic","Exclusive","Expanded","Extended","Face to face","Focused","Front-line","Fully-configurable","Function-based","Fundamental","Future-proofed","Grass-roots","Horizontal","Implemented","Innovative","Integrated","Intuitive","Inverse","Managed","Mandatory","Monitored","Multi-channelled","Multi-lateral","Multi-layered","Multi-tiered","Networked","Object-based","Open-architected","Open-source","Operative","Optimized","Optional","Organic","Organized","Persevering","Persistent","Phased","Polarised","Pre-emptive","Proactive","Profit-focused","Profound","Programmable","Progressive","Public-key","Quality-focused","Reactive","Realigned","Re-contextualized","Re-engineered","Reduced","Reverse-engineered","Right-sized","Robust","Seamless","Secured","Self-enabling","Sharable","Stand-alone","Streamlined","Switchable","Synchronised","Synergistic","Synergized","Team-oriented","Total","Triple-buffered","Universal","Up-sized","Upgradable","User-centric","User-friendly","Versatile","Virtual","Visionary","Vision-oriented"],["24 hour","24/7","3rd generation","4th generation","5th generation","6th generation","actuating","analyzing","asymmetric","asynchronous","attitude-oriented","background","bandwidth-monitored","bi-directional","bifurcated","bottom-line","clear-thinking","client-driven","client-server","coherent","cohesive","composite","context-sensitive","contextually-based","content-based","dedicated","demand-driven","didactic","directional","discrete","disintermediate","dynamic","eco-centric","empowering","encompassing","even-keeled","executive","explicit","exuding","fault-tolerant","foreground","fresh-thinking","full-range","global","grid-enabled","heuristic","high-level","holistic","homogeneous","human-resource","hybrid","impactful","incremental","intangible","interactive","intermediate","leading edge","local","logistical","maximized","methodical","mission-critical","mobile","modular","motivating","multimedia","multi-state","multi-tasking","national","needs-based","neutral","next generation","non-volatile","object-oriented","optimal","optimizing","radical","real-time","reciprocal","regional","responsive","scalable","secondary","solution-oriented","stable","static","systematic","systemic","system-worthy","tangible","tertiary","transitional","uniform","upward-trending","user-facing","value-added","web-enabled","well-modulated","zero administration","zero defect","zero tolerance"],["ability","access","adapter","algorithm","alliance","analyzer","application","approach","architecture","archive","artificial intelligence","array","attitude","benchmark","budgetary management","capability","capacity","challenge","circuit","collaboration","complexity","concept","conglomeration","contingency","core","customer loyalty","database","data-warehouse","definition","emulation","encoding","encryption","extranet","firmware","flexibility","focus group","forecast","frame","framework","function","functionalities","Graphic Interface","groupware","Graphical User Interface","hardware","help-desk","hierarchy","hub","implementation","info-mediaries","infrastructure","initiative","installation","instruction set","interface","internet solution","intranet","knowledge user","knowledge base","local area network","leverage","matrices","matrix","methodology","middleware","migration","model","moderator","monitoring","moratorium","neural-net","open architecture","open system","orchestration","paradigm","parallelism","policy","portal","pricing structure","process improvement","product","productivity","project","projection","protocol","secured line","service-desk","software","solution","standardization","strategy","structure","success","superstructure","support","synergy","system engine","task-force","throughput","time-frame","toolset","utilisation","website","workforce"]],"name":["#{Name.last_name} #{suffix}","#{Name.last_name} #{suffix}","#{Name.man_last_name} a #{Name.man_last_name} #{suffix}"],"suffix":["s.r.o.","a.s.","v.o.s."]},"internet":{"domain_suffix":["sk","com","net","eu","org"],"free_email":["gmail.com","zoznam.sk","azet.sk"]},"lorem":{"supplemental":["abbas","abduco","abeo","abscido","absconditus","absens","absorbeo","absque","abstergo","absum","abundans","abutor","accedo","accendo","acceptus","accipio","accommodo","accusator","acer","acerbitas","acervus","acidus","acies","acquiro","acsi","adamo","adaugeo","addo","adduco","ademptio","adeo","adeptio","adfectus","adfero","adficio","adflicto","adhaero","adhuc","adicio","adimpleo","adinventitias","adipiscor","adiuvo","administratio","admiratio","admitto","admoneo","admoveo","adnuo","adopto","adsidue","adstringo","adsuesco","adsum","adulatio","adulescens","adultus","aduro","advenio","adversus","advoco","aedificium","aeger","aegre","aegrotatio","aegrus","aeneus","aequitas","aequus","aer","aestas","aestivus","aestus","aetas","aeternus","ager","aggero","aggredior","agnitio","agnosco","ago","ait","aiunt","alienus","alii","alioqui","aliqua","alius","allatus","alo","alter","altus","alveus","amaritudo","ambitus","ambulo","amicitia","amiculum","amissio","amita","amitto","amo","amor","amoveo","amplexus","amplitudo","amplus","ancilla","angelus","angulus","angustus","animadverto","animi","animus","annus","anser","ante","antea","antepono","antiquus","aperio","aperte","apostolus","apparatus","appello","appono","appositus","approbo","apto","aptus","apud","aqua","ara","aranea","arbitro","arbor","arbustum","arca","arceo","arcesso","arcus","argentum","argumentum","arguo","arma","armarium","armo","aro","ars","articulus","artificiose","arto","arx","ascisco","ascit","asper","aspicio","asporto","assentator","astrum","atavus","ater","atqui","atrocitas","atrox","attero","attollo","attonbitus","auctor","auctus","audacia","audax","audentia","audeo","audio","auditor","aufero","aureus","auris","aurum","aut","autem","autus","auxilium","avaritia","avarus","aveho","averto","avoco","baiulus","balbus","barba","bardus","basium","beatus","bellicus","bellum","bene","beneficium","benevolentia","benigne","bestia","bibo","bis","blandior","bonus","bos","brevis","cado","caecus","caelestis","caelum","calamitas","calcar","calco","calculus","callide","campana","candidus","canis","canonicus","canto","capillus","capio","capitulus","capto","caput","carbo","carcer","careo","caries","cariosus","caritas","carmen","carpo","carus","casso","caste","casus","catena","caterva","cattus","cauda","causa","caute","caveo","cavus","cedo","celebrer","celer","celo","cena","cenaculum","ceno","censura","centum","cerno","cernuus","certe","certo","certus","cervus","cetera","charisma","chirographum","cibo","cibus","cicuta","cilicium","cimentarius","ciminatio","cinis","circumvenio","cito","civis","civitas","clam","clamo","claro","clarus","claudeo","claustrum","clementia","clibanus","coadunatio","coaegresco","coepi","coerceo","cogito","cognatus","cognomen","cogo","cohaero","cohibeo","cohors","colligo","colloco","collum","colo","color","coma","combibo","comburo","comedo","comes","cometes","comis","comitatus","commemoro","comminor","commodo","communis","comparo","compello","complectus","compono","comprehendo","comptus","conatus","concedo","concido","conculco","condico","conduco","confero","confido","conforto","confugo","congregatio","conicio","coniecto","conitor","coniuratio","conor","conqueror","conscendo","conservo","considero","conspergo","constans","consuasor","contabesco","contego","contigo","contra","conturbo","conventus","convoco","copia","copiose","cornu","corona","corpus","correptius","corrigo","corroboro","corrumpo","coruscus","cotidie","crapula","cras","crastinus","creator","creber","crebro","credo","creo","creptio","crepusculum","cresco","creta","cribro","crinis","cruciamentum","crudelis","cruentus","crur","crustulum","crux","cubicularis","cubitum","cubo","cui","cuius","culpa","culpo","cultellus","cultura","cum","cunabula","cunae","cunctatio","cupiditas","cupio","cuppedia","cupressus","cur","cura","curatio","curia","curiositas","curis","curo","curriculum","currus","cursim","curso","cursus","curto","curtus","curvo","curvus","custodia","damnatio","damno","dapifer","debeo","debilito","decens","decerno","decet","decimus","decipio","decor","decretum","decumbo","dedecor","dedico","deduco","defaeco","defendo","defero","defessus","defetiscor","deficio","defigo","defleo","defluo","defungo","degenero","degero","degusto","deinde","delectatio","delego","deleo","delibero","delicate","delinquo","deludo","demens","demergo","demitto","demo","demonstro","demoror","demulceo","demum","denego","denique","dens","denuncio","denuo","deorsum","depereo","depono","depopulo","deporto","depraedor","deprecator","deprimo","depromo","depulso","deputo","derelinquo","derideo","deripio","desidero","desino","desipio","desolo","desparatus","despecto","despirmatio","infit","inflammatio","paens","patior","patria","patrocinor","patruus","pauci","paulatim","pauper","pax","peccatus","pecco","pecto","pectus","pecunia","pecus","peior","pel","ocer","socius","sodalitas","sol","soleo","solio","solitudo","solium","sollers","sollicito","solum","solus","solutio","solvo","somniculosus","somnus","sonitus","sono","sophismata","sopor","sordeo","sortitus","spargo","speciosus","spectaculum","speculum","sperno","spero","spes","spiculum","spiritus","spoliatio","sponte","stabilis","statim","statua","stella","stillicidium","stipes","stips","sto","strenuus","strues","studio","stultus","suadeo","suasoria","sub","subito","subiungo","sublime","subnecto","subseco","substantia","subvenio","succedo","succurro","sufficio","suffoco","suffragium","suggero","sui","sulum","sum","summa","summisse","summopere","sumo","sumptus","supellex","super","suppellex","supplanto","suppono","supra","surculus","surgo","sursum","suscipio","suspendo","sustineo","suus","synagoga","tabella","tabernus","tabesco","tabgo","tabula","taceo","tactus","taedium","talio","talis","talus","tam","tamdiu","tamen","tametsi","tamisium","tamquam","tandem","tantillus","tantum","tardus","tego","temeritas","temperantia","templum","temptatio","tempus","tenax","tendo","teneo","tener","tenuis","tenus","tepesco","tepidus","ter","terebro","teres","terga","tergeo","tergiversatio","tergo","tergum","termes","terminatio","tero","terra","terreo","territo","terror","tersus","tertius","testimonium","texo","textilis","textor","textus","thalassinus","theatrum","theca","thema","theologus","thermae","thesaurus","thesis","thorax","thymbra","thymum","tibi","timidus","timor","titulus","tolero","tollo","tondeo","tonsor","torqueo","torrens","tot","totidem","toties","totus","tracto","trado","traho","trans","tredecim","tremo","trepide","tres","tribuo","tricesimus","triduana","triginta","tripudio","tristis","triumphus","trucido","truculenter","tubineus","tui","tum","tumultus","tunc","turba","turbo","turpe","turpis","tutamen","tutis","tyrannus","uberrime","ubi","ulciscor","ullus","ulterius","ultio","ultra","umbra","umerus","umquam","una","unde","undique","universe","unus","urbanus","urbs","uredo","usitas","usque","ustilo","ustulo","usus","uter","uterque","utilis","utique","utor","utpote","utrimque","utroque","utrum","uxor","vaco","vacuus","vado","vae","valde","valens","valeo","valetudo","validus","vallum","vapulus","varietas","varius","vehemens","vel","velociter","velum","velut","venia","venio","ventito","ventosus","ventus","venustas","ver","verbera","verbum","vere","verecundia","vereor","vergo","veritas","vero","versus","verto","verumtamen","verus","vesco","vesica","vesper","vespillo","vester","vestigium","vestrum","vetus","via","vicinus","vicissitudo","victoria","victus","videlicet","video","viduata","viduo","vigilo","vigor","vilicus","vilis","vilitas","villa","vinco","vinculum","vindico","vinitor","vinum","vir","virga","virgo","viridis","viriliter","virtus","vis","viscus","vita","vitiosus","vitium","vito","vivo","vix","vobis","vociferor","voco","volaticus","volo","volubilis","voluntarius","volup","volutabrum","volva","vomer","vomica","vomito","vorago","vorax","voro","vos","votum","voveo","vox","vulariter","vulgaris","vulgivagus","vulgo","vulgus","vulnero","vulnus","vulpes","vulticulus","vultuosus","xiphias"],"words":["alias","consequatur","aut","perferendis","sit","voluptatem","accusantium","doloremque","aperiam","eaque","ipsa","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt","explicabo","aspernatur","aut","odit","aut","fugit","sed","quia","consequuntur","magni","dolores","eos","qui","ratione","voluptatem","sequi","nesciunt","neque","dolorem","ipsum","quia","dolor","sit","amet","consectetur","adipisci","velit","sed","quia","non","numquam","eius","modi","tempora","incidunt","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem","ut","enim","ad","minima","veniam","quis","nostrum","exercitationem","ullam","corporis","nemo","enim","ipsam","voluptatem","quia","voluptas","sit","suscipit","laboriosam","nisi","ut","aliquid","ex","ea","commodi","consequatur","quis","autem","vel","eum","iure","reprehenderit","qui","in","ea","voluptate","velit","esse","quam","nihil","molestiae","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","laudantium","totam","rem","voluptatum","deleniti","atque","corrupti","quos","dolores","et","quas","molestias","excepturi","sint","occaecati","cupiditate","non","provident","sed","ut","perspiciatis","unde","omnis","iste","natus","error","similique","sunt","in","culpa","qui","officia","deserunt","mollitia","animi","id","est","laborum","et","dolorum","fuga","et","harum","quidem","rerum","facilis","est","et","expedita","distinctio","nam","libero","tempore","cum","soluta","nobis","est","eligendi","optio","cumque","nihil","impedit","quo","porro","quisquam","est","qui","minus","id","quod","maxime","placeat","facere","possimus","omnis","voluptas","assumenda","est","omnis","dolor","repellendus","temporibus","autem","quibusdam","et","aut","consequatur","vel","illum","qui","dolorem","eum","fugiat","quo","voluptas","nulla","pariatur","at","vero","eos","et","accusamus","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet","ut","et","voluptates","repudiandae","sint","et","molestiae","non","recusandae","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus","ut","aut","reiciendis","voluptatibus","maiores","doloribus","asperiores","repellat"]},"name":{"man_first_name":["Drahoslav","Severín","Alexej","Ernest","Rastislav","Radovan","Dobroslav","Dalibor","Vincent","Miloš","Timotej","Gejza","Bohuš","Alfonz","Gašpar","Emil","Erik","Blažej","Zdenko","Dezider","Arpád","Valentín","Pravoslav","Jaromír","Roman","Matej","Frederik","Viktor","Alexander","Radomír","Albín","Bohumil","Kazimír","Fridrich","Radoslav","Tomáš","Alan","Branislav","Bruno","Gregor","Vlastimil","Boleslav","Eduard","Jozef","Víťazoslav","Blahoslav","Beňadik","Adrián","Gabriel","Marián","Emanuel","Miroslav","Benjamín","Hugo","Richard","Izidor","Zoltán","Albert","Igor","Július","Aleš","Fedor","Rudolf","Valér","Marcel","Ervín","Slavomír","Vojtech","Juraj","Marek","Jaroslav","Žigmund","Florián","Roland","Pankrác","Servác","Bonifác","Svetozár","Bernard","Júlia","Urban","Dušan","Viliam","Ferdinand","Norbert","Róbert","Medard","Zlatko","Anton","Vasil","Vít","Adolf","Vratislav","Alfréd","Alojz","Ján","Tadeáš","Ladislav","Peter","Pavol","Miloslav","Prokop","Cyril","Metod","Patrik","Oliver","Ivan","Kamil","Henrich","Drahomír","Bohuslav","Iľja","Daniel","Vladimír","Jakub","Krištof","Ignác","Gustáv","Jerguš","Dominik","Oskar","Vavrinec","Ľubomír","Mojmír","Leonard","Tichomír","Filip","Bartolomej","Ľudovít","Samuel","Augustín","Belo","Oleg","Bystrík","Ctibor","Ľudomil","Konštantín","Ľuboslav","Matúš","Móric","Ľuboš","Ľubor","Vladislav","Cyprián","Václav","Michal","Jarolím","Arnold","Levoslav","František","Dionýz","Maximilián","Koloman","Boris","Lukáš","Kristián","Vendelín","Sergej","Aurel","Demeter","Denis","Hubert","Karol","Imrich","René","Bohumír","Teodor","Tibor","Maroš","Martin","Svätopluk","Stanislav","Leopold","Eugen","Félix","Klement","Kornel","Milan","Vratko","Ondrej","Andrej","Edmund","Oldrich","Oto","Mikuláš","Ambróz","Radúz","Bohdan","Adam","Štefan","Dávid","Silvester"],"man_last_name":["Antal","Babka","Bahna","Bahno","Baláž","Baran","Baranka","Bartovič","Bartoš","Bača","Bernolák","Beňo","Bicek","Bielik","Blaho","Bondra","Bosák","Boška","Brezina","Bukovský","Chalupka","Chudík","Cibula","Cibulka","Cibuľa","Cyprich","Cíger","Danko","Daňko","Daňo","Debnár","Dej","Dekýš","Doležal","Dočolomanský","Droppa","Dubovský","Dudek","Dula","Dulla","Dusík","Dvonč","Dzurjanin","Dávid","Fabian","Fabián","Fajnor","Farkašovský","Fico","Filc","Filip","Finka","Ftorek","Gašpar","Gašparovič","Gocník","Gregor","Greguš","Grznár","Hablák","Habšuda","Halda","Haluška","Halák","Hanko","Hanzal","Haščák","Heretik","Hečko","Hlaváček","Hlinka","Holub","Holuby","Hossa","Hoza","Hraško","Hric","Hrmo","Hrušovský","Huba","Ihnačák","Janeček","Janoška","Jantošovič","Janík","Janček","Jedľovský","Jendek","Jonata","Jurina","Jurkovič","Jurík","Jánošík","Kafenda","Kaliský","Karul","Keníž","Klapka","Kmeť","Kolesár","Kollár","Kolnik","Kolník","Kolár","Korec","Kostka","Kostrec","Kováč","Kováčik","Koza","Kočiš","Krajíček","Krajči","Krajčo","Krajčovič","Krajčír","Králik","Krúpa","Kubík","Kyseľ","Kállay","Labuda","Lepšík","Lipták","Lisický","Lubina","Lukáč","Lupták","Líška","Madej","Majeský","Malachovský","Malíšek","Mamojka","Marcinko","Marián","Masaryk","Maslo","Matiaško","Medveď","Melcer","Mečiar","Michalík","Mihalik","Mihál","Mihálik","Mikloško","Mikulík","Mikuš","Mikúš","Milota","Mináč","Mišík","Mojžiš","Mokroš","Mora","Moravčík","Mydlo","Nemec","Nitra","Novák","Obšut","Ondruš","Otčenáš","Pauko","Pavlikovský","Pavúk","Pašek","Paška","Paško","Pelikán","Petrovický","Petruška","Peško","Plch","Plekanec","Podhradský","Podkonický","Poliak","Pupák","Rak","Repiský","Romančík","Rus","Ružička","Rybníček","Rybár","Rybárik","Samson","Sedliak","Senko","Sklenka","Skokan","Skutecký","Slašťan","Sloboda","Slobodník","Slota","Slovák","Smrek","Stodola","Straka","Strnisko","Svrbík","Sámel","Sýkora","Tatar","Tatarka","Tatár","Tatárka","Thomka","Tomeček","Tomka","Tomko","Truben","Turčok","Uram","Urblík","Vajcík","Vajda","Valach","Valachovič","Valent","Valuška","Vanek","Vesel","Vicen","Višňovský","Vlach","Vojtek","Vydarený","Zajac","Zima","Zimka","Záborský","Zúbrik","Čapkovič","Čaplovič","Čarnogurský","Čierny","Čobrda","Ďaďo","Ďurica","Ďuriš","Šidlo","Šimonovič","Škriniar","Škultéty","Šmajda","Šoltés","Šoltýs","Štefan","Štefanka","Šulc","Šurka","Švehla","Šťastný"],"name":["#{prefix} #{man_first_name} #{man_last_name}","#{prefix} #{woman_first_name} #{woman_last_name}","#{man_first_name} #{man_last_name} #{suffix}","#{woman_first_name} #{woman_last_name} #{suffix}","#{man_first_name} #{man_last_name}","#{man_first_name} #{man_last_name}","#{man_first_name} #{man_last_name}","#{woman_first_name} #{woman_last_name}","#{woman_first_name} #{woman_last_name}","#{woman_first_name} #{woman_last_name}"],"prefix":["Ing.","Mgr.","JUDr.","MUDr."],"suffix":["Phd."],"title":{"descriptor":["Lead","Senior","Direct","Corporate","Dynamic","Future","Product","National","Regional","District","Central","Global","Customer","Investor","Dynamic","International","Legacy","Forward","Internal","Human","Chief","Principal"],"job":["Supervisor","Associate","Executive","Liason","Officer","Manager","Engineer","Specialist","Director","Coordinator","Administrator","Architect","Analyst","Designer","Planner","Orchestrator","Technician","Developer","Producer","Consultant","Assistant","Facilitator","Agent","Representative","Strategist"],"level":["Solutions","Program","Brand","Security","Research","Marketing","Directives","Implementation","Integration","Functionality","Response","Paradigm","Tactics","Identity","Markets","Group","Division","Applications","Optimization","Operations","Infrastructure","Intranet","Communications","Web","Branding","Quality","Assurance","Mobility","Accounts","Data","Creative","Configuration","Accountability","Interactions","Factors","Usability","Metrics"]},"woman_first_name":["Alexandra","Karina","Daniela","Andrea","Antónia","Bohuslava","Dáša","Malvína","Kristína","Nataša","Bohdana","Drahomíra","Sára","Zora","Tamara","Ema","Tatiana","Erika","Veronika","Agáta","Dorota","Vanda","Zoja","Gabriela","Perla","Ida","Liana","Miloslava","Vlasta","Lívia","Eleonóra","Etela","Romana","Zlatica","Anežka","Bohumila","Františka","Angela","Matilda","Svetlana","Ľubica","Alena","Soňa","Vieroslava","Zita","Miroslava","Irena","Milena","Estera","Justína","Dana","Danica","Jela","Jaroslava","Jarmila","Lea","Anastázia","Galina","Lesana","Hermína","Monika","Ingrida","Viktória","Blažena","Žofia","Sofia","Gizela","Viola","Gertrúda","Zina","Júlia","Juliana","Želmíra","Ela","Vanesa","Iveta","Vilma","Petronela","Žaneta","Xénia","Karolína","Lenka","Laura","Stanislava","Margaréta","Dobroslava","Blanka","Valéria","Paulína","Sidónia","Adriána","Beáta","Petra","Melánia","Diana","Berta","Patrícia","Lujza","Amália","Milota","Nina","Margita","Kamila","Dušana","Magdaléna","Oľga","Anna","Hana","Božena","Marta","Libuša","Božidara","Dominika","Hortenzia","Jozefína","Štefánia","Ľubomíra","Zuzana","Darina","Marcela","Milica","Elena","Helena","Lýdia","Anabela","Jana","Silvia","Nikola","Ružena","Nora","Drahoslava","Linda","Melinda","Rebeka","Rozália","Regína","Alica","Marianna","Miriama","Martina","Mária","Jolana","Ľudomila","Ľudmila","Olympia","Eugénia","Ľuboslava","Zdenka","Edita","Michaela","Stela","Viera","Natália","Eliška","Brigita","Valentína","Terézia","Vladimíra","Hedviga","Uršuľa","Alojza","Kvetoslava","Sabína","Dobromila","Klára","Simona","Aurélia","Denisa","Renáta","Irma","Agnesa","Klaudia","Alžbeta","Elvíra","Cecília","Emília","Katarína","Henrieta","Bibiána","Barbora","Marína","Izabela","Hilda","Otília","Lucia","Branislava","Bronislava","Ivica","Albína","Kornélia","Sláva","Slávka","Judita","Dagmara","Adela","Nadežda","Eva","Filoména","Ivana","Milada"],"woman_last_name":["Antalová","Babková","Bahnová","Balážová","Baranová","Baranková","Bartovičová","Bartošová","Bačová","Bernoláková","Beňová","Biceková","Bieliková","Blahová","Bondrová","Bosáková","Bošková","Brezinová","Bukovská","Chalupková","Chudíková","Cibulová","Cibulková","Cyprichová","Cígerová","Danková","Daňková","Daňová","Debnárová","Dejová","Dekýšová","Doležalová","Dočolomanská","Droppová","Dubovská","Dudeková","Dulová","Dullová","Dusíková","Dvončová","Dzurjaninová","Dávidová","Fabianová","Fabiánová","Fajnorová","Farkašovská","Ficová","Filcová","Filipová","Finková","Ftoreková","Gašparová","Gašparovičová","Gocníková","Gregorová","Gregušová","Grznárová","Habláková","Habšudová","Haldová","Halušková","Haláková","Hanková","Hanzalová","Haščáková","Heretiková","Hečková","Hlaváčeková","Hlinková","Holubová","Holubyová","Hossová","Hozová","Hrašková","Hricová","Hrmová","Hrušovská","Hubová","Ihnačáková","Janečeková","Janošková","Jantošovičová","Janíková","Jančeková","Jedľovská","Jendeková","Jonatová","Jurinová","Jurkovičová","Juríková","Jánošíková","Kafendová","Kaliská","Karulová","Kenížová","Klapková","Kmeťová","Kolesárová","Kollárová","Kolniková","Kolníková","Kolárová","Korecová","Kostkaová","Kostrecová","Kováčová","Kováčiková","Kozová","Kočišová","Krajíčeková","Krajčová","Krajčovičová","Krajčírová","Králiková","Krúpová","Kubíková","Kyseľová","Kállayová","Labudová","Lepšíková","Liptáková","Lisická","Lubinová","Lukáčová","Luptáková","Líšková","Madejová","Majeská","Malachovská","Malíšeková","Mamojková","Marcinková","Mariánová","Masaryková","Maslová","Matiašková","Medveďová","Melcerová","Mečiarová","Michalíková","Mihaliková","Mihálová","Miháliková","Miklošková","Mikulíková","Mikušová","Mikúšová","Milotová","Mináčová","Mišíková","Mojžišová","Mokrošová","Morová","Moravčíková","Mydlová","Nemcová","Nováková","Obšutová","Ondrušová","Otčenášová","Pauková","Pavlikovská","Pavúková","Pašeková","Pašková","Pelikánová","Petrovická","Petrušková","Pešková","Plchová","Plekanecová","Podhradská","Podkonická","Poliaková","Pupáková","Raková","Repiská","Romančíková","Rusová","Ružičková","Rybníčeková","Rybárová","Rybáriková","Samsonová","Sedliaková","Senková","Sklenková","Skokanová","Skutecká","Slašťanová","Slobodová","Slobodníková","Slotová","Slováková","Smreková","Stodolová","Straková","Strnisková","Svrbíková","Sámelová","Sýkorová","Tatarová","Tatarková","Tatárová","Tatárkaová","Thomková","Tomečeková","Tomková","Trubenová","Turčoková","Uramová","Urblíková","Vajcíková","Vajdová","Valachová","Valachovičová","Valentová","Valušková","Vaneková","Veselová","Vicenová","Višňovská","Vlachová","Vojteková","Vydarená","Zajacová","Zimová","Zimková","Záborská","Zúbriková","Čapkovičová","Čaplovičová","Čarnogurská","Čierná","Čobrdová","Ďaďová","Ďuricová","Ďurišová","Šidlová","Šimonovičová","Škriniarová","Škultétyová","Šmajdová","Šoltésová","Šoltýsová","Štefanová","Štefanková","Šulcová","Šurková","Švehlová","Šťastná"]},"phone_number":{"formats":["09## ### ###","0## #### ####","0# #### ####","+421 ### ### ###"]}}},"sv":{"faker":{"address":{"building_number":["###","##","#"],"city":["#{city_prefix}#{city_suffix}"],"city_prefix":["Söder","Norr","Väst","Öster","Aling","Ar","Av","Bo","Br","Bå","Ek","En","Esk","Fal","Gäv","Göte","Ha","Helsing","Karl","Krist","Kram","Kung","Kö","Lyck","Ny"],"city_suffix":["stad","land","sås","ås","holm","tuna","sta","berg","löv","borg","mora","hamn","fors","köping","by","hult","torp","fred","vik"],"common_street_suffix":["s Väg","s Gata"],"country":["Ryssland","Kanada","Kina","USA","Brasilien","Australien","Indien","Argentina","Kazakstan","Algeriet","DR Kongo","Danmark","Färöarna","Grönland","Saudiarabien","Mexiko","Indonesien","Sudan","Libyen","Iran","Mongoliet","Peru","Tchad","Niger","Angola","Mali","Sydafrika","Colombia","Etiopien","Bolivia","Mauretanien","Egypten","Tanzania","Nigeria","Venezuela","Namibia","Pakistan","Moçambique","Turkiet","Chile","Zambia","Marocko","Västsahara","Burma","Afghanistan","Somalia","Centralafrikanska republiken","Sydsudan","Ukraina","Botswana","Madagaskar","Kenya","Frankrike","Franska Guyana","Jemen","Thailand","Spanien","Turkmenistan","Kamerun","Papua Nya Guinea","Sverige","Uzbekistan","Irak","Paraguay","Zimbabwe","Japan","Tyskland","Kongo","Finland","Malaysia","Vietnam","Norge","Svalbard","Jan Mayen","Elfenbenskusten","Polen","Italien","Filippinerna","Ecuador","Burkina Faso","Nya Zeeland","Gabon","Guinea","Storbritannien","Ghana","Rumänien","Laos","Uganda","Guyana","Oman","Vitryssland","Kirgizistan","Senegal","Syrien","Kambodja","Uruguay","Tunisien","Surinam","Nepal","Bangladesh","Tadzjikistan","Grekland","Nicaragua","Eritrea","Nordkorea","Malawi","Benin","Honduras","Liberia","Bulgarien","Kuba","Guatemala","Island","Sydkorea","Ungern","Portugal","Jordanien","Serbien","Azerbajdzjan","Österrike","Förenade Arabemiraten","Tjeckien","Panama","Sierra Leone","Irland","Georgien","Sri Lanka","Litauen","Lettland","Togo","Kroatien","Bosnien och Hercegovina","Costa Rica","Slovakien","Dominikanska republiken","Bhutan","Estland","Danmark","Färöarna","Grönland","Nederländerna","Schweiz","Guinea-Bissau","Taiwan","Moldavien","Belgien","Lesotho","Armenien","Albanien","Salomonöarna","Ekvatorialguinea","Burundi","Haiti","Rwanda","Makedonien","Djibouti","Belize","Israel","El Salvador","Slovenien","Fiji","Kuwait","Swaziland","Timor-Leste","Montenegro","Bahamas","Vanuatu","Qatar","Gambia","Jamaica","Kosovo","Libanon","Cypern","Brunei","Trinidad och Tobago","Kap Verde","Samoa","Luxemburg","Komorerna","Mauritius","São Tomé och Príncipe","Kiribati","Dominica","Tonga","Mikronesiens federerade stater","Singapore","Bahrain","Saint Lucia","Andorra","Palau","Seychellerna","Antigua och Barbuda","Barbados","Saint Vincent och Grenadinerna","Grenada","Malta","Maldiverna","Saint Kitts och Nevis","Marshallöarna","Liechtenstein","San Marino","Tuvalu","Nauru","Monaco","Vatikanstaten"],"default_country":["Sverige"],"postcode":["#####"],"secondary_address":["Lgh. ###","Hus ###"],"state":["Blekinge","Dalarna","Gotland","Gävleborg","Göteborg","Halland","Jämtland","Jönköping","Kalmar","Kronoberg","Norrbotten","Skaraborg","Skåne","Stockholm","Södermanland","Uppsala","Värmland","Västerbotten","Västernorrland","Västmanland","Älvsborg","Örebro","Östergötland"],"street_address":["#{street_name} #{building_number}"],"street_name":["#{street_root}#{street_suffix}","#{street_prefix} #{street_root}#{street_suffix}","#{Name.first_name}#{common_street_suffix}","#{Name.last_name}#{common_street_suffix}"],"street_prefix":["Västra","Östra","Norra","Södra","Övre","Undre"],"street_root":["Björk","Järnvägs","Ring","Skol","Skogs","Ny","Gran","Idrotts","Stor","Kyrk","Industri","Park","Strand","Skol","Trädgård","Ängs","Kyrko","Villa","Ek","Kvarn","Stations","Back","Furu","Gen","Fabriks","Åker","Bäck","Asp"],"street_suffix":["vägen","gatan","gränden","gärdet","allén"]},"cell_phone":{"common_cell_prefix":[56,62,59],"formats":["#{common_cell_prefix}-###-####"]},"commerce":{"color":["vit","silver","grå","svart","röd","grön","blå","gul","lila","indigo","guld","brun","rosa","purpur","korall"],"department":["Böcker","Filmer","Musik","Spel","Elektronik","Datorer","Hem","Trädgård","Verktyg","Livsmedel","Hälsa","Skönhet","Leksaker","Klädsel","Skor","Smycken","Sport"],"product_name":{"adjective":["Liten","Ergonomisk","Robust","Intelligent","Söt","Otrolig","Fatastisk","Praktisk","Slimmad","Grym"],"material":["Stål","Metall","Trä","Betong","Plast","Bomul","Grnit","Gummi","Latex"],"product":["Stol","Bil","Dator","Handskar","Pants","Shirt","Table","Shoes","Hat"]}},"company":{"name":["#{Name.last_name} #{suffix}","#{Name.last_name}-#{Name.last_name}","#{Name.last_name}, #{Name.last_name} #{suffix}"],"suffix":["Gruppen","AB","HB","Group","Investment","Kommanditbolag","Aktiebolag"]},"internet":{"domain_suffix":["se","nu","info","com","org"]},"name":{"first_name_men":["Erik","Lars","Karl","Anders","Per","Johan","Nils","Lennart","Emil","Hans"],"first_name_women":["Maria","Anna","Margareta","Elisabeth","Eva","Birgitta","Kristina","Karin","Elisabet","Marie"],"last_name":["Johansson","Andersson","Karlsson","Nilsson","Eriksson","Larsson","Olsson","Persson","Svensson","Gustafsson"],"name":["#{first_name_women} #{last_name}","#{first_name_men} #{last_name}","#{first_name_women} #{last_name}","#{first_name_men} #{last_name}","#{first_name_women} #{last_name}","#{first_name_men} #{last_name}","#{prefix} #{first_name_men} #{last_name}","#{prefix} #{first_name_women} #{last_name}"],"prefix":["Dr.","Prof.","PhD."],"title":{"descriptor":["Lead","Senior","Direct","Corporate","Dynamic","Future","Product","National","Regional","District","Central","Global","Customer","Investor","Dynamic","International","Legacy","Forward","Internal","Human","Chief","Principal"],"job":["Supervisor","Associate","Executive","Liason","Officer","Manager","Engineer","Specialist","Director","Coordinator","Administrator","Architect","Analyst","Designer","Planner","Orchestrator","Technician","Developer","Producer","Consultant","Assistant","Facilitator","Agent","Representative","Strategist"],"level":["Solutions","Program","Brand","Security","Research","Marketing","Directives","Implementation","Integration","Functionality","Response","Paradigm","Tactics","Identity","Markets","Group","Division","Applications","Optimization","Operations","Infrastructure","Intranet","Communications","Web","Branding","Quality","Assurance","Mobility","Accounts","Data","Creative","Configuration","Accountability","Interactions","Factors","Usability","Metrics"]}},"phone_number":{"formats":["####-#####","####-######"]},"team":{"name":["#{Address.city} #{suffix}"],"suffix":["IF","FF","BK","HK","AIF","SK","FC","SK","BoIS","FK","BIS","FIF","IK"]}}},"vi":{"faker":{"address":{"city":["#{city_root}"],"city_root":["Bắc Giang","Bắc Kạn","Bắc Ninh","Cao Bằng","Điện Biên","Hà Giang","Hà Nam","Hà Tây","Hải Dương","TP Hải Phòng","Hòa Bình","Hưng Yên","Lai Châu","Lào Cai","Lạng Sơn","Nam Định","Ninh Bình","Phú Thọ","Quảng Ninh","Sơn La","Thái Bình","Thái Nguyên","Tuyên Quang","Vĩnh Phúc","Yên Bái","TP Đà Nẵng","Bình Định","Đắk Lắk","Đắk Nông","Gia Lai","Hà Tĩnh","Khánh Hòa","Kon Tum","Nghệ An","Phú Yên","Quảng Bình","Quảng Nam","Quảng Ngãi","Quảng Trị","Thanh Hóa","Thừa Thiên Huế","TP TP. Hồ Chí Minh","An Giang","Bà Rịa Vũng Tàu","Bạc Liêu","Bến Tre","Bình Dương","Bình Phước","Bình Thuận","Cà Mau","TP Cần Thơ","Đồng Nai","Đồng Tháp","Hậu Giang","Kiên Giang","Lâm Đồng","Long An","Ninh Thuận","Sóc Trăng","Tây Ninh","Tiền Giang","Trà Vinh","Vĩnh Long"],"county":["Avon","Bedfordshire","Berkshire","Borders","Buckinghamshire","Cambridgeshire","Central","Cheshire","Cleveland","Clwyd","Cornwall","County Antrim","County Armagh","County Down","County Fermanagh","County Londonderry","County Tyrone","Cumbria","Derbyshire","Devon","Dorset","Dumfries and Galloway","Durham","Dyfed","East Sussex","Essex","Fife","Gloucestershire","Grampian","Greater Manchester","Gwent","Gwynedd County","Hampshire","Herefordshire","Hertfordshire","Highlands and Islands","Humberside","Isle of Wight","Kent","Lancashire","Leicestershire","Lincolnshire","Lothian","Merseyside","Mid Glamorgan","Norfolk","North Yorkshire","Northamptonshire","Northumberland","Nottinghamshire","Oxfordshire","Powys","Rutland","Shropshire","Somerset","South Glamorgan","South Yorkshire","Staffordshire","Strathclyde","Suffolk","Surrey","Tayside","Tyne and Wear","Việt Nam","Warwickshire","West Glamorgan","West Midlands","West Sussex","West Yorkshire","Wiltshire","Worcestershire"],"default_country":["Việt Nam"],"postcode":"/[A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}/"},"cell_phone":{"formats":["074## ######","075## ######","076## ######","077## ######","078## ######","079## ######"]},"company":{"name":["#{prefix} #{Name.last_name}"],"prefix":["Công ty","Cty TNHH","Cty","Cửa hàng","Trung tâm","Chi nhánh"]},"internet":{"domain_suffix":["com","net","info","vn","com.vn"]},"lorem":{"words":["đã","đang","ừ","ờ","á","không","biết","gì","hết","đâu","nha","thế","thì","là","đánh","đá","đập","phá","viết","vẽ","tô","thuê","mướn","mượn","mua","một","hai","ba","bốn","năm","sáu","bảy","tám","chín","mười","thôi","việc","nghỉ","làm","nhà","cửa","xe","đạp","ác","độc","khoảng","khoan","thuyền","tàu","bè","lầu","xanh","đỏ","tím","vàng","kim","chỉ","khâu","may","vá","em","anh","yêu","thương","thích","con","cái","bàn","ghế","tủ","quần","áo","nón","dép","giày","lỗi","được","ghét","giết","chết","hết","tôi","bạn","tui","trời","trăng","mây","gió","máy","hàng","hóa","leo","núi","bơi","biển","chìm","xuồng","nước","ngọt","ruộng","đồng","quê","hương"]},"name":{"first_name":["Phạm","Nguyễn","Trần","Lê","Lý","Hoàng","Phan","Vũ","Tăng","Đặng","Bùi","Đỗ","Hồ","Ngô","Dương","Đào","Đoàn","Vương","Trịnh","Đinh","Lâm","Phùng","Mai","Tô","Trương","Hà"],"last_name":["Nam","Trung","Thanh","Thị","Văn","Dương","Tăng","Quốc","Như","Phạm","Nguyễn","Trần","Lê","Lý","Hoàng","Phan","Vũ","Tăng","Đặng","Bùi","Đỗ","Hồ","Ngô","Dương","Đào","Đoàn","Vương","Trịnh","Đinh","Lâm","Phùng","Mai","Tô","Trương","Hà","Vinh","Nhung","Hòa","Tiến","Tâm","Bửu","Loan","Hiền","Hải","Vân","Kha","Minh","Nhân","Triệu","Tuân","Hữu","Đức","Phú","Khoa","Thắgn","Sơn","Dung","Tú","Trinh","Thảo","Sa","Kim","Long","Thi","Cường","Ngọc","Sinh","Khang","Phong","Thắm","Thu","Thủy","Nhàn"],"name":["#{first_name} #{last_name}","#{first_name} #{last_name} #{last_name}","#{first_name} #{last_name} #{last_name} #{last_name}"]},"phone_number":{"formats":["01#### #####","01### ######","01#1 ### ####","011# ### ####","02# #### ####","03## ### ####","055 #### ####","056 #### ####","0800 ### ####","08## ### ####","09## ### ####","016977 ####","01### #####","0500 ######","0800 ######"]}}},"zh-CN":{"faker":{"address":{"building_number":["#####","####","###","##","#"],"city":["#{city_prefix}#{city_suffix}"],"city_prefix":["长","上","南","西","北","诸","宁","珠","武","衡","成","福","厦","贵","吉","海","太","济","安","吉","包"],"city_suffix":["沙市","京市","宁市","安市","乡县","海市","码市","汉市","阳市","都市","州市","门市","阳市","口市","原市","南市","徽市","林市","头市"],"default_country":["中国"],"postcode":["######"],"state":["北京市","上海市","天津市","重庆市","黑龙江省","吉林省","辽宁省","内蒙古","河北省","新疆","甘肃省","青海省","陕西省","宁夏","河南省","山东省","山西省","安徽省","湖北省","湖南省","江苏省","四川省","贵州省","云南省","广西省","西藏","浙江省","江西省","广东省","福建省","台湾省","海南省","香港","澳门"],"state_abbr":["京","沪","津","渝","黑","吉","辽","蒙","冀","新","甘","青","陕","宁","豫","鲁","晋","皖","鄂","湘","苏","川","黔","滇","桂","藏","浙","赣","粤","闽","台","琼","港","澳"],"street_address":["#{street_name}#{building_number}号"],"street_name":["#{Name.last_name}#{street_suffix}"],"street_suffix":["巷","街","路","桥","侬","旁","中心","栋"]},"name":{"first_name":["王","李","张","刘","陈","杨","黄","吴","赵","周","徐","孙","马","朱","胡","林","郭","何","高","罗","郑","梁","谢","宋","唐","许","邓","冯","韩","曹","曾","彭","萧","蔡","潘","田","董","袁","于","余","叶","蒋","杜","苏","魏","程","吕","丁","沈","任","姚","卢","傅","钟","姜","崔","谭","廖","范","汪","陆","金","石","戴","贾","韦","夏","邱","方","侯","邹","熊","孟","秦","白","江","阎","薛","尹","段","雷","黎","史","龙","陶","贺","顾","毛","郝","龚","邵","万","钱","严","赖","覃","洪","武","莫","孔"],"last_name":["绍齐","博文","梓晨","胤祥","瑞霖","明哲","天翊","凯瑞","健雄","耀杰","潇然","子涵","越彬","钰轩","智辉","致远","俊驰","雨泽","烨磊","晟睿","文昊","修洁","黎昕","远航","旭尧","鸿涛","伟祺","荣轩","越泽","浩宇","瑾瑜","皓轩","擎苍","擎宇","志泽","子轩","睿渊","弘文","哲瀚","雨泽","楷瑞","建辉","晋鹏","天磊","绍辉","泽洋","鑫磊","鹏煊","昊强","伟宸","博超","君浩","子骞","鹏涛","炎彬","鹤轩","越彬","风华","靖琪","明辉","伟诚","明轩","健柏","修杰","志泽","弘文","峻熙","嘉懿","煜城","懿轩","烨伟","苑博","伟泽","熠彤","鸿煊","博涛","烨霖","烨华","煜祺","智宸","正豪","昊然","明杰","立诚","立轩","立辉","峻熙","弘文","熠彤","鸿煊","烨霖","哲瀚","鑫鹏","昊天","思聪","展鹏","笑愚","志强","炫明","雪松","思源","智渊","思淼","晓啸","天宇","浩然","文轩","鹭洋","振家","乐驹","晓博","文博","昊焱","立果","金鑫","锦程","嘉熙","鹏飞","子默","思远","浩轩","语堂","聪健","明","文","果","思","鹏","驰","涛","琪","浩","航","彬"],"name":["#{first_name}#{last_name}"]},"phone_number":{"formats":["###-########","####-########","###########"]}}}};
}));



(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (typeof element.data('ujs:enable-with') !== 'undefined') element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  $(document).on('ready page:load', function() {
    return $(document).on('ajax:beforeSend', '[data-remote-modal]', function(e, xhr, settings) {
      xhr.setRequestHeader('Accept', 'js/modal');
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
      xhr.overrideMimeType("text/javascript, application/javascript");
      return settings["modal"] = "text/javascript, application/javascript";
    });
  });

}).call(this);
(function() {
  $(document).on('click', '[data-remote-modal]', function(e) {
    var $outer, $placeholder;
    $placeholder = $("<h3></h3>").addClass('modal-loading__text').text(I18n.t('application.please_wait'));
    $outer = $('<div></div>').addClass("modal__loading lookbook-modal__loading vertical-align").html($placeholder);
    $('.modal-body').first().html($outer);
    return $('.modal').first().modal('show');
  });

}).call(this);
(function() {


}).call(this);
(function() {
  window.mainLocation = jQuery.extend({}, window.location);

  $(window).on('popstate', function(e) {
    var state;
    state = e.originalEvent.state || history.state || {};
    if (!state.modalOpened) {
      return $('#main-modal').modal('hide');
    }
  });

  $(document).on('hidden.bs.modal', '#main-modal', function() {
    return history.pushState({
      turbolinks: true,
      url: mainLocation.href
    }, '', mainLocation.pathname);
  });

  window.openModalWithUrl = function(html, url, selector) {
    if (selector == null) {
      selector = "#main-modal";
    }
    $('.modal-body', selector).html(html);
    $(selector).modal('show');
    return history.pushState({
      modalOpened: true
    }, '', url);
  };

}).call(this);
/**
 * @preserve
 * Project: Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Version: v2.2.1
 * Contributors: Mattia Larentis
 * Dependencies: Bootstrap's Dropdown plugin, jQuery
 * Description: A simple plugin to enable Bootstrap dropdowns to active on hover and provide a nice user experience.
 * License: MIT
 * Homepage: http://cameronspear.com/blog/bootstrap-dropdown-on-hover-plugin/
 */

!function(e,n){var o=e();e.fn.dropdownHover=function(t){return"ontouchstart"in document?this:(o=o.add(this.parent()),this.each(function(){function r(){d.parents(".navbar").find(".navbar-toggle").is(":visible")||(n.clearTimeout(a),n.clearTimeout(i),i=n.setTimeout(function(){o.find(":focus").blur(),v.instantlyCloseOthers===!0&&o.removeClass("open"),n.clearTimeout(i),d.attr("aria-expanded","true"),s.addClass("open"),d.trigger(h)},v.hoverDelay))}var a,i,d=e(this),s=d.parent(),u={delay:500,hoverDelay:0,instantlyCloseOthers:!0},l={delay:e(this).data("delay"),hoverDelay:e(this).data("hover-delay"),instantlyCloseOthers:e(this).data("close-others")},h="show.bs.dropdown",c="hide.bs.dropdown",v=e.extend(!0,{},u,t,l);s.hover(function(e){return s.hasClass("open")||d.is(e.target)?void r(e):!0},function(){n.clearTimeout(i),a=n.setTimeout(function(){d.attr("aria-expanded","false"),s.removeClass("open"),d.trigger(c)},v.delay)}),d.hover(function(e){return s.hasClass("open")||s.is(e.target)?void r(e):!0}),s.find(".dropdown-submenu").each(function(){var o,t=e(this);t.hover(function(){n.clearTimeout(o),t.children(".dropdown-menu").show(),t.siblings().children(".dropdown-menu").hide()},function(){var e=t.children(".dropdown-menu");o=n.setTimeout(function(){e.hide()},v.delay)})})}))},e(document).ready(function(){e('[data-hover="dropdown"]').dropdownHover()})}(jQuery,window);
(function() {
  $(document).on('click', 'a.lookbook-pins__item', function(e) {
    history.pushState({
      modalOpened: true,
      target: e.currentTarget.getAttribute('href'),
      turbolinks: true
    }, '', e.currentTarget.getAttribute('href'));
    return $(window).trigger('hashchange');
  });

  $(document).on('click', '.lookbook-links__item', function(e) {
    return $('.lookbook-pins__item[href=#' + $(this).prop('id') + ']')[0].click();
  });

  $(window).bind('hashchange load', function(e) {
    $("[data-hash-highlight]").removeClass('active');
    if (location.hash.length) {
      return $("[data-hash-highlight=" + location.hash + "]").addClass('active');
    }
  });

}).call(this);
