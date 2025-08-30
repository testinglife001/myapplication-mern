const { user_comment, get_user_comment, comment_reply } = require('../../controllers/home/homeCommentController');
const { auth_user } = require('../../middleware/authMiddleware');

const router = require('express').Router();

router.post('/home/user-comment', auth_user, user_comment );

router.get('/get-home-comment/:articleId', get_user_comment  );

router.post('/reply-comment', auth_user, comment_reply );

module.exports = router;
