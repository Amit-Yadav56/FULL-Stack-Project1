
import React, { useEffect, useState } from "react";
import { UseStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAllAlbums, deleteAlbumById } from "../api";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { AiOutlineClear } from "react-icons/ai";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const DashboardAlbums = () => {
  const [albumFilter, setAlbumFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredAlbums, setFilteredAlbums] = useState(null);
  const [{ allAlbums }, dispatch] = UseStateValue()


  //used to filter the songs by search
  useEffect(() => {
    if (albumFilter.length > 0) {
      const filtered = allAlbums.filter(
        (data) =>
          data.name.toLowerCase().includes(albumFilter)
      );
      setFilteredAlbums(filtered);
    } else {
      setFilteredAlbums(null);
    }
  }, [albumFilter]);


  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.album });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">

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
          value={albumFilter}
          onChange={(e) => setAlbumFilter(e.target.value)}
          // set the input box border change to black
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />


        {/* to erase all the filtered songs */}
        {albumFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setAlbumFilter("");
              setFilteredAlbums(null);
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
            {filteredAlbums ? filteredAlbums?.length : allAlbums?.length}
          </p>
        </div>

        <AlbumContainer data={filteredAlbums ? filteredAlbums : allAlbums} />
      </div>



    </div>
  );
};


export const AlbumContainer = ({ data }) => {
  return (
    <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
      {data &&
        data.map((album, i) => (
          <AlbumCard key={album._id} data={album} index={i} />
        ))}
    </div>
  );
};


export const AlbumCard = ({ data, index }) => {
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [{ allAlbums }, dispatch] = UseStateValue()
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative  overflow-hidden w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >
      <img
        src={data?.imageUrl}
        className="w-full h-40 object-cover rounded-md"
        alt=""
      />

      <p className="text-base text-textColor">{data.name}</p>

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
                deleteAlbumById(data._id).then((res) => {
                  if (res) {
                    setAlert("success");
                    console.log(alert)
                    setAlertMsg("File removed successfully");
                    console.log(alertMsg)
                    setTimeout(() => {
                      setAlert(null);
                    }, 4000);
                    getAllAlbums().then((d) => {
                      dispatch({
                        type: actionType.SET_ALL_ALBUMS,
                        allAlbums: d.album,
                      })
                    })
                  }
                })
                setIsDelete(false)

              }}
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
  )
}



export default DashboardAlbums;