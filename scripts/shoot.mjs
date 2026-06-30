import { chromium } from 'playwright';
const BASE = process.env.URL || 'http://localhost:4173';
const shots = [
  { mode: 'light', path: '/' },
  { mode: 'dark', path: '/' },
  { mode: 'dark', path: '/courses/basic' },
];
const browser = await chromium.launch();
for (const s of shots) {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addCookies([{ name: 'themeMode', value: s.mode, url: BASE }]);
  const page = await ctx.newPage();
  await page.goto(BASE + s.path, { waitUntil: 'networkidle' });
  // AOS 요소 강제 표시
  await page.addStyleTag({ content: '[data-aos]{opacity:1!important;transform:none!important;}' });
  await page.waitForTimeout(800);
  const file = `/tmp/mju_${s.mode}_${s.path.replace(/\W+/g, '_') || 'home'}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log('shot', file);
  await ctx.close();
}
await browser.close();
