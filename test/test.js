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

});
