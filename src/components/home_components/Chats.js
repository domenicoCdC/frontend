import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {ChatContext} from "../../context/ChatContext";
import axios from "axios";

const Chats =()=>{

    const baseGetChatsRealTimeUrl = "http://localhost:3001/api/chats/refresh/"

    const [chats, setChats] = useState([]);
    const { dispatch } = useContext(ChatContext)

    const {auth}=useContext(AuthContext)


    useEffect( () => {

           if (auth.currentUser) {
               console.log("CIAOOOOI")
               axios.get(baseGetChatsRealTimeUrl + auth.currentUser.uid)
                   .then(response => {
                       setChats(response.data)
                       console.log(response.data)
                   })
                   .catch((err) => {
                       console.log(err)
                   });
           }

    },[auth])

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    };


    //chat ordinate  Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
    return (
        <div className='chats'>
            {chats.length > 0 && Object.entries(chats)?.map((chat) => (
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