import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name'),
  description: text('description'),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
