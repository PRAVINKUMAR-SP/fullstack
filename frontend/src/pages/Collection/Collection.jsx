import React, { useContext } from 'react'
import { useParams,Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import women_wear from '../../assets/women-banner.png'
import men_wear from '../../assets/men-wear.png'
import kid_wear from '../../assets/kid-banner.png'

const Collection = () => {
  const {products,searchTerm} = useContext(ShopContext)
  const {category} = useParams();

  const filteredProduct = products.filter((product)=> product.category.toLowerCase() === category.toLocaleLowerCase() 
  && product.name.toLocaleLowerCase().includes(searchTerm.toLowerCase())
)


  const bannerImages ={
    Men:men_wear ,
    Women: women_wear,
    Kids:kid_wear ,
  }
  return (
    <div>
      {/* Banner Section */}
      <div className="banner">
        {bannerImages[category]?(
          <img src={bannerImages[category]} alt='banner-img'/>
        ):
        <p>No image match this category</p>
        }
      </div>
      {/* Product Section */}
      <div className="category-name">
        <h1 className='text-[30px] font-bold my-5 p-2.5'>{category} Collection</h1>
      </div>
                         <div className="product-grid flex items-center w-full gap-10">
                      {filteredProduct.length > 0 ? (
                          filteredProduct.map((product)=>(
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
  )
}

export default Collection