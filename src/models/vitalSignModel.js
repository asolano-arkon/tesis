const db = require('../config/db');

const vitalSignModel = {
  // Crear un nuevo registro de signos vitales
  create: (vitalSignData, callback) => {
    const query = `
      INSERT INTO vital_signs (patient_id, temperature, heart_rate, blood_pressure, oxygen_level, timestamp)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [
        vitalSignData.patient_id,
        vitalSignData.temperature,
        vitalSignData.heart_rate,
        vitalSignData.blood_pressure,
        vitalSignData.oxygen_level,
        new Date() // Asumiendo que quieres registrar la fecha y hora actual del insert
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results.insertId);
      }
    );
  },

  // Obtener los signos vitales de un paciente por ID
  findByPatientId: (patientId, callback) => {
    const query = 'SELECT * FROM vital_signs WHERE patient_id = ? ORDER BY timestamp DESC';
    db.query(query, [patientId], (error, results) => {
      if (error) return callback(error);
      return callback(null, results);
    });
  },

  // Actualizar un registro de signos vitales
  update: (id, vitalSignData, callback) => {
    const query = `
      UPDATE vital_signs
      SET temperature = ?, heart_rate = ?, blood_pressure = ?, oxygen_level = ?
      WHERE id = ?
    `;
    db.query(
      query,
      [
        vitalSignData.temperature,
        vitalSignData.heart_rate,
        vitalSignData.blood_pressure,
        vitalSignData.oxygen_level,
        id
      ],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      }
    );
  },

  // Eliminar un registro de signos vitales
  delete: (id, callback) => {
    const query = 'DELETE FROM vital_signs WHERE id = ?';
    db.query(query, [id], (error, results) => {
      if (error) return callback(error);
      return callback(null, results);
    });
  }
};

module.exports = vitalSignModel;
