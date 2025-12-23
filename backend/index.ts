// contact-backend/index.ts

import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import cors from 'cors'; // Required to allow your React app to talk to the server

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5000; // Choose a port that is NOT your React app's port (usually 3000)

// Middleware setup
app.use(cors()); // Allow requests from your React frontend
app.use(express.json()); // Parses incoming JSON requests

console.log("DEBUG: EMAIL_USER:", process.env.EMAIL_USER);
console.log("DEBUG: EMAIL_PASS (length):", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);
// If the length is not 16, there is an error in your .env file!

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
});

// 2. Define the Contact Form API Endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
    // Data comes from your React form's formData state
    const { name, email, phone, service, message, preferredDate } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields: name, email, and message.' });
    }

    // 3. Construct the Email Content (sent TO Urswinf@gmail.com)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // <-- This is where the email is sent (Your Gmail)
        subject: `New Contact Form Submission: ${service || 'General Inquiry'}`,
        html: `
            <h3>Contact Details</h3>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
                <li><strong>Service:</strong> ${service || 'General Inquiry'}</li>
                <li><strong>Preferred Date:</strong> ${preferredDate || 'N/A'}</li>
            </ul>
            <h3>Message</h3>
            <p>${message}</p>
        `,
    };

    // 4. Send the Email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent from ${email}`);
        return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send email.', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});