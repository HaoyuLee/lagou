const { task } = require('folktale/concurrency/task')
const fs = require('fs')
const { split, find } = require('lodash/fp')
function readFile (filename) {
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if(err) resolver.reject(err)
      else resolver.resolve(data)
    })
  })
}

const taskRes = readFile('../package.json')
  .map(split('\n'))
  .map(find(x => x.includes('version')))
  .run()
  .listen({
    onRejected(err) {
      console.log(err);
    },
    onResolved(value) {
      console.log(value)
    }
  })