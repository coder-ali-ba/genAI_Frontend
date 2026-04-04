import React, { useState } from "react";
import "../style/interview.scss";

// SAME DATA
const MOCK = { matchScore: 74, technicalQuestions: [ { question: "Explain the difference between useEffect and useLayoutEffect.", intention: "Gauge depth of React internals knowledge and real-world debugging ability.", answer: "useEffect fires asynchronously after paint; useLayoutEffect fires synchronously before paint. Use useLayoutEffect when you need to read/mutate the DOM before the browser paints to avoid flicker." }, { question: "How does the JavaScript event loop work?", intention: "Check understanding of async execution, call stack, and task queues.", answer: "Cover call stack, Web APIs, callback/microtask queues. Microtasks (Promises) drain before the next macrotask. Mention requestAnimationFrame placement." }, { question: "What is memoization and when would you use React.memo vs useMemo?", intention: "Assess performance optimization knowledge.", answer: "React.memo prevents re-render of a component if props haven't changed. useMemo caches a computed value. Use memo for expensive child components, useMemo for expensive calculations inside a component." } ], behaviouralQuestion: [ { question: "Tell me about a time you disagreed with a technical decision.", intention: "Assess communication, professionalism, and influence without authority.", answer: "Use STAR format. Focus on data-driven arguments, active listening, and outcome. Show you can commit once a decision is made." }, { question: "Describe a project where you learned a new technology under a tight deadline.", intention: "Evaluate adaptability and self-learning speed.", answer: "Highlight your learning strategy, resources used, what you shipped, and lessons taken. Quantify timeline if possible." } ], skillGap: [ { skill: "System Design", severity: "High" }, { skill: "TypeScript Advanced Patterns", severity: "Medium" }, { skill: "CI/CD & DevOps basics", severity: "Medium" }, { skill: "Testing (Jest / RTL)", severity: "low" } ], preparationPlan: [ { day: 1, focus: "JavaScript Fundamentals", tasks: ["Revise closures, hoisting, and prototypes", "Practice 5 JS challenges on LeetCode", "Watch 'JavaScript: The Hard Parts'"] }, { day: 2, focus: "React Deep Dive", tasks: ["Study React reconciliation algorithm", "Build a mini project using useReducer + Context", "Read React Docs on performance"] }, { day: 3, focus: "System Design Basics", tasks: ["Study scalability: load balancing, caching", "Read Grokking System Design Ch.1–3", "Design a URL shortener on paper"] }, { day: 4, focus: "TypeScript & Testing", tasks: ["Complete TypeScript Generics tutorial", "Write unit tests for previous React project", "Study common TS utility types"] }, { day: 5, focus: "Mock Interview Day", tasks: ["Do 2 timed coding challenges", "Record yourself answering 3 behavioural questions", "Review all weak areas"] } ] }

// SCORE
const MatchScore = ({ score }) => {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="score-card">
      <div className="score-ring-wrap">
        <svg viewBox="0 0 120 120" className="score-svg">
          <circle cx="60" cy="60" r={r} className="ring-track" />
          <circle
            cx="60"
            cy="60"
            r={r}
            className="ring-progress ring-high"
            strokeDasharray={circ}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="score-label">
          <h2>{score}</h2>
          <span>/100</span>
        </div>
      </div>
    </div>
  );
};

// 🔥 FINAL ACCORDION
const Accordion = ({ header, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`accordion ${open ? "accordion--open" : ""}`}>
      <button
        className="accordion__trigger"
        onClick={() => setOpen(!open)}
      >
        <div className="accordion__title">
          {header}
        </div>
        <span>{open ? "−" : "+"}</span>
      </button>

      <div className="accordion__body">
        <div className="accordion__inner">
          {children}
        </div>
      </div>
    </div>
  );
};

const Interview = ({ report = MOCK }) => {
  const [active, setActive] = useState("technical");

  return (
    <main className="ir-page">
      <div className="ir-container">

        <header className="ir-header">
          <h1>Interview <em>Report</em></h1>
          <p>Preparation guide</p>
        </header>

        <MatchScore score={report.matchScore} />

        {/* TABS */}
        <div className="ir-tabs">
          {["technical","behavioural","gaps","plan"].map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`ir-tab ${active===t?"ir-tab--active":""}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="ir-panel">

          {/* TECH */}
          {active==="technical" && report.technicalQuestions.map((q,i)=>(
            <Accordion key={i} header={
              <>
                <span className="q-pill">Q{i+1}</span>
                <span className="q-question">{q.question}</span>
              </>
            }>
              <div className="q-block">{q.intention}</div>
              <div className="q-block q-block--answer">{q.answer}</div>
            </Accordion>
          ))}

          {/* BEHAVIOUR */}
          {active==="behavioural" && report.behaviouralQuestion.map((q,i)=>(
            <Accordion key={i} header={
              <>
                <span className="q-pill">Q{i+1}</span>
                <span className="q-question">{q.question}</span>
              </>
            }>
              <div className="q-block">{q.intention}</div>
              <div className="q-block q-block--answer">{q.answer}</div>
            </Accordion>
          ))}

          {/* GAPS */}
          {active==="gaps" && (
            <div className="gaps-card">
              {report.skillGap.map((g,i)=>(
                <div key={i} className="gap-row">
                  <span>{g.skill}</span>
                  <span>{g.severity}</span>
                </div>
              ))}
            </div>
          )}

          {/* PLAN */}
          {active==="plan" && report.preparationPlan.map((d,i)=>(
            <Accordion key={i} header={`Day ${d.day} - ${d.focus}`}>
              <ul className="task-list">
                {d.tasks.map((t,j)=>(
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </Accordion>
          ))}

        </div>
      </div>
    </main>
  );
};

export default Interview;