import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { BiUser, BiCart } from 'react-icons/bi'
import { ShopContext } from '../../context/ShopContext';

//const Navigate = useNavigate();



const Navbar = () => {
  const Navigate = useNavigate();

  const handleNavigation = (path) => {
  Navigate(path);
}

const logout = () =>{
  Navigate('/login')
  localStorage.removeItem('token')
  setToken('')
}
  const {updateSearchTerm,getCartCount,token,setToken} = useContext(ShopContext);
  const [searchInput, setSearchInput] = useState('');
  const handleSearch = () => {
    updateSearchTerm(searchInput);
  }
  return (
    <div>
      <nav className="navbar w-full flex items-center justify-center flex-col gap-3 p-4 text-[18px]">
        <div className="nav-top w-[90%] m-auto flex items-center justify-between gap-50">
          <Link to="/">
            <h2 className='text-[24px] text-green-800 font-bold w-[25%]'>A2Zcart</h2>
          </Link>
          <div className="search-bar flex gap-10 w-[50%] bg-blue-200 rounded-sm h-10">
            <input type="text" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} className='search-input w-[85%] border-none hover:outline-none focus:outline-none ::placeholder placeholder:p-3' placeholder='Search for Product....'/>
            <button onClick={handleSearch} className="search-btn w-[20%] bg-green-800 text-white rounded-sm cursor-pointer ">Search</button>
          </div>
          <div className="icons flex items-center gap-6 w-[15%]">
            <div className="profile-group flex items-center gap-2 relative">
              <BiUser className='icon text-[25px] font-medium cursor-pointer'/>
              <div className="dropdown-menu text-gray-500 absolute text-center -top-40 -right-20 bg-white shadow-lg rounded-md hidden group-hover:block w-30 h-auto">
                <Link to="/login">
                <p className="dropdown-item border-gray-600 hover:bg-green-400 hover:text-white w-[90%] m-auto rounded mb-3 mt-2">Account</p>
                </Link>
                <p onClick={logout} className="dropdown-item border-gray-600  hover:bg-green-400 hover:text-white mb-3 w-[90%] m-auto rounded cursor-pointer">Logout</p>
              </div>
            </div>
            <div className="cart-icon flex items-center gap-2 relative" onClick={()=>handleNavigation("/cart")} >
              <BiCart className='icon text-[28px] font-medium cursor-pointer'/>
              <span className="cart-count absolute  -top-3 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{getCartCount()}</span>
            </div>
          </div>
        </div>
        <div className="nav-bottom flex items-center justify-center w-full text-green-800 h-12">
          <div className="nav-container flex items-center gap-20">
            <div onClick={()=>handleNavigation("/category/Men")} className="navbar-link cursor-pointer text-[18px] font-semibold">Men</div>
            <div onClick={()=>handleNavigation("/category/Women")} className="navbar-link cursor-pointer text-[18px] font-semibold">Women</div>
            <div onClick={()=>handleNavigation("/category/Kids")} className="navbar-link cursor-pointer text-[18px] font-semibold">Kids</div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar