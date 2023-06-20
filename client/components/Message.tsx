import Avatar from "./Avatar";

export default function Message({style,chatType,sender,content}: {style: string,chatType: string,sender:string,content:string}){
    
    const userMessageStyle = "w-fit max-w-sm min-w-xs  lg:max-w-lg text-xs md:text-sm lg:text-base p-2 flex items-center bg-primary-600 text-white rounded-l-lg rounded-tr-lg";
    const otherMessageStyle = "w-fit max-w-sm min-w-xs lg:max-w-lg text-xs md:text-sm lg:text-base p-2 flex items-center bg-gray-600 text-white rounded-r-lg rounded-tl-lg";

    const userMessagePlacement ="flex self-end m-2 " 
    const otherMessagePlacement ="flex self-start m-2 " 
    
    const avatarStyle = chatType=="group"&&style=="other" ? "mr-2 bg-primary-400 text-white" : "hidden";



    return (
        <div className={style=="user" ? userMessagePlacement: otherMessagePlacement }>
        <Avatar sender={sender} style={avatarStyle}/>
        <div className={style=="user" ? userMessageStyle : otherMessageStyle }>
            {content}
        </div>
        </div>
    );
}