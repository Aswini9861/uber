import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Userlogin = () => {

    const [email,setEmail] = useState("")
    const [passsword,setPassword] = useState("")
    const [userData,setUserData] = useState({})

    const SumbitHandler = (e)=>{
        e.preventDefault()
        setUserData({
          email:email,
          passsword:passsword
        })

setEmail("")
setPassword("")
    }



  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div>
    <img className="w-16 mb-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt=""/>
      <form onSubmit={(e)=>SumbitHandler(e)}>
        <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
        <input
          className="bg-white mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
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
          className="bg-white mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          type="password"
          placeholder="password"
        ></input>
        <button className="bg-[#111] mb-3 text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base">
          Login
        </button>
        <p className="text-center">New here?
        <Link className="text-blue-600" to={'/signup'}>Create new account</Link>

        </p>
      </form>
    </div>
    <Link to={'/captain-login'} className="bg-green-700 flex items-center justify-center text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-4">
          Sign in as Captain
        </Link>

    </div>
  );
};

export default Userlogin;
