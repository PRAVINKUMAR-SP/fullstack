import React from 'react'
import { FaCentos } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { IoIosLogOut, IoMdAddCircleOutline } from 'react-icons/io'
import { MdAddShoppingCart, MdFormatListBulleted } from 'react-icons/md'

const Sidebar = ({setTocken}) => {
  return (
    <div className='sidebar w-[22%] min-h-screen border-r-2'>
      <div className="sidebar-header flex justify-center gap-5 mt-5 -ml-15">
        <FaCentos className="sidebar-logo text-[35px] " />
        <h2 className='text-[30px]'>A2Zcart</h2>
      </div>
      <div className="sidebar-links flex flex-col pt-10">
        <NavLink to="/add" className="sidebar-link flex items-center gap-3 border-b border-b-red-100 p-5 text-decoration-none text-green-900 hover:bg-amber-100 transition-all ">
        <IoMdAddCircleOutline className="sidebar-link-icon text-[25px] text-black" />
        <p className="sidebar-text text-[20px]">Add Product</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-link flex items-center gap-3 border-b border-b-red-100 p-5 text-decoration-none text-green-900 hover:bg-amber-100 transition-all">
        <MdFormatListBulleted className="sidebar-link-icon text-[25px] text-black" />
        <p className="sidebar-text text-[20px]">List Product</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-link flex items-center gap-3 border-b border-b-red-100 p-5 text-decoration-none text-green-900 hover:bg-amber-100 transition-all">
        <MdAddShoppingCart className="sidebar-link-icon text-[25px] text-black" />
        <p className="sidebar-text text-[20px]">Orders</p>
        </NavLink>
        <button  onClick={()=>setTocken("")} className="sidebar-link cursor-pointer flex items-center gap-3 border-b border-b-red-100 p-5 text-decoration-none text-green-900 hover:bg-amber-100 transition-all">
          <IoIosLogOut className='sidebar-link-icon text-[25px] text-black'/>
          <p className="sidebar-text text-[20px]">Lougout</p>
        </button>
      </div>
    </div>
  )
}

export default Sidebar