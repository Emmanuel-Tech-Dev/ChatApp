import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
const Login = () => {

  const [err , setErr] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try{

  await signInWithEmailAndPassword(auth , email , password)
  navigate('/')
  
    }catch(err){
      setErr(true)
    }

  }

  return (
    <div>
      <div className="form-container bg-blue-300 h-[100vh] flex justify-center items-center">
        <div className="form-warapper bg-slate-100 px-10 py-12 rounded">
          <div className="form-header">
            <h1 className="text-center pb-2 text-xl font-bold text-blue-400">
              Welcome to ChatTinga
            </h1>
            <h2 className="text-center pb-5 text-md font-semibold text-blue-700">
              Log In
            </h2>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              className="p-2 border-b-2 border-blue-200 bg-transparent  focus:outline-none "
              type="email"
              placeholder="email"
            />
            <input
              className="p-2 border-b-2 border-blue-200 bg-transparent   focus:outline-none "
              type="password"
              placeholder="password"
            />

            <button className="bg-blue-400 text-slate-50 py-2 rounded-sm">
              Log In
            </button>
            {err && <span>Something went wrong in your auth</span>}
          </form>
          <p className="mt-5 text-center text-gray-500">
            Do not have an account yet? <Link to={'/signup'}>SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login
