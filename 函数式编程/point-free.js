const fp = require('lodash/fp')
// 'world wild web' 
// const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.first),fp.map(fp.toUpper),fp.split(' '))
const firstLetterToUpper = fp.flowRight(fp.join('. '),fp.map(fp.flowRight(fp.toUpper, fp.first)),fp.split(' '))

console.log(firstLetterToUpper('world wild web'));