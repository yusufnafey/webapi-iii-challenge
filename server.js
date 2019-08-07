const express = require("express");

const server = express();

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  let date = new Date();
  let timestamp = date.getTime();
  const method = req.method;
  const url = req.url;
  console.log(`You made a ${method} request to ${url} on ${timestamp}.`);
}

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = server;
