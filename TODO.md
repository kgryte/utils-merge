TODO
====




## Notes

*	Re: __why__ this implementation and not the many other [merge][utils-merge]/[xtend][xtend]/[node-extend][node-extend]/[deep-merge][deep-merge]/[deep-extend][deep-extend]/[object-assign][object-assign]/[deep-assign][deep-assign]/[object.assign][object.assign] modules out there.
	1. 	They always __extend__ and __merge__ and do not allow one or the other.
	2. 	They do not deep merge.
	3. 	They do not allow limiting the merge depth.
	4. 	If they deep copy, they fail to account for `Number`, `String`, `Boolean`, `Buffer`, and typed `array` objects, as well as class instances.
	5. 	They do not allow custom merging strategies.
	6. 	They fail to validate options and arguments.


[utils-merge]: https://github.com/jaredhanson/utils-merge
[xtend]: https://github.com/Raynos/xtend
[node-extend]: https://github.com/justmoon/node-extend
[deep-merge]: https://github.com/Raynos/deep-merge
[deep-extend]: https://github.com/unclechu/node-deep-extend/blob/master/index.js
[object-assign]: https://github.com/sindresorhus/object-assign
[deep-assign]: https://github.com/sindresorhus/deep-assign
[object.assign]: https://github.com/ljharb/object.assign
