// IO monad函子
// monad函子可以解决函子嵌套的问题 当一个函子的参数函数返回一个函子的情况 使用join方法执行_value且返回直接结果传递给嵌套的下一个函子
const fp = require('lodash/fp')
const fs = require('fs')
class IO {
  static of (value) {
    return new IO(function() {
      return value
    })
  }
  constructor(fn) {
    this._value = fn
  }

  join() {
    return this._value()
  }

  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }

  flatMap(fn) {
    return this.map(fn).join()
  }
}

function readFile (filename) {
  return new IO(() => {
    return fs.readFileSync(filename, 'utf-8')
  })
}

function print (value) {
  return new IO(() => {
    console.log(value)
    return value
  })
}

readFile('../package.json')
  .map(fp.toUpper)
  .flatMap(print)
  .join()
