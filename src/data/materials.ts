export interface MaterialCategory {
  id: string;
  nameKo: string;
  nameEn: string;
  icon: string;
  descKo: string;
  descEn: string;
}

export interface MaterialItem {
  id: string;
  categoryId: string;
  nameKo: string;
  nameEn: string;
  type: 'guide' | 'template' | 'reference';
  contentKo: string;
  contentEn: string;
}

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  { id: 'basic', nameKo: '기초과정 자료', nameEn: 'Basic', icon: 'fa-seedling', descKo: '생성형 AI 도구 이해와 프롬프트 작성·강의자료 제작 학습자료입니다.', descEn: 'Materials on understanding AI tools, prompt writing, and lecture material creation.' },
  { id: 'intermediate', nameKo: '심화과정 자료', nameEn: 'Intermediate', icon: 'fa-diagram-project', descKo: 'AI 기반 수업설계·평가·맞춤형 피드백 학습자료입니다.', descEn: 'Materials on AI-based instructional design, assessment, and feedback.' },
  { id: 'advanced', nameKo: '전문과정 자료', nameEn: 'Advanced', icon: 'fa-rocket', descKo: '교과목 재설계·AI 튜터·학습성과 분석 등 고도 활용 학습자료입니다.', descEn: 'Materials on course redesign, AI tutors, and learning analytics.' },
];

export const MATERIALS: MaterialItem[] = [
  // ═══════════════════════════════════════
  //  AI 기초
  // ═══════════════════════════════════════
  {
    id: 'ai-overview',
    categoryId: 'basic',
    nameKo: '생성형 AI 개요',
    nameEn: 'Generative AI Overview',
    type: 'guide',
    contentKo: `## 생성형 AI란?

생성형 AI(Generative AI)는 텍스트, 이미지, 코드, 음악 등 새로운 콘텐츠를 생성할 수 있는 인공지능 기술입니다. 기존 AI가 분류나 예측에 초점을 맞췄다면, 생성형 AI는 **창작**에 초점을 맞춥니다.

### 핵심 기술: 대규모 언어 모델(LLM)

생성형 AI의 핵심은 **대규모 언어 모델(Large Language Model)**입니다.

- **학습 방식**: 인터넷의 방대한 텍스트 데이터를 학습하여 언어의 패턴과 구조를 이해
- **작동 원리**: 입력된 텍스트(프롬프트)를 바탕으로 다음에 올 가장 적절한 단어를 예측하여 문장 생성
- **트랜스포머 아키텍처**: 2017년 Google이 발표한 "Attention Is All You Need" 논문이 기반

### 주요 AI 모델

| 모델 | 개발사 | 특징 |
|------|--------|------|
| GPT-4o | OpenAI | 범용 최강, 멀티모달, 코드 생성 우수 |
| Claude 3.5 | Anthropic | 긴 문맥(200K), 정확한 분석, 안전성 |
| Gemini 1.5 | Google | Google 서비스 통합, 100만 토큰 문맥 |
| Copilot | Microsoft | Office 365 통합, 업무 생산성 |

### 교육 분야 활용 사례

1. **강의 설계**: AI로 학습 목표, 강의계획서, 평가 루브릭 생성
2. **자료 제작**: 퀴즈, 시험문제, 보충 학습자료 자동 생성
3. **학생 피드백**: 과제에 대한 개인화된 피드백 자동 작성
4. **연구 보조**: 논문 요약, 문헌 검토, 데이터 분석 지원
5. **행정 자동화**: 공문서 초안, 회의록 정리, 보고서 작성

### 생성형 AI 발전 타임라인

- **2017년**: 트랜스포머 아키텍처 발표 (Google)
- **2020년**: GPT-3 출시 (OpenAI)
- **2022년 11월**: ChatGPT 출시 - AI 대중화의 시작
- **2023년 3월**: GPT-4 출시, Claude 출시
- **2023년 12월**: Gemini 출시 (Google)
- **2024년**: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro 등 경쟁 심화
- **2025년**: AI 에이전트 시대 본격화

### 주의사항

- **환각(Hallucination)**: AI가 사실이 아닌 정보를 생성할 수 있음 → 반드시 검증 필요
- **저작권**: AI 생성물의 저작권 문제는 아직 법적으로 명확하지 않음
- **개인정보**: 민감한 개인정보를 AI에 입력하지 않도록 주의
- **학술 윤리**: AI 활용 시 출처 명시 및 학교 정책 준수 필요`,
    contentEn: `## What is Generative AI?

Generative AI refers to artificial intelligence that can create new content such as text, images, code, and music. While traditional AI focused on classification and prediction, generative AI focuses on **creation**.

### Core Technology: Large Language Models (LLM)

- **Training**: Learns patterns from massive text data across the internet
- **How it works**: Predicts the most appropriate next word based on input (prompt)
- **Transformer architecture**: Based on Google's 2017 "Attention Is All You Need" paper

### Key AI Models

| Model | Company | Strengths |
|-------|---------|-----------|
| GPT-4o | OpenAI | General purpose, multimodal, strong code generation |
| Claude 3.5 | Anthropic | Long context (200K), accurate analysis, safety |
| Gemini 1.5 | Google | Google integration, 1M token context |
| Copilot | Microsoft | Office 365 integration, productivity |

### Use Cases in Education

1. **Course Design**: Generate learning objectives, syllabi, rubrics
2. **Material Creation**: Auto-generate quizzes, exams, supplementary materials
3. **Student Feedback**: Personalized feedback on assignments
4. **Research Support**: Paper summaries, literature reviews, data analysis
5. **Administration**: Draft official documents, meeting minutes, reports

### Important Considerations

- **Hallucination**: AI may generate false information — always verify
- **Copyright**: Legal status of AI-generated content is still evolving
- **Privacy**: Never input sensitive personal data into AI
- **Academic integrity**: Follow institutional policies on AI use`,
  },
  {
    id: 'chatgpt-guide',
    categoryId: 'basic',
    nameKo: 'ChatGPT 활용법',
    nameEn: 'How to Use ChatGPT',
    type: 'guide',
    contentKo: `## ChatGPT 시작하기

ChatGPT는 OpenAI가 개발한 대화형 AI 서비스로, 전 세계에서 가장 널리 사용되는 생성형 AI입니다.

### 가입 및 설정

1. **회원가입**: [chat.openai.com](https://chat.openai.com) 접속 → Google/Microsoft/Apple 계정으로 간편 가입
2. **요금제 선택**:
   - **Free**: GPT-4o mini 무제한, GPT-4o 제한적 사용
   - **Plus ($20/월)**: GPT-4o 확장, DALL-E, 고급 데이터 분석
   - **Team ($25/월)**: 팀 협업, 관리자 콘솔, 더 높은 사용량
3. **기본 설정**: 설정 → 한국어 인터페이스 선택, 커스텀 지시사항 설정

### 핵심 기능

#### 1. 텍스트 대화
\`\`\`
프롬프트 예시:
"대학교 1학년 대상 '인공지능 개론' 수업의 15주차 강의계획서를 작성해주세요.
각 주차별로 주제, 학습목표, 수업활동, 과제를 포함해주세요."
\`\`\`

#### 2. 이미지 생성 (DALL-E)
- 수업 자료용 다이어그램, 인포그래픽 생성
- 프레젠테이션 삽입 이미지 제작

#### 3. 코드 인터프리터 (고급 데이터 분석)
- Excel/CSV 파일 업로드 → 자동 분석 및 시각화
- 성적 데이터 통계 분석, 설문조사 결과 차트 생성
- Python 코드 자동 실행

#### 4. GPTs (맞춤형 AI)
- 특정 목적에 맞는 맞춤형 ChatGPT 생성
- 예: "강의계획서 전문가", "학술 논문 리뷰어"

### 교수자를 위한 활용 팁

1. **커스텀 지시사항 설정**: "나는 명지대학교 교수이며, 한국어로 응답해주세요. 교육학적 관점을 반영해주세요."
2. **대화 기록 정리**: 유용한 대화는 즐겨찾기로 저장
3. **파일 활용**: 강의자료 PDF를 업로드하여 요약/퀴즈 생성
4. **반복 프롬프트**: 자주 사용하는 프롬프트는 메모장에 저장해두고 재활용

### GPT-4o vs GPT-4o mini 비교

| 항목 | GPT-4o | GPT-4o mini |
|------|--------|-------------|
| 성능 | 최상위 | 우수 |
| 속도 | 빠름 | 매우 빠름 |
| 비용 | Plus 필요 | 무료 |
| 이미지 인식 | O | O |
| 추천 용도 | 복잡한 분석/작문 | 간단한 질의/브레인스토밍 |`,
    contentEn: `## Getting Started with ChatGPT

ChatGPT is OpenAI's conversational AI service and the most widely used generative AI globally.

### Setup
1. Sign up at [chat.openai.com](https://chat.openai.com)
2. **Pricing**: Free (GPT-4o mini), Plus ($20/mo for GPT-4o, DALL-E), Team ($25/mo)
3. Set language preferences and custom instructions

### Key Features
1. **Text Conversations** — Course planning, content creation, Q&A
2. **Image Generation (DALL-E)** — Diagrams, infographics for lectures
3. **Code Interpreter** — Upload Excel/CSV for automatic analysis
4. **GPTs** — Create custom ChatGPT for specific purposes

### Tips for Educators
- Set custom instructions with your role context
- Upload lecture PDFs for summarization and quiz generation
- Save frequently used prompts for reuse
- Use GPT-4o for complex tasks, GPT-4o mini for quick queries`,
  },
  {
    id: 'claude-guide',
    categoryId: 'basic',
    nameKo: 'Claude 활용법',
    nameEn: 'How to Use Claude',
    type: 'guide',
    contentKo: `## Claude 소개

Claude는 Anthropic이 개발한 AI 어시스턴트로, **안전성**과 **정확성**에 중점을 둡니다. 특히 긴 문서 분석과 학술 작업에 강점을 보입니다.

### 가입 및 요금

1. **가입**: [claude.ai](https://claude.ai) 접속 → Google/이메일 가입
2. **요금제**:
   - **Free**: Claude 3.5 Sonnet 제한적 사용
   - **Pro ($20/월)**: 5배 사용량, Claude 3.5 Opus, Projects, Artifacts
   - **Team ($25/월)**: 팀 협업, 관리자 기능

### Claude만의 핵심 기능

#### 1. Projects (프로젝트)
- 관련 문서와 지시사항을 하나의 프로젝트로 묶어 관리
- 예: "2024-2학기 인공지능개론" 프로젝트에 강의계획서, 교재 PDF, 평가 기준 등을 업로드
- 프로젝트 내 대화는 해당 문맥을 자동 참조

\`\`\`
프로젝트 활용 예시:
1. 프로젝트 생성: "명지대 AI교육 2024"
2. 문서 업로드: 강의계획서.pdf, 학생목록.csv, 교재요약.pdf
3. 커스텀 지시: "교수자 관점에서 답변하고, 블룸 분류학을 반영하세요"
4. 대화 시작: "이번 학기 중간고사 문제를 출제해주세요"
\`\`\`

#### 2. Artifacts (아티팩트)
- AI가 생성한 문서, 코드, 차트를 별도 패널에 실시간 표시
- 마크다운 문서, HTML 페이지, React 컴포넌트 등 다양한 형식 지원
- 생성물을 바로 복사하거나 다운로드 가능

#### 3. 긴 문맥 처리 (200K 토큰)
- 약 500페이지 분량의 문서를 한 번에 분석 가능
- 논문 전문 분석, 교재 전체 요약, 대량 데이터 처리에 적합
- ChatGPT 대비 약 1.5배 긴 문맥 지원

### 학술 작업에서의 강점

1. **논문 분석**: 논문 PDF 업로드 → 핵심 주장, 방법론, 한계점 요약
2. **루브릭 설계**: 블룸 분류학 기반의 체계적 평가 기준 생성
3. **피드백 작성**: 학생 과제를 업로드하면 건설적이고 구체적인 피드백 생성
4. **번역/교정**: 학술 논문의 영한/한영 번역 및 교정

### ChatGPT와의 비교

| 항목 | Claude | ChatGPT |
|------|--------|---------|
| 문맥 길이 | 200K 토큰 | 128K 토큰 |
| 학술 정확도 | 매우 높음 | 높음 |
| 이미지 생성 | X | O (DALL-E) |
| 프로젝트 관리 | Projects | GPTs |
| 코드 실행 | Artifacts | Code Interpreter |
| 웹 검색 | O (제한적) | O |`,
    contentEn: `## Introduction to Claude

Claude is Anthropic's AI assistant focused on **safety** and **accuracy**, with strengths in long document analysis and academic work.

### Key Features
1. **Projects**: Bundle related documents and instructions into a managed project
2. **Artifacts**: Real-time display of generated documents, code, charts in a side panel
3. **Long Context (200K tokens)**: Analyze ~500 pages at once

### Academic Strengths
- Paper analysis: Upload PDFs for key argument summaries
- Rubric design: Bloom's taxonomy-based assessment criteria
- Feedback writing: Constructive feedback on student assignments
- Translation/proofreading: Academic paper translation

### Claude vs ChatGPT
| Feature | Claude | ChatGPT |
|---------|--------|---------|
| Context | 200K tokens | 128K tokens |
| Image Gen | No | Yes (DALL-E) |
| Projects | Projects | GPTs |
| Code Exec | Artifacts | Code Interpreter |`,
  },
  {
    id: 'gemini-guide',
    categoryId: 'basic',
    nameKo: 'Gemini 활용법',
    nameEn: 'How to Use Gemini',
    type: 'guide',
    contentKo: `## Google Gemini 소개

Gemini는 Google DeepMind가 개발한 멀티모달 AI로, **Google 생태계와의 완벽한 통합**이 최대 장점입니다.

### 가입 및 요금

1. **가입**: [gemini.google.com](https://gemini.google.com) → Google 계정으로 바로 사용
2. **요금제**:
   - **Free**: Gemini 1.5 Flash 기본 사용
   - **Advanced ($19.99/월)**: Gemini 1.5 Pro, 100만 토큰, Google One 2TB 포함

### 핵심 기능

#### 1. Google Workspace 통합
- **Gmail**: 이메일 요약, 답장 초안 자동 생성
- **Google Docs**: 문서 내에서 직접 AI 활용 (초안 작성, 교정, 요약)
- **Google Sheets**: 수식 자동 생성, 데이터 분석, 차트 추천
- **Google Slides**: 프레젠테이션 자동 생성, 디자인 추천
- **Google Meet**: 실시간 회의 요약, 액션 아이템 추출

\`\`\`
활용 예시: Google Docs에서
1. 빈 문서 열기
2. "Help me write" 클릭
3. "명지대학교 AI 교육 프로그램 제안서를 작성해줘" 입력
4. AI가 초안 생성 → 수정/보완
\`\`\`

#### 2. 멀티모달 기능
- **이미지 인식**: 수업 자료 사진을 촬영하여 텍스트 변환
- **PDF 분석**: Google Drive의 PDF를 직접 분석
- **비디오 이해**: YouTube 동영상 내용 요약 (Gemini Advanced)

#### 3. Google 검색 통합
- 실시간 웹 정보를 반영한 최신 답변
- 출처 링크 자동 제공 → 검증 용이

### 대학 행정에서의 활용

1. **공지사항 작성**: Gmail에서 학생/교직원 대상 공지 초안 생성
2. **회의 준비**: Google Calendar 일정에서 안건 자동 정리
3. **데이터 분석**: Sheets에 성적 데이터 → 분포 분석, 차트 자동 생성
4. **프레젠테이션**: Slides에서 교육 보고 자료 자동 생성

### Gemini의 강점과 한계

**강점**:
- Google 서비스 사용자에게 가장 편리한 접근성
- 100만 토큰 문맥으로 초대량 문서 처리 가능
- 실시간 검색 통합으로 최신 정보 반영
- Google One 2TB 클라우드 저장소 포함 (Advanced)

**한계**:
- 한국어 성능이 ChatGPT/Claude 대비 다소 부족
- 이미지 생성 기능이 제한적
- Workspace 통합은 유료 플랜에서만 완전 지원`,
    contentEn: `## Google Gemini Overview

Gemini is Google DeepMind's multimodal AI with seamless Google ecosystem integration.

### Key Features
1. **Google Workspace Integration**: Gmail, Docs, Sheets, Slides, Meet
2. **Multimodal**: Image recognition, PDF analysis, video understanding
3. **Google Search Integration**: Real-time web information with source links

### University Administration Use Cases
- Draft announcements in Gmail
- Auto-summarize meetings from Calendar
- Analyze grade data in Sheets
- Generate presentation slides automatically

### Strengths & Limitations
**Strengths**: Best for Google users, 1M token context, real-time search
**Limitations**: Korean performance slightly behind GPT/Claude, limited image generation`,
  },
  {
    id: 'ai-comparison',
    categoryId: 'basic',
    nameKo: 'AI 서비스 비교',
    nameEn: 'AI Service Comparison',
    type: 'reference',
    contentKo: `## 주요 AI 서비스 종합 비교

### 기본 정보 비교

| 항목 | ChatGPT | Claude | Gemini | Copilot |
|------|---------|--------|--------|---------|
| **개발사** | OpenAI | Anthropic | Google | Microsoft |
| **최신 모델** | GPT-4o | Claude 3.5 Sonnet | Gemini 1.5 Pro | GPT-4 기반 |
| **무료 사용** | O (제한) | O (제한) | O (제한) | O (제한) |
| **유료 가격** | $20/월 | $20/월 | $19.99/월 | $20/월 |
| **한국어 성능** | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★☆ |

### 기능 비교

| 기능 | ChatGPT | Claude | Gemini | Copilot |
|------|---------|--------|--------|---------|
| **문맥 길이** | 128K | 200K | 1M | 128K |
| **이미지 생성** | O (DALL-E) | X | O (제한) | O (DALL-E) |
| **이미지 인식** | O | O | O | O |
| **파일 업로드** | O | O | O | O |
| **웹 검색** | O | O (제한) | O | O (Bing) |
| **코드 실행** | O | Artifacts | X | X |
| **플러그인/확장** | GPTs | Projects | Extensions | Plugins |

### 용도별 추천

#### 교수자에게 추천
- **강의계획서 작성**: Claude (정확한 구조화) 또는 ChatGPT (범용)
- **시험문제 출제**: ChatGPT (다양한 유형) 또는 Claude (정확성)
- **학생 피드백**: Claude (섬세한 분석) > ChatGPT
- **연구 논문 분석**: Claude (긴 문서) > ChatGPT > Gemini

#### 직원에게 추천
- **공문서 작성**: ChatGPT 또는 Claude
- **데이터 분석**: ChatGPT (Code Interpreter) > Gemini (Sheets)
- **이메일 작성**: Gemini (Gmail 통합) > ChatGPT
- **PPT 제작**: Gemini (Slides) 또는 Copilot (PowerPoint)

#### 조교에게 추천
- **채점 보조**: Claude (루브릭 기반) > ChatGPT
- **학습자료 제작**: ChatGPT (다양한 형식) > Claude
- **학생 질의 대응**: ChatGPT (빠른 응답) > Claude

### 비용 효율성 분석

| 시나리오 | 추천 서비스 | 이유 |
|----------|------------|------|
| 예산 없음 | ChatGPT Free + Gemini Free | 무료 조합으로 대부분 커버 |
| 개인 사용 ($20) | ChatGPT Plus | 가장 범용적 |
| 학술 중심 ($20) | Claude Pro | 긴 문서, 정확한 분석 |
| Google 중심 ($20) | Gemini Advanced | Workspace 통합 |
| 최대 활용 ($40) | ChatGPT Plus + Claude Pro | 용도별 최적 조합 |

### 실전 팁

1. **무료 버전부터 시작**: 각 서비스의 무료 버전을 모두 사용해보고 자신에게 맞는 것 선택
2. **목적별 사용**: 하나의 서비스에 의존하지 말고, 작업 유형에 맞게 사용
3. **결과 교차 검증**: 중요한 내용은 2개 이상의 AI에서 확인
4. **프롬프트 재활용**: 효과적인 프롬프트를 발견하면 다른 AI에서도 시도`,
    contentEn: `## AI Service Comparison

### Overview

| Feature | ChatGPT | Claude | Gemini | Copilot |
|---------|---------|--------|--------|---------|
| **Company** | OpenAI | Anthropic | Google | Microsoft |
| **Price** | $20/mo | $20/mo | $19.99/mo | $20/mo |
| **Context** | 128K | 200K | 1M | 128K |
| **Image Gen** | DALL-E | No | Limited | DALL-E |
| **Korean** | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★☆ |

### Recommendations by Role
- **Faculty**: Claude for accuracy, ChatGPT for versatility
- **Staff**: Gemini for Google integration, ChatGPT for documents
- **TAs**: ChatGPT for speed, Claude for grading

### Cost-Effective Combinations
- Free: ChatGPT Free + Gemini Free
- $20: ChatGPT Plus (most versatile) or Claude Pro (academic focus)
- $40: ChatGPT Plus + Claude Pro (best of both)`,
  },

  // ═══════════════════════════════════════
  //  문서 자동화
  // ═══════════════════════════════════════
  {
    id: 'official-doc-guide',
    categoryId: 'intermediate',
    nameKo: '공문서 작성 가이드',
    nameEn: 'Official Document Guide',
    type: 'guide',
    contentKo: `## AI를 활용한 공문서 작성

대학 행정에서 공문서 작성은 빈번하지만 시간이 많이 소요되는 업무입니다. AI를 활용하면 초안 작성 시간을 크게 단축할 수 있습니다.

### 공문서 작성 프롬프트 공식

\`\`\`
[문서 유형]을 작성해주세요.

- 발신: [발신 부서/기관명]
- 수신: [수신 부서/기관명]
- 제목: [문서 제목]
- 주요 내용: [핵심 전달 사항]
- 톤앤매너: 공식적, 격식체
- 형식: 대학교 공문서 양식
\`\`\`

### 문서 유형별 프롬프트 예시

#### 1. 협조 공문
\`\`\`
명지대학교 교무처에서 각 학과로 보내는 협조 공문을 작성해주세요.

제목: 2024학년도 2학기 강의평가 시행 협조 요청
내용:
- 강의평가 기간: 2024.12.2 ~ 12.13
- 대상: 전 학과 개설 교과목
- 참여율 목표: 80% 이상
- 각 학과에서 학생 참여 독려 요청
형식: 대학 내부 공문서 양식
\`\`\`

#### 2. 보고서
\`\`\`
명지대학교 AI교육센터의 연간 사업 보고서를 작성해주세요.

포함 항목:
1. 사업 개요 (목적, 기간, 예산)
2. 추진 실적 (교육 횟수, 참여 인원, 만족도)
3. 성과 분석 (정량적/정성적)
4. 향후 계획
데이터: 교육 12회, 참여자 500명, 만족도 4.5/5.0
\`\`\`

#### 3. 제안서
\`\`\`
명지대학교에 "생성형 AI 교수학습 지원 프로그램" 도입을 제안하는 문서를 작성해주세요.

포함 사항:
- 프로그램 필요성 (현황 분석)
- 프로그램 구성 (대상별 맞춤 교육)
- 기대 효과 (정량적 목표)
- 소요 예산 및 일정
- 타 대학 사례 참고
\`\`\`

### 작성 시 주의사항

**해야 할 것 (Do)**:
- AI 초안을 반드시 검토하고 수정
- 기관 고유의 서식과 용어에 맞게 조정
- 수치와 날짜는 직접 확인 후 입력
- 결재라인에 맞는 경어체 사용

**하지 말아야 할 것 (Don't)**:
- AI 생성물을 그대로 제출하지 않기
- 민감한 개인정보(주민번호 등)를 AI에 입력하지 않기
- AI가 생성한 법적 조항이나 규정을 검증 없이 인용하지 않기
- 기밀 문서 내용을 AI에 입력하지 않기`,
    contentEn: `## AI-Assisted Official Document Writing

### Prompt Formula
\`\`\`
Write a [document type].
- From: [department]
- To: [recipient]
- Subject: [title]
- Key content: [main points]
- Tone: Formal, official
\`\`\`

### Document Types
1. **Cooperation Letters**: Internal requests between departments
2. **Reports**: Annual/quarterly performance reports
3. **Proposals**: New program proposals with budget and timeline

### Do's and Don'ts
**Do**: Review AI drafts, adjust to institutional format, verify facts
**Don't**: Submit without review, input sensitive data, cite unverified regulations`,
  },
  {
    id: 'meeting-minutes',
    categoryId: 'intermediate',
    nameKo: '회의록 정리 가이드',
    nameEn: 'Meeting Minutes Guide',
    type: 'template',
    contentKo: `## AI를 활용한 회의록 작성

### 회의록 작성 워크플로우

1. **녹음**: 회의 내용을 녹음 (스마트폰 또는 노트북)
2. **음성→텍스트 변환**: AI 도구로 텍스트 변환
3. **구조화**: AI로 주요 안건, 결정사항, 액션아이템 추출
4. **검토 및 보완**: 내용 확인 후 최종 정리

### 음성 인식 도구

| 도구 | 한국어 | 가격 | 특징 |
|------|--------|------|------|
| **네이버 클로바노트** | ★★★★★ | 무료/유료 | 한국어 최적화, 화자 분리 |
| **Otter.ai** | ★★☆☆☆ | $16.99/월 | 영어 최강, 실시간 전사 |
| **다글로** | ★★★★★ | 유료 | 한국어 특화, 요약 기능 |
| **Whisper (OpenAI)** | ★★★★☆ | 무료 | 오픈소스, 다국어 지원 |

### AI 회의록 정리 프롬프트

\`\`\`
다음은 회의 녹취록입니다. 아래 형식으로 회의록을 정리해주세요.

[회의록 형식]
1. 회의 개요 (일시, 장소, 참석자)
2. 주요 안건 (번호별 정리)
3. 논의 내용 (안건별 핵심 발언 요약)
4. 결정 사항 (확정된 내용)
5. 액션 아이템 (담당자, 기한 포함)
6. 다음 회의 일정

[녹취록]
(여기에 녹취록 붙여넣기)
\`\`\`

### 회의록 템플릿

\`\`\`markdown
# 회의록

## 회의 개요
- **회의명**:
- **일시**: 2024년 월 일 (요일) 00:00 ~ 00:00
- **장소**:
- **참석자**:
- **작성자**:

## 주요 안건
1.
2.
3.

## 논의 내용
### 안건 1:
-

### 안건 2:
-

## 결정 사항
| 번호 | 내용 | 비고 |
|------|------|------|
| 1 |  |  |
| 2 |  |  |

## 액션 아이템
| 번호 | 내용 | 담당자 | 기한 |
|------|------|--------|------|
| 1 |  |  |  |
| 2 |  |  |  |

## 다음 회의
- **일시**:
- **안건**:
\`\`\`

### 효율적인 회의록 작성 팁

1. **실시간 기록**: 클로바노트로 회의 중 실시간 전사
2. **핵심 태그**: 중요한 결정 시점에 "결정사항" 태그 추가
3. **빠른 배포**: AI 정리 후 30분 내에 참석자에게 공유
4. **후속 관리**: 액션아이템은 다음 회의 시작 시 점검`,
    contentEn: `## AI-Powered Meeting Minutes

### Workflow
1. Record the meeting
2. Convert speech to text using AI tools
3. Structure with AI: agenda, decisions, action items
4. Review and finalize

### Speech-to-Text Tools
- **Clova Note**: Best for Korean, free tier available
- **Otter.ai**: Best for English, real-time transcription
- **Whisper (OpenAI)**: Open-source, multilingual

### Meeting Minutes Template
Use the structured template with: Overview, Agenda, Discussion, Decisions, Action Items, Next Meeting.`,
  },
  {
    id: 'ppt-generation',
    categoryId: 'intermediate',
    nameKo: 'PPT 자동 생성',
    nameEn: 'Auto PPT Generation',
    type: 'guide',
    contentKo: `## AI로 프레젠테이션 자동 제작

### AI PPT 생성 도구 비교

| 도구 | 가격 | 한국어 | 특징 |
|------|------|--------|------|
| **Gamma** | 무료/Pro $10/월 | O | 가장 완성도 높은 AI PPT |
| **Canva AI** | 무료/Pro $12.99/월 | O | 디자인 템플릿 풍부 |
| **SlidesGPT** | 무료 | O | ChatGPT 기반, 간편 |
| **Beautiful.ai** | $12/월 | △ | 자동 레이아웃 |
| **Tome** | 무료/Pro $16/월 | O | 스토리텔링 중심 |

### Gamma AI 활용법 (추천)

#### 단계별 가이드

1. **접속**: [gamma.app](https://gamma.app) → 구글 계정 로그인
2. **새 프레젠테이션 생성**: "Generate" 클릭
3. **프롬프트 입력**:

\`\`\`
명지대학교 생성형 AI 교육 프로그램 소개 프레젠테이션을 만들어주세요.

슬라이드 구성:
1. 표지: 프로그램명, 명지대학교 로고 위치
2. 목차
3. AI 교육의 필요성 (통계 데이터 포함)
4. 프로그램 개요 (대상: 교수자, 직원, 조교)
5. 교육과정 소개 (교수자 4과목, 직원 4과목, 조교 3과목)
6. AI 도구 실습 내용 (5개 도구)
7. 기대 효과
8. 일정 및 신청 방법
9. Q&A

스타일: 전문적, 깔끔한 디자인, 파란색 계열
\`\`\`

4. **AI 생성 결과 확인**: 슬라이드별 내용과 디자인 검토
5. **수정**: 텍스트 편집, 이미지 교체, 레이아웃 조정
6. **내보내기**: PPT/PDF 다운로드

#### 수정 프롬프트

\`\`\`
3번 슬라이드에 다음 통계를 추가해주세요:
- 대학교 AI 도입률: 78% (2024년 기준)
- AI 활용 교수 비율: 45%
- 학생 AI 활용 만족도: 4.2/5.0
\`\`\`

### Canva AI 활용법

1. [canva.com](https://canva.com) 접속 → 프레젠테이션 선택
2. "Magic Design" 기능으로 주제 입력
3. AI가 추천하는 템플릿 중 선택
4. "Magic Write"로 슬라이드별 텍스트 자동 생성
5. "Magic Image"로 관련 이미지 생성/삽입

### 효과적인 PPT 프롬프트 작성 팁

1. **구조 명시**: 슬라이드 수와 각 슬라이드의 목적을 명확히
2. **데이터 제공**: 포함할 수치, 통계 데이터를 미리 정리
3. **스타일 지정**: 컬러, 폰트, 분위기 등 디자인 방향 제시
4. **청중 명시**: 누구에게 발표하는지 알려주면 톤 조절 가능`,
    contentEn: `## AI Presentation Generation

### Top Tools
- **Gamma**: Best overall AI PPT tool (gamma.app)
- **Canva AI**: Rich design templates
- **SlidesGPT**: Simple ChatGPT-based generation

### Gamma Step-by-Step
1. Visit gamma.app and sign in
2. Click "Generate" for new presentation
3. Enter detailed prompt with slide structure
4. Review and edit generated slides
5. Export as PPT/PDF

### Tips
- Specify slide count and purpose for each
- Provide data/statistics to include
- Describe desired style and color scheme
- Mention your audience for tone adjustment`,
  },
  {
    id: 'excel-automation',
    categoryId: 'advanced',
    nameKo: 'Excel 수식 자동화',
    nameEn: 'Excel Formula Automation',
    type: 'guide',
    contentKo: `## AI를 활용한 Excel 업무 자동화

### AI로 Excel 수식 생성하기

복잡한 Excel 수식을 직접 작성하는 대신, AI에게 원하는 결과를 설명하면 수식을 자동 생성합니다.

#### 수식 생성 프롬프트 공식

\`\`\`
다음 조건에 맞는 Excel 수식을 만들어주세요.

- 데이터 위치: [시트명, 셀 범위]
- 원하는 결과: [계산/분석 내용]
- 조건: [필터링 조건]
- 출력 형식: [숫자/텍스트/날짜]
\`\`\`

### 자주 사용하는 수식 예시

#### 1. 성적 처리
\`\`\`
B열에 중간고사(100점), C열에 기말고사(100점), D열에 과제(50점)가 있습니다.
E열에 총점(중간 30% + 기말 40% + 과제 30%)을 계산하고,
F열에 학점(A+: 95이상, A0: 90이상, B+: 85이상, B0: 80이상,
C+: 75이상, C0: 70이상, D: 60이상, F: 60미만)을 부여하는 수식을 만들어주세요.
\`\`\`

**AI 생성 결과**:
\`\`\`excel
E2: =B2*0.3 + C2*0.4 + D2*0.3
F2: =IFS(E2>=95,"A+", E2>=90,"A0", E2>=85,"B+", E2>=80,"B0", E2>=75,"C+", E2>=70,"C0", E2>=60,"D", TRUE,"F")
\`\`\`

#### 2. 출석 관리
\`\`\`
A열에 학생 이름, B~P열에 15주차 출석 데이터가 있습니다.
(O: 출석, X: 결석, L: 지각)
Q열에 출석 횟수, R열에 결석 횟수, S열에 출석률(%)을 계산하는 수식을 만들어주세요.
\`\`\`

#### 3. 피벗 테이블 분석
\`\`\`
학과별, 학년별 수강생 수를 집계하는 피벗 테이블 생성 방법을 단계별로 알려주세요.
데이터: A열(학번), B열(이름), C열(학과), D열(학년), E열(수강과목)
\`\`\`

### ChatGPT Code Interpreter 활용

ChatGPT Plus에서 Excel/CSV 파일을 직접 업로드하면:

1. **자동 분석**: 데이터 구조 파악 및 기술 통계 제공
2. **시각화**: 차트/그래프 자동 생성
3. **이상치 탐지**: 데이터의 오류나 이상값 발견
4. **보고서 생성**: 분석 결과를 요약한 보고서 출력

\`\`\`
프롬프트: "이 성적 데이터를 분석해주세요.
1. 과목별 평균, 중앙값, 표준편차를 계산해주세요.
2. 성적 분포를 히스토그램으로 시각화해주세요.
3. 학과별 성적 차이를 박스플롯으로 비교해주세요.
4. 분석 결과를 요약해주세요."
\`\`\`

### VBA 매크로 자동 생성

반복 작업을 자동화하는 VBA 매크로도 AI로 생성할 수 있습니다.

\`\`\`
매월 각 학과에서 제출하는 보고서 Excel 파일 10개를
하나의 종합 시트로 병합하는 VBA 매크로를 작성해주세요.
조건: 각 파일의 "데이터" 시트에서 2행부터 마지막 행까지 복사
\`\`\``,
    contentEn: `## Excel Automation with AI

### Formula Generation
Ask AI to create formulas by describing what you need:
- Grade calculation with weighted scores
- Attendance tracking and statistics
- Pivot table analysis

### ChatGPT Code Interpreter
Upload Excel/CSV files for:
- Automatic statistical analysis
- Chart/graph visualization
- Anomaly detection
- Summary report generation

### VBA Macro Generation
AI can write VBA macros for repetitive tasks like merging multiple Excel files.`,
  },

  // ═══════════════════════════════════════
  //  행정 업무
  // ═══════════════════════════════════════
  {
    id: 'hr-automation',
    categoryId: 'advanced',
    nameKo: '인사 문서 자동화',
    nameEn: 'HR Document Automation',
    type: 'guide',
    contentKo: `## AI를 활용한 인사 문서 자동화

### 채용공고 작성

\`\`\`
명지대학교 AI교육센터에서 연구원을 채용하는 공고문을 작성해주세요.

채용 정보:
- 직위: 연구원 (계약직, 1년)
- 분야: 인공지능/교육공학
- 인원: 1명
- 자격요건: 석사 이상, AI 관련 연구 경험
- 우대사항: Python 프로그래밍, LLM 활용 경험
- 근무조건: 주 40시간, 명지대학교 내 근무
- 접수기간: 2024.12.01 ~ 12.31
- 제출서류: 이력서, 자기소개서, 연구실적목록

공식적이고 전문적인 톤으로, 대학교 채용공고 양식에 맞게 작성해주세요.
\`\`\`

### 교육 안내문 작성

\`\`\`
명지대학교 전 교직원 대상 AI 리터러시 교육 안내문을 작성해주세요.

교육 정보:
- 교육명: 2024 생성형 AI 활용 역량 강화 교육
- 대상: 전임교원, 비전임교원, 직원, 조교
- 일정: 2024년 12월 매주 화/목 14:00-17:00
- 장소: AI융합교육관 201호
- 내용: AI 기초, 프롬프트 엔지니어링, 업무 자동화
- 신청: 포털시스템 → 교육신청
- 문의: AI교육센터 (062-530-XXXX)

안내문에 교육 수료 시 혜택(수료증 발급, 업적평가 반영)도 포함해주세요.
\`\`\`

### 업무평가서 작성 보조

\`\`\`
다음 직원의 업무 데이터를 바탕으로 업무평가서 초안을 작성해주세요.

직원 정보:
- 소속: 교무처 학사지원팀
- 직급: 주무관

주요 실적:
1. 학사 시스템 AI 챗봇 도입 프로젝트 관리 (완료)
2. 수강신청 매뉴얼 개편 (학생 만족도 20% 향상)
3. 학적 데이터 정비 (오류율 5% → 0.5%)
4. 신입생 OT 프로그램 기획 및 운영

평가 항목: 업무수행능력, 적극성, 협업능력, 전문성 발전
각 항목별 5점 척도 평가와 종합 의견을 작성해주세요.
\`\`\`

### 자주 사용하는 인사 문서 프롬프트

| 문서 유형 | 프롬프트 키워드 |
|----------|---------------|
| 채용공고 | "채용공고 작성, 자격요건, 우대사항, 접수방법" |
| 교육안내 | "교육 안내문, 일정, 대상, 신청방법, 혜택" |
| 업무평가 | "업무평가서, 실적 기반, 5점 척도, 종합의견" |
| 인수인계 | "인수인계서, 업무목록, 진행현황, 유의사항" |
| 출장보고 | "출장보고서, 일정, 방문기관, 성과, 후속조치" |`,
    contentEn: `## HR Document Automation with AI

### Common HR Documents
1. **Job Postings**: Provide position details, qualifications, and format requirements
2. **Training Announcements**: Include schedule, target audience, benefits
3. **Performance Reviews**: Provide achievement data for AI to draft evaluations
4. **Handover Documents**: Task lists, status, and important notes

### Tips
- Always provide specific data and context
- Review AI outputs for accuracy and policy compliance
- Never input sensitive personal information`,
  },
  {
    id: 'data-analysis-basics',
    categoryId: 'advanced',
    nameKo: '데이터 분석 기초',
    nameEn: 'Data Analysis Basics',
    type: 'guide',
    contentKo: `## AI를 활용한 기초 데이터 분석

### 데이터 분석이 필요한 행정 업무

- 수강 현황 분석 (학과별, 학년별 수강생 분포)
- 강의평가 결과 분석 (교과목별 평균, 추이)
- 예산 집행 현황 분석 (항목별 비율, 전년 대비)
- 교직원 연수 참여율 분석
- 학생 취업률/진학률 통계

### ChatGPT로 데이터 분석하기

#### 1단계: 데이터 준비
- Excel/CSV 파일로 데이터 정리
- 열 이름을 명확하게 설정 (한국어 가능)
- 비어있는 셀이나 오류 데이터 사전 정리

#### 2단계: 분석 요청 프롬프트

\`\`\`
이 데이터를 분석해주세요.

분석 요청:
1. 기술 통계 (평균, 중앙값, 표준편차, 최소/최대)
2. 학과별 비교 분석
3. 전년 대비 증감률 계산
4. 주요 인사이트 3가지 도출
5. 시각화: 막대그래프, 원형차트 생성

결과를 한국어로 작성하고, 보고서에 바로 사용할 수 있는 형태로 정리해주세요.
\`\`\`

#### 3단계: 시각화 요청

\`\`\`
다음 차트를 만들어주세요:
1. 학과별 수강생 수 막대그래프 (내림차순)
2. 학년별 비율 원형차트
3. 최근 5년간 수강생 추이 꺾은선 그래프

차트에 한국어 레이블을 사용하고, 색상은 파란색 계열로 통일해주세요.
\`\`\`

### 보고서 작성 프롬프트

\`\`\`
위 분석 결과를 바탕으로 보고서를 작성해주세요.

보고서 형식:
1. 요약 (Executive Summary) - 3줄 이내
2. 분석 배경 및 목적
3. 분석 방법 및 데이터 범위
4. 주요 분석 결과 (표와 차트 포함)
5. 시사점 및 제언
6. 첨부: 상세 데이터 표

대학 행정 보고서에 적합한 공식적인 문체로 작성해주세요.
\`\`\`

### 자주 사용하는 분석 프롬프트

| 분석 유형 | 프롬프트 |
|----------|---------|
| 비교 분석 | "A그룹과 B그룹의 차이를 분석해주세요" |
| 추이 분석 | "최근 5년간 변화 추이를 분석해주세요" |
| 분포 분석 | "데이터의 분포를 히스토그램으로 보여주세요" |
| 상관 분석 | "두 변수 간의 상관관계를 분석해주세요" |
| 이상치 탐지 | "데이터에서 이상값을 찾아주세요" |`,
    contentEn: `## Basic Data Analysis with AI

### Common Administrative Analysis Tasks
- Enrollment statistics, course evaluation analysis, budget tracking, employment rates

### Steps
1. **Prepare data** in Excel/CSV format
2. **Upload to ChatGPT** Code Interpreter
3. **Request analysis** with specific metrics
4. **Request visualizations** (bar charts, pie charts, line graphs)
5. **Generate report** in formal format

### Useful Analysis Prompts
- Comparison: "Compare groups A and B"
- Trends: "Analyze 5-year trends"
- Distribution: "Show histogram of data"
- Correlation: "Analyze relationship between variables"`,
  },
  {
    id: 'workflow-design',
    categoryId: 'advanced',
    nameKo: '업무 워크플로우 설계',
    nameEn: 'Workflow Design',
    type: 'guide',
    contentKo: `## AI 기반 업무 워크플로우 설계

### 자동화 대상 업무 식별

업무 자동화의 첫 단계는 **반복적이고 규칙적인 업무**를 식별하는 것입니다.

#### 자동화 적합도 평가 기준

| 기준 | 높음 (자동화 적합) | 낮음 (수동 유지) |
|------|-------------------|-----------------|
| **반복성** | 매주/매일 반복 | 비정기적 |
| **규칙성** | 명확한 규칙 존재 | 판단력 필요 |
| **데이터 형식** | 정형화된 데이터 | 비정형 데이터 |
| **소요 시간** | 2시간 이상/회 | 30분 미만/회 |
| **오류 가능성** | 수작업 오류 빈번 | 오류 발생 적음 |

### 대학 행정 자동화 사례

#### 1. 수강신청 문의 응대 자동화
\`\`\`
현재 프로세스:
  학생 문의 → 담당자 확인 → 수동 답변 → 평균 30분/건

AI 자동화 프로세스:
  학생 문의 → AI 챗봇 1차 응대 → 해결 불가 시 담당자 연결
  예상 효과: 70% 문의 자동 처리, 담당자 업무 시간 60% 절감
\`\`\`

#### 2. 강의평가 결과 보고서 자동화
\`\`\`
현재 프로세스:
  데이터 추출 → Excel 정리 → 차트 생성 → 보고서 작성 → 3일/회

AI 자동화 프로세스:
  데이터 추출 → AI 자동 분석/시각화/보고서 생성 → 검토
  예상 효과: 작업 시간 3일 → 2시간, 분석 품질 향상
\`\`\`

#### 3. 회의 후속 업무 자동화
\`\`\`
현재 프로세스:
  회의 → 수기 기록 → 회의록 작성 → 액션아이템 추적 (수동)

AI 자동화 프로세스:
  회의 녹음 → AI 전사/정리 → 자동 액션아이템 추출 → 리마인더
  예상 효과: 회의록 작성 시간 90% 절감, 후속조치 이행률 향상
\`\`\`

### ROI 계산 방법

\`\`\`
AI 자동화 ROI 계산:

투자 비용:
- AI 도구 구독: $20/월 × 12개월 = $240/년
- 초기 설정 시간: 8시간 × 시급 = ???

절감 효과:
- 자동화 전 소요시간: 주 10시간
- 자동화 후 소요시간: 주 2시간
- 절감 시간: 주 8시간 × 52주 = 416시간/년
- 시급 환산: 416시간 × 시급 = ???

ROI = (절감 효과 - 투자 비용) / 투자 비용 × 100%
\`\`\`

### 워크플로우 설계 프롬프트

\`\`\`
다음 업무의 AI 자동화 워크플로우를 설계해주세요.

업무명: [업무명]
현재 프로세스: [단계별 설명]
소요 시간: [현재 소요 시간]
빈도: [주/월/분기]
사용 도구: [현재 사용 도구]

다음을 포함해주세요:
1. 현재 vs 개선 프로세스 비교
2. 필요한 AI 도구 추천
3. 단계별 구현 방법
4. 예상 효과 (시간 절감, 품질 향상)
5. 구현 일정 및 주의사항
\`\`\``,
    contentEn: `## AI Workflow Design

### Identifying Automation Candidates
Evaluate tasks based on: repetitiveness, rule-based nature, data format, time consumption, error frequency.

### University Administration Examples
1. Student inquiry chatbot (70% auto-resolution)
2. Course evaluation report automation (3 days → 2 hours)
3. Meeting follow-up automation (90% time savings)

### ROI Calculation
Compare investment costs (tool subscriptions, setup time) vs savings (hours saved × hourly rate).`,
  },
  {
    id: 'admin-prompt-library',
    categoryId: 'advanced',
    nameKo: '업무용 프롬프트 모음',
    nameEn: 'Prompt Library',
    type: 'template',
    contentKo: `## 행정 업무용 프롬프트 라이브러리

업무 상황별로 바로 사용할 수 있는 프롬프트 모음입니다.

### 문서 작성

#### 1. 공지사항 작성
\`\`\`
명지대학교 [부서명]에서 [대상]에게 보내는 공지사항을 작성해주세요.
제목: [공지 제목]
내용: [핵심 전달 사항]
기간: [관련 기간]
문의처: [담당자, 연락처]
톤: 공식적이면서 친절한 문체
\`\`\`

#### 2. 이메일 답변 초안
\`\`\`
다음 이메일에 대한 답변 초안을 작성해주세요.
원본 이메일: [이메일 내용 붙여넣기]
답변 방향: [핵심 답변 내용]
톤: 정중하고 전문적인
\`\`\`

#### 3. 보고서 요약
\`\`\`
다음 보고서의 핵심 내용을 1페이지로 요약해주세요.
포함 항목: 목적, 주요 성과, 수치 데이터, 향후 계획
형식: 글머리 기호 사용, 핵심 수치는 굵은 글씨로 강조
[보고서 전문 붙여넣기]
\`\`\`

### 데이터 처리

#### 4. 엑셀 수식 요청
\`\`\`
[데이터 설명]에 대한 Excel 수식을 만들어주세요.
입력 데이터: [셀 범위, 데이터 유형]
원하는 결과: [계산 내용]
조건: [필터링/조건 설명]
\`\`\`

#### 5. 데이터 정리
\`\`\`
다음 데이터를 정리해주세요.
[데이터 붙여넣기]
정리 방향:
- 중복 제거
- 형식 통일 (날짜: YYYY-MM-DD, 전화번호: 010-XXXX-XXXX)
- 빈 값 표시
- 정렬: [정렬 기준]
\`\`\`

### 기획/분석

#### 6. 사업계획서 초안
\`\`\`
[사업명] 사업계획서 초안을 작성해주세요.
목적: [사업 목적]
대상: [대상 그룹]
기간: [사업 기간]
예산: [총 예산 규모]
포함 항목: 추진 배경, 목표, 세부 계획, 기대 효과, 예산안
\`\`\`

#### 7. 설문지 설계
\`\`\`
[조사 주제]에 대한 설문지를 설계해주세요.
대상: [응답 대상]
문항 수: [원하는 문항 수]
유형: 5점 리커트 척도 위주, 서술형 2-3문항 포함
포함 주제: [세부 주제 나열]
\`\`\`

#### 8. SWOT 분석
\`\`\`
[분석 대상]에 대한 SWOT 분석을 수행해주세요.
배경 정보: [관련 정보 제공]
각 항목별 3-5개의 요인을 도출하고,
SO/WO/ST/WT 전략을 각 2개씩 제안해주세요.
\`\`\`

### 커뮤니케이션

#### 9. 회의 안건 정리
\`\`\`
다음 내용을 바탕으로 회의 안건을 정리해주세요.
[관련 내용/이슈 나열]
형식: 안건별 제목, 배경, 논의사항, 예상 소요시간
회의 시간: [총 회의 시간]에 맞게 조절
\`\`\`

#### 10. 축사/인사말 작성
\`\`\`
[행사명]에서 [직위]가 하는 [축사/인사말]을 작성해주세요.
행사 성격: [행사 설명]
참석 대상: [참석자]
시간: [인사말 시간] 분 분량
포함 내용: [핵심 메시지]
톤: 격식체, 따뜻하면서도 격려하는 톤
\`\`\`

### 활용 팁

1. **[대괄호]** 안의 내용을 실제 업무 내용으로 교체하여 사용
2. 결과가 만족스럽지 않으면 "더 공식적으로", "더 간결하게" 등으로 수정 요청
3. 자주 사용하는 프롬프트는 메모장에 저장하여 재활용
4. 민감한 개인정보는 반드시 제거 후 입력`,
    contentEn: `## Administrative Prompt Library

Ready-to-use prompts organized by task type:

### Document Writing
- Announcements, email replies, report summaries

### Data Processing
- Excel formulas, data cleaning

### Planning/Analysis
- Business plans, survey design, SWOT analysis

### Communication
- Meeting agendas, speeches/greetings

### Usage Tips
- Replace [brackets] with actual content
- Request tone adjustments as needed
- Save frequently used prompts
- Remove sensitive data before input`,
  },

  // ═══════════════════════════════════════
  //  프롬프트 엔지니어링
  // ═══════════════════════════════════════
  {
    id: 'rcf-framework',
    categoryId: 'basic',
    nameKo: 'RCF 프레임워크',
    nameEn: 'RCF Framework',
    type: 'guide',
    contentKo: `## RCF 프레임워크: 효과적인 프롬프트의 3요소

RCF는 **Role(역할)**, **Context(맥락)**, **Format(형식)**의 약자로, 프롬프트 작성의 기본 구조를 제공합니다.

### R - Role (역할)

AI에게 특정 역할을 부여하여 답변의 관점과 전문성을 설정합니다.

\`\`\`
예시:
- "당신은 20년 경력의 대학교 교수학습센터 전문가입니다."
- "당신은 교육공학 박사이자 AI 교육 컨설턴트입니다."
- "당신은 대학 행정 업무에 정통한 사무관입니다."
\`\`\`

**역할 설정의 효과**:
- 전문적인 용어와 관점으로 답변
- 해당 분야의 관행과 규범을 반영
- 일관된 톤과 깊이 유지

### C - Context (맥락)

배경 정보, 제약 조건, 목적을 명확히 제공합니다.

\`\`\`
예시:
- "명지대학교 공과대학에서 1학년 100명 대상 수업입니다."
- "이 보고서는 교육부에 제출할 중간보고서입니다."
- "예산은 500만원이고, 기간은 3개월입니다."
\`\`\`

**맥락 제공의 요소**:
- **누구를 위한 것인가** (대상/독자)
- **어떤 상황인가** (배경/제약)
- **왜 필요한가** (목적/의도)
- **어떤 수준인가** (전문성/난이도)

### F - Format (형식)

원하는 출력물의 형식을 구체적으로 지정합니다.

\`\`\`
예시:
- "표 형식으로 정리해주세요."
- "5개의 글머리 기호로 요약해주세요."
- "500자 이내로 작성해주세요."
- "마크다운 형식으로 헤더와 하위 항목을 포함해주세요."
\`\`\`

### RCF 통합 예시

#### 예시 1: 강의계획서 작성
\`\`\`
[Role] 당신은 교육공학 전문가이자 대학 강의 설계 컨설턴트입니다.

[Context] 명지대학교 경영학과 3학년 대상 "AI와 비즈니스" 교과목의
15주차 강의계획서를 작성해야 합니다. 수강생은 약 40명이며,
AI 관련 사전 지식이 없는 학생들입니다. 실습 중심의 수업을 원합니다.

[Format] 다음 형식으로 작성해주세요:
- 각 주차별: 주제, 학습목표(행동동사 사용), 수업방법, 과제
- 평가 계획: 비율과 방법
- 참고교재 및 자료
- 표 형식으로 정리
\`\`\`

#### 예시 2: 업무 보고서
\`\`\`
[Role] 당신은 대학 행정 실무에 정통한 보고서 작성 전문가입니다.

[Context] 명지대학교 AI교육센터의 2024년 상반기 사업 보고서를
작성해야 합니다. 센터장이 대학본부 보고용으로 사용할 예정입니다.
교육 실적: 6회, 참여자 250명, 만족도 4.6/5.0, 예산 집행률 85%

[Format]
- A4 3페이지 분량
- 사업 개요, 추진 실적, 성과 분석, 하반기 계획 순서
- 핵심 수치는 표로 정리
- 시사점 3가지를 도출
\`\`\`

### RCF 활용 체크리스트

- [ ] Role: AI에게 명확한 역할/전문성을 부여했는가?
- [ ] Context: 충분한 배경 정보를 제공했는가?
- [ ] Context: 대상/목적/제약을 명시했는가?
- [ ] Format: 원하는 출력 형식을 지정했는가?
- [ ] Format: 분량/길이를 지정했는가?`,
    contentEn: `## RCF Framework: 3 Elements of Effective Prompts

**R**ole - **C**ontext - **F**ormat

### Role
Assign a specific expertise to the AI.

### Context
Provide background, constraints, purpose, and audience.

### Format
Specify desired output structure, length, and style.

### Example
\`\`\`
[Role] You are an education technology expert.
[Context] Design a 15-week syllabus for 40 business students with no AI background.
[Format] Table format with weekly topics, objectives, activities, and assignments.
\`\`\``,
  },
  {
    id: 'role-based-prompt',
    categoryId: 'basic',
    nameKo: '역할 기반 프롬프트',
    nameEn: 'Role-Based Prompting',
    type: 'guide',
    contentKo: `## 역할 기반 프롬프트 기법

### 역할 부여의 원리

AI에게 특정 역할을 부여하면, 그 역할에 맞는 지식, 관점, 어조로 답변합니다. 이를 **페르소나 설정**이라고도 합니다.

### 효과적인 역할 설정 공식

\`\`\`
당신은 [경력/자격]을 가진 [전문 분야]의 [직위]입니다.
[추가 특성: 소통 스타일, 가치관, 전문 영역]
\`\`\`

### 교육 분야 역할 예시

#### 1. 교수학습 전문가
\`\`\`
당신은 20년 경력의 교육공학 교수이자 교수학습센터 소장입니다.
블룸의 분류학, 역량기반교육, 플립러닝에 정통하며,
실제 대학 현장에서 교수법 컨설팅을 수백 건 수행한 경험이 있습니다.
실용적이고 구체적인 조언을 제공합니다.
\`\`\`

#### 2. 학술 논문 리뷰어
\`\`\`
당신은 SCI급 학술지의 편집위원이자 심사위원입니다.
연구 방법론, 통계 분석, 논리적 구성에 대해 엄격하면서도
건설적인 피드백을 제공합니다. APA 7판 양식에 정통합니다.
\`\`\`

#### 3. 학생 멘토
\`\`\`
당신은 대학생 학습 코칭 전문가입니다.
학생의 입장에서 이해하기 쉽게 설명하되,
학문적 깊이를 잃지 않는 설명을 합니다.
격려하면서도 정확한 정보를 제공합니다.
\`\`\`

### 다중 역할 활용법

하나의 주제를 여러 관점에서 분석할 때 유용합니다.

\`\`\`
다음 교육 정책을 3가지 관점에서 분석해주세요.

1. [교수자 관점] 수업 현장에서의 실행 가능성과 영향
2. [학생 관점] 학습 경험과 성과에 미치는 영향
3. [행정 관점] 예산, 인력, 시스템 측면의 고려사항

각 관점별로 장점 3가지, 우려사항 2가지, 제안 1가지를 제시해주세요.
\`\`\`

### 역할 기반 프롬프트 패턴

| 상황 | 역할 설정 | 효과 |
|------|----------|------|
| 강의 설계 | 교수학습 컨설턴트 | 교육학 이론 기반 설계 |
| 논문 작성 | 학술지 편집위원 | 엄격한 학술적 기준 적용 |
| 학생 상담 | 학습 코치 | 이해하기 쉬운 설명 |
| 행정 문서 | 대학 행정 전문가 | 공식 문서 형식 준수 |
| 프로그램 기획 | 교육 프로그램 기획자 | 체계적 커리큘럼 설계 |
| 데이터 분석 | 교육 데이터 분석가 | 통계적 해석과 인사이트 |

### 주의사항

1. **과도한 역할 설정 지양**: 핵심적인 전문성만 명시
2. **일관성 유지**: 대화 중 역할이 바뀌지 않도록 주의
3. **실재하는 역할 사용**: AI가 이해할 수 있는 구체적인 직업/직위 사용
4. **윤리적 역할만 설정**: 불법적이거나 비윤리적인 역할 부여 금지`,
    contentEn: `## Role-Based Prompting

### Principle
Assigning a specific role makes AI respond with appropriate expertise, perspective, and tone.

### Formula
"You are a [qualification] [title] in [field]. [Additional traits]"

### Education Role Examples
1. Teaching & learning expert with 20 years experience
2. Academic journal reviewer
3. Student mentor and learning coach

### Multi-Perspective Analysis
Ask AI to analyze from multiple viewpoints (faculty, student, administration).

### Best Practices
- Keep role descriptions focused on key expertise
- Maintain consistency throughout the conversation
- Use realistic, specific roles`,
  },
  {
    id: 'chain-of-thought',
    categoryId: 'basic',
    nameKo: '단계적 프롬프트 (Chain of Thought)',
    nameEn: 'Step-by-Step Prompting',
    type: 'guide',
    contentKo: `## 단계적 프롬프트 기법

### Chain of Thought (CoT) 란?

복잡한 문제를 해결할 때, AI에게 **단계별로 생각하도록 유도**하는 기법입니다. "생각의 사슬"이라고도 부르며, 추론 정확도를 크게 향상시킵니다.

### 기본 사용법

#### 방법 1: 단순 지시
\`\`\`
단계별로 생각하며 답변해주세요.
\`\`\`

#### 방법 2: 단계 명시
\`\`\`
다음 단계를 따라 분석해주세요:
1단계: 문제를 파악합니다
2단계: 관련 정보를 정리합니다
3단계: 가능한 해결책을 도출합니다
4단계: 최적의 방안을 선택하고 근거를 설명합니다
\`\`\`

### Few-Shot 프롬프트

예시를 제공하여 AI가 원하는 패턴으로 응답하도록 유도합니다.

\`\`\`
아래 예시와 같은 형식으로 학습목표를 작성해주세요.

[예시 1]
교과목: 통계학 개론
학습목표: "본 수업을 수료한 학생은 주어진 데이터셋에 대해
적절한 통계 검정 방법을 선택하고, SPSS를 활용하여 분석을
수행한 후, 결과를 학술적 형식으로 해석할 수 있다."

[예시 2]
교과목: 마케팅 원론
학습목표: "본 수업을 수료한 학생은 소비자 행동 이론을 바탕으로
시장을 세분화하고, STP 전략을 수립하여 마케팅 계획서를
작성할 수 있다."

[작성 요청]
교과목: 인공지능 개론
위 예시와 동일한 형식과 수준으로 학습목표를 작성해주세요.
\`\`\`

### 단계적 프롬프트 실전 활용

#### 시험 문제 출제
\`\`\`
다음 단계에 따라 시험 문제를 출제해주세요.

1단계: 교과목의 핵심 학습목표를 확인합니다
  - 교과목: [교과목명]
  - 학습목표: [목표 나열]

2단계: 블룸의 분류학 수준별 문항 수를 결정합니다
  - 기억/이해: 10문항 (객관식)
  - 적용/분석: 5문항 (단답형)
  - 평가/창조: 2문항 (서술형)

3단계: 각 수준에 맞는 문항을 작성합니다
  - 객관식: 5지선다, 정답과 오답 해설 포함
  - 단답형: 모범답안 포함
  - 서술형: 채점 기준(루브릭) 포함

4단계: 난이도와 변별력을 검토합니다
\`\`\`

#### 연구 계획 수립
\`\`\`
다음 연구 주제에 대한 연구 계획을 단계별로 수립해주세요.

연구 주제: "생성형 AI 활용이 대학생의 학습 성과에 미치는 영향"

1단계: 선행연구 분석
  - 주요 이론적 배경
  - 기존 연구의 한계점

2단계: 연구 설계
  - 연구 가설 수립
  - 변인 정의 (독립/종속/통제)
  - 연구 방법 선택 (실험/조사/혼합)

3단계: 데이터 수집 계획
  - 대상, 표본 크기, 수집 도구

4단계: 분석 방법
  - 통계 분석 방법 선택 및 근거

5단계: 기대 결과 및 시사점
\`\`\`

### 프롬프트 체이닝 (연쇄 프롬프트)

하나의 큰 작업을 여러 프롬프트로 나누어 순차 실행합니다.

\`\`\`
[1차 프롬프트] "인공지능 개론" 수업의 15주차 주제 목록을 만들어주세요.
     ↓ (결과 확인 후)
[2차 프롬프트] 3주차 "자연어처리" 주제의 상세 수업 계획을 작성해주세요.
     ↓ (결과 확인 후)
[3차 프롬프트] 이 수업에서 사용할 실습 과제를 3개 설계해주세요.
     ↓ (결과 확인 후)
[4차 프롬프트] 첫 번째 과제의 평가 루브릭을 작성해주세요.
\`\`\`

이 방식은 각 단계의 결과를 검토하고 수정한 후 다음 단계로 진행하므로 최종 결과의 품질이 높습니다.`,
    contentEn: `## Chain of Thought Prompting

### What is CoT?
A technique that guides AI to think step-by-step, improving reasoning accuracy.

### Methods
1. **Simple instruction**: "Think step by step"
2. **Explicit steps**: Define numbered stages
3. **Few-shot**: Provide examples for pattern matching

### Prompt Chaining
Break large tasks into sequential prompts:
1. Generate topic list → 2. Detail one topic → 3. Design exercises → 4. Create rubric

Each step is reviewed before proceeding to the next.`,
  },
  {
    id: 'prompt-examples',
    categoryId: 'advanced',
    nameKo: '프롬프트 실전 예시',
    nameEn: 'Practical Prompt Examples',
    type: 'reference',
    contentKo: `## 프롬프트 실전 예시 모음

### 교수학습 분야

#### 1. 학습목표 작성
\`\`\`
"인공지능 개론" 교과목의 학습목표(CLO)를 작성해주세요.
블룸의 분류학 개정판을 기반으로, 행동동사를 사용하여
측정 가능한 형태로 5개 작성해주세요.
대상: 비전공 학부생 (3학년)
\`\`\`

#### 2. 토론 주제 생성
\`\`\`
"AI 윤리" 수업에서 사용할 토론 주제 5개를 생성해주세요.
조건:
- 찬반이 나뉠 수 있는 주제
- 실제 사례 기반
- 학생들이 관심가질 만한 주제
- 각 주제별 핵심 논점 2가지 포함
\`\`\`

#### 3. 퀴즈 문항 출제
\`\`\`
다음 내용을 바탕으로 퀴즈 문항 10개를 출제해주세요.
[학습 내용 붙여넣기]

문항 구성:
- 객관식 5문항 (5지선다, 정답 표시)
- OX 문항 3문항 (해설 포함)
- 단답형 2문항 (모범답안 포함)
난이도: 중 (핵심 개념 이해 수준)
\`\`\`

#### 4. 수업 활동 설계
\`\`\`
"데이터 시각화" 주제로 2시간짜리 실습 수업을 설계해주세요.
포함 요소:
- 도입 활동 (10분): 동기 유발
- 개념 설명 (20분): 핵심 이론
- 실습 활동 (60분): 단계별 실습
- 정리 (30분): 발표 및 피드백
준비물과 사전 설정 사항도 포함해주세요.
\`\`\`

#### 5. 학생 피드백 작성
\`\`\`
다음 학생의 과제물에 대한 피드백을 작성해주세요.
[과제 내용 붙여넣기]

피드백 원칙:
- 긍정적인 점 2가지를 먼저 언급
- 개선이 필요한 부분을 구체적으로 지적
- 개선 방향을 제안
- 격려하는 마무리
- 200자 내외
\`\`\`

### 연구 분야

#### 6. 논문 초록 작성
\`\`\`
다음 연구 내용을 바탕으로 학술 논문 초록을 작성해주세요.
연구 주제: [주제]
연구 방법: [방법]
주요 결과: [결과]
형식: 배경-목적-방법-결과-결론 구조, 300단어 이내
학술지: [학술지명] 투고용
\`\`\`

#### 7. 문헌 검토 정리
\`\`\`
다음 5편의 논문을 비교 분석해주세요.
[논문 제목 및 초록 나열]

분석 항목:
- 연구 목적
- 연구 방법
- 주요 결과
- 한계점
- 본 연구와의 관련성
표 형식으로 정리해주세요.
\`\`\`

### 행정 분야

#### 8. 예산안 작성
\`\`\`
"2025년 AI 교육 프로그램" 예산안을 작성해주세요.
총 예산: 3,000만원
항목:
- 강사료, 교재비, 실습환경 구축, 홍보, 운영비
- 각 항목별 금액과 산출 근거 포함
- 표 형식으로 정리
\`\`\`

#### 9. 행사 기획안
\`\`\`
명지대학교 "AI 교육 워크숍" 행사 기획안을 작성해주세요.
일시: 2024년 12월 20일 (금) 09:00-17:00
장소: AI융합교육관 대강당
대상: 교수자 50명
프로그램: 기조강연, 분과세션 3개, 실습, 네트워킹
예산: 500만원
\`\`\`

#### 10. 정책 제안서
\`\`\`
명지대학교에 "AI 리터러시 필수 교육" 정책을 제안하는 문서를 작성해주세요.
포함 내용:
- 필요성 (국내외 동향, 타대학 사례)
- 교육 대상 및 방법
- 운영 체계
- 기대 효과
- 단계별 추진 일정 (1~3차년도)
\`\`\`

### 활용 가이드

1. 위 예시를 그대로 복사하여 사용할 수 있습니다.
2. **[대괄호]** 안의 내용을 실제 데이터로 교체하세요.
3. 결과가 만족스럽지 않으면 조건을 추가하거나 수정하세요.
4. 좋은 결과가 나온 프롬프트는 반드시 저장해두세요.`,
    contentEn: `## Practical Prompt Examples

### Teaching & Learning
1. Learning objectives (CLO) with Bloom's taxonomy
2. Discussion topics with pros/cons
3. Quiz questions (multiple choice, T/F, short answer)
4. Lesson plan design with activities
5. Student feedback writing

### Research
6. Abstract writing
7. Literature review comparison table

### Administration
8. Budget proposals
9. Event planning
10. Policy proposals

### Tips
- Copy and customize the templates
- Add conditions if results aren't satisfactory
- Save successful prompts for reuse`,
  },
];
