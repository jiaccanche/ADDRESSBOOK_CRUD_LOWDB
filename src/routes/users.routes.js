const { Router } = require('express');
const { getUser } = require('../controlers/users.controller');
const router = Router();

router.get('/users/:id',getUser);
router.post('/users/',);
router.put('/users/:id',);
router.delete('/users/:id',);


module.exports = router;