function ajax (url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function(res) {
      if(this.status === 200)
      resolve(this.response)
      else 
      reject(new Error(this.statusType))
    }
    xhr.send()
  })
}

ajax('https://hbccy.rulertech.com/api/index').then(res => {
  console.log(res)
}).then(() => {
  console.log(111)
}).then(() => {
  console.log(2222)
}).then(() => {
  console.log(333)
})