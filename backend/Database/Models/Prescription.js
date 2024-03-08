const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
	{
		patient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Patient',
			required: true,
		},
		doctor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Doctor',
			required: true,
		},
		content: { type: String, required: true, default: '' },
	},
	{ collection: 'prescription' }
);

module.exports = mongoose.model('Prescription', prescriptionSchema);
