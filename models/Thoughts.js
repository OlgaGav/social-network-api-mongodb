const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');
const User = require('./User');

// Schema to create a thoughts model
const thoughtsSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      validate: [
        {
          validator: function(val) {
            return val.length >= 1 && val.length <= 280;
          },
          message: "Thought text must be between 1 and 280 characters"
        }
      ]
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => {
        if (date) return date.toISOString().split("T") [0];
      },
    },
    username: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'      
    },
    reactions: [reactionSchema],
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  });
  
  thoughtsSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
  });

module.exports = mongoose.model('Thoughts', thoughtsSchema);

