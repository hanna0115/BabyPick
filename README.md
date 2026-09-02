# 이유식콕

## 1. Supabase 프로젝트 준비
1. https://supabase.com 에서 새 프로젝트 생성 (무료 티어로 충분)
2. 프로젝트의 SQL Editor에서 `supabase/schema.sql` 내용을 실행 → 테이블 생성
3. (선택) 기존 엘빈즈 47종 데이터를 넣고 싶다면:
   ```bash
   npm run migrate:seed        # supabase/seed.sql 생성
   ```
   생성된 `supabase/seed.sql` 내용을 SQL Editor에 붙여넣고 실행
4. 이후 신규 데이터(수기 입력/크롤링)는 Supabase 대시보드의 **Table Editor**에서 직접 추가하거나,
   크롤링 스크립트에서 `@supabase/supabase-js` + service role key로 upsert하면 됩니다.

## 2. 환경변수 설정
```bash
cp .env.example .env
```
`.env` 파일을 열어 Supabase 프로젝트 설정(Project Settings → API)에 있는
Project URL과 anon public key를 채워넣으세요.

## 3. 실행
```bash
npm install
npm run dev
```
브라우저에서 안내되는 주소(보통 http://localhost:5173)로 접속.

## 4. 배포용 빌드
```bash
npm run build
```
`dist/` 폴더를 Vercel/Netlify 등에 올리면 됩니다. 배포 시 환경변수(`VITE_SUPABASE_URL`,
`VITE_SUPABASE_ANON_KEY`)를 호스팅 서비스의 환경변수 설정에도 동일하게 등록해야 해요.

## 폴더 구조
```
src/
├─ lib/supabaseClient.js     — Supabase 클라이언트 초기화
├─ hooks/useMenuData.js       — DB에서 브랜드/제품/재료를 불러와 조립
├─ hooks/useDragToClose.js    — 바텀시트 드래그 제스처
├─ components/                — UI 조각들
└─ App.jsx                    — 상태 관리 + 조립
supabase/
├─ schema.sql                 — 테이블 정의 (SQL Editor에 붙여넣기)
└─ migrate-existing-data.mjs  — 기존 하드코딩 데이터 → seed.sql 변환 스크립트
```
