import React, {useContext} from 'react'
import Messages from "./Messages";
import Input from "./Input";
import {ChatContext} from "../../context/ChatContext";

const Chat =()=>{

    const {data} = useContext(ChatContext);


    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.firstName}</span>
                <div className="addFriend">
                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/r2FA830xjtI.png" alt=""></img>
                <button>Add Friend</button>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}
export default Chat