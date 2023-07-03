import {AuthContext} from "../../context/AuthContext";
import React, {useContext, useEffect, useState} from "react";
import axios, {request} from "axios";
import {v4} from "uuid";
import ReactLoading from "react-loading";

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
    const [usersInfoReceiver, setUsersInfoReceiver] = useState([])
    const [friendsInfo, setFriendsInfo] = useState([])

    const [receivedFriendsRequests, setReceivedFriendsRequests] = useState([])


    const [acceptedFriendsRequests, setAcceptedFriendsRequests] = useState([])


    const [loading,setLoading] = useState(false)
    const [isAccepted, setAccepted] = useState(false);
    const [isRejectButtonDisabled, setRejectButtonDisabled] = useState(false);
    const [isDeleted, setDeleted] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetchReceiverUsersAsObjects();
        fetchFriendsAsObjects();

    }, [currentUser])

    //Restituisce un array degli utenti da cui hai ricevuto richiesta d'amicizia
    const fetchReceiverUsersAsObjects = async () => {
        setLoading(true);

        try {
            setFirstName(currentUser.displayName.slice(0, currentUser.displayName.indexOf(" ")));
            setLastName(currentUser.displayName.slice(currentUser?.displayName.indexOf(" ")+1, currentUser.displayName.length));
            setEmail(currentUser.email);
            const receivedPendingFriendsRequestsResponse = await axios.get(`http://localhost:3001/api/friend-requests/received/pending/${currentUser.uid}`)
            //const sendFriendsRequestResponse = await axios.get(`http://localhost:3001/api/friend-requests/sent/${currentUser.uid}`)
            setReceivedFriendsRequests(receivedPendingFriendsRequestsResponse.data);
            const friendRequests = receivedPendingFriendsRequestsResponse.data;

            console.log("Array di richieste " + friendRequests);

            const promises = friendRequests.map(async (userId) => {
                const userResponse = await axios.get(`http://localhost:3001/api/users/${userId.fromUserId}`)
                return userResponse.data;
            });
            const userObjects = await Promise.all(promises);
            setUsersInfoReceiver(userObjects);
            console.log(usersInfoReceiver);
            setLoading(false)
        }catch (error){
            console.log(error);
            setLoading(false)
        }

    }


    const fetchFriendsAsObjects = async () => {
        setLoading(true);

        try {

            const acceptedSentFriendsRequestsResponse = await axios.get(`http://localhost:3001/api/friend-requests/sent/accepted/${currentUser.uid}`)
            const acceptedReceivedFriendsRequestsResponse = await axios.get(`http://localhost:3001/api/friend-requests/received/accepted/${currentUser.uid}`)
            //setAcceptedFriendsRequests(acceptedSentFriendsRequestsResponse.data.concat(acceptedReceivedFriendsRequestsResponse.data))
            const friends = acceptedSentFriendsRequestsResponse.data.concat(acceptedReceivedFriendsRequestsResponse.data);


            const promises = friends.map(async (userId) => {
                let userResponse;
                if (userId.fromUserId === currentUser.uid) {
                    userResponse = await axios.get(`http://localhost:3001/api/users/${userId.toUserId}`);
                } else {
                    userResponse = await axios.get(`http://localhost:3001/api/users/${userId.fromUserId}`)
                }
                return userResponse.data;
            });
            const userObjects = await Promise.all(promises);
            setFriendsInfo(userObjects);
            console.log(friendsInfo);
            setLoading(false)
        }catch (error){
            console.log(error);
            setLoading(false)
        }

    }






    //GESTIONE delle richieste d'amicizia
    const handleRequest = async (fromUid,type) => {
        setLoading(true)
        setAccepted(false);
        if (type === "reject") {
            try {
                const response = await axios.put(`http://localhost:3001/api/friend-requests/from${fromUid}to${currentUser.uid}/reject`);
                setUsersInfoReceiver(usersInfoReceiver.filter((e) => e.uid !== fromUid ))
                console.log(response.data);
                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }
        else if (type === "accept") {
            try {
                const response = await axios.put(`http://localhost:3001/api/friend-requests/from${fromUid}to${currentUser.uid}/accept`);
                setAccepted(true);
                setUsersInfoReceiver(usersInfoReceiver.filter((e) => e.uid !== fromUid ))
                console.log(response.data);
                setLoading(false);

            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }
        else if (type === "delete") {
            try {
                const response = await axios.delete(`http://localhost:3001/api/friend-requests/from${fromUid}to${currentUser.uid}/delete`)
                const response2 = await axios.delete(`http://localhost:3001/api/friend-requests/from${currentUser.uid}to${fromUid}/delete`)

                setFriendsInfo(friendsInfo.filter((e) => e.uid !== fromUid ))
                setDeleted(true);
                console.log(response.data + "\n" + response2.data)
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setDeleted(false);
            }
        }

    }



    return (
            <div className='home'>
                <div className="profile">
                    {!loading ? (
                        <>
                            <span className="fullName">{fistName} {lastName}</span>
                            <span className="email">{email}</span>
                            <button onClick={fetchReceiverUsersAsObjects && fetchFriendsAsObjects}>Aggiorna</button>

                            <div>
                                {usersInfoReceiver.length === 0 ? (
                                    <>
                                        <h3 className="later">Torna Piu Tardi...</h3>
                                    </>
                                ) : (
                                    <>
                                    {usersInfoReceiver.map((request) => (
                                            <div key={v4()}>
                                                Richieste ricevute
                                                <span key={v4()}> {request.firstName} {request.lastName}</span>
                                                <button key={v4()} onClick={() => handleRequest(request.uid, "accept")}>Accetta</button>
                                                <button key={v4()} onClick={() => handleRequest(request.uid, "reject")}>Rifiuta</button>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div>
                                {friendsInfo.length === 0 ? (
                                    <>
                                        <h2>è tutto...ci vediamo dopo!</h2>
                                    </>
                                ) :
                                    (
                                        <>
                                        Lista amici
                                        {friendsInfo.map((request) => (
                                            <div key={v4()}>
                                                <span key={v4()}> {request.firstName} {request.lastName}</span>
                                                <button key={v4()} onClick={() => handleRequest(request.uid, "delete")}>Elimina</button>
                                            </div>
                                        ))}
                                        </>
                                    )
                                }


                            </div>

                        </>
                    ) : (
                        <ReactLoading type="spin" height={100} width={50} color="#6495EDFF"></ReactLoading>
                    )}
                </div>
            </div>
    )
}
export default Profile;

