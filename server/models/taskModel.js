const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,

  status: {
    type: String,
    enum: ["Ongoing", "Pending", " Done", "Collaborative"],
    default: "Ongoing",
  },
  category: {
    type: String,
    required: true,
  },
  //   owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
