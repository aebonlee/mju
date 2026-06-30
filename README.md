# 명지대학교 교수자 AI 역량 강화 온라인 연수

명지대학교 교원·강사의 **AI 교수역량**을 단계별로 함양하는 온라인 기본 연수 플랫폼입니다.
교수학습개발센터 기획(안)을 기반으로 제작되었습니다.

- 운영 URL: https://mju.dreamitbiz.com
- 설계 모형: **ADDIE** · **TPACK** · **Bloom 신교육목표분류**
- 구성: **기초 · 심화 · 전문** 3과정 × 각 5차시(마이크로러닝)
- 역량 위계: Lv1 AI 도구 이해 → Lv2 수업 활용 → Lv3 전공 융합 → Lv4 연구·산학 적용

## 연수과정

| 과정 | 역량 단계 | 핵심 내용 |
|------|-----------|-----------|
| **기초과정** | Lv1 → Lv2 | 생성형 AI 이해 · 프롬프트 · 윤리 · 강의자료 · 강의계획서 |
| **심화과정** | Lv2 → Lv3 | AI-PBL · 글쓰기·발표 지도 · 평가 루브릭 · 계열별 활용 · 맞춤형 피드백 |
| **전문과정** | Lv3 → Lv4 | 교과목 재설계 · AI 튜터·챗봇 · 캡스톤 · 학습성과 분석 · 우수사례 확산 |

각 차시는 **학습목표 – 주요 내용 – 실습 – 산출물** 구조로, ChatGPT·Claude·Gemini 등
멀티 LLM에 바로 입력하는 예시 프롬프트를 제공합니다.

## 기술 스택

- React 19 · Vite 7 · TypeScript
- React Router 7 · Supabase(공용 프로젝트, `mju_` 프리픽스)
- PortOne(아임포트) 결제 · 구글/카카오 OAuth
- 디자인: cnu 베이스 이식 + **명지대 브랜드 컬러**
  - Myongji Dark Blue (Pantone 2768 C) ≈ `#1A2A5E`
  - Myongji Blue (Pantone 300 C) ≈ `#0072CE`

## 로고

`public/images/logo/` — 공식 명지대학교 로고(가로형/세로형 × 한글/한영 × 일반/컴팩트).
원본은 `public/images/logo/source/`에 보존.

## 개발

```bash
npm install
npm run dev      # 개발 서버 (5174)
npm run build    # 프로덕션 빌드 → dist
npm run deploy   # gh-pages 배포 (predeploy로 자동 빌드)
```

환경변수는 `.env`(gitignored)에 정의하며, 누락 시 코드 내 fallback이 동작합니다.

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_IMP_CODE=imp61949262
VITE_PG_PROVIDER=html5_inicis.MOIkorcom1
```

## 배포

- `gh-pages` 수동 배포(`npm run deploy`) → `gh-pages` 브랜치
- 커스텀 도메인: `public/CNAME` = `mju.dreamitbiz.com` (vite base `/`)

## 후속 작업(DB)

공용 Supabase 프로젝트에 `mju_` 접두 테이블 생성 필요
(`sql/subscription-schema.sql` 참고, 그 외 `mju_orders`/`mju_posts`/`mju_comments`/
`mju_practice_scores` 등 게시판·결제·실습 점수 테이블).

---

원본 기획: 명지대학교 교수학습개발센터 (`mju.pdf`) · 제작: DreamIT Biz
