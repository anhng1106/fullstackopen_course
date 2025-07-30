import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const getUsers = () => {
  const request = axios.get(API_URL);
  return request.then((response) => response.data);
};

const getEmails = () => {
  const request = axios.get(API_URL);
  return request.then((response) => response.data.map((user) => user.email));
};

export default { getUsers, getEmails };
