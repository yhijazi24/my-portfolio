const mongoose = require("mongoose");

const ProjectsSchema = new mongoose.Schema(
    {
        img: { type: Array, required: true },
        title: { type: String, required: true, unique: true },
        lang: { type: Array, required: true},
        desc: { type: String, required: true },
        fullDesc: { type: String, required: true },
        webLink: { type: String},
        githubLink: { type: String},
        order: { type: Number, required: true, default: 0 } 
    },
    { timestamps: true }
);

module.exports = mongoose.model('Projects', ProjectsSchema);
