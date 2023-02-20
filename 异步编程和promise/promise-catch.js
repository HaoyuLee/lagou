function ajax (url) {
  return new Promise(function(resolve, reject) {
    // fn()
    throw new Error('error')
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

ajax('https://hbccy.rulertech.com/api/index').then(res => {
  // console.log(res)
}, console.log)