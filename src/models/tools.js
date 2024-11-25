import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../../db.json');
const isDevelopment = process.env.NODE_ENV === 'development';

const toolModel = {
    
    async getAllToolsModel(){
        const apiUrl = process.env.API_URL || 'http://localhost:4000'; 
        if (isDevelopment) {
            try {
                const peticion = await fetch(`${apiUrl}/tools`)
                const tools = await peticion.json()
                return tools 
            } catch (error) {
                console.log(error)
            }  
        } else {
            try {
                const data = fs.readFileSync(filePath, 'utf-8')
                const tools = JSON.parse(data).tools
                return tools 
            } catch (error) {
                console.log(error)
            } 
        }
    },

    async getToolModel(toolID){
        const apiUrl = process.env.API_URL || 'http://localhost:4000';  
        if (isDevelopment) {
            try {
                const peticion = await fetch(`${apiUrl}/tools/${toolID}`)
                const tool = await peticion.json()
                return tool
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const data = fs.readFileSync(filePath, 'utf-8')
                const tools = JSON.parse(data).tools
                const tool = tools.find(t => t.id === toolID)
                return tool
            } catch (error) {
                console.log(error)
            }
        }
    },

    async createToolModel(newTool){
        const apiUrl = process.env.API_URL || 'http://localhost:4000'; 
        if (isDevelopment) {
            const url = `${apiUrl}/tools`
            const peticion = await fetch(url,{
                method:"POST",
                body:JSON.stringify(newTool),
                headers:{"Content-Type":"application/json"}
            })

            const data = await peticion.json()
            return data
            
        } else {
            const data = fs.readFileSync(filePath, 'utf-8');
            const tools = JSON.parse(data).tools;
            tools.push(newTool);
            fs.writeFileSync(filePath, JSON.stringify({ tools }), 'utf-8');

            return newTool;
        }
    },

    async updateToolModel(toolID, updatedTool){
        const apiUrl = process.env.API_URL || 'http://localhost:4000';
        if (isDevelopment) {
            const url = `${apiUrl}/tools/${toolID}`
            const peticion = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(updatedTool),
                headers: { "Content-Type": "application/json" }
            })
            
            const data = await peticion.json()
            return data

        } else {
            const data = fs.readFileSync(filePath, 'utf-8');
            const tools = JSON.parse(data).tools;
            const index = tools.findIndex(t => t.id === toolID);
            if (index !== -1) {
                tools[index] = { ...tools[index], ...updatedTool };
                fs.writeFileSync(filePath, JSON.stringify({ tools }), 'utf-8');
                return tools[index];
            } else {
                return { message: 'No se ha encontrado ninguna herramienta.' }
            }
        }
    },

    async deleteToolModel(toolID){
        const apiUrl = process.env.API_URL || 'http://localhost:4000'; 
        const url = `${apiUrl}/tools/${toolID}`;

        const peticion = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        const data = await peticion.json()
        return data
    }
}

export default toolModel;
