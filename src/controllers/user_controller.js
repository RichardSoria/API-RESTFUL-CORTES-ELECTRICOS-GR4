
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import userModel from '../models/user.js';
import { createToken } from '../middlewares/auth.js';
const saltRounds = 10


const registerUserController = async (req, res) => {
    const { password, username, ...otherDataUser } = req.body;
    if (!password || !username) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userData = {
            id: uuidv4(),
            password: hashedPassword,
            username,
            ...otherDataUser
        };
        const user = await userModel.registerUserModel(userData);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error: error.message });
    }
}


const loginUserController = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    try {
        const user = await userModel.loginUserModel(username, password);
        if (user.error) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }
        const token = createToken({ id: user.id, username: user.username });
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
};


export {
    registerUserController,
    loginUserController
}