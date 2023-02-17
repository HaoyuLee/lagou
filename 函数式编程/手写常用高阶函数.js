const map = (array, fn) => {
  const results = []
  for(let value of array) {
    results.push(fn(value))
  }
  return results
}

const every = (array, fn) => {
  let results= true
  for(let value of array) {
    if(!fn(value)) {
      results = false
      break
    }
  }
  return results
}

// console.log(every([12, 2, 4], (item) => {
//   return item % 2 === 0
// }));

const some = (array, fn) =>{
  let results = false

  for(let value of array) {
    if(fn(value)) {
      results = true
      break
    }
  }
  return results
}

// test 数组中是否有偶数
const have = [1, 2, 4]
const none = [1, 3, 5, 7]
console.log(some(have, (value) => value % 2 === 0));
console.log(some(none, (value) => value % 2 === 0));
