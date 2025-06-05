const express = require('express');
const router = express.Router();
const HomeHeader = require('../models/HomeHeader');

// GET all headers
router.get('/', async (req, res) => {
  try {
    const headers = await HomeHeader.findAll();

    if (!headers || headers.length === 0) {
      return res.status(200).json([]);
    }

    // ✅ FIXED: return the fetched headers directly
    res.status(200).json(headers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new header
router.post('/', async (req, res) => {
  try {
    console.log("Received body:", req.body);
    const header = await HomeHeader.create(req.body);
    res.status(201).json(header);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a header
router.put('/:id', async (req, res) => {
  try {
    const homeHeader = await HomeHeader.findByPk(req.params.id);

    if (!homeHeader) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Only update sent fields
    if (req.body.frenchResumeLink !== undefined) {
      homeHeader.frenchResumeLink = req.body.frenchResumeLink;
    }
    if (req.body.englishResumeLink !== undefined) {
      homeHeader.englishResumeLink = req.body.englishResumeLink;
    }
    if (req.body.aboutMe !== undefined) {
      homeHeader.aboutMe = req.body.aboutMe;
    }
    if (req.body.frenchResumeImg !== undefined) {
      homeHeader.frenchResumeImg = req.body.frenchResumeImg;
    }
    if (req.body.englishResumeImg !== undefined) {
      homeHeader.englishResumeImg = req.body.englishResumeImg;
    }
    if (req.body.title !== undefined) {
      homeHeader.title = req.body.title;
    }

    await homeHeader.save();
    res.status(200).json(homeHeader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
