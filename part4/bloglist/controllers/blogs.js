const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

// blogRouter.post("/", (request, response) => {
//   const body = request.body;
//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes || 0,
//   });
//   blog
//     .save()
//     .then((savedBlog) => {
//       response.status(201).json(savedBlog);
//     })
//     .catch((error) => {
//       response.status(400).json({ error: error.message });
//     });
// });

module.exports = blogRouter;
