-- Create navigation menus table
CREATE TABLE IF NOT EXISTS navigation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  locale TEXT NOT NULL DEFAULT 'en',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create navigation items table with self-referencing parent
CREATE TABLE IF NOT EXISTS navigation_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  navigation_id INTEGER NOT NULL REFERENCES navigation(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES navigation_items(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  href TEXT,
  image_url TEXT,
  image_alt TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_open_in_new_tab INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
