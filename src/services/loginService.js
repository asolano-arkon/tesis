// src/services/authService.js
import axios from 'axios';

const login = async (email, password) => {
  const response = await axios.post('http://localhost:3001/api/login', { email, password });
  return response.data; // Devuelve los datos de respuesta para ser manejados por el componente
};

export default { login };
