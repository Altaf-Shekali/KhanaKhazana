import mongoose from "mongoose";

const mealLogSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  kitchen: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Kitchen", 
    required: true 
  },
  redeemedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("MealLog", mealLogSchema);