// Requerir módulos
// ESMODULES
import express from 'express'
import router from './routers/tools_routes.js'

// COMMONJS
// const express = require('express')

// INICIALIZACION
const app = express()

// MIDDLEWARES
app.use(express.json())

// RUTAS
app.get('/',(req,res)=>{
    res.send('OK')
})

// Rutas para tools
app.use('/api',router)

// Exportar la instancia de app
export default app
