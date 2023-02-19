class Container {

  static of(value) {
    return new Container(value)
  }
  constructor (value) {
    this._value = value
  }

  map(fn) {
    return Container.of(fn(this._value))
  }
}

class MayBe {
  static of(value) {
    return new MayBe(value)
  }
  constructor(value) {
    this._value = value
  }

  map(fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }
  isNothing () {
    return this._value === null || this._value === undefined
  }
}

// const res = MayBe.of('hello world')
//  .map(v =>  v.toUpperCase())
const res = MayBe.of(null)
 .map(v =>  v.toUpperCase())

 console.log((res));
