const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "My First Blog",
    author: "Jane Doe",
    url: "http://example.com/blog",
    likes: 10,
    id: "688fcdd10c40efd0db46f6fb",
  },
  {
    title: "My Second Blog",
    author: "Mia",
    url: "http://example2.com/blog2",
    likes: 13,
    id: "688fd19540f76ce1ed7eaa36",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
