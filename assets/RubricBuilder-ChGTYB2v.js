import{C as A,I as S,r as g,l as e}from"./index-C6PJHERR.js";import{u as C,A as I,K as T,S as w,T as E}from"./SubscribePrompt-B_x7ZkDp.js";import{u as K,A as P}from"./useApiKeys-dLodnY9L.js";import{S as R}from"./SEOHead-9DUqFB67.js";import"./useUsageLog-DbAyXQv3.js";import"./index-CC0D4pCe.js";function $({taskName:a,subject:r,level:n,criteria:t,rubricType:c,language:u}){return[{role:"system",content:`You are an assessment and evaluation expert in higher education. You create detailed, fair, and measurable rubrics aligned with learning outcomes. Always respond in ${u==="ko"?"한국어":"English"}.`},{role:"user",content:`다음 정보를 바탕으로 4단계 평가 루브릭을 작성해주세요.

## 과제 정보
- **과제명**: ${a}
- **교과목**: ${r||"미지정"}
- **수준**: ${n||"학부"}
- **루브릭 유형**: ${c||"분석적 루브릭 (Analytic Rubric)"}
${t?`- **평가 기준 (요청)**: ${t}`:""}

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

마크다운 표 형식으로 깔끔하게 작성해주세요.`}]}function O(){const{language:a,t:r}=A(),{output:n,isStreaming:t,error:c,usage:u,generate:x}=C(),{keys:h,getEffectiveApiKey:j,hasAnyKey:b}=K(),m=S(),[i,f]=g.useState("openai"),[l,v]=g.useState({taskName:"",subject:"",level:"학부",criteria:"",rubricType:"analytic"}),o=(s,d)=>v(p=>({...p,[s]:d}));async function N(){if(!l.taskName.trim()){m.warning(a==="ko"?"과제명을 입력해주세요.":"Please enter a task name.");return}const{key:s,source:d}=j(i);if(!s){m.warning(r("ai.noApiKey"));return}const p=$({...l,language:a});try{await x({provider:i,apiKey:s,model:P[i].defaultModel,messages:p,toolId:"rubric",keySource:d})}catch(k){m.error(k.message)}}const y=e.jsxs(e.Fragment,{children:[e.jsxs("h3",{children:[e.jsx("i",{className:"fa-solid fa-table-cells"})," ",r("tools.rubric")]}),e.jsx(I,{selected:i,onSelect:f,apiKeys:h}),e.jsx(T,{provider:i}),!b(i)&&e.jsx(w,{}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-pen-to-square"})})," ",a==="ko"?"과제명":"Task Name"," *"]}),e.jsx("input",{className:"form-input",value:l.taskName,onChange:s=>o("taskName",s.target.value),placeholder:a==="ko"?"예: 연구 보고서":"e.g., Research Paper"})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-book"})})," ",a==="ko"?"교과목":"Subject"]}),e.jsx("input",{className:"form-input",value:l.subject,onChange:s=>o("subject",s.target.value),placeholder:a==="ko"?"예: 경영학개론":"e.g., Business Administration"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[e.jsxs("div",{className:"ai-form-group",children:[e.jsx("label",{className:"ai-form-label",children:a==="ko"?"수준":"Level"}),e.jsxs("select",{className:"form-select",value:l.level,onChange:s=>o("level",s.target.value),children:[e.jsx("option",{value:"학부",children:a==="ko"?"학부":"Undergraduate"}),e.jsx("option",{value:"대학원",children:a==="ko"?"대학원":"Graduate"})]})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsx("label",{className:"ai-form-label",children:a==="ko"?"루브릭 유형":"Rubric Type"}),e.jsxs("select",{className:"form-select",value:l.rubricType,onChange:s=>o("rubricType",s.target.value),children:[e.jsx("option",{value:"analytic",children:a==="ko"?"분석적 루브릭":"Analytic"}),e.jsx("option",{value:"holistic",children:a==="ko"?"총체적 루브릭":"Holistic"})]})]})]}),e.jsxs("div",{className:"ai-form-group",children:[e.jsxs("label",{className:"ai-form-label",children:[e.jsx("span",{className:"label-icon",children:e.jsx("i",{className:"fa-solid fa-bullseye"})})," ",a==="ko"?"평가 기준":"Criteria"," ",e.jsxs("span",{className:"optional",children:["(",a==="ko"?"선택":"optional",")"]})]}),e.jsx("textarea",{className:"form-textarea",rows:3,value:l.criteria,onChange:s=>o("criteria",s.target.value),placeholder:a==="ko"?"평가하고 싶은 기준을 입력하세요.":"Enter criteria you want to assess."})]}),e.jsx("button",{className:"ai-generate-btn",onClick:N,disabled:t,children:t?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner"})," ",r("ai.generating")]}):e.jsx(e.Fragment,{children:r("ai.generate")})})]});return e.jsxs(e.Fragment,{children:[e.jsx(R,{title:r("tools.rubric"),path:"/tools/rubric"}),e.jsx(E,{title:r("tools.rubric"),description:a==="ko"?"4단계 평가 기준 루브릭을 자동으로 생성합니다.":"Automatically generate 4-level assessment rubrics.",inputPanel:y,output:n,isStreaming:t,error:c,usage:u,toolId:"rubric"})]})}export{O as default};
