import React, {useContext} from 'react'
import Messages from "./Messages";
import Input from "./Input";
import {ChatContext} from "../../context/ChatContext";

const Chat =()=>{

    const { data } = useContext(ChatContext);
    console.log(data)

    const sendRequestHandler = () => {
        //DEVE FARE CHIAMATA API A http://localhost:3001/api/friend-requests/ NEL
        /**
         * TODO: nel corpo della post, bisogna mettci fromUserId: l'id dell'utente attualmente loggato (che lo posso prelevare dal AuthContext
         * TODO: e toUserId:(che lo posso prelevare da ChatContext) data.user.uid (da verificare..vedi Chats.js
         * TODO: modificare il backend perchè è presente la caratterizzazione dell'id tramite username che noi abbiamo tolto
         * TODO: e le varie api relative a friend-requests; (idea: l'id della richiesta d'amicizia può essere il combineid del from user e to user
         * TODO: idea: se tutto va a buon fine far comparire un bottone di successo sostituendo quello di default di "add request" con "richiesta d'amcizia già inviata"
         * TODO: GESTIRE inoltre la sezione riguardante il profilo per visuliazzare lo stato delle richieste d'amicizia
         * TODO: discutere su dove mettere la sezione PROFILO idea: mettere un avatar (img circolare di default = per tutti)
         * TODO: al click dell'avatar mostrare : fistNAme + last name, email: .... , un bottone per reimpostare psw, e richieste d'amicizia con la possibilità di vedere lo stato ("pending" = inviata, ...)
         *
         */

    }

    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="addFriend">
                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/r2FA830xjtI.png" alt=""></img>
                <button onClick={sendRequestHandler}>Add Friend</button>
                </div>
            </div>
            <Messages/>
            <Input />
        </div>
    )
}
export default Chat