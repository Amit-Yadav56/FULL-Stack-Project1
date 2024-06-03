import React from 'react'
import { HomeSongContainer } from './Home'
import { SongCard } from './DashboardSongs'
import { UseStateValue } from '../context/StateProvider'
import { useEffect, useState } from 'react'
import Header from './Header'
import SearchBar from './SearchBar'

const MyFavourites = () => {
  const [filteredSongs, setFilteredSongs] = useState(null);
  const [
    {
      user,
      allSongs,
      searchTerm,
      albumFilter,
      artistFilter
    },
    dispatch,
  ] = UseStateValue();
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = filteredSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(searchTerm) ||
          data.language.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.artist.includes(artistFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(filteredSongs);
    }
  }, [searchTerm, filteredSongs]);

  useEffect(() => {

    const filteredSongs = allSongs?.filter((data) =>
      user.user.liked_songs.some((liked) => liked.songUrl === data.songUrl)

    );
    console.log(filteredSongs);
    if (filteredSongs.length > 0) {
      setFilteredSongs(filteredSongs);
    } else {
      setFilteredSongs(null)
    }

  }, [albumFilter, user, allSongs]);

  return (


    <div className="w-full h-auto flex flex-col items-center justify-center">
      <div className='w-full'>

        <Header />
      </div>
      <p className='flex justify-center content-center text-l font-sans w-full'>Liked Songs</p>

      <SearchBar />
      {searchTerm.length > 0 && (
        <p className="my-4 text-base text-textColor">
          Searched for :
          <span className="text-xl text-cartBg font-semibold">
            {searchTerm}
          </span>
        </p>
      )}
      <div className="w-[85%] min-h-52 h-auto flex items-center  justify-evenly gap-4 flex-wrap p-4 border border-black bg-white m-6 border-dotted">
        <HomeSongContainer music={filteredSongs} />
      </div>

    </div>

  )
}

export default MyFavourites