import express from "express";
import Menu from "../model/menu.model.js";

const router = express.Router();

/**
 * 1️⃣ Initialize an Empty Menu for a Kitchen (POST)
 */
router.post("/initialize", async (req, res) => {
  try {
    const { kitchenId } = req.body;
    if (!kitchenId) return res.status(400).json({ msg: "Kitchen ID required" });

    const existingMenu = await Menu.findOne({ kitchenId });
    if (existingMenu) return res.status(400).json({ msg: "Menu already exists" });

    const emptyMenu = [
      { kitchenId, day: "Monday", breakfast: "", lunch: "", dinner: "" },
      { kitchenId, day: "Tuesday", breakfast: "", lunch: "", dinner: "" },
      { kitchenId, day: "Wednesday", breakfast: "", lunch: "", dinner: "" },
      { kitchenId, day: "Thursday", breakfast: "", lunch: "", dinner: "" },
      { kitchenId, day: "Friday", breakfast: "", lunch: "", dinner: "" },
      { kitchenId, day: "Saturday", breakfast: "", lunch: "", dinner: "" },
      { kitchenId, day: "Sunday", breakfast: "", lunch: "", dinner: "" }
    ];

    await Menu.insertMany(emptyMenu);
    res.json({ msg: "Empty menu initialized successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

/**
 * 2️⃣ Get Menu for a Specific Kitchen (GET)
 */
router.get("/", async (req, res) => {
  try {
    const kitchenId = req.query.kitchenId;
    if (!kitchenId) return res.status(400).json({ msg: "Kitchen ID required" });

    const menu = await Menu.find({ kitchenId });

    if (!menu) return res.status(404).json({ msg: "Menu not found" });

    res.json(menu);
  } catch (err) {
    console.error("Menu Fetch Error:", err);
    res.status(500).send("Server Error");
  }
});


/**
 * 3️⃣ Update Menu for a Kitchen (PUT)
 */
router.put("/", async (req, res) => {
  try {
    const { kitchenId, menu } = req.body;
    if (!kitchenId) return res.status(400).json({ msg: "Kitchen ID required" });
    if (!menu || !Array.isArray(menu)) return res.status(400).json({ msg: "Invalid menu data" });

    for (const item of menu) {
      await Menu.findOneAndUpdate(
        { kitchenId, day: item.day },
        { ...item, updatedAt: Date.now() },
        { upsert: true, new: true }
      );
    }

    res.json({ msg: "Menu updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
