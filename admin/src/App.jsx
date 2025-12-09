import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './components/Login/Login'
import { ToastContainer} from 'react-toastify'

export const backendUrl = 'https://fullstack-backend-euex.onrender.com';
const App = () => {
  const [token, setTocken] = useState(localStorage.getItem('token') || '')

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className='app-container'>
      <ToastContainer/>
      {
        token === '' ? (
          <Login setToken={setTocken}/>
        ) : (
          <>
            <div className="app-content">
              <Sidebar setTocken={setTocken}/>
              <div className="page-content">
                <Routes>
                  <Route path='/add' element={<Add token={token}/>} />
                  <Route path='/list' element={<List token={token}/>} />
                  <Route path='/orders' element={<Orders token={token}/>} />
                </Routes>
              </div>
            </div></>
        )
      }
    </div>
  )
}

export default App
