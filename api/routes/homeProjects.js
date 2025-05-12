const router = require("express").Router();
const HomeProject = require("../models/HomeProjects");
const { verifyTokenAndAdmin } = require("./verifyToken");

// Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const home = await HomeProject.create(req.body);
    res.status(200).json(home);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await HomeProject.update(req.body, { where: { id: req.params.id } });
    const updated = await HomeProject.findByPk(req.params.id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all
router.get("/", async (req, res) => {
  try {
    const homes = await HomeProject.findAll();
    res.status(200).json(homes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
