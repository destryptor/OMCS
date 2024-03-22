const nodemailer = require('nodemailer');
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const emailRouter = express.Router();

function authenticateToken(req, res, next) {
	const token = req.headers['authorization'];

	if (!token) {
		return res.status(401).send('Token not provided');
	}

	const tokenParts = token.split(' ');
	const jwtToken = tokenParts[1];

	jwt.verify(jwtToken, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).send('Invalid token');
		}
		req.user = decoded;
		next();
	});
}

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.email',
	port: 587,
	secure: false, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: process.env.EMAIL,
		pass: process.env.APP_PASSWORD,
	},
});

const rejectionMail = (to, receiver_name, sender_name, reason) => {
	const mailOptions = {
		from: process.env.EMAIL,
		to: to,
		subject: 'Consultation Rejection',
		text: `Dear ${receiver_name},\n\nYour consultation with Dr. ${sender_name} has been rejected. \nReason: ${reason}\n\nRegards,\nOMCS`,
		html: `<p>Dear ${receiver_name},</p><br><p>Your consultation with Dr. ${sender_name} has been rejected.</p><p><b>Reason</b>: ${reason}.</p><br><p>Regards,</p><p>OMCS</p>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

const appointmentMail = (to, receiver_name, sender_name, clinic, location, date, time) => {
	const mailOptions = {
		from: process.env.EMAIL,
		to: to,
		subject: 'Appointment Confirmed',
		text: `Dear ${receiver_name},\n\nYour consultation with Dr. ${sender_name} has been confirmed.\nClinic: ${clinic}\nLocation: ${location}\nDate: ${date}\nTime: ${time}\n\nRegards,\nOMCS`,
		html: `<p>Dear ${receiver_name},</p><br><p>Your consultation with Dr. ${sender_name} has been confirmed.</p><p><b>Clinic</b>: ${clinic}</p><p><b>Location</b>: ${location}</p><p><b>Date</b>: ${date}</p><p><b>Time</b>: ${time}</p><br><p>Regards,</p><p>OMCS</p>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

const prescriptionMail = (to, receiver_name, sender_name, prescription) => {
	const mailOptions = {
		from: process.env.EMAIL,
		to: to,
		subject: 'Your Prescription has Arrived!',
		text: `Dear ${receiver_name},\n\nYour prescription from Dr. ${sender_name} is attached below.\n\nPrescription: \n${prescription}\n\nRegards,\nOMCS`,
		html: `<p>Dear ${receiver_name},</p><br><p>Your prescription from Dr. ${sender_name} is attached below.</p><br><p>Prescription: </p><p>${prescription}</p><br><p>Regards,</p><p>OMCS</p>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

const completionMail = (to, from, receiver_name, sender_name) => {
	const mailOptions = {
		from: process.env.EMAIL,
		to: to,
		subject: 'Consultation Completed',
		text: `Dear ${receiver_name},\n\nYour consultation with Dr. ${sender_name} has been completed. Hope you have received the proper treatment. If you have any querries, doubts or problems, please contact Dr. ${sender_name} through their email address: ${from} for the NEXT 7 DAYS.\n\nRegards,\nOMCS`,
		html: `<p>Dear ${receiver_name},</p><br><p>Your consultation with Dr. ${sender_name} has been completed. Hope you have received the proper treatment. If you have any querries, doubts or problems, please contact Dr. ${sender_name} through their email address: ${from} for the <b>NEXT 7 DAYS</b>.</p><br><p>Regards,</p><p>OMCS</p>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

emailRouter.post('/sendMail', authenticateToken, async (req, res) => {
	try {
		const { to, from, context, receiver_name, sender_name, clinic, location, date, time, reason, prescription } = req.body;
		if (context === 'rejection') {
			rejectionMail(to, receiver_name, sender_name, reason);
		}
		if (context === 'appointment') {
			appointmentMail(to, receiver_name, sender_name, clinic, location, date, time);
		}
		if (context === 'prescription') {
			prescriptionMail(to, receiver_name, sender_name, prescription);
		}
		if (context === 'completion') {
			completionMail(to, from, receiver_name, sender_name);
		}
		return res.status(200).json({ message: 'Mail sent' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = emailRouter;
