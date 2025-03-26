import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      required: true,
      enum: ["user", "kitchen_owner"],
      default: "user"
    },
    plan: { 
      type: String, 
      enum: ["basic", "silver", "gold", "null"],
      default: null 
    },
    remainingUses: { type: Number, default: 0 },
    recentKitchens: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kitchen"
    }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;