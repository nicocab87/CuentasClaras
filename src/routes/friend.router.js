const { Router } = require("express");
const friendManager = require("../db/friends");

const router = Router()

router.post('/addFriends/:uid', async (req,res)=>{
    const friends = req.body;
    const id = req.params.uid;
    //const userId = new Mongoose.Types.ObjectId(id)
    
    try {
        const data = await friendManager.addFriend(id, friends)
        res.send({status:'success', data})
    } catch (error) {
        res.status(400).send({status:'error', error})

    }
});

router.post('/:uid/deleteFriend/:fid', async(req, res)=>{
    const userId = req.params.uid;
    const friendId = req.params.fid

    try {
        const data = friendManager.deleteFriend(userId, friendId)
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

module.exports = router