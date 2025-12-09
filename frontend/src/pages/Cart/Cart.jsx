import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { MdDelete, MdDeleteForever } from 'react-icons/md'
import CartTotal from '../../components/CartTotal/CartTotal'
import {  Link, useNavigate } from 'react-router-dom'

const Cart = () => {

  const Navigate = useNavigate();
  
    const handleNavigation = (path) => {
    Navigate(path);
  }
  const {products,currency,cartItems,updateQuantity} = useContext(ShopContext)

  const [cartData,setCartData] = useState([])

  useEffect(()=>{
    if(products.length === 0) return;

    if(!cartItems || typeof cartItems !== 'object') {
      setCartData([]);
      return;
    }

    const tempData = Object.entries(cartItems).flatMap(([itemId,sizes])=>
    Object.entries(sizes).filter(([size,quantity])=> quantity > 0).map(([size,quantity])=>({
      _id: itemId,
      size: size,
      quantity: quantity
    })));

    setCartData(tempData)
  },[cartItems, products])
  return (
    <div className='w-[80%] m-auto mt-5 mb-5'>
      <div className="cart-count-container">
        {
          cartData.map((item, index)=>{
            const productData = products.find(product=> product._id === item._id)
            return(
              <div key={index} className="cart-item w-full  p-4 border-b border-t gap-4">
                <div className="cart-item-info flex items-center w-full">
                  <div className="cart-item-img w-[20%]">
                    <img src={productData.images} alt="" className='h-40'/>
                  </div>
                  <div className="cart-item-details ml-15 w-[40%]">
                    <h2 className="cart-product-name text-[20px] font-medium">{productData.name}</h2>
                    <span className='flex gap-5 mt-1 items-center'>
                      <p className="cart-product-price text-green-700 text-[18px] font-semibold">{currency}{productData.price}</p>
                      <p className="cart-product-size text-gray-600 border p-1">Size: {item.size}</p>
                    </span>
                    </div>
                  <div className="quantity-selector flex ml-15 items-center gap-3 mt-2">
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" min={1} defaultValue={item.quantity} onChange={(e)=>e.target.value === '' || e.target.value === 0 ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='quantity-input w-16 border p-1'/>
                    <MdDelete className='delete-icon' onClick={()=>updateQuantity(item._id, item.size,0)}/>
                  </div>
              </div>
              </div>
            )
          })
        }
      </div>
      <div className="checkout-container mt-3 p-5 bg-gray-300 w-[500px] h-auto">
        <div className="ckeckout-box w-full ">
        <CartTotal/>
        <div className="checlkout-btn items-center content-center">
          <Link to='/checkout'>
          <button  className='bg-black text-white w-40 h-10 rounded-md'>Procced To Checkout</button></Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Cart