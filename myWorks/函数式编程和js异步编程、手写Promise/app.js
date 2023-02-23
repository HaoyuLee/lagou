// 练习1：使用 fp.add(x, y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1
const fp = require('lodash/fp')
const { Maybe, Container} = require('./support')
let maybe = Maybe.of([5,6,1])
let ex1 = maybe.map(i => fp.map(fp.add(1), i) )
// console.log(ex1._value)

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])

// 练习2：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
let ex2 = xs.map(fp.first)
// console.log(ex2)

// 练习3：实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母
let safeProp = fp.curry(function(x, o){
  return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
// let ex3 = safeProp('name')(user).map(fp.first)
let ex3 = fp.flowRight(fp.map(fp.first), safeProp('name'))
console.log(ex3(user))
// console.log(ex3)
// 练习4：使用 Maybe 重写 ex4，不要有 if 语句
let ex4 = function(n){
  if(n){
      return parseInt(n)
  }
}
let myEx4 = function (n) {
  return Maybe.of(n).map(parseInt)
}
console.log(myEx4(4))