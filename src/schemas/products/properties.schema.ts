import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const properties = pgTable('properties', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull(),
});

export type Properties = typeof properties.$inferSelect;
export type NewProperties = typeof properties.$inferInsert;
