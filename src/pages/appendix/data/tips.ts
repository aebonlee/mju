/** 부록 — 실전 팁 */
export default {
  id: 'tips',
  icon: 'fa-lightbulb',
  title: '실전 팁',
  titleEn: 'Practical Tips',
  sections: [
    {
      title: '좋은 답을 얻는 프롬프트 팁',
      titleEn: 'Tips for Better Prompts',
      content: `같은 AI라도 어떻게 묻느냐에 따라 결과가 크게 달라집니다.

### 1) 역할을 정해주기
"너는 대학 행정 25년 경력 전문가야"처럼 역할을 주면 답의 전문성이 올라갑니다.

### 2) 맥락을 충분히
누구에게, 어떤 상황에서, 왜 필요한지 함께 적으세요.

### 3) 출력 형식을 지정
"표로", "5단계 목록으로", "300자 이내로"처럼 형식을 못 박으면 정리된 답이 나옵니다.

### 4) 예시를 한두 개 보여주기(Few-shot)
원하는 스타일의 예시를 주면 AI가 그 결을 따라옵니다.

### 5) 한 번에 완성하려 하지 말기
초안 → "이 부분을 더 공손하게" → "표로 바꿔줘"처럼 **대화로 다듬는 것**이 가장 빠릅니다.

> 만능 템플릿: **[역할] + [맥락] + [요청] + [형식] + [조건]**`,
      contentEn: `The same AI gives very different results depending on how you ask.

1. **Assign a role** — "You are a 25-year admin expert."
2. **Give context** — who, when, why.
3. **Specify format** — "as a table", "5-step list", "under 300 chars".
4. **Show 1–2 examples (few-shot)**.
5. **Iterate** — draft → "make this more polite" → "turn into a table".

> Universal template: **[Role] + [Context] + [Request] + [Format] + [Constraints]**`,
    },
    {
      title: '환각(거짓 정보) 줄이기',
      titleEn: 'Reducing Hallucinations',
      content: `AI는 모르는 것도 자신 있게 답할 수 있습니다. 다음 습관으로 위험을 줄이세요.

- **"확실하지 않으면 모른다고 말해줘"** 를 프롬프트에 넣기
- 숫자·날짜·인용·규정은 **반드시 원문으로 재확인**
- 자료가 있으면 **파일을 첨부**하고 "첨부 내용에 근거해서만 답해줘"라고 지시
- "근거 조항/출처를 함께 보여줘"라고 요청
- 중요한 문서는 사람이 **최종 검토** 후 사용

> 규정·법령·통계 수치는 AI 답을 "초안"으로만 쓰고, 공식 출처로 검증하세요.`,
      contentEn: `AI can answer confidently even when wrong. Reduce risk with these habits.

- Add "say you don't know if unsure" to your prompt.
- Re-verify numbers, dates, quotes, and rules against the source.
- Attach files and say "answer only based on the attachment."
- Ask it to "show the supporting clause/source."
- Always do a final human review for important documents.`,
    },
    {
      title: '파일·데이터 활용 팁',
      titleEn: 'Working with Files & Data',
      content: `- 긴 PDF·한글 문서는 통째로 올리고 "OO 관련 조항만 요약해줘"
- 엑셀 표는 붙여넣고 "경향 3가지, 이상한 값 찾아줘"
- 표를 만들 땐 "엑셀에 붙여넣을 수 있게 탭으로 구분해줘"
- 코드를 받을 땐 "각 줄에 주석을 달아 초보도 이해하게"
- 결과가 길면 "핵심만 3줄로 먼저 요약하고 자세히"

> 개인정보·민감정보는 가능하면 **가린 뒤** 올리고, 교내 정책을 따르세요.`,
      contentEn: `- Upload long PDFs and ask "summarize only the clauses about X."
- Paste Excel tables and ask "find 3 trends and any odd values."
- For tables: "use tab-separated so I can paste into Excel."
- For code: "add comments on each line for beginners."
- For long output: "3-line summary first, then details."

> Mask personal/sensitive info before uploading; follow campus policy.`,
    },
    {
      title: '보안·윤리·저작권',
      titleEn: 'Security, Ethics, Copyright',
      content: `- 학생 개인정보·미공개 연구데이터는 교내 정책에 맞게 신중히 다루기
- AI가 만든 글·코드도 **사실·표절 여부를 검토**한 뒤 사용
- 논문·과제에 AI를 썼다면 학회/기관의 **AI 사용 지침**을 확인하고 필요한 경우 밝히기
- 생성 이미지·자료의 **저작권/라이선스** 확인
- 생성형 AI는 교내 전용이라 일반 ChatGPT보다 데이터 측면에서 안전하지만, 그래도 **민감정보 최소화** 원칙은 동일

> "편리함"과 "책임"은 함께 갑니다. AI는 도구, 판단은 사람.`,
      contentEn: `- Handle student PII and unpublished data per campus policy.
- Review AI-made text/code for accuracy and plagiarism.
- Follow your venue's AI-use guidelines; disclose when required.
- Check copyright/license of generated images/materials.
- multi-LLM is campus-only and safer, but still minimize sensitive data.`,
    },
  ],
};
