import { uuid, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { products } from './products.schema';
import { categories } from './categories.schema';

export const productCategories = pgTable(
  'product_categories',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id),
  },
  table => {
    return {
      productCategoriesPkey: primaryKey({ columns: [table.productId, table.categoryId], name: 'product_categories_pkey' }),
    };
  },
);

export type ProductCategory = typeof productCategories.$inferSelect;
export type NewProductCategory = typeof productCategories.$inferInsert;
