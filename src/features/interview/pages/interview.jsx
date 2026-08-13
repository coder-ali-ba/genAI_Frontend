// import React, { useState } from "react";
// import "../style/interview.scss";
// import { useInterview } from "../hook/useInterview";

// // SAME DATA


// // SCORE
// const MatchScore = ({ score }) => {
//   const r = 54;
//   const circ = 2 * Math.PI * r;
//   const offset = circ - (score / 100) * circ;

//   return (
//     <div className="score-card">
//       <div className="score-ring-wrap">
//         <svg viewBox="0 0 120 120" className="score-svg">
//           <circle cx="60" cy="60" r={r} className="ring-track" />
//           <circle
//             cx="60"
//             cy="60"
//             r={r}
//             className="ring-progress ring-high"
//             strokeDasharray={circ}
//             strokeDashoffset={offset}
//           />
//         </svg>
//         <div className="score-label">
//           <h2>{score}</h2>
//           <span>/100</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 🔥 FINAL ACCORDION
// const Accordion = ({ header, children }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className={`accordion ${open ? "accordion--open" : ""}`}>
//       <button
//         className="accordion__trigger"
//         onClick={() => setOpen(!open)}
//       >
//         <div className="accordion__title">
//           {header}
//         </div>
//         <span>{open ? "−" : "+"}</span>
//       </button>

//       <div className="accordion__body">
//         <div className="accordion__inner">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Interview = () => {
//   const [active, setActive] = useState("technical");
//   const { report } = useInterview()
//    console.log(report);
   
//   return (
//     <main className="ir-page">
//       <div className="ir-container">

//         <header className="ir-header">
//           <h1>Interview <em>Report</em></h1>
//           <p>Preparation guide</p>
//         </header>

//         <MatchScore score={report.match_score} />

//         {/* TABS */}
//         <div className="ir-tabs">
//           {["technical","behavioral","gaps","plan"].map(t => (
//             <button
//               key={t}
//               onClick={() => setActive(t)}
//               className={`ir-tab ${active===t?"ir-tab--active":""}`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="ir-panel">

//           {/* TECH */}
//           {active==="technical" && report.technicalQuestions.map((q,i)=>(
//             <Accordion key={i} header={
//               <>
//                 <span className="q-pill">Q{i+1}</span>
//                 <span className="q-question">{q.question}</span>
//               </>
//             }>
//               <div className="q-block">{q.intention}</div>
//               <div className="q-block q-block--answer">{q.answer}</div>
//             </Accordion>
//           ))}

//           {/* BEHAVIOUR */}
//           {active==="behavioural" && report.behaviouralQuestion.map((q,i)=>(
//             <Accordion key={i} header={
//               <>
//                 <span className="q-pill">Q{i+1}</span>
//                 <span className="q-question">{q.question}</span>
//               </>
//             }>
//               <div className="q-block">{q.intention}</div>
//               <div className="q-block q-block--answer">{q.answer}</div>
//             </Accordion>
//           ))}

//           {/* GAPS */}
//           {active==="gaps" && (
//             <div className="gaps-card">
//               {report.skillGap.map((g,i)=>(
//                 <div key={i} className="gap-row">
//                   <span>{g.skill}</span>
//                   <span>{g.severity}</span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* PLAN */}
//           {active==="plan" && report.preparationPlan.map((d,i)=>(
//             <Accordion key={i} header={`Day ${d.day} - ${d.focus}`}>
//               <ul className="task-list">
//                 {d.tasks.map((t,j)=>(
//                   <li key={j}>{t}</li>
//                 ))}
//               </ul>
//             </Accordion>
//           ))}

//         </div>
//       </div>
//     </main>
//   );
// };

// export default Interview;



import React, { useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hook/useInterview";

// =============================
// SCORE
// =============================
const MatchScore = ({ score = 0 }) => {
  const r = 54;
  const circ = 2 * Math.PI * r;

  const safeScore = Number(score) || 0;
  const offset = circ - (safeScore / 100) * circ;

  return (
    <div className="score-card">
      <div className="score-ring-wrap">
        <svg viewBox="0 0 120 120" className="score-svg">
          <circle
            cx="60"
            cy="60"
            r={r}
            className="ring-track"
          />

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
          <h2>{safeScore}</h2>
          <span>/100</span>
        </div>
      </div>
    </div>
  );
};

// =============================
// ACCORDION
// =============================
const Accordion = ({ header, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`accordion ${open ? "accordion--open" : ""}`}>
      <button
        type="button"
        className="accordion__trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="accordion__title">
          {header}
        </div>

        <span>
          {open ? "−" : "+"}
        </span>
      </button>

      <div className="accordion__body">
        <div className="accordion__inner">
          {children}
        </div>
      </div>
    </div>
  );
};

// =============================
// INTERVIEW COMPONENT
// =============================
const Interview = () => {
  const [active, setActive] = useState("technical");

  const { report } = useInterview();

  console.log("INTERVIEW REPORT:", report);

  // Prevent undefined errors
  if (!report) {
    return (
      <main className="ir-page">
        <div className="ir-container">
          <div className="ir-panel">
            <h2>Loading Interview Report...</h2>
          </div>
        </div>
      </main>
    );
  }

  // =============================
  // SAFE DATA
  // =============================

  const technicalQuestions = Array.isArray(report.technical_questions)
    ? report.technical_questions
    : [];

  const behavioralQuestions = Array.isArray(report.behavioral_questions)
    ? report.behavioral_questions
    : [];

  const skillGaps = Array.isArray(report.skill_gap)
    ? report.skill_gap
    : [];

  const preparationPlan = Array.isArray(report.preparation_plan)
    ? report.preparation_plan
    : [];

  return (
    <main className="ir-page">
      <div className="ir-container">

        {/* =============================
            HEADER
        ============================= */}

        <header className="ir-header">
          <h1>
            Interview <em>Report</em>
          </h1>

          <p>
            {report.title || "Interview Preparation Guide"}
          </p>
        </header>

        {/* =============================
            SCORE
        ============================= */}

        <MatchScore score={report.match_score} />

        {/* =============================
            TABS
        ============================= */}

        <div className="ir-tabs">

          {[
            "technical",
            "behavioral",
            "gaps",
            "plan",
          ].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`ir-tab ${
                active === tab
                  ? "ir-tab--active"
                  : ""
              }`}
            >
              {tab}
            </button>
          ))}

        </div>

        {/* =============================
            PANEL
        ============================= */}

        <div className="ir-panel">

          {/* ==================================
              TECHNICAL QUESTIONS
          ================================== */}

          {active === "technical" && (
            <div className="questions-list">

              {technicalQuestions.length > 0 ? (
                technicalQuestions.map((question, index) => (

                  <Accordion
                    key={index}
                    header={
                      <>
                        <span className="q-pill">
                          Q{index + 1}
                        </span>

                        <span className="q-question">
                          {question}
                        </span>
                      </>
                    }
                  >
                    <div className="q-block q-block--answer">
                      Prepare a clear and practical answer for this
                      question based on your projects and experience.
                    </div>
                  </Accordion>

                ))
              ) : (
                <div className="empty-state">
                  No technical questions available.
                </div>
              )}

            </div>
          )}

          {/* ==================================
              BEHAVIORAL QUESTIONS
          ================================== */}

          {active === "behavioral" && (
            <div className="questions-list">

              {behavioralQuestions.length > 0 ? (
                behavioralQuestions.map((question, index) => (

                  <Accordion
                    key={index}
                    header={
                      <>
                        <span className="q-pill">
                          Q{index + 1}
                        </span>

                        <span className="q-question">
                          {question}
                        </span>
                      </>
                    }
                  >
                    <div className="q-block q-block--answer">
                      Use the STAR method:
                      Situation → Task → Action → Result.
                    </div>
                  </Accordion>

                ))
              ) : (
                <div className="empty-state">
                  No behavioral questions available.
                </div>
              )}

            </div>
          )}

          {/* ==================================
              SKILL GAPS
          ================================== */}

          {active === "gaps" && (
            <div className="gaps-card">

              {skillGaps.length > 0 ? (
                skillGaps.map((gap, index) => (

                  <div
                    key={index}
                    className="gap-row"
                  >
                    <span className="gap-number">
                      {index + 1}
                    </span>

                    <span className="gap-text">
                      {gap}
                    </span>
                  </div>

                ))
              ) : (
                <div className="empty-state">
                  No skill gaps identified.
                </div>
              )}

            </div>
          )}

          {/* ==================================
              PREPARATION PLAN
          ================================== */}

          {active === "plan" && (
            <div className="plan-list">

              {preparationPlan.length > 0 ? (
                preparationPlan.map((day, index) => (

                  <Accordion
                    key={index}
                    header={
                      <>
                        <span className="q-pill">
                          Day {index + 1}
                        </span>

                        <span className="q-question">
                          {day}
                        </span>
                      </>
                    }
                  >
                    <div className="q-block q-block--answer">
                      Follow this preparation step and revise the
                      mentioned concepts before your interview.
                    </div>
                  </Accordion>

                ))
              ) : (
                <div className="empty-state">
                  No preparation plan available.
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </main>
  );
};

export default Interview;