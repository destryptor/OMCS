const express = require('express');
const bodyParser = require('body-parser');
const patientRouter = express.Router();
const Patient = require('../Models/Patient');

patientRouter.post('/loginPatient', async (req, res) => {
	try {
		const { email, password } = req.body;
		const patient = await Patient.findOne({ email: email, password: password });
		if (!patient) return res.status(404).send('Incorrect email/ password');
		res.json(patient);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

patientRouter.post('/getPatientsByIds', async (req, res) => {
	try {
		const { ids } = req.body;
		const patients = await Patient.find({ _id: { $in: ids } });

		if (patients.length === 0) {
			return res.status(404).json({ message: 'No patients found' });
		}

		return res.status(200).json(patients);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

patientRouter.post('/getByStatus', async (req, res) => {
	try {
		const { status } = req.body;
		const patients = await Patient.find({ status });

		if (patients.length === 0) {
			return res.status(404).json({ message: 'No patients found' });
		}

		return res.status(200).json(patients);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

patientRouter.post('/createPatient', async (req, res) => {
	try {
		const patientData = req.body;
		const patient = await Patient.findOne({ email: patientData.email });
		if (patient) return res.status(400).send('Email already in use!');

		const newPatient = new Patient(patientData);
		await newPatient.save();

		return res.status(200).json(newPatient);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

patientRouter.post('/updatePatient', async (req, res) => {
	try {
		const patientData = req.body;
		const patient = await Patient.findOneAndUpdate({ _id: patientData._id }, patientData, { new: true });

		if (!patient) {
			return res.status(404).json({ message: 'Patient not found' });
		}
		return res.status(200).json(patient);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

patientRouter.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deletedPatient = await Patient.findByIdAndDelete(id);

		if (!deletedPatient) {
			return res.status(404).json({ message: 'Patient not found' });
		}

		return res.status(200).json({ message: 'Patient deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = patientRouter;
