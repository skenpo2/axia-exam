const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.routes');
const postRoute = require('./routes/post.routes');
const app = express();
const cookieParser = require('cookie-parser');

// using json middleware
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());

// define port
const PORT = 5000;

// Atlas Server URL
const dbURL =
  'mongodb+srv://michealobarewon2015:effdE9qPm08Hbe0h@bmicheal.hkpl7.mongodb.net/userapi?retryWrites=true&w=majority&appName=Bmicheal';

// connecting to MongoDb Atlas Database Server
mongoose
  .connect(dbURL)
  .then(() => {
    console.log('Connected to Database Successfully');
  })
  .catch(() => {
    console.log('Sorry, Cannot Establish Database Connection');
  });

// user endpoints routes
app.use(userRoute);
app.use(postRoute);

app.listen(PORT, () => {
  console.log(`App is Connected  at Port ${PORT}`);
});
