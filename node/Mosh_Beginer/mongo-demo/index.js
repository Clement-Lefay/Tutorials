const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => {
    console.log('connected to mondoDB...')
  })
  .catch((err) => console.log(`Connot connect to mongoDB: ${err}`))

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    // uppercase: true,
    // trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        // do some async work
        setTimeout(() => {
          const result = v && v.length > 0
          callback(result)
        }, 1000)
      },
      message: 'The course should have at least 1 tag',
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
  const course = new Course({
    name: 'Angular course',
    category: 'Web',
    author: 'Mosh',
    tags: ['frontend'],
    isPublished: true,
    price: 15.8,
  })
  try {
    const result = await course.save()
    console.log(result)
  } catch (error) {
    for (field in error.errors) {
      console.log(error.errors[field].message)
    }
  }
}

async function getCourses() {
  // comparison operator
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  // use $ to indicate the use of operator

  // Logical operator
  // or
  // and

  // const courses = await Course
  // .find({
  //   price: {
  //     $gte: 10,
  //     $lte: 20,
  //   },
  // })
  // .find({
  //   price: {
  //     $in: [10, 15, 20],
  //   },
  // })
  //
  // .find()
  // .or([{ author: 'Mosh' }, { isPublished: true }])
  // .and([])
  //
  // starts wish Mosh
  // .find({
  //   author: /^Mosh/,
  // })
  // ends with Hamedani
  // .find({
  //   author: /Hamedani$/i,
  // })
  // constains Mosh
  // .find({
  //   author: /.*Mosh.*/i,
  // })
  //

  const pageNumber = 2
  const pageSize = 10
  // /api/courses/pageNumber=2?pageSize=10

  const courses = await Course.find({
    _id: '5ea89cbea7d5a7451899527e',
  })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({ name: 1 })
    // .count()
    .select({ name: 1, tags: 1, price: 1 })

  console.log(courses)
}

async function updateCourse(id) {
  // approche: query first
  // findbyid()
  // modify its propertie
  //save
  // const course = await Course.findById(id)
  // if (!course) return

  // course.isPublished = true
  // course.author = 'Another Author'

  // same approcah
  // course.set({
  //   isPublished: true,
  //   author: 'Another Authoer'
  // })

  // const result = await course.save()
  // console.log(result)

  // approche: update first
  // update directly
  // optionel: get the document
  // Course.update
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: 'Jason',
        isPublished: false,
      },
    },
    {
      new: true,
    }
  )
  console.log(result)
}

async function removeCourse(id) {
  // const result = await Course.deleteMany({
  //   _id: id,
  // })
  const course = await Course.findByIdAndRemove(id)
  console.log(course)
}

getCourses()
