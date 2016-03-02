'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isBuffer = require( 'validate.io-buffer' );
var typeName = require( 'type-name' );
var createCopy = require( 'utils-copy' );
var objectKeys = require( 'object-keys' ).shim();


// DEEP MERGE //

/**
* FUNCTION: deepMerge( target, source, level, copy, override, extend )
*	Merges a source object into a target object.
*
* @param {Object} target - target object
* @param {Object} source - source object
* @param {Number} level - merge level
* @param {Boolean} copy - indicates whether to perform a deep copy of merged values
* @param {Boolean|Function} override - defines the merge strategy
* @param {Boolean} extend - indicates whether new properties can be added to the target object
* @returns {Void}
*/
function deepMerge( target, source, level, copy, override, extend ) {
	var hasProp;
	var isFunc;
	var name;
	var keys;
	var curr;
	var key;
	var val;
	var tmp;
	var i;

	// Determine if we were provided a custom override strategy:
	isFunc = ( typeof override === 'function' );

	// Decrement the level:
	level = level - 1;

	// Loop through the source keys and implement the merge strategy...
	keys = objectKeys( source );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		hasProp = target.hasOwnProperty( key );

		// Can we add new properties to the target?
		if ( !hasProp && !extend ) {
			continue;
		}
		val = source[ key ];

		if ( hasProp ) {
			curr = target[ key ];
			name = typeName( curr );

			// Should we recurse to perform a deep(er) merge? (only if both the current value and the proposed value are objects and the level is > 0)
			if (
				!isBuffer( curr ) &&
				name === 'Object' &&
				isObject( val ) &&
				level
			) {
				deepMerge( curr, val, level, copy, override, extend );
				continue;
			}
			// Should we apply a custom merge (override) strategy?
			if ( isFunc ) {
				tmp = override( curr, val, key );

				// NOTE: the following check does NOT prevent shared (leaky) nested references. We only check for top-level reference equality. We will assume that the user knows best, given their having provided a custom override strategy.
				if ( copy && tmp !== curr && tmp === val ) {
					tmp = createCopy( tmp );
				}
				target[ key ] = tmp;
			}
			// Are we allowed to override an existing target value?
			else if ( override ) {
				if ( copy ) {
					target[ key ] = createCopy( val );
				} else {
					target[ key ] = val;
				}
			}
		}
		// New property to be added to target object. Should we deep copy the source value?
		else if ( copy ) {
			target[ key ] = createCopy( val );
		}
		// Perform a simple assignment...
		else {
			target[ key ] = val;
		}
	}
} // end FUNCTION deepMerge()


// EXPORTS //

module.exports = deepMerge;
