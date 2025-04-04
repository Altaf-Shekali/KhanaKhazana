import express from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Kitchen from "../model/kitchen.model.js"; // Adjust if needed

const router = express.Router();

// Utility function to check ObjectId validity
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ **Kitchen Signup**
router.post("/signup", upload.array("images", 10), async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging
    
    const { name, email, password, location } = req.body;

    // Validate required fields
    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingKitchen = await Kitchen.findOne({ email });
    if (existingKitchen) {
      return res.status(400).json({ message: "Kitchen already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle images
    const images = req.files ? req.files.map((file) => file.path.replace(/\\/g, "/")) : [];

    const newKitchen = new Kitchen({
      name,
      email,
      password: hashedPassword,
      location,
      role: "kitchen_owner",
      images,
    });

    await newKitchen.save();
    res.status(201).json({ message: "Kitchen registered successfully!", redirectPath: "/kitchenlogin" });
  } catch (error) {
    console.error("Error registering kitchen:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ **Kitchen Login**
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const kitchen = await Kitchen.findOne({ email });
    if (!kitchen) {
      return res.status(404).json({ message: "Kitchen not found!" });
    }

    const isMatch = await bcrypt.compare(password, kitchen.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    res.status(200).json({
      message: "Login successful!",
      kitchen: {
        _id: kitchen._id,
        name: kitchen.name,
        email: kitchen.email,
        location: kitchen.location,
        role: kitchen.role,
        images: kitchen.images,
      },
    });
  } catch (error) {
    console.error("Error logging in kitchen:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ **Get Kitchens**
router.get("/", async (req, res) => {
  try {
    const kitchens = await Kitchen.find().select("name location images").sort({ name: 1 });
    res.json(kitchens);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ **Add a Meal Transaction**
router.post("/:kitchenId/transactions", async (req, res) => {
  try {
    const { kitchenId } = req.params;
    const { customerId, customerName, customerEmail, plan, mealCount, breakdown } = req.body;

    if (!isValidObjectId(kitchenId)) {
      return res.status(400).json({ message: "Invalid Kitchen ID format" });
    }

    const kitchen = await Kitchen.findById(kitchenId);
    if (!kitchen) {
      return res.status(404).json({ message: "Kitchen not found" });
    }

    const transaction = {
      customerId: isValidObjectId(customerId) ? new mongoose.Types.ObjectId(customerId) : null,
      customerName,
      customerEmail,
      plan,
      mealCount,
      breakdown: breakdown || { basic: 0, silver: 0, gold: 0 },
      date: new Date(),
    };

    if (!transaction.customerId) {
      return res.status(400).json({ message: "Invalid customer ID format" });
    }

    kitchen.transactions.push(transaction);
    await kitchen.save();

    res.status(200).json({ message: "Meal transaction recorded successfully", transaction });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ **Get Kitchen Transactions**
router.get("/:kitchenId/transactions", async (req, res) => {
  try {
    const { kitchenId } = req.params;

    if (!isValidObjectId(kitchenId)) {
      return res.status(400).json({ message: "Invalid Kitchen ID format" });
    }

    const kitchen = await Kitchen.findById(kitchenId).populate("transactions.customerId", "name email");
    if (!kitchen) {
      return res.status(404).json({ message: "Kitchen not found" });
    }

    res.status(200).json({ transactions: kitchen.transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
