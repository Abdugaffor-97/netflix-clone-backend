const express = require("express");
const axios = require("axios");

let url = "http://www.omdbapi.com/?apikey=e4c8a5bd&s=";

const routers = express.Router();

routers.get("/", (req, res, next) => {
  try {
    if (req.params.type) {
      axios(url + req.params.id)
        .then((reqeust) => res.send(reqeust.data))
        .catch((error) => next(error));
    } else {
      axios(url + req.query.title)
        .then((reqeust) => res.send(reqeust.data))
        .catch((error) => next(error));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

routers.get("/:id", (req, res, next) => {
  try {
    axios("http://www.omdbapi.com/?apikey=ad2a416a&i=" + req.params.id)
      .then((reqeust) => {
        res.send(reqeust.data);
      })
      .catch((error) => next(error));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = routers;
