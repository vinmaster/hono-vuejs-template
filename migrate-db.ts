import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

const envs = ['development', 'production'];
let env = Bun.argv.at(-1);
if (!env || !envs.includes(env)) {
  console.log('Requires env as arg');
  process.exit(1);
}
const sqlite = new Database('development.db');
const db = drizzle(sqlite);
await migrate(db, { migrationsFolder: './src/server/db/migrations' });
