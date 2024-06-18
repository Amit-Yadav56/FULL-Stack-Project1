import React, { useEffect, useState } from "react";
import { getAllSongs, addToLikedSongs, removeFromLikedSongs } from "../api";
import { actionType } from "../context/reducer";
import { UseStateValue } from "../context/StateProvider";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import { IoHeart } from "react-icons/io5";
import AlertError from "./AlertError";

const Home = () => {
    const [
        {
            searchTerm,
            user,
            isSongPlaying,
            song,
            allSongs,
            artistFilter,
            filterTerm,
            albumFilter,
            languageFilter,
        },
        dispatch,
    ] = UseStateValue();

    const [filteredSongs, setFilteredSongs] = useState([]);

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                });
            });
        }
    }, [allSongs, dispatch]);

    useEffect(() => {
        let songs = allSongs || [];
        if (searchTerm) {
            songs = songs.filter((data) =>
                data.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (artistFilter) {
            songs = songs.filter((data) => data.artist === artistFilter);
        }
        if (filterTerm) {
            songs = songs.filter((data) => data.category?.toLowerCase() === filterTerm.toLowerCase());
        }
        if (albumFilter) {
            if (albumFilter === 'Favourite') {
                songs = songs.filter((data) =>
                    user?.user?.liked_songs.some((liked) => liked.songUrl === data.songUrl)
                );
            } else {
                songs = songs.filter((data) => data.album === albumFilter);
            }
        }
        if (languageFilter) {
            songs = songs.filter((data) => data.language === languageFilter);

        }
        setFilteredSongs(songs);
        dispatch({
            type: actionType.SET_FILTERED_SONG,
            filteredSongs: songs,
        });
    }, [searchTerm, artistFilter, filterTerm, albumFilter, languageFilter, allSongs, user]);

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
            <Header />
            <SearchBar />
            {searchTerm && (
                <p className="my-4 text-base text-textColor">
                    Searched for: <span className="text-xl text-cartBg font-semibold">{searchTerm}</span>
                </p>
            )}
            <Filter setFilteredSongs={setFilteredSongs} />
            <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
                <HomeSongContainer music={filteredSongs.length > 0 ? filteredSongs : allSongs} />

            </div>
        </div>
    );
};

export const HomeSongContainer = ({ music }) => {
    return (
        <>
            {music?.map((data, index) => (
                <SongCard data={data} index={index} key={data._id} />
            ))}
        </>
    );
};

export const SongCard = ({ data, index }) => {
    const [{ isSongPlaying, song, user }, dispatch] = UseStateValue();
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (user?.user?.liked_songs) {
            const indexOfLikedSong = user.user.liked_songs.findIndex(
                (likedSong) => likedSong.songUrl === data.songUrl
            );
            setIsLiked(indexOfLikedSong !== -1);
        }
    }, [user, data]);

    const addSongToContext = (index) => {
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

    const handleLike = () => {
        if (isLiked) {
            removeFromLikedSongs(user.user._id, data._id).then((res) => {
                if (res) {

                    setIsLiked(false);
                } else {
                    showAlert("Song cannot be unliked");
                }
            });
        } else {
            addToLikedSongs(user.user._id, data._id).then((res) => {
                if (res) {
                    setIsLiked(true);
                } else {
                    showAlert("Song cannot be liked");
                }
            });
        }
    };

    const showAlert = (msg) => {
        setAlert(true);
        setAlertMsg(msg);
        setTimeout(() => {
            setAlert(false);
            setAlertMsg(null);
        }, 4000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
        >
            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-full h-full rounded-lg object-cover"
                    whileTap={{ scale: 0.7 }}
                    onClick={() => addSongToContext(index)}
                />
            </div>
            <p className="text-base text-headingColor font-semibold my-2">
                {data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
                <span className="block text-sm text-gray-400 my-1">
                    {data.artist}
                </span>
            </p>
            <div className="w-full absolute bottom-2 flex items-center justify-end px-4" onClick={handleLike}>
                <motion.i whileTap={{ scale: 0.75 }}>
                    <IoHeart className={`w-[30px] h-[30px] text-base drop-shadow-md ${isLiked ? 'text-red-500' : 'text-gray-400'}`} />
                </motion.i>
            </div>
            {alert && <AlertError msg={alertMsg} />}
        </motion.div>
    );
};

export default Home;
