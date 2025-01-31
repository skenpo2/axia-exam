const express = require('express');
const Post = require('../models/post.model');

const router = express.Router();

// Create a post

const createPost = async (req, res) => {
  try {
    const { title, body, image } = req.body;
    const { id: creatorId } = req.cookie;
    const newPost = new Post({ title, body, image, creatorId });
    await newPost.save();
    res.status(201).json({ message: 'post created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'error occur' });
  }
};

// Get all posts

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'error occur' });
  }
};

// Get a single post by Id
const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'error occur' });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { post } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { ...post },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'error occur' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'error occur' });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
};
