-- 0014_restructure_nav_menus.sql
-- Client feedback:
--   1) About menu: reduce to exactly 4 items
--      (Who We Are, Board of Directors, Management Team, Department Heads)
--   2) Products menu: separate "Deposits" and "Loans" groups
-- Applies to both EN (navigation_id=1) and NP (navigation_id=2).

-- ---------- ABOUT: remove everything except the 4 target links ----------
-- For each locale menu, delete About children that are not the 4 target hrefs,
-- then delete now-orphaned sub-groups (Governance etc.) left behind.

-- EN (navigation_id=1): About href='/about'
DELETE FROM navigation_items
WHERE navigation_id = 1 AND parent_id IS NOT NULL
  AND parent_id IN (
    SELECT id FROM navigation_items WHERE navigation_id = 1 AND href = '/about'
  )
  AND href NOT IN (
    '/about/introduction',
    '/team/board-of-directors',
    '/team/management-team',
    '/team/head-of-department'
  );

-- NP (navigation_id=2): About href='/about'
DELETE FROM navigation_items
WHERE navigation_id = 2 AND parent_id IS NOT NULL
  AND parent_id IN (
    SELECT id FROM navigation_items WHERE navigation_id = 2 AND href = '/about'
  )
  AND href NOT IN (
    '/about/introduction',
    '/team/board-of-directors',
    '/team/management-team',
    '/team/head-of-department'
  );

-- Delete leftover grouped parent nodes under About (e.g. Governance) in both menus
DELETE FROM navigation_items
WHERE id IN (
  SELECT id FROM navigation_items
  WHERE href IS NULL
    AND parent_id IN (
      SELECT id FROM navigation_items WHERE href = '/about' AND navigation_id IN (1,2)
    )
    AND label NOT IN ('Who We Are', 'हामी को हौं', 'Deposits', 'निक्षेप', 'Loans', 'ऋण', 'Tools', 'उपकरणहरू')
);

-- Rename labels to match client request
UPDATE navigation_items SET label = 'Who We Are'
WHERE navigation_id = 1 AND href = '/about/introduction';
UPDATE navigation_items SET label = 'हामी को हौं'
WHERE navigation_id = 2 AND href = '/about/introduction';
UPDATE navigation_items SET label = 'Department Heads'
WHERE navigation_id = 1 AND href = '/team/head-of-department';
UPDATE navigation_items SET label = 'विभाग प्रमुखहरू'
WHERE navigation_id = 2 AND href = '/team/head-of-department';

-- Normalize About sort order
UPDATE navigation_items SET sort_order = 0 WHERE navigation_id = 1 AND href = '/about/introduction';
UPDATE navigation_items SET sort_order = 1 WHERE navigation_id = 1 AND href = '/team/board-of-directors';
UPDATE navigation_items SET sort_order = 2 WHERE navigation_id = 1 AND href = '/team/management-team';
UPDATE navigation_items SET sort_order = 3 WHERE navigation_id = 1 AND href = '/team/head-of-department';
UPDATE navigation_items SET sort_order = 0 WHERE navigation_id = 2 AND href = '/about/introduction';
UPDATE navigation_items SET sort_order = 1 WHERE navigation_id = 2 AND href = '/team/board-of-directors';
UPDATE navigation_items SET sort_order = 2 WHERE navigation_id = 2 AND href = '/team/management-team';
UPDATE navigation_items SET sort_order = 3 WHERE navigation_id = 2 AND href = '/team/head-of-department';

-- ---------- PRODUCTS: merge Savings + Fixed Deposits into a "Deposits" group ----------
-- EN (navigation_id=1): Products href='/products'
-- Move fixed-deposit children under the savings ("Deposits") group node
UPDATE navigation_items
SET parent_id = (
  SELECT id FROM navigation_items
  WHERE navigation_id = 1 AND parent_id = (
    SELECT id FROM navigation_items WHERE navigation_id = 1 AND href = '/products'
  ) AND href = '/products/savings'
)
WHERE navigation_id = 1 AND parent_id = (
  SELECT id FROM navigation_items
  WHERE navigation_id = 1 AND href = '/products/fixed-deposits'
);

-- NP (navigation_id=2)
UPDATE navigation_items
SET parent_id = (
  SELECT id FROM navigation_items
  WHERE navigation_id = 2 AND parent_id = (
    SELECT id FROM navigation_items WHERE navigation_id = 2 AND href = '/products'
  ) AND href = '/products/savings'
)
WHERE navigation_id = 2 AND parent_id = (
  SELECT id FROM navigation_items
  WHERE navigation_id = 2 AND href = '/products/fixed-deposits'
);

-- Rename savings group node to "Deposits" / "निक्षेप"
UPDATE navigation_items SET label = 'Deposits'
WHERE navigation_id = 1 AND href = '/products/savings'
  AND parent_id = (SELECT id FROM navigation_items WHERE navigation_id = 1 AND href = '/products');
UPDATE navigation_items SET label = 'निक्षेप'
WHERE navigation_id = 2 AND href = '/products/savings'
  AND parent_id = (SELECT id FROM navigation_items WHERE navigation_id = 2 AND href = '/products');

-- Delete the now-empty "Fixed Deposits" group nodes
DELETE FROM navigation_items
WHERE navigation_id IN (1,2) AND href = '/products/fixed-deposits'
  AND parent_id IN (
    SELECT id FROM navigation_items WHERE href = '/products' AND navigation_id IN (1,2)
  );
