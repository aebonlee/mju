interface ChatMessage { role: string; content: string; }

export function buildAssignmentPrompt({ subject, topic, assignmentType, difficulty, groupSize, duration, objectives, language }: { subject?: string; topic?: string; assignmentType?: string; difficulty?: string; groupSize?: string; duration?: string; objectives?: string; language?: string }): ChatMessage[] {
  const lang = language === 'ko' ? '한국어' : 'English';

  const typeMap: Record<string, string> = {
    individual: '개인 과제',
    group: '그룹 과제',
    research: '연구 과제',
    presentation: '발표 과제',
    project: '프로젝트',
  };

  const difficultyMap: Record<string, string> = {
    basic: '기초',
    intermediate: '중급',
    advanced: '고급',
  };

  return [
    {
      role: 'system',
      content: `You are an expert instructional designer who creates engaging, well-structured assignments for higher education. You focus on active learning and constructive alignment. Always respond in ${lang}.`,
    },
    {
      role: 'user',
      content: `다음 정보를 바탕으로 과제를 설계해주세요.

## 과제 정보
- **교과목**: ${subject}
- **주제**: ${topic || '미지정'}
- **과제 유형**: ${typeMap[assignmentType || ''] || assignmentType || '개인 과제'}
- **난이도**: ${difficultyMap[difficulty || ''] || difficulty || '중급'}
${groupSize ? `- **그룹 규모**: ${groupSize}명` : ''}
${duration ? `- **소요 기간**: ${duration}` : ''}
${objectives ? `- **학습 목표**: ${objectives}` : ''}

## 작성 요구사항

### 1. 과제 개요
- 과제 제목
- 과제 설명 (3-5문장)
- 학습 목표와의 연계

### 2. 과제 지시사항
- 구체적인 수행 단계 (Step by Step)
- 제출물 요구사항
- 형식 및 분량 지정

### 3. 평가 기준
- 간단한 평가 항목과 배점

### 4. 참고자료
- 추천 자료/웹사이트

### 5. 일정
- 마일스톤 또는 중간 점검 일정
${assignmentType === 'group' ? `
### 6. 그룹 활동 가이드
- 역할 분담 방법
- 협업 도구 추천
- 동료 평가 방법` : ''}

마크다운 형식으로 깔끔하게 작성해주세요.`,
    },
  ];
}
