TODO
====

1. Set support
2. Map support
3. Error support
4. 

1. use tape
2. refactor
3. browser testing
4. update deps
5. expose separate factory function
	- main export should just call the factory with default options
6. 



## Notes

*	Re: __why__ this implementation and not the many other [merge](https://github.com/jaredhanson/utils-merge)/[xtend](https://github.com/Raynos/xtend)/[node-extend](https://github.com/justmoon/node-extend)/[deep-merge](https://github.com/Raynos/deep-merge)/[deep-extend](https://github.com/unclechu/node-deep-extend/blob/master/index.js) modules out there.
	1. 	They always __extend__ and __merge__ and do not allow one or the other.
	2. 	They do not deep merge.
	3. 	They do not allow limiting the merge depth.
	4. 	If they deep copy, they fail to account for `Number`, `String`, `Boolean`, `Buffer`, and typed `array` objects, as well as class instances.
	5. 	They do not allow custom merging strategies.
	6. 	They fail to validate options and arguments.
