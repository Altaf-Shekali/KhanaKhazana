import express from "express";
import { signup, login, getUserById } from "../controller/user.controller.js";
import User from "../model/user.model.js";

const router = express.Router();

// Plan mapping
const PLAN_COUNTS = {
    basic: 30,
    silver: 35,
    gold: 40
};

// ✅ Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/user/:id",getUserById);
// ✅ Update remaining meals after QR scan
router.post("/updateuses", async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        if (!user.plan) {
            return res.status(400).json({ message: "No active plan found. Please subscribe first." });
        }

        if (user.remainingUses > 0) {
            user.remainingUses -= 1;
            await user.save();
            return res.status(200).json({
                message: `Meal counted successfully. Remaining Meals: ${user.remainingUses}`,
                remainingUses: user.remainingUses
            });
        } else {
            return res.status(400).json({ message: "No remaining meals! Please renew your plan." });
        }
    } catch (error) {
        console.error("Error updating uses:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Assign meal count when subscribing to a plan
router.post("/updateplan", async (req, res) => {
    const { userId, plan } = req.body;

    if (!PLAN_COUNTS[plan]) {
        return res.status(400).json({ message: "Invalid plan selected." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        user.plan = plan;
        user.remainingUses = PLAN_COUNTS[plan];
        await user.save();

        res.status(200).json({
            message: `Plan updated successfully. Remaining Meals: ${user.remainingUses}`,
            remainingUses: user.remainingUses
        });
    } catch (error) {
        console.error("Error updating plan:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;