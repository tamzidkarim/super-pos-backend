import { numeric, pgTable, serial, integer } from 'drizzle-orm/pg-core';
import { units } from './units.schema';

export const productUnits = pgTable('product-units', {
  id: serial('id').primaryKey(),
  unit_id: integer('unit_id').references(() => units.id),
  price: numeric('price'),
});

export type Product = typeof productUnits.$inferSelect;
export type NewProduct = typeof productUnits.$inferInsert;
