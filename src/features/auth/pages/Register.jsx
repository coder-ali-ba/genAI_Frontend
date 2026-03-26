import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

function Register() {
  const {loading , handleRegister} =useAuth()
  const navigate = useNavigate()
  const [userName , setUserName] = useState("")
  const [email , setrEmail] = useState("")
  const [password , setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    handleRegister({userName , email , password})   
  }
  if(loading){
    return (<main><h1>Loading.......</h1></main>)
  }
  return (
       <main>
        <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' onChange={(e)=>{setUserName(e.target.value)}} id="username" placeholder='Enter Username'/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id="email" onChange={(e)=>{setrEmail(e.target.value)}} placeholder='Enter email address'/>
                </div> 
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter password'/>
                </div>

                <button className='button primary-button'>Register</button>
            </form>
            <p>Already have an account!! <Link to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register
