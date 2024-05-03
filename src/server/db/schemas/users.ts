import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = sqliteTable(
  'users',
  {
    id: integer('id').primaryKey(),
    username: text('username').unique().notNull(),
    lastLoginAt: integer('lastLoginAt', { mode: 'timestamp' }),
    createdAt: integer('createdAt', { mode: 'timestamp' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: integer('updatedAt', { mode: 'timestamp' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  users => ({
    usernameIndex: index('usernameIndex').on(users.username),
  })
);

export const insertUserSchema = createInsertSchema(users, {
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
});
export const selectUsersSchema = createSelectSchema(users);
