-- ============================================================
--  명지대학교 교수자 AI 역량 강화 연수 — Supabase 스키마
--  공용 프로젝트(hcmgdztsgjvzcyxyayaj) 내 mju_ 접두사 테이블
--  Auth(가입/로그인)는 공용 auth.users + user_profiles 사용
--  (구글 이메일 / 카카오 OAuth)
--  실행: Supabase SQL Editor
--  ※ 구독/토큰 관련 테이블은 sql/subscription-schema.sql 참고
-- ============================================================

-- ─────────────────────────────────────────────
-- 1. 주문 / 결제 (PortOne 아임포트)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mju_orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number    TEXT UNIQUE NOT NULL,
  user_id         UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email      TEXT,
  user_name       TEXT,
  user_phone      TEXT,
  total_amount    INTEGER NOT NULL DEFAULT 0,
  payment_method  TEXT,
  payment_status  TEXT NOT NULL DEFAULT 'pending',   -- pending | paid | cancelled
  portone_payment_id TEXT,
  paid_at         TIMESTAMPTZ,
  cancelled_at    TIMESTAMPTZ,
  cancel_reason   TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_mju_orders_user ON mju_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_mju_orders_number ON mju_orders(order_number);

CREATE TABLE IF NOT EXISTS mju_order_items (
  id            BIGSERIAL PRIMARY KEY,
  order_id      UUID NOT NULL REFERENCES mju_orders(id) ON DELETE CASCADE,
  product_title TEXT NOT NULL,
  quantity      INTEGER NOT NULL DEFAULT 1,
  unit_price    INTEGER NOT NULL DEFAULT 0,
  subtotal      INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_mju_order_items_order ON mju_order_items(order_id);

-- ─────────────────────────────────────────────
-- 2. 게시판 (과정별 커뮤니티)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mju_posts (
  id           BIGSERIAL PRIMARY KEY,
  author_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name  TEXT,
  board        TEXT NOT NULL,           -- basic | intermediate | advanced
  category     TEXT NOT NULL DEFAULT 'free', -- question | resource | free | notice
  title        TEXT NOT NULL,
  content      TEXT,
  view_count   INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_mju_posts_board ON mju_posts(board);

CREATE TABLE IF NOT EXISTS mju_comments (
  id           BIGSERIAL PRIMARY KEY,
  post_id      BIGINT NOT NULL REFERENCES mju_posts(id) ON DELETE CASCADE,
  author_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name  TEXT,
  body         TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_mju_comments_post ON mju_comments(post_id);

-- 조회수 증가 RPC (search_path 고정 — 공용 프로젝트 보안)
CREATE OR REPLACE FUNCTION increment_mju_view_count(post_id BIGINT)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE mju_posts SET view_count = view_count + 1 WHERE id = post_id;
$$;

-- ─────────────────────────────────────────────
-- 3. 프롬프트 실습 점수
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mju_practice_scores (
  id           BIGSERIAL PRIMARY KEY,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name    TEXT,
  quiz_score   INTEGER DEFAULT 0,
  eval_score   INTEGER DEFAULT 0,
  write_score  INTEGER DEFAULT 0,
  total_score  INTEGER DEFAULT 0,
  grade        TEXT,
  detail       JSONB,
  created_at   TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_mju_practice_user ON mju_practice_scores(user_id);

-- ─────────────────────────────────────────────
-- 4. AI 교수설계 도구 산출물 (강의계획서·루브릭·과제·피드백·평가)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mju_syllabi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT, payload JSONB, created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS mju_rubrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT, payload JSONB, created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS mju_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT, payload JSONB, created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS mju_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT, payload JSONB, created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS mju_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT, payload JSONB, created_at TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 5. RLS (Row Level Security)
-- ─────────────────────────────────────────────
ALTER TABLE mju_orders          ENABLE ROW LEVEL SECURITY;
ALTER TABLE mju_order_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE mju_posts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE mju_comments        ENABLE ROW LEVEL SECURITY;
ALTER TABLE mju_practice_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE mju_syllabi         ENABLE ROW LEVEL SECURITY;
ALTER TABLE mju_rubrics         ENABLE ROW LEVEL SECURITY;
ALTER TABLE mju_assignments     ENABLE ROW LEVEL SECURITY;
ALTER TABLE mju_feedback        ENABLE ROW LEVEL SECURITY;
ALTER TABLE mju_evaluations     ENABLE ROW LEVEL SECURITY;

-- 주문: 본인 것만 (결제 플로우는 anon도 insert 허용)
DROP POLICY IF EXISTS mju_orders_insert ON mju_orders;
CREATE POLICY mju_orders_insert ON mju_orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS mju_orders_select ON mju_orders;
CREATE POLICY mju_orders_select ON mju_orders FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
DROP POLICY IF EXISTS mju_orders_update ON mju_orders;
CREATE POLICY mju_orders_update ON mju_orders FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS mju_order_items_all ON mju_order_items;
CREATE POLICY mju_order_items_all ON mju_order_items FOR ALL USING (true) WITH CHECK (true);

-- 게시판: 누구나 읽기, 로그인 사용자만 작성, 작성자 본인만 삭제
DROP POLICY IF EXISTS mju_posts_select ON mju_posts;
CREATE POLICY mju_posts_select ON mju_posts FOR SELECT USING (true);
DROP POLICY IF EXISTS mju_posts_insert ON mju_posts;
CREATE POLICY mju_posts_insert ON mju_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
DROP POLICY IF EXISTS mju_posts_delete ON mju_posts;
CREATE POLICY mju_posts_delete ON mju_posts FOR DELETE USING (auth.uid() = author_id);

DROP POLICY IF EXISTS mju_comments_select ON mju_comments;
CREATE POLICY mju_comments_select ON mju_comments FOR SELECT USING (true);
DROP POLICY IF EXISTS mju_comments_insert ON mju_comments;
CREATE POLICY mju_comments_insert ON mju_comments FOR INSERT WITH CHECK (auth.uid() = author_id);
DROP POLICY IF EXISTS mju_comments_delete ON mju_comments;
CREATE POLICY mju_comments_delete ON mju_comments FOR DELETE USING (auth.uid() = author_id);

-- 실습 점수 / AI 산출물: 본인 데이터만
DROP POLICY IF EXISTS mju_practice_own ON mju_practice_scores;
CREATE POLICY mju_practice_own ON mju_practice_scores FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS mju_syllabi_own ON mju_syllabi;
CREATE POLICY mju_syllabi_own ON mju_syllabi FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS mju_rubrics_own ON mju_rubrics;
CREATE POLICY mju_rubrics_own ON mju_rubrics FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS mju_assignments_own ON mju_assignments;
CREATE POLICY mju_assignments_own ON mju_assignments FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS mju_feedback_own ON mju_feedback;
CREATE POLICY mju_feedback_own ON mju_feedback FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS mju_evaluations_own ON mju_evaluations;
CREATE POLICY mju_evaluations_own ON mju_evaluations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================
--  ▶ 인증(가입/로그인) 설정 — Supabase Dashboard에서 1회 설정
--    1) Authentication > Providers > Google : 사용 설정
--    2) Authentication > Providers > Kakao  : 사용 설정
--       (scopes: profile_nickname, profile_image, account_email)
--    3) Authentication > URL Configuration > Redirect URLs 에
--       https://mju.dreamitbiz.com  추가 (OAuth 콜백 허용)
--    ※ 공용 auth.users 트리거가 있다면 search_path=public 고정 필수
--      (사이트별 핸들러 search_path 누락 시 전체 가입 마비 사례 있음)
-- ============================================================
