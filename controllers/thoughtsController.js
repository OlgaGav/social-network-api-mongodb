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
  
  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field), example in notes section
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id }},
          { usert: true, new: true }
        ).then((user) => {
          res.json(thought);
        }).catch((err) => {
          console.log(err);
          return res.status(400).json(err);
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },

  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      // .then((thought) =>
      //   !thought
      //     ? res.status(404).json({ message: "No thought with that ID" })
      //     // TODO: delete thought id from user
      //     : res.json(thought)
      // )
      .then(() => res.json({ message: "Thought and user deleted!" }))
      .catch((err) => res.status(400).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
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
};
