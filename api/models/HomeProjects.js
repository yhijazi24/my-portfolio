const mongoose = require("mongoose");

const HomeProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true},
        subTitle: { type: String, required: true},
        img: { type: Array, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('HomeProjects', HomeProjectSchema);
