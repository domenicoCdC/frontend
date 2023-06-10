import React, {useContext, useEffect, useState} from "react";
import Message from "./Message";
import {ChatContext} from "../../context/ChatContext";
import axios from "axios";
const Messages =()=>{

    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)

    const baseChatsApisUrl = "http://localhost:3000/api/chats/";

    useEffect( () => {
            const getChats = async () => {

                const response = await axios.get(`${baseChatsApisUrl}"refreshchat/${data.chatId}`)
                setMessages(response.data.messages)
            };
            data.chatId && getChats();

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