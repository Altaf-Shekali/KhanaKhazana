import express from 'express';
import auth from '../middleware/auth.js';
import Menu from '../models/Menu.js';

const router = express.Router();

// Get menu for kitchen
router.get('/', auth, async (req, res) => {
  try {
    if (!req.kitchen) return res.status(400).json({ msg: 'Kitchen ID required' });

    const menu = await Menu.find({ kitchenId: req.kitchen.id }).sort('day');
    res.json(menu);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update menu
router.put('/', auth, async (req, res) => {
  try {
    if (!req.kitchen) return res.status(400).json({ msg: 'Kitchen ID required' });

    const { menu } = req.body;
    if (!menu || !Array.isArray(menu)) return res.status(400).json({ msg: 'Invalid menu data' });

    // Delete existing menu
    await Menu.deleteMany({ kitchenId: req.kitchen.id });

    // Insert new menu items
    const newMenu = menu.map(item => ({
      ...item,
      kitchenId: req.kitchen.id,
      updatedAt: Date.now()
    }));

    await Menu.insertMany(newMenu);
    res.json({ msg: 'Menu updated successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
