const { body } = require('express-validator');
const { param } = require('express-validator');

const validateUsers = (method) => {
  switch (method) {
    case 'signup': {
     return [ 
        body('name', "El usuario debe estar entre 10 a 20 caracteres.")
        .isString().isLength({ min:5, max:20 }),
        body('name', "El usuario no existe").notEmpty(),
        body('telefono', 'El telefono no tiene 10 digitos.').optional()
        .isLength({ min:10, max:10 }),
        body('celular','El celular no tiene 10 digitos.').optional()
        .isLength({ min:10, max:10 }),
        body('telefono', 'El telefono debe ser enviado como string.').optional()
        .isString(),
        body('password','La password debe tener 8 caracteres.').notEmpty().isString()
        .isLength({ min:8, min:8 }),
        body('age','La edad no es entera.').notEmpty().isInt(),
        body('email','No hay un email.').notEmpty().isEmail()
       ]   
    }

    case 'login': {
      return [ 
         body('email', "El email no existe.").exists()
         .isEmail(),
         body('password', "La contraseña no existe.").exists().notEmpty()
         .isString().isLength({ min:8, min:8 })
      ]   
     }

     case 'updateUser': {
      return [
        body('name', "El usuario debe estar entre 10 a 20 caracteres.")
        .isString().isLength({ min:10, max:20 }),
        body('name', "El usuario no existe").notEmpty(),
        body('telefono', 'El telefono no tiene 10 digitos.').optional()
        .isLength({ min:10, max:10 }),
        body('celular','El celular no tiene 10 digitos.').optional()
        .isLength({ min:10, max:10 }),
        body('telefono', 'El telefono debe ser enviado como string.').optional()
        .isString(),
        body('age','La edad no es entera.').notEmpty().isInt(),
        body('email','No hay un email.').notEmpty().isEmail()
      ] 
    }
  }
}

module.exports = {
  validateUsers
}