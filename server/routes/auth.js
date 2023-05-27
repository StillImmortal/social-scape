import express from 'express'

import { signIn, signOut, activation, refresh } from '../controllers/auth.js'

const router = express.Router()
router.post('/sign-in', signIn)
router.post('/sign-out', signOut)
router.get('/activate/:link', activation)
router.get('/refresh', refresh)

export default router