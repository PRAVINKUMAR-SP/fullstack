import UserModel from "../models/userModels.js"


const addToCart =async (req,res)=>{
    try {
        const {userId,itemId,size} = req.body
        const userData = await UserModel.findById(userId)
        let cartData = await userData.cartData

        if (!userData) {
            return res.status(404).json({success:false,message:'User not found'})
        }
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] +=1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId]= {[size]:1}
        }

        await UserModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:"Product Add To Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const updateCart =async (req,res)=>{
    try {
        const {userId,itemId,size,quantity} = req.body
        const userData = await UserModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await UserModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const getUserCart =async (req,res)=>{
    try {
        const {userId} = req.body

        const userData = await UserModel.findById(userId)

        if (!userData) {
            return res.json({success:false,message:'User not found'})
        }

        const cartData = userData.cartData

        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export {addToCart,updateCart,getUserCart}