import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [firstName,setfirstName] = useState('')
  const [lastName,setlastName] = useState('')

  const [email,setEmail] = useState("")
  const [passsword,setPassword] = useState("")
  const [userData,setUserData] = useState({})

  const SumbitHandler = (e)=>{
      e.preventDefault()
      const newUser = {
        fullname:{
          firstName:firstName,
          lastName:lastName,
        },

        email:email,
        passsword:passsword
      }
      console.log(newUser)

      setfirstName("")
      setlastName("")
setEmail("")
setPassword("")
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div>
    <img className="w-16 mb-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt=""/>
      <form onSubmit={(e)=>SumbitHandler(e)}>

      <h3 className="text-lg font-medium mb-2">What&apos;s your name</h3>
      <div className='gap-4'>
      <input
          className="bg-white mb-7 w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm"
          required
          value={firstName}
          onChange={(e)=>setfirstName(e.target.value)}
          type="text"
          placeholder="First name"
        ></input>
<input
          className="bg-white mb-7 rounded-lg px-4 py-2 border w-1/2 text-base placeholder:text-sm"
          required
          value={lastName}
          onChange={(e)=>setlastName(e.target.value)}
          type="text"
          placeholder="Last name"
        ></input>
      </div>



        <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
        <input
          className="bg-white mb-7 rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email"
          placeholder="email@example.com"
        ></input>
        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input
          required
          value={passsword}
          onChange={(e)=>setPassword(e.target.value)}
          className="bg-white mb-7 rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm"
          type="password"
          placeholder="password"
        ></input>
        <button className="bg-[#111] mb-3 text-white font-semibold rounded px-4 py-2 border w-full text-base placeholder:text-sm">
          Register
        </button>
        <p className="text-center">Already have account?
        <Link className="text-blue-600" to={'/login'}>Login here</Link>

        </p>
      </form>
    </div>
    <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
    </div>
  )
}

export default UserSignup