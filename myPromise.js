const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function resolvePromise (returnPromise, x, resolve, reject) {
  if(returnPromise === x) {
    return reject(new TypeError('Chaining cycle detected for promise!!!!!!!!!!!!!!'))
  }
  if(x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}
class MyPromise {
  status = PENDING
  value = undefined
  successCallbacks = []
  failCallbacks = []
  resolve = (value) => {
    if(this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      while(this.successCallbacks.length) {
        this.successCallbacks.shift()()
      }
    }
  }
  reject = (error) => {
    if(this.status === PENDING) {
      this.status = REJECTED
      this.error = error
      while(this.failCallbacks.length) {
        this.failCallbacks.shift()()
      }
    }
  }
  constructor(executor) {
    this.status = PENDING
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : error => { throw error }
    let returnPromise = new Promise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            resolvePromise(returnPromise, x, resolve, reject)
          } catch(error) {
            reject(error)
          }
        }, 0)
      } else if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.error)
            resolvePromise(returnPromise, x, resolve, reject)
          } catch(error) {
            reject(error)
          }
        }, 0)
      } else {
        this.successCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(returnPromise, x, resolve, reject)
            } catch(error) {
              reject(error)
            }
          }, 0)
        })
        this.failCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.error)
              resolvePromise(returnPromise, x, resolve, reject)
            } catch(error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return returnPromise
  }
  catch (callback) {
    return this.then(undefined, callback)
  }
  finally (callback) {
    return this.then((value) => {
      return MyPromise.resolve(callback()).then(() => value)
    }, (reason) => {
      console.log('finally then fail', reason)
      return MyPromise.resolve(callback()).then(() => { throw reason })
    })
  }
  static resolve (value) {
    if(value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
  static all (pArray) {
    return new MyPromise((resolve, reject) => {
      const result = new Array(pArray.length).fill(undefined)
      let count = 0
      for(let i = 0; i < pArray.length; i ++) {
        const current = pArray[i]
        if(current instanceof MyPromise) {
          current.then((value) => {
            result[i] = value
            count++
            if(count === pArray.length) resolve(result)
          }).catch(error => {
            reject(error)
          })
        } else {
          result[i] = current
          count++
        }
      }
    })
  }
}
module.exports = MyPromise
