'use strict';

// MODULES //

var tape = require( 'tape' );
var copy = require( 'utils-copy' );
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
	var opts;
	var fcn;

	opts = setup();
	fcn = factory( opts );

	t.equal( typeof fcn, 'function', 'returns a function' );
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

tape( 'if provided a `target` argument which is not an object, the returned function will throw a type error', function test( t ) {
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

tape( 'if provided a `source` argument which is not an object, the returned function will throw a type error', function test( t ) {
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
