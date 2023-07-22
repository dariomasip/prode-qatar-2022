import axios from "axios";
const baseUrl = "https://the-prophecy-game.rj.r.appspot.com/api/partidos";

const getAll = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const request = axios
    .get(baseUrl, config)
    .then((response) => response.data)
    .catch((error) => console.error(error));
  return request;
};

export default { getAll };
