const { Router } = require("express");
const calculateManager = require("../db/calculate");

const router = Router()

router.get('/calculateMoney/:uid', async (req, res) => {
    const userId = req.params.uid;

    try {
        const data = await calculateManager.calculateMoney(userId)
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})
    }
})

router.get('/result/:uid', async (req, res) => {
    const userId = req.params.uid;

    try {
        const data = await calculateManager.crossArrays(userId)
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})
    } 
})

module.exports =  router