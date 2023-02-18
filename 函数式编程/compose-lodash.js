const _ = require('lodash')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()

// const compose = _.flowRight(toUpper, first, reverse)

// 自己实现lodash的flowRight
// function compose(...args) {
//   return function (value) {
//     return args.reverse().reduce((acc, fn) => {
//       return fn(acc)
//     }, value)
//   }
// }
// 箭头函数
const compose = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)

const composedFn = compose(toUpper, first, reverse)
console.log(composedFn(['a', 'b', 'c']))