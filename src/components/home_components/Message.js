import React, {useContext, useEffect, useRef} from 'react'
import { AuthContext } from "../../context/AuthContext";
import {ChatContext} from "../../context/ChatContext";

const Message =({message})=>{

    const {currentUser} = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    //useEffect(() => {
        //ref.current?.scrollIntoView({ behavior: "smooth" });
    //}, [message])

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className={`messageContent ${message.senderId === currentUser.uid && "owner"}`}>
                <p>{message.text}</p>
            </div>
            <div className="messageInfo">
                <span>ora</span>
            </div>
        </div>
    );
};
export default Message