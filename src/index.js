// Punto de arranque de todo el web server
import app from './server.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; 
dotenv.config();

const uri = process.env.MONGO_URI;

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

mongoose.connect(uri)
  .then(() => {
    console.log("Conexión exitosa a la base de datos MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos MongoDB:", error);
  });
