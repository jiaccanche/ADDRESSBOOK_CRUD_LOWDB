const { getConnection } = require("../database")
const { v4 } = require('uuid');
const { validationResult } = require('express-validator');

const getContacts = (req,res) => {
  const contacts = getConnection().get('contacts').find({id_user: req.user.id}).value();
  res.json(contacts.list);
}

const getContact = (req,res) => {
  reqid = req.params.id;
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const contacts = getConnection().get('contacts').find({id_user: req.user.id}).value();
  const contact = contacts.list.find((contact)=> contact.id === reqid );
  if(!contact){
   res.status(404).json({ message: "No encontrado" });
   return; 
  }
  res.json(contact);
}

const createContact = (req,res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const newContact = {
    id: v4(),
    name: req.body.name,
    celular: req.body.celular,
    telefono: req.body.telefono
  }
  const listContacts = getConnection().get('contacts').find({id_user: req.user.id}).value();
  if(listContacts) 
  {
    const newlist = listContacts.list;
    newlist.push(newContact);
    getConnection()
    .get('contacts')
    .find({id_user: req.user.id})
    .assign({list: newlist })
    .write()
    .then((err,value)=> {
      res.status(200).json({ message: "El contacto se ha agregado." });
    });
 
  }
  else {
    getConnection()
    .get('contacts')
    .push({ id_user: req.user.id, list:[ newContact ] })
    .write().then((err, value)=>{
      res.status(200).json({ message: "El contacto se ha agregado." });
    });
  }  
}

const updateContact = (req, res) => {

  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  
  const contacts = getConnection().get('contacts').find({id_user: req.user.id}).value();
  if(!contacts) {
    res.status(404).json({ message: "No existen contactos." });
    return;
  }
  const index = contacts.list.findIndex((contact => contact.id === req.params.id ));
  if( index > 0 ) {
    res.status(404).json({ message: "El contacto no se ha encontrado."  }); 
    return;
  }
  
  contacts.list[index].name = req.body.name;
  contacts.list[index].celular = req.body.celular;
  contacts.list[index].telefono = req.body.telefono;
  
  getConnection()
        .get('contacts')
        .find({user_id:req.user.id})
        .assign({ list: contacts.list })
        .write();
  
  res.status(200).json({ message:"Elemento actualizado." });
}

const deleteContact = (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  
  const contacts = getConnection()
        .get('contacts')
        .find({ id_user: req.user.id }).value();
  
  const countContacts = contacts.list.length;

  for( var i = 0; i < contacts.list.length; i++){ 
    if ( contacts.list[i].id === req.params.id ) { 
      contacts.list.splice(i, 1); 
    }
  }
  
  const countNewContacts = contacts.list.length;
  
  if(countNewContacts === countContacts) { 
    res.status(404).json({ message: "El contacto no fue encontrado." }); 
    return;
  }
  
  getConnection()
        .get('contacts')
        .find({user_id:req.user.id})
        .assign({ list: contacts.list })
        .write();

  res.status(200).json({ message: "El contacto fue borrado." });
}

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact
}