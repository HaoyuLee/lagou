// 纯函数： 相同的输入必定得到相同的输出，并且没有可观察到的副作用
// slice是纯函数spice非纯函数
let array = [1,2,3,4,5]

// console.log(array.slice(0, 4))
// console.log(array.slice(0, 4))
// console.log(array.slice(0, 4))

// console.log(array.splice(0, 4))
// console.log(array.splice(0, 4))
// console.log(array.splice(0, 4))

// 纯函数的好处
// 1. 可缓存
// 2. 可测试
// 3. 并行处理

function memorize(f) {
  let cache = {} // 根据key的不同 缓存以往不同的结果
  return function () {
    let key = JSON.stringify(arguments)
    cache[key] = cache[key] || f.apply(f, arguments)
    return cache[key]
  }
}

const getAreaWithMemorize = memorize(function(r) {
  console.log(r);
  return Math.PI * r * r
})

console.log(getAreaWithMemorize(1));
console.log(getAreaWithMemorize(2));
console.log(getAreaWithMemorize(1));
