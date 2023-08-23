import Koa from 'koa';
import cors from '@koa/cors';
import Router from '@koa/router';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const App = new Koa();
const router = new Router();

App.use(cors());

router.get('/', (ctx) => {
  ctx.body = {
    message: 'Hello from the other siiiiiiiiiiiiiiiiiiiddeeeeeeeeee',
  };
});

App.use(router.routes());
App.use(router.allowedMethods());

App.listen(port, host, () => {
  console.log(`[ready] http://${host}:${port}`);
});
