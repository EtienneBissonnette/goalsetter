const mongoose = require("mongoose");

//TODO: Add user fields to goalSchema
const goalSchema = mongoose.Schema(
  {
    text: { type: String, required: [true, "Pease add goal text"] },
  },
  {
    timestamps: true,
  }
);

const Goal = mongoose.model("Goal",goalSchema);

module.exports = Goal;
