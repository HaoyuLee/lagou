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

ajax('http://baidu.com').then(res => {
  console.log(res)
}, console.log)
.catch(err => {
  console.log(err)
})