const express = "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { name } = req.body; // not sure

  if (!name) {
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

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
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

//custom middleware

function validateUserId(req, res, next) {
  const id = req.users.id;
}

function validateUser(req, res, next) {
  const body = req.body;

  if (!body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!body.name) {
    res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  const body = req.body;

  if (!body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!body.text) {
    res.status(400).json({ message: "missing required text field" });
  }
}

module.exports = router;
