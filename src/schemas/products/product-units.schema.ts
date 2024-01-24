import { numeric, pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { units } from './units.schema';
import { products } from './products.schema';

export const productUnits = pgTable(
  'product_units',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id),
    unitId: uuid('unit_id')
      .notNull()
      .references(() => units.id),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  },
  table => {
    return {
      productUnitsPkey: primaryKey({ columns: [table.productId, table.unitId], name: 'product_units_pkey' }),
    };
  },
);

export type ProductUnit = typeof productUnits.$inferSelect;
export type NewProductUnit = typeof productUnits.$inferInsert;
