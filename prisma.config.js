import 'dotenv/config'; // Crucial: Loads your .env file into memory automatically
import { defineConfig } from 'prisma/config';

export default defineConfig({
  // Tells Prisma exactly where your models live
  schema: 'prisma/schema.prisma',

  // Specifies where your database migration history is kept
  migrations: {
    path: 'prisma/migrations',
  },

  // Securely injects your live database string at runtime
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
