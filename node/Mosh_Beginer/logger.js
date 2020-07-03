const EventEmitter = require('events')

var url = 'htt://mylogger/io/log'

class Logger extends EventEmitter {
  log(message) {
    // send http request
    console.log(message)

    // Raised an event
    this.emit('messageLogged', { id: 1, url: 'http://' }) //make a noise, produce - signaling
  }
}

module.exports = Logger
