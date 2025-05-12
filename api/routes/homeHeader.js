const express = require('express');
const router = express.Router();
const HomeHeader = require('../models/HomeHeader');

// GET all
router.get('/', async (req, res) => {
  try {
    const headers = await HomeHeader.findAll();
    res.status(200).json(headers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const header = await HomeHeader.create(req.body);
    res.status(201).json(header);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await HomeHeader.update(req.body, {
      where: { id: req.params.id },
    });
    if (rowsUpdated > 0) {
      const updated = await HomeHeader.findByPk(req.params.id);
      res.status(200).json(updated);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
