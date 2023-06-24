import React, {useContext, useState} from 'react'
import {ChatContext} from "../../context/ChatContext";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

const Input =()=>{

    const baseChatsApisUrl = "http://localhost:3001/api/chats/"
    const [text,setText]=useState("");
    const [error, setError] = useState(false)

    const {currentUser} = useContext(AuthContext)
    const {data}=useContext(ChatContext)

    const handleSend = () => {
        console.log(data)
        axios.put(baseChatsApisUrl+"updatemessage",{
            chatId: data.chatId,
            text: text,
            userToChatId: data.user.uid,
            currentUserId: currentUser.uid,
        })
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
                console.log(err)
                setError(true)
            })
        setText("")
    }

    return (
        <div className='input'>
            <input type="text"
                   onChange={e => setText(e.target.value)}
                   value={text}
                   placeholder='Inizia a chattare...'/>
            <div className="send">
                {error && <span>Mh..qualcosa è andata storto!</span>}
                <button onClick={handleSend}>Invia</button>
            </div>
        </div>
    )
}
export default Input