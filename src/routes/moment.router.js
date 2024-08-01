const { Router } = require("express");
const momentManager = require("../db/moments");

const router = Router();

router.post('/:uid/createMoment', async (req, res)=>{
    const userId = req.params.uid;
    const momentName = req.body

    try {
        const data = await momentManager.createMoment(userId, momentName)
        res.send({status:'success', payload:data})
    } catch (error) {
        res.status(400).send({status:'Error', error})
    }
})

router.get('/:mid/getMoment', async (req, res)=>{
    const momentId = req.params.mid;

    try {
        const data = await momentManager.getMomentById(momentId);
        res.send({status:'success', payload:data})
    } catch (error) {
        res.status(400).send({status:'Error', error})
    }
})

router.put('/:mid/updateMoment', async (req, res) =>{
    const momentId = req.params.mid;
    const momentUpdated = req.body

    try {
        const data = await momentManager.updateMoment(momentId, momentUpdated);
        res.send({status:'success', payload:data})
    } catch (error) {
        res.status(400).send({status:'Error', error})
    }
})

router.delete('/:uid/deleteMoment/:mid', async (req, res)=>{
    const userId = req.params.uid;
    const momentId = req.params.mid;

    try {
        const data = await momentManager.deleteMoment(momentId, userId)
        res.send({status:'success', payload:data})
    } catch (error) {
        res.status(400).send({status:'Error', error})
    }
})

module.exports = router