import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please Provide User Name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please Provide Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please Provide Password"],
  },
});

const User = mongoose.models.usersdata || mongoose.model("usersdata", userSchema);

export default User;
