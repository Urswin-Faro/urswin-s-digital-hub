// server.js (Consolidated Backend)

// ----------------------------------------------------
// 1. SETUP AND CONFIGURATION
// ----------------------------------------------------
const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3001; // The single port for all API traffic

// Middleware - Must be near the top!
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json()); 

// --- Environment Variables Destructuring ---
const { 
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET, 
    GOOGLE_REDIRECT_URI, 
    EMAIL_USER, 
    EMAIL_PASS  // Your 16-character App Password
} = process.env;

// --- Google Calendar OAuth Config ---
const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);
let REFRESH_TOKEN = null; 
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// --- Nodemailer Transporter Config ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS, 
    },
});

// Helper function for Google Calendar authentication
async function ensureAuthenticated(req, res, next) {
    if (!REFRESH_TOKEN) {
        return res.status(401).json({ 
            error: 'Authentication required', 
            message: `Please authenticate this server by visiting http://localhost:${PORT}/api/google/auth once.`
        });
    }
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    await oauth2Client.getAccessToken(); 
    next();
}

// ----------------------------------------------------
// 2. OAUTH FLOW 
// ----------------------------------------------------

app.get('/api/google/auth', (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly'];
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline', 
        scope: scopes,
        prompt: 'consent',
    });
    res.redirect(url);
});

app.get('/api/google/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send('Authorization code missing.');
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        if (tokens.refresh_token) {
            REFRESH_TOKEN = tokens.refresh_token;
            console.log('Refresh Token Obtained and Stored:', REFRESH_TOKEN);
        }
        res.redirect(`${process.env.FRONTEND_URL}?auth=success`);
    } catch (error) {
        console.error('Error retrieving tokens:', error);
        res.status(500).send('Authentication failed.');
    }
});


// ----------------------------------------------------
// 3. CONSOLIDATED API ENDPOINTS
// ----------------------------------------------------

// 📧 CONTACT FORM SUBMISSION
app.post('/api/contact', async (req, res) => {
    // Console log to verify the route is being hit from the frontend
    console.log('✅ CONTACT ROUTE HIT. Attempting to process form...');
    
    const { name, email, phone, service, message, preferredDate } = req.body;

    if (!name || !email || !message) {
        // Send a 400 Bad Request if validation fails
        return res.status(400).json({ message: 'Missing required fields: name, email, and message.' });
    }

    const mailOptions = {
        from: EMAIL_USER,
        to: EMAIL_USER, // Sent to your own email address
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

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent from ${email}`);
        return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        // Log the exact Nodemailer error
        console.error('Error sending email:', error.message);
        return res.status(500).json({ 
            message: 'Failed to send email. Check Nodemailer configuration or App Password.', 
            error: error.message 
        });
    }
});


// 📅 CALENDAR AVAILABILITY
app.get('/api/availability', ensureAuthenticated, async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).json({ error: 'Start and end dates are required.' });
    try {
        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: new Date(start).toISOString(),
                timeMax: new Date(end).toISOString(),
                items: [{ id: 'primary' }],
            },
        });
        const busyBlocks = response.data.calendars.primary.busy;
        const busyDates = {};
        busyBlocks.forEach(block => {
            const dateKey = new new Date(block.start).toISOString().split('T')[0];
            busyDates[dateKey] = 'busy';
        });
        res.json(busyDates);
    } catch (error) {
        console.error('Error fetching free/busy data:', error.message);
        res.status(500).json({ error: 'Could not fetch calendar data.' });
    }
});


// 📝 CALENDAR BOOKING
app.post('/api/book-slot', ensureAuthenticated, async (req, res) => {
    const { date, startTime, endTime } = req.body;
    if (!date || !startTime || !endTime) {
        return res.status(400).json({ error: 'Date, start time, and end time are required.' });
    }
    const startDateTime = `${date}T${startTime}:00`;
    const endDateTime = `${date}T${endTime}:00`;
    try {
        const event = {
            summary: 'New Client Booking',
            description: `A new appointment booked via your website. Time: ${startTime} - ${endTime}`,
            start: { dateTime: startDateTime, timeZone: 'Africa/Johannesburg' }, // Use your timezone
            end: { dateTime: endDateTime, timeZone: 'Africa/Johannesburg' }, // Use your timezone
            reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 30 }] },
        };
        const response = await calendar.events.insert({ calendarId: 'primary', resource: event });
        res.status(200).json({ message: 'Booking successful!', eventId: response.data.id, calendarLink: response.data.htmlLink });
    } catch (error) {
        console.error('Error creating calendar event:', error.message);
        res.status(500).json({ error: 'Failed to create event. Slot may be unavailable.' });
    }
});


// ----------------------------------------------------
// 4. START SERVER
// ----------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
    if (!REFRESH_TOKEN) {
        console.log('\n================================================================');
        console.log('🚨 REMINDER: AUTHENTICATION REQUIRED');
        console.log(`Visit http://localhost:${PORT}/api/google/auth once to grant calendar access.`);
        console.log('================================================================\n');
    }
});