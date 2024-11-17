import {Router} from 'express'
import { createToolController, getToolController,getAllToolControll, updateToolController, deleteToolController } from '../controllers/tools_controller.js'
const router = Router()

router.get('/tools',getAllToolControll)

router.get('/tools/:id',getToolController)

router.post('/tools',createToolController)

router.put('/tools/:id',updateToolController)

router.delete('/tools/:id', deleteToolController)

export default router
