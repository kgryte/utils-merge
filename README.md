Merge
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Merge and extend objects.


## Installation

``` bash
$ npm install utils-merge2
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var createMergeFcn = require( 'utils-merge2' );
```

#### createMergeFcn( [options] )

Returns a `function` for merging and extending `objects`.


``` javascript
var merge = createMergeFcn();
```

The method accepts the following `options`:

*	__level__: limits the merge depth. The default merge strategy is a deep (recursive) merge; i.e., `level = Number.POSITIVE_INFINITY`.
*	__copy__: `boolean` indicating whether to [deep copy](https://github.com/kgryte/utils-copy) merged values. Deep copying prevents shared references and source `object` mutation. Default: `true`.
*	__override__: defines the merge strategy. If `true`, source `object` values will __always__ override target `object` values. If `false`, source values __never__ override target values (useful for adding, but not overwriting properties). To define a custom merge strategy, provide a `function`.

	``` javascript
	function strategy( a, b, key ) {
		// a => target value
		// b => source value
		// key => object key
	}
	```

*	__extend__: `boolean` indicating whether new properties can be added to the target `object`. If `false`, only __shared__ properties are merged. Default: `true`.



#### merge( target, source1[, source2[,...,sourceN] ] )

Merge and extend a target `object`.

``` javascript

```


## Notes



## Examples

``` javascript
var createMergeFcn = require( 'utils-merge2' ),
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
merge = createMergeFcn();
target = merge( {}, obj, source );
/* returns
	{
		'a': 'beep',
		'b': 3.141592653589793,
		'c': {
			'c1': 'bap',
			'c2': false,
			'c3': {
				'c3a': [ 1, 2 ],
				'c3b': 5,
				'c3c': 'bop'
			},
			'c4': 1337,
			'c5': <Date>
		},
		'd': [ 4, 5, 6 ],
		'e': true
	}
*/

// [1] Restrict the merge depth...
merge = createMergeFcn({
	'level': 2
});
target = merge( createCopy( obj ), createCopy( source ) );
/* returns
	{
		'a': 'beep',
		'b': 3.141592653589793,
		'c': {
			'c1': 'bap',
			'c2': false,
			'c3': {
				'c3b': 5,
				'c3c': 'bop'
			},
			'c4': 1337,
			'c5': <Date>
		},
		'd': [ 4, 5, 6 ],
		'e': true
	}
*/

// [2] Only merge matching properties...
merge = createMergeFcn({
	'extend': false
});
target = merge( createCopy( obj ), source );
/* returns
	{
		'a': 'beep',
		'b': 3.141592653589793,
		'c': {
			'c1': 'bap',
			'c2': false,
			'c3': {
				'c3a': [ 1, 2 ],
				'c3b': 5
			}
		},
		'd': [ 4, 5, 6 ]
	}
*/

// [3] Don't override existing properties...
merge = createMergeFcn({
	'override': false
});
target = merge( {}, obj, source );
/* returns
	{
		'a': 'beep',
		'b': 'boop',
		'c': {
			'c1': 'woot',
			'c2': false,
			'c3': {
				'c3a': [ 1, 2 ],
				'c3b': null,
				'c3c': 'bop'
			},
			'c4': 1337,
			'c5': <Date>
		},
		'd': [ 1, 2, 3 ],
		'e': true
	}
*/

// [4] Return the same object...
merge = createMergeFcn({
	'override': false,
	'extend': false
});
target = merge( createCopy( obj ), source );
/* returns
	{
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
	}
*/

// [5] Custom merge strategy...
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
}

merge = createMergeFcn({
	'override': strategy
});
target = merge( {}, obj, source );
/* returns
	{
		'a': 'beep',
		'b': 'boop',
		'c': {
			'c1': 'wootbap',
			'c2': false,
			'c3': {
				'c3a': [ 1, 2 ],
				'c3b': 25000,
				'c3c': 'bop'
			},
			'c4': 1337,
			'c5': <Date>
		},
		'd': [ 1, 2, 3, 4, 5, 6 ],
		'e': true
	}
*/

// [6] Built-in Objects and Class instances...
function Foo( bar ) {
	this._bar = bar;
	return this;
}

merge = createMergeFcn();

obj = {
	'time': new Date(),
	'regex': /beep/,
	'buffer': new Buffer( 'beep' ),
	'Boolean': new Boolean( true ),
	'String': new String( 'woot' ),
	'Number': new Number( 5 ),
	'Uint8Array': new Uint8Array( 10 ),
	'Foo': new Foo( 'beep' )
};
source = {
	'time': new Date( obj.time - 60000 ),
	'regex': /boop/,
	'buffer': new Buffer( 'boop' ),
	'Boolean': new Boolean( false ),
	'String': new String( 'bop' ),
	'Number': new Number( 10 ),
	'Uint8Array': new Uint8Array( 5 ),
	'Foo': new Foo( 'boop' )
};

target = merge( obj, source );
/* returns
	{
		'time': <Date>,
		'regex': /boop/,
		'buffer': <Buffer 62 6f 6f 70>,
		'Boolean': false,
		'String': 'bop',
		'Number': 10,
		'Uint8Array': <Uint8Array>,
		'Foo': <Foo>
	}
*/
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-merge2.svg
[npm-url]: https://npmjs.org/package/utils-merge2

[travis-image]: http://img.shields.io/travis/kgryte/utils-merge/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-merge

[coveralls-image]: https://img.shields.io/coveralls/kgryte/utils-merge/master.svg
[coveralls-url]: https://coveralls.io/r/kgryte/utils-merge?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-merge.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-merge

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-merge.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-merge

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-merge.svg
[github-issues-url]: https://github.com/kgryte/utils-merge/issues
