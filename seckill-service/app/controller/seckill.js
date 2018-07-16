'use strict';

const Controller = require('../core/base_controller');

let count = 0;

class SeckillController extends Controller {
  async index() {
    console.log('count=' + count++);
    const result = await this.ctx.service.seckill.seckill();
    this.success(result);
  }
}

module.exports = SeckillController;
