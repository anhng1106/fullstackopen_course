const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("../utils/test_helper");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const Blog = require("../models/blog");

let authToken;
let createdBlogId;

const loginAndGetToken = async () => {
  const res = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" })
    .expect(200);
  return res.body.token;
};

const usersInDb = async () => (await User.find({})).map((u) => u.toJSON());

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  await User.syncIndexes();
  await api
    .post("/api/users")
    .send({ username: "root", name: "Superuser", password: "sekret" })
    .expect(201);
});

test("fails with 400 if username is missing", async () => {
  const start = await usersInDb();
  const res = await api
    .post("/api/users")
    .send({ name: "NoU", password: "abc" })
    .expect(400);
  assert.match(res.body.error ?? "", /required/i);
  const end = await usersInDb();
  assert.equal(end.length, start.length);
});

test("fails with 400 if password is missing", async () => {
  const start = await usersInDb();
  const res = await api
    .post("/api/users")
    .send({ username: "noupass", name: "X" })
    .expect(400);
  assert.match(res.body.error ?? "", /required/i);
  const end = await usersInDb();
  assert.equal(end.length, start.length);
});

test("fails with 400 if username is shorter than 3", async () => {
  const start = await usersInDb();
  const res = await api
    .post("/api/users")
    .send({ username: "ab", name: "ShortU", password: "abc" })
    .expect(400);
  assert.match(res.body.error ?? "", /at least 3/i);
  const end = await usersInDb();
  assert.equal(end.length, start.length);
});

test("fails with 400 if password is shorter than 3", async () => {
  const start = await usersInDb();
  const res = await api
    .post("/api/users")
    .send({ username: "shortpwd", name: "ShortP", password: "xy" })
    .expect(400);
  assert.match(res.body.error ?? "", /at least 3/i);
  const end = await usersInDb();
  assert.equal(end.length, start.length);
});

test("fails with 400 if username is not unique", async () => {
  const start = await usersInDb();
  const res = await api
    .post("/api/users")
    .send({ username: "root", name: "Dup", password: "abc123" })
    .expect(400);
  assert.match(res.body.error ?? "", /unique/i);
  const end = await usersInDb();
  assert.equal(end.length, start.length);
});

// ---- Blog POST tests (now token-aware) ----

test("creating a new blog succeeds with a valid token", async () => {
  const newBlog = {
    title: "A secured post",
    author: "Grace",
    url: "http://example.com/secure",
    likes: 5,
  };

  const token = await loginAndGetToken();
  const start = await helper.blogsInDb();

  const res = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.ok(res.body.id);
  assert.equal(res.body.title, newBlog.title);

  const end = await helper.blogsInDb();
  assert.equal(end.length, start.length + 1);
});

test("fails with 401 if token is missing", async () => {
  const newBlog = {
    title: "Unauthorized post",
    author: "Intruder",
    url: "http://example.com/nope",
    likes: 1,
  };

  const start = await helper.blogsInDb();

  const res = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  assert.match(res.body.error ?? "", /token/i);

  const end = await helper.blogsInDb();
  assert.equal(end.length, start.length); // no change
});

test("if likes is missing, it defaults to 0 (with token)", async () => {
  const newBlog = {
    title: "No likes field",
    author: "Alice",
    url: "http://example.com/nolikes",
  };

  const token = await loginAndGetToken();

  const res = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201);

  assert.equal(res.body.likes, 0);
});

test("fails with 400 if title is missing (with token)", async () => {
  const token = await loginAndGetToken();

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({ author: "No Title", url: "http://example.com" })
    .expect(400);
});

test("fails with 400 if url is missing (with token)", async () => {
  const token = await loginAndGetToken();

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "No URL", author: "No Url Author" })
    .expect(400);
});

after(async () => {
  await mongoose.connection.close();
});
