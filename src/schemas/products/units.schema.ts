import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const units = pgTable('units', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull(),
});

export type Unit = typeof units.$inferSelect;
export type NewUnit = typeof units.$inferInsert;
