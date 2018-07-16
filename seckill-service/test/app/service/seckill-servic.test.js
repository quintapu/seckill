'use strict';

const {
  app,
  assert,
} = require('egg-mock/bootstrap');

describe('seckill()', () => {
  it('should get exists seckill', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const result = await ctx.service.seckill.seckill();
    assert(typeof result === 'object');
  });
});
