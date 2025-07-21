import { useState } from "react";
import React from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (newName.trim() === "") {
      alert("Name cannot be empty");
      return;
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = { name: newName };
      setPersons(persons.concat(personObject));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={handleAddPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, index) => (
          <p key={index}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
