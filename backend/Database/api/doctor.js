const express = require('express');
const bodyParser = require('body-parser');
const doctorRouter = express.Router();
const Doctor = require('../Models/Doctor');
const bcrypt = require('bcrypt');

doctorRouter.post('/loginDoctor', async (req, res) => {
	try {
		const { email, password } = req.body;
		const doctor = await Doctor.findOne({ email: email });
		if (!doctor) return res.status(404).send('No account found with this email address. Please sign up!');
		const isPasswordCorrect = await bcrypt.compare(password, doctor.password);
		if (!isPasswordCorrect) return res.status(400).send('Incorrect password');
		return res.json(doctor);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

doctorRouter.post('/getDoctorsByIds', async (req, res) => {
	try {
		const { ids } = req.body;
		const doctors = await Doctor.find({ _id: { $in: ids } });

		if (doctors.length === 0) {
			return res.status(404).json({ message: 'No doctors found' });
		}

		return res.status(200).json(doctors);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

doctorRouter.post('/getByLocation', async (req, res) => {
	try {
		const { location } = req.body;
		const doctors = await Doctor.find({ location });

		if (doctors.length === 0) {
			return res.status(404).json({ message: 'No doctors found' });
		}

		return res.status(200).json(doctors);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

doctorRouter.post('/getByEmail', async (req, res) => {
	try {
		const { email } = req.body;
		const doctor = await Doctor.findOne({ email });
		if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
		res.json(doctor);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

doctorRouter.post('/createDoctor', async (req, res) => {
	try {
		const doctorData = req.body;
		console.log(doctorData);
		const doctor = await Doctor.findOne({ email: doctorData.email });
		if (doctor) return res.status(400).send('Doctor already exists');

		const password = doctorData.password;
		const hashedPassword = await bcrypt.hash(password, 10);

		const newDoctorData = {
			...doctorData,
			password: hashedPassword,
		};

		const newDoctor = new Doctor(newDoctorData);
		await newDoctor.save();

		return res.status(200).json(newDoctor);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

doctorRouter.post('/updateDoctor', async (req, res) => {
	try {
		const doctorData = req.body;
		const doctor = await Doctor.findOneAndUpdate({ _id: doctorData._id }, doctorData, { new: true });

		if (!doctor) {
			return res.status(404).json({ message: 'Doctor not found' });
		}

		return res.status(200).json(doctor);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

doctorRouter.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deletedDoctor = await Doctor.findByIdAndDelete(id);

		if (!deletedDoctor) {
			return res.status(404).json({ message: 'Doctor not found' });
		}

		return res.status(200).json({ message: 'Doctor deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = doctorRouter;
