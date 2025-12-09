import React, { useState } from 'react'
import upload_img from '../../assets/upload_img.png'
import axios from 'axios'
import {backendUrl} from '../../App'
import { ToastContainer} from 'react-toastify'
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("Men")
  const [bestSeller,setBestSeller] = useState(false)
  const [sizes,setSizes] = useState([])

  const onSubmitHandler = async (e) =>{
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("bestSeller",bestSeller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1 ? image1 : null)
      image2 && formData.append("image2",image2 ? image2 : null)
      image3 && formData.append("image3",image3 ? image3 : null)
      image4 && formData.append("image4",image4 ? image4 : null)


      const responce = await axios.post(backendUrl + '/api/product/add' , formData , {headers:{token}})
      console.log(responce.data)
      if (responce.data.success) {
        toast.success(responce.data.message)
        setName("")
        setDescription("")
        setPrice("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      }
      else{
        toast.error(responce.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }


  }
    return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 items-start! '>
      <div>
        <p className="form-label mb-2 text-[18px] font-medium">Upload Images</p>
        <div className="image-upload flex gap-2">
          <label className="image1">
            <img src={!image1 ?upload_img:URL.createObjectURL(image1)} alt="" className="upload w-24" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file"  id="image1" hidden />
          </label>
          <label className="image2">
            <img src={!image2 ?upload_img:URL.createObjectURL(image2)}alt="" className="upload w-24" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file"  id="image1" hidden />
          </label>
          <label className="image3">
            <img src={!image3 ?upload_img:URL.createObjectURL(image3)} alt="" className="upload w-24" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file"  id="image1" hidden />
          </label>
          <label className="image4">
            <img src={!image4 ?upload_img:URL.createObjectURL(image4)} alt="" className="upload w-24" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file"  id="image1" hidden />
          </label>
        </div>
        <div className="form-group w-full">
          <p className="form-label   mb-2  text-[18px] font-medium">Product Name</p>
          <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Enter product name' className='form-input w-full max-w-[500px] p-2 border' required/>
        </div>
        <div className="form-group w-full">
          <p className="form-label  mb-2  text-[18px] font-medium">Product Description</p>
          <input onChange={(e)=> setDescription(e.target.value)} value={description} type="text" placeholder='Type product description' className='form-input w-full max-w-[500px] p-2 border h-24 placeholder:text-gray-400 placeholder:-mt-7! bg-gray-100' required/>
        </div>
      </div>
      <div className="form-group-horizontal flex flex-wrap gap-4 w-full ">
        <div>
          <p className="form-label  mb-2  text-[18px] font-medium">Product Category</p>
          <select onChange={(e)=> setCategory(e.target.value)} value={category} className="form-select w-full p-2 rounded  border">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="form-label  mb-2  text-[18px] font-medium">Product Price</p>
          <input onChange={(e)=> setPrice(e.target.value)} value={price} type="number" className='input-price w-full p-2 rounded  border' placeholder='30'/>
        </div>
      </div>
      <div>
        <p className="form-label  mb-2  text-[18px] font-medium">Product Sizes</p>
        <div className="size-option flex gap-2 ">
          {
            ["S","L","M","XL","XXL"].map((size)=>(
              <div key={size} onClick={()=> setSizes(
                (prev)=>
                  prev.includes(size)
                ? prev.filter((item)=> item !== size)
                : [...prev, size]
              )} className={`size-option p-5 cursor-pointer border rounded ${
                sizes.includes(size) ? "selected bg-amber-300 text-amber-50 border-black": ""
              }`}>
                {size}
              </div>
            ))
          }
        </div>
      </div>
      <div className="checkbox-group flex items-center gap-2">
        <input onChange={(e)=> setBestSeller((prev)=> !prev)} checked={bestSeller} type="checkbox" className="w-4 h-4 text-blue-800 cursor-pointer" id="bestseller" />
        <label className="checkbox-label">Add toBestseller</label>
      </div>
      <button type='submit' className='bg-black text-white p-4 rounded'>ADD PRODUCT</button>
    </form>
  )
}

export default Add