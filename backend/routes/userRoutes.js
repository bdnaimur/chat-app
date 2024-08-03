import express from 'express'
import { loginUser, registerUser, allUsers, users } from '../controllers/userControllers.js'
import protect from '../middleWare/authMiddleware.js'

const router = express.Router()

router.post('/login',loginUser)
router.post('/register', registerUser)
router.get('/users', users)
router.get('/allUsers',protect, allUsers)



export default router;
