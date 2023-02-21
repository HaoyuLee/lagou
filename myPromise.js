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
        this.successCallbacks.shift()(value)
      }
    }
  }
  reject = (error) => {
    if(this.status === PENDING) {
      this.status = REJECTED
      this.error = error
      while(this.failCallbacks.length) {
        this.failCallbacks.shift()(error)
      }
    }
  }
  constructor(executor) {
    this.status = PENDING
    executor(this.resolve, this.reject)
  }
  then(successCallback, failCallback) {
    let returnPromise = new Promise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          let x = successCallback(this.value)
          resolvePromise(returnPromise, x, resolve, reject)
        }, 0)
      } else if(this.status === REJECTED) {
        failCallback && failCallback(this.error)
      } else {
        successCallback && this.successCallbacks.push(successCallback)
        failCallback && this.failCallbacks.push(failCallback)
      }
    })
    return returnPromise
  }
  catch (errorFn) {
    this.catchCallback = errorFn
  }
  // static resolve (value) {
  //   return new DiyPromise((resolve, reject) => resolve(value))
  // }
  // static reject(error) {
  //   return new DiyPromise((resolve, reject) => reject(error))
  // }
  // static all (instances) {

  // }
  // static race (instances) {

  // }
}
module.exports = MyPromise
