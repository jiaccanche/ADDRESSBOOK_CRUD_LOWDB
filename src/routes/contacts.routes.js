const { Router } = require('express');
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controlers/contacts.controller');
const router = Router();

router.get('/users/:userid/contacts/',getContacts);
router.get('/users/:userid/contacts/:id',getContact);
router.post('/users/:userid/contacts/', createContact);
router.put('/users/:userid/contacts/:id',updateContact);
router.delete('/users/:userid/contacts/:id', deleteContact);


module.exports = router;