const { Router } = require("express");
const manager = require("../db/user");

const router = Router();

router.get ('/', async (req, res) => {
    const userData = await manager.getUsers()
        console.log(userData)
    res.render('home', {userData})
});

router.get('/register', async(req, res)=>{
    res.render('register')
})

router.get('/login', async(req, res)=>{
    res.render('login')
})


module.exports = router;