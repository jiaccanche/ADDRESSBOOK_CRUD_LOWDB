const { getConnection } = require("../database")
const { v4 } = require('uuid');

const getContacts = (req,res) => {
  const contacts = getConnection().get('contacts').value();
  res.json(contacts);
}

const getContact = (req,res) => {
  reqid = req.params.id;
  const contacto = getConnection().get('contacts').find({id:reqid}).value();
  res.json(contacto);
}

const createContact = (req,res) => {
  const newContact = {
    id: v4(),
    name: req.body.name,
    celular: req.body.celular,
    telefono: req.body.telefono
  }
  
  getConnection().get('contacts').push(newContact).write();
  res.json(newContact);
}

const updateContact = (req, res) => {
  const contacto = getConnection()
        .get('contacts')
        .find({id:req.params.id})
        .assign(req.body)
        .write();
  res.json(contacto);
}

const deleteContact = (req, res) => {
  const contacto = getConnection()
        .get('contacts')
        .remove({id:req.params.id})
        .write();
  res.json(contacto);
}

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact
}