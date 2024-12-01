import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const userModel = {
    async registerUserModel(newUser) {
        try {
            const url = process.env.URL_BDD_USERS; // Usamos la URL desde las variables de entorno
            const peticion = await fetch(url, {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: { 'Content-Type': "application/json" }
            });

            if (!peticion.ok) {
                throw new Error(`Error en la petición: ${peticion.statusText}`);
            }

            const data = await peticion.json();
            return data;
        } catch (error) {
            console.error("Error al registrar el usuario:", error.message);
            throw new Error("Error al registrar el usuario");
        }
    },

    async loginUserModel(username, password) {
        try {
            const url = `${process.env.URL_BDD_USERS}?username=${username}`;
            const peticion = await fetch(url);
            const users = await peticion.json();
    
            if (!users || users.length === 0) {
                return { error: "Username o password incorrectos" };
            }
    
            const user = users[0]; 
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return { error: "Username o password incorrectos" };
            }

            return user;
        } catch (error) {
            console.error("Error en el login:", error.message);
            return { error: "Error en el login" };
        }
    }
};

export default userModel;
