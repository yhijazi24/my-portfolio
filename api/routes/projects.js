const Project = require("../models/Projects");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

const initializeOrder = async () => {
  const projects = await Project.find();
  for (let i = 0; i < projects.length; i++) {
      projects[i].order = i + 1; // Start orders from 1
      await projects[i].save();
  }
  console.log("Order field initialized for all projects");
};

initializeOrder().catch(err => console.error(err));
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

router.put('/updateOrder', verifyTokenAndAdmin, async (req, res) => {
  const updatedProjects = req.body;
  console.log("Received update request:", updatedProjects);
  try {
      for (let project of updatedProjects) {
          console.log("Updating project ID:", project._id, "with order:", project.order);
          await Project.findByIdAndUpdate(project._id, { order: project.order });
      }
      res.status(200).json("Order updated successfully");
  } catch (err) {
      console.error("Error updating order:", err.message);
      res.status(500).json({ message: "Error updating order", error: err.message });
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