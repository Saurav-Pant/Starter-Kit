import { sqliteTable, AnySQLiteColumn, foreignKey, integer, text, numeric } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const tasks = sqliteTable("tasks", {
	id: integer("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	due_date: numeric("due_date"),
	priority: text("priority").default("Medium"),
	category_id: integer("category_id").references(() => categories.id),
	completed: numeric("completed"),
	created_at: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const categories = sqliteTable("categories", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});

export const task_categories = sqliteTable("task_categories", {
	category_id: integer("category_id").primaryKey({ autoIncrement: true }),
	category_name: text("category_name").notNull(),
});

export const task_list = sqliteTable("task_list", {
	task_id: integer("task_id").primaryKey({ autoIncrement: true }),
	task_title: text("task_title").notNull(),
	task_description: text("task_description"),
	due_date: numeric("due_date"),
	task_priority: text("task_priority").default("Medium"),
	task_category_id: integer("task_category_id").references(() => task_categories.category_id),
	is_completed: numeric("is_completed"),
	created_on: numeric("created_on").default(sql`(CURRENT_TIMESTAMP)`),
});