const { Router } = require("express");
const manager = require("../db/user");


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

router.get('/', async (req,res)=>{
    try {
        const data = await manager.getUsers()
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})

    }
})


module.exports =  router