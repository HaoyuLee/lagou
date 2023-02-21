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

function * main () {
  try {
    const res1 = yield ajax('https://hbccy.rulertech.com/api/index')
    console.log('res1', res1)
    const res2 = yield ajax('https://hbccy.rulertech.com/api/index')
    console.log('res2', res2)
    const res3 = yield ajax('https://hbccy.rulertech.com/api/index')
    console.log('res3', res3)
  } catch(error) {
    console.log(error)
  }
}

function co(generator) {
  const g = generator()
  
  function handleResult(result) {
    if(result.done) {
      return result
    }
    result.value.then(
      (data) => handleResult(g.next(data)),
      error => g.throw(error)
    )
  }

  handleResult(g.next())  
}

co(main)