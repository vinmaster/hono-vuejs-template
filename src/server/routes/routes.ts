import { Hono } from 'hono';
import { usersRoutes } from './users';

export const apiRoutes = new Hono()
  .route('/users', usersRoutes)
  .get('/error', c => {
    throw new Error('test error');
    return c.json(0);
  })
  .get('/date', c => c.json({ date: new Date() }));
// .notFound(c => {
//   return c.json({
//     status: 404,
//     payload: '404 Not Found',
//   });
// });

export const routes = new Hono().route('/api', apiRoutes);

export type AppRoutes = typeof routes;
