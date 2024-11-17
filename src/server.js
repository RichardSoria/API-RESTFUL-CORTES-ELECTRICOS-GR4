// Requerir módulos
// ESMODULES
import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/tools_routes.js'

// COMMONJS
// const express = require('express')

// INICIALIZACION
const app = express()

// VARIABLES
app.set('port', process.env.port || 3000)

// MIDDLEWARES
app.use(express.json())

// RUTAS
app.get('/',(req,res)=>{
    res.send('OK')
})

// Rutas para el Tour
app.use('/api',router)

// Rutas para el user

// Rutas para el booking

// Exportar la instancia de app
export default app
