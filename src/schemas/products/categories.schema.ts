import { pgTable, foreignKey, unique, pgEnum, uuid, timestamp, text, primaryKey, numeric, serial } from 'drizzle-orm/pg-core';

export const categories = pgTable(
  'categories',
  {
    id: serial('id').primaryKey().notNull(),
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

export type Categories = typeof categories.$inferSelect;
export type NewCategories = typeof categories.$inferInsert;
