import {useContext, useState} from 'react'
import axios from "axios";

import { AuthContext} from "../../context/AuthContext";

const Search =()=>{

    const {currentUser} = useContext(AuthContext)
    const baseUrl = "http://localhost:3001/api/users/"

    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false)


    const handleSearch = async () =>  {
        try {
            const response = await axios.get(baseUrl+username);

            setUser(response.data)
            console.log(user)
            console.log(currentUser)
        } catch (error)  {
            setErr(true)
        }
    }

    const handleKey = e => {
        e.code === "Enter" && handleSearch();
    }

    return (
        <div className='Search'>
            <div className="searchForm">
                <input
                    type="text"
                    placeholder='find a user'
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={handleKey}
                />
            </div>
            {user && <div className="userChat">

                <div className="userChatInfo">
                    <span>{user.firstName}</span>
                </div>
            </div>}
        </div>
    )
}
export default Search