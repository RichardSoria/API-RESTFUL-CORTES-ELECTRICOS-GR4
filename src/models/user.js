import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const userModel = {

    async registerUserModel(newUser){
        const url = process.env.MONGO_URI
        const peticion = await fetch(url,{
            method:"POST",
            body:JSON.stringify(newUser),
            headers:{'Content-Type':"application/json"}
        })
        const data = await peticion.json()
        return data
    },

    async loginUserModel(username, password) {
        const url = process.env.MONGO_URI
        const peticion = await fetch(url);
        const users = await peticion.json();
        const user = users.find(user => user.username === username);
   
        if (!user) {
            return { error: "Username o password incorrectos" };
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { error: "Username o password incorrectos" };
        }
        return user;
    }
}    

export default userModel