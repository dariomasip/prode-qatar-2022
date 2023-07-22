import axios from "axios";
import { useState } from "react";

const baseUrl = "https://the-prophecy-game.rj.r.appspot.com/api/auth/login";

const config = {
  "Access-Control-Allow-Origin": "*",
};

const login = (credentials) => {
  const resquest = axios
    .post(baseUrl, credentials, config)
    .then((response) => response.data)
    .catch((error) => console.error(error.response.data.errors[0]));
  return resquest;
};

export default { login };
