import axios from "axios";
const backend_Link = "http://localhost:4000/auth/"
export async function getAllUser(){
    await axios.get(backend_Link).then((res:any)=>{
        console.log(res.data)
        return res.data
    }
    ).catch((err:any)=>{
        console.log(err)
    })
}

export async function getUserByEmail(email:string){
    let req = await axios.get(backend_Link+"email/"+email)
    return req
}

export async function getUserById(id:string){
    let req = await axios.get(backend_Link+"id/"+id)
    return req
}


export async function createUser(data:object){
    let req = await axios.post(backend_Link+"register",data)
    return req
}

export async function verifyUser(data:object){
    let req = await axios.post(backend_Link+"login",data)
    return req
}

export async function changePassword(data:object){
    await axios.put(backend_Link,data).then((res:object)=>{
        console.log(res)
        return res
    }).catch((err:object)=>{
        console.log(err)
    })
}

export async function resetPassword(data:object){
    await axios.put(backend_Link+"forgotPassword",data).then((res:object)=>{
        console.log(res)
        return res
    }).catch((err:object)=>{
        console.log(err)
    })
}

