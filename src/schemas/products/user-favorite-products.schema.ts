import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { profiles } from '../profiles.schema';
import { products } from './products.schema';

export const userFavoriteProducts = pgTable(
  'user_favorite_products',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => profiles.id),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id),
  },
  table => {
    return {
      userFavoriteProductsPkey: primaryKey({ columns: [table.userId, table.productId], name: 'user_favorite_products_pkey' }),
    };
  },
);

export type UserFavoriteProducts = typeof userFavoriteProducts.$inferInsert;
export type NewUserFavoriteProducts = typeof userFavoriteProducts.$inferInsert;
