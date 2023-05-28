const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    ownership: {
      type: String,
      unique: true,
    },
    access_level: {
      enum: ["full", "partial"],
    },
    allow: {
      olt: [{ type: String }],
      master: [{ type: Number }],
      ds: [{ type: Number }],
      submaster: [{ type: Number }],
      extender: [{ type: Number }],
    },
    restrict: {
      olt: [{ type: String }],
      master: [{ type: Number }],
      ds: [{ type: Number }],
      submaster: [{ type: Number }],
      extender: [{ type: Number }],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = dataSchema;
