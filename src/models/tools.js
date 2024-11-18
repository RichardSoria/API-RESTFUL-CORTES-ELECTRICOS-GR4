import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../../db.json');
const isDevelopment = process.env.NODE_ENV === 'development';

const toolModel = {
    
    async getAllToolsModel(){
        if (isDevelopment) {
            try {
                const peticion = await fetch('http://localhost:4000/tools')
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
        if (isDevelopment) {
            try {
                const peticion = await fetch(`http://localhost:4000/tools/${toolID}`)
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
        if (isDevelopment) {
            const url = "http://localhost:4000/tools"
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
    async updateToolModel (toolID,updatedTool){
        if (isDevelopment) {
            // CONEXIÓN BDD
            const url = `http://localhost:4000/tools/${toolID}`
            // ENVIAR DATA A LA BDD
            const peticion = await fetch(url,{
            method:"PUT",
            body:JSON.stringify(updatedTool),
            headers:{"Content-Type":"application/json"}
        })
        
        // OBTENER RESPUESTA DE LA BDD
        const data = await peticion.json()

        return data

        } else {
            const data = fs.readFileSync(filePath, 'utf-8');
            const tools = JSON.parse(data).tools;
            const index = tools.findIndex(t => t.id === toolID);
            if (index !== -1) {
                tools[index] = { ...tools[index], ...updatedTool };
                fs.writeFileSync(filePath, JSON.stringify({tools}), 'utf-8');
                return tools[index];
            } else {
                return {message: 'No se ha encintrado ninguna herramienta.'}
            }

        }
    },
    async deleteToolModel(toolID){
        if (isDevelopment) {
            const url = `http://localhost:4000/tools/${toolID}`
            const peticion = await fetch(url,{
                method:"DELETE"
            })
    
            const data = await peticion.json()
    
            return data

        } else {
            const data = fs.readFileSync(filePath, 'utf-8');
            const tools = JSON.parse(data).tools;
            tools = tools.filter(t => t.id !== toolID);
            fs.writeFileSync(filePath, JSON.stringify({ tools }), 'utf-8');
            return {message: 'La herramienta ha sido eliminada.'};
        }

    }
}

// Exportar un solo elemento
export default toolModel