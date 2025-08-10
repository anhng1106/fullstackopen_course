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

after(async () => {
  await mongoose.connection.close();
});
