const { Router } = require('express')
const postsModel = require('../Model/Posts')
const userModel = require('../Model/UserModel')
const router = Router()
const multer = require('multer')

const imgConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `img-${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage: imgConfig,
});

router.post('/add/:id', async (req, res) => {
    const userid = req.params.id
    const { title, auth, link, img } = req.body
    try {
        const admin = await userModel.findById(userid)
        if (admin.isadmin) {
            const onePost = await postsModel.create({ title, auth, link, img })
            res.status(200).json(onePost)
        } else {
            return res.status(403).json({ ms: 'error' })
        }
    } catch (error) {
        res.status(error).json(error)
    }
})

router.get('/get', async (req, res) => {
    try {
        const Posts = await postsModel.find({})
        res.status(200).json(Posts)
    } catch (error) {
        res.status(error).json(error)
    }
})

router.delete('/delete/:id/:userid', async (req, res) => {
    const postid = req.params.id
    const userid = req.params.userid
    try {
        const admin = await userModel.findById(userid)
        if (admin.isadmin) {
            const deletePost = await postsModel.findOneAndDelete(postid)
            res.status(200).json(deletePost)
        } else {
            return res.status(403).json({ ms: 'error' })
        }
    } catch (error) {
        res.status(error).json(error)
    }
})

module.exports = router