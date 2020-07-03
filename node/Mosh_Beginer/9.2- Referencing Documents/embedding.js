const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err))

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
})

const Author = mongoose.model('Author', authorSchema)

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
)

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  })

  const result = await author.save()
  console.log(result)
}

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  })

  const result = await course.save()
  console.log(result)
}

async function listCourses() {
  const courses = await Course.find().select('name authors')
  console.log(courses)
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId)
  course.authors.push(author)
  course.save()
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()
}

async function updateAuthor(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $unset: {
        author: '',
      },
    }
  )
}

// createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({ name: 'John' })])

removeAuthor('5ea9bc71ab07032124185eff', '5ea9be57a2d8541828d9d0cb')

// updateAuthor('5ea9ba038001361e00f8cc69')

// listCourses();
