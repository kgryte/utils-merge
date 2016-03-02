'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isBoolean = require( 'validate.io-boolean-primitive' );
var isFunction = require( 'validate.io-function' );
var isPositiveInteger = require( 'validate.io-positive-integer' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {Number} [options.level] - merge level
* @param {Boolean} [options.copy] - boolean indicating whether to deep copy merged values
* @param {Boolean|Function} [options.override] - defines the merge strategy
* @param {Boolean} [options.extend] - boolean indicating whether new properties can be added to the target object
* @returns {Error|Null} error object or null
*/
function validate( opts, options ) {
	if ( !isObject( opts ) ) {
		throw new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
	}
	if ( options.hasOwnProperty( 'level' ) ) {
		opts.level = options.level;
		if ( !isPositiveInteger( opts.level ) ) {
			return new TypeError( 'invalid option. `level` option must be a positive integer. Option: `' + opts.level + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) )  {
			return new TypeError( 'invalid option. `copy` option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'override' ) ) {
		opts.override = options.override;
		if ( !isBoolean( opts.override ) && !isFunction( opts.override ) ) {
			return new TypeError( 'invalid option. `override` option must be either a boolean primitive or a function. Option: `' + opts.override + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'extend' ) ) {
		opts.extend = options.extend;
		if ( !isBoolean( opts.extend ) ) {
			return new TypeError( 'invalid option. `extend` option must be a boolean primitive. Option: `' + opts.extend + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
