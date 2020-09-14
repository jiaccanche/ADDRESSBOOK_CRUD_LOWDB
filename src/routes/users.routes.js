const { Router } = require('express');
const { authenticateToken } = require('../controlers/auth.controller');
const { getUser, updateUser } = require('../controlers/users.controller');
const { validateUsers } = require('../middleware/user.validation');
const router = Router();

router.get('/user/', authenticateToken, getUser);
router.put('/users/', validateUsers('updateUser') ,authenticateToken, updateUser);
router.delete('/users/:id',);


module.exports = router;