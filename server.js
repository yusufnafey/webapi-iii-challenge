const express = require("express");
const postDb = require("./posts/postDb");
const userDb = require("./users/userDb");
const router = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/user", router);

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
  next();
}

module.exports = server;
