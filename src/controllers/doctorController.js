const db = require('../config/db');

const doctorController = {
  // Registrar un nuevo doctor
  createDoctor: (req, res) => {
    const { name, specialization, email } = req.body; // Ajusta estos campos según tu diseño de base de datos
    const query = 'INSERT INTO doctors (name, specialization, email) VALUES (?, ?, ?)';
    
    db.query(query, [name, specialization, email], (error, results) => {
      if (error) {
        console.error('Error creating doctor:', error);
        return res.status(500).json({ message: 'Error al registrar el doctor' });
      }
      res.status(201).json({ message: 'Doctor registrado exitosamente', doctorId: results.insertId });
    });
  },

  // Obtener detalles de un doctor específico
  getDoctorById: (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM doctors WHERE id = ?';

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error fetching doctor:', error);
        return res.status(500).json({ message: 'Error al obtener los detalles del doctor' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Doctor no encontrado' });
      }
      res.json(results[0]);
    });
  },

  // Actualizar la información de un doctor
  updateDoctor: (req, res) => {
    const { id } = req.params;
    const { name, specialization, email } = req.body; // Asume que estos son los campos que se pueden actualizar
    const query = 'UPDATE doctors SET name = ?, specialization = ?, email = ? WHERE id = ?';

    db.query(query, [name, specialization, email, id], (error, results) => {
      if (error) {
        console.error('Error updating doctor:', error);
        return res.status(500).json({ message: 'Error al actualizar los datos del doctor' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Doctor no encontrado' });
      }
      res.json({ message: 'Datos del doctor actualizados exitosamente' });
    });
  },

  // Eliminar un doctor
  deleteDoctor: (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM doctors WHERE id = ?';

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error deleting doctor:', error);
        return res.status(500).json({ message: 'Error al eliminar el doctor' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Doctor no encontrado' });
      }
      res.json({ message: 'Doctor eliminado exitosamente' });
    });
  }
};

module.exports = doctorController;
