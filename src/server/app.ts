import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';
import { routes } from './routes/routes';

const app = new Hono();

app.use('*', logger());
app.use('/api/*', cors());
app.route('/', routes);

app.get('*', serveStatic({ root: './src/client/dist' }));

export default app;
