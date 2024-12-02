// Punto de arranque de todo el web server
import app from './server.js';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routers/user_routes.js'; 
dotenv.config();

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

app.use(express.json());
app.use('/api', userRoutes); 
