import {Router} from 'express'
import { loginUserController, registerUserController } from '../controllers/user_controller.js'
const router = Router();


router.post('/users/:id',registerUserController);

router.post('/users',loginUserController);


export default router;