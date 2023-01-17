const express = require('express');
const cors = require('cors');

const app = express();
const dotenv = require('dotenv');
const loadash = require('lodash');
const connectDB = require('./config/db');
const morgan = require('morgan');

//load config
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 3000;
connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//midd;ewares
app.use(cors());
app.use(express.json());

//health check
app.get('/', (req, res) => {
  res.status(200).send('sucess!!')
})

//routes
app.use('/v1/user', require('./src/componenets/routes/users.routes'));

//api not found! handle 404
app.use(function (req, res, next) {
  res.status(404);

  return res.status(404).json({
    status: 404,
    message: 'API NOT FOUND! Please check the endpoint and the HTTP request type! or contact at yodraj dendukuri',
    data: {
      url: req.url
    }
  })
})

app.listen(PORT, () => {
  console.log("server Listening on port", PORT);
})