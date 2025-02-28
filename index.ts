import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';

const app = express();

import sendMailRoute from './routes/sendMailRoute';
import notFoundMiddleware from './middleware/notFound';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
	origin: process.env.CORS_ORIGIN,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// routes
app.use('/api', sendMailRoute);

app.get('/', (req, res) => {
	res.send('Server is running...');
});

// middleware
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
