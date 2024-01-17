import axios from "axios";

export default ({ req }) => {
  // Decide which environment we are in

  if (typeof window === "undefined") {
    // we are on th server
    return axios.create({
      baseURL: "http://ingress-nginx-controller",
      headers: req.headers,
    });
  } else {
    // we must be on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

