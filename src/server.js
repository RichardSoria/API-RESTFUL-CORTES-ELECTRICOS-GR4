// Requerir módulos 
import express from 'express'
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'

import routerTool from './routers/tool_routes.js'
import routerUser from './routers/user_routes.js'


dotenv.config()

console.log(process.env.CLOUDINARY_CLOUD_NAME)

// Inicializaciones
const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(fileUpload({
    useTempFiles: false, // Evita la creación de archivos temporales
}));


// Variables 
app.set('port', process.env.port || 3000)


// Middlewares
app.use(express.json())


// Rutas 
// Ruta principal
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API-CRUD GR#4</title>
            <link rel="icon" href="https://epnecuador-my.sharepoint.com/:i:/g/personal/richard_soria_epn_edu_ec/Ebont2a_7zNOiO1Q2S9OajwBIWfV_M6FHv5hcEAaDXU7QQ?e=0RnPt6" type="image/x-icon">
        </head>
        <body>
            <p>Server ON</p>
        </body>
        </html>
    `);
});

// Rutas - Tour
app.use('/api',routerTool)

// Rutas - Users
app.use('/api',routerUser)


// Exportar la variable app 
export default app