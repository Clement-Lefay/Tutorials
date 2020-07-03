const express = require('express')
const Joi = require('joi')

const router = express.Router()

const courses = [
  {
    id: 1,
    name: 'course1',
  },
  {
    id: 2,
    name: 'course2',
  },
  {
    id: 3,
    name: 'course3',
  },
]

/**
 *   COURSES
 */
router.get('/', (req, res) => {
  res.send(courses)
})

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body)
  if (error) {
    // 400 bad request
    return res.status(400).send(error.details[0].message)
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  }
  courses.push(course)
  res.send(course)
})

router.get('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) {
    // 404
    return res.status(404).send('the course with the given id was not found')
  }
  res.send(course)
})

router.put('/:id', (req, res) => {
  // lookup the course
  // if not existing => 404
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) {
    // 404
    return res.status(404).send('the course with the given id was not found')
  }

  // validate
  //  if invalidate => 400
  const { error } = validateCourse(req.body)
  if (error) {
    // 400 bad request
    return res.status(400).send(error.details[0].message)
  }

  // update course
  //  return update course
  course.name = req.body.name
  res.send(course)
})

router.delete('/:id', (req, res) => {
  // lookup the course
  // if not existing => 404
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) {
    // 404
    return res.status(404).send('the course with the given id was not found')
  }

  // Delete
  const index = courses.indexOf(course)
  courses.splice(index, 1)

  // Return course deleted
  res.send(course)
})

/**
 *    OTHER
 */
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  }
  return Joi.validate(course, schema)
}

module.exports = router
