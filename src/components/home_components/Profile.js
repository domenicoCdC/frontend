import {AuthContext} from "../../context/AuthContext";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

/*const acceptRequestHandler = async (fromUser, toUser) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/friend-requests/from${fromUser}to${toUser}/accept`);

            if (response.status === 200) {
                setFriendRequestStatus({ status: 'accepted', fromUser, toUser});
            } else {
                setError(true)
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const rejectRequestHandler = async (fromUser, toUser) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/friend-requests/from${fromUser}to${toUser}/reject`);

            if (response.status === 200) {
                setFriendRequestStatus({ status: 'rejected', fromUser, toUser});
            } else {
                setError(true)
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };
     */

export default function Profile() {
    const {currentUser} = useContext(AuthContext);
    const fistName = currentUser.displayName.slice(0, currentUser.displayName.indexOf(" "));
    const lastName = currentUser.displayName.slice(currentUser.displayName.indexOf(" "));
    const email = currentUser.email;
    const [sentFriendRequests, setSentFriendRequests] = useState([])
    const [receivedFriendRequests, setReceivedFriendRequests]= useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/api/friend-requests/received/${currentUser.uid}`)
            .then((response) => {
                console.log(response)
                setReceivedFriendRequests(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

        axios.get(`http://localhost:3001/api/friend-requests/sent/${currentUser.uid}`)
            .then((response) => {
                console.log(response)
                setSentFriendRequests(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [currentUser.uid])

    return (
            <div className='home'>
                <div className="profile">
                    <span className="fullName">{fistName} {lastName}</span>
                    <span className="email">{email}</span>
                    <div>
                        {receivedFriendRequests?.map((request) => (
                            <span> Richiesta ricevuta da: {request.fromUserId}</span>
                        ))}
                    </div>
                    <div>
                        {sentFriendRequests?.map((request) => (
                            <span> Richiesta inviata a: {request.toUserId}</span>
                        ))}
                    </div>
                </div>
            </div>
    )
}