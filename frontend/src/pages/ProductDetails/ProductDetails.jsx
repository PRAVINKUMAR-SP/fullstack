import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useParams } from 'react-router-dom';
import RelatedProduct from '../../components/RelatedProduct/RelatedProduct';

const ProductDetails = () => {
 const {products, currency,addTocart} = useContext(ShopContext)
 const {productId} = useParams()

 const [productData, setProductData] = useState(false)
 const [images, setImage] = useState('')
 const [size,setSize] = useState('')

 const fetchProductData = async () =>{
  products.map((item)=>{
    if (item._id === productId) {
      setProductData(item)
      setImage(item.images)
    }
  })
 }
 useEffect(()=>{
  fetchProductData();
 },[productId, products])
  return productData ? (
    <div>
      <div className="product-container pt-3 opacity-[1] w-[95%] m-auto">
        <div className="product-content flex gap-4">
          <div className="product-images flex flex-col-reverse gap-3 max-w-[50%]">
            <div className="thumbnail-container flex justify-content-between overflow-x-auto mt-3">
              {productData.images.map((item, index)=>(
                <img src={item} onClick={()=> setImage(item)} key={index} className='thumbnail w-[24%] cursor-pointer shrink-0' />
              ))}
            </div>
            
            <div className="main-image-container w-full">
              <img src={images} alt="" className='main-image w-full h-auto'/>
            </div>
          </div>
          <div className="product-info flex-1 max-w-[50%] mt-1">
            <h1 className="product-name text-[2rem] font-medium mt-2.5">{productData.name}</h1>
            <hr />
            <p className="product-price mt-5 text-[1.87rem] font-normal">{currency}{productData.price}</p>
            <p className="product-description mt-5 text-gray-600">{productData.description}</p>
            <div className="sizze-sector mt-5">
              <p className='text-[20px] font-medium'>Select Size</p>
              <div className="size-button flex gap-5">
               {productData.sizes.map((item, index)=>(
                <button key={index} onClick={()=>setSize(item)} className={`size-button cursor-pointer border p-2.5 bg-[#ff5252] text-[18px] w-15 mt-3 ${item === size ? 'active-size border border-red-700 bg-white' : ''}`}>{item}</button>
               ))}
              </div>
            </div>
            <hr className='mt-5 mb-5'/>
            <div className="product policy text-gray-700 text-[18px] flex flex-col gap-2 mb-5">
              <p>Free Delivery</p>
              <p>Seamless and Secure Payment</p>
              <p>Several Payment Option Available</p>
            </div>
            <button onClick={()=>addTocart(productData._id,size)} className="add-to-cart bg-black text-white p-3 rounded cursor-pointer">ADD TO CART</button>
          </div>
        </div>
        <div className="description-review-sect mt-15 "></div>
        <div className="tabs flex ">
          <b className="tab-active border p-3">
            Description
          </b>
          <p className="tab border p-3">Review</p>
        </div>
        <div className="discription-content border p-10 text-gray-700 mt-5 flex flex-col gap-5">
          <p>Sleek, durable, and designed for everyday adventures, the Voyager Everyday Backpack combines lightweight comfort with rugged performance. Its water-resistant exterior protects essentials while a padded laptop compartment keeps devices secure. Multiple internal pockets and an external quick-access pocket organize chargers, notebooks, and small items. Ergonomic shoulder straps and a ventilated back panel provide all-day comfort, while reinforced stitching and YKK zippers ensure long-lasting reliability.</p>
          <p>Sleek, durable, and designed for everyday adventures, the Voyager Everyday Backpack combines lightweight comfort with rugged performance. Its water-resistant exterior protects essentials while a padded laptop compartment keeps devices secure. Multiple internal pockets and an external quick-access pocket organize chargers, notebooks, and small items. Ergonomic shoulder straps and a ventilated back panel provide all-day comfort, while reinforced stitching and YKK zippers ensure long-lasting reliability.</p>
        </div>
        <RelatedProduct category={productData.category} />
      </div>
    </div>
  ):
  <div>No Product match with the productId</div>
}

export default ProductDetails