import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { app } from "../config/firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function login({ setAuth }) {
    //get forebase authentication info
    const firebaseAuth = getAuth(app);
    //google authentication provider
    const provider = new GoogleAuthProvider();
    const navigate = new useNavigate();

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {

            if (userCred) {
                setAuth(true);
                window.localStorage.setItem("auth", "true");
                firebaseAuth.onAuthStateChanged((userCred) => {

                    //has better way to do it
                    //has better way to do it

                    if (userCred) {
                        console.log(userCred)
                        navigate("/")
                    }
                    else {
                        setAuth(false)
                        navigate("/login")
                    }
                })
            }
        }
        )
    }


    return (
        <div className="relative w-screen h-screen">
            <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
                <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all'
                        onClick={loginWithGoogle}>
                        <FcGoogle className='text-xl' />
                        Sign in with Google
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login