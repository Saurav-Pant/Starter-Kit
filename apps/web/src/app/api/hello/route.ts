import type { NextRequest } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { createDb } from '../../../db/index';
import { task_list } from '../../../../drizzle/schema';

interface TaskList {
  task_title: string;
  task_description?: string;
  due_date?: string;
  task_priority?: 'Low' | 'Medium' | 'High';
  task_category_id?: number;
  is_completed?: boolean;
}

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const DB = getRequestContext().env.DB;

  const drizzle = createDb(DB);
  const result = await drizzle.select().from(task_list);

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: NextRequest) {
  try {
    const DB = getRequestContext().env.DB;
    const drizzle = createDb(DB);

    const body: TaskList = await request.json();

    const data = {
      task_title: body.task_title,
      task_description: body.task_description,
      due_date: body.due_date,
      task_priority: body.task_priority ?? 'Medium',
      task_category_id: body.task_category_id,
      is_completed: body.is_completed ? '1' : '0',
    };

    // Insert the parsed data into the database
    const result = await drizzle.insert(task_list).values(data);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
