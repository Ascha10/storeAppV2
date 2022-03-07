const express = require('express');
const router = express.Router();
const {signupPost,loginPost,logout} = require('../../Controllers/authController');


router.post('/signup', signupPost);
router.post('/login', loginPost);
router.get('/logout/:id',logout);

module.exports = router;