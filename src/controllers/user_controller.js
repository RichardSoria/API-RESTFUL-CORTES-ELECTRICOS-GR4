
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import userModel from '../models/user.js';
import { createToken } from '../middlewares/auth.js';
const saltRounds = 10


const registerUserController = async (req,res) => {

    const {password,...otherDataUser}=req.body
    const hasehedPassword = await bcrypt.hash(password,saltRounds)

    const userData = {
        id: uuidv4(),
        password:hasehedPassword,
        ...otherDataUser
    }
    try {
        const user = await userModel.registerUserModel(userData)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}


const loginUserController = async (req,res) => {

    const {username,password} = req.body

    try {
        
        const user = await userModel.loginUserModel(username,password)

        const token = createToken(user)

        res.status(200).json({user,token})

    } catch (error) {
        res.status(500).json(error)
    }
}



export {
    registerUserController,
    loginUserController
}