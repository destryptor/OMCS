const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		specialisation: { type: String, required: true },
		certification: { type: String, required: true },
		location: { type: String, required: true },
		clinic: { type: String, required: true },
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
