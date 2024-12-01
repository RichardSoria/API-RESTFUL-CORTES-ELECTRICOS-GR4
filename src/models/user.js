import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
// Importamos dotenv para cargar las variables de entorno
import dotenv from 'dotenv';
dotenv.config();

const userModel = {

    async registerUserModel(newUser) {
        // Obtenemos la URL desde el archivo .env
        const url = process.env.URL_BDD_USERS;
        if (!url) throw new Error("URL de la base de datos no configurada");

        // Realizamos la petición POST para registrar al usuario
        const peticion = await fetch(url, {
            method: "POST", 
            body: JSON.stringify(newUser), 
            headers: { 'Content-Type': "application/json" } 
        });

        // Verificamos si la petición fue exitosa
        if (!peticion.ok) {
            throw new Error(`Error en la petición: ${peticion.statusText}`);
        }

        // Parseamos y devolvemos la respuesta del servidor
        const data = await peticion.json();
        return data;
    },

    async loginUserModel(username, password) {
        // Obtenemos la URL desde el archivo .env
        const url = process.env.URL_BDD_USERS;
        if (!url) throw new Error("URL de la base de datos no configurada");

        // Realizamos la petición GET para obtener los usuarios
        const peticion = await fetch(url);

        // Verificamos si la petición fue exitosa
        if (!peticion.ok) {
            throw new Error(`Error en la petición: ${peticion.statusText}`);
        }
        // Parseamos la respuesta a un arreglo de usuarios
        const users = await peticion.json();

        // Buscamos al usuario que coincida con el username
        const user = users.find(user => user.username === username);
        // Si no existe el usuario, devolvemos un error
        if (!user) {
            return { error: "Username o password incorrectos" };
        }
        // Verificamos que el password coincida utilizando bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { error: "Username o password incorrectos" };
        }
        return user;
    }
};

export default userModel;
