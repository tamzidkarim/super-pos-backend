import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DB_URL } from '@config';

const pgClient = postgres(DB_URL);
const db = drizzle(pgClient);

export { db, pgClient };
