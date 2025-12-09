import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { product } from '../../assets/assets'
import { Link } from 'react-router-dom'

const RelatedProduct = ({category}) => {
    const {products} = useContext(ShopContext)
    const [relatedProduct, setRelatedProduct] =useState([])
    const related = products.filter(
        (product)=>(product.category.toLowerCase() === category.toLowerCase())
    )

    useEffect(()=>{
        setRelatedProduct(related.slice(0,4))
    },[])
  return (
    <div>
        <div className="product-container w-[90%] m-auto">
            <div className="list_headerr">
                <h1 className='text-[30px] font-bold mb-5'>Related Products</h1>
            </div>
            <div className="product-grid flex items-center w-full gap-10">
                {relatedProduct.length > 0 ? (
                    relatedProduct.map((product)=>(
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

export default RelatedProduct