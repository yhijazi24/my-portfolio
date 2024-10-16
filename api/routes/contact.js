const nodemailer = require('nodemailer');
const Contact = require("../models/Contact");
const { verifyTokenAndAdmin } = require('./verifyToken');
const router = require("express").Router();

router.post('/', async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, subject, message } = req.body;

    try {
        if (!firstName || !lastName || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newContact = new Contact({
            firstName,
            lastName,
            email,
            subject,
            message,
        });
        await newContact.save(); 
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'yahyahijazi643@gmail.com',
            subject: 'New Contact Form Submission',
            text: `Name: ${lastName} ${firstName}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ message: 'Error submitting form', error: error.message });
    }
});

// Get all contact submissions
router.get('/submissions', verifyTokenAndAdmin, async (req, res) => {
    try {
        const submissions = await Contact.find();
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions', error: error.message });
    }
});


module.exports = router;
 