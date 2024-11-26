import dotenv from 'dotenv';

dotenv.config();

const toolModel ={

    async getAllToolsModel(){
        const peticion = await fetch(process.env.URL_BDD_TOOLS)
        const tools = await peticion.json()
        return tools
    }
    
    ,

    async getToolByIDModel(toolId) {
        const response = await fetch(`${process.env.URL_BDD_TOOLS}${toolId}`);
        if (!response.ok) {
            return {error:"Herramienta o insumo no encontrado"}
        }
        const data = await response.json()
        return data
    }
    
    ,

    async createToolModel(newTool){
        const url = process.env.URL_BDD_TOOLS
        const peticion  = await fetch(url,{
            method:'POST',
            body:JSON.stringify(newTool),
            headers:{'Content-Type':'application/json'}
        })
        const data = await peticion.json()
        return data
    }

    ,

    async updateToolModel(toolId,updateToolModel){
        // CONEXIÓN A BDD
        const url = `${process.env.URL_BDD_TOOLS}${toolId}`
        // ENVIAR INFO A BDD
        const peticion = await fetch(url,{
            method:"PUT",
            body:JSON.stringify(updateToolModel),
            headers:{'Content-Type':"application/json"}
        })
        // OBTENER REPUESTA DE BDD
        const data = await peticion.json()
        // MANDAR RESPUESTA A CONTROLADOR
        return data
    }

    ,

    async deleteToolModel(toolId){
        // CONEXIÓN A BDD
        const url = `${process.env.URL_BDD_TOOLS}${toolId}`
        // ENVIAR INFO A BDD
        const peticion = await fetch(url,{
            method:"DELETE"
        })
        // OBTENER REPUESTA DE BDD
        const data = await peticion.json()
        // MANDAR RESPUESTA A CONTROLADOR
        return data
    }


}

export default toolModel
