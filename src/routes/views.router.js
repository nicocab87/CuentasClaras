const { Router } = require("express");
const manager = require("../db/user");

const router = Router();


router.get ('/', async (req, res) => {
    const userData = await manager.getUsers()
    res.render('home', {userData})
});

router.get('/register', async(req, res)=>{
    res.render('register')
})

router.get('/login', async(req, res)=>{
    res.render('login')
})

router.get('/', async (req, res)=>{
    
})


module.exports = router;