import express from 'express';
import { SendMail } from '../controllers/sendMail';

const router = express.Router();

router.post('/sendmail', SendMail);

export default router;
