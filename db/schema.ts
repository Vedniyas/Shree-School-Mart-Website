import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const baskets=sqliteTable('baskets',{session:text('session').primaryKey(),cart:text('cart').notNull().default('[]'),wishlist:text('wishlist').notNull().default('[]')});
export const uploads=sqliteTable('uploads',{id:text('id').primaryKey(),session:text('session').notNull(),filename:text('filename').notNull(),size:integer('size').notNull(),type:text('type').notNull(),created:text('created').notNull()},t=>[index('uploads_session_idx').on(t.session)]);
export const checkouts=sqliteTable('checkouts',{session:text('session').primaryKey(),details:text('details').notNull(),updated:text('updated').notNull()});
