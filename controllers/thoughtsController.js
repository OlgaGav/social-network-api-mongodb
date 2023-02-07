const { User, Thoughts, Reaction } = require("../models");

module.exports = {
  // GET to get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err));
  },

  // GET to get a single thought by its _id
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(400).json(err));
  },

  // POST to create a new thought. Created thought's _id added (pushed) to the associated user's thoughts array field
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { usert: true, new: true }
        )
          .then((user) => {
            res.json(thought);
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },

  // DELETE a thought by its _id, also remove this thought from the user's thoughts
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought with provided Id" });
        }
        User.findOneAndUpdate(
          { name: thought.username },
          { $pull: { thoughts: thought._id } },
          { new: true }
        )
          .then((user) => {
            res.json({
              message: "Thought deleted and removed from user thoughts!",
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json(err);
          });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }

        if (req.body.username && req.body.username !== thought.username) {
          return res
            .status(400)
            .json({ message: "Username field cannot be changed" });
        }

        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((updatedThought) => {
            res.json(updatedThought);
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  // Add reaction to the thought
  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidation: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought with specified ID found" })
          : res.json(thought)
      )
      .catch((err) => res.status(400).json(err));
  },

  // Remove reaction from the thought, identify reaction by id
  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        !thought
          ? res
              .status(404)
              .json({ message: "No thought with specified Id found" })
          : res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },
};
