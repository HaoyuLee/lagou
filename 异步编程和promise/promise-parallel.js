
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

ajax('/api/urls')
  .then(urls => {
    const tasks = urls.map(url => ajax(url))
    return Promise.all(tasks) 
  })
  .then(results => {
    console.log(results)
  })


// 最快的一个Promise结束， 就结束整个race
Promise.race([
  ajax('https://hbccy.rulertech.com/api/index'),
  new Promise((resolve, reject)=> {
    setTimeout(() => reject('timeout'), 1)
  })
]).then((value) => {
  console.log('fulfilled', value)
}).catch((err) => {
  console.log('rejected', err)
})

