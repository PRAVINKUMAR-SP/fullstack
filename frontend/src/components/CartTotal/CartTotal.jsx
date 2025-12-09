import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'

const CartTotal = () => {
    const {currency, getCartAmount,delivery_fee} = useContext(ShopContext)
  return (
    <div className='p-5'>
        <div className="cart-title">
            <h2 className='text-[22px] font-semibold'>Cart Totals</h2>
        </div>
        <div className="cart-total-details w-[98%] m-auto mt-2">
            <div className="cart-row flex items-center gap-5 justify-between mr-5">
                <p className='text-[18px] font-semibold'>Subtotal</p>
                <p className='text-[18px] font-normal'>{currency}{getCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-row flex items-center gap-5 justify-between mr-5 mt-5">
                <p className='text-[18px] font-semibold'>Shipping Fee</p>
                <p className='text-[18px] font-normal'>{currency}{delivery_fee}</p>
            </div>
            <hr />
            <div className="caart-total flex items-center gap-5 justify-between mr-5 mt-5">
                <b className='text-[20px]'>Total</b>
                <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal