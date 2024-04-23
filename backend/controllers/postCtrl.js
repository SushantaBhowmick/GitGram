const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Post, Comment } = require("../models/Post");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const mongoose = require("mongoose");

const deepPopulate = require("mongoose-deep-populate")(mongoose);

// s3 upload
const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.createPost = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log(req.file)
    const image = req.file.location;
    // const video = req.file.location;

    const userId = req.user.id;
    const newPostData = {
      caption: req.body.caption,
      image: image,
      user: userId,
    };
    const post = await Post.create(newPostData);
    const user = await User.findById(userId);

    user.posts.unshift(post._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Post created",
      post,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.addComment = catchAsyncErrors(async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return next(new ErrorHandler("Post not found!", 404));
    }

    const comment = new Comment({
      user: req.user.id,
      post: postId,
      text: text,
    });

    await comment.save();
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully!",
      comment,
      post,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.addReply = catchAsyncErrors(async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ErrorHandler("comment not found!", 404));
    }

    const reply = new Comment({
      user: req.user.id,
      text: text,
      post: comment.post,
      parentComment: commentId,
    });

    await reply.save();

    comment.replies.push(reply._id);
    await comment.save();

    res.status(201).json({
      success: true,
      message: "Reply added successfully!",
      comment,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// exports.getAllPosts=catchAsyncErrors(async(req,res,next)=>{
//     try {

//         const posts = await Post.find().populate('comments').lean()

//     res.status(200).json({
//         success:true,
//         posts
//     })
//     } catch (error) {

//         console.log(error)
//         return next(new ErrorHandler(error.message, 500));
//     }
// })

// exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
//     try {
//       const posts = await Post.find().populate('comments');

//       // Function to build comment tree (assuming it's in a separate file)
//       function buildCommentTree(comments) {
//         if (!comments || !comments.length) {
//           return []; // Return empty array if no comments
//         }

//         const commentTree = [];
//         for (const comment of comments) {
//             console.log(comment.replies)
//           const nestedComments = buildCommentTree(comment.replies); // Recursive call for replies
//           commentTree.push({ ...comment._doc, replies: nestedComments }); // Spread operator to avoid modifying original comment object
//         }
//         return commentTree;
//       }

//       const postsWithNestedComments = posts.map(post => ({
//         ...post._doc,
//         comments: buildCommentTree(post.comments)
//       }));

//       res.status(200).json({
//         success: true,
//         posts: postsWithNestedComments
//       });
//     } catch (error) {
//       console.error(error); // Log the error for debugging
//       return next(new ErrorHandler(error.message, 500)); // Pass the error to the error handler
//     }
//   });

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("comments").populate("user");

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getAPost = async (req, res) => {
  try {
    const singlePost = await Post.findById({ _id: req.params.id })
      .populate("comments")
      .populate("user");

    res.status(200).json({ success: true, singlePost });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new ErrorHandler("post not found!", 404));
    }
    if (post.user.toString() !== req.user.id.toString()) {
      return next(new ErrorHandler("Unathorized", 401));
    }
    const key = post.image.split("/").pop();
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };
    await s3.send(new DeleteObjectCommand(params));
    await Comment.deleteMany({ post: req.params.id });
    await post.deleteOne();

    const user = await User.findById(req.user.id);
    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    // await user.save();
    res.status(200).json({
      success: true,
      message: "Post deleted!",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
});

// likes a post
exports.likeOrUnlikePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new ErrorHandler("Post not found!", 404));
    }

    if (post.likes.includes(userId)) {
      const index = post.likes.indexOf(userId);
      post.likes.splice(index, 1);
      await post.save();

      res.status(200).json({ success: true, message: "Post Unliked" });
    } else {
      post.likes.push(userId);
      await post.save();

      res.status(200).json({ success: true, message: "Post liked" });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
