const express = require("express");
const postDb = require("./posts/postDb");
const userDb = require("./users/userDb");

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

server.get("/", (req, res) => {
  userDb
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved." });
    });
});

server.get("/", (req, res) => {
  const { id } = req.params;

  userDb
    .getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved." });
    });
});

server.post("/", (req, res) => {
  const user = req.body; // not sure

  if (!user.name) {
    res.status(400).json({ message: "Provide a name for the new user." });
  } else {
    userDb
      .insert(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error while adding the user to the database."
        });
      });
  }
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed." });
    });
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!user.name) {
    res.status(400).json({ message: "Provide a name for the new user." });
  } else {
    userDb
      .update(id, user)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "The user information could not be modified." });
      });
  }
});

module.exports = server;
