/**
 * 명지대 로고 후처리 + OG 이미지 생성 (임시 sharp 사용)
 *  1) JPG 흰 배경 → 투명 PNG (네비 라이트모드용)
 *  2) 흰색 녹아웃 PNG (다크 네비/푸터용)
 *  3) OG 이미지(1200x630) 생성
 * 실행: node scripts/process-logos.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOGO = join(__dirname, '..', 'public', 'images', 'logo');
const PUB = join(__dirname, '..', 'public');

const WHITE_THRESHOLD = 238; // 이 값 이상 RGB는 배경(흰색)으로 간주

/** 흰 배경을 투명으로 키잉. white=true 면 남은 픽셀을 흰색으로 녹아웃 */
async function keyWhite(srcRel, outRel, { white = false } = {}) {
  const src = join(LOGO, srcRel);
  const out = join(LOGO, outRel);
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const isWhite = r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD;
    if (isWhite) {
      data[i + 3] = 0; // 투명
    } else if (white) {
      // 어두운 마크를 흰색으로 (다크 배경용 녹아웃) — 알파는 잉크 농도로 보존
      const ink = 255 - Math.min(r, g, b); // 진할수록 큼
      data[i] = 255; data[i + 1] = 255; data[i + 2] = 255;
      data[i + 3] = Math.max(data[i + 3], ink);
    }
  }
  await sharp(data, { raw: { width, height, channels } }).png().toFile(out);
  console.log('✓', outRel);
}

// 1) 투명(원본 컬러) — 라이트 네비용
await keyWhite('logo-horizontal-ko.jpg', 'logo-horizontal-ko.png');
await keyWhite('logo-horizontal.jpg', 'logo-horizontal.png');
// 2) 흰색 녹아웃 — 다크 네비/푸터용
await keyWhite('logo-horizontal-ko.jpg', 'logo-horizontal-ko-white.png', { white: true });
await keyWhite('logo-horizontal.jpg', 'logo-horizontal-white.png', { white: true });

// 3) OG 이미지 (1200x630) — 명지대 네이비 그라데이션 + 흰 나무심볼 + 타이틀
const tree = `
  <g transform="translate(870,210) scale(3.0)">
    <g fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round">
      <line x1="32" y1="50" x2="32" y2="26"/><line x1="32" y1="34" x2="23" y2="27"/><line x1="32" y1="34" x2="41" y2="27"/>
    </g>
    <g fill="#ffffff">
      <ellipse cx="32" cy="18" rx="4.4" ry="5.6"/>
      <ellipse cx="22" cy="22" rx="3.8" ry="5" transform="rotate(-28 22 22)"/>
      <ellipse cx="42" cy="22" rx="3.8" ry="5" transform="rotate(28 42 22)"/>
    </g>
    <g fill="#7CC0EC">
      <ellipse cx="16" cy="28" rx="3.4" ry="4.4" transform="rotate(-45 16 28)"/>
      <ellipse cx="48" cy="28" rx="3.4" ry="4.4" transform="rotate(45 48 28)"/>
      <ellipse cx="26" cy="14" rx="3" ry="4" transform="rotate(-15 26 14)"/>
      <ellipse cx="38" cy="14" rx="3" ry="4" transform="rotate(15 38 14)"/>
    </g>
  </g>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A2A5E"/><stop offset="55%" stop-color="#101B40"/><stop offset="100%" stop-color="#0E3A6B"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="10" fill="#0072CE"/>
  ${tree}
  <text x="150" y="500" font-family="'Noto Sans KR',sans-serif" font-size="26" fill="#7CC0EC" font-weight="700">MYONGJI UNIVERSITY · 2026</text>
  <text x="150" y="215" font-family="'Noto Sans KR',sans-serif" font-size="30" fill="#7CC0EC" font-weight="700">명지대학교 교수학습개발센터</text>
  <text x="150" y="300" font-family="'Noto Sans KR',sans-serif" font-size="68" fill="#ffffff" font-weight="800">교수자 AI 역량 강화</text>
  <text x="150" y="384" font-family="'Noto Sans KR',sans-serif" font-size="68" fill="#ffffff" font-weight="800">온라인 연수</text>
  <text x="150" y="446" font-family="'Noto Sans KR',sans-serif" font-size="28" fill="#BDD3EC" font-weight="500">기초 · 심화 · 전문 3단계 · ADDIE · TPACK · Bloom</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(PUB, 'og-image.png'));
console.log('✓ og-image.png (1200x630)');
