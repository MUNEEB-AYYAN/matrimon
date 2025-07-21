import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    preferences: {
      gender: {
        type: String,
        enum: ["male", "female"],
        default: "female",
        required: true,
      },
      religion: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
