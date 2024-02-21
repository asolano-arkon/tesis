// controllers/authController.js
const { findUserByEmail, verifyPassword } = require('../models/userModel');

const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    if (!user) {
      return res.status(404).json({ message: 'Email no encontrado' });
    }
    if (!verifyPassword(password, user.password)) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Inicio de sesión exitoso
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      admin: {
        nombre: user.nombre,
        apellido: user.apellido
      }
    });
  });
};

module.exports = { login };
