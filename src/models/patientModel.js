const db = require('../config/db');

const patientModel = {
  // Crear un nuevo paciente
  create: (patientData, callback) => {
    const query = 'INSERT INTO patients (name, email, address, dateOfBirth) VALUES (?, ?, ?, ?)';
    db.query(
      query,
      [patientData.name, patientData.email, patientData.address, patientData.dateOfBirth],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results.insertId);
      }
    );
  },

  // Obtener un paciente por ID
  findById: (id, callback) => {
    const query = 'SELECT * FROM patients WHERE id = ?';
    db.query(query, [id], (error, results) => {
      if (error) return callback(error);
      if (results.length > 0) {
        return callback(null, results[0]);
      } else {
        return callback(null, null);
      }
    });
  },

  // Obtener todos los pacientes
  findAll: (callback) => {
    const query = 'SELECT * FROM patients';
    db.query(query, (error, results) => {
      if (error) return callback(error);
      return callback(null, results);
    });
  },

  // Actualizar un paciente
  update: (id, patientData, callback) => {
    const query = 'UPDATE patients SET name = ?, email = ?, address = ?, dateOfBirth = ? WHERE id = ?';
    db.query(
      query,
      [patientData.name, patientData.email, patientData.address, patientData.dateOfBirth, id],
      (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      }
    );
  },

  // Eliminar un paciente
  delete: (id, callback) => {
    const query = 'DELETE FROM patients WHERE id = ?';
    db.query(query, [id], (error, results) => {
      if (error) return callback(error);
      return callback(null, results);
    });
  }
};

module.exports = patientModel;
