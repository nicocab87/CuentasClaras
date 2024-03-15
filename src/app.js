const express = require('express');
const handlebars = require ('express-handlebars');
const viewsRouter = require ('./routes/views.router');
const userRouter = require ('./routes/user.router');
const { default: mongoose } = require('mongoose');
const { Server } = require('socket.io');
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

app.use('/', viewsRouter)
app.use('/api/user', userRouter)

// database connection
mongoose.connect(`mongodb+srv://nicolasferreyram:${process.env.MONGO_PASSWORD}@cluster0.hzrrjcf.mongodb.net/cuentasClaras`).then(()=>{
    console.log('Mongoose conected')
});


// Server up
const server = app.listen(port,()=>console.log(`Se ha levantado el servidor ${port}`));

// socket.io

const io = new Server(server);

io.on('connection', (socket)=>{
    console.log(`Conectado ${socket.id}`);

    socket.on('Disconnect', ()=>{
        console.log(`${socket,id} desconectado`)
    })

    socket.on('userName', (data)=>{
        console.log('a')
        console.log(data)
    })
})

