const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
	{
		name: { type: String, default: '' },
		email: { type: String },
		password: { type: String },
		age: { type: Number, default: '' },
		location: { type: String, default: '' },
		symptoms: { type: String, default: '' },
		doctor: [
			{
				_id: { type: mongoose.Schema.Types.ObjectId, required: true },
				status: { type: String, default: 'Pending' },
			},
		],
	},
	{ collection: 'patient' }
);

module.exports = mongoose.model('Patient', patientSchema);
