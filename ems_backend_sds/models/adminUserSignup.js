import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
    firstLogin: { type: Boolean, default: true }
  });
  
export default mongoose.model("adminusers", userSchema);