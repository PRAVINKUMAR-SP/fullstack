import UserModel from "../models/userModels.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id)=>{
    // token creation logic here
    return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser = async(req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await UserModel.findOne({email});
        if(!user){
            return  res.status(404).json({error: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id);
            return res.json({success: true, message: 'Login Successful', token});
        } else {
            return res.json({success: false, message: 'Invalid password'});
        }

    }catch(error){
        console.log(error);
        res.json({success: false, message:error.message});
        
    }
}

const registerUser = async(req, res)=>{
    try{
        const {name, email, password} = req.body;

        // check if user already exists
        const exists = await UserModel.findOne({email});
        if(exists){
            return res.status(400).send({message: 'User already exists'});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({success: false, message: 'Invalid email address'});
        }
        if(password.length < 8){
            return res.status(400).json({success: false, message: 'Password must be at least 8 characters'});
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true,message:"Account Created Successfully", token});

    }
    catch(error){
        console.log(error);
        res.json({success: false, message: 'Error in registering user'});
    }
}

const adminLogin = async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, token});
        }
        else {

            res.json({success: false, message:"Invalid admin credentials"});
        }
    }catch(error){
        console.log(error);
        res.json({success: false, message:error.message});
    }
}

export {loginUser, registerUser, adminLogin};