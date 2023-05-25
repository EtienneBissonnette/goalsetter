const mongoose = require("mongoose");

//TODO: Add user fields to goalSchema
const goalSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    text: { type: String, required: [true, "Pease add goal text"] },
  },
  {
    timestamps: true,
  }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
