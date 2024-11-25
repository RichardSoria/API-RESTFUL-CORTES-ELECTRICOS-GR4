import {Router} from 'express'
import { createToolController, getToolController,getAllToolControll, updateToolController, deleteToolController } from '../controllers/tools_controller.js'
import { verifyToken } from '../middlewares/auth.js'
const router = Router()


//Publicas
router.get('/tools',getAllToolControll)
router.get('/tools/:id',getToolController)

//Privadas

router.post('/tools',verifyToken,createToolController)
router.put('/tools/:id',verifyToken,updateToolController)
router.delete('/tools/:id', deleteToolController)

export default router
