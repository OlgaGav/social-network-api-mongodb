const mongoose = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create a thoughts model
const thoughtsSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
      validate: [
        {
          validator: function (val) {
            return val.length >= 1 && val.length <= 280;
          },
          message: "Thought text must be between 1 and 280 characters",
        },
      ],
    },
    username: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => {
        if (date) return date.toISOString().split("T")[0];
      },
    },
    reactions: [reactionSchema],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: true, updatedAt: true },
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

thoughtsSchema.virtual("createdAtFormatted").get(function () {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(this.createdAt);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  return `${month} ${day}${day % 10 === 1 ? "st" : day % 10 === 2 ? "nd" : day % 10 === 3 ? "rd" : "th"}, ${year} at ${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
});

module.exports = mongoose.model("Thoughts", thoughtsSchema);
