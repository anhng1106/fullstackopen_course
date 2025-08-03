const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  const blogs = Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });
  blog
    .save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog);
    })
    .catch((error) => {
      response.status(400).json({ error: error.message });
    });
});

module.exports = blogRouter;
