const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		name: { type: String, required: true, default: '' },
		email: { type: String, required: true },
		password: { type: String, required: true },
		age: { type: Number, required: true, default: '' },
		location: { type: String, required: true, default: '' },
		symptoms: { type: String, required: true, default: '' },
		doctor: [
			{
				_id: mongoose.Schema.Types.ObjectId,
				status: { type: String, required: true, default: 'Pending' },
			},
		],
	},
	{ collection: 'patient' }
);

module.exports = mongoose.model('Patient', patientSchema);
