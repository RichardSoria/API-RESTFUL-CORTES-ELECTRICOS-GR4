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
app.get('/',(req,res)=>{
    res.send("Server on")
})

// Rutas - Tour
app.use('/api',routerTool)

// Rutas - Users
app.use('/api',routerUser)


// Exportar la variable app 
export default app



