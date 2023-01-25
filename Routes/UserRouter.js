const express = require('express')
const AuthUserModel = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
const router = express.Router()
    
router.get('/', async (req, res) => {
    const token = req.headers.authorization
    try {
        if (token) {
            const verify = jwt.verify(token, process.env.SECRET)
            const user = await AuthUserModel.findById(verify)
            res.status(200).json(user)
        } else {
            return res.status(403).json({ ms: 'err' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/:id', async (req, res, next) => {
    const token = req.headers.authorization
    const id = req.params.id
    try {
        if (token) {
            const verify = jwt.verify(token, process.env.SECRET)
            const user = await AuthUserModel.findById(id)
            verify ? res.status(200).json(user) : res.status(403).json({ ms: 'err' })
        } else {
            return res.status(403).json({ ms: 'err' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router 