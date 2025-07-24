import axios from "axios";

const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const getAll = () => {
  const request = axios.get(api_key);
  return request.then((response) => response.data);
};

export default { getAll };
