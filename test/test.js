/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	merge = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-merge', function tests() {

	it( 'should export a function', function test() {
		expect( merge ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a nonnegative integer level', function test() {
		var values = [
			'5',
			Math.PI,
			-1,
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
				merge( value );
			};
		}
	});

});
