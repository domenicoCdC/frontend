import React from 'react'
import Sidebar from "../components/home_components/Sidebar";
import Chat from "../components/home_components/Chat";
const Home =()=>{
    return (
        <div className='home'>
            <div className="container">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}
export default Home