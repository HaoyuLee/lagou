const once = (fn) => {
  let done  = false
  return  function() {
    if(!done) {
      done = true
      fn.apply(this, arguments)
    } else {
      console.log('只能执行一次')
    }
  }
}

const pay = once(function(money) {
  console.log(`支付 ${money} RMB`);
})

pay(112)
pay(112)
pay(112)