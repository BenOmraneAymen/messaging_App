const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

const routes = require('./express/app');
const mongoose = require('./database/index')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(routes)

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.sockets.on('connection', (socket) => {
    //console.log('a user connected', socket.id)

    socket.on("create_room",(data)=>{
        console.log("create room")
        socket.join(data?.chatId)
    })

    socket.on("join_room", (data) => {
        console.log("room joined")
        socket.join(data?.chatId)
    })

    socket.on('message', (data) => {
        console.log('Received message:', data.message);
        io.emit('message', data.message);
      });
    socket.on("receive_message",()=>{
        console.log("recieved")
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id)
    })
})


server.listen(4000, () => {console.log('listening on port 4000')})
