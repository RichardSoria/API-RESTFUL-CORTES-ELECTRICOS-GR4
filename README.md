# Proyecto API Restful

Este proyecto implementa una API básica utilizando los métodos HTTP para manipular recursos en un servidor. A continuación, se describe la estructura del proyecto, el uso de un archivo `db.json` para almacenar la información y los métodos HTTP implementados.

---

## 1. Estructura del Proyecto

![Estructura del Proyecto](https://github.com/user-attachments/assets/27d7d772-afac-47ec-9bc8-6d678b635e67)

La estructura del proyecto incluye los archivos esenciales para la API y la base de datos simulada. Los archivos clave son:

- `src/index.js`: Contiene el código principal del servidor Express.
- `db.json`: Archivo utilizado para almacenar los datos de forma persistente.
- `package.json`: Contiene las dependencias y scripts del proyecto.

---

## 2. Archivo `db.json` para Guardar la Información

El archivo `db.json` simula una base de datos donde se almacenan los recursos. Este archivo es utilizado por `json-server` para exponer una API RESTful.

![db.json](https://github.com/user-attachments/assets/579012e7-7948-485a-bf06-296b7ae7783a)

---

## 3. Métodos HTTP

A continuación se explican los métodos HTTP implementados en el proyecto:

### 3.1. GET

El método `GET` se utiliza para solicitar información del servidor.

![GET](https://github.com/user-attachments/assets/c243c0f9-edb0-4bd1-9232-0b1949e492c5)

---

### 3.2. GET con ID

El método `GET` también se puede usar con un ID específico para obtener los detalles de un recurso en particular.

![GET con ID](https://github.com/user-attachments/assets/8ecd9bcd-d2c4-40d6-9d58-2fd6b0620c67)

---

### 3.3. POST

El método `POST` se utiliza para crear un nuevo recurso en el servidor.

![POST](https://github.com/user-attachments/assets/8da28e79-c8e9-4e57-a5ed-20d502cc4085)
![POST - Alternativa](https://github.com/user-attachments/assets/4f3e9945-5ff1-485f-9622-d702d994cb7f)

---

### 3.4. PUT

El método `PUT` se utiliza para actualizar completamente un recurso existente en el servidor.

![PUT](https://github.com/user-attachments/assets/3a022ba6-5125-4f5a-89fd-f2a92b68bb62)

---

### 3.5. DELETE

El método `DELETE` se utiliza para eliminar un recurso en el servidor.

![DELETE](https://github.com/user-attachments/assets/0f73570e-a9c7-4af9-a302-3dbfd6407c4b)

El recurso eliminado ya no estará disponible.

![Recurso Eliminado](https://github.com/user-attachments/assets/3de09797-51bd-495f-9d05-3c39714f88ce)

---

## Conclusión

Este proyecto proporciona una API RESTful que soporta los métodos HTTP básicos: `GET`, `POST`, `PUT`, y `DELETE`, permitiendo gestionar recursos a través de peticiones HTTP. La estructura es simple y útil para aprender sobre el desarrollo de APIs y trabajar con bases de datos simuladas.








   
