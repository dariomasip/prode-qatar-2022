import axios from "axios";
const baseUrl = "https://the-prophecy-game.rj.r.appspot.com/api/pronosticos";

const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(baseUrl, config);
  return res.data;
};

const create = async (newObject, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

export default { getAll, create };
