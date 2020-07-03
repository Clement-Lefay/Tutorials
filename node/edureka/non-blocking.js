var fs = require('fs')

fs.readFile('text.txt', function (err, data) {
  if (err) {
    console.log(err)
  }
  setTimeout(() => {
    console.log('display after 2 s')
  }, 200)
})

console.log('start here')
