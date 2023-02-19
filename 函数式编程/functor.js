// functor 函子

// class Container {
//   constructor (value) {
//     this._value = value
//   }

//   map(fn) {
//     return new Container(fn(this._value))
//   }
// }

// const container = new Container(3)
//   .map((v) => v + 2 )
//   .map((v => v * v))

// console.log(container);

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

const res = Container.of(5)
  .map((v) => v + 5)
  .map(v => v * v)

console.log(res);

/**
 * 总结
 * 函数式编程的运算不直接操作值，而是由函子完成
 * 函子就是实现了一个map契约的对象
 * 函子就是一个盒子，盒子里面放了一个值
 * 想要处理盒子里的值，就要给函子的map方法传递一个处理函数（纯函数），由这个函数对值进行处理
 * 最终map方法返回一个包含了处理后的新值的函子
 */
