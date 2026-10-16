
import React, { useRef, useState } from 'react';
import '../style/home.scss';
import { useInterview } from '../hook/useInterview.js';
import { useNavigate } from 'react-router';

const Home = () => {
  const { loading, generateReport } = useInterview();

  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setJSelfDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  // const handleGenerateReport = async () => {
  //   const resume = resumeInputRef.current?.files?.[0];

  //   const data = await generateReport({
  //     jobDescription,
  //     selfDescription,
  //     resume,
  //   });

  //   if (data?._id) {
  //     navigate(`/interview/${data._id}`);
  //   }
  // };


//   const handleGenerateReport = async () => {
//   try {
//     const resume = resumeInputRef.current?.files?.[0] || null;

//     const data = await generateReport({
//       jobDescription,
//       selfDescription,
//       resume,
//     });

//     console.log("Report received in Home:", data);

//     if (data?._id) {
//       navigate(`/interview/${data._id}`);
//     } else {
//       console.error("Report ID missing:", data);
//       alert("Report ID nahi mili. API response check karein.");
//     }
//   } catch (error) {
//     alert(error?.message || "Report generate nahi hui.");
//   }
// };

const handleGenerateReport = async () => {
  try {
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    const resume = resumeInputRef.current?.files?.[0] || null;

    const data = await generateReport({
      jobDescription,
      selfDescription,
      resume,
    });
    console.log(data);
    
    if (data?._id) {
      navigate(`/interview/${data._id}`);
    }
  } catch (error) {
    console.error("Report generation failed:", error);

    alert(
      error?.response?.data?.message ||
      error?.message ||
      "Failed to generate interview report."
    );
  }
};

  if (loading) {
    return (
      <main className="home-loading">
        <div className="loading-card">
          <span className="loading-spinner" />
          <h2>Building your interview plan</h2>
          <p>Analyzing your details and preparing your report...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="home-shell">
        {/* Branding panel */}
        <aside className="home-sidebar">
          <div className="home-brand">
            <div className="home-brand-icon">I</div>
            <span>INTERVIEW STUDIO</span>
          </div>

          <div className="sidebar-content">
            <span className="home-eyebrow">
              PREPARE WITH PURPOSE
            </span>

            <h1>
              Your next
              <br />
              opportunity
              <br />
              starts <em>here.</em>
            </h1>

            <p>
              Turn your experience and career goals into
              a focused interview preparation plan tailored
              to the role you want.
            </p>

            <div className="sidebar-steps">
              <div className="sidebar-step">
                <span className="step-number">01</span>
                <div>
                  <strong>Add the job description</strong>
                  <p>Tell us about your target role.</p>
                </div>
              </div>

              <div className="sidebar-step">
                <span className="step-number">02</span>
                <div>
                  <strong>Share your background</strong>
                  <p>Upload your resume and introduce yourself.</p>
                </div>
              </div>

              <div className="sidebar-step">
                <span className="step-number">03</span>
                <div>
                  <strong>Get your interview plan</strong>
                  <p>Prepare with a more focused approach.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="home-sidebar-footer">
            <span className="status-dot" />
            Your next chapter begins with preparation.
          </div>
        </aside>

        {/* Main form */}
        <section className="home-form-section">
          <div className="home-form">
            <header className="home-header">
              <div className="mobile-brand">
                <div className="home-brand-icon">I</div>
                <span>INTERVIEW STUDIO</span>
              </div>

              <span className="home-eyebrow">
                YOUR PERSONAL INTERVIEW ASSISTANT
              </span>

              <h2>
                Let's get you
                <br />
                <em>interview-ready.</em>
              </h2>

              <p>
                Share a few details below to generate your
                personalized interview report.
              </p>
            </header>

            <div className="interview-input-group">
              <div className="left">
                <div className="field-heading">
                  <label
                    className="field-label"
                    htmlFor="jobDescription"
                  >
                    Job description
                    <span className="required-mark">*</span>
                  </label>

                  <span className="field-caption">STEP 01</span>
                </div>

                <textarea
                  name="jobDescription"
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here, including the role, responsibilities, qualifications, and requirements..."
                  required
                />

                <div className="field-footnote">
                  <span className="footnote-dot" />
                  Include as much detail as possible for a tailored plan.
                </div>
              </div>

              <div className="divider" />

              <div className="right">
                <div className="input-group">
                  <div className="field-heading">
                    <label className="field-label" htmlFor="resume">
                      Your resume
                    </label>

                    <span className="field-caption">OPTIONAL</span>
                  </div>

                  <label
                    className={`file-label ${selectedFile ? 'has-file' : ''}`}
                    htmlFor="resume"
                  >
                    <div className="upload-icon">
                      {selectedFile ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                          <path d="M14 3v6h5M9 15l2 2 4-4" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                          <path d="M4 16.5v2A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5v-2" />
                        </svg>
                      )}
                    </div>

                    <strong className="upload-title">
                      {selectedFile ? 'Resume selected' : 'Upload your resume'}
                    </strong>

                    <span className="upload-text">
                      {selectedFile
                        ? selectedFile.name
                        : 'Click to browse your files'}
                    </span>

                    <span className="upload-sub">
                      PDF document · Maximum 10 MB
                    </span>
                  </label>

                  <input
                    ref={resumeInputRef}
                    type="file"
                    name="resume"
                    id="resume"
                    accept=".pdf,application/pdf"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) {
                        setSelectedFile(null);
                        return;
                      }

                      if (
                        file.type !== 'application/pdf' ||
                        file.size > 10 * 1024 * 1024
                      ) {
                        e.target.value = '';
                        setSelectedFile(null);
                        window.alert(
                          'Please select a PDF file smaller than 10 MB.'
                        );
                        return;
                      }

                      setSelectedFile(file);
                    }}
                  />

                  {selectedFile && (
                    <button
                      type="button"
                      className="remove-file"
                      onClick={() => {
                        resumeInputRef.current.value = '';
                        setSelectedFile(null);
                      }}
                    >
                      Remove resume
                    </button>
                  )}
                </div>

                <div className="input-group self-description-group">
                  <div className="field-heading">
                    <label
                      className="field-label"
                      htmlFor="selfDescription"
                    >
                      Tell us about yourself
                    </label>

                    <span className="field-caption">STEP 02</span>
                  </div>

                  <textarea
                    name="selfDescription"
                    id="selfDescription"
                    value={selfDescription}
                    onChange={(e) => setJSelfDescription(e.target.value)}
                    placeholder="Your experience, strengths, achievements, skills, and career goals..."
                  />
                </div>

                <button
                  type="button"
                  className="primary-button"
                  onClick={handleGenerateReport}
                  disabled={!jobDescription.trim() || loading}
                >
                  <span>Generate interview report</span>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M13 2 4 14h7l-1 8 10-12h-7l1-8Z" />
                  </svg>
                </button>

                <p className="form-note">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="5" y="10" width="14" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  Your details are used to prepare your interview report.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
