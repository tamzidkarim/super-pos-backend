import { pgTable, foreignKey, uuid, text } from 'drizzle-orm/pg-core';

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
export type Categories = typeof categories.$inferSelect;
export type NewCategories = typeof categories.$inferInsert;
