const Project = require("../models/Projects");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//Create

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProject = new Project(req.body)

    try {
        const savedProject = await newProject.save();
        res.status(200).json(savedProject);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put('/updateOrder', async (req, res) => {
  const updatedProjects = req.body;
  try {
      // Loop through all the updated projects and save the new order
      for (let project of updatedProjects) {
          await Project.findByIdAndUpdate(project._id, { order: project.order });
      }
      res.status(200).json("Order updated successfully");
  } catch (err) {
      res.status(500).json(err);
  }
});

//Delete

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try { 
        await Project.findByIdAndDelete(req.params.id)
        res.status(200).json("Project has been deleted...")
    } catch (err) {
        res.status(500).json(err);
    }
}) 

//Get Product by title

router.get("/find/:title", async (req, res) => {
  try {
      const project = await Project.findOne({ title: req.params.title });
      if (!project) {
          return res.status(404).json("Project not found");
      }
      res.status(200).json(project);
  } catch (err) {
      res.status(500).json(err);
  }
});


//Get by ID
router.get("/:id", async (req, res) => {
  try {
      const project = await Project.findById(req.params.id);
      res.status(200).json(project);
  } catch (err) {
      res.status(500).json(err);
  }
})


 
// Get Products By Type
router.get("/:lang", async (req, res) => {
  try {
    const projects = await Project.find({ type: req.params.type });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err); 
  }
});

//Get All Products

router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.lang;
    try {
      let projects;
  
      if (qNew) {
        projects = await Project.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        projects = await Project.find({
          type: {
            $in: [qCategory],
          },
        });
      } else {
        projects = await Project.find();
      }
  
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router