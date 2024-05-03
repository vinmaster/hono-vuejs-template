import { db } from './db';
import { users } from './schemas/users';

await db.insert(users).values([
  {
    username: 'admin',
  },
]);

console.log(`Seeding complete.`);
