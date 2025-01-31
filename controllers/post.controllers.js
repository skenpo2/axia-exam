const express = require('express');
const Post = require('../models/post.model');

const router = express.Router();

// Create a post

const createPost = async (req, res) => {
  const { title, body, image } = req.body;

  // Ensure a post has at least a title and body
  if (!title || !body) {
    return res
      .status(400)
      .json({ message: 'Please provide both title and body' });
  }

  try {
    // cookie access
    const { id: creatorId } = req.cookies;

    const newPost = new Post({
      title,
      body,
      image: image || 'no image',
      creatorId,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
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
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'error occur' });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    // cookie access
    const { id: creatorId } = req.cookies;
    const { id: postId, ...body } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.creatorId.toString() !== creatorId) {
      return res.status(403).json({ message: 'not allowed' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'error occur' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    // cookie access
    const { id: creatorId } = req.cookies;
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.creatorId.toString() !== creatorId) {
      return res.status(403).json({ message: 'not allowed' });
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted successfully' });
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
