import React from 'react'
import { Logo } from "../assets/img/index";
import { NavLink } from "react-router-dom";

import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const Header = () => {
    return (
        <header className='flex items-center w-full p-4 md:py-2 md:px-6'>
            {/* if we click the logo we get to the home page */}
            <NavLink to={"/"}>
                <img src={Logo} alt="Logo" className="w-16" />

            </NavLink>
            <ul className='flex items-center justify-center ml-7'>
                {/* is active is an object comming from navlink */}
                <li className="mx-5 text-lg"><NavLink to={'/home'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink></li>
                <li className="mx-5 text-lg"><NavLink to={'/music'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Music</NavLink></li>
                <li className="mx-5 text-lg"><NavLink to={'/premium'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Premium</NavLink></li>
                <li className="mx-5 text-lg"><NavLink to={'/contact'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Contact</NavLink></li>

            </ul>
        </header>
    )
}

export default Header