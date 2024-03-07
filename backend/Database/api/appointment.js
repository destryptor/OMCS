const express = require('express');
const router = express.Router();
const Appointment = require('../Models/Appointment');

router.post('/getAppointment', async (req, res) => {
	try {
		const { id } = req.body;
		const appointment = await Appointment.findById(id);

		if (!appointment) {
			return res.status(404).json({ message: 'Appointment not found' });
		}

		return res.status(200).json(appointment);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

router.post('/getAppointmentsByPatient', async (req, res) => {
	try {
		const { patient } = req.body;
		const appointments = await Appointment.find({ patient });

		if (appointments.length === 0) {
			return res.status(404).json({ message: 'No appointments found' });
		}

		return res.status(200).json(appointments);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

router.post('/getAppointmentsByDoctor', async (req, res) => {
	try {
		const { doctor } = req.body;
		const appointments = await Appointment.find({ doctor });

		if (appointments.length === 0) {
			return res.status(404).json({ message: 'No appointments found' });
		}

		return res.status(200).json(appointments);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

router.post('/upsertAppointment', async (req, res) => {
	try {
		const appointmentData = req.body;
		const appointment = await Appointment.findOneAndUpdate({ _id: appointmentData._id }, appointmentData, { new: true, upsert: true });

		return res.status(200).json(appointment);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

router.post('deleteAppointment', async (req, res) => {
	try {
		const { id } = req.body;
		const appointment = await Appointment.findByIdAndDelete(id);

		if (!appointment) {
			return res.status(404).json({ message: 'Appointment not found' });
		}

		return res.status(200).json(appointment);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = router;
