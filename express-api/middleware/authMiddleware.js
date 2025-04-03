// const jwt = require('jsonwebtoken');
// const CustomError = require('../utils/CustomError.js');
// require('dotenv').config();

// export const authenticateUser = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return next(new CustomError('Access denied. No token provided.', 401));

//   try {
//     const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     next(new CustomError('Invalid token.', 400));
//   }
// };

// const authorizeRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(new CustomError('Access denied. Insufficient permissions.', 403));
//     }
//     next();
//   };
// };

// module.exports = { authenticateUser, authorizeRole };


// Bashar: 
// import { CustomError } from '../utils/errorHandler.js';

// export const auth = (req, res, next) => {
//   if (req.body.user_password !== '123456') {
//     throw new CustomError('Unauthorized from middleware!', 401); // User is not authorized
//   }
//   console.log(req.body);
//   next(); // Call next middleware or route handler
// };