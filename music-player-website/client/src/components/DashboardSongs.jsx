import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClear } from "react-icons/ai";
import { deleteSongById, getAllSongs, addToLikedSongs, removeFromLikedSongs } from "../api";
import { UseStateValue } from '../context/StateProvider'
import { actionType } from "../context/reducer";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";
import { IoAdd, IoPause, IoPlay, IoTrash, IoHeart } from "react-icons/io5";
import { NavLink } from "react-router-dom";


const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState(null);

  const [{ allSongs }, dispatch] = UseStateValue();


  //used to filter the songs by search
  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(songFilter) ||
          data.language.toLowerCase().includes(songFilter) ||
          data.name.toLowerCase().includes(songFilter)
      );
      setFilteredSongs(filtered);
      dispatch({
        type: actionType.SET_FILTERED_SONG,
        filteredSongs: filtered,
      });

    } else {
      setFilteredSongs(null);
      dispatch({
        type: actionType.SET_FILTERED_SONG,
        filteredSongs: allSongs,
      });
    }
  }, [songFilter]);


  //get all song in the context provider
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/* section to add new data */}
      <div className="w-full flex justify-center items-center gap-24">
        <NavLink
          to={"/dashboard/newData"}
          className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
        >
          <IoAdd />
        </NavLink>
        <input
          type="text"
          placeholder="Search here"
          className={`w-52 px-4 py-2 border ${isFocus ? "border-black shadow-md" : "border-gray-300"
            } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          // set the input box border change to black
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />


        {/* to erase all the filtered songs */}
        {songFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setSongFilter("");
              setFilteredSongs(null);
              dispatch({
                type: actionType.SET_FILTERED_SONG,
                filteredSongs: allSongs,
              });
            }}
          >
            <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
          </motion.i>
        )}
      </div>


      {/* section to display the filtered songs */}
      <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count :{" "}
            </span>
            {filteredSongs ? filteredSongs?.length : allSongs?.length}
          </p>
        </div>

        <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  );
};

export const SongContainer = ({ data }) => {
  return (
    <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} />
        ))}
    </div>
  );
};

export const SongCard = ({ data, index }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);



  const [{ allSongs, song, isSongPlaying, user }, dispatch] = UseStateValue();




  //check if song is liked and if yes display it
  useEffect(() => {
    if (user?.user?.liked_songs) {
      const indexOfLikedSong = user.user.liked_songs.findIndex(
        likedSong => likedSong.songUrl.toString() === data.songUrl.toString()
      );
      if (indexOfLikedSong !== -1) {

        setIsLiked(true);

      }
      console.log(indexOfLikedSong);

    }

  }, [user, data]);
  const addSongToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };



  const deleteObject = (id) => {

    setAlert("success")
    setAlertMsg("File removed successfully");
    setTimeout(() => {
      setAlert(null);
    }, 4000);
    deleteSongById(id).then((res) => {
      if (res.data.success) {


        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.data,
          });
        });

      }
    });
  };
  return (


    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"

    >

      {isDeleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="absolute z-10 p-2 inset-0 bg-card backdrop-blur-md flex flex-col gap-6 items-center justify-center"
        >
          <p className="text-sm text-center text-textColor font-semibold">
            Are you sure do you want to delete this song?
          </p>

          <div className="flex items-center gap-3">
            <button
              className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-teal-400"
              onClick={() => {
                deleteObject(data._id)

                setIsDeleted(false)
              }
              }
            >
              Yes
            </button>
            <button
              className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-gray-400"
              onClick={() => setIsDeleted(false)}
            >
              No
            </button>
          </div>
        </motion.div>
      )}

      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageUrl}
          alt="no image"
          className=" w-full h-full rounded-lg object-cover"
          onClick={addSongToContext}
          whileTap={{ scale: 0.7 }}
        />
      </div>

      <p className="text-base text-headingColor font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
        <span className="block text-sm text-gray-400 my-1">{data.artist}</span>
      </p>

      <div className="w-full absolute bottom-2 flex items-center justify-between px-4" >
        <motion.i whileTap={{ scale: 0.75 }} onClick={() => {
          setIsDeleted(true

          )
        }} >
          <IoTrash className="w-[25px] h-[25px] text-base text-red-400 drop-shadow-md hover:text-red-600" />

        </motion.i>
        <motion.i whileTap={{ scale: 0.75 }} onClick={() => {
          if (isLiked) {
            removeFromLikedSongs(user.user._id, data._id).then((res) => {
              if (res) {
                setIsLiked(false)
              } else {
                setAlert(true);
                setAlertMsg("Song cannot be liked");
                setTimeout(() => {
                  setAlert(null);
                }, 4000);

              }
            })

          } else {
            addToLikedSongs(user.user._id, data._id).then((res) => {
              if (res) {
                setIsLiked(true)
              } else {
                setAlert(true);
                setAlertMsg("Song cannot be liked");
                setTimeout(() => {
                  setAlert(null);
                }, 4000);

              }
            })
          }
        }} >
          <IoHeart className={`w-[30px] h-[30px] text-base drop-shadow-md  ${isLiked ? 'text-red-500' : 'text-gray-400'}`} />
        </motion.i>
      </div>

      {alert && (
        <>
          {alert !== "success" ? (
            <AlertError msg={alertMsg} />
          ) : (
            <AlertSuccess msg={alertMsg} />
          )}
        </>
      )}

      {alert && (
        <>
          <AlertError msg={alertMsg} />

        </>
      )}
    </motion.div>
  );
};

export default DashboardSongs;