
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useInterview } from "../hook/useInterview";
import "../style/interview.scss";

const tabs = [
  { id: "technical", label: "Technical", icon: "⌘" },
  { id: "behavioral", label: "Behavioral", icon: "◎" },
  { id: "gaps", label: "Skill gaps", icon: "↗" },
  { id: "plan", label: "Preparation plan", icon: "▦" },
];

const MatchScore = ({ score = 0 }) => {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeScore / 100) * circumference;

  const scoreLabel =
    safeScore >= 80
      ? "Strong match"
      : safeScore >= 60
      ? "Good potential"
      : safeScore >= 40
      ? "Room to grow"
      : "Needs preparation";

  return (
    <section className="ir-score-card">
      <div className="ir-score-copy">
        <span className="ir-overline">YOUR COMPATIBILITY</span>
        <h2>How well do you fit this role?</h2>
        <p>
          Use this score as a starting point to focus your interview
          preparation on the areas that matter most.
        </p>
        <span className="ir-score-status">
          <span className="ir-status-dot" />
          {scoreLabel}
        </span>
      </div>

      <div
        className="ir-score-ring-wrap"
        role="img"
        aria-label={`Match score ${safeScore} out of 100`}
      >
        <svg viewBox="0 0 112 112" className="ir-score-svg">
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="ir-ring-track"
          />
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="ir-ring-progress"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="ir-score-label">
          <strong>{safeScore}</strong>
          <span>/ 100</span>
        </div>
      </div>
    </section>
  );
};

const Accordion = ({ header, children, number }) => {
  const [open, setOpen] = useState(false);

  return (
    <article className={`ir-accordion ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="ir-accordion-trigger"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
      >
        <span className="ir-accordion-number">{number}</span>

        <span className="ir-accordion-heading">{header}</span>

        <span className="ir-accordion-toggle" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="ir-accordion-content">
          {children}
        </div>
      )}
    </article>
  );
};

const EmptyState = ({ title, description }) => (
  <div className="ir-empty-state">
    <span className="ir-empty-icon">✳</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Interview = () => {
  const { interviewId } = useParams();
  const { report, loading, getReportById } = useInterview();

  const [activeTab, setActiveTab] = useState("technical");
  const [loadError, setLoadError] = useState("");

  // Reuse the report already generated, or fetch it on direct URL/refresh.
  useEffect(() => {
    let cancelled = false;

    const loadReport = async () => {
      if (!interviewId || report?._id === interviewId) return;

      setLoadError("");

      try {
        await getReportById({ interviewId });
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error?.response?.data?.message ||
              error?.message ||
              "Could not load this interview report."
          );
        }
      }
    };

    loadReport();

    return () => {
      cancelled = true;
    };
    // Load when the URL's report ID changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId]);

  const currentReport =
    report && (!interviewId || report._id === interviewId)
      ? report
      : null;

  if (loading && !currentReport) {
    return (
      <main className="ir-loading">
        <div className="ir-loading-card">
          <span className="ir-spinner" />
          <span className="ir-overline">INTERVIEW STUDIO</span>
          <h2>Preparing your report</h2>
          <p>Loading your personalized interview preparation guide...</p>
        </div>
      </main>
    );
  }

  if (loadError && !currentReport) {
    return (
      <main className="ir-loading">
        <div className="ir-loading-card">
          <div className="ir-error-icon">!</div>
          <h2>Report unavailable</h2>
          <p>{loadError}</p>
          <button
            className="ir-primary-button"
            type="button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!currentReport) {
    return (
      <main className="ir-loading">
        <div className="ir-loading-card">
          <span className="ir-spinner" />
          <h2>Loading interview report...</h2>
        </div>
      </main>
    );
  }

  // Support the current camelCase schema and older snake_case reports.
  const matchScore =
    currentReport.matchScore ?? currentReport.match_score ?? 0;

  const technicalQuestions = Array.isArray(
    currentReport.technicalQuestions ?? currentReport.technical_questions
  )
    ? currentReport.technicalQuestions ?? currentReport.technical_questions
    : [];

  const behavioralQuestions = Array.isArray(
    currentReport.behavioralQuestions ?? currentReport.behavioral_questions
  )
    ? currentReport.behavioralQuestions ?? currentReport.behavioral_questions
    : [];

  const skillGaps = Array.isArray(
    currentReport.skillGap ?? currentReport.skill_gap
  )
    ? currentReport.skillGap ?? currentReport.skill_gap
    : [];

  const preparationPlan = Array.isArray(
    currentReport.preparationPlan ?? currentReport.preparation_plan
  )
    ? currentReport.preparationPlan ?? currentReport.preparation_plan
    : [];

  const title = currentReport.title || "Interview Preparation Guide";

  const renderQuestion = (item, index, type) => {
    const question =
      typeof item === "string" ? item : item?.question || "Interview question";

    const intention =
      typeof item === "object" ? item?.intention : "";

    const answer =
      typeof item === "object" ? item?.answer : "";

    return (
      <Accordion
        key={`${type}-${index}`}
        number={`Q${String(index + 1).padStart(2, "0")}`}
        header={question}
      >
        {intention && (
          <div className="ir-answer-block">
            <span className="ir-answer-label">WHAT THE INTERVIEWER WANTS</span>
            <p>{intention}</p>
          </div>
        )}

        <div className="ir-answer-block ir-answer-block--highlight">
          <span className="ir-answer-label">SUGGESTED ANSWER</span>
          <p>
            {answer ||
              "Prepare a specific answer using your own experience, projects, and relevant skills."}
          </p>
        </div>
      </Accordion>
    );
  };

  return (
    <main className="ir-page">
      <div className="ir-layout">
        <aside className="ir-sidebar">
          <a href="/" className="ir-brand">
            <span className="ir-brand-mark">I</span>
            <span>
              <strong>INTERVIEW</strong>
              <small>PREP STUDIO</small>
            </span>
          </a>

          <div className="ir-sidebar-content">
            <span className="ir-sidebar-eyebrow">YOUR CAREER TOOLKIT</span>
            <h2>
              Prepare with
              <br />
              <em>confidence.</em>
            </h2>
            <p>
              Your personalized guide to understanding the role, preparing
              strong answers, and identifying your next steps.
            </p>

            <div className="ir-sidebar-steps">
              <div className="ir-sidebar-step">
                <span>01</span>
                <div>
                  <strong>Understand your match</strong>
                  <small>Review your compatibility score</small>
                </div>
              </div>

              <div className="ir-sidebar-step">
                <span>02</span>
                <div>
                  <strong>Practice your answers</strong>
                  <small>Explore questions and guidance</small>
                </div>
              </div>

              <div className="ir-sidebar-step">
                <span>03</span>
                <div>
                  <strong>Build your preparation plan</strong>
                  <small>Work through your next seven days</small>
                </div>
              </div>
            </div>
          </div>

          <div className="ir-sidebar-footer">
            <span className="ir-footer-dot" />
            YOUR NEXT OPPORTUNITY STARTS HERE
          </div>
        </aside>

        <section className="ir-main">
          <header className="ir-topbar">
            <div>
              <span className="ir-breadcrumb">DASHBOARD / REPORT</span>
              <h1>
                Interview <em>Report</em>
              </h1>
              <p>{title}</p>
            </div>

            <span className="ir-report-badge">
              <span className="ir-status-dot" />
              Report ready
            </span>
          </header>

          <MatchScore score={matchScore} />

          <div className="ir-section-heading">
            <div>
              <span className="ir-overline">YOUR PREPARATION WORKSPACE</span>
              <h2>Build your interview strategy</h2>
            </div>
            <span className="ir-section-count">
              {technicalQuestions.length +
                behavioralQuestions.length +
                skillGaps.length +
                preparationPlan.length}{" "}
              items
            </span>
          </div>

          <nav className="ir-tabs" aria-label="Report sections">
            {tabs.map((tab) => {
              const count = {
                technical: technicalQuestions.length,
                behavioral: behavioralQuestions.length,
                gaps: skillGaps.length,
                plan: preparationPlan.length,
              }[tab.id];

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`ir-tab ${
                    activeTab === tab.id ? "ir-tab--active" : ""
                  }`}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  <span className="ir-tab-icon">{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className="ir-tab-count">{count}</span>
                </button>
              );
            })}
          </nav>

          <section className="ir-panel">
            {activeTab === "technical" && (
              <>
                <div className="ir-panel-heading">
                  <div>
                    <span className="ir-overline">TECHNICAL ROUND</span>
                    <h3>Show what you know</h3>
                    <p>
                      Review each question, understand its purpose, and
                      practice the suggested answer in your own words.
                    </p>
                  </div>
                  <span className="ir-panel-icon">⌘</span>
                </div>

                {technicalQuestions.length ? (
                  <div className="ir-questions-list">
                    {technicalQuestions.map((item, index) =>
                      renderQuestion(item, index, "technical")
                    )}
                  </div>
                ) : (
                  <EmptyState
                    title="No technical questions yet"
                    description="This report does not contain technical questions."
                  />
                )}
              </>
            )}

            {activeTab === "behavioral" && (
              <>
                <div className="ir-panel-heading">
                  <div>
                    <span className="ir-overline">BEHAVIORAL ROUND</span>
                    <h3>Tell your story clearly</h3>
                    <p>
                      Practice examples from your work, studies, and projects.
                      The STAR method can help structure your answers.
                    </p>
                  </div>
                  <span className="ir-panel-icon">◎</span>
                </div>

                {behavioralQuestions.length ? (
                  <div className="ir-questions-list">
                    {behavioralQuestions.map((item, index) =>
                      renderQuestion(item, index, "behavioral")
                    )}
                  </div>
                ) : (
                  <EmptyState
                    title="No behavioral questions yet"
                    description="This report does not contain behavioral questions."
                  />
                )}
              </>
            )}

            {activeTab === "gaps" && (
              <>
                <div className="ir-panel-heading">
                  <div>
                    <span className="ir-overline">SKILL ASSESSMENT</span>
                    <h3>Turn gaps into strengths</h3>
                    <p>
                      Prioritize the skills that need more practice before
                      your interview.
                    </p>
                  </div>
                  <span className="ir-panel-icon">↗</span>
                </div>

                {skillGaps.length ? (
                  <div className="ir-gaps-list">
                    {skillGaps.map((gap, index) => {
                      const skill =
                        typeof gap === "string" ? gap : gap?.skill || "Skill";
                      const severity =
                        typeof gap === "object" ? gap?.severity : "Medium";

                      return (
                        <article className="ir-gap-card" key={`gap-${index}`}>
                          <span className="ir-gap-index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="ir-gap-copy">
                            <h4>{skill}</h4>
                            <p>
                              Review this area and prepare an example or
                              practical demonstration where possible.
                            </p>
                          </div>
                          <span
                            className={`ir-severity ir-severity--${String(
                              severity
                            ).toLowerCase()}`}
                          >
                            {severity || "Medium"}
                          </span>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    title="No skill gaps identified"
                    description="Your report did not identify any specific skill gaps."
                  />
                )}
              </>
            )}

            {activeTab === "plan" && (
              <>
                <div className="ir-panel-heading">
                  <div>
                    <span className="ir-overline">YOUR 7-DAY ROADMAP</span>
                    <h3>One step at a time</h3>
                    <p>
                      Follow the daily focus areas and mark tasks complete as
                      you prepare.
                    </p>
                  </div>
                  <span className="ir-panel-icon">▦</span>
                </div>

                {preparationPlan.length ? (
                  <div className="ir-plan-list">
                    {preparationPlan.map((day, index) => {
                      const dayNumber = day?.day ?? index + 1;
                      const focus = day?.focus || `Preparation day ${dayNumber}`;
                      const tasks = Array.isArray(day?.tasks) ? day.tasks : [];

                      return (
                        <Accordion
                          key={`day-${dayNumber}`}
                          number={`DAY ${String(dayNumber).padStart(2, "0")}`}
                          header={focus}
                        >
                          {tasks.length ? (
                            <ul className="ir-task-list">
                              {tasks.map((task, taskIndex) => (
                                <li key={`task-${taskIndex}`}>
                                  <span className="ir-task-bullet">✓</span>
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="ir-no-tasks">
                              No tasks are available for this day.
                            </p>
                          )}
                        </Accordion>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    title="No preparation plan available"
                    description="This report does not contain a daily preparation plan."
                  />
                )}
              </>
            )}
          </section>

          <footer className="ir-page-footer">
            <span>INTERVIEW PREP STUDIO</span>
            <span>Prepare thoughtfully. Interview confidently.</span>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default Interview;
