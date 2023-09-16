const mongoose = require("mongoose");
const Class = require("../models/Class");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    credentials: {
      name: {
        type: String,
        required: true,
        min: 3,
      },

      userImage: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      password: {
        type: String,
        required: true,
        min: 8,
      },

      isAdmin: {
        type: Boolean,
      },
    },

    provider: {
      type: String,
    },

    enrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],

    teaching: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
