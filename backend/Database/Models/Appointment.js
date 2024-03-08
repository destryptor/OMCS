const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
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
		date: { type: Date, required: true },
		time: { type: String, required: true },
	},
	{ collection: 'appointment' }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
