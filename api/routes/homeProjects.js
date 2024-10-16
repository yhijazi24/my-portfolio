const Home = require("../models/HomeProjects");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newHome = new Home(req.body);

    try {
        const savedHome = await newHome.save();
        res.status(200).json(savedHome);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Header
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedHome = await Home.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedHome);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL

router.get("/", async (req, res) => { 
    try {
        const homes = await Home.find(); 
        res.status(200).json(homes);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
