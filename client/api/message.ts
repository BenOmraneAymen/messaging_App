import axios from "axios";

export async function getAllMessages(id:string){
 let req = await axios.get("http://localhost:4000/message/"+id)
 return req
}

export async function createMessage(data:object){
     await axios.post("http://localhost:4000/message/",data).then((res:any)=>{
        return res.data
    }).catch((err:any)=>{
        console.log(err)
    })
}
