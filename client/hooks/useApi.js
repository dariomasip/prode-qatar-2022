import axios from "axios";
import React, { useEffect, useState } from "react";

const useApi = (url, token) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get(url, config).then((response) => setData(response.data));
  }, [token]);

  return [data];
};

export default useApi;
