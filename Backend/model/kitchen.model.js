import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  plan: { type: String, required: true }, // e.g., basic, silver, gold
  mealCount: { type: Number, required: true },
  // Optionally, if you want a breakdown (for instance basic, silver, gold meals in one transaction), you could add:
  breakdown: {
    basic: { type: Number, default: 0 },
    silver: { type: Number, default: 0 },
    gold: { type: Number, default: 0 }
  },
  date: { type: Date, default: Date.now }
});

const kitchenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  role: { type: String, required: true },
  images: { type: [String], default: [] },
  
  // New transactions array to store meal usage by customers
  transactions: [transactionSchema]
}, { timestamps: true });

const Kitchen = mongoose.model("Kitchen", kitchenSchema);

export default Kitchen;
