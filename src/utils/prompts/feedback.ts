interface ChatMessage { role: string; content: string; }

export function buildFeedbackPrompt({ studentName, courseName, assignmentName, grade, strengths, improvements, tone, language }: { studentName?: string; courseName?: string; assignmentName?: string; grade?: string; strengths?: string; improvements?: string; tone?: string; language?: string }): ChatMessage[] {
  const lang = language === 'ko' ? '한국어' : 'English';

  const toneMap: Record<string, string> = {
    encouraging: '격려하는',
    constructive: '건설적인',
    formal: '공식적인',
    friendly: '친근한',
  };

  return [
    {
      role: 'system',
      content: `You are an experienced educator who provides thoughtful, personalized feedback to students. Your feedback should be specific, actionable, and motivating. Always respond in ${lang}.`,
    },
    {
      role: 'user',
      content: `다음 정보를 바탕으로 학생 개인화 피드백을 작성해주세요.

## 학생/과제 정보
- **학생 이름**: ${studentName || '학생'}
- **교과목**: ${courseName || '미지정'}
- **과제명**: ${assignmentName || '미지정'}
${grade ? `- **점수/등급**: ${grade}` : ''}
${strengths ? `- **잘한 점**: ${strengths}` : ''}
${improvements ? `- **개선할 점**: ${improvements}` : ''}
- **피드백 톤**: ${toneMap[tone || ''] || tone || '건설적인'}

## 피드백 구성

### 1. 긍정적 피드백 (Strengths)
- 구체적으로 잘한 부분 언급
- 노력과 성장을 인정

### 2. 개선 피드백 (Areas for Improvement)
- 구체적인 개선 방향 제시
- 실행 가능한 제안 포함

### 3. 구체적 조언 (Specific Suggestions)
- 다음 단계에서 시도할 수 있는 구체적인 방법
- 참고 자료나 학습 전략 제안

### 4. 격려 메시지 (Encouragement)
- 학생의 잠재력 인정
- 앞으로의 성장에 대한 기대

마크다운 형식으로 작성해주세요. 학생이 읽었을 때 동기부여가 되도록 작성해주세요.`,
    },
  ];
}
