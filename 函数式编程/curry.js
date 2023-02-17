// 柯里化
// ''.match(/\s+/g)
// ''.match(/\d+/g)
const _ = require('lodash')
function match(reg, str) {
  return str.match(reg)
} 

const curriedMatch = _.curry(match)

const haveSpace = curriedMatch(/\s+/g)
const haveNumber = curriedMatch(/\d+/g)

// console.log(haveSpace('hello world !!!'));
// console.log(haveNumber('213'))

const filter = _.curry(function(func, array) {
  return array.filter(func)
})

const findSpace = filter(haveSpace)

// console.log(findSpace(['123', '1 1', '', 'fds f']))


const curry = fn => {
  return function curriedFunc(...args) {
    if(args.length < fn.length) {
      // return function() {
      //   return curriedFunc(...args, ...Array.from(arguments))
      // }
      return fn.bind(fn, ...args)
    } else {
      return fn(...args)
    }
  }
}

const myCurriedMatch = curry(match)

const myHaveSpace = myCurriedMatch(/\s+/g)
console.log(myCurriedMatch(/\s+/g, '1 223 44'));
console.log(myHaveSpace('1 223 44'));