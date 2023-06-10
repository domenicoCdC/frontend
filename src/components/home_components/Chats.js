import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {ChatContext} from "../../context/ChatContext";
import axios from "axios";

const Chats =()=>{

    const baseGetChatsRealTimeUrl = "http://localhost:3001/api/chats/refresh/"

    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    useEffect( () => {

            const getChats = async () => {
                try {
                    const fetchChats = await axios.get(baseGetChatsRealTimeUrl + currentUser.uid);
                    setChats(fetchChats.data)
                } catch (err) {
                    console.log(err)
                }
            };
            currentUser.uid && getChats()


    },[currentUser.uid])

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    };


    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
                <div
                    className="userChat"
                    key={chat[0]}
                    onClick={() => handleSelect(chat[1].userInfo)}
                >
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Chats