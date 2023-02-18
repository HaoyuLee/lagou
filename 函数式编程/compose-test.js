const _ = require('lodash')

const split = _.curry((sep, str) => _.split(str, sep))

const map = _.curry((fn, array)=> _.map(array, fn))
const join = _.curry((sep, array) => _.join(array, sep))
const str = 'NEVER SAY DIE'
const trace = _.curry((tag, v) => {
  console.log(tag +': ',  v)
  return v
})
const compose = _.flowRight(trace('after join'), join('-'), trace('after map'),  map(_.toLower), trace('after split'), split(' '))

console.log(compose(str))