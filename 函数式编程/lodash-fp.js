// lodash function program 函数式编程

// 函数优先 数据置后
const fp = require('lodash/fp')
const str = 'NEVER SAY DIE'
const compose = fp.flowRight(fp.join('-'), fp.map(fp.toLower) ,fp.split(' '))
console.log(compose(str));


// point free

// Hello World => hello_world

const f = fp.flowRight(fp.replace(/s+/g, '_'), fp.toLower)
console.log(f('Hello World'));