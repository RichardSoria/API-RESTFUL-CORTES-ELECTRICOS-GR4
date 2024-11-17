import toolModel from '../models/tools.js'
import { v4 as uuidv4 } from 'uuid';

const getAllToolControll = async(req,res) => {
    try {
        const tools = await toolModel.getAllToolsModel()
        res.status(200).json(tools)
    } catch (error) {
        console.log(error)
    }
}

const getToolController = async(req,res) => {
    const {id} = req.params
    try {
        const tool = await toolModel.getToolModel(id)
        res.status(200).json(tool)
    } catch (error) {
        res.status(500).json(error)
    }
}

const createToolController = async(req,res) => {
    const newToolData = {
        id:uuidv4(),
        ...req.body
    }
    try {
        const tool = await toolModel.createToolModel(newToolData)
        res.status(201).json(tool)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateToolController = async(req,res) => {
    const {id} = req.params
    try {
        const tool = await toolModel.updateToolModel(id,req.body)
        res.status(200).json(tool)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteToolController = async(req,res) => {
    const {id} = req.params
    try {
        await toolModel.deleteToolModel(id)
        res.status(200).json({ message: "Herramienta eliminada exitosamente" })
    } catch (error) {
        res.status(500).json(error)
    }
}

// Exportación nombrada - Exportar varios elementos
export {getAllToolControll, getToolController, createToolController,updateToolController,deleteToolController}