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

    const [filteredSongs, setFilteredSongs] = useState(null);

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

    useEffect(() => {
        if (searchTerm.length > 0) {
            const filtered = allSongs.filter(
                (data) =>
                    data.artist.toLowerCase().includes(searchTerm) ||
                    data.language.toLowerCase().includes(searchTerm) ||
                    data.name.toLowerCase().includes(searchTerm) ||
                    data.artist.includes(artistFilter)
            );
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(null);
        }
    }, [searchTerm]);

    useEffect(() => {
        const filtered = allSongs?.filter((data) => data.artist === artistFilter);
        if (filtered) {
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(null);
        }
    }, [artistFilter]);

    useEffect(() => {
        const filtered = allSongs?.filter(
            (data) => data.category.toLowerCase() === filterTerm
        );
        if (filtered) {
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(null);
        }
    }, [filterTerm]);

    useEffect(() => {
        const filtered = allSongs?.filter((data) => data.album === albumFilter);
        if (filtered) {
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(null);
        }
    }, [albumFilter, allSongs]);
    useEffect(() => {
        if (albumFilter === "Favourite" && user && user.user && user.user.liked_songs) {
            const filtered = allSongs?.filter((data) =>
                user.user.liked_songs.some((liked) => liked.songUrl === data.songUrl)
            );
            if (filtered.length > 0) {
                setFilteredSongs(filtered);
            } else {
                setFilteredSongs([]);
            }
        } else {
            // Reset filteredSongs when albumFilter is not "Favourite"
            setFilteredSongs(allSongs);
        }
    }, [albumFilter, user, allSongs]);



    useEffect(() => {
        const filtered = allSongs?.filter(
            (data) => data.language === languageFilter
        );
        if (filtered) {
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(null);
        }
    }, [languageFilter]);

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
            <Header />
            <SearchBar />

            {searchTerm.length > 0 && (
                <p className="my-4 text-base text-textColor">
                    Searched for :
                    <span className="text-xl text-cartBg font-semibold">
                        {searchTerm}
                    </span>
                </p>
            )}

            <Filter setFilteredSongs={setFilteredSongs} />

            <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
                <HomeSongContainer music={filteredSongs ? filteredSongs : allSongs} />
            </div>
        </div>
    );
};

export const HomeSongContainer = ({ music }) => {
    const [{ isSongPlaying, song, user }, dispatch] = UseStateValue();
    const [alert, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState(null)

    const [isLiked, setIsLiked] = useState(false);

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

    //check if song is liked and if yes display it
    useEffect(() => {
        music?.forEach((data, index) => {
            if (user?.user?.liked_songs) {
                const indexOfLikedSong = user.user.liked_songs.findIndex(
                    likedSong => likedSong.songUrl.toString() === data.songUrl.toString()
                );
                if (indexOfLikedSong !== -1) {

                    setIsLiked(true);

                }
                console.log(indexOfLikedSong);

            }
        });
    }, [user, music]);
    return (
        <>
            {music?.map((data, index) => (
                <motion.div
                    key={data._id}
                    initial={{ opacity: 0, translateX: -50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"

                >
                    <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={data.imageUrl}
                            alt=""
                            className=" w-full h-full rounded-lg object-cover"
                            whileTap={{ scale: 0.7 }}
                            onClick={() => addSongToContext(index)}
                        />
                    </div>

                    <p className="text-base text-headingColor font-semibold my-2">
                        {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
                        <span className="block text-sm text-gray-400 my-1">
                            {data.artist}
                        </span>
                    </p>
                    <div className="w-full absolute bottom-2 flex items-center justify-end px-4" onClick={() => {
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
                    }}  >

                        <motion.i whileTap={{ scale: 0.75 }}>
                            <IoHeart className={`w-[30px] h-[30px] text-base drop-shadow-md  ${isLiked ? 'text-red-500' : 'text-gray-400'}`} />
                        </motion.i>
                    </div>
                    {alert && (
                        <>
                            <AlertError msg={alertMsg} />

                        </>
                    )}


                </motion.div>
            ))}
        </>
    );
};

export default Home;