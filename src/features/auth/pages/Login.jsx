// // import React, { useState } from 'react'
// // import '../authForm.scss'
// // import { Link } from 'react-router'
// // import { useAuth } from '../hooks/useAuth'

// // const Login = () => {
// //     const {loading , handleLogin} = useAuth()
// //     const [email , setEmail] = useState("")
// //     const [password , setPassword] = useState("")

// //     const handleSubmit = async(e) =>{
// //         e.preventDefault()
// //         handleLogin({email , password})
// //     }
// //     if(loading){
// //         return (<main><h1>Loading.......</h1></main>)
// //     }
// //   return (
// //     <main>
// //         <div className='form-container'>
// //             <h1>Login</h1>
// //             <form onSubmit={handleSubmit}>
// //                 <div className="input-group">
// //                     <label htmlFor="email">Email</label>
// //                     <input type="email" onChange={(e)=>{setEmail(e.target.value)}} name='email' id="email" placeholder='Enter email address'/>
// //                 </div>
// //                 <div className="input-group">
// //                     <label htmlFor="password">Password</label>
// //                     <input type="password" onChange={(e)=>{setPassword(e.target.value)}} name='password' id="password" placeholder='Enter password'/>
// //                 </div>

// //                 <button className='button primary-button'>Login</button>
// //             </form>
// //             <p>Don't have an account!! <Link to="/register">Register</Link></p>

// //         </div>
// //     </main>
// //   )
// // }

// // export default Login




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router';
// import { useAuth } from '../hooks/useAuth';
// import './Auth.scss';

// function Login() {
//   const { loading, handleLogin } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleLogin({ email, password });
//   };

//   if (loading) {
//     return (
//       <main className="auth-page">
//         <div className="auth-loading">
//           <span className="auth-spinner" />
//           <h2>Signing you in...</h2>
//           <p>Please wait a moment.</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="auth-page">
//       <div className="auth-layout">
//         {/* Left branding panel */}
//         <section className="auth-visual">
//           <div className="auth-brand">
//             <div className="auth-brand-icon">A</div>
//             <span>AUTHENTIC</span>
//           </div>

//           <div className="auth-visual-content">
//             <span className="auth-eyebrow">
//               WELCOME BACK
//             </span>

//             <h1>
//               Good to see
//               <br />
//               you <span>again.</span>
//             </h1>

//             <p>
//               Sign in to your account and pick up right
//               where you left off. Your next step starts here.
//             </p>

//             <div className="auth-feature">
//               <span className="auth-check">✓</span>
//               <div>
//                 <strong>Your space, always</strong>
//                 <p>Everything you need in one place.</p>
//               </div>
//             </div>

//             <div className="auth-feature">
//               <span className="auth-check">✓</span>
//               <div>
//                 <strong>Simple and secure</strong>
//                 <p>A smooth experience every time.</p>
//               </div>
//             </div>
//           </div>

//           <div className="auth-visual-footer">
//             Great to have you back.
//           </div>
//         </section>

//         {/* Right login form */}
//         <section className="auth-form-section">
//           <div className="auth-form-card">
//             <div className="auth-mobile-brand">
//               <div className="auth-brand-icon">A</div>
//               <span>AUTHENTIC</span>
//             </div>

//             <div className="auth-heading">
//               <span className="auth-eyebrow">
//                 YOUR ACCOUNT
//               </span>

//               <h2>
//                 Welcome back<span>.</span>
//               </h2>

//               <p>
//                 Enter your credentials to access your account.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="input-group">
//                 <label htmlFor="email">Email address</label>

//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="you@example.com"
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="input-group">
//                 <label htmlFor="password">Password</label>

//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder="Enter your password"
//                   autoComplete="current-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="auth-submit"
//                 disabled={loading}
//               >
//                 Sign in
//                 <span aria-hidden="true">→</span>
//               </button>
//             </form>

//             <div className="auth-switch">
//               Don't have an account?
//               {' '}
//               <Link to="/register">Create an account</Link>
//             </div>

//             <p className="auth-legal">
//               Welcome back. We're glad you're here.
//             </p>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import '../authForm.scss';

function Login() {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  if (loading) {
    return (
      <main className="auth-page">
        <div className="auth-loading">
          <span className="auth-spinner" />
          <h2>Signing you in...</h2>
          <p>Please wait a moment.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-layout">
        {/* Left branding panel */}
        <section className="auth-visual">
          <div className="auth-brand">
            <div className="auth-brand-icon">A</div>
            <span>AUTHENTIC</span>
          </div>

          <div className="auth-visual-content">
            <span className="auth-eyebrow">
              WELCOME BACK
            </span>

            <h1>
              Good to see
              <br />
              you <span>again.</span>
            </h1>

            <p>
              Sign in to your account and pick up right
              where you left off. Your next step starts here.
            </p>

            <div className="auth-feature">
              <span className="auth-check">✓</span>
              <div>
                <strong>Your space, always</strong>
                <p>Everything you need in one place.</p>
              </div>
            </div>

            <div className="auth-feature">
              <span className="auth-check">✓</span>
              <div>
                <strong>Simple and secure</strong>
                <p>A smooth experience every time.</p>
              </div>
            </div>
          </div>

          <div className="auth-visual-footer">
            Great to have you back.
          </div>
        </section>

        {/* Right login form */}
        <section className="auth-form-section">
          <div className="auth-form-card">
            <div className="auth-mobile-brand">
              <div className="auth-brand-icon">A</div>
              <span>AUTHENTIC</span>
            </div>

            <div className="auth-heading">
              <span className="auth-eyebrow">
                YOUR ACCOUNT
              </span>

              <h2>
                Welcome back<span>.</span>
              </h2>

              <p>
                Enter your credentials to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email address</label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                Sign in
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="auth-switch">
              Don't have an account?
              {' '}
              <Link to="/register">Create an account</Link>
            </div>

            <p className="auth-legal">
              Welcome back. We're glad you're here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
