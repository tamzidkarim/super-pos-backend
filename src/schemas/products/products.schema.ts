import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name'),
  description: text('description'),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
