const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  caption: {
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
     ln:{
       type:Number,
       default:0
     },
     user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
     },
   }
   ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    }
  ],
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  text: {
    type: String,
    required: true,
  },
  likes: [  
   { 
    ln:{
      type:Number,
      default:0
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }
  ],
  parentComment:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    },
  ],
}, { timestamps: true });


// Define the Comment model
const Comment = mongoose.model('Comment', commentSchema);


// Define the Post model with populated comments
postSchema.pre('find', async function (next) {
  this.populate({
      path: 'comments',
      populate: {
          path: 'replies',
          populate: {
              path: 'replies', 
              populate: {
                path: 'replies',
                populate: {
                  path: 'replies',
                  populate: {
                    path: 'replies',
                  }
                }
              }
          }
      }
  });
  next();
});

postSchema.pre('find', async function (next) {
  this.populate('user'); // Populate the 'user' field before finding posts
  next();
});


postSchema.pre('findOne', async function (next) {
  this.populate({
      path: 'comments',
      populate: {
          path: 'replies',
          populate: {
              path: 'replies', 
              populate: {
                path: 'replies',
                populate: {
                  path: 'replies',
                  populate: {
                    path: 'replies',
                  }
                }
              }
          }
      }
  });
  next();
});



// Define the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = { Post, Comment };
