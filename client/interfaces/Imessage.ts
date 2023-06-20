

export interface IMessage{
    _id:string,
    sender:string,
    content:string,
    chat:string,
    readby:Array<string>
}