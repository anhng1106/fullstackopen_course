const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

const usersInDb = async () => (await User.find({})).map((u) => u.toJSON());

beforeEach(async () => {
  await User.deleteMany({});
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

test.only("fails with 400 if username is not unique", async () => {
  const start = await usersInDb();
  const res = await api
    .post("/api/users")
    .send({ username: "root", name: "Dup", password: "abc123" })
    .expect(400);
  assert.match(res.body.error ?? "", /unique/i);
  const end = await usersInDb();
  assert.equal(end.length, start.length);
});

after(async () => {
  await mongoose.connection.close();
});
