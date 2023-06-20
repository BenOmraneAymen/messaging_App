const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
    { timestamps: true },
    { collection: 'chats' }
);

const Chat = mongoose.model('Chat', Schema);

module.exports = Chat;