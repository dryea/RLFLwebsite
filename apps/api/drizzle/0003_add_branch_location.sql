-- Add province/district/localBody to branches
ALTER TABLE branches ADD COLUMN province TEXT;
ALTER TABLE branches ADD COLUMN district TEXT;
ALTER TABLE branches ADD COLUMN local_body TEXT;
