-- Migration: Add homepage CMS tables

CREATE TABLE IF NOT EXISTS hero_slides (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  title_np TEXT,
  description TEXT NOT NULL,
  description_np TEXT,
  image_url TEXT NOT NULL,
  cta_primary_text TEXT,
  cta_primary_link TEXT,
  cta_secondary_text TEXT,
  cta_secondary_link TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS offering_cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  title_np TEXT,
  summary TEXT NOT NULL,
  summary_np TEXT,
  icon TEXT NOT NULL,
  badge TEXT,
  badge_np TEXT,
  link_text TEXT NOT NULL,
  link_url TEXT NOT NULL,
  widget_type TEXT DEFAULT 'none',
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS offering_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id INTEGER NOT NULL REFERENCES offering_cards(id),
  label TEXT NOT NULL,
  label_np TEXT,
  url TEXT NOT NULL,
  icon TEXT DEFAULT 'chevron-right',
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS site_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  label_np TEXT,
  value TEXT NOT NULL,
  suffix TEXT DEFAULT '+',
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS app_banner (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  title_np TEXT,
  description TEXT NOT NULL,
  description_np TEXT,
  image_url TEXT,
  android_url TEXT,
  ios_url TEXT,
  badge_text TEXT DEFAULT 'Go Digital',
  badge_text_np TEXT,
  is_active INTEGER DEFAULT 1,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS csr_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  title_np TEXT,
  summary TEXT NOT NULL,
  summary_np TEXT,
  image_url TEXT,
  date TEXT,
  link_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
