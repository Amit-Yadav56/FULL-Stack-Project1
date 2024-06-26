import React from 'react'
import Header from './Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import { IoHome } from 'react-icons/io5'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { DashboardHome, DashboardSongs, DashboardUsers, DashboardArtists, DashboardAlbums, DashboardNewSong } from '.'

const Dashboard = () => {
  return (
    <div className='w-full h-auto flex flex-col justify-center items-center bg-primary'>
      <Header />
      <div className=' w-[60%] my-2 p-4 flex items-center justify-evenly'>
        <NavLink to={"/dashboard/home"}><IoHome className=" text-textColor text-2xl" /></NavLink>
        <NavLink to={"/dashboard/user"}
          className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Users</NavLink>
        <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Songs</NavLink>
        <NavLink to={"/dashboard/artists"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Artists</NavLink>
        <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Albums</NavLink>

      </div>

      {/* displaying all the subcomponents */}
      <div className='my-4 w-full p-4'>
        <Routes>
          <Route path='/home' element={<DashboardHome />} />
          <Route path='/user' element={<DashboardUsers />} />
          <Route path='/songs' element={<DashboardSongs />} />
          <Route path='/artists' element={<DashboardArtists />} />
          <Route path='/albums' element={<DashboardAlbums />} />
          <Route path='/newData' element={<DashboardNewSong />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard