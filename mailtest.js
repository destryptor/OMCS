const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.email',
	port: 587,
	secure: false, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: process.env.EMAIL,
		pass: process.env.APP_PASSWORD,
	},
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: process.env.EMAIL,
		to: 'chakraborty.sharanya03@gmail.com', // list of receivers
		subject: 'Hello ✔', // Subject line
		text: 'Hello world?', // plain text body
		html: '<b>Hello world?</b>', // html body
	});

	console.log('Message sent: %s', info.messageId);
}

main().catch(console.error);
