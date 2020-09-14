const { validationResult } = require("express-validator");
const { getConnection } = require("../database")

const getUser = (req,res) => {
  
  const user = getConnection().get('users').find({ email: req.user.email }).value();
  
  if(user){
    user.password= undefined;
    user.id= undefined
    res.status(200).json(user);
  }else{
    res.status(404).json({message: "Usuario no encontrado."});
  }
}

const updateUser = (req,res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    telephone: req.body.telephone,
    age: req.body.age
  }
  
  const user = getConnection()
      .get('users')
      .find({ email: req.user.email })
      .value();
  
  const existUser = getConnection()
      .get('users')
      .find({ email: req.body.email }).value();
  
  if(existUser) {
    res.status(422).json({ message: "Ya existe un usuario con ese email." });
    return;
  }

  getConnection()
        .get('users')
        .find({id:req.user.id})
        .assign( newUser )
        .write();

  
  if(user){
    user.password= undefined;
    user.id= undefined
    res.status(200).json(user);
  }else{
    res.status(404).json({message: "Usuario no encontrado."});
  }
}

module.exports = {
  getUser,
  updateUser
}