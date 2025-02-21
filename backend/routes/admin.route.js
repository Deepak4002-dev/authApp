import express from 'express'
import {isAdmin} from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/admin-dashboard',isAdmin,(req,res)=>{
  res.status(200).json({message:"Admin Dashboard"})
})

export default router


