const express = require('express');
const errorHandler = require('express-error-handler');
const handlebars = require ('express-handlebars');
const viewsRouter = require ('./routes/views.router');
const userRouter = require ('./routes/user.router');
const sessionRouter = require ('./routes/session.router');
const mongoose  = require('mongoose');
const { Server } = require('socket.io');
const session = require ("express-session")
const passport = require('passport');
const initializePassport = require('./config/passport.config');
const MongoStore = require('connect-mongo');
const manager = require('./db/user');
require ('dotenv').config();


const app = express ();
const port = 3000;

// Handlebars setting

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
});

app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/views`);
app.set(`view engine`, `handlebars`);

app.use(express.static(`${__dirname}/public`));  

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://nicolasferreyram:${process.env.MONGO_PASSWORD}@cluster0.hzrrjcf.mongodb.net/cuentasClaras`
    }),
    secret:'cjspr7387lp86cab',
    resave: true,
    saveUninitialized: false
}));
app.use(errorHandler());

// database connection
mongoose.connect(`mongodb+srv://nicolasferreyram:${process.env.MONGO_PASSWORD}@cluster0.hzrrjcf.mongodb.net/cuentasClaras`).then(()=>{
    console.log('Mongoose conected')
});

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session())

// Routes
app.use('/', viewsRouter)
app.use('/api/user', userRouter)
app.use('/api/session', sessionRouter)



// Server up
const server = app.listen(port,()=>console.log(`Se ha levantado el servidor ${port}`));

// socket.io


const io = new Server(server);

io.on('connection', (socket)=>{
    console.log(`Conectado ${socket.id}`);

    socket.on('Disconnect', ()=>{
        console.log(`${socket,id} desconectado`)
    })

    socket.on('addFriend', async (userID) => {
        const data = await manager.getFriends(userID)
        socket.emit('dataToFiends', data)
    })

})

