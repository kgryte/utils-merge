'use strict';

var createMergeFcn = require( './../lib' ),
	createCopy = require( 'utils-copy' );

var target,
	source,
	merge,
	obj;

obj = {
	'a': 'beep',
	'b': 'boop',
	'c': {
		'c1': 'woot',
		'c2': false,
		'c3': {
			'c3a': [ 1, 2 ],
			'c3b': null
		}
	},
	'd': [ 1, 2, 3 ]
};

source = {
	'b': Math.PI,
	'c': {
		'c1': 'bap',
		'c3': {
			'c3b': 5,
			'c3c': 'bop'
		},
		'c4': 1337,
		'c5': new Date()
	},
	'd': [ 4, 5, 6 ],
	'e': true
};

// [0] Default merge behavior...
console.log( '\n=======' );
console.log( 'Default...\n' );

merge = createMergeFcn();

console.log( 'Obj:' );
console.log( obj );
console.log( '\n' );
console.log( 'Source:' );
console.log( source );

target = merge( {}, obj, source );

console.log( '\n' );
console.log( 'Result:' );
console.log( target );

// [1] Restrict the merge depth...
console.log( '\n=======' );
console.log( 'Restrict Depth...\n' );

merge = createMergeFcn({
	'level': 2
});

console.log( 'Obj:' );
console.log( obj );
console.log( '\n' );
console.log( 'Source:' );
console.log( source );

target = merge( createCopy( obj ), createCopy( source ) );

console.log( '\n' );
console.log( 'Result:' );
console.log( target );

// [2] Only merge matching properties...
console.log( '\n=======' );
console.log( 'Matching Properties...\n' );

merge = createMergeFcn({
	'extend': false
});

console.log( 'Obj:' );
console.log( obj );
console.log( '\n' );
console.log( 'Source:' );
console.log( source );

target = merge( createCopy( obj ), source );

console.log( '\n' );
console.log( 'Result:' );
console.log( target );

// [3] Don't override existing properties...
console.log( '\n=======' );
console.log( 'No Override...\n' );

merge = createMergeFcn({
	'override': false
});

console.log( 'Obj:' );
console.log( obj );
console.log( '\n' );
console.log( 'Source:' );
console.log( source );

target = merge( {}, obj, source );

console.log( '\n' );
console.log( 'Result:' );
console.log( target );

// [4] Return the same object...
console.log( '\n=======' );
console.log( 'Return the same object...\n' );

merge = createMergeFcn({
	'override': false,
	'extend': false
});

console.log( 'Obj:' );
console.log( obj );
console.log( '\n' );
console.log( 'Source:' );
console.log( source );

target = merge( createCopy( obj ), source );

console.log( '\n' );
console.log( 'Result:' );
console.log( target );

// [4] Custom merge strategy...
console.log( '\n=======' );
console.log( 'Custom Merge Strategy...\n' );

/**
* FUNCTION: strategy( a, b, key )
*	Defines a custom merge strategy.
*
* @param {*} a - target value
* @param {*} b - source value
* @param {String} key - key on which to perform a merge
* @returns {*} merge value
*/
function strategy( a, b, key ) {
	if ( typeof a === 'string' && typeof b === 'string' ) {
		return a + b;
	}
	if ( Array.isArray( a ) && Array.isArray( b ) ) {
		return a.concat( b );
	}
	if ( key === 'c3b' ) {
		return b * 5000;
	}
	// No override:
	return a;
} // end FUNCTION strategy()

merge = createMergeFcn({
	'override': strategy
});

console.log( 'Obj:' );
console.log( obj );
console.log( '\n' );
console.log( 'Source:' );
console.log( source );

target = merge( {}, obj, source );

console.log( '\n' );
console.log( 'Result:' );
console.log( target );
