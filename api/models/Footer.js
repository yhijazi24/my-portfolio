const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema(
    {
        creator: { type: String, required: true, unique: true },
        resumeLink: { type: String, required: true, unique: true },
        githubLink: { type: String, required: true },
        linkdinLink: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Footer', FooterSchema);
