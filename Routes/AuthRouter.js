const express = require('express')
const UserModel = require('../Model/UserModel')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
// multer 
router.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    try {
        const findEmail = await UserModel.findOne({ email: email })
        if (findEmail) {
            return res.status(403).json({ ms: 'Bu Email Ro\'yxatdan O\'tgan !', status: 403 })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        if (firstname && lastname && email && password) {
            const SaveUser = await UserModel.create({ firstname, lastname, email, password: hashPassword })
            res.status(200).json(SaveUser)
        }
    } catch (error) {
        res.status(500).json({ ms: error, status: 500 })
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const FindEmail = await UserModel.findOne({ email: email })
        if (!FindEmail) {
            return res.status(403).json({ ms: 'Bu Email Ro\'yatdan o\'tmagan iltimos Ro\'yxatdan oting !', status: 403 })
        }
        const result = await bcrypt.compare(password, FindEmail.password)
        if (result) {
            const token = jwt.sign({ _id: FindEmail._id }, process.env.SECRET)
            res.json({ status: 200, token, user: FindEmail })
        } else {
            res.status(403).json({ ms: "Parol yoki Email Xato qatadan tekshirib uring!" })
        }
    } catch (error) {
        res.status(500).json({ ms: error, status: 500 })
    }
})

module.exports = router