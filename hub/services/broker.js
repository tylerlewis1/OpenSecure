const aedes = require('aedes')();
const net = require('net');

function startBroker() {
  const PORT = process.env.MQTT_PORT || 1883;

  const server = net.createServer(aedes.handle);

  server.listen(PORT, function () {
    console.log('MQTT Broker running on port:', PORT);
  });

  aedes.on('client', function (client) {
    console.log('Client Connected:', client.id);
  });

  aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected:', client.id);
  });

  aedes.on('connectionError', function (client, err) {
    console.log('Connection Error:', err.message);
  });

  aedes.on('clientError', function (client, err) {
    console.log('Client Error:', err.message);
  });

  aedes.on('publish', function (packet, client) {
    if (client) {
      console.log(
        `Message from ${client.id} on topic ${packet.topic}: ${packet.payload.toString()}`
      );
    }
  });
}

module.exports = startBroker;