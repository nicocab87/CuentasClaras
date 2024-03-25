const { Router } = require("express");

const router = Router();

router.get('/', async(req, res) =>{
        const userId = req.session.user.id
        res.json({ userId });
});

module.exports = router
