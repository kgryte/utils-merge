/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	createMergeFcn = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-merge', function tests() {

	it( 'should export a function', function test() {
		expect( createMergeFcn ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-object options argument', function test() {
		var values = [
			'5',
			5,
			null,
			NaN,
			undefined,
			true,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				createMergeFcn( value );
			};
		}
	});

	it( 'should throw an error if provided a level option which is not a positive integer', function test() {
		var values = [
			'5',
			-5,
			Math.PI,
			0,
			null,
			NaN,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				createMergeFcn( {'level':value} );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			null,
			NaN,
			undefined,
			new Boolean( true ),
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				createMergeFcn( {'copy':value} );
			};
		}
	});

	it( 'should throw an error if provided an extend option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			null,
			NaN,
			undefined,
			new Boolean( true ),
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				createMergeFcn( {'extend':value} );
			};
		}
	});

	it( 'should throw an error if provided an override option which is not either a boolean primitive or a function', function test() {
		var values = [
			'5',
			5,
			null,
			NaN,
			undefined,
			new Boolean( true ),
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				createMergeFcn( {'override':value} );
			};
		}
	});

	it( 'should return a function', function test() {
		expect( createMergeFcn() ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided insufficient arguments', function test() {
		var merge = createMergeFcn();
		expect( foo ).to.throw( Error );
		expect( bar ).to.throw( Error );
		function foo() {
			merge();
		}
		function bar() {
			merge( {} );
		}
	});

	it( 'should throw an error if provided a target which is not an object', function test() {
		var values, merge;

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

		merge = createMergeFcn();

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				merge( value, {} );
			};
		}
	});

	it( 'should throw an error if provided a source which is not an object', function test() {
		var values, merge;

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

		merge = createMergeFcn();

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				merge( {}, value );
			};
		}
	});

});
