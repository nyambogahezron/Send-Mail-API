require('dotenv').config();

const sendMailRoute = require('./routes/sendMailRoute.js')


const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');

app.use(express.json());

// middleware
app.use(notFoundMiddleware);

// routes
app.get('/', (req, res) => {
  res.send('<h1>Email API </h1>');
});
app.use('/api/mail/v1', sendMailRoute)


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
