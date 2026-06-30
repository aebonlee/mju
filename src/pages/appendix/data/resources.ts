/** 부록 — 함께 공부할 자료 */
export default {
  id: 'resources',
  icon: 'fa-graduation-cap',
  title: '함께 공부할 자료',
  titleEn: 'Study Together',
  sections: [
    {
      title: '과정별 추천 학습 순서',
      titleEn: 'Recommended Learning Path',
      content: `교육이 끝난 뒤에도 스스로 이어서 공부할 수 있도록 순서를 제안합니다.

### 공통 1단계 — 기초 다지기
1. 생성형 AI에 매일 1가지 업무를 맡겨보기(메일 다듬기, 요약 등)
2. \`프롬프트 학습\` 메뉴의 **학습하기 → 실습하기 → 평가하기** 순서로 진행
3. 잘 된 프롬프트는 **나만의 템플릿**으로 저장

### 직무별 2단계 — 심화
| 직무 | 다음에 해볼 것 |
|------|---------------|
| 교수자 | 강의자료·평가 루브릭·피드백 자동화, 맞춤 GPT 만들기 |
| 직원 | 반복 업무 1개를 골라 프롬프트 템플릿화 + 엑셀 자동화 |
| 연구자 | 데이터 정리→분석→논문 초안까지 한 흐름으로 연습 |

> 가장 빠른 성장법은 **내 실제 업무를 소재로** 매일 조금씩 써보는 것입니다.`,
      contentEn: `A path to keep learning after the course ends.

**Stage 1 — Foundations**
1. Give multi-LLM one daily task (polish an email, summarize, etc.).
2. Go through Prompt Learning: Learn → Practice → Evaluate.
3. Save good prompts as your own templates.

**Stage 2 — By role**
| Role | Next step |
|------|-----------|
| Faculty | Automate materials, rubrics, feedback; build a custom GPT. |
| Staff | Templatize one repetitive task + Excel automation. |
| Researcher | Practice data → analysis → draft paper as one flow. |

> Fastest growth: practice a little every day on your real work.`,
    },
    {
      title: '분야별 더 알아보기',
      titleEn: 'Go Deeper by Topic',
      content: `더 공부하고 싶을 때 살펴볼 주제들입니다. (검색어로도 활용하세요)

### 프롬프트·생성형 AI
- 프롬프트 엔지니어링 6원칙, 사고연쇄(Chain of Thought), 맞춤 GPT 설계

### 데이터분석
- 엑셀 함수/피벗, 기술통계의 의미, 적절한 그래프 고르기, 파이썬 입문(선택)

### 논문작성
- IMRaD 구조, 문헌검토 방법, 학술 영어 표현, 인용·연구윤리

### 예산회계
- 예산 편성·정산 절차, 회계 규정 읽는 법, 재무 보고서 구성

### 연구·실험
- 연구질문 설계, IRB 준비, 실험 프로토콜·재현성, 연구노트 관리

> 각 주제를 생성형 AI에게 "초보자용 30분 학습 계획으로 짜줘"라고 부탁해보세요.`,
      contentEn: `Topics to explore further (also usable as search terms).

- **Prompting / GenAI:** 6 principles, chain-of-thought, custom GPTs
- **Data analysis:** Excel functions/pivots, descriptive stats, choosing charts, intro Python
- **Academic writing:** IMRaD, literature review, academic English, citation & ethics
- **Budget/accounting:** budgeting & settlement, reading rules, financial reports
- **Research/experiments:** research questions, IRB, protocols & reproducibility, lab notes

> Ask multi-LLM to "make a 30-minute beginner study plan" for any topic.`,
    },
    {
      title: '혼자서도 잘 하는 연습법',
      titleEn: 'How to Practice Solo',
      content: `- **하루 1프롬프트**: 오늘 한 업무 하나를 AI로 다시 해보기
- **비교 연습**: 막 쓴 프롬프트 vs 구조화한 프롬프트 결과를 나란히 비교
- **평가 습관**: 만든 결과를 "5점 척도로 평가하고 개선점 알려줘"로 점검(평가하기 메뉴 활용)
- **동료와 공유**: 좋은 프롬프트·맞춤 GPT를 팀과 나누기
- **기록**: 효과 본 프롬프트를 메모해 두면 자산이 됩니다

> 막히면 언제든 \`부록 > 용어 해설\`과 \`실전 팁\`으로 돌아오세요.`,
      contentEn: `- **One prompt a day:** redo one task with AI.
- **Compare:** raw prompt vs structured prompt, side by side.
- **Evaluate:** ask AI to "score this 1–5 and suggest improvements."
- **Share:** good prompts/custom GPTs with your team.
- **Record:** keep prompts that worked — they become assets.

> Stuck? Come back to Appendix → Glossary and Practical Tips.`,
    },
  ],
};
