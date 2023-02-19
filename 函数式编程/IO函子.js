// IO函子
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

  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

function readFile (filename) {
  return new IO(() => {
    return fs.readFileSync(filename, 'utf-8')
  })
}

function print (value) {
  return new IO(() => {
    console.log(value, 123)
    return value
  })
}

const cat = fp.flowRight(print, readFile)

const r = cat('../package.json')
// console.log(r);
console.log(r._value()._value());
// const r = IO.of(process)
//   .map(p => p.execPath) 

// console.log(r._value());