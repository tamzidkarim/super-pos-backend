import { pgTable, foreignKey, unique, pgEnum, uuid, timestamp, text, primaryKey, numeric } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const keyStatus = pgEnum('key_status', ['default', 'valid', 'invalid', 'expired']);
export const keyType = pgEnum('key_type', [
  'aead-ietf',
  'aead-det',
  'hmacsha512',
  'hmacsha256',
  'auth',
  'shorthash',
  'generichash',
  'kdf',
  'secretbox',
  'secretstream',
  'stream_xchacha20',
]);
export const factorType = pgEnum('factor_type', ['totp', 'webauthn']);
export const factorStatus = pgEnum('factor_status', ['unverified', 'verified']);
export const aalLevel = pgEnum('aal_level', ['aal1', 'aal2', 'aal3']);
export const codeChallengeMethod = pgEnum('code_challenge_method', ['s256', 'plain']);

export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
    username: text('username'),
    fullName: text('full_name'),
    avatarUrl: text('avatar_url'),
    website: text('website'),
  },
  table => {
    return {
      profilesUsernameKey: unique('profiles_username_key').on(table.username),
    };
  },
);

export const products = pgTable('products', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name'),
  description: text('description'),
});

export const units = pgTable('units', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull(),
});

export const properties = pgTable('properties', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull(),
});

export const categories = pgTable(
  'categories',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    parentId: uuid('parent_id'),
  },
  table => {
    return {
      categoriesParentIdFkey: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: 'categories_parent_id_fkey',
      }),
    };
  },
);

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
