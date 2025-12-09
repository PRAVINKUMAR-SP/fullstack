import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../../App'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [curentState,setCurentState] = useState('Login')

  const {token,setToken} = useContext(ShopContext)

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onSubmitHandeler = async(event)=>{
    event.preventDefault()

    try {
      if (curentState === 'Sign Up') {
        const response =await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if (response.data.success) {
          setToken(response.data.token)
          toast.success(response.data.message)
          localStorage.setItem('token',response.data.token)
        }else{
        toast.error(response.data.message)
      }
      }else{
        const response =await axios.post(backendUrl + '/api/user/login',{email,password})
        if (response.data.success) {
          setToken(response.data.token)
          toast.success(response.data.message)
          localStorage.setItem('token',response.data.token)
        }else{
        toast.error(response.data.message)
      }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <div>
      <form onSubmit={onSubmitHandeler} className='auth-form  flex flex-col items-center bg-green-900 text-white :placeholder:text-white gap-4 rounded-md h-100 p-4'>
        <div className="form-header inline-flex gap-2 mt-4">
          <p className="form-title text-[20px] font-semibold">{curentState}</p>
        </div>
        {
          curentState === 'Login' ? null :(
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='form-input w-[80%] p-1 border rounded-md border-red-100 :placeholder:text-white' placeholder='Name' required />
          )
        }
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='form-input w-[80%] p-1 border rounded-md border-red-100 :placeholder:text-white'  type="email" placeholder='Email' required />
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='form-input w-[80%] p-1 border rounded-md border-red-100 :placeholder:text-white'  type="password"  placeholder='Password' required />
        <div className="form-footer flex justify-content-between text-[18px] font-normal gap-15 w-[80%]">
          <p className="forgot-psw cursor-pointer">Forget password</p>
          {
            curentState === 'Login' ?(
              <p className='toggle-auth-state cursor-pointer' onClick={()=>setCurentState('Sign Up')}>Create Account</p>
            ):(
              <p className='toggle-auth-state cursor-pointer'  onClick={()=>setCurentState('Login')}>Login Here</p>
            )
          }
        </div>
        <button className="form-btn bg-green-900 border-2 hover:bg-amber-700 cursor-pointer border-gray-950 w-20 h-10 mt-6 mb-3 text-white rounded-md">
          {curentState === 'Login'? 'Sign In':'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login