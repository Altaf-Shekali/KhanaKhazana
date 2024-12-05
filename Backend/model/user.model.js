import mongoose from "mongoose";

// Define the User schema
const userSchema =mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
    },
    plan: {
      type:String,
      default: null,
    },
    
  }
);
const User=mongoose.model("User",userSchema)
export default User;
