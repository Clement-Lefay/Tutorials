const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')

const express = require('express')
const logger = require('./middleware/logger')
const courses = require('./routes/courses')
const home = require('./routes/home')

const app = express()

app.set('view engine', 'pug') // load pug internally, no need to require it
app.set('views', './views') // default

// act as a middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //key=value&key=value
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', home)

// // config
console.log(`application name: ${config.get('name')}`)
console.log(`mail server: ${config.get('mail.host')}`)
console.log(` mail password: ${config.get('mail.password')}`)

if (app.get('env') === 'development') {
  app.use(morgan('tiny')) // logging
  debug('Morgan enabled')
}

app.use(logger)

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`lisening on port ${port}....`)
})
