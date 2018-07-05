'use strict';

const Controller = require('../core/base_controller');
const redis = require('redis');
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const kafkaClient = new kafka.Client();
const producer = new Producer(kafkaClient);
let count = 0;

class SeckillController extends Controller {
  async index() {
    console.log('count=' + count++);
    const result = await this.fn();
    this.success(result);
  }

  async fn(optionalClient) {
    const $this = this;
    let client = null;
    if (optionalClient === 'undefined' || optionalClient == null) {
      client = redis.createClient();
    } else {
      client = optionalClient;
    }
    client.on('error', function(er) {
      console.trace('Here I am');
      console.error(er.stack);
      client.end(true);
    });
    client.watch('counter');
    let promise = null;
    promise = new Promise((resolve, reject) => {
      client.get('counter', function(err, reply) {
        if (parseInt(reply) > 0) {
          const multi = client.multi();
          multi.decr('counter');
          multi.exec(function(err, replies) {
            if (replies == null) {
              console.log('should have conflict');
              $this.fn(client);
            } else {
              const payload = [{
                topic: 'CAR_NUMBER',
                messages: 'buy 1 car',
                partition: 0,
              }];
              producer.send(payload, function(err, data) {
                console.log(data);
              });
              client.end(true);
              resolve(replies);
              console.log(replies);
            }
          });
        } else {
          console.log('sold out!');
          client.end(true);
          reject('sold out');
        }
      });
    });
    return promise;
  }
}

module.exports = SeckillController;
