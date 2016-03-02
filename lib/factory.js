'use strict';

// MODULES //

var copy = require( 'utils-copy' );
var validate = require( './validate.js' );
var defaults = require( './defaults.js' );
var mergefcn = require( './mergefcn.js' );


// FACTORY //

/**
* FUNCTION: factory( options )
*	Returns a function for merging and extending objects.
*
* @param {Object} options - merge options
* @param {Number} [options.level=Infinity] - merge level
* @param {Boolean} [options.copy=true] - boolean indicating whether to deep copy merged values
* @param {Boolean|Function} [options.override=true] - defines the merge strategy
* @param {Boolean} [options.extend=true] - boolean indicating whether new properties can be added to the target object
* @returns {Function} function which can be used to merge objects
*/
function factory( options ) {
	var opts;
	var err;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	return mergefcn( opts );
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
