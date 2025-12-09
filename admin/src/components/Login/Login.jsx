import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');

  const OnSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      console.log(response)

      if (response.data.success) {
        setToken(response.data.token)
      }
      else{
        toast.error(response.data.message)
      }

      //console.log({email,password});
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    // Add login logic here
  }
  return (
    <div className='login-box flex justify-content-center items-center! min-h-screen w-full bg-red-300'>
      <div className="box  bg-white shadow-md rounded-md  max-w-[500px]! w-full shadow-amber-500">
        <h1 className="login-title text-[1.5em] font-bold mb-5  ">
          Admin Pannel
        </h1>
        <form onSubmit={OnSubmitHandler}>
          <div className="form-group mb-5">
            <p className="form-label text-[0.9rem] font-semibold mb-4">Email Address</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='input w-full p-2 border outline-none rounded-sm' placeholder='Enter your email' required />
          </div>
          <div className="form-group mb-5">
            <p className="form-label text-[0.9rem] font-semibold mb-4">Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='input w-full p-2 border outline-none rounded-sm' placeholder='Enter your passsword' required />
          </div>
          <button className="form-btn block w-full p-3 text-[0.8rem] text-white bg-black border-none rounded-md cursor-pointer" type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login