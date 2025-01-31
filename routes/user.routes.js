const express = require('express');
const {
  createUser,
  loginUser,
  deleteUser,
} = require('../controllers/user.controllers');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('welcome, /register to register or /login to login');
});
routes.post('/register', createUser);
routes.post('/login', loginUser);
routes.delete('/user', deleteUser);

module.exports = routes;
