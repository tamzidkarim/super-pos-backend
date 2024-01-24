import { primaryKey, pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { products } from './products.schema';
import { properties } from './properties.schema';

export const productProperties = pgTable(
  'product_properties',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id),
    propertyId: uuid('property_id')
      .notNull()
      .references(() => properties.id),
    value: text('value').notNull(),
  },
  table => {
    return {
      productPropertiesPkey: primaryKey({ columns: [table.productId, table.propertyId], name: 'product_properties_pkey' }),
    };
  },
);

export type ProductProperties = typeof productProperties.$inferSelect;
export type NewProductProperties = typeof productProperties.$inferInsert;
