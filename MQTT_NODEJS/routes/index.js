var express = require('express');
var router = express.Router();
// npm install mqtt --save
var mqtt = require('mqtt');
var options = {
  port: 3333,
  host: "wss://ngoinhaiot.com",
  username: "Vantho15",
  password: "3759DFCEFE834F17",
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  encoding: "utf8",
  timeout: 3,
  useSSL: true,
  clientId: 'Tho2k'
}

//initialize the MQTT client
var client = mqtt.connect("wss://ngoinhaiot.com", options);
//setup the callbacks
client.on('connect', function () {
  console.log('Connected');
});

// subscribe to topic 'Vantho15/led'
client.subscribe('Vantho15/Led1',()=>{console.log("thành công")});


client.on('message', function (topic, message) {
  //Called each time a message is received
  console.log('Received message:', topic, message.toString());
});

/* GET home page. */
router.get('/', function(req, res, next) {
     // publish message 'Hello' to topic 'Vantho15/hihi'
    client.publish('Vantho15/Led','VanTho');
});

module.exports = router;
