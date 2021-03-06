'use strict';

// MODULES //

var tape = require( 'tape' );
var copy = require( 'utils-copy' );
var getKeys = require( 'object-keys' );
var defaults = require( './../lib/defaults.js' );
var factory = require( './../lib/factory.js' );


// FUNCTIONS //

function setup() {
	var opts = copy( defaults );
	delete opts.level;
	return opts;
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof factory, 'function', 'export is a function' );
	t.end();
});

tape( 'if provided an `options` argument which is not an object, the function will throw a type error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		function(){}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( value );
		};
	}
});

tape( 'if provided an invalid option, the function will throw a type error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		[],
		{},
		function(){}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory({
				'copy': value
			});
		};
	}
});

tape( 'the function returns a merge function', function test( t ) {
	var merge;
	var opts;

	opts = setup();
	merge = factory( opts );

	t.equal( typeof merge, 'function', 'returns a function' );
	t.end();
});

tape( 'the function returns a function which throws an error if provided insufficient arguments', function test( t ) {
	var merge = factory( setup() );
	t.throws( foo, Error, 'throws error' );
	t.throws( bar, Error, 'throws error' );
	t.end();
	function foo() {
		merge();
	}
	function bar() {
		merge( {} );
	}
});

tape( 'if provided a `target` argument which is not an object, the returned function throws a type error', function test( t ) {
	var values;
	var merge;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		function(){}
	];

	merge = factory( setup() );

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			merge( value, {} );
		};
	}
});

tape( 'if provided a `source` argument which is not an object, the returned function throws a type error', function test( t ) {
	var values;
	var merge;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		function(){}
	];

	merge = factory( setup() );

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			merge( {}, value );
		};
	}
});

tape( 'the returned function can merge two objects', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var src;

	target = {};
	src = {
		'a': 'beep',
		'b': 'boop'
	};

	merge = factory( setup() );

	actual = merge( target, src );
	expected = copy( src );

	t.notEqual( actual, src, 'does not return source object' );
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

tape( 'the returned function returns the target object', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var src;

	target = {};
	src = {
		'a': 'beep',
		'b': 'boop'
	};

	merge = factory( setup() );

	actual = merge( target, src );
	expected = copy( src );

	t.equal( actual, target, 'returns target object' );
	t.end();
});

tape( 'the returned function can merge multiple objects', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var src1;
	var src2;

	target = {};
	src1 = {
		'a': 'beep',
		'b': 'boop'
	};
	src2 = {
		'c': [ 1, 2, 3 ]
	};

	merge = factory( setup() );

	actual = merge( target, src1, src2 );
	expected = {
		'a': 'beep',
		'b': 'boop',
		'c': [ 1, 2, 3 ]
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

tape( 'the returned function can deep merge', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var src;

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

	merge = factory( setup() );

	actual = merge( target, src );
	expected = {
		'c': {
			'a': 'beep',
			'b': 'woot',
			'c': [ 1, 2, 3 ]
		}
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.notEqual( actual.c.c, src.c.c, 'deep copied' );
	t.end();
});

tape( 'the returned function can merge to an arbitrary depth', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var opts;
	var src;

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

	opts = setup();
	opts.level = 2;

	merge = factory( opts );

	actual = merge( target, src );
	expected = {
		'one': {
			'a': 'beep',
			'b': 'woot',
			'two': src.one.two
		}
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.notEqual( actual.one.two, src.one.two, 'deep copied' );
	t.end();
});

tape( 'if `copy` is `false`, the returned function will not deep copy', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var opts;
	var src;

	// Simple case...
	target = {};

	src = {
		'a': [ 1, 2, 3 ]
	};

	opts = setup();
	opts.copy = false;

	merge = factory( opts );

	actual = merge( target, src );
	expected = {
		'a': src.a
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.equal( actual.a, src.a, 'same reference' );

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

	opts = setup();
	opts.level = 2;
	opts.copy = false;

	merge = factory( opts );

	actual = merge( target, src );
	expected = {
		'one': {
			'a': 'beep',
			'b': 'woot',
			'two': src.one.two
		}
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.equal( actual.one.two, src.one.two, 'same reference' );

	t.end();
});

tape( 'if `extend` if `false`, the returned function will not extend a target object', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var opts;
	var src;

	target = {
		'a': 'woot'
	};
	src = {
		'a': 'beep',
		'b': 'boop'
	};

	opts = setup();
	opts.extend = false;

	merge = factory( opts );

	actual = merge( target, src );
	expected = {
		'a': 'beep'
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

tape( 'if `override` if `false`, the returned function will not override a target property', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var opts;
	var src;

	target = {
		'a': 'woot'
	};
	src = {
		'a': 'beep',
		'b': 'boop'
	};

	opts = setup();
	opts.override = false;

	merge = factory( opts );

	actual = merge( target, src );
	expected = {
		'a': 'woot',
		'b': 'boop'
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

tape( 'the returned function supports a custom merge strategy (override)', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var opts;
	var src;

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

	opts = setup();
	opts.override = strategy;

	merge = factory( opts );

	actual = merge( target, src );
	expected = {
		'a': 'wootbeep',
		'b': 'b00p',
		'c': {
			'd': Math.PI
		}
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.notEqual( actual.c, src.c, 'not equal (simple case)' );

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

	opts = setup();
	opts.override = strategy;

	merge = factory( opts );

	actual = merge( target, src );
	expected = {
		'a': 'wootbeep',
		'b': 'b00p',
		'c': {
			'd': Math.PI
		},
		'e': target.e
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.equal( actual.e, target.e, 'existing value' );

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

	opts = setup();
	opts.override = strategy;
	opts.copy = false;

	merge = factory( opts );

	actual = merge( target, src );
	expected = {
		'a': 'wootbeep',
		'b': 'b00p',
		'c': {
			'd': Math.PI
		}
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.equal( actual.c, src.c, 'no deep copies of new values' );

	t.end();
});

tape( 'if `extend` and `override` options are both `false`, the returned function returns the target object', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var opts;
	var src;

	target = {
		'a': 'beep'
	};

	src = {
		'a': 'boop',
		'b': 'woot'
	};

	opts = setup();
	opts.extend = false;
	opts.override = false;

	merge = factory( opts );

	actual = merge( target, src );
	expected = target;

	t.deepEqual( actual, expected, 'deep equal' );
	t.equal( actual, target, 'returns target object' );
	t.end();
});

tape( 'the returned function supports merging built-in objects and class instances', function test( t ) {
	var expected;
	var actual;
	var target;
	var merge;
	var opts;
	var keys;
	var src;
	var key;
	var len;
	var i;

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

	opts = setup();
	merge = factory( opts );

	actual = merge( target, src );
	expected = copy( src );

	t.deepEqual( actual, expected, 'deep equal' );

	opts = setup();
	opts.copy = false;

	merge = factory( opts );

	actual = merge( target, src );
	expected = src;

	t.deepEqual( actual, expected, 'deep equal' );

	keys = getKeys( src );
	len = keys.length;
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		t.equal( actual[ key ], src[ key ], key );
	}

	t.end();
});
