import React, { useEffect } from 'react'
import { UseStateValue } from '../context/StateProvider'
import { getAllUsers, getAllAlbums, getAllSongs, getAllArtists } from '../api'
import { actionType } from '../context/reducer'
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi'
import { RiUserStarFill } from 'react-icons/ri'
import { FaUsers, FaMusic, FaFile, FaPersonBooth } from 'react-icons/fa'
import { bgColor } from '../utils/styles'
import { motion } from 'framer-motion'
import { NavLink } from "react-router-dom";

export const DashboardCard = ({ icon, name, count, route }) => {

  const bg_color = bgColor[parseInt(Math.random() * bgColor.length)]
  return (
    <NavLink to={`http://localhost:3000/dashboard/${route}`}>
      <motion.div whileTap={{ scale: 0.8 }} style={{ background: `${bg_color}` }} className='p-4 w-40 gap-4 h-auto rounded-lg shadow-md flex flex-col items-center '>
        {icon}
        <p className='text-xl text-textColor font-semibold '>{name}</p>
        <p className='text-xl text-textColor font-semibold '>{count}
        </p>
      </motion.div>

    </NavLink>
  )
}

const DashboardHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] = UseStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data
        })
      })
    }
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data
        })
      })
    }
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.albums
        })
      })
    }
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists
        })
      })
    }
  }, [])
  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
      <DashboardCard icon={<FaUsers className="text-2xl  text-textColor " />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} route={"user"} />
      <DashboardCard icon={<RiUserStarFill className="text-2xl  text-textColor " />} name={"Artists"} count={allArtists?.length > 0 ? allArtists?.length : 0} route={"artists"} />
      <DashboardCard icon={<GiMusicalNotes className="text-2xl  text-textColor " />} name={"Albums"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} route={"albums"} />
      <DashboardCard icon={<GiLoveSong className="text-2xl  text-textColor " />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} route={"songs"} />

    </div>
  )
}

export default DashboardHome