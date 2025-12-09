import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])


  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', { headers: { token } })
      console.log(response.data)

      if (response.data.success) {
        setList(response.data.products)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (_id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { _id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        console.log(response.data.message)

        await fetchList()
      }

      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  },[])
  return (
    <div className="product-list">
      <h1 className='text-[22px] font-bold mb-3'>Product List</h1>
      <div className="product-list-tabel w-full">
        <table className='w-full border '>
          <thead className='border'>
            <tr className='border h-15 text-[20px]'>
              <th className='border'>Image</th>
              <th className='border'>Name</th>
              <th className='border'>Category</th>
              <th className='border'>Price</th>
              <th className='border'>Action</th>
            </tr>
          </thead>
          {
            list.map((item,index)=>(
              <tbody className='border' key={index}>
            <tr className='text-center h-10 text-[18px] font-normal'>
              <td className='w-40 h-30'><img src={item.images} alt="" /></td>
              <td className='border'>{item.name}</td>
              <td className='border'>{item.category}</td>
              <td className='border'>{item.price}</td>
              <td className='border'><button onClick={()=>removeProduct(item._id)} className='border bg-red-600 rounded-md p-1 text-white border-black cursor-pointer'>Remove</button></td>
            </tr>
          </tbody>
            ))
}
        </table>
      </div>
    </div>
  )
}

export default List