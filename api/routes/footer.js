const router = require("express").Router();
const Footer = require("../models/Footer");
const { verifyTokenAndAdmin } = require("./verifyToken");

// Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const footer = await Footer.create(req.body);
    res.status(200).json(footer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Footer.update(req.body, { where: { id: req.params.id } });
    const updated = await Footer.findByPk(req.params.id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all
router.get("/", async (req, res) => {
  try {
    const footers = await Footer.findAll();
    res.status(200).json(footers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
