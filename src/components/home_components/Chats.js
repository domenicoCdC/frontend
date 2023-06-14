import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {ChatContext} from "../../context/ChatContext";
import axios from "axios";


const Chats =()=>{

    const baseChatsApisUrl = "http://localhost:3001/api/chats/"

    const [chats, setChats] = useState([]);

    const { dispatch } = useContext(ChatContext);
    const { currentUser }=useContext(AuthContext);



    useEffect( () => {

        console.log("sono nello useEffect di Chats");
        const getChats = () => axios.get(baseChatsApisUrl + "refresh/" + currentUser.uid)
            .then(response => {
                setChats(response.data)
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
        const interval = setInterval(() => getChats(), 500);
        getChats();
        return () => clearInterval(interval)

    },[currentUser.uid])

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    };


    //chat ordinate  Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
    return (
        <div className='chats'>

            {Object.entries(chats)?.map((chat) => (
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