CREATE TABLE IF NOT EXISTS account_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_no TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT,
  citizenship_no TEXT,
  account_type TEXT NOT NULL,
  province TEXT,
  district TEXT,
  local_body TEXT,
  address TEXT,
  preferred_branch TEXT,
  occupation TEXT,
  initial_deposit REAL,
  status TEXT DEFAULT 'submitted',
  documents TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS loan_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_no TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  loan_type TEXT NOT NULL,
  requested_amount REAL,
  tenure_months INTEGER,
  occupation TEXT,
  monthly_income REAL,
  preferred_branch TEXT,
  status TEXT DEFAULT 'submitted',
  timeline TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
