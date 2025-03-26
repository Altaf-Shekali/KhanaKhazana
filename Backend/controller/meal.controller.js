import User from '../models/user.model.js';
import MealLog from '../models/meallog.model.js';

export const useMeal = async (req, res) => {
  try {
    const { qrData } = req.body;
    const parsedData = JSON.parse(qrData);

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.remainingUses <= 0) {
      return res.status(400).json({ message: "No remaining meals" });
    }

    // Update user
    user.remainingUses -= 1;
    user.recentKitchens = [
      parsedData.kitchenId,
      ...user.recentKitchens.filter(k => k.toString() !== parsedData.kitchenId)
    ].slice(0, 3);

    await user.save();

    // Create meal log
    const mealLog = new MealLog({
      user: user._id,
      kitchen: parsedData.kitchenId
    });
    await mealLog.save();

    res.json({
      remainingUses: user.remainingUses,
      recentKitchens: user.recentKitchens
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};