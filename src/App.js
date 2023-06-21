import './App.css';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"
//import AuthDetails from "./components/AuthDetails";
import Home from "./pages/Home";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import {useContext} from "react";
import Profile from "./components/home_components/Profile";

function App() {

    const{ currentUser }=useContext(AuthContext)

    //creo un componentne in grado di "proteggere la route Home in quanto posso accendere a quest'ultima solo dopo aver fatto il login
    // e quindi popolato currentUser che proviene da authContext
    const ProtectedRoute=({children})=>{
        if(!currentUser){
            return<Navigate to="/login"/>
        }
        return children;
    }

  return (


        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }/>
                    <Route path="login" element={<SignIn/>}/>
                    <Route path="register" element={<SignUp/>}/>

                </Route>
            </Routes>
        </BrowserRouter>

  );
}

export default App;
