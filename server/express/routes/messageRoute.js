const Message = require("../../database/models/message")
const router = require("express").Router()


//get All messages

router.get("/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        const messages = await Message.find({chat:id});
        res.status(200).send(messages);
    }catch(err){
        res.status(400).send(err);
    }
})

//create message

router.post("/",async(req,res)=>{
    try{
        const newMessage = await Message.create(req.body);
        res.status(200).send(newMessage);
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;