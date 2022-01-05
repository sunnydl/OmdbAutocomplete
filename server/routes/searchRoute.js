import express from 'express'
import { searchMovies } from '../controllers/searchController.js'

const router = express.Router()

router.get('/', searchMovies)

export default router
