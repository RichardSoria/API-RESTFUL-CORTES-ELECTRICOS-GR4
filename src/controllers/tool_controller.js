import toolModel from '../models/tools.js'
import {v4 as uuidv4} from 'uuid'
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs-extra'

const getAllToolsControllers = async(req,res) => {
    const tools = await toolModel.getAllToolsModel()
    res.status(200).json(tools)
}

const getToolByIDController = async (req,res) => {
    const {id} = req.params
    try {
        const tool = await toolModel.getToolByIDModel(id)
        const status = tool.error ? 404 : 200
        res.status(status).json(tool)
    } catch (error) {
        res.status(500).json(error)
    }
}

const createToolController = async (req, res) => {
    const newToolData = {
        id: uuidv4(),
        ...req.body,
    };

    try {
        // Verificar que se haya recibido un archivo de imagen
        if (!req.files || !req.files.image) {
            throw new Error("No se proporcionó ninguna imagen");
        }

        // Acceder al buffer de la imagen
        const imageBuffer = req.files.image.data;

        // Subir la imagen a Cloudinary directamente desde el buffer
        const cloudinaryUpload = () =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "tools" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(imageBuffer); // Pasar el buffer al stream
            });

        const cloudinaryResponse = await cloudinaryUpload();

        // Guardar la URL y el public_id en los datos de la herramienta
        newToolData.image = cloudinaryResponse.url;
        newToolData.public_id = cloudinaryResponse.public_id;

        // Crear la herramienta en la base de datos
        const tool = await toolModel.createToolModel(newToolData);

        // Responder con los datos de la nueva herramienta
        res.status(201).json(tool);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateToolController = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si existe la herramienta
        const existingTool = await toolModel.getToolByIDModel(id);
        if (!existingTool || existingTool.error) {
            return res.status(404).json({ error: "Herramienta no encontrada" });
        }

        // Verificar si se ha proporcionado una nueva imagen
        let updatedData = { ...req.body };

        if (req.files && req.files.image) {
            // Eliminar la imagen existente en Cloudinary, si aplica
            if (existingTool.public_id) {
                await cloudinary.uploader.destroy(existingTool.public_id);
            }

            // Subir la nueva imagen desde el buffer
            const imageBuffer = req.files.image.data;

            const cloudinaryUpload = () =>
                new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "tools" },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );
                    stream.end(imageBuffer); // Pasar el buffer al stream
                });

            const cloudinaryResponse = await cloudinaryUpload();

            // Agregar la URL y public_id al objeto de datos actualizados
            updatedData.image = cloudinaryResponse.url;
            updatedData.public_id = cloudinaryResponse.public_id;
        }

        // Actualizar los datos de la herramienta en la base de datos
        const updatedTool = await toolModel.updateToolModel(id, updatedData);

        // Responder con los datos de la herramienta actualizada
        res.status(200).json(updatedTool);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const deleteToolController = async (req,res) => { 
    const {id} = req.params
    try {

        // Obener el Tour por ID
        const toolFind = await toolModel.getToolByIDModel(id)
        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(toolFind.public_id)
        await toolModel.deleteToolModel(id)
        res.status(200).json({msg:"Herramienta o insumo eliminado."})
    } catch (error) {
        res.status(500).json(error)
    }
}

export {
    getAllToolsControllers,
    getToolByIDController,
    createToolController,
    updateToolController,
    deleteToolController
}
