// const log = require('./logger')

// function sayHello(name) {
//   console.log('hello ' + name)
// }

// log('yoloy')
// sayHello('jhone')

// console.log(window) // doesn't exist in the runtime environment of the pc, only in the browser

// global objects
// console.log()

// setTimeout()
// clearTimeout()

// setInterval()
// clearInterval()

// var message = ''
// global.console.log(global.message) //using the global object === window.console.log()

// const path = require('path')

// var pathObj = path.parse(__filename)

// console.log(pathObj)

// const os = require('os')

// var totalMemory = os.totalmem()
// var freeMemory = os.freemem()

// console.log(`total memory: ${totalMemory}`)
// console.log(`free memory: ${freeMemory}`)

// const fs = require('fs')

// // const files = fs.readdirSync('./')

// // console.log(files)

// fs.readdir('$', (err, files) => {
//   if (err) {
//     console.log('Error ' + err)
//   } else {
//     console.log('files ' + files)
//   }
// })

// const Logger = require('./logger')
// const logger = new Logger()

// //register an listener
// logger.on('messageLogged', (arg) => {
//   //e, eventArg

//   console.log('listener called', arg)
// })

// logger.log('message')

const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('hello world')
    res.end()
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]))
    res.end()
  }
})

server.listen(3000)
console.log('listeninr on port 3000.....')
