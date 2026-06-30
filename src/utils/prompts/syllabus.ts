interface ChatMessage { role: string; content: string; }

export function buildSyllabusPrompt({ courseName, department, level, credits, weeks, objectives, textbook, language }: { courseName?: string; department?: string; level?: string; credits?: number | string; weeks?: number | string; objectives?: string; textbook?: string; language?: string }): ChatMessage[] {
  const lang = language === 'ko' ? '한국어' : 'English';

  return [
    {
      role: 'system',
      content: `You are an expert instructional designer and curriculum developer for higher education. You specialize in creating detailed, standards-aligned syllabi based on Bloom's Taxonomy and Constructive Alignment principles. Always respond in ${lang}.`,
    },
    {
      role: 'user',
      content: `다음 정보를 바탕으로 ${weeks}주차 강의계획서를 작성해주세요.

## 과목 정보
- **과목명**: ${courseName}
- **학과/전공**: ${department || '미지정'}
- **수준**: ${level || '학부'}
- **학점**: ${credits || 3}학점
${objectives ? `- **교육 목표**: ${objectives}` : ''}
${textbook ? `- **교재**: ${textbook}` : ''}

## 작성 요구사항

### 1. 과목 개요
- 과목 설명 (2-3문장)
- 선수과목 권장사항

### 2. 교과목 학습성과 (CLO: Course Learning Outcomes)
- CLO 4-6개 작성
- 각 CLO는 Bloom's Taxonomy 수준 명시 (기억, 이해, 적용, 분석, 평가, 창조)
- 측정 가능한 동사 사용

### 3. ${weeks}주차 수업 계획
각 주차별로 다음을 포함:
| 주차 | 주제 | 학습 내용 | 학습 활동 | 관련 CLO | 과제/평가 |

### 4. 평가 계획
| 평가 항목 | 비율(%) | 평가 방법 | 관련 CLO |

### 5. 교재 및 참고자료
- 주교재
- 부교재/참고자료

### 6. 수업 정책
- 출석, 과제 제출, 학업 윤리 등

마크다운 표 형식으로 깔끔하게 작성해주세요.`,
    },
  ];
}
