import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { Request, Response } from 'express';
import { AsyncHandler } from '../middleware/AsyncHandler';

export const SendMail = AsyncHandler(async (req: Request, res: Response) => {
	const { name, email, emailSubject, userMsg } = req.body;

	if (!name || !email || !emailSubject || !userMsg) {
		return res.status(400).json({ msg: 'All fields are required' });
	}

	let config = {
		service: 'gmail',
		auth: {
			user: process.env.email,
			pass: process.env.pass,
		},
	};

	let transporter = nodemailer.createTransport(config);

	let MailGenerator = new Mailgen({
		theme: 'default',
		product: {
			name: name,
			link: 'https://nyambogahezron.vercel.app/',
		},
	});

	let response = {
		body: {
			name: 'Hezron Nyamboga',
			intro: `From: ${email} Name: ${name}`,
			outro: userMsg,
		},
	};

	let mailBody = MailGenerator.generate(response);

	let message = {
		from: email,
		to: 'hezronnyamboga6@gmail.com',
		subject: emailSubject,
		html: mailBody,
		inReplyTo: undefined,
		references: undefined,
	};

	const sendMail = await transporter.sendMail(message);

	if (!sendMail) {
		return res.status(500).json({ msg: 'Failed to send email' });
	}

	return res.status(200).json({ msg: 'Email sent successfully' });
});
