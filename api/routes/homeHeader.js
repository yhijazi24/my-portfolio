const express = require('express');
const router = express.Router();
const HomeHeader = require('../models/HomeHeader');

router.get('/', async (req, res) => {
  try {
    const headers = await HomeHeader.findAll();

    const parsedHeaders = headers.map(header => {
      const raw = header.get({ plain: true });
      // Force resumeImg to parse as array
      if (typeof raw.resumeImg === 'string') {
        try {
          raw.resumeImg = JSON.parse(raw.resumeImg);
        } catch {
          raw.resumeImg = [];
        }
      }
      return raw;
    });

    res.status(200).json(parsedHeaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    console.log("Received body:", req.body); // 👈 add this
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
