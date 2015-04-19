'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isArray = require( 'validate.io-array' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	typeName = require( 'type-name' );


// FUNCTIONS //

/**
* FUNCTION: objectKeys( obj )
*	Returns an object's keys.
*
* @private
* @param {Array|Object} obj - object
* @returns {Array} array of keys
*/
function objectKeys( obj ) {
	var keys = [],
		key;
	for ( key in obj ) {
		if ( obj.hasOwnProperty( key ) ) {
			keys.push( key );
		}
	}
	return keys;
} // end METHOD objectKeys()

/**
* Create functions for copying typed arrays.
*/
var typedArrays = {
	'Int8Array': null,
	'Uint8Array': null,
	'Uint8ClampedArray': null,
	'Int16Array': null,
	'Uint16Array': null,
	'Int32Array': null,
	'Uint32Array': null,
	'Float32Array': null,
	'Float64Array': null
};

(function createTypedArrayFcns() {
	/* jshint evil:true */
	var keys = objectKeys( typedArrays ),
		len = keys.length,
		key,
		i;
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		typedArrays[ key ] = new Function( 'arr', 'return new '+key+'( arr );' );
	}
})();


// DEEP MERGE //

/**
* FUNCTION: deepMerge()
*
*
* @private
*/
function deepMerge() {
	// TBD
} // end FUNCTION deepMerge()


// CREATE MERGE FUNCTION //

/**
* FUNCTION: createMergeFcn( [options] )
*	Returns a function for merging objects.
*
* @param {Object} [options] - merge options
* @param {Number} [options.level=Infinity] - merge level
* @param {Boolean} [options.copy=false] - boolean indicating whether to deep copy merged values
* @param {Boolean|Function} [options.override=true] - defines the merge strategy
* @param {Boolean} [options.extend=true] - boolean indicating whether new properties can be added to the target object
* @returns {Function} function which can be used to merge objects
*/
function createMergeFcn( options ) {
	var level = Number.POSITIVE_INFINITY,
		override = true,
		extend = true,
		copy = false,
		opts;

	if ( arguments.length ) {
		opts = options;
		if ( !isObject( opts ) ) {
			throw new TypeError( 'merge()::invalid input argument. Must provide an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'level' ) ) {
			level = opts.level;
			if ( !isPositiveInteger( level ) ) {
				throw new TypeError( 'merge()::invalid option. Level option must be a positive integer. Option: `' + level + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) )  {
				throw new TypeError( 'merge()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'override' ) ) {
			override = opts.override;
			if ( !isBoolean( override ) && !isFunction( override ) ) {
				throw new TypeError( 'merge()::invalid option. Override option must be either a boolean primitive or a function. Option: `' + override + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'extend' ) ) {
			extend = opts.extend;
			if ( !isBoolean( extend ) ) {
				throw new TypeError( 'merge()::invalid option. Extend option must be a boolean primitive. Option: `' + extend + '`.' );
			}
		}
	}
	return merge;

	/**
	* FUNCTION: merge( target, source1[, source2,...,sourceN] )
	*	Merges objects into a target object.
	*
	* @private
	* @param {Object} target - target object
	* @param {...Object} source - source objects; i.e., objects to be merged into the target object
	* @returns {Object} merged object
	*/
	function merge( target ) {
		var nargs = arguments.length - 1,
			arg,
			src,
			i;

		if ( nargs < 1 ) {
			throw new Error( 'merge()::insufficient input arguments. Must provide both a target object and one or more source objects.' );
		}
		if ( !isObject( target ) ) {
			throw new TypeError( 'merge()::invalid input argument. Target must be an object. Value: `' + target + '`.' );
		}
		src = new Array( nargs );
		for ( i = 0; i < nargs; i++ ) {
			arg = arguments[ i+1 ];
			// NOTE: this is a porous check. Buffers, Numbers, Booleans, Strings, Dates, RegExp, custom class instances,... will all pass.
			if ( !isObject( arg ) ) {
				throw new TypeError( 'merge()::invalid input argument. A merge source must be an object. Value: `' + arg + '`.' );
			}
			src[ i ] = arg;
		}
		for ( i = 0; i < nargs; i++ ) {
			deepMerge( target, src[ i ], level, copy, override, extend );
		}
		return target;
	} // end FUNCTION merge()
} // end FUNCTION createMergeFcn()


// EXPORTS //

module.exports = createMergeFcn;
