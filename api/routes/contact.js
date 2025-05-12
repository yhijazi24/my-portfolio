const router = require("express").Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
const { verifyTokenAndAdmin } = require("./verifyToken");

router.post("/", async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  try {
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Contact.create({ firstName, lastName, email, subject, message });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: "yahyahijazi643@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form", error: error.message });
  }
});

router.get("/submissions", verifyTokenAndAdmin, async (req, res) => {
  try {
    const submissions = await Contact.findAll();
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching submissions", error: err.message });
  }
});

module.exports = router;
