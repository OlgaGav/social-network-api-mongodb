const { ObjectId } = require("mongoose").Types;
const { User, Thoughts } = require("../models");

module.exports = {
  // GET all users and populate the associated friends and thoughts if any
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err.message);
      });
  },
  // GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ user })
      )
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },

  // POST a new user (example {"username": "lernantino","email": "lernantino@gmail.com"})
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  // DELETE to remove user by its _id, remove a user's associated thoughts when deleted
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : Thoughts.deleteMany({ username: user.username })
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(200).json({
              message:
                "User deleted, no associated thoughts found for this user",
            })
          : res.json({
              message: "User and associated thoughts successfully deleted",
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
addFriend(req, res) {
  if (req.params.userId === req.params.friendId) {
    return res.status(400).json({message: "User can not be friend to himself / herself"})
  }
  const bodyRequest = {_id: req.params.friendId};
  User.findOne({_id: req.params.friendId})
  .then((friend) => {
    if (friend) {
      User.findOneAndUpdate(
        {_id: req.params.userId},
        { $addToSet: { friends: bodyRequest } },
        { runValidation: true, new: true }
        )
        .then((user) => {
          !user
            ? res.status(400).json({message: "No such user exist"})
            : res.json(user)
        })
    } else {
      res.status(400).json({message: "Incorrect user id specified as friend"})
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
},

deleteFriend(req, res) {
  User.findOneAndUpdate(     
    { _id: req.params.userId }, 
    { $pull: { friends: ObjectId(req.params.friendId) }},
    { new: true }
  )
    .then((user) => {
      !user
        ? res.status(404).json({ message: "No user with specified Id found" })
        : res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err)
    });
}



};
