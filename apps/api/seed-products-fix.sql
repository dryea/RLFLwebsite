PRAGMA foreign_keys = OFF;

-- Fix product category IDs & slugs in D1 database
UPDATE products SET category_id = 1 WHERE slug LIKE '%saving%' OR slug LIKE '%savings%';
UPDATE products SET category_id = 2 WHERE slug LIKE '%fixed%' OR slug LIKE '%deposit%';
UPDATE products SET category_id = 3 WHERE slug LIKE '%loan%';

-- Ensure all savings products are published with interest rates
UPDATE products SET status = 'published', interest_rate_info = '6.25% p.a. • Calculated Daily' WHERE category_id = 1 AND (interest_rate_info IS NULL OR interest_rate_info = '');
UPDATE products SET status = 'published', interest_rate_info = 'Up to 8.25% p.a. • High Growth' WHERE category_id = 2 AND (interest_rate_info IS NULL OR interest_rate_info = '');
UPDATE products SET status = 'published', interest_rate_info = 'Competitive Base Rate + Spread' WHERE category_id = 3 AND (interest_rate_info IS NULL OR interest_rate_info = '');

-- Verify product titles and slugs
UPDATE products SET title = 'Normal Savings Account' WHERE slug = 'normal-saving-account';
UPDATE products SET title = 'Investor''s Savings Account' WHERE slug = 'investors-saving-account';
UPDATE products SET title = 'Student Savings Account' WHERE slug = 'student-saving-account';
UPDATE products SET title = 'Khutruke Savings Account' WHERE slug = 'khutruke-saving-account';
UPDATE products SET title = 'Special Savings Account' WHERE slug = 'special-saving-account';
UPDATE products SET title = 'Shareholder''s Savings Account' WHERE slug = 'shareholders-saving-account';
UPDATE products SET title = 'PWD Savings Account' WHERE slug = 'pwd-saving-account';
UPDATE products SET title = 'Dhaulagiri Savings Account' WHERE slug = 'dhaulagiri-saving-account';
UPDATE products SET title = 'Kanchanjunga Savings Account' WHERE slug = 'kanchanjunga-saving-account';
UPDATE products SET title = 'Everest Savings Account' WHERE slug = 'everest-saving-account';
UPDATE products SET title = 'Super Savings Account' WHERE slug = 'super-saving-account';
UPDATE products SET title = 'Gold Savings Account' WHERE slug = 'gold-saving-account';
UPDATE products SET title = 'Diamond Savings Account' WHERE slug = 'diamond-saving-account';
UPDATE products SET title = 'Sarathi Savings Account' WHERE slug = 'sarathi-saving-account';

PRAGMA foreign_keys = ON;
