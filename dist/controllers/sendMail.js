"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
function SendMail(req, res) {
    const { name, email, emailSubject, userMsg } = req.body;
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.pass,
        },
    };
    let transporter = nodemailer_1.default.createTransport(config);
    let MailGenerator = new mailgen_1.default({
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
    };
    transporter
        .sendMail(message)
        .then(() => {
        res.status(201).json({
            msg: 'Email send Successful',
            email: email,
        });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
}
//# sourceMappingURL=sendMail.js.map