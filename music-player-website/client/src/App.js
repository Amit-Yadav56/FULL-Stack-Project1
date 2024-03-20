import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login } from './components'
import { app } from "./config/firebase.config";
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  //create a state to save the authentication is true or not
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true")

  //check firebase authentication and if not authenticated redirect to login page
  useEffect(() => {

    //authentication info
    firebaseAuth.onAuthStateChanged((userCred) => {
      //if cred is found then redirect to homepage and print token
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token)
          navigate("/")
        })
      }
      //else redirect to login page
      else {
        setAuth(false)
        window.localStorage.setItem("auth", "false")
        navigate("/login")
      }
    })
  }, [])

  return (
    <div className='w-screen h-screen bg-primary flex justify-center items-center'>
      <Routes>
        {/* Home and login */}
        <Route path='/login' element={<Login setAuth={setAuth} />} />
        <Route path='/*' element={<Home />} />

      </Routes>
    </div>
  )
}

export default App