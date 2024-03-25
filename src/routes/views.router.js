const { Router } = require("express");
const manager = require("../db/user");

const router = Router();

// Middleware 

const privateAccess = (req, res, next)=>{
    if(!req.session.user) return res.redirect('/login')

    next();
}

const initializedSession = (req, res, next)=>{
    if(req.session.user){
        res.redirect('/calculator')
    }
    next();
}

// Routes


router.get ('/', initializedSession, async (req, res) => {
    const userData = await manager.getUsers()
    res.render('home', {userData})
});

router.get('/register', initializedSession, async(req, res)=>{
    res.render('register')
})

router.get('/login', initializedSession, async(req, res)=>{
    res.render('login')
})

router.get('/profile', privateAccess, async (req, res)=>{
    res.render('profile', {user: req.session.user})
})

router.get('/calculator', privateAccess, async(req, res)=>{

    res.render('calculator')
})


module.exports = router;