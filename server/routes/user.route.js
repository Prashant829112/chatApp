import express from 'express'
import { getOtherUsers, getProfile, login, logout, register } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'

const router=express.Router()

router.post('/register',register)           // /register is req, register is res (controller)
router.post('/login',login)
router.get('/get-profile',isAuthenticated,getProfile)           // isAutheticated is middleware, ie, it will run after req and before res
router.post('/logout',isAuthenticated,logout)
router.get('/get-other-users',isAuthenticated,getOtherUsers)

export default router

