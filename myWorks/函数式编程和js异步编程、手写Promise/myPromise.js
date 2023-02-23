const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"
/**
 * status 当前状态，状态一旦变更无法修改
 * value promise对象状态敲定后的返回值
 * reason 错误信息
 * successCallbacks 成功回调队列 用于存储异步情况下，then调用时为等待中的情况
 * failCallbacks 失败回调队列 用于存储异步情况下，then调用时为等待中的情况
 */
class MyPromise {
  status = PENDING
  value = undefined
  reason = undefined
  successCallbacks = []
  failCallbacks = []
  resolve = (value) => {
    // 状态未边跟才能修改
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value

      // 调用并清空成功回调队列
      while (this.successCallbacks.length) {
        // shift 方法删除数组的第一个元素并返回删除的元素
        this.successCallbacks.shift()(value)
      }
    }
  }
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      // 调用并清空成功回调队列
      while (this.failCallbacks.length) {
        this.failCallbacks.shift()(value)
      }
    }
  }
  static resolve(value) {
    // 如果Promise.resolve传入的是一个Promise对象， 直接返回传入的参数
    if (value instanceof MyPromise) {
      return value
    } else {
      //如果是其他值 返回一个返回这个值的Promise
      return new MyPromise((resolve) => resolve(value))
    }
  }
  static all(array) {
    return new MyPromise((resolve, reject) => {
      let results = []
      let count = 0
      function addResult(result, i, resolve) {
        results[i] = result // 成功则在对应下标位置添加结果
        count++ // count+1
        if (count === array.length) {
          // 如果count等于array的长度，说明数组所有值已经全部为成功状态
          // 就设置整个all方法的返回Promise为resolve
          resolve(results)
        }
      }
      for (let i = 0; i < array.length; i++) {
        const current = array[i]
        if (current instanceof MyPromise) {
          // 如果是Promise对象
          current.then((value) => {
            addResult(value, i, resolve)
          }, reject) // 失败直接将整个Promise reject且返回当前失败的错误
        } else {
          // 如果是其他值 直接添加到结果数组
          addResult(current)
        }
      }
    })
  }
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  catch(failCallback) {
    // 直接调用then方法不传成功回调 只传入是失败回调
    return this.then(undefined, failCallback)
  }
  finally(callback) {
    // 调用then方法 返回promise，且调用finally回调 但是不给finally回调传参
    return this.then(
      (value) => {
        // 需要判断callback的返回值是不是promise对象，索性用Promise.resolve全部当作promise处理， 注意：此时返回的value是finally方法所属的value，不是callback返回的value
        return MyPromise.resolve(callback()).then(() => value)
      },
      (reason) => {
        // 失败需要抛出错误
        return MyPromise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }
  then(successCallback, failCallback) {
    // then方法可以链式调用，所以返回一个promise对象
    let returnedPromise = new MyPromise((resolve, reject) => {
      // 调用then方法 判断Promise状态
      if (this.status === FULFILLED) {
        // 成功状态
        // 需要异步判断r是否等于returnPromise
        setTimeout(() => {
          try {
            const r = successCallback(this.value)
            handleCallbackReturn(returnedPromise, r, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        // 失败状态 调用then方法传入的失败回调
        // 需要异步判断r是否等于returnPromise
        setTimeout(() => {
          try {
            const r = failCallback(this.reason)
            handleCallbackReturn(returnedPromise, r, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        // 等待中状态 将回调添加到对应状态的回调队列
        this.successCallbacks.push(() => {
          setTimeout(() => {
            try {
              let r = successCallback(this.value)
              handleCallbackReturn(returnedPromise, r, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.failCallbacks.push(() => {
          setTimeout(() => {
            try {
              let r = failCallback(this.error)
              handleCallbackReturn(returnedPromise, r, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return returnedPromise
  }
}

/**
 *
 * @param {promise} promise then方法返回的promise
 * @param {any} value 回调返回值
 * @param {resolve} resolve then方法返回的promise对象的resolve参数
 * @param {reject} reject then方法返回的promise对象的reject参数
 */
function handleCallbackReturn(promise, value, resolve, reject) {
  // 如果回调返回这个promise本身，报循环调用的错误
  if (promise === value) {
    throw new TypeError("promise 循环调用！！！")
  }
  if (value instanceof MyPromise) {
    // 如果回调返回值为Promise实例对象，处理后再resolve
    value.then(
      resolve, // 成功直接resolve
      reject // 失败需要抛出错误
    )
  } else {
    // 回调返回值为其他值 直接resolve传递
    resolve(value)
  }
}

function asyncExecutor(callback) {
  setTimeout(callback, 0)
}
