import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export default defineConfig({
  schema: './src/schemas',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL as string,
  },
  verbose: true,
  strict: true,
});
