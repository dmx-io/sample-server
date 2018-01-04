const Koa = require('koa');
const app = new Koa();

const db = require('./db');
const routes = require('./routes');
const models = require('./models');

async function main() {
  await db.connection;

  app.listen(3000, () => {
    console.log('listening on port: 3000');
  });

  app.use(routes);
}

process.on('unhandledRejection', (error, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', error);
  console.log(error.stack);
});

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

module.exports = app;
