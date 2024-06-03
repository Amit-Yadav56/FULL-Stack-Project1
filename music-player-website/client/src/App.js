import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard, Home, Login, MusicPlayer, UserProfile, MyFavourites } from './components'
import { app } from "./config/firebase.config";
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UseStateValue } from './context/StateProvider';
//maintain all the motion animations
import { AnimatePresence } from 'framer-motion'
import { validateUser, getAllSongs } from './api';
import { actionType } from './context/reducer';
import { FcDisplay } from 'react-icons/fc';
import { motion } from 'framer-motion'



const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  //someting wrong here
  const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] = UseStateValue();


  //create a state to save the authentication is true or not
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true")

  //check firebase authentication and if not authenticated redirect to login page
  useEffect(() => {

    //authentication info
    firebaseAuth.onAuthStateChanged((userCred) => {
      //if cred is found then redirect to homepage and print token
      if (userCred) {
        userCred.getIdToken().then((token) => {
          validateUser(token).then((data) => {

            //from context provider we can use the value whenever we want
            dispatch({
              type: actionType.SET_USER,
              user: data,
            })
          })

          navigate("/")
        })
      }
      //else redirect to login page
      else {
        setAuth(false)
        window.localStorage.setItem("auth", "false")

        //dispatch again if user does not exist
        dispatch({
          type: actionType.SET_USER,
          user: null
        })

        navigate("/login")
      }
    })
  }, [])
  useEffect(() => {
    if (!allSongs && user) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  return (

    //The mode='wait' prop tells Framer Motion to complete any exit animations (exiting page) before starting a new animation 
    <AnimatePresence mode='wait'>
      <div className='min-w-[680px] h-auto bg-primary flex justify-center items-center'>
        <Routes>
          {/* Home and login */}
          <Route path='/login' element={<Login setAuth={setAuth} />} />
          <Route path='/*' element={<Home />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/myFavourites" element={<MyFavourites />} />


        </Routes>
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default App