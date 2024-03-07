const express = require('express');
const router = express.Router();
const Doctor = require('../Models/Doctor');

router.post('/getDoctorsByIds', async (req, res) => {
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

router.post('/getByLocation', async (req, res) => {
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

router.post('/upsertDoctor', async (req, res) => {
	try {
		const doctorData = req.body;
		const doctor = await Doctor.findOneAndUpdate({ _id: doctorData._id }, doctorData, { new: true, upsert: true });

		return res.status(200).json(doctor);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

router.delete('/:id', async (req, res) => {
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

module.exports = router;
