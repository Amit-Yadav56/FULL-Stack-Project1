
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { UseStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";
import { IoLogoInstagram, IoLogoTwitter, IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { deleteArtistById, getAllArtists } from "../api";
import { actionType } from "../context/reducer";
import { NavLink } from "react-router-dom";
import { AiOutlineClear } from "react-icons/ai";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const DashboardArtist = () => {

  const [artistFilter, setArtistFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredArtists, setFilteredArtists] = useState(null);

  const [{ allArtists }, dispatch] = UseStateValue();


  //used to filter the songs by search
  useEffect(() => {
    if (artistFilter.length > 0) {
      const filtered = allArtists.filter(
        (data) =>
          data.name.toLowerCase().includes(artistFilter)
      );
      setFilteredArtists(filtered);
    } else {
      setFilteredArtists(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: data.data });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/*section for adding and searching artists */}
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
          value={artistFilter}
          onChange={(e) => setArtistFilter(e.target.value)}
          // set the input box border change to black
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />


        {/* to erase all the filtered songs */}
        {artistFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setArtistFilter("");
              setFilteredArtists(null);
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
            {filteredArtists ? filteredArtists?.length : allArtists?.length}
          </p>
        </div>

        <ArtistContainer data={filteredArtists ? filteredArtists : allArtists} />
      </div>

    </div>
  );
};


export const ArtistContainer = ({ data }) => {
  return (
    <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
      {data &&
        data.map((artist, i) => (
          <ArtistCard key={artist._id} data={artist} index={i} />
        ))}
    </div>
  );
};

export const ArtistCard = ({ data, index }) => {

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [{ allArtists }, dispatch] = UseStateValue();
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >
      <img
        src={data?.imageUrl}
        className="w-full h-40 object-cover rounded-md"
        alt=""
      />

      <p className="text-base text-textColor">{data.name}</p>
      <div className="flex items-center gap-4">
        <a href={data.instagram} target="_blank">
          <motion.i whileTap={{ scale: 0.75 }}>
            <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl" />
          </motion.i>
        </a>
        <a href={data.twitter} target="_blank">
          <motion.i whileTap={{ scale: 0.75 }}>
            <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl" />
          </motion.i>
        </a>
      </div>
      <motion.i
        className="absolute bottom-2 right-2"
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
      </motion.i>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
        >
          <p className="text-gray-100 text-base text-center">
            Are you sure do you want to delete this?
          </p>
          <div className="flex items-center w-full justify-center gap-3">
            <div
              className="bg-red-300 px-3 rounded-md"
              onClick={() => {
                deleteArtistById(data._id).then((res) => {
                  if (res) {
                    setAlert("success");
                    console.log(alert)
                    setAlertMsg("File removed successfully");
                    console.log(alertMsg)
                    setTimeout(() => {
                      setAlert(null);
                    }, 4000);
                    getAllArtists().then((data) => {
                      dispatch({
                        type: actionType.SET_ALL_ARTISTS,
                        allArtists: data.data,
                      });
                    });
                  }

                });
                setIsDelete(false)
              }
              }
            >
              <p className="text-headingColor text-sm">Yes</p>
            </div>
            <div
              className="bg-green-300 px-3 rounded-md"
              onClick={() => setIsDelete(false)}
            >
              <p className="text-headingColor text-sm">No</p>
            </div>
          </div>
        </motion.div>
      )}
      {alert && (
        <>
          {alert == "success" ? (
            <AlertSuccess msg={alertMsg} />
          ) : (
            <AlertError msg={alertMsg} />
          )}
        </>
      )}
    </motion.div>
  );
};

export default DashboardArtist;