interface ChatMessage { role: string; content: string; }

export function buildEvaluatorPrompt({ studentSubmission, rubric, assignmentName, courseName, additionalNotes, language }: { studentSubmission?: string; rubric?: string; assignmentName?: string; courseName?: string; additionalNotes?: string; language?: string }): ChatMessage[] {
  const lang = language === 'ko' ? '한국어' : 'English';

  return [
    {
      role: 'system',
      content: `You are a fair and thorough academic evaluator. You assess student work against rubric criteria, providing detailed scores and constructive feedback for each criterion. Be objective and evidence-based. Always respond in ${lang}.`,
    },
    {
      role: 'user',
      content: `다음 학생 과제물을 루브릭 기준에 따라 평가해주세요.

## 과제 정보
- **교과목**: ${courseName || '미지정'}
- **과제명**: ${assignmentName || '미지정'}
${additionalNotes ? `- **참고사항**: ${additionalNotes}` : ''}

## 평가 루브릭
${rubric || '(루브릭이 제공되지 않은 경우, 일반적인 학술 과제 평가 기준을 적용해주세요: 내용의 정확성, 분석의 깊이, 논리적 구성, 표현력, 참고문헌 활용)'}

## 학생 제출물
${studentSubmission || '(제출물이 비어있습니다)'}

## 평가 결과 형식

### 1. 평가 요약
| 평가 기준 | 점수 | 최대 점수 | 비고 |
각 기준별 점수와 간단한 코멘트

### 2. 기준별 상세 피드백
각 평가 기준에 대해:
- **점수 근거**: 왜 해당 점수를 부여했는지
- **잘한 점**: 기준을 충족한 부분
- **개선점**: 부족한 부분과 구체적 개선 방향

### 3. 총점 및 등급
- 총점: X / Y점
- 등급: A/B/C/D/F
- 총평: 전체적인 평가 코멘트

### 4. 개선을 위한 구체적 조언
- 다음 과제에서 개선할 수 있는 구체적 방법 3-5가지

마크다운 표와 서식을 활용하여 깔끔하게 작성해주세요.`,
    },
  ];
}
