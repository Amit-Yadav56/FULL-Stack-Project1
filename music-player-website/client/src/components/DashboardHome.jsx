import React, { useEffect } from 'react'
import { UseStateValue } from '../context/StateProvider'
import { getAllUsers, getAllAlbums, getAllSongs, getAllArtists } from '../api'
import { actionType } from '../context/reducer'
import { FaUsers, FaMusic, FaFile, FaPersonBooth } from 'react-icons/fa'

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className='p-4 w-40 gap-4 h-auto rounded-lg shadow-md bg-teal-500'>
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
      <DashboardCard icon={<FaPersonBooth className="text-2xl  text-textColor " />} name={"Artists"} count={allArtists?.length > 0 ? allArtists?.length : 0} />
      <DashboardCard icon={<FaFile className="text-2xl  text-textColor " />} name={"Albums"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
      <DashboardCard icon={<FaMusic className="text-2xl  text-textColor " />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />

    </div>
  )
}

export default DashboardHome