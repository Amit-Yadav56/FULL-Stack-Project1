import React from 'react'
import { HomeSongContainer } from './Home'
import { SongCard } from './DashboardSongs'
import { UseStateValue } from '../context/StateProvider'
import { actionType } from "../context/reducer";
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
    let songs = filteredSongs || [];
    if (searchTerm) {
      songs = songs.filter((data) =>
        data.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(songs);
      dispatch({
        type: actionType.SET_FILTERED_SONG,
        filteredSongs: songs,
      });
    }
    else {
      const filteredSongs = allSongs?.filter((data) =>
        user.user.liked_songs.some((liked) => liked.songUrl === data.songUrl)

      );
      console.log(filteredSongs);
      if (filteredSongs.length > 0) {
        setFilteredSongs(filteredSongs);
        dispatch({
          type: actionType.SET_FILTERED_SONG,
          filteredSongs: filteredSongs,
        });
      } else {
        setFilteredSongs(null)
        dispatch({
          type: actionType.SET_FILTERED_SONG,
          filteredSongs: filteredSongs,
        });
      }
    }
  }, [searchTerm, filteredSongs, albumFilter, user, allSongs]);

  useEffect(() => {

    const filteredSongs = allSongs?.filter((data) =>
      user.user.liked_songs.some((liked) => liked.songUrl === data.songUrl)

    );
    console.log(filteredSongs);
    if (filteredSongs.length > 0) {
      setFilteredSongs(filteredSongs);
      dispatch({
        type: actionType.SET_FILTERED_SONG,
        filteredSongs: filteredSongs,
      });
    } else {
      setFilteredSongs(null)
      dispatch({
        type: actionType.SET_FILTERED_SONG,
        filteredSongs: filteredSongs,
      });
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