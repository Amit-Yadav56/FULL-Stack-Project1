import React, { useEffect } from 'react'
import { UseStateValue } from '../context/StateProvider'
import { getAllUsers, getAllAlbums, getAllSongs, getAllArtists } from '../api'
import { actionType } from '../context/reducer'
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi'
import { RiUserStarFill } from 'react-icons/ri'
import { FaUsers, FaMusic, FaFile, FaPersonBooth } from 'react-icons/fa'
import { bgColor } from '../utils/styles'

export const DashboardCard = ({ icon, name, count }) => {

  const bg_color = bgColor[parseInt(Math.random() * bgColor.length)]
  return (
    <div style={{ background: `${bg_color}` }} className='p-4 w-40 gap-4 h-auto rounded-lg shadow-md flex flex-col items-center '>
      {icon}
      <p className='text-xl text-textColor font-semibold '>{name}</p>
      <p className='text-xl text-textColor font-semibold '>{count}
      </p>
    </div>
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
      <DashboardCard icon={<FaUsers className="text-2xl  text-textColor " />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} />
      <DashboardCard icon={<RiUserStarFill className="text-2xl  text-textColor " />} name={"Artists"} count={allArtists?.length > 0 ? allArtists?.length : 0} />
      <DashboardCard icon={<GiMusicalNotes className="text-2xl  text-textColor " />} name={"Albums"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
      <DashboardCard icon={<GiLoveSong className="text-2xl  text-textColor " />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />

    </div>
  )
}

export default DashboardHome