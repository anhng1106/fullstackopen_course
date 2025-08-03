import { useEffect, useState } from "react";
import React from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (newName.trim() === "" || newNumber.trim() === "") {
      alert("Both name and number are required.");
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewNumber("");
            setMessage(`Updated ${returnedPerson.name}`);
            setMessageType("success");
            setTimeout(() => {
              setMessage(null);
              setMessageType(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage(
              `The person ${existingPerson.name} has already been removed from server`
            );
            setMessageType("error");
            setTimeout(() => {
              setMessage(null);
              setMessageType(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${returnedPerson.name}`);
          setMessageType("success");
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error adding person:", error.response.data.error);
          setMessage(error.response.data.error);
          setMessageType("error");
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={handleAddPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
