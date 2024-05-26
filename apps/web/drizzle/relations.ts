import { relations } from "drizzle-orm/relations";
import { categories, tasks, task_categories, task_list } from "./schema";

export const tasksRelations = relations(tasks, ({one}) => ({
	category: one(categories, {
		fields: [tasks.category_id],
		references: [categories.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	tasks: many(tasks),
}));

export const task_listRelations = relations(task_list, ({one}) => ({
	task_category: one(task_categories, {
		fields: [task_list.task_category_id],
		references: [task_categories.category_id]
	}),
}));

export const task_categoriesRelations = relations(task_categories, ({many}) => ({
	task_lists: many(task_list),
}));