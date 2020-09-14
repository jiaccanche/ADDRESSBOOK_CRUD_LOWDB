const { body } = require('express-validator');
const { param } = require('express-validator');

const validateContacts = (method) => {
  switch (method) {
    case 'createContact': {
     return [ 
        body('name', "El usuario debe estar entre 10 a 20 caracteres.")
        .isString().isLength({ min:10, max:20 }),
        body('name', "El usuario no existe").notEmpty(),
        body('telefono', 'El telefono no tiene 10 digitos.').optional()
        .isLength({ min:10, max:10 }),
        body('celular','El celular no tiene 10 digitos.').optional()
        .isLength({ min:10 }),
        body('telefono', 'El telefono debe ser enviado como string.').optional()
        .isString(),
        body('celular','El celular debe ser enviado como string.').optional()
        .isString()
       ]   
    }

    case 'updateContact': {
      return [ 
         body('name', "El usuario debe estar entre 10 a 20 caracteres.")
         .isString().isLength({ min:10, max:20 }),
         body('name', "El usuario no existe").notEmpty(),
         body('telefono', 'El telefono no tiene 10 digitos.').optional()
         .isLength({ min:10, max:10 }),
         body('celular','El celular no tiene 10 digitos.').optional()
         .isLength({ min:10 }),
         body('telefono', 'El telefono debe ser enviado como string.').optional()
         .isString(),
         body('celular','El celular debe ser enviado como string.').optional()
         .isString()
        ]   
     }

     case 'getContact': {
      return [
        param('id','El id no existe.').exists(),
        param('id','El id no es string.').isString()
      ]
    }

    case 'deleteContact': {
      return [
        param('id','El id no existe.').exists(),
        param('id','El id no es string.').isString()
      ]
    }


 
  }
}

module.exports = {
  validateContacts
}