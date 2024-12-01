import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

// Definimos el modelo de usuario
const userModel = {
    async registerUserModel(newUser) {
        const url = process.env.URL_BDD_TOOLS;
        if (!url) throw new Error("URL de la base de datos no configurada");
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
    },

    async loginUserModel(username, password) {
        const url = process.env.URL_BDD_TOOLS;
        if (!url) throw new Error("URL de la base de datos no configurada");

        const peticion = await fetch(url);

        if (!peticion.ok) {
            throw new Error(`Error en la petición: ${peticion.statusText}`);
        }

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
};

export default userModel;
