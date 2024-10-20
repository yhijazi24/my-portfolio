const mongoose = require("mongoose");

const ProjectsSchema = new mongoose.Schema(
    {
        img: { type: Array, required: true },
        title: { type: String, required: true, unique: true },
        lang: { type: Array, required: true},
        desc: { type: String, required: true },
        fullDesc: { type: String, required: true },
        webLink: { type: String, required: true },
        githubLink: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Projects', ProjectsSchema);
