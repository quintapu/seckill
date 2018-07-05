'use strict';

const kafka = require('kafka-node'),
  Consumer = kafka.Consumer,
  client = new kafka.Client(),
  consumer = new Consumer(
    client,
    [{ topic: 'CAR_NUMBER' }],
    {
      autoCommit: true,
    }
  );

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '192.168.31.234',
  user: 'root',
  password: 'root',
  database: 'seckill',
});

connection.connect();

consumer.on('message', function(message) {
  console.log(message);
  connection.query('INSERT INTO seckill set ?', { date: new Date() }, function(error, results) {
    if (error) {
      console.error(error);
    }
    console.log(results);
  });
});
