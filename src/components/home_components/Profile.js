import {AuthContext} from "../../context/AuthContext";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {v4} from "uuid";

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

const Profile = () => {
    const {currentUser} = useContext(AuthContext);

    const [fistName,setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [email,setEmail] = useState('')

    const [sentFriendRequests, setSentFriendRequests] = useState([])
    const [receivedFriendRequests, setReceivedFriendRequests]= useState([])



    useEffect(() => {

        console.log("stampo utente nello useeffect " );
        console.log(currentUser)
        axios.get(`http://localhost:3001/api/friend-requests/received/${currentUser.uid}`)
            .then((response) => {
                console.log(response.data)
                setReceivedFriendRequests(response.data)
                setFirstName(currentUser.displayName.slice(0, currentUser.displayName.indexOf(" ")));
                setLastName(currentUser.displayName.slice(currentUser?.displayName.indexOf(" ")+1, currentUser.displayName.length));
                setEmail(currentUser.email);
            })
            .catch((err) => {
                console.log(err)
            })

        axios.get(`http://localhost:3001/api/friend-requests/sent/${currentUser.uid}`)
            .then((response) => {
                console.log(response.data)
                setSentFriendRequests(response.data)
                setFirstName(currentUser.displayName.slice(0, currentUser.displayName.indexOf(" ")));
                setLastName(currentUser.displayName.slice(currentUser?.displayName.indexOf(" ")+1, currentUser.displayName.length));
                setEmail(currentUser.email);
            })
            .catch((err) => {
                console.log(err)
            })



    }, [currentUser])

    return (
            <div className='home'>
                <div className="profile">
                    <span className="fullName">{fistName} {lastName}</span>
                    <span className="email">{email}</span>
                    <div>
                        {receivedFriendRequests?.map((request) => (
                            <span key={v4()}> Richiesta ricevuta da: {request.fromUserId}</span>
                        ))}
                    </div>
                    <div>
                        {sentFriendRequests?.map((request) => (
                            <span key={v4()}> Richiesta inviata a: {request.toUserId}</span>
                        ))}
                    </div>
                </div>
            </div>
    )
}
export default Profile;