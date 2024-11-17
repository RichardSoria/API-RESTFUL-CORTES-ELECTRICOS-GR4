const toolModel = {
    async getAllToolsModel(){
        try {
            const peticion = await fetch('http://localhost:4000/tools')
            const tools = await peticion.json()
            return tools 
        } catch (error) {
            console.log(error)
        }
        
    },
    async getToolModel(toolID){
        try {
            const peticion = await fetch(`http://localhost:4000/tools/${toolID}`)
            const tool = await peticion.json()
            return tool
        } catch (error) {
            console.log(error)
        }
    },

    async createToolModel(newTool){
        const url = "http://localhost:4000/tools"
        const peticion = await fetch(url,{
            method:"POST",
            body:JSON.stringify(newTool),
            headers:{"Content-Type":"application/json"}
        })

        const data = await peticion.json()

        return data
    },
    async updateToolModel (toolID,updatedTool){
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
    },
    async deleteToolModel(toolID){
        const url = `http://localhost:4000/tools/${toolID}`
        const peticion = await fetch(url,{
            method:"DELETE"
        })

        const data = await peticion.json()

        return data
    }
}

// Exportar un solo elemento
export default toolModel