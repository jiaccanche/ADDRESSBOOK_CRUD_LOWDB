const { Router } = require('express');
const { signup, login } = require('../controlers/auth.controller');
const router = Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login)
module.exports = router;