const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  await Course.updateMany({_id: courseId}, {
     $unset: { 'author': '' } 
    });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  course.authors.pull(authorId);
  course.save();
}

// updateAuthor('65c421d728b534a491b0b311');
// createCourse('Node Course', [
//   new Author({name: 'Mosh', bio: 'My bio', website: 'https://mosh.com'}),
//   new Author({name: 'John', bio: 'My bio', website: 'https://mosh.com'}),
// ]);
// addAuthor('65c4250c3e91c57cdd1e3fb7', new Author({name: 'Shervin', bio: 'My bio', website: 'https://mosh.com'}));
removeAuthor('65c4250c3e91c57cdd1e3fb7', '65c4250c3e91c57cdd1e3fb6');