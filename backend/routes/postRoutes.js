const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const uploadMiddleWare = require('../utils/multer');
const { createPost, addComment, addReply, deletePost, getAllPosts } = require('../controllers/postCtrl');
const router = express.Router();

router.route('/create').post(isAuthenticated,uploadMiddleWare.single('file'),createPost)
router.route('/:postId/comment').put(isAuthenticated,addComment)
router.route('/:commentId/reply').put(isAuthenticated,addReply)
router.route('/all').get(isAuthenticated,getAllPosts)
router.route('/delete/:id').delete(isAuthenticated,deletePost)

module.exports = router;