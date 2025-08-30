const router = require('express').Router();
const { admin_login, user_register, user_login, user_logout, registerUser, verify_email } = require('../controllers/authController');


router.post('/admin-login', admin_login);
// router.post('/user-register', user_register);

router.post('/user-register', user_register);
router.post('/verify-email', verify_email);

router.post('/register', registerUser );

router.post('/user-login', user_login);
router.get('/user-logout', user_logout);

module.exports = router;

