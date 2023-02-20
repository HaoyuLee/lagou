class DiyPromise {
  constructor(fn) {
    this.status = 'pending'
    this._resolve = function (value) {
      this.status = 'fulfilled'
      this.value = value
    }
    this._reject = function (error) {
      this.status = 'rejected'
      this.error = error
    }
    fn(this._resolve, this._reject)
  }
  static resolve (value) {
    return new DiyPromise((resolve, reject) => resolve(value))
  }
  static reject(error) {
    return new DiyPromise((resolve, reject) => reject(error))
  }
  static all (instances) {

  }
  static race (instances) {

  }
  then(fn) {
    if(this.status === 'fulfilled') {
      fn(this.value)
    }
  }
  catch (errorFn) {
    if(this.status === 'rejected') {
      errorFn(this.error)
    }
  }
}