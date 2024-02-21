const mqtt = require('mqtt');

const connectMqtt = () => {
  const client = mqtt.connect('mqtt://test.mosquitto.org'); // Usa tu URL del broker MQTT

  client.on('connect', () => {
    console.log('Conectado a MQTT Broker');
    // Suscripciones
    client.subscribe(['temperatura/photon', 'ritmoCardiaco/photon']); // Ajusta tus topics
  });

  client.on('message', (topic, message) => {
    console.log(`Mensaje MQTT recibido en '${topic}': ${message.toString()}`);
    // Aquí puedes agregar tu lógica para manejar los mensajes
  });

  return client;
};

module.exports = connectMqtt;
