import React, { useEffect, useState } from "react";
import { UseStateValue } from "../context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoArrowUndo, IoMusicalNote } from "react-icons/io5";
import { motion } from "framer-motion";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../context/reducer";
import { MdPlaylistPlay } from "react-icons/md";
import { getAllSongs } from "../api";
import { RiPlayListFill } from "react-icons/ri";

const MusicPlayer = () => {
  const [isPlayList, setIsPlayList] = useState(false);
  const [{ filteredSongs, song, isSongPlaying, miniPlayer }, dispatch] = UseStateValue();

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };

  const nextTrack = () => {
    if (song >= filteredSongs.length - 1) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song + 1,
      });
    }
  };

  const previousTrack = () => {
    if (song === 0) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song - 1,
      });
    }
  };

  useEffect(() => {
    if (song >= filteredSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    }
  }, [song, filteredSongs]);

  return (
    <div className="w-full full flex items-center gap-3 overflow-hidden">
      <div
        className={`w-full full items-center gap-3 p-4 ${miniPlayer ? "absolute top-40" : "flex relative"
          }`}
      >
        <img
          src={filteredSongs[song]?.imageUrl}
          className="w-40 h-20 object-cover rounded-md"
          alt=""
        />
        <div className="flex items-start flex-col">
          <p className="text-xl text-headingColor font-semibold">
            {`${filteredSongs[song]?.name.length > 20
              ? filteredSongs[song]?.name.slice(0, 20)
              : filteredSongs[song]?.name
              }`}{" "}
            <span className="text-base">({filteredSongs[song]?.album})</span>
          </p>
          <p className="text-textColor">
            {filteredSongs[song]?.artist}{" "}
            <span className="text-sm text-textColor font-semibold">
              ({filteredSongs[song]?.category})
            </span>
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={filteredSongs[song]?.songUrl}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        <div className="h-full flex items-center justify-center flex-col gap-3">
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>
        </div>
      </div>

      {isPlayList && (
        <>
          <PlayListCard />
        </>
      )}

      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-2 bottom-2 "
        >
          <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
            <div className="absolute inset-0 rounded-full bg-red-600 blur-xl animate-pulse"></div>
            <img
              onClick={togglePlayer}
              src={filteredSongs[song]?.imageUrl}
              className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
              alt=""
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const PlayListCard = () => {
  const [{ filteredSongs, song, isSongPlaying }, dispatch] = UseStateValue();
  useEffect(() => {
    if (!filteredSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, [filteredSongs, dispatch]);

  const setCurrentPlaySong = (songindex) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== songindex) {
      dispatch({
        type: actionType.SET_SONG,
        song: songindex,
      });
    }
  };

  return (
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
      {filteredSongs.length > 0 ? (
        filteredSongs.map((music, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${music?._id === song._id ? "bg-card" : "bg-transparent"
              }`}
            onClick={() => setCurrentPlaySong(index)}
          >
            <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${music?.name.length > 20
                  ? music?.name.slice(0, 20)
                  : music?.name
                  }`}{" "}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-textColor">
                {music?.artist}{" "}
                <span className="text-sm text-textColor font-semibold">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer;
