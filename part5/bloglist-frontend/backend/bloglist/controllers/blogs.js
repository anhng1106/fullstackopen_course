const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogRouter.post("/", userExtractor, async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: "title and url are required" });
    }

    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });

    const saved = await blog.save();

    user.blogs = user.blogs.concat(saved._id);
    await user.save();

    const populated = await saved.populate("user", { username: 1, name: 1 });
    return res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "blog not found" });

    // blog.user might be an ObjectId or a populated object
    const ownerId = blog.user && blog.user._id ? blog.user._id : blog.user; // handles both cases

    if (!ownerId || ownerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "only the creator can delete this blog" });
    }

    await Blog.findByIdAndDelete(blog._id);
    await User.updateOne({ _id: req.user._id }, { $pull: { blogs: blog._id } });

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", userExtractor, async (req, res, next) => {
  try {
    const update = {
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
    };

    const updated = await Blog.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!updated) return res.status(404).json({ error: "blog not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
