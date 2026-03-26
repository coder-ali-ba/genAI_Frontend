import React, { useState } from 'react'
import '../authForm.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const {loading , handleLogin} = useAuth()
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const handleSubmit = async(e) =>{
        e.preventDefault()
        handleLogin({email , password})
    }
    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }
  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} name='email' id="email" placeholder='Enter email address'/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} name='password' id="password" placeholder='Enter password'/>
                </div>

                <button className='button primary-button'>Login</button>
            </form>
            <p>Don't have an account!! <Link to="/register">Register</Link></p>

        </div>
    </main>
  )
}

export default Login
