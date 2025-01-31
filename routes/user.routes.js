const express = require('express');
const {
  createUser,
  loginUser,
  updateAUser,
  deleteUser,
} = require('../controllers/user.controllers');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('welcome, /register to register or /login to login');
});
routes.post('/register', createUser);
routes.post('/login', loginUser);
routes.delete('/user', deleteUser);
routes.put('/user', updateAUser);

module.exports = routes;
