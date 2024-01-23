import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

export type Product = typeof units.$inferSelect;
export type NewProduct = typeof units.$inferInsert;
