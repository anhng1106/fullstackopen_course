const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const Blog = require("../models/blog");
const helper = require("../utils/test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("returns the correct amount of blog posts", async () => {
  const res = await api.get("/api/blogs");
  assert.ok(Array.isArray(res.body));
  assert.equal(res.body.length, helper.initialBlogs.length);
});

test("unique identifier property of blog posts is named id", async () => {
  const res = await api.get("/api/blogs");

  for (const blog of res.body) {
    assert.ok(blog.id, "id property should be defined");
    assert.equal(blog._id, undefined, "_id should not be returned");
  }
});

test("creating a new blog succeeds and increases count", async () => {
  const newBlog = {
    title: "A fresh post",
    author: "Grace Hopper",
    url: "http://example.com/fresh",
    likes: 7,
  };

  const blogsAtStart = await helper.blogsInDb();

  const res = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // sanity checks on returned payload
  assert.ok(res.body.id, "saved blog should have id");
  assert.equal(res.body.title, newBlog.title);

  const blogsAtEnd = await helper.blogsInDb();
  assert.equal(blogsAtEnd.length, blogsAtStart.length + 1);

  // verify the new title is present in DB
  const titles = blogsAtEnd.map((b) => b.title);
  assert.ok(titles.includes("A fresh post"));
});

test("if likes property is missing, it defaults to 0", async () => {
  const newBlog = {
    title: "Post without likes",
    author: "No Likes Author",
    url: "http://example.com/nolikes",
  };

  const res = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // check likes property for this test
  assert.equal(res.body.likes, 0);

  const blogsAtEnd = await helper.blogsInDb();
  const saved = blogsAtEnd.find((b) => b.title === "Post without likes");
  assert.equal(saved.likes, 0);
});

test("fails with 400 if title is missing", async () => {
  const newBlog = {
    author: "No Title",
    url: "http://example.com/notitle",
    likes: 1,
  };

  const blogsAtStart = await helper.blogsInDb();

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.equal(blogsAtEnd.length, blogsAtStart.length);
});

test("fails with 400 if url is missing", async () => {
  const newBlog = {
    title: "No URL",
    author: "No Url Author",
    likes: 1,
  };

  const blogsAtStart = await helper.blogsInDb();

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.equal(blogsAtEnd.length, blogsAtStart.length);
});

after(async () => {
  await mongoose.connection.close();
});
