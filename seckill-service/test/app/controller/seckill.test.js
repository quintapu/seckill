'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/seckill.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should POST /seckill', () => {
    return app.httpRequest()
      .post('/seckill')
      .expect(200);
  });
});
