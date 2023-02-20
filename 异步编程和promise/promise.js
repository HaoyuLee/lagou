const promise = new Promise(function(resolve, reject) {
  // resolve(100)

  reject('error')
})

promise.then(function(value) {
  console.log(100)
}, function(error) {
  console.log(error, 999)
})

console.log('end')