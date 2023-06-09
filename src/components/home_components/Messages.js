import React, {useContext, useEffect, useState} from "react";
import Message from "./Message";
import {ChatContext} from "../../context/ChatContext";
const Messages =()=>{

    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)

    useEffect(() => {

    },[])

    return(
        <div className='messages'>
            <Message/>

        </div>
    )
}
export default Messages