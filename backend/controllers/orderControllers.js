import orderModel from "../models/ordermodels.js"
import UserModel from "../models/userModels.js"


const allOrder = async(req,res)=>{
    try {
        const orders =await orderModel.find({})

        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

const userOrders = async(req,res)=>{
    try {
        const {userId} = req.body
        const orders =await orderModel.find({userId})

        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const placeOrder = async(req,res)=>{
    try {
        const {userId,items,amount,address} = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)

        await newOrder.save()

        await UserModel.findByIdAndUpdate(userId,{
            cartData:{}
        })
        res.json({success:true,message:'Order Placed'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const placeOrderStrip = async(req,res)=>{
    
}

const placeOrderRazorpay = async(req,res)=>{
    
}

const updateStatus = async(req,res)=>{
    try {
        const {orderId,status}=req.body

        await orderModel.findByIdAndUpdate(orderId,{status})

        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {allOrder,placeOrder,placeOrderRazorpay,placeOrderStrip,updateStatus,userOrders}