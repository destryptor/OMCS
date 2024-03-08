const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
	{
		name: { type: String, default: '' },
		email: { type: String },
		password: { type: String },
		specialisation: { type: String, default: '' },
		certification: { type: String, default: '' },
		location: { type: String, default: '' },
		clinic: { type: String, default: '' },
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
