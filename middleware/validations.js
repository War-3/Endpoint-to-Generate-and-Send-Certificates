const { check, validationResult } = require('express-validator');

const validateUser = [
  
    check('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Error: minimium of 3 character for name required'),
      
      check('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
    

    
    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      next();
    }
  ];


  const validateCert = [
  
    check('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Error: minimium of 3 character for name required'),
      

    check('userEmail')
      .isEmail().withMessage('Invalid email format')
      .notEmpty().withMessage('Email is required'),      
  
  
    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      next();
    }
  ];
  

  module.exports = { validateUser, validateCert }
    