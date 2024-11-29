import {Router} from 'express'
import { getAllToolsControllers, getToolByIDController, createToolController, updateToolController, deleteToolController } from '../controllers/tool_controller.js'
import { verifyToken } from '../middlewares/auth.js'
const router = Router()


// Pública - todos pueden acceder
router.get('/tools/',getAllToolsControllers)
router.get('/tools/:id',getToolByIDController)


// Privada - Admin, Gerente, Empleado
router.post('/tools/', verifyToken, createToolController)
router.patch('/tools/:id',verifyToken,updateToolController)
router.delete('/tools/:id',verifyToken,deleteToolController)



export default router