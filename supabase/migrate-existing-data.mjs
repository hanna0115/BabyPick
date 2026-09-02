// 기존 data/menuData.js(엘빈즈 47종)를 seed.sql로 변환하는 1회성 마이그레이션 스크립트.
// 사용법: node supabase/migrate-existing-data.mjs > supabase/seed.sql
import { DATA, CATEGORY_MAP } from "../src/data/menuData.js";

const esc = (s) => (s == null ? "" : String(s).replace(/'/g, "''"));
const val = (s) => (s === undefined || s === null || s === "" ? "null" : `'${esc(s)}'`);
const num = (n) => (n === undefined || n === null ? "null" : n);

let sql = "";

sql += `-- 브랜드\n`;
sql += `insert into brands (id, name, slug, status) values\n`;
sql += `  ('11111111-1111-1111-1111-111111111111', '엘빈즈', 'elvinz', 'active'),\n`;
sql += `  ('22222222-2222-2222-2222-222222222222', '루솔', 'lusol', 'coming_soon'),\n`;
sql += `  ('33333333-3333-3333-3333-333333333333', '베이비본죽', 'nampyeong', 'coming_soon')\n`;
sql += `on conflict do nothing;\n\n`;

// 재료 전체 수집 (카테고리 매핑 포함)
const allIngredients = new Set();
DATA.forEach((d) => d.ingredients.forEach((i) => allIngredients.add(i)));
sql += `-- 재료\n`;
sql += `insert into ingredients (name, category) values\n`;
sql += [...allIngredients]
  .map((i) => `  (${val(i)}, ${val(CATEGORY_MAP[i] || "기타")})`)
  .join(",\n");
sql += `\non conflict (name) do nothing;\n\n`;

// 알레르기 유발물질 전체 수집 (allergy 필드는 "소고기" 또는 "대두, 소고기"처럼 콤마로 구분)
const allAllergens = new Set();
DATA.forEach((d) => {
  if (!d.allergy) return;
  d.allergy.split(",").map((s) => s.trim()).filter(Boolean).forEach((a) => allAllergens.add(a));
});
sql += `-- 알레르기 유발물질\n`;
sql += `insert into allergens (name) values\n`;
sql += [...allAllergens].map((a) => `  (${val(a)})`).join(",\n");
sql += `\non conflict (name) do nothing;\n\n`;

// 제품 + 조인 테이블
sql += `-- 제품\n`;
DATA.forEach((d, idx) => {
  const n = d.nutrition;
  sql += `with p${idx} as (\n`;
  sql += `  insert into products (\n`;
  sql += `    brand_id, name, stage, volume_ml, raw_ingredients_text, product_link,\n`;
  sql += `    serving_label, kcal, sodium_mg, carbs_g, sugar_g, fat_g, trans_fat_g, sat_fat_g, cholesterol_mg, protein_g\n`;
  sql += `  ) values (\n`;
  sql += `    '11111111-1111-1111-1111-111111111111', ${val(d.name)}, ${val(d.stage)}, ${num(d.volume)},\n`;
  sql += `    ${val(d.rawIngredients)}, ${val(d.link)},\n`;
  sql += `    ${val(n?.serving)}, ${num(n?.kcal)}, ${val(n?.sodium)}, ${val(n?.carbs)}, ${val(n?.sugar)},\n`;
  sql += `    ${val(n?.fat)}, ${val(n?.transFat)}, ${val(n?.satFat)}, ${val(n?.cholesterol)}, ${val(n?.protein)}\n`;
  sql += `  ) returning id\n`;
  sql += `)\n`;
  if (d.ingredients.length) {
    sql += `insert into product_ingredients (product_id, ingredient_id, sort_order)\n`;
    sql += `select p${idx}.id, ing.id, x.ord\n`;
    sql += `from p${idx}, ingredients ing,\n`;
    sql += `  (values ${d.ingredients.map((i, o) => `(${val(i)}, ${o})`).join(", ")}) as x(name, ord)\n`;
    sql += `where ing.name = x.name;\n\n`;
  } else {
    sql += `select 1;\n\n`; // ingredients 없는 메뉴는 조인 스킵
  }

  const allergyList = d.allergy ? d.allergy.split(",").map((s) => s.trim()).filter(Boolean) : [];
  if (allergyList.length) {
    sql += `insert into product_allergens (product_id, allergen_id)\n`;
    sql += `select (select id from products where name = ${val(d.name)} order by created_at desc limit 1), alg.id\n`;
    sql += `from allergens alg\n`;
    sql += `where alg.name in (${allergyList.map(val).join(", ")});\n\n`;
  }
});

process.stdout.write(sql);
