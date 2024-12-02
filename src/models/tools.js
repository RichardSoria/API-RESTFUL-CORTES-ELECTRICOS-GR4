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
        const url = `https://tools2soria.free.beeceptor.com/api/tools/${toolId}`;  
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
        const url = process.env.URL_BDD_TOOLS; 
        if (!url) throw new Error("URL de la base de datos no configurada");

        const peticion = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newTool),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!peticion.ok) {
            throw new Error(`Error al crear la herramienta: ${peticion.statusText}`);
        }
        const data = await peticion.json();
        return data;
    },

    async updateToolModel(toolId, updatedToolData) {
        const url = `https://tools2soria.free.beeceptor.com/api/tools/${toolId}`;
        
        const peticion = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(updatedToolData),
            headers: { 'Content-Type': "application/json" }
        });
        if (!peticion.ok) {
            throw new Error(`Error al actualizar la herramienta: ${peticion.statusText}`);
        }
        const data = await peticion.json();
        return data;
    },
    async deleteToolModel(toolId) {
        const url = `https://tools2soria.free.beeceptor.com/api/tools/${toolId}`;
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
