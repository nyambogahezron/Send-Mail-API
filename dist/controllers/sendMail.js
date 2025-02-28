"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
const AsyncHandler_1 = require("../middleware/AsyncHandler");
exports.SendMail = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        inReplyTo: undefined,
        references: undefined,
    };
    const sendMail = yield transporter.sendMail(message);
    if (!sendMail) {
        return res.status(500).json({ msg: 'Failed to send email' });
    }
    return res.status(200).json({ msg: 'Email sent successfully' });
}));
//# sourceMappingURL=sendMail.js.map