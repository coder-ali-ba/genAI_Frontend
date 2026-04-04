// import React from 'react'
// import "../style/home.scss"
// const Home = () => {
//   return (
//     <main className='home'>
//         <div className="interview-input-group">
//           <div className='left'>
//             <label htmlFor="jobDescription">Job Description</label>
//             <textarea name="jobDescription" id="jobDescription" placeholder='Enter job description here.....'></textarea>
//         </div>
//         <div className='right'>
//             <div className='input-group' >
//                 <p>Resume <small className='highlight'> (Use resume and self description for better result) </small></p>
//                 <label className='file-label' htmlFor="resume">Upload Resume</label>
//                 <input hidden type="file" name="resume" id="resume" accept='.pdf' />
//             </div>
//             <div className='input-group'>
//                 <label htmlFor="selfDescription"></label>
//                 <textarea type="text" name='selfDescription' id='selfDescription' placeholder='Enter self description here....' />
//             </div>
//             <button className='button primary-button'>Generate Interview Report</button>
//         </div>
//         </div>
        
//     </main>
//   )
// }

// export default Home





import React from 'react'
import "../style/home.scss"

const Home = () => {
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
            <input hidden type="file" name="resume" id="resume" accept='.pdf' />
          </div>

          <div className='input-group'>
            <label className="field-label" htmlFor="selfDescription">Self Description</label>
            <textarea
              name='selfDescription'
              id='selfDescription'
              placeholder='Briefly describe yourself — background, strengths, career goals...'
            />
          </div>

          <button className='button primary-button'>
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