const { compose, curry } = require('folktale/core/lambda')
const fp = require('lodash/fp')
const f = curry(2, (x, y) => x + y)

// console.log(f(1))
// console.log(f(1, 2))
// console.log(f(1)(11))

const first = compose(fp.toUpper, fp.first)

console.log(first(['aaa', 'ccc']))