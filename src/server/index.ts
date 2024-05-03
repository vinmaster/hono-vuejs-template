import app from './app';

const server = Bun.serve({
  fetch: app.fetch,
});

if (!Bun.env.NODE_ENV) {
  console.error('NODE_ENV is required');
  throw new Error('NODE_ENV is required');
}

console.log(`Server ${Bun.env.NODE_ENV} running on: ${server.url}`);
