// models/userModel.js
const connection = require('../db'); // Asegúrate de que la ruta sea correcta
const crypto = require('crypto');

const findUserByEmail = (email, callback) => {
  connection.query(
    'SELECT * FROM administration WHERE email = ?',
    [email],
    (error, results) => {
      callback(error, results.length > 0 ? results[0] : null);
    }
  );
};

const verifyPassword = (enteredPassword, storedPassword) => {
  const hashedPassword = crypto.createHash('sha256').update(enteredPassword).digest('hex');
  return hashedPassword === storedPassword;
};

module.exports = { findUserByEmail, verifyPassword };
