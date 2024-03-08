const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		name: { type: String, required: true, default: '' },
		email: { type: String, required: true },
		password: { type: String, required: true },
		specialisation: { type: String, required: true, default: '' },
		certification: { type: String, required: true, default: '' },
		location: { type: String, required: true, default: '' },
		clinic: { type: String, required: true, default: '' },
		patients: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Patient',
			},
		],
	},
	{ collection: 'doctor' }
);

module.exports = mongoose.model('Doctor', doctorSchema);
