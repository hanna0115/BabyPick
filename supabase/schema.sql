-- 이유식콕 DB 스키마 (Supabase / Postgres)

-- 브랜드
create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,        -- 'elvinz', 'lusol' ...
  status text not null default 'active' check (status in ('active','coming_soon')),
  created_at timestamptz default now()
);

-- 재료 (카테고리를 재료 테이블에 한 번만 저장 → 중복 매핑 제거)
create table ingredients (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,        -- '무', '소고기' ...
  category text not null check (category in ('채소','고기·단백질','유제품','과일','곡물·구황작물','기타'))
);

-- 알레르기 유발물질 (재료와 별개로 관리 — 재료명과 알레르기 표기가 다를 수 있어서)
create table allergens (
  id uuid primary key default gen_random_uuid(),
  name text unique not null          -- '소고기', '대두', '우유' ...
);

-- 메뉴(제품)
create table products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands(id) on delete cascade,
  name text not null,
  stage text not null,               -- '초기1','초기2','중기1','중기2', ...
  volume_ml integer,
  raw_ingredients_text text,         -- 원재료 함량 전체 원문
  product_link text,
  image_url text,

  -- 영양정보 (1회 제공량 기준)
  serving_label text,                -- '1팩(180g)'
  kcal integer,
  sodium_mg numeric,
  carbs_g numeric,
  sugar_g numeric,
  fat_g numeric,
  trans_fat_g numeric,
  sat_fat_g numeric,
  cholesterol_mg numeric,
  protein_g numeric,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 메뉴 ↔ 재료 (다대다)
create table product_ingredients (
  product_id uuid references products(id) on delete cascade,
  ingredient_id uuid references ingredients(id) on delete cascade,
  sort_order integer default 0,
  primary key (product_id, ingredient_id)
);

-- 메뉴 ↔ 알레르기 유발물질 (다대다)
create table product_allergens (
  product_id uuid references products(id) on delete cascade,
  allergen_id uuid references allergens(id) on delete cascade,
  primary key (product_id, allergen_id)
);

-- 크롤링/수기 입력 데이터 검수용 상태 (선택)
alter table products add column review_status text default 'published'
  check (review_status in ('draft','needs_review','published'));

-- 인덱스
create index idx_products_brand on products(brand_id);
create index idx_product_ingredients_ingredient on product_ingredients(ingredient_id);

-- RLS: 프론트엔드에서는 읽기 전용, 쓰기는 서비스키(백엔드/스크립트)로만
alter table brands enable row level security;
alter table ingredients enable row level security;
alter table allergens enable row level security;
alter table products enable row level security;
alter table product_ingredients enable row level security;
alter table product_allergens enable row level security;

create policy "public read" on brands for select using (true);
create policy "public read" on ingredients for select using (true);
create policy "public read" on allergens for select using (true);
create policy "public read" on products for select using (review_status = 'published');
create policy "public read" on product_ingredients for select using (true);
create policy "public read" on product_allergens for select using (true);
