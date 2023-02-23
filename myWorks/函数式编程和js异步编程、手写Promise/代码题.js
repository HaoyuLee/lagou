const { reject } = require("lodash");

// 将下面异步代码使用 Promise 的方式改进
// setTimeout(function() {
//   var a = 'hello'
//   setTimeout(function() {
//       var b = 'lagou'
//       setTimeout(function() {
//           var c = 'I ❤️ U'
//           console.log(a + b + c)
//       }, 10);
//   }, 10);
// }, 10);

// new Promise((resolve, reject) => {
//   let a = 'hello'
//   setTimeout(() => resolve(a), 10)
// }).then(a => {
//   let b = 'lagou'
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(a + b), 100)
//   })
// }).then(value => {
//   const c = 'I ❤ Y'
//   setTimeout(() => {
//     console.log(value + c)
//   }, 1000)
// })

// Promise.resolve('hello')
//   .then(value => value + ' lagou ')
//   .then(value => console.log(value+ 'I ❤ Y'))
function promise (str) {
  return new Promise(resolve => {
    setTimeout(() => resolve(str), 10)
  })
}
promise('hello')
  .then(value => promise(value + 'lagou'))
  .then(value => promise(value + 'i love you'))
  .then(console.log)

async function showStr () {
  const a = await promise('hello')
  const b = await promise('lagou')
  const c = await promise('i l you')
  console.log(a + b + c)
}

showStr()