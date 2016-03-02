/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Create deep copies:
	createCopy = require( 'utils-copy' ),

	// Module to be tested:
	createMergeFcn = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-merge', function tests() {

	it( 'should merge two objects', function test() {
		var merge,
			target,
			src,
			actual,
			expected;

		target = {};
		src = {
			'a': 'beep',
			'b': 'boop'
		};

		merge = createMergeFcn();

		actual = merge( target, src );
		expected = createCopy( src );

		assert.ok( actual !== src );
		assert.deepEqual( actual, expected );
	});

	it( 'should return the target object', function test() {
		var merge,
			target,
			src,
			actual;

		target = {};
		src = {
			'a': 'beep',
			'b': 'boop'
		};

		merge = createMergeFcn();

		actual = merge( target, src );
		assert.ok( actual === target );
	});

	it( 'should merge multiple objects', function test() {
		var merge,
			target,
			src1,
			src2,
			actual,
			expected;

		target = {};
		src1 = {
			'a': 'beep',
			'b': 'boop'
		};
		src2 = {
			'c': [ 1, 2, 3 ]
		};

		merge = createMergeFcn();

		actual = merge( target, src1, src2 );
		expected = {
			'a': 'beep',
			'b': 'boop',
			'c': [ 1, 2, 3 ]
		};

		assert.deepEqual( actual, expected );
	});

	it( 'should deep merge', function test() {
		var merge,
			target,
			src,
			actual,
			expected;

		target = {
			'c': {
				'a': 'beep',
				'b': 'boop'
			}
		};
		src = {
			'c': {
				'b': 'woot',
				'c': [ 1, 2, 3 ]
			}
		};

		merge = createMergeFcn();

		actual = merge( target, src );
		expected = {
			'c': {
				'a': 'beep',
				'b': 'woot',
				'c': [ 1, 2, 3 ]
			}
		};

		assert.deepEqual( actual, expected );
		assert.ok( actual.c.c !== src.c.c );
	});

	it( 'should deep merge to an arbitrary depth', function test() {
		var merge,
			target,
			src,
			actual,
			expected;

		target = {
			'one': {
				'a': 'beep',
				'b': 'boop',
				'two': {
					'three': null,
					'c': [ 5, 6, 7 ]
				}
			}
		};
		src = {
			'one': {
				'b': 'woot',
				'two': {
					'three': [ 1, 2, 3 ]
				}
			}
		};

		merge = createMergeFcn({
			'level': 2
		});

		actual = merge( target, src );
		expected = {
			'one': {
				'a': 'beep',
				'b': 'woot',
				'two': src.one.two
			}
		};

		assert.deepEqual( actual, expected );
		assert.ok( actual.one.two !== src.one.two );
	});

	it( 'should not perform a deep copy if instructed to not copy', function test() {
		var merge,
			target,
			src,
			actual,
			expected;

		// Simple case...
		target = {};

		src = {
			'a': [ 1, 2, 3 ]
		};

		merge = createMergeFcn({
			'copy': false
		});

		actual = merge( target, src );
		expected = {
			'a': src.a
		};

		assert.deepEqual( actual, expected );
		assert.ok( actual.a === src.a );

		// Deep merge...
		target = {
			'one': {
				'a': 'beep',
				'b': 'boop',
				'two': {
					'three': null,
					'c': [ 5, 6, 7 ]
				}
			}
		};
		src = {
			'one': {
				'b': 'woot',
				'two': {
					'three': [ 1, 2, 3 ]
				}
			}
		};

		merge = createMergeFcn({
			'level': 2,
			'copy': false
		});

		actual = merge( target, src );
		expected = {
			'one': {
				'a': 'beep',
				'b': 'woot',
				'two': src.one.two
			}
		};

		assert.deepEqual( actual, expected );
		assert.ok( actual.one.two === src.one.two );
	});

	it( 'should not extend an object if instructed to not extend', function test() {
		var merge,
			target,
			src,
			actual,
			expected;

		target = {
			'a': 'woot'
		};
		src = {
			'a': 'beep',
			'b': 'boop'
		};

		merge = createMergeFcn({
			'extend': false
		});

		actual = merge( target, src );
		expected = {
			'a': 'beep'
		};

		assert.deepEqual( actual, expected );
	});

	it( 'should not override a property if instructed to not override', function test() {
		var merge,
			target,
			src,
			actual,
			expected;

		target = {
			'a': 'woot'
		};
		src = {
			'a': 'beep',
			'b': 'boop'
		};

		merge = createMergeFcn({
			'override': false
		});

		actual = merge( target, src );
		expected = {
			'a': 'woot',
			'b': 'boop'
		};

		assert.deepEqual( actual, expected );
	});

	it( 'should allow for a custom merge strategy (override)', function test() {
		var merge,
			target,
			src,
			actual,
			expected;

		function strategy( a, b, key ) {
			if ( typeof a === 'string' && typeof b === 'string' ) {
				return a + b;
			}
			if ( key === 'b' ) {
				return b.replace( /oo/, '00' );
			}
			if ( key === 'e' ) {
				return a;
			}
			return b;
		}

		target = {
			'a': 'woot',
			'b': null,
			'c': null
		};
		src = {
			'a': 'beep',
			'b': 'boop',
			'c': {
				'd': Math.PI
			}
		};

		merge = createMergeFcn({
			'override': strategy
		});

		actual = merge( target, src );
		expected = {
			'a': 'wootbeep',
			'b': 'b00p',
			'c': {
				'd': Math.PI
			}
		};

		assert.deepEqual( actual, expected );
		assert.ok( actual.c !== src.c, 'simple case' );

		// No deep copies if provided existing value...
		target = {
			'a': 'woot',
			'b': null,
			'c': null,
			'e': {
				'f': true
			}
		};
		src = {
			'a': 'beep',
			'b': 'boop',
			'c': {
				'd': Math.PI
			},
			'e': null
		};

		merge = createMergeFcn({
			'override': strategy
		});

		actual = merge( target, src );
		expected = {
			'a': 'wootbeep',
			'b': 'b00p',
			'c': {
				'd': Math.PI
			},
			'e': target.e
		};

		assert.deepEqual( actual, expected );
		assert.ok( actual.e === target.e, 'existing value' );

		// No deep copies if copy is `false` and provided a new value...
		target = {
			'a': 'woot',
			'b': null,
			'c': null
		};
		src = {
			'a': 'beep',
			'b': 'boop',
			'c': {
				'd': Math.PI
			}
		};

		merge = createMergeFcn({
			'override': strategy,
			'copy': false
		});

		actual = merge( target, src );
		expected = {
			'a': 'wootbeep',
			'b': 'b00p',
			'c': {
				'd': Math.PI
			}
		};

		assert.deepEqual( actual, expected );
		assert.ok( actual.c === src.c, 'no deep copies of new values' );
	});

	it( 'should return the target object if extend and override options are both false', function test() {
		var merge,
			target,
			src,
			actual,
			expected;

		target = {
			'a': 'beep'
		};

		src = {
			'a': 'boop',
			'b': 'woot'
		};

		merge = createMergeFcn({
			'extend': false,
			'override': false
		});

		actual = merge( target, src );
		expected = target;

		assert.deepEqual( actual, expected );
		assert.ok( actual === target );
	});

	it( 'should handle built-in objects and class instances', function test() {
		var merge,
			target,
			src,
			actual,
			expected,
			keys,
			key,
			len,
			i;

		function Foo( bar ) {
			this._bar = bar;
			return this;
		}

		target = {
			'time': new Date(),
			'regex': /beep/,
			'buffer': new Buffer( 'beep' ),
			'Boolean': new Boolean( true ),
			'String': new String( 'woot' ),
			'Number': new Number( 5 ),
			'Uint8Array': new Uint8Array( 10 ),
			'Foo': new Foo( 'beep' )
		};

		src = {
			'time': new Date( target.time - 60000 ),
			'regex': /boop/,
			'buffer': new Buffer( 'boop' ),
			'Boolean': new Boolean( false ),
			'String': new String( 'bop' ),
			'Number': new Number( 10 ),
			'Uint8Array': new Uint8Array( 5 ),
			'Foo': new Foo( 'boop' )
		};

		merge = createMergeFcn();

		actual = merge( target, src );
		expected = createCopy( src );

		assert.deepEqual( actual, expected );

		// No copy...
		merge = createMergeFcn({
			'copy': false
		});

		actual = merge( target, src );
		expected = src;

		assert.deepEqual( actual, expected );

		keys = Object.keys( src );
		len = keys.length;
		for ( i = 0; i < len; i++ ) {
			key = keys[ i ];
			assert.strictEqual( actual[ key ], src[ key ], key );
		}
	});

});
