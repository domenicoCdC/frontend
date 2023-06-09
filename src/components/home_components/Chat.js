import React, {useContext} from 'react'
import Messages from "./Messages";
import Input from "./Input";
import {ChatContext} from "../../context/ChatContext";

const Chat =()=>{

    const {data} = useContext(ChatContext);


    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.username}</span>
                <button>Add Friend</button>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}
export default Chat