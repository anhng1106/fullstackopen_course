require("dotenv").config();

const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

morgan.token("body", (request) => {
  return request.method === "POST" ? JSON.stringify(request.body) : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(cors());

app.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).send({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  Person.countDocuments().then((count) => {
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    `);
  });
});

const generateId = () => {
  const id = Math.floor(Math.random() * 1000000).toString();
  return id;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const nameExists = persons.some((person) => person.name === body.name);
  if (nameExists) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  person.save().then((savedPerson) => {
    console.log("person saved:", savedPerson);
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
