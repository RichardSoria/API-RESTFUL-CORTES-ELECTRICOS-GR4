import bcrypt from 'bcrypt';
import fetch from 'node-fetch';

const userModel = {
    async registerUserModel(newUser) {
        try {
            const url = process.env.URL_BDD_USERS;
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

    async loginUserModel(username,password) {
        const response = await fetch(process.env.URL_BDD_USERS)
        const users = await response.json()
        const user = users.find(user => user.username === username)
        if (!user) {
            return { error: "Username o password invalido" }
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (user && passwordMatch) {
            return user
        } else {
            return {error:"Username o password invalido"}
        }
    }
};

export default userModel;
