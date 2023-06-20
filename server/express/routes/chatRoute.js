const Chat = require("../../database/models/chat")
const router = require("express").Router()


//get All chats

router.get("/",async (req,res)=>{
    try{
        const chats = await Chat.find({});
        res.status(200).send(chats)
    }catch(err){
        res.status(400).send(err)
    }

})

//get chat by id

router.get("/:id",async (req,res)=>{
    try{
        const chats = await Chat.findById(req.params.id);
        res.status(200).send(chats)
    }catch(err){
        res.status(400).send(err)
    }

})

//get all chat for a user 

router.get("/user/:id",async (req,res)=>{
    try{
        const chats = await Chat.find({users:req.params.id});
        console.log(chats)
        res.status(200).send(chats)
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }

})

//create chat

router.post("/",async (req,res)=>{
    try{
        const chat = await Chat.create(req.body)
        res.status(200).send(chat)
    }catch(err){
        res.status(400).send(err)
    }
})

//update chat

router.put("/:id",async (req,res)=>{
    try{
        const updatedChat = req.body;
        const chat = await Chat.findByIdAndUpdate(req.params.id,updatedChat,{new:true})
        res.status(200).send(chat)
    }catch(err){
        res.status(400).send(err)
    }
})

//delete chat

router.delete("/:id",async (req,res)=>{
    try{
        const chat = await Chat.findByIdAndDelete(req.params.id)
        res.status(200).send(chat)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router;