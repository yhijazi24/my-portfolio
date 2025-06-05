const express = require('express');
const router = express.Router();
const HomeHeader = require('../models/HomeHeader');

router.get('/', async (req, res) => {
  try {
    const headers = await HomeHeader.findAll();

    const parsedHeaders = headers.map(header => {
      const raw = header.get({ plain: true });
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
    const homeHeader = await HomeHeader.findByPk(req.params.id);

    if (!homeHeader) {
      return res.status(404).json({ error: 'Not found' });
    }

    // 👇 Only update fields that are explicitly sent in req.body
    if (req.body.frenchResumeLink !== undefined) {
      homeHeader.frenchResumeLink = req.body.frenchResumeLink;
    }

    if (req.body.englishResumeLink !== undefined) {
      homeHeader.englishResumeLink = req.body.englishResumeLink;
    }

    if (req.body.aboutMe !== undefined) {
      homeHeader.aboutMe = req.body.aboutMe;
    }
    // Save the updated model
    await homeHeader.save();

    res.status(200).json(homeHeader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
