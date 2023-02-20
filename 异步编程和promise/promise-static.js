function ajax (url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function(res) {
      if(this.status === 200) {
        resolve(this.response)
      }
      else {
        reject('rejected: ' + new Error(this.statusType))
      }
    }
    xhr.send()
  })
}
Promise.resolve(123)
  .then(console.log)

// 如果Promise.resolve包装的是一个promise对象，会直接返回这个promise对象
const p1 = ajax('xxx') 
const p2 = Promise.resolve(p1)
console.log(p1 === p2)

// 如果是一个存在then方法，实现了thenable接口的对象
Promise.resolve({
  then(onFulfilled, onRejected) {
    onFulfilled('value')
  }
}).then(console.log)