import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { product } from '../../assets/assets'
import { toast } from 'react-toastify'
import Cart from '../Cart/Cart'
import CartTotal from '../../components/CartTotal/CartTotal'
import { backendUrl } from '../../App'
import axios from 'axios'

const Checkout = () => {

    const {cartItems,setCartItems,getCartAmount,delivery_fee,products,token} = useContext(ShopContext)

     const [firstName,setFirstName] = useState('')
     const [lasttName,setLastName] = useState('')
     const [email,setEmail] = useState('')
     const [street,setStreet] = useState('')
     const [city,setCity] = useState('')
     const [zipcode,setZipcode] = useState('')
     const [country,setCounty] = useState('')
     const [state,setState] = useState('')
     const [phone,setPhone] = useState('')
      

    const onSubmitHandeler = async(event)=>{
    event.preventDefault()
    
        try {
            let orderItems = []

            for(const items in cartItems){
                for(const item in cartItems[items]){
                    if (cartItems[items][item]>0) {
                        const itemInfo =structuredClone(
                            products.find((product)=>product._id === items)
                        )
                        if (itemInfo) {
                            itemInfo.size=item
                            itemInfo.quantity =cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }
            let orderData ={
                items:orderItems,
                amount:getCartAmount()+delivery_fee
            }
            switch (method) {
                case cod:
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    console.log(response.data)
                    break;
            
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
  return (
    <form onSubmit={onSubmitHandeler} className="form-container">
        <div className="form-left">
            <fieldset className='payment-method'>
                <legend>Payment Option</legend>
                <div className="payment-option">
                    <div onClick={()=>setMethod('stripe')} >
                        <img src="op.png" alt="Strip" />
                    </div>
                    <div onClick={()=>setMethod('razorpay')} >
                        <img src="op.png" alt="razorpay" />
                    </div>
                    <div onClick={()=>setMethod('cod')} >
                        <span>CASH ON DELIVARY</span>
                    </div>
                </div>
            </fieldset>

            <div className="form-title">
                <h2>Shipping Address</h2>
            </div>
            <div className=" flex-col">
                <input type="text" name='name' onChange={(e)=>setFirstName(e.target.value)} value={firstName} placeholder='firstname'/>
                <input type="text" name='name' onChange={(e)=>setLastName(e.target.value)} value={lasttName} placeholder='firstname'/>
                <input type="email" name='name' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='email'/>
                <input type="text" name='name' onChange={(e)=>setStreet(e.target.value)} value={street} placeholder='street'/>
                <input type="text" name='name' onChange={(e)=>setCity(e.target.value)} value={city} placeholder='city'/>
                <input type="text" name='name' onChange={(e)=>setState(e.target.value)} value={state} placeholder='state'/>
                <input type="number" name='name' onChange={(e)=>setPhone(e.target.value)} value={phone} placeholder='phone'/>
                <input type="text" name='name' onChange={(e)=>setCounty(e.target.value)} value={country} placeholder='county'/>
                <input type="number" name='name' onChange={(e)=>setZipcode(e.target.value)} value={zipcode} placeholder='zipcode'/>
                <button  className='bg-black text-white w-40 h-10 rounded-md'>Procced To Checkout</button>
            </div>
            <CartTotal/>
        </div>
    </form>
  )
}

export default Checkout