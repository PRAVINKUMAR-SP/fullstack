import React, {  useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link } from 'react-router-dom'


const HomeCollection = () => {
  const {products} = useContext(ShopContext)
  const [homeProduct, setHomeProduct] = useState([])

  useEffect(()=>{ 
    setHomeProduct(products.slice(0,10))
  },[products])
  return (
    <div>
       <div className="product-container w-[90%] m-auto relative">
            <div className="list_headerr">
                <h1 className='text-[30px] font-bold mb-5'>Our Collection</h1>
            </div>
            <div className="product-grid grid items-center w-full gap-10 ">
                {homeProduct.length > 0 ? (
                    homeProduct.map((product)=>(
                        <div className='product-card relative text-center p-10 border' key={product._id}>
                            <div className="product-img items-center">
                                <Link to={`/product/${product._id}`}><img src={product.images} alt="" className='w-[180px] h-[190px] hover:scale-90 transition-all'/></Link>
                            </div>
                            <h3 className='text-[18px] font-semibold mb-2'>{product.name}</h3>
                            <p className='text-[15px] font-semibold  mb-2'>${product.price}</p>
                        </div>
                    ))
                ): (
                    <p>No Product is Fund in this Category</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default HomeCollection