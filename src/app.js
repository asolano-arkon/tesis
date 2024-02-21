const express = require('express');
const patientRoutes = require('./routes/patientRoutes');
const vitalSignsRoutes = require('./routes/vitalSignsRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();
const loginRoutes = require('./routes/loginRoutes');

// Montar rutas


app.use(express.json()); // Middleware para parsear JSON

// Montar rutas
app.use('/api', loginRoutes);
app.use('/patients', patientRoutes);
app.use('/vital-signs', vitalSignsRoutes);
app.use('/doctors', doctorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
