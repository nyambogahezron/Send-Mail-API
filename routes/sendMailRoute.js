const router = require('express').Router();

const { sendMail } = require('../controllers/sendMail.js')

router.post('/sendmail', sendMail);


module.exports = router;