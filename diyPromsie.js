const MyPromise = require('./myPromise')
// const p = new MyPromise((resolve, reject) => {
//   // throw new Error('执行器错误')
//   // resolve(123)
//   // reject(123)
//   setTimeout(() => {
//     resolve('成功')
//   }, 2000)
// }).then(value => {
//   console.log(123, 'aaa')
//   throw new Error('successCallback Error')
// }, error => {
//   console.log(error)
//   return 10000
// }).then(value => {
//   console.log(value, 456)  
// }, error => {
//   console.log(error.message)
// })
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

// const p1 = new MyPromise((resolve, reject) => {
//   reject(2000)
// })
// .then()
// .then()
// .then(
//   value => console.log(value),
//   error => console.log(error)
// )

// MyPromise.all([1, 
//   new MyPromise((resolve) => {
//     setTimeout(res => {
//       resolve(33333)
//     }, 2000)
//   }), 
// 3]).then(console.log)
// MyPromise.resolve(1).then(console.log)
// MyPromise.resolve(new MyPromise(resolve => {
//   setTimeout(() => resolve('async'), 3000)
// })).then(console.log)

const p1 = new MyPromise((resolve, reject) => {
  // resolve('成功')
  reject('失败')
  // setTimeout(() => resolve('timeout'), 2000)
})
const p2 = new MyPromise((resolve, reject) => {
  // resolve('成功')
  // reject('失败')
  setTimeout(() => {
    resolve('timeout2')
    console.log('p2')
  }, 2000)
})

// p1.finally(() => {
//   console.log('finally')
//   return p2
// }).then(value => {
//   console.log(value)
// }, error => {
//   console.log(error)
// })
p1.then().then().catch(console.log)