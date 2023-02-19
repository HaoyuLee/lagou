
class Left {
  static of (value) {
    return new Left(value)
  }
  constructor (value) {
    this._value = value
  }
  map(fn) {
    return this
  }
}

class Right {
  static of (value) {
    return new Right(value)
  }

  constructor (value) {
    this._value = value
  }
  map(fn) {
    return Right.of(fn(this._value))
  }
}

function JSONParse(str) {
  try {
    return Right.of(JSON.parse(str))
  } catch(e) {
    return Left.of({ error: e.message })
  }
}
console.log(JSONParse('name'));
console.log(JSONParse('{"name": "lhy"}'));
const  res = JSONParse('{"name": "lhy"}')
.map(v => v.name.toUpperCase())
console.log(res);