const Header = require("../models/HomeHeader");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newHeader = new Header(req.body);

    try {
        const savedHeader = await newHeader.save();
        res.status(200).json(savedHeader);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Header
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedHeader = await Header.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedHeader);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL

router.get("/", async (req, res) => {  // New route for getting all headers
    try {
        const headers = await Header.find(); // Fetch all headers from the database
        res.status(200).json(headers);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
