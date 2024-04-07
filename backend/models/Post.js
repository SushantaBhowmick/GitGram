const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
}, { timestamps: true });

// Define the Comment model
const Comment = mongoose.model('Comment', commentSchema);

// Define the Post model with populated comments
postSchema.pre('find', async function (next) {
  this.populate('comments');
  next();
});

postSchema.pre('findOne', async function (next) {
  this.populate('comments');
  next();
});

// Define the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = { Post, Comment };
