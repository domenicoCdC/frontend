import React, {useContext, useState} from 'react'
import Messages from "./Messages";
import Input from "./Input";
import {ChatContext} from "../../context/ChatContext";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

/**
 * Christian: nel corpo della post, bisogna mettci fromUserId: l'id dell'utente attualmente loggato (che lo posso prelevare dal AuthContext
 * Christian: e toUserId:(che lo posso prelevare da ChatContext) data.user.uid (da verificare..vedi Chats.js
 * Christian: modificare il backend perchè è presente la caratterizzazione dell'id tramite username che noi abbiamo tolto
 * Christian: e le varie api relative a friend-requests; (idea: l'id della richiesta d'amicizia può essere il combineid del from user e to user
 * Christian: idea: se tutto va a buon fine far comparire un bottone di successo sostituendo quello di default di "add request" con "richiesta d'amcizia già inviata"
 * TODO: GESTIRE inoltre la sezione riguardante il profilo per visuliazzare lo stato delle richieste d'amicizia
 * Francesco: discutere su dove mettere la sezione PROFILO idea: mettere un avatar (img circolare di default = per tutti)
 * Domenico: pagina profilo: al click dell'avatar mostrare : fistNAme + last name, email: .... , un bottone per reimpostare psw, e richieste d'amicizia con la possibilità di vedere lo stato ("pending" = inviata, ...)
 */
const Chat =()=>{

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext);

    const [friendRequestStatus, setFriendRequestStatus] = useState({ status: 'waiting', requestId: {} });
    const [error,setError] = useState(false)

    const sendRequestHandler = async () => {
        try {
            setFriendRequestStatus({ status: 'pending', requestId: 'from'+currentUser.firstName+currentUser.lastName+'to'+data.user?.firstName+data.user?.lastName});

            const response = await axios.post('http://localhost:3001/api/friend-requests', {
                recipientId: data.user?.id,
            });

            if (response.status === 200) {
                setFriendRequestStatus({ status: 'pending', requestId: 'from'+currentUser.firstName+currentUser.lastName+'to'+data.user?.firstName+data.user?.lastName});
            } else {
                setFriendRequestStatus({ status: 'waiting', requestId: {} });
            }
        } catch (error) {
            console.log(error);
            setFriendRequestStatus({ status: 'waiting', requestId: {} });
        }
    };

    const acceptRequestHandler = async (requestId) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/friend-requests/${requestId}/accept`);

            if (response.status === 200) {
                setFriendRequestStatus({ status: 'accepted', requestId });
            } else {
                setError(true)
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const rejectRequestHandler = async (requestId) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/friend-requests/${requestId}/reject`);

            if (response.status === 200) {
                setFriendRequestStatus({ status: 'rejected', requestId });
            } else {
                setError(true)
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="addFriend">
                    {friendRequestStatus.status === 'waiting' && (
                        <button id="addFriendButton" onClick={sendRequestHandler}>
                            Aggiungi agli amici
                        </button>
                    )}
                    {friendRequestStatus.status === 'pending' && (
                        <button id="addFriendButton" disabled>
                            Richiesta inviata
                        </button>
                        )}
                        {friendRequestStatus.status === 'accepted' && (
                        <button id="friendButton" disabled>
                        Amico
                        </button>
                        )}
                    {friendRequestStatus.status === 'rejected' && (
                        <button id="addFriendButton" onClick={sendRequestHandler}>
                            Aggiungi agli amici
                        </button>
                    )}
                    {friendRequestStatus.status === 'pending' && friendRequestStatus.requestId && (
                        <>
                            <button id="acceptButton" onClick={() => acceptRequestHandler(friendRequestStatus.requestId)}>
                                Accetta
                            </button>
                            <button id="rejectButton" onClick={() => rejectRequestHandler(friendRequestStatus.requestId)}>
                                Rifiuta
                            </button>
                        </>
                    )}
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
}
export default Chat