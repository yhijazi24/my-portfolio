const router = require("express").Router();
const Project = require("../models/Projects");
const { verifyTokenAndAdmin } = require("./verifyToken");

// Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Project.update(req.body, { where: { id: req.params.id } });
    const updated = await Project.findByPk(req.params.id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update order
router.put("/updateOrder", verifyTokenAndAdmin, async (req, res) => {
  try {
    for (const proj of req.body) {
      await Project.update({ order: proj.order }, { where: { id: proj.id } });
    }
    res.status(200).json("Order updated successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    res.status(200).json("Project has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get by title
router.get("/find/:title", async (req, res) => {
  try {
    const project = await Project.findOne({ where: { title: req.params.title } });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all (with filters)
router.get("/", async (req, res) => {
  try {
    let projects = await Project.findAll({ order: [["order", "ASC"]] });
    if (req.query.new === "true") {
      projects = [projects.at(-1)];
    }
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
