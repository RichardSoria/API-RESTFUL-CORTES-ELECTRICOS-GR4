import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Definición de esquemas
const toolSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  precio: Number,
  marca: String,
  caracteristicas: [String],
});

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  name: String, // Opcional, para casos donde `name` existe
});

// Modelos
const Tool = mongoose.model('Tool', toolSchema);
const User = mongoose.model('User', userSchema);

// Migración de datos
(async () => {
  try {
    // Leer datos del archivo db.json
    const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

    // Insertar en la colección tools
    if (data.tools && data.tools.length > 0) {
      await Tool.insertMany(data.tools);
      console.log('Datos de "tools" insertados correctamente');
    }

    // Insertar en la colección users
    if (data.users && data.users.length > 0) {
      await User.insertMany(data.users);
      console.log('Datos de "users" insertados correctamente');
    }
  } catch (error) {
    console.error('Error durante la migración:', error);
  } finally {
    mongoose.connection.close();
    console.log('Conexión cerrada');
  }
})();
