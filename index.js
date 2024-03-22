const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let blogs = [];

//show all blogs
app.get('/blogs', (req, res) => {
  res.json(blogs);
});

//create a blog
app.post('/blogs', (req, res) => {
  const { title, content, author } = req.body;
  const publicationDate = new Date();
  const newBlog = { id: blogs.length + 1, title, content, author, publicationDate };
  blogs.push(newBlog);
  res.status(201).json(newBlog);
});

// delete blog by id
app.delete('/blogs/:id', (req, res) => {
  const { id } = req.params;
  blogs = blogs.filter(blog => blog.id !== parseInt(id));
  res.sendStatus(204);
});

// search by author name
app.get('/blogs/search', (req, res) => {
  const { author } = req.query;
  const filteredBlogs = blogs.filter(blog => blog.author.toLowerCase() === author.toLowerCase());
  res.json(filteredBlogs);
});

// blogs sorted by publication date (Show recent blogs first)
app.get('/blogs/sortedByDate', (req, res) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.publicationDate - a.publicationDate);
  res.json(sortedBlogs);
});

// blogs sorted alphabetically by author name
app.get('/blogs/sortedByAuthor', (req, res) => {
  const sortedBlogs = [...blogs].sort((a, b) => a.author.localeCompare(b.author));
  res.json(sortedBlogs);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
