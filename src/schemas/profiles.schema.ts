import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  username: text('username'),
  updated_at: timestamp('updated_at'),
  full_name: text('full_name'),
  avatar_url: text('avatar_url'),
  website: text('website'),
});
