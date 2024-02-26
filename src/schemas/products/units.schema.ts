import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const units = pgTable('units', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  shortName: text('short_name').notNull(),
});

export type Unit = typeof units.$inferSelect;
export type NewUnit = typeof units.$inferInsert;
