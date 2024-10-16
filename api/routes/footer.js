const Footer = require("../models/Footer");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newFooter = new Footer(req.body);

    try {
        const savedFooter = await newFooter.save();
        res.status(200).json(savedFooter);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Header
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedFooter = await Footer.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedFooter);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL

router.get("/", async (req, res) => {  // New route for getting all headers
    try {
        const footer = await Footer.find(); // Fetch all headers from the database
        res.status(200).json(footer);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;