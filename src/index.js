// Punto de arranque de todo el web server
import app from './server.js'


app.listen(app.get('port'),()=>{console.log(`Server on port ${app.get('port')}`)})




