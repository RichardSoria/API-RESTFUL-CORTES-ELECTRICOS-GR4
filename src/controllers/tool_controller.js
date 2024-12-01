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

const createToolController = async (req,res) => {
    const newToolData = {
        id:uuidv4(),
        ...req.body
    }
    // req.body req.params req.query req.files req.headers
    try {
        console.log(req.files.image.tempFilePath)
        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.image.tempFilePath,{folder:"tools"})

        newToolData.image = cloudinaryResponse.url
        newToolData.public_id = cloudinaryResponse.public_id

        const tool = await toolModel.createToolModel(newToolData)
        await fs.unlink(req.files.image.tempFilePath)
        res.status(201).json(tool)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateToolController = async(req,res) => {
    const {id} = req.params
    try {
        const tool = await toolModel.updateToolModel(id,req.body)
        await fs.unlink(req.files.image.tempFilePath)
        res.status(200).json(tool)
    } catch (error) {
        res.status(500).json(error)
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
