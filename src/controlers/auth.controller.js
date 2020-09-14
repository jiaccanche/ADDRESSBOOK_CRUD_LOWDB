const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getConnection } = require('../database');
const { v4 } = require('uuid');
const { createToken } = require('../middleware/auth.jwt');
const { validationResult } = require('express-validator');

const signup = (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const newUser = {
    id: v4(),
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    telephone: req.body.telephone,
    age: req.body.age
  }
  
  const user = getConnection().get('users').find({ email: newUser.email }).value();
  if(user){
    res.status(500).json({ message:"El usuario ya existe." });
  }
  else {
    getConnection().get('users').push(newUser).write().then(() => {
    res.status(201).json({ message:"El usuario ha sido creado." });
    })
    
  }
}

const login = (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  
  const email = req.body.email;
  const user = getConnection().get('users').find({ email: email }).value();
  if(!user){
    res.status(404).json({ message:"Usuario no encontrado." });
  }
  else {
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )
    
    if(!passwordIsValid){
      res.status(404).json({ message:"Password invalida." });
    }else{

      res.status(200).json({ Token: createToken(user), message:"Password válida." });
    }
  }
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message:"No existe un token" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message:err });
    req.user = user
    next()
  })
}

module.exports = {
  signup,
  login,
  authenticateToken
}