const express = require('express');
const {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require('../controllers/post.controllers');
const routes = express.Router();

routes.post('/post', createPost);
routes.get('/post', getAllPost);
routes.get('/posts/:id', getSinglePost);
routes.put('/post/:id', updatePost);

routes.delete('/posts/:id', deletePost);

module.exports = routes;
