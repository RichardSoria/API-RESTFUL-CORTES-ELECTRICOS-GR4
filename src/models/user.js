import bcrypt from 'bcrypt';
import fetch from 'node-fetch';

const userModel = {
    async registerUserModel(newUser) {
        try {
            const url = 'https://usuariossoria.free.beeceptor.com/api/users'; // URL literal directamente
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
            const url = 'https://usuariossoria.free.beeceptor.com/api/users'; // URL literal directamente
            const peticion = await fetch(url, {
                method: "POST",  
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
    
            const user = await peticion.json();
    
            if (!user || user.error) {
                return { error: "Username o password incorrectos" };
            }
    
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
