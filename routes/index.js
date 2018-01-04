const router = require('koa-joi-router');
const { User } = require('../models');

const { Joi } = router;
Joi.objectId = require('joi-objectid')(Joi);

const sampleRouter = router();

const middleware = {
  fetchUser: async (ctx, next) => {
    const { userId } = ctx.params;
    const user = await User.findById(userId);

    if (!user) {
      ctx.throw(404, `No user found with id ${userId}`)
    }

    ctx.state.user = user;
    await next();
  }
}

sampleRouter.route([
  {
    method: 'post',
    path: '/users',
    validate: {
      body: {
        name: Joi.string().max(100),
        email: Joi.string().lowercase().email(),
      },
      type: 'json',
    },
    handler: async (ctx) => {
      const user = await User.create(ctx.request.body);
      ctx.status = 201;
      ctx.body = user;
    }
  },
  {
    method: 'get',
    path: '/users',
    handler: async (ctx) => {
      const users = await User.find();
      ctx.status = 200;
      ctx.body = users;
    }
  },
  {
    method: 'get',
    path: '/users/:userId',
    validate: {
      params: {
        userId: Joi.objectId().required(),
      },
    },
    handler: [
      middleware.fetchUser,
      async (ctx) => {
        ctx.body = ctx.state.user;
      }
    ]
  }
]);

module.exports = sampleRouter.middleware();
