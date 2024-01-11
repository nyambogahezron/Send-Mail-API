const router = require('express').Router();

const { signup, getbill } = require('../controllers/sendMail.js')


/** HTTP Reqeust */
router.post('/user/signup', signup);
router.post('/product/getbill', getbill);


module.exports = router;