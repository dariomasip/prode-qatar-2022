import axios from "axios";
import React, { useEffect } from "react";

const useApiPost = async (url, data, token) => {
  if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const request = await axios
      .post(url, data, config)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    return request;
  } else {
    const request = await axios
      .post(url, data)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    return request;
  }
};

export default useApiPost;
