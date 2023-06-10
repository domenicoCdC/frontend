import React, {useContext, useState} from 'react'
import {ChatContext} from "../../context/ChatContext";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

const Input =()=>{

    const baseChatsApisUrl = "http://localhost:3001/api/chats/"
    const [text,setText]=useState("");

    const {currentUser} = useContext(AuthContext)
    const {data}=useContext(ChatContext)

    const handleSend = async () => {
        try{
            const res = await axios.patch(baseChatsApisUrl+"updateMessage",{
                chatId: data.chatId,
                text: text,
                senderId: currentUser.uid,
                currentUserId: data.user.uid
            })
            console.log(res)
        } catch (err) {
            console.log(err)
        }
        setText("")


    }

    return (
        <div className='input'>
            <input type="text"
                   onChange={e => setText(e.target.value)}
                   value={text}
                   placeholder='Inizia a chattare...'/>
            <div className="send">
                <button onClick={handleSend}> Send</button>
            </div>
        </div>
    )
}
export default Input