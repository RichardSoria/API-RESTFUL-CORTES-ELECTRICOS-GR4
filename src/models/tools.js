import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const toolModel = {
    // Obtener todas las herramientas
    async getAllToolsModel() {
        const peticion = await fetch(process.env.URL_BDD_TOOLS);
        if (!peticion.ok) {
            throw new Error(`Error al obtener las herramientas: ${peticion.statusText}`);
        }
        const tools = await peticion.json();
        return tools;
    },
    // Obtener herramienta por ID
    async getToolByIDModel(toolId) {
        const url = `${process.env.URL_BDD_TOOLS}${toolId}`;  
        const response = await fetch(url, {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' } 
        });
        if (!response.ok) {
            return { error: "Herramienta o insumo no encontrado" };
        }
        const data = await response.json();
        return data;
    },
    // Crear nueva herramienta
    async createToolModel(newTool) {
        try {
            const url = process.env.URL_BDD_TOOLS;
            const peticion = await fetch(url, {
                method: "POST",
                body: JSON.stringify(newTool),
                headers: { 'Content-Type': "application/json" }
            });
    
            if (!peticion.ok) {
                throw new Error(`Error al crear la herramienta: ${peticion.statusText} - ${errorDetails}`);
            }
    
            const data = await peticion.json();
            return data;
        } catch (error) {
            console.error("Error al crear la herramienta:", error.message);
            throw new Error(`Error al crear la herramienta: ${error.message}`);
        }
    },

    async updateToolModel(toolId, updatedToolData){
        try {
            const url = `${process.env.URL_BDD_TOOLS}${toolId}`;
            // Obtener los datos existentes del recurso
            const existingToolResponse = await fetch(url);
            if (!existingToolResponse.ok) {
                throw new Error(`Error al obtener la herramienta: ${existingToolResponse.statusText}`);
            }
            const existingTool = await existingToolResponse.json();
    
            // Combinar los datos existentes con los nuevos datos
            const combinedToolData = { ...existingTool, ...updatedToolData };
    
            // Enviar la solicitud de actualización con los datos combinados
            const peticion = await fetch(url, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(combinedToolData)
            });
    
            if (!peticion.ok) {
                throw new Error(`Error al actualizar la herramienta: ${peticion.statusText}`);
            }
    
            const data = await peticion.json();
            return data;
        } catch (error) {
            console.error("Error al actualizar la herramienta:", error.message);
            return { error: "Error al actualizar la herramienta" };
        }
    },
    async deleteToolModel(toolId) {
        const url = `${process.env.URL_BDD_TOOLS}${toolId}`;
        const peticion = await fetch(url, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' } 
        });
        if (!peticion.ok) {
            throw new Error(`Error al eliminar la herramienta: ${peticion.statusText}`);
        }
        try {
            const data = await peticion.json();
            return data;
        } catch {
            return { message: "Recurso eliminado exitosamente" }; 
        }
    }
    

};

export default toolModel;
