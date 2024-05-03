import type { z } from 'zod';
import { insertUserSchema } from '../server/db/schemas/users';

export const createUserRequest = insertUserSchema.omit({
  id: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
});

// export type LoginRequest = z.infer<typeof createUserSchema>;
export const loginRequest = insertUserSchema.pick({
  username: true,
});
