// Importar la conexión a la base de datos
const db = require('../config/db');

const patientController = {
  // Obtener todos los pacientes
  getAllPatients: (req, res) => {
    db.query('SELECT * FROM patients', (error, results) => {
      if (error) {
        console.error('Error getting patients:', error);
        return res.status(500).send('Error al obtener los pacientes');
      }
      res.json(results);
    });
  },

  // Obtener un paciente por ID
  getPatientById: (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM patients WHERE id = ?', [id], (error, results) => {
      if (error) {
        console.error('Error getting patient:', error);
        return res.status(500).send('Error al obtener el paciente');
      }
      if (results.length === 0) {
        return res.status(404).send('Paciente no encontrado');
      }
      res.json(results[0]);
    });
  },

  // Crear un nuevo paciente
  createPatient: (req, res) => {
    const { name, age, address } = req.body; // Asegúrate de que estos campos coincidan con tu esquema de base de datos
    db.query('INSERT INTO patients (name, age, address) VALUES (?, ?, ?)', [name, age, address], (error, results) => {
      if (error) {
        console.error('Error creating patient:', error);
        return res.status(500).send('Error al crear el paciente');
      }
      res.status(201).json({ id: results.insertId, ...req.body });
    });
  },

  // Actualizar un paciente
  updatePatient: (req, res) => {
    const { id } = req.params;
    const { name, age, address } = req.body; // Asegúrate de validar y sanitizar el input
    db.query('UPDATE patients SET name = ?, age = ?, address = ? WHERE id = ?', [name, age, address, id], (error, results) => {
      if (error) {
        console.error('Error updating patient:', error);
        return res.status(500).send('Error al actualizar el paciente');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Paciente no encontrado');
      }
      res.send('Paciente actualizado con éxito');
    });
  },

  // Eliminar un paciente
  deletePatient: (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM patients WHERE id = ?', [id], (error, results) => {
      if (error) {
        console.error('Error deleting patient:', error);
        return res.status(500).send('Error al eliminar el paciente');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Paciente no encontrado');
      }
      res.send('Paciente eliminado con éxito');
    });
  }
};

module.exports = patientController;
