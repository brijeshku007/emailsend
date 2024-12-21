// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON requests

const PORT = process.env.PORT || 5000;

// Nodemailer transporter setup (use your email provider's SMTP settings)
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.USER, // Your email address
    pass: process.env.PASS, // Your email password
  },
});

// POST route to handle form submission
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  // Define email options
  const mailOptions = {
    from: email,
    to: process.env.USER, // Your email address to receive the message
    subject: `New message from ${name}`,
    text: message,
    html: `<p>You have a new message from <strong>${name}</strong> (${email})</p><p>${message}</p>`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Failed to send email", error });
    }
    res.status(200).json({ message: "Email sent successfully", info });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("kise ha bhai");
});
