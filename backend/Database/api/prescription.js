const express = require('express');
const bodyParser = require('body-parser');
const prescriptionRouter = express.Router();
const Prescription = require('../Models/Prescription');

prescriptionRouter.post('/getPrescription', async (req, res) => {
	try {
		const { id } = req.body;
		const prescription = await Prescription.findById(id);

		if (!prescription) {
			return res.status(404).json({ message: 'Prescription not found' });
		}

		return res.status(200).json(prescription);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

prescriptionRouter.post('/getPrescriptionsByPatient', async (req, res) => {
	try {
		const { patient } = req.body;
		const prescriptions = await Prescription.find({ patient });

		if (prescriptions.length === 0) {
			return res.status(404).json({ message: 'No prescriptions found' });
		}

		return res.status(200).json(prescriptions);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

prescriptionRouter.post('/getPrescriptionsByDoctor', async (req, res) => {
	try {
		const { doctor } = req.body;
		const prescriptions = await Prescription.find({ doctor });

		if (prescriptions.length === 0) {
			return res.status(404).json({ message: 'No prescriptions found' });
		}

		return res.status(200).json(prescriptions);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

prescriptionRouter.post('/upsertPrescription', async (req, res) => {
	try {
		const prescriptionData = req.body;
		const prescription = await Prescription.findOneAndUpdate({ _id: prescriptionData._id }, prescriptionData, { new: true, upsert: true });

		return res.status(200).json(prescription);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

prescriptionRouter.post('/deletePrescription', async (req, res) => {
	try {
		const { id } = req.body;
		const deletedPrescription = await Prescription.findByIdAndDelete(id);

		if (!deletedPrescription) {
			return res.status(404).json({ message: 'Prescription not found' });
		}

		return res.status(200).json({ message: 'Prescription deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = prescriptionRouter;
