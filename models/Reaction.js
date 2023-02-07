const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    select: false,
  },
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    maxlength: 280,
    validate: [
      {
        validator: function (val) {
          return val.length <= 280;
        },
        message: "Reaction must not exceed 280 characters",
      },
    ],
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = reactionSchema;
