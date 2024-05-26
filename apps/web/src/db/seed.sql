CREATE TABLE IF NOT EXISTS task_categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS task_list (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_title TEXT NOT NULL,
    task_description TEXT,
    due_date DATE,
    task_priority TEXT CHECK(task_priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium',
    task_category_id INTEGER,
    is_completed BOOLEAN DEFAULT 0,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_category_id) REFERENCES task_categories(category_id)
);

INSERT OR IGNORE INTO task_categories (category_name) VALUES
    ('Work'),
    ('Personal'),
    ('Shopping'),
    ('Study');

INSERT INTO task_list (task_title, task_description, due_date, task_priority, task_category_id, is_completed, created_on) VALUES
    ('Finish project report', 'Complete and submit the final project report', '2024-05-10', 'High', 1, 0, '2024-05-01 10:00:00'),
    ('Morning exercise', 'Go for a morning run in the park', '2024-05-05', 'Medium', 2, 0, '2024-05-01 07:00:00'),
    ('Weekly grocery shopping', 'Buy groceries including fruits, vegetables, and dairy', '2024-05-07', 'Medium', 3, 0, '2024-05-02 15:00:00'),
    ('Study for exam', 'Read Chapter 4 of the course textbook', '2024-05-12', 'Low', 4, 0, '2024-05-03 20:00:00');
