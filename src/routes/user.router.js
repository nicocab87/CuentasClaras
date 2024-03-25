const { Router } = require("express");
const manager = require("../db/user");
const { default: mongoose } = require("mongoose");

const router = Router()

router.post('/', async (req,res)=>{
    const name = req.body

    try {
        const data = await manager.createUser(name);
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})
    }
});

router.post('/addFriends/:uid', async (req,res)=>{
    const friends = req.body;
    const id = req.params.uid;
    const userId = new mongoose.Types.ObjectId(id)
    
    try {
        console.log(`User: ${userId}, Friend: ${friends}`)
        const data = await manager.addFriend(userId, friends)
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})

    }
});


router.get('/', async (req,res)=>{
    try {
        const data = await manager.getUsers()
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})

    }
})

router.get('/getFriends/:uid', async (req, res)=>{
    const userId = req.params.uid;

    try {
        const data = await manager.getFriends(userId);
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})

    }
})

router.get('/calculateMoney/:uid', async (req, res) => {
    const userId = req.params.uid;

    try {
        const data = await manager.calculateMoney(userId)
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})
    }
})

router.get('/result/:uid', async (req, res) => {
    const userId = req.params.uid;

    try {
        const data = await manager.crossArrays(userId)
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})
    } 
})

module.exports = router