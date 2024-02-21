const db = require('../config/db');

const vitalSignsController = {
  // Obtener los últimos registros de signos vitales
  getLastVitalSigns: (req, res) => {
    const query = 'SELECT * FROM vital_signs ORDER BY timestamp DESC LIMIT 1';
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching last vital signs:', error);
        return res.status(500).json({ message: 'Error al obtener los últimos signos vitales' });
      }
      res.json(results[0]);
    });
  },

  // Crear un nuevo registro de signos vitales
  createVitalSign: (req, res) => {
    const { patientId, temperature, heartRate, bloodPressure, oxygenLevel } = req.body;
    const query = 'INSERT INTO vital_signs (patient_id, temperature, heart_rate, blood_pressure, oxygen_level) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [patientId, temperature, heartRate, bloodPressure, oxygenLevel], (error, results) => {
      if (error) {
        console.error('Error creating vital sign:', error);
        return res.status(500).json({ message: 'Error al crear el registro de signos vitales' });
      }
      res.status(201).json({ message: 'Registro de signos vitales creado exitosamente', id: results.insertId });
    });
  },

  // Actualizar un registro de signos vitales (Ejemplo de cómo podría ser)
  updateVitalSign: (req, res) => {
    const { id } = req.params; // ID del registro de signos vitales a actualizar
    const { temperature, heartRate, bloodPressure, oxygenLevel } = req.body; // Nuevos valores
    
    const query = 'UPDATE vital_signs SET temperature = ?, heart_rate = ?, blood_pressure = ?, oxygen_level = ? WHERE id = ?';

    db.query(query, [temperature, heartRate, bloodPressure, oxygenLevel, id], (error, results) => {
      if (error) {
        console.error('Error updating vital sign:', error);
        return res.status(500).json({ message: 'Error al actualizar el registro de signos vitales' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Registro de signos vitales no encontrado' });
      }
      res.json({ message: 'Registro de signos vitales actualizado exitosamente' });
    });
  },

  // Eliminar un registro de signos vitales (Ejemplo de cómo podría ser)
  deleteVitalSign: (req, res) => {
    const { id } = req.params; // ID del registro a eliminar
    const query = 'DELETE FROM vital_signs WHERE id = ?';

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error deleting vital sign:', error);
        return res.status(500).json({ message: 'Error al eliminar el registro de signos vitales' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Registro de signos vitales no encontrado' });
      }
      res.json({ message: 'Registro de signos vitales eliminado exitosamente' });
    });
  }
};

module.exports = vitalSignsController;
