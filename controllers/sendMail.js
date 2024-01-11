require('dotenv').config();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const sendMail = (req, res) => {

    const { name, email, emailSubject, userMsg } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: process.env.email,
            pass: process.env.pass
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: name,
            link : 'https://nyambogahezron.vercel.app/'
        }
    })

    let response = {
        body: {
            name : "Hezron Nyamboga",
            intro: `From: ${email} Name: ${name}`,
            outro: userMsg,
        }
    }

    let mailBody = MailGenerator.generate(response)

    let message = {
        from : email,
        to : "hezronnyamboga6@gmail.com",
        subject: emailSubject,
        html: mailBody
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "Email send Successful",
            email: email
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

}


module.exports = { sendMail }