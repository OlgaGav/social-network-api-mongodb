const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .then(users => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err.message);
      });
  },
  // GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user
            })
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
      {_id: req.params.userId},
      { $set: req.body },
      { runValidators: true, new: true }
      )
    .then ((user) => res.json(user))
    .catch((err) => res.json(err))
  },

  // DELETE to remove user by its _id, remove a user's associated thoughts when deleted
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thoughts.deleteMany({ username: user.username })
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(200).json({
              message: 'User deleted, no associated thoughts found for this user',
            })
          : res.json({ message: 'User and associated thoughts successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

/*
TODO
/api/users/:userId/friends/:friendId
POST to add a new friend to a user's friend list
DELETE to remove a friend from a user's friend list
*/


};
