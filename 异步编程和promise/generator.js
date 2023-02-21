function * fn() {
  console.log(1)
  yield 2
  console.log(2)
  yield 3
  try {
    console.log(4)
  } catch(err) {
    console.log(err)
  }
}

const generator = fn()

generator.next()
generator.next()
generator.next()
generator.throw('error')