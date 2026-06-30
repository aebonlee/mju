import{C as S,I as A,r as f,l as e}from"./index-XXKoCGBl.js";import{u as C,A as $,K as I,S as w,T as P}from"./SubscribePrompt-DL8S4MDM.js";import{u as K,A as T}from"./useApiKeys-DPMHaFni.js";import{S as E}from"./SEOHead-CEx7Gdxf.js";import"./useUsageLog-lgFVCPjN.js";import"./index-CZhRCO18.js";function F({subject:a,topic:n,assignmentType:r,difficulty:o,groupSize:u,duration:m,objectives:d,language:p}){const g=p==="ko"?"한국어":"English",j={individual:"개인 과제",group:"그룹 과제",research:"연구 과제",presentation:"발표 과제",project:"프로젝트"},c={basic:"기초",intermediate:"중급",advanced:"고급"};return[{role:"system",content:`You are an expert instructional designer who creates engaging, well-structured assignments for higher education. You focus on active learning and constructive alignment. Always respond in ${g}.`},{role:"user",content:`다음 정보를 바탕으로 과제를 설계해주세요.

## 과제 정보
- **교과목**: ${a}
- **주제**: ${n||"미지정"}
- **과제 유형**: ${j[r||""]||r||"개인 과제"}
- **난이도**: ${c[o||""]||o||"중급"}
${u?`- **그룹 규모**: ${u}명`:""}
${m?`- **소요 기간**: ${m}`:""}
${d?`- **학습 목표**: ${d}`:""}

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
${r==="group"?`
### 6. 그룹 활동 가이드
- 역할 분담 방법
- 협업 도구 추천
- 동료 평가 방법`:""}

마크다운 형식으로 깔끔하게 작성해주세요.`}]}function O(){const{language:a,t:n}=S(),{output:r,isStreaming:o,error:u,usage:m,generate:d}=C(),{keys:p,getEffectiveApiKey:g,hasAnyKey:j}=K(),c=A(),[l,v]=f.useState("openai"),[i,b]=f.useState({subject:"",topic:"",assignmentType:"individual",difficulty:"intermediate",groupSize:"",duration:"",objectives:""}),t=(s,h)=>b(x=>({...x,[s]:h}));async function N(){if(!i.subject.trim()){c.warning(a==="ko"?"교과목을 입력해주세요.":"Please enter a subject.");return}const{key:s,source:h}=g(l);if(!s){c.warning(n("ai.noApiKey"));return}const x=F({...i,language:a});try{await d({provider:l,apiKey:s,model:T[l].defaultModel,messages:x,toolId:"assignment",keySource:h})}catch(k){c.error(k.message)}}const y=e.jsxs(e.Fragment,{children:[e.jsxs("h3",{children:[e.jsx("i",{className:"fa-solid fa-file-pen"})," ",n("tools.assignment")]}),e.jsx($,{selected:l,onSelect:v,apiKeys:p}),e.jsx(I,{provider:l}),!j(l)&&e.jsx(w,{}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-book"})})," ",a==="ko"?"교과목":"Subject"," *"]}),e.jsx("input",{className:"form-input",value:i.subject,onChange:s=>t("subject",s.target.value),placeholder:a==="ko"?"예: 데이터사이언스":"e.g., Data Science"})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-lightbulb"})})," ",a==="ko"?"주제":"Topic"]}),e.jsx("input",{className:"form-input",value:i.topic,onChange:s=>t("topic",s.target.value),placeholder:a==="ko"?"예: 머신러닝 알고리즘 비교":"e.g., Comparing ML algorithms"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[e.jsxs("div",{className:"ai-form-group",children:[e.jsx("label",{className:"ai-form-label",children:a==="ko"?"과제 유형":"Type"}),e.jsxs("select",{className:"form-select",value:i.assignmentType,onChange:s=>t("assignmentType",s.target.value),children:[e.jsx("option",{value:"individual",children:a==="ko"?"개인 과제":"Individual"}),e.jsx("option",{value:"group",children:a==="ko"?"그룹 과제":"Group"}),e.jsx("option",{value:"research",children:a==="ko"?"연구 과제":"Research"}),e.jsx("option",{value:"presentation",children:a==="ko"?"발표 과제":"Presentation"}),e.jsx("option",{value:"project",children:a==="ko"?"프로젝트":"Project"})]})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsx("label",{className:"ai-form-label",children:a==="ko"?"난이도":"Difficulty"}),e.jsxs("select",{className:"form-select",value:i.difficulty,onChange:s=>t("difficulty",s.target.value),children:[e.jsx("option",{value:"basic",children:a==="ko"?"기초":"Basic"}),e.jsx("option",{value:"intermediate",children:a==="ko"?"중급":"Intermediate"}),e.jsx("option",{value:"advanced",children:a==="ko"?"고급":"Advanced"})]})]})]}),i.assignmentType==="group"&&e.jsxs("div",{className:"ai-form-group",children:[e.jsx("label",{className:"ai-form-label",children:a==="ko"?"그룹 규모":"Group Size"}),e.jsx("input",{className:"form-input",type:"number",min:"2",max:"10",value:i.groupSize,onChange:s=>t("groupSize",s.target.value),placeholder:"3-5"})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-clock"})})," ",a==="ko"?"소요 기간":"Duration"]}),e.jsx("input",{className:"form-input",value:i.duration,onChange:s=>t("duration",s.target.value),placeholder:a==="ko"?"예: 2주":"e.g., 2 weeks"})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-bullseye"})})," ",a==="ko"?"학습 목표":"Objectives"," ",e.jsxs("span",{className:"optional",children:["(",a==="ko"?"선택":"optional",")"]})]}),e.jsx("textarea",{className:"form-textarea",rows:3,value:i.objectives,onChange:s=>t("objectives",s.target.value)})]}),e.jsx("button",{className:"ai-generate-btn",onClick:N,disabled:o,children:o?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner"})," ",n("ai.generating")]}):e.jsx(e.Fragment,{children:n("ai.generate")})})]});return e.jsxs(e.Fragment,{children:[e.jsx(E,{title:n("tools.assignment"),path:"/tools/assignment"}),e.jsx(P,{title:n("tools.assignment"),description:a==="ko"?"난이도별 개인/그룹/연구/발표 과제를 생성합니다.":"Create assignments by difficulty level and type.",inputPanel:y,output:r,isStreaming:o,error:u,usage:m,toolId:"assignment"})]})}export{O as default};
