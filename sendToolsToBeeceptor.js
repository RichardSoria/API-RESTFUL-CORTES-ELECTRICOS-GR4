import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Leer los datos de tools.json
const tools = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

const enviarHerramientasABeeceptor = async () => {
    try {
        const url = process.env.URL_BDD_TOOLS; 
        for (let tool of tools.tools) {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(tool),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                console.log(`Herramienta ${tool.nombre} enviada correctamente.`);
            } else {
                console.error(`Error al enviar la herramienta ${tool.nombre}: ${response.statusText}`);
            }
        }
    } catch (error) {
        console.error("Error al enviar herramientas a Beeceptor:", error.message);
    }
};

enviarHerramientasABeeceptor();
