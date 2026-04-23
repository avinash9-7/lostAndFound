const express = require('express');
const Item = require('../models/Item');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Add Item
router.post('/', auth, async (req, res) => {
  const item = new Item({ ...req.body, user: req.user.id });
  await item.save();
  res.json(item);
});

// Get All
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Get by ID
router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// Update
router.put('/:id', auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "Unauthorized" });

  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "Unauthorized" });

  await item.deleteOne();
  res.json({ msg: "Deleted" });
});

// Search
router.get('/search/name', async (req, res) => {
  const { name } = req.query;
  const items = await Item.find({
    itemName: { $regex: name, $options: 'i' }
  });
  res.json(items);
});

module.exports = router;