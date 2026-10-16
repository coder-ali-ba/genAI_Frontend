// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router'
// import { useAuth } from '../hooks/useAuth'

// function Register() {
//   const {loading , handleRegister} =useAuth()
//   const navigate = useNavigate()
//   const [userName , setUserName] = useState("")
//   const [email , setrEmail] = useState("")
//   const [password , setPassword] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     handleRegister({userName , email , password})   
//   }
//   if(loading){
//     return (<main><h1>Loading.......</h1></main>)
//   }
//   return (
//        <main>
//         <div className='form-container'>
//             <h1>Register</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="input-group">
//                     <label htmlFor="username">Username</label>
//                     <input type="text" name='username' onChange={(e)=>{setUserName(e.target.value)}} id="username" placeholder='Enter Username'/>
//                 </div>
//                 <div className="input-group">
//                     <label htmlFor="email">Email</label>
//                     <input type="email" name='email' id="email" onChange={(e)=>{setrEmail(e.target.value)}} placeholder='Enter email address'/>
//                 </div> 
//                 <div className="input-group">
//                     <label htmlFor="password">Password</label>
//                     <input type="password" name='password' id="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter password'/>
//                 </div>

//                 <button className='button primary-button'>Register</button>
//             </form>
//             <p>Already have an account!! <Link to="/login">Login</Link></p>
//         </div>
//     </main>
//   )
// }

// export default Register



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import '../authForm.scss';

function Register() {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ userName, email, password });
  };

  if (loading) {
    return (
      <main className="auth-page">
        <div className="auth-loading">
          <span className="auth-spinner" />
          <h2>Creating your account...</h2>
          <p>Please wait a moment.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-layout">
        <section className="auth-visual">
          <div className="auth-brand">
            <div className="auth-brand-icon">A</div>
            <span>AUTHENTIC</span>
          </div>

          <div className="auth-visual-content">
            <span className="auth-eyebrow">
              YOUR JOURNEY STARTS HERE
            </span>

            <h1>
              A better way
              <br />
              to <span>get started.</span>
            </h1>

            <p>
              Create your account and enjoy a simpler,
              more personal experience from day one.
            </p>

            <div className="auth-feature">
              <span className="auth-check">✓</span>
              <div>
                <strong>Simple and secure</strong>
                <p>Your account, your space.</p>
              </div>
            </div>

            <div className="auth-feature">
              <span className="auth-check">✓</span>
              <div>
                <strong>Made for you</strong>
                <p>Everything starts in one place.</p>
              </div>
            </div>
          </div>

          <div className="auth-visual-footer">
            A fresh start begins with one step.
          </div>
        </section>

        <section className="auth-form-section">
          <div className="auth-form-card">
            <div className="auth-mobile-brand">
              <div className="auth-brand-icon">A</div>
              <span>AUTHENTIC</span>
            </div>

            <div className="auth-heading">
              <span className="auth-eyebrow">
                CREATE YOUR ACCOUNT
              </span>
              <h2>Join us today<span>.</span></h2>
              <p>
                Enter your details below to create your account.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Choose a username"
                  autoComplete="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setrEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="input-hint">
                  Choose a password you haven't used elsewhere.
                </span>
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                Create account
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="auth-switch">
              Already have an account?
              {' '}
              <Link to="/login">Sign in</Link>
            </div>

            <p className="auth-legal">
              By creating an account, you agree to use the
              service responsibly.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;
