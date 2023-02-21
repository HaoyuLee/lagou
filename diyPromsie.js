const MyPromise = require('./myPromise')
const p = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
    resolve(123)
  // }, 2000)
}).then(value => {
  console.log(123)
  return p
})
// p.then((res) => {
//   console.log(res)
//   return 456
// }).then(value => {
//   console.log(value, 'p2')
//   return new MyPromise((resolve) => {resolve('promise成功后的结果')})
// }).then(value => {
//   console.log(value)
// })

// const p1 = p.then(value => {
//   console.log(123)
//   return p1
// })