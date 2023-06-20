const authRoutes = require('./routes/authRoute');
const chatRoutes = require('./routes/chatRoute');
const messageRoutes = require('./routes/messageRoute')
const bodyParser = require('body-parser');
const app = require('express')();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/message', messageRoutes);
app.use('/chat',chatRoutes);

module.exports = app;
