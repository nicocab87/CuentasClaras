const { Router } = require("express");
const friendManager = require("../db/friends");

const router = Router()

router.post('/addFriends/:mid', async (req,res)=>{
    const friends = req.body;
    const id = req.params.mid;
    //const userId = new Mongoose.Types.ObjectId(id)
    
    try {
        const data = await friendManager.addFriend(id, friends)
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})

    }
});

//Cambiar POST por lo que tenga que ir
router.delete('/:mid/deleteFriend/:fid', async(req, res)=>{
    const momentId = req.params.mid;
    const friendId = req.params.fid

    try {
        const data = await friendManager.deleteFriend(momentId, friendId)
        res.send({status:'success', data})
    } catch (err) {
        res.status(400).send({status:'error', err})
    }
})

router.get('/:mid', async (req, res)=>{
    const momentId = req.params.uid;

    try {
        const data = await friendManager.getFriends(momentId)
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})

    }
})

module.exports = router