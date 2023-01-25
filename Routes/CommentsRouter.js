const express = require('express')
const Comments = require('../Model/Comments')
const UserModel = require('../Model/UserModel')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('ok')
})

router.get('/get/:postid', async (req, res) => {
    const postid = req.params.postid
    try {
        const ProjectComments = await Comments.find({ postid: postid })
        res.status(200).json(ProjectComments)
    } catch (error) {
        res.status(200).json(error)
    }
})

router.post('/add/:postid', async (req, res) => {
    const postid = req.params.postid
    const { user, comment } = req.body
    try {
        const ResultComment = await Comments.create({ user, postid, comment })
        res.status(200).json(ResultComment)
    } catch (error) {
        res.status(200).json(error)
    }
})



module.exports = router