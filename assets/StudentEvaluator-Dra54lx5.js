import{C as y,I as A,r as g,l as e}from"./index-XXKoCGBl.js";import{u as C,A as E,K as w,S as I,T as K}from"./SubscribePrompt-DL8S4MDM.js";import{u as P,A as $}from"./useApiKeys-DPMHaFni.js";import{S as F}from"./SEOHead-CEx7Gdxf.js";import"./useUsageLog-lgFVCPjN.js";import"./index-CZhRCO18.js";function R({studentSubmission:a,rubric:r,assignmentName:c,courseName:i,additionalNotes:n,language:u}){return[{role:"system",content:`You are a fair and thorough academic evaluator. You assess student work against rubric criteria, providing detailed scores and constructive feedback for each criterion. Be objective and evidence-based. Always respond in ${u==="ko"?"한국어":"English"}.`},{role:"user",content:`다음 학생 과제물을 루브릭 기준에 따라 평가해주세요.

## 과제 정보
- **교과목**: ${i||"미지정"}
- **과제명**: ${c||"미지정"}
${n?`- **참고사항**: ${n}`:""}

## 평가 루브릭
${r||"(루브릭이 제공되지 않은 경우, 일반적인 학술 과제 평가 기준을 적용해주세요: 내용의 정확성, 분석의 깊이, 논리적 구성, 표현력, 참고문헌 활용)"}

## 학생 제출물
${a||"(제출물이 비어있습니다)"}

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

마크다운 표와 서식을 활용하여 깔끔하게 작성해주세요.`}]}function O(){const{language:a,t:r}=y(),{output:c,isStreaming:i,error:n,usage:u,generate:x}=C(),{keys:f,getEffectiveApiKey:h,hasAnyKey:b}=P(),m=A(),[o,j]=g.useState("openai"),[t,N]=g.useState({courseName:"",assignmentName:"",rubric:"",studentSubmission:"",additionalNotes:""}),l=(s,d)=>N(p=>({...p,[s]:d}));async function v(){if(!t.studentSubmission.trim()){m.warning(a==="ko"?"학생 제출물을 입력해주세요.":"Please enter student submission.");return}const{key:s,source:d}=h(o);if(!s){m.warning(r("ai.noApiKey"));return}const p=R({...t,language:a});try{await x({provider:o,apiKey:s,model:$[o].defaultModel,messages:p,toolId:"evaluator",keySource:d})}catch(S){m.error(S.message)}}const k=e.jsxs(e.Fragment,{children:[e.jsxs("h3",{children:[e.jsx("i",{className:"fa-solid fa-check-double"})," ",r("tools.evaluator")]}),e.jsx(E,{selected:o,onSelect:j,apiKeys:f}),e.jsx(w,{provider:o}),!b(o)&&e.jsx(I,{}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-book"})})," ",a==="ko"?"교과목":"Course"]}),e.jsx("input",{className:"form-input",value:t.courseName,onChange:s=>l("courseName",s.target.value)})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-pen-to-square"})})," ",a==="ko"?"과제명":"Assignment"]}),e.jsx("input",{className:"form-input",value:t.assignmentName,onChange:s=>l("assignmentName",s.target.value)})]})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-chart-simple"})})," ",a==="ko"?"평가 루브릭":"Rubric"," ",e.jsxs("span",{className:"optional",children:["(",a==="ko"?"선택":"optional",")"]})]}),e.jsx("textarea",{className:"form-textarea",rows:4,value:t.rubric,onChange:s=>l("rubric",s.target.value),placeholder:a==="ko"?"루브릭 기준을 입력하세요. (없으면 일반 기준 적용)":"Enter rubric criteria. (General criteria applied if empty)"})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-file-lines"})})," ",a==="ko"?"학생 제출물":"Student Submission"," *"]}),e.jsx("textarea",{className:"form-textarea",rows:8,value:t.studentSubmission,onChange:s=>l("studentSubmission",s.target.value),placeholder:a==="ko"?"학생이 제출한 과제 내용을 붙여넣으세요.":"Paste the student submission here."})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-lightbulb"})})," ",a==="ko"?"참고사항":"Notes"," ",e.jsxs("span",{className:"optional",children:["(",a==="ko"?"선택":"optional",")"]})]}),e.jsx("textarea",{className:"form-textarea",rows:2,value:t.additionalNotes,onChange:s=>l("additionalNotes",s.target.value)})]}),e.jsx("button",{className:"ai-generate-btn",onClick:v,disabled:i,children:i?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner"})," ",r("ai.generating")]}):e.jsx(e.Fragment,{children:r("ai.generate")})})]});return e.jsxs(e.Fragment,{children:[e.jsx(F,{title:r("tools.evaluator"),path:"/tools/evaluator"}),e.jsx(K,{title:r("tools.evaluator"),description:a==="ko"?"학생 과제물을 루브릭 기반으로 평가합니다.":"Evaluate student submissions using rubric-based assessment.",inputPanel:k,output:c,isStreaming:i,error:n,usage:u,toolId:"evaluator"})]})}export{O as default};
