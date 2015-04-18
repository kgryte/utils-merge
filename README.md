Merge
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> 


## Installation

``` bash
$ npm install utils-merge2
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var merge = require( 'utils-merge2' );
```

#### merge( [level] )


``` javascript

```


## Notes

*	List of __supported__ values/types:
	-	`undefined`
	-	`null`
	-	`boolean`/`Boolean`
	-	`string`/`String`
	-	`number`/`Number`
	-	`function`
	-	`Object`
	-	`Date`
	-	`RegExp`
	-	`Array`
	-	`Int8Array`
	-	`Uint8Array`
	-	`Uint8ClampedArray`
	-	`Init16Array`
	-	`Uint16Array`
	-	`Int32Array`
	-	`Uint32Array`
	-	`Float32Array`
	-	`Float64Array`
	-	`Buffer` ([Node.js]((http://nodejs.org/api/buffer.html)))

*	List of __unsupported__ values/types:
	-	`DOMElement`: to copy DOM elements, use `.cloneNode()`.
	-	`Set`
	-	`Map`
	-	`Error`
	- 	`URIError`
	-	`ReferenceError`
	-	`SyntaxError`
	-	`RangeError`

*	If you need support for any of the above types, feel free to file an issue or submit a pull request.
*	The implementation can handle circular references.
*	If a `Number`, `String`, or `Boolean` object is encountered, the value is merged as a primitive. This behavior is intentional. The implementation is opinionated in wanting to __avoid__ creating `numbers`, `strings`, and `booleans` via the `new` operator and a constructor.
*	`functions` are __not__ cloned; their reference is copied.
*	Re: __why__ this implementation and not the many other merge modules out there.
	1. 	They are buggy. For example, circular references are not properly tracked.
	2. 	They fail to account for `Number`, `String`, and `Boolean` objects.
	3. 	They fail to properly validate if a value is a Node `Buffer` object. They assume, for instance, a Node environment.
	4. 	They do not allow limiting the merge depth.
	5. 	They assume an `array` or `object` input value.
	6. 	They are not sufficiently tested.


## Examples

``` javascript
var merge = require( 'utils-merge2' );

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
