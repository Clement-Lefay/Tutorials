const mongoose = require('mongoose')

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => {
    console.log('connected to MongoDB...')
  })
  .catch((err) => console.log('cannot connect to MongoDB: ' + err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  isPublished: Boolean,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
})

const Course = mongoose.model('Course', courseSchema)

async function getBackendPublishedCourses() {
  return await Course.find({
    isPublished: true,
    tags: 'backend',
  })
    .sort('name') // same as {name:1}
    .select({ name: 1, author: 1 })
}

async function getAllPublishedCourses() {
  return await Course.find({
    isPublished: true,
  })
    .or([{ tags: 'backend' }, { tags: 'frontend' }])
    .sort('-price')
    .select({ name: 1, author: 1, price: 1 })
}

async function getExpensiveExternalPublishedCourses() {
  return await Course.find({ isPublished: true }).or([
    {
      price: {
        $gte: 15,
      },
    },
    { name: /.*by.*/i },
  ])
}

async function run() {
  const result = await getExpensiveExternalPublishedCourses()
  console.log(result)
}

run()
