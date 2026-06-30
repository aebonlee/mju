/** 부록 — 용어 해설 */
export default {
  id: 'glossary',
  icon: 'fa-book-bookmark',
  title: '용어 해설',
  titleEn: 'Glossary',
  sections: [
    {
      title: '생성형 AI 기본 용어',
      titleEn: 'Generative AI Basics',
      content: `교육에서 자주 등장하는 핵심 용어를 모았습니다. 모르는 말이 나오면 여기에서 찾아보세요.

| 용어 | 쉬운 설명 |
|------|-----------|
| **생성형 AI(Generative AI)** | 글·이미지·코드 등 새로운 결과물을 "만들어내는" 인공지능. 분류·예측 중심의 기존 AI와 달리 창작에 강합니다. |
| **LLM(거대 언어모델)** | 방대한 텍스트로 학습한 언어 AI. ChatGPT, Claude, 생성형 AI의 두뇌에 해당합니다. |
| **생성형 AI** | 명지대 구성원을 위한 교내 전용 AI 플랫폼. **생성형 AI** 기술을 기반으로 하며, 교내 데이터를 비교적 안전하게 다룰 수 있습니다. |
| **프롬프트(Prompt)** | AI에게 주는 지시·질문. 좋은 프롬프트가 좋은 답을 만듭니다. |
| **토큰(Token)** | AI가 글을 처리하는 최소 단위(대략 단어 조각). 사용량·요금의 기준이 됩니다. |
| **환각(Hallucination)** | AI가 사실이 아닌 내용을 그럴듯하게 지어내는 현상. **항상 사실 확인이 필요**합니다. |
| **맥락창(Context Window)** | AI가 한 번에 기억할 수 있는 대화·문서의 분량. 너무 길면 앞부분을 잊습니다. |
| **멀티모달(Multimodal)** | 글뿐 아니라 이미지·표·파일까지 함께 이해하는 능력. |
| **맞춤 GPT** | 특정 업무에 맞게 지시문·자료를 미리 넣어 만든 전용 도우미. |

> 핵심 한 줄: AI는 **똑똑한 조수**일 뿐, 최종 판단과 사실 확인은 사람의 몫입니다.`,
      contentEn: `Key terms that appear throughout the training.

| Term | Plain explanation |
|------|-------------------|
| **Generative AI** | AI that *creates* new text, images, or code. |
| **LLM** | Large Language Model — the "brain" behind ChatGPT, Claude, multi-LLM. |
| **Multi-LLM** | Major generative AI tools (ChatGPT, Claude, Gemini) used for hands-on practice. |
| **Prompt** | The instruction/question you give the AI. |
| **Token** | Smallest unit the AI processes; basis for usage/billing. |
| **Hallucination** | When AI confidently makes up false facts — always verify. |
| **Context Window** | How much the AI can remember at once. |
| **Multimodal** | Ability to understand images/tables/files, not just text. |
| **Custom GPT** | A dedicated assistant pre-loaded with instructions/materials. |

> One line: AI is a smart assistant — final judgment and fact-checking are up to you.`,
    },
    {
      title: '데이터분석 용어',
      titleEn: 'Data Analysis Terms',
      content: `데이터분석·예산회계 과정에서 자주 쓰는 용어입니다.

| 용어 | 쉬운 설명 |
|------|-----------|
| **변수(Variable)** | 측정·기록하는 항목(예: 나이, 점수, 부서). |
| **결측치(Missing Value)** | 비어 있는 값. 분석 전에 처리(삭제·대체) 방법을 정해야 합니다. |
| **이상치(Outlier)** | 다른 값들과 동떨어진 극단값. 입력 오류일 수도, 중요한 신호일 수도 있습니다. |
| **기술통계** | 평균·합계·표준편차처럼 데이터를 "요약"하는 통계. |
| **표준편차** | 값들이 평균에서 얼마나 퍼져 있는지를 나타내는 수치. |
| **상관/인과** | 함께 변한다(상관) ≠ 원인이다(인과). 혼동 주의. |
| **피벗 테이블** | 표 데이터를 행·열·값으로 재구성해 집계하는 도구(엑셀). |
| **시각화** | 숫자를 그래프로 바꿔 한눈에 이해하게 하는 작업. |
| **p값(p-value)** | 결과가 우연일 가능성. 보통 0.05보다 작으면 "유의하다"고 봅니다. |

> 분석의 출발점은 **깨끗한 데이터**입니다. 정리에 시간을 아끼지 마세요.`,
      contentEn: `Common terms for the data analysis and budgeting tracks.

| Term | Plain explanation |
|------|-------------------|
| **Variable** | An item you measure/record (age, score, dept.). |
| **Missing Value** | Empty value; decide how to handle before analysis. |
| **Outlier** | An extreme value far from the rest. |
| **Descriptive stats** | Summaries like mean, sum, standard deviation. |
| **Std. deviation** | How spread out values are around the mean. |
| **Correlation vs causation** | Moving together ≠ one causing the other. |
| **Pivot table** | Excel tool that reshapes/aggregates table data. |
| **p-value** | Probability the result is by chance; <0.05 is often "significant". |

> Analysis starts with clean data — don't skimp on tidying.`,
    },
    {
      title: '연구·논문·행정 용어',
      titleEn: 'Research / Writing / Admin',
      content: `논문작성·연구지원·예산회계에서 등장하는 용어입니다.

| 용어 | 쉬운 설명 |
|------|-----------|
| **IMRaD** | 논문의 표준 구조: 서론(Introduction)-방법(Methods)-결과(Results)-논의(Discussion). |
| **선행연구(문헌검토)** | 내 주제에 대해 이미 나온 연구들을 정리·비교하는 일. |
| **연구 갭(Gap)** | 아직 밝혀지지 않아 내 연구가 채울 수 있는 빈틈. |
| **IRB(연구윤리심의)** | 사람을 대상으로 한 연구의 윤리성을 사전에 심의하는 절차. |
| **프로토콜** | 다른 사람도 똑같이 재현할 수 있게 적은 실험 절차서. |
| **초록(Abstract)** | 논문 전체를 200~300단어로 요약한 글. |
| **산출 근거** | 예산 항목 금액이 왜 그 액수인지 설명하는 계산 근거. |
| **정산·증빙** | 집행한 예산을 영수증 등 증거와 함께 정리·보고하는 일. |
| **집행률** | 편성 예산 대비 실제로 쓴 비율. |

> 용어가 헷갈리면 생성형 AI에 "이 용어를 신입 직원도 알게 쉽게 설명해줘"라고 물어보세요.`,
      contentEn: `Terms for academic writing, research, and budgeting.

| Term | Plain explanation |
|------|-------------------|
| **IMRaD** | Standard paper structure: Introduction-Methods-Results-Discussion. |
| **Literature review** | Organizing/comparing prior studies on your topic. |
| **Research gap** | The unexplored space your study can fill. |
| **IRB** | Ethics review for human-subject research. |
| **Protocol** | A reproducible written experiment procedure. |
| **Abstract** | A 200–300 word summary of the whole paper. |
| **Calculation basis** | Why a budget line is that exact amount. |
| **Settlement/evidence** | Reporting spent budget with receipts. |
| **Execution rate** | Share of budget actually spent vs planned. |

> Stuck on a term? Ask multi-LLM to "explain this so a new staff member understands."`,
    },
  ],
};
