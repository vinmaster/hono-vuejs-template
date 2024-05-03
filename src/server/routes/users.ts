import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { users } from '../db/schemas/users';
import { db } from '../db/db';
import { createUserRequest, loginRequest } from '../../common/types';
import { eq } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';

export const usersRoutes = new Hono()
  .get('/', async c => {
    let result = await db.select().from(users).all();
    return c.json(result);
  })
  .post('/register', zValidator('json', createUserRequest), async c => {
    let user = await c.req.valid('json');

    let validValue = createUserRequest.parse(user);

    let result = await db
      .insert(users)
      .values(validValue)
      .returning()
      .then(x => x[0]);

    c.status(201);
    return c.json(result);
  })
  .post('/login', zValidator('json', loginRequest), async c => {
    let user = await c.req.valid('json');

    let validValue = loginRequest.parse(user);

    let found = await db.select().from(users).where(eq(users.username, validValue.username)).all();
    if (found.length === 0) throw new HTTPException(400, { message: 'Not user found' });

    let result = await db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.username, validValue.username))
      .returning()
      .then(x => x[0]);

    return c.json(result);
  });
