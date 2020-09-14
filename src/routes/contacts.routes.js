const { Router } = require('express');
const { authenticateToken } = require('../controlers/auth.controller');
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controlers/contacts.controller');
const { validateContacts } = require('../middleware/contacts.validation');
const router = Router();

router.get('/contacts/', authenticateToken, getContacts);
router.get('/contacts/:id', validateContacts('getContact'),authenticateToken, getContact);
router.post('/contacts/', validateContacts('createContact'), authenticateToken, createContact);
router.put('/contacts/:id', validateContacts('updateContact'),authenticateToken ,updateContact);
router.delete('/contacts/:id', validateContacts('deleteContact'), authenticateToken,deleteContact);


module.exports = router;