const mongoose = require("mongoose");

const HomeHeaderSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        aboutMe: { type: String, required: true },
        Resume: { type: Array, required: true },
        resumeImg: { type: Array, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('HomeHeader', HomeHeaderSchema);
