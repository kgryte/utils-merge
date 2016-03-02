'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var deepMerge = require( './deepmerge.js' );


// MERGE FUNCTION //

/**
* FUNCTION: mergefcn( opts )
*	Returns a merge function based on provided options.
*
* @param {Object} opts - function options
* @param {Number} options.level - merge level
* @param {Boolean} options.copy - boolean indicating whether to deep copy merged values
* @param {Boolean|Function} options.override - defines the merge strategy
* @param {Boolean} options.extend - boolean indicating whether new properties can be added to the target object
* @returns {Function} merge function
*/
function mergefcn( opts ) {
	/**
	* FUNCTION: merge( target, source1[, source2[,...,sourceN]] )
	*	Merges objects into a target object. Note that the target object is mutated.
	*
	* @param {Object} target - target object
	* @param {...Object} source - source objects (i.e., objects to be merged into the target object)
	* @returns {Object} merged (target) object
	*/
	return function merge( target ) {
		var nargs;
		var arg;
		var src;
		var i;

		nargs = arguments.length - 1;
		if ( nargs < 1 ) {
			throw new Error( 'insufficient input arguments. Must provide both a target object and one or more source objects.' );
		}
		if ( !isObject( target ) ) {
			throw new TypeError( 'invalid input argument. First argument must be an object. Value: `' + target + '`.' );
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
	}; // end FUNCTION merge()
} // end FUNCTION mergefcn()


// EXPORTS //

module.exports = mergefcn;
