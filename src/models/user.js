import bcrypt from "bcrypt"

const userModel = {

    async registerUserModel (newUser){
        const apiUrl = process.env.API_URL || "http://localhost:4000";  // Usar la URL de la API según el entorno
        const url = `${apiUrl}/users`;

        const peticion = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" }
        });
        
        const data = await peticion.json();
        return data;
    },
    
    async loginUserModel (username, password){
        const apiUrl = process.env.API_URL || "http://localhost:4000";  // Usar la URL de la API según el entorno
        const url = `${apiUrl}/users`;

        const response = await fetch(url);
        const users = await response.json();

        const user = users.find(user => user.username === username);
        if (!user) {
            return { error: "Username or password incorrect" };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (user && passwordMatch) {
            return user;
        } else {
            return { error: "Username or password incorrect" };
        }
    }
}

export default userModel;
