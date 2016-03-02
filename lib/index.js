'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var copy = require( 'utils-copy' );
var deepMerge = require( './deepmerge.js' );
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );


// CREATE MERGE FUNCTION //

/**
* FUNCTION: createMergeFcn( [options] )
*	Returns a function for merging and extending objects.
*
* @param {Object} [options] - merge options
* @param {Number} [options.level=Infinity] - merge level
* @param {Boolean} [options.copy=true] - boolean indicating whether to deep copy merged values
* @param {Boolean|Function} [options.override=true] - defines the merge strategy
* @param {Boolean} [options.extend=true] - boolean indicating whether new properties can be added to the target object
* @returns {Function} function which can be used to merge objects
*/
function createMergeFcn( options ) {
	var opts;
	var err;
	opts = copy( defaults );
	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	return merge;

	/**
	* FUNCTION: merge( target, source1[, source2[,...,sourceN]] )
	*	Merges objects into a target object. Note that the target object is mutated.
	*
	* @private
	* @param {Object} target - target object
	* @param {...Object} source - source objects; i.e., objects to be merged into the target object
	* @returns {Object} merged object
	*/
	function merge( target ) {
		var nargs = arguments.length - 1;
		var arg;
		var src;
		var i;

		if ( nargs < 1 ) {
			throw new Error( 'insufficient input arguments. Must provide both a target object and one or more source objects.' );
		}
		if ( !isObject( target ) ) {
			throw new TypeError( 'invalid input argument. Target must be an object. Value: `' + target + '`.' );
		}
		src = new Array( nargs );
		for ( i = 0; i < nargs; i++ ) {
			arg = arguments[ i+1 ];
			// NOTE: this is a porous check. Buffers, Numbers, Booleans, Strings, Dates, RegExp, custom class instances,... will all pass.
			if ( !isObject( arg ) ) {
				throw new TypeError( 'invalid input argument. A merge source must be an object. Value: `' + arg + '`.' );
			}
			src[ i ] = arg;
		}
		for ( i = 0; i < nargs; i++ ) {
			deepMerge( target, src[ i ], opts.level, opts.copy, opts.override, opts.extend );
		}
		return target;
	} // end FUNCTION merge()
} // end FUNCTION createMergeFcn()


// EXPORTS //

module.exports = createMergeFcn;
