# hono-vuejs-template

To install dependencies:

```bash
bun install
```

Create .env with the following
```
NODE_ENV=development
```

Database generate migrations

```bash
bunx drizzle-kit generate:sqlite
bun run migrate-db.ts development
```

Database seed data

```bash
bun run ./src/server/db/seeder.ts
```

Database force create db. TODO: requires driver

```bash
bunx drizzle-kit push:sqlite
```

Development:

```bash
bun dev
```

Production:

```bash
bun start
```

This project was created using `bun init` in bun v1.1.6. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
