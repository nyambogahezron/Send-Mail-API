require('dotenv').config();
const express = require('express');
const app = express();


const sendMailRoute = require('./routes/sendMailRoute')
const notFoundMiddleware = require('./middleware/notFound');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', sendMailRoute)

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
