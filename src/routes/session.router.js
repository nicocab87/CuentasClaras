const { Router } = require("express");
const UserModel = require("../models/user");
const passport = require("passport");
const { createHash } = require("crypto");

const router = Router();

router.post('/register', passport.authenticate('register', {failureRedirect:'/api/session/registerFail'}), async (req, res)=>{
    res.send({status: 'success', message: 'user resgistered'})
})

router.get('/registerFail', async (req, res)=>{
    res.status(401).send({status: 'error', error: ' authentication eror'})
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/session/loginFail'}), async(req, res)=>{
    try {
        const user = await UserModel.findOne({email: req.body.email})


        req.session.user = {
            name: user.name,
            email: user.email,
            age: user.age,
            id: user._id
        }

        res.send({status: 'success', payload: req.session.user, message:'success'})
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send({ status: 'error', error: 'internal server error' });
    }
})

router.get('loginFail', async(req, res) =>{
    res.status(401).send({status:'error', error:'internal server error'})
})

router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(500).send('There was an error')
    })
    res.redirect('/login')
})

module.exports = router