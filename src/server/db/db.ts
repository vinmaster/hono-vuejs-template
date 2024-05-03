import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

const sqlite = new Database(`${Bun.env.NODE_ENV}.db`);
export const db = drizzle(sqlite);
