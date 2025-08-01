import { useState, useEffect } from "react";
import userService from "./services/userService";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    userService
      .getUsers()
      .then((userData) => {
        setUsers(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>User List</h1>
        <input
          type="text"
          placeholder="Search users"
          value={search}
          onChange={handleSearchChange}
        />

        {loading ? (
          <p> Loading users...</p>
        ) : (
          <>
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.email}){" "}
                  <button onClick={() => setSelectedUser(user)}>Show</button>
                </li>
              ))}
            </ul>

            {selectedUser && (
              <div>
                <h3>Selected User Info</h3>
                <p>Name: {selectedUser.name}</p>
                <p>Email: {selectedUser.email}</p>
                <p>Phone: {selectedUser.phone}</p>
                <p>Website: {selectedUser.website}</p>
                <p>Company: {selectedUser.company?.name}</p>
                <button onClick={() => setSelectedUser(null)}>Close</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
