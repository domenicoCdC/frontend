import React, {useContext, useEffect, useState} from "react";
import Message from "./Message";
import { ChatContext } from "../../context/ChatContext";
import axios from "axios";
const Messages =()=>{

    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)

    const baseChatsApisUrl = "http://localhost:3001/api/chats/";

    useEffect( () => {

        const getMessage = () => axios.get(baseChatsApisUrl+"refreshchat/"+data.chatId)
            .then((response) =>{
                setMessages(response.data.messages)
            })
            .catch((err) => {
                console.log(err)
            });
        const interval = setInterval(() => getMessage(),500);
        getMessage();
        return () => clearInterval(interval)

    },[data.chatId])

    return(
        <div className='messages'>
            {messages.map((message) => (
                <Message message={message} key={message.id} />
            ))}

        </div>
    )
}
export default Messages