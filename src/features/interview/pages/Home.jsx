import React, { useRef, useState } from 'react'
import "../style/home.scss"
import {useInterview} from "../hook/useInterview.js"
import { useNavigate } from 'react-router'

const Home = () => {
  const {loading , generateReport} = useInterview()
  const [jobDescription , setJobDescription] =useState('')
  const [selfDescription , setJSelfDescription] =useState('')
  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const handleGenerateReport = async() => {
    const resume = resumeInputRef.current.files[0]
    const data =await generateReport({jobDescription , selfDescription , resume})
    navigate(`/interview/${data._id}`)
  }

  if(loading){
    return (
      <main className='loading-screen'>
        <h1>Loading Your Interview Plan........</h1>
      </main>
    )
  }
  return (
    <main className='home'>
      <div className="header">
        <h1>Interview <em>Prep</em> Studio</h1>
        <p>Generate a tailored interview report from your job description & resume</p>
      </div>

      <div className="interview-input-group">
        <div className='left'>
          <label className="field-label" htmlFor="jobDescription">Job Description</label>
          <textarea
            name="jobDescription"
            onChange={(e)=>{setJobDescription(e.target.value)}}
            id="jobDescription"
            placeholder='Paste the full job description here — role, responsibilities, requirements...'
          ></textarea>
        </div>

        <div className="divider"></div>

        <div className='right'>
          <div className='input-group'>
            <p className="field-label">
              Resume
              <small className='highlight'> optional but recommended</small>
            </p>
            <label className='file-label' htmlFor="resume">
              <div className="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 15V3m0 0L8 7m4-4l4 4"/>
                  <path d="M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/>
                </svg>
              </div>
              <span className="upload-text"><strong>Click to upload</strong> your resume</span>
              <span className="upload-sub">PDF only · max 10 MB</span>
            </label>
            <input ref={resumeInputRef} hidden type="file" name="resume" id="resume" accept='.pdf' />
          </div>

          <div className='input-group'>
            <label className="field-label" htmlFor="selfDescription">Self Description</label>
            <textarea
              name='selfDescription'
              onChange={(e)=>{setJSelfDescription(e.target.value)}}
              id='selfDescription'
              placeholder='Briefly describe yourself — background, strengths, career goals...'
            />
          </div>

          <button className='button primary-button' onClick={handleGenerateReport}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Generate Interview Report
          </button>
        </div>
      </div>
    </main>

    
  )
}

export default Home