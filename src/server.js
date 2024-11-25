// Requerir módulos
// ESMODULES
import express from 'express'
import routerTools from './routers/tools_routes.js'
import routerUsers from './routers/users_routes.js'

// COMMONJS
// const express = require('express')

// INICIALIZACION
const app = express()

// MIDDLEWARES
app.use(express.json())

// RUTA INICIO
app.get('/',(req,res)=>{
    res.send('OK')
})

// Rutas para tools
app.use('/api',routerTools)

//Ruta para usuarios
app.use('/api',routerUsers)

// Exportar la instancia de app
export default app
