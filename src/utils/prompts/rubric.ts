interface ChatMessage { role: string; content: string; }

export function buildRubricPrompt({ taskName, subject, level, criteria, rubricType, language }: { taskName?: string; subject?: string; level?: string; criteria?: string; rubricType?: string; language?: string }): ChatMessage[] {
  const lang = language === 'ko' ? '한국어' : 'English';

  return [
    {
      role: 'system',
      content: `You are an assessment and evaluation expert in higher education. You create detailed, fair, and measurable rubrics aligned with learning outcomes. Always respond in ${lang}.`,
    },
    {
      role: 'user',
      content: `다음 정보를 바탕으로 4단계 평가 루브릭을 작성해주세요.

## 과제 정보
- **과제명**: ${taskName}
- **교과목**: ${subject || '미지정'}
- **수준**: ${level || '학부'}
- **루브릭 유형**: ${rubricType || '분석적 루브릭 (Analytic Rubric)'}
${criteria ? `- **평가 기준 (요청)**: ${criteria}` : ''}

## 작성 요구사항

### 4단계 평가 수준
- **우수 (Excellent, 4점)**: 기대 수준을 초과하는 성취
- **양호 (Good, 3점)**: 기대 수준을 충족하는 성취
- **보통 (Satisfactory, 2점)**: 기대 수준에 미달하나 기본 요건 충족
- **미흡 (Needs Improvement, 1점)**: 기본 요건 미충족

### 루브릭 표 형식
| 평가 기준 | 우수 (4) | 양호 (3) | 보통 (2) | 미흡 (1) | 배점 |

각 셀에는 구체적이고 측정 가능한 기술(descriptor)을 포함해주세요.

### 추가 포함 사항
1. 총점 계산 방법
2. 등급 환산 기준 (A/B/C/D/F)
3. 피드백 가이드라인

마크다운 표 형식으로 깔끔하게 작성해주세요.`,
    },
  ];
}
