import{C as S,I as A,r as g,l as e}from"./index-XXKoCGBl.js";import{u as L,A as O,K as $,S as I,T}from"./SubscribePrompt-DL8S4MDM.js";import{u as w,A as K}from"./useApiKeys-DPMHaFni.js";import{S as E}from"./SEOHead-CEx7Gdxf.js";import"./useUsageLog-lgFVCPjN.js";import"./index-CZhRCO18.js";function P({courseName:a,department:o,level:m,credits:t,weeks:i,objectives:c,textbook:d,language:u}){return[{role:"system",content:`You are an expert instructional designer and curriculum developer for higher education. You specialize in creating detailed, standards-aligned syllabi based on Bloom's Taxonomy and Constructive Alignment principles. Always respond in ${u==="ko"?"한국어":"English"}.`},{role:"user",content:`다음 정보를 바탕으로 ${i}주차 강의계획서를 작성해주세요.

## 과목 정보
- **과목명**: ${a}
- **학과/전공**: ${o||"미지정"}
- **수준**: ${m||"학부"}
- **학점**: ${t||3}학점
${c?`- **교육 목표**: ${c}`:""}
${d?`- **교재**: ${d}`:""}

## 작성 요구사항

### 1. 과목 개요
- 과목 설명 (2-3문장)
- 선수과목 권장사항

### 2. 교과목 학습성과 (CLO: Course Learning Outcomes)
- CLO 4-6개 작성
- 각 CLO는 Bloom's Taxonomy 수준 명시 (기억, 이해, 적용, 분석, 평가, 창조)
- 측정 가능한 동사 사용

### 3. ${i}주차 수업 계획
각 주차별로 다음을 포함:
| 주차 | 주제 | 학습 내용 | 학습 활동 | 관련 CLO | 과제/평가 |

### 4. 평가 계획
| 평가 항목 | 비율(%) | 평가 방법 | 관련 CLO |

### 5. 교재 및 참고자료
- 주교재
- 부교재/참고자료

### 6. 수업 정책
- 출석, 과제 제출, 학업 윤리 등

마크다운 표 형식으로 깔끔하게 작성해주세요.`}]}function Y(){const{language:a,t:o}=S(),{output:m,isStreaming:t,error:i,usage:c,generate:d}=L(),{keys:u,getEffectiveApiKey:j,hasAnyKey:f}=w(),p=A(),[n,b]=g.useState("openai"),[l,v]=g.useState({courseName:"",department:"",level:"학부",credits:"3",weeks:"15",objectives:"",textbook:""}),r=(s,x)=>v(h=>({...h,[s]:x}));async function N(){if(!l.courseName.trim()){p.warning(a==="ko"?"과목명을 입력해주세요.":"Please enter a course name.");return}const{key:s,source:x}=j(n);if(!s){p.warning(o("ai.noApiKey"));return}const h=P({...l,language:a}),k=K[n];try{await d({provider:n,apiKey:s,model:k.defaultModel,messages:h,toolId:"syllabus",keySource:x})}catch(C){p.error(C.message)}}const y=e.jsxs(e.Fragment,{children:[e.jsxs("h3",{children:[e.jsx("i",{className:"fa-solid fa-calendar-days"})," ",o("tools.syllabus")]}),e.jsx(O,{selected:n,onSelect:b,apiKeys:u}),e.jsx($,{provider:n}),!f(n)&&e.jsx(I,{}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-book"})})," ",a==="ko"?"과목명":"Course Name"," *"]}),e.jsx("input",{className:"form-input",value:l.courseName,onChange:s=>r("courseName",s.target.value),placeholder:a==="ko"?"예: 인공지능개론":"e.g., Introduction to AI"})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-building-columns"})})," ",a==="ko"?"학과/전공":"Department"]}),e.jsx("input",{className:"form-input",value:l.department,onChange:s=>r("department",s.target.value),placeholder:a==="ko"?"예: 컴퓨터공학과":"e.g., Computer Science"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"},children:[e.jsxs("div",{className:"ai-form-group",children:[e.jsx("label",{className:"ai-form-label",children:a==="ko"?"수준":"Level"}),e.jsxs("select",{className:"form-select",value:l.level,onChange:s=>r("level",s.target.value),children:[e.jsx("option",{value:"학부",children:a==="ko"?"학부":"Undergraduate"}),e.jsx("option",{value:"대학원",children:a==="ko"?"대학원":"Graduate"}),e.jsx("option",{value:"직업훈련",children:a==="ko"?"직업훈련":"Vocational"})]})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsx("label",{className:"ai-form-label",children:a==="ko"?"학점":"Credits"}),e.jsxs("select",{className:"form-select",value:l.credits,onChange:s=>r("credits",s.target.value),children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"})]})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsx("label",{className:"ai-form-label",children:a==="ko"?"주차":"Weeks"}),e.jsxs("select",{className:"form-select",value:l.weeks,onChange:s=>r("weeks",s.target.value),children:[e.jsx("option",{value:"8",children:"8"}),e.jsx("option",{value:"15",children:"15"}),e.jsx("option",{value:"16",children:"16"})]})]})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-bullseye"})})," ",a==="ko"?"교육 목표":"Objectives"," ",e.jsxs("span",{className:"optional",children:["(",a==="ko"?"선택":"optional",")"]})]}),e.jsx("textarea",{className:"form-textarea",rows:3,value:l.objectives,onChange:s=>r("objectives",s.target.value),placeholder:a==="ko"?"이 과목의 교육 목표를 입력하세요.":"Enter course objectives."})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-book-open"})})," ",a==="ko"?"교재":"Textbook"," ",e.jsxs("span",{className:"optional",children:["(",a==="ko"?"선택":"optional",")"]})]}),e.jsx("input",{className:"form-input",value:l.textbook,onChange:s=>r("textbook",s.target.value),placeholder:a==="ko"?"교재명, 저자":"Textbook title, author"})]}),e.jsx("button",{className:"ai-generate-btn",onClick:N,disabled:t,children:t?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner"})," ",o("ai.generating")]}):e.jsx(e.Fragment,{children:o("ai.generate")})})]});return e.jsxs(e.Fragment,{children:[e.jsx(E,{title:o("tools.syllabus"),path:"/tools/syllabus"}),e.jsx(T,{title:o("tools.syllabus"),description:a==="ko"?"CLO와 Bloom's Taxonomy 기반으로 15주차 강의계획서를 생성합니다.":"Generate 15-week syllabi based on CLO and Bloom's Taxonomy.",inputPanel:y,output:m,isStreaming:t,error:i,usage:c,toolId:"syllabus"})]})}export{Y as default};
