const { Router } = require('express');
const { signup, login } = require('../controlers/auth.controller');
const { validateUsers } = require('../middleware/user.validation');
const router = Router();

router.post('/auth/signup', validateUsers('signup') ,signup);
router.post('/auth/login', validateUsers('login') , login)
module.exports = router;